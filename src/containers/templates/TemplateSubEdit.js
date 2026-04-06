/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplateEditComponent } from '../../components/templates';
import { getB2BTemplateViewAPI, putB2BTemplateEditAPI } from '../../actions/templates/TemplatesActions';
import hashHistory from '../../hashHistory';
import { initCaps } from '../../hooks/common';
import localForage from '../../hooks/localForage';

class TemplateSubEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialData: {},
      orgId: '',
      teamId: '',
      roleId: '',
      userId: '',
      tempName: '',
      tempSeq: '',
      tempCat: '',
      tempNotes: '',
      tStatus: '',
      tempErrMsg: [],
      errIndex: null,
      tempData: [{
        mandatory: true, _id: '', seq: 1, dataType: '', limit: '', level: 'Organization', display: 'Hide',
        dataObj: {
          heading: '',
          tableArr: [{ subHeading: '', tableStructure: 'Horizontal', limit: '', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] }]
        }
      }],
      initialData: {},
      disable: false,
      rolesObj: {},
      userInfo: {},
      showCases: false,
      dataObj:{},
      id:'',
      sectionData:{},
      tempIndex: 0,
      isUpdate: false,
      dataChangeModal: false
    };
  };
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const urObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...urObj, appAcc };
    this.setState({ rolesObj, userInfo });
    this.getTempData(this.props.id);
  }
  getTempData = (id) => {
    this.props.getB2BTemplateViewAPI(id, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;        
        const initialData = this.setData(data);
        this.setState({ ...initialData, initialData });
      }
    })
  }
  setData = (resData) => {
    const processedData = resData.tempData && resData.tempData.length > 0 && resData.tempData.map(item => {
      let dataKey = (item.dataType === "Text" || item.dataType === "Dropdown" || item.dataType === "Table") ? "defData" : (item.dataType === "Image" || item.dataType === "File"|| item.dataType === "Image/File") ? "accData" :'';
      if (item.dataType === "Text") {
        const { data, ...rest } = item;
        return { ...rest, [dataKey]: item.data?.join(", ") || "" };
      }
      if (item.dataType === "Dropdown") {
        const { data, limit, ...rest } = item;
        return { ...rest, [dataKey]: item.data.map(item => ({value: item, label: item})) };
      }
      if (item.dataType === "Table") {
        const { data, ...rest } = item;
        return { ...rest, [dataKey]: item.data.map(item => ({value: item, label: item})) };
      }
      if (item.dataType === "Boolean" || item.dataType === "Date") {
        const { data, limit, ...rest } = item;
        return rest;
      }
      if(item.dataType === "Image" || item.dataType === "File" || item.dataType === "Image/File"){
        const { data, ...rest } = item;
        return { ...rest, [dataKey]: item.data?.length > 0 ? item.data.map(item => ({ label: item, value: item })) : [] };
      }
      if(item.dataType === "Number"){
        const { data, ...rest } = item;
        return rest;
      }
      if (item.dataType === "Section") {
        item.dataObj.tableArr = item?.dataObj?.tableArr?.length > 0 && item.dataObj.tableArr.map((table) => {
          table.data = table?.data?.length > 0 && table.data.map((entry) => {
            if (entry.valueType === "Dropdown" && Array.isArray(entry.ddData)) {
              entry.ddData = entry?.ddData?.length > 0 && entry.ddData.map((val) => 
                typeof val === "string" ? { label: val, value: val } : val
              );
            }
            return entry;
          });
          return table;
        });
        const { data, ...rest } = item;
        return rest
      }
    });
    const roleId = resData?.urData?.length > 0 ? resData.urData.map((item) => ({ ...item, label: item.userRole, value: item._id })) : [];    
    return { ...resData, tempData: processedData, roleId, orgId: resData.orgName, teamId: resData.tName };
  };
  setStateData = (data) => this.setState({ ...data });
  tempOnChange = (e, dataType, index, dName, item) => {    
    const data = [...this.state[dataType]];
    if (e.target) {
      const { value, name } = e.target;
      data[index][name] = (name === '_id') ? initCaps(value) : value;
      if (name == 'dataType') {
        if (value == 'Dropdown' || value == 'Table') {
          data[index]['defData'] = [];
          delete data[index]['accData'];
        } else if (value == 'Image' || value == 'File' || value == 'Image/File') {
          delete data[index]['defData'];
          data[index]['accData'] = [];
        } else if (value === 'Section') {
          this.setState({showCases: true, sectionData: item, tempIndex: index, errMsg:''});
        }
        data[index]['limit'] = value === 'Text' ? 50 : value === 'Table' ? 20 : ['Number', 'Image', 'File', 'Image/File'].includes(value) ? 1 : '';
      } else if (name === 'level') {
        data[index][name] = value;
        if (value === 'Consultant') {
         data[index]['display'] = 'Show Always'
        } else {
          data[index]['display'] = 'Hide'
        }
      }
    } else if (dName === 'defData') {
      data[index]['defData'] = Array.isArray(e)? e.map(item => item?.__isNew__ ? { label: initCaps(item.label), value: initCaps(item.value) } : item): e;
      delete data[index]['accData'];
    } else if (dName === 'accData') {
      data[index]['accData'] = e;
      delete data[index]['defData'];
    }
    this.setState({ [dataType]: data, tempErrMsg: [], errIndex: null, isUpdate: true });
  };
  handleAddField = () => {
    if (this.validate()) {
      this.setState(prevState => {
        const nextSeq = prevState.tempData.length > 0 ? Math.max(...prevState.tempData.map(field => field.seq)) + 1 : 1;
        const dataType = '';
        const limit = dataType === 'Text' ? 50 : dataType === 'Table' ? 20 : ['Number', 'Image', 'File', 'Image/File'].includes(dataType) ? 1 : '';
        return { tempData: [...prevState.tempData, { mandatory: true, _id: '', seq: nextSeq, dataType: '', limit, level: 'Organization', display: 'Hide', dataObj: {
          heading: '',
          tableArr: [{ subHeading: '', tableStructure: 'Horizontal', limit: '', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] }]
        } }] };
      });
    }
  }
  validate = () => {
    const { tempData } = this.state;
    const tempErrMsg = [];
    let errIndex = null;
    tempData.forEach((field, index) => {
      tempErrMsg[index] = {};
      if (!field._id) {
        tempErrMsg[index]._id = 'Name is required';
        if (errIndex === null) errIndex = index
      } else if (!field.seq) {
        tempErrMsg[index].seq = 'Sequence is required';
        if (errIndex === null) errIndex = index
      } else if (!field.dataType) {
        tempErrMsg[index].dataType = 'Datatype is required';
        if (errIndex === null) errIndex = index
      } else if (field.dataType && (field.dataType === 'Dropdown' || field.dataType === 'Table') && (!field.defData || field?.defData?.length == 0)) {
        tempErrMsg[index].defData = `${field.dataType} Data is required`;
        if (errIndex === null) errIndex = index
      } else if ((field.dataType === 'Image' || field.dataType === 'File' || field.dataType === 'Image/File') && (!field.accData || field.accData.length === 0)) {
        tempErrMsg[index].accData = 'Accepted Data is required';
        if (errIndex === null) errIndex = index;
      }
    });
    if (tempErrMsg.some(errors => Object.keys(errors).length > 0)) {
      this.setState({ tempErrMsg, errIndex });
      return false;
    }
    this.setState({ tempErrMsg: [], errIndex: null });
    return true;
  };
  handleDeleteField = (index) => {
    if (this.state.tempData.length > 1) {
      this.setState(prevState => ({ tempData: prevState.tempData.filter((_, i) => i !== index) }));
    }
  }
  isManClick = (type, id) => {
    this.setState(prevState => ({ tempData: prevState.tempData.map(item => item._id === id ? { ...item, mandatory: type } : item) }));
  };
  tempCatChange = (data) => {
    const lastObj = data?.length > 0 && data[data.length - 1];
    if (lastObj.value == 'All') {
      this.setState({ tempCat: [{ label: 'All', value: 'All', isUpdate: true }] });
    } else {
      const tempCat = data?.length > 0 && data.filter(item => item.value !== 'All');
      this.setState({ tempCat, isUpdate: true });
    }
  }
  isTableManClick = (type, label, rowIndex, subIndex) => {
    this.setState((prevState) => {
      const updatedTempData = prevState.tempData.map((item) => ({
        ...item,
        dataObj: {
          ...item.dataObj,
          tableArr: item?.dataObj?.tableArr?.length > 0 && item.dataObj.tableArr.map((table, tIndex) =>
            tIndex === subIndex ? { ...table, data: table.data.map((row, index) => index === rowIndex ? { ...row, mandatory: type } : row) } : table
          ),
        },
      }));
      const updatedSectionData = {
        ...prevState.sectionData,
        dataObj: {
          ...prevState.sectionData.dataObj,
          tableArr: prevState.sectionData?.dataObj?.tableArr?.length > 0 && prevState.sectionData.dataObj.tableArr.map((table, tsIndex) =>
            tsIndex === subIndex ? { ...table, data: table?.data?.length > 0 && table.data.map((row, rIndex) => rIndex === rowIndex ? { ...row, mandatory: type } : row), } : table),
        },
      };
      return { tempData: updatedTempData, sectionData: updatedSectionData, isUpdate: true };
    });
  };
  
  tableChange = (e, type) => {
    const { tempIndex, tempData, sectionData } = this.state;
    if (tempIndex == null || !tempData[tempIndex]) return;
    const uptData = [...tempData];
    uptData[tempIndex] = {
      ...uptData[tempIndex], dataObj: {
        ...uptData[tempIndex].dataObj, [type]: e.target.value
      }
    }
    const sectData = { ...sectionData }
    sectData.dataObj[type] = e.target.value
    this.setState({ tempData: uptData, errMsg: '', sectionData: sectData, isUpdate: true });
  };
  handleSelection = (e, type, subIndex) => {
    const { tempIndex, tempData, sectionData } = this.state;
    if (tempIndex == null || !tempData[tempIndex] || !tempData[tempIndex]?.dataObj?.tableArr[subIndex]) return;
    const uptData = [...tempData];
    uptData[tempIndex] = {
      ...uptData[tempIndex], dataObj: {
        ...uptData[tempIndex].dataObj,
        tableArr: uptData[tempIndex].dataObj.tableArr.map((item, idx) => idx === subIndex ? { ...item, [type]: type === "tableStructure" ? (e.target.value === "Vertical" ? { [type]: e.target.value, limit: 1 } : { [type]: e.target.value, limit: "" }) : e.target.value } : item),
      }
    }
    const sectData = { ...sectionData }
    if (sectData?.dataObj?.tableArr?.[subIndex]) {
      sectData.dataObj.tableArr[subIndex] = { ...sectData.dataObj.tableArr[subIndex], [type]: e.target.value };
      if (type === 'tableStructure') {
        sectData.dataObj.tableArr[subIndex].limit = e.target.value === "Vertical" ? 1 : "";
      }
    }
    this.setState({ tempData, errMsg: '', sectionData: sectData, isUpdate: true });
  };
  tableInptChange = (e, type, subIndex, rowIndex) => {    
    const { tempIndex, tempData, sectionData } = this.state;
    if (tempIndex == null || !tempData[tempIndex] || !tempData[tempIndex]?.dataObj?.tableArr[subIndex]?.data[rowIndex]) return;
    const uptData = [...tempData];
    uptData[tempIndex] = {
      ...uptData[tempIndex],
      dataObj: {
        ...uptData[tempIndex].dataObj,
        tableArr: uptData[tempIndex].dataObj.tableArr.map((table, idx) =>
          idx === subIndex ? { ...table, data: table.data.map((row, rIdx) => rIdx === rowIndex ? { ...row, [type]: type === 'ddData' ? (Array.isArray(e)? e.map(item => item?.__isNew__ ? { label: initCaps(item.label), value: initCaps(item.value) } : item): e) : initCaps(e.target.value) } : row) } : table),
      },
    };
    const sectData = { ...sectionData };
    if (sectData?.dataObj?.tableArr?.[subIndex]?.data?.[rowIndex]) {
      sectData.dataObj.tableArr[subIndex].data[rowIndex] = { ...sectData.dataObj.tableArr[subIndex].data[rowIndex], [type]: type === 'ddData' ? (Array.isArray(e)? e.map(item => item?.__isNew__ ? { label: initCaps(item.label), value: initCaps(item.value) } : item): e) : initCaps(e.target.value) };
    }
    this.setState({ tempData: uptData, errMsg: '', isUpdate: true });
  };
  addSubHeading = () => {
    const { tempIndex, tempData, sectionData } = this.state;
    const uptData = [...tempData];
    if (!uptData[tempIndex]?.dataObj?.tableArr) {
      uptData[tempIndex].dataObj.tableArr = []
    }
    uptData[tempIndex].dataObj.tableArr.push({ subHeading: '', tableStructure: 'Horizontal', limit: '', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] })
    const sectData = { ...sectionData, dataObj: { ...sectionData.dataObj, tableArr: uptData[tempIndex].dataObj.tableArr } };
    this.setState({ tempData: uptData, sectionData: sectData, errMsg: '' });
  };
  dltSubHeading = (subIndex) => {
    const { tempIndex, tempData, sectionData } = this.state;
    const uptData = [...tempData];
    if (uptData[tempIndex]?.dataObj?.tableArr?.length > subIndex) {
      uptData[tempIndex].dataObj.tableArr.splice(subIndex, 1);
    }
    const sectData = { ...sectionData };
    if (sectData?.dataObj?.tableArr?.length > subIndex) {
      sectData.dataObj.tableArr.splice(subIndex, 1);
    }
    this.setState({ tempData: uptData, sectionData: sectData, errMsg: '' });
  };
  addRow = (subIndex) => {
    this.setState((prevState) => {
      const { tempIndex, tempData, sectionData } = prevState;
      const uptData = [...tempData];
      if (!uptData[tempIndex]?.dataObj?.tableArr[subIndex]?.data) {
        uptData[tempIndex].dataObj.tableArr[subIndex].data = [];
      }
      uptData[tempIndex].dataObj.tableArr[subIndex].data.push({ mandatory: true, label: '', valueType: '', ddData: null });
      const sectData = { ...sectionData, dataObj: { ...sectionData.dataObj, tableArr: uptData[tempIndex].dataObj.tableArr } };
      return { tempData: uptData, sectionData: sectData, errMsg: '' };
    });
  };
  deleteRow = (subIndex, rowIndex) => {
    this.setState((prevState) => {
      const { tempIndex, tempData, sectionData } = this.state;
      const uptData = [...tempData];
      if (uptData[tempIndex]?.dataObj?.tableArr[subIndex]?.data?.length > rowIndex) {
        uptData[tempIndex].dataObj.tableArr[subIndex].data.splice(rowIndex, 1);
      }
      const sectData = { ...sectionData };
      if (sectData?.dataObj?.tableArr?.[subIndex]?.data?.length > rowIndex) {
        sectData.dataObj.tableArr[subIndex].data.splice(rowIndex, 1);
      }
      return { tempData: uptData, sectionData: sectData, errMsg: '' }
    });
  };
  handleCloseCase = () => {
    this.setState({ showCases: false, heading: '', tableArr: [{ subHeading: '', tableStructure: 'Horizontal', limit: '', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] }] })
  }
  handleAddCase = () => {
    const { tempIndex } = this.state;
    this.setState((prevState) => {
      const { tempData } = prevState;
      const heading = tempData[tempIndex]?.dataObj?.heading || '';
      const isHeadingEmpty = heading.trim() === '';
      if (isHeadingEmpty) {
        return { errMsg: 'Heading cannot be empty!' };
      } else {
        const updatedData = [...tempData];
        return { errMsg: '', tempData: updatedData, showCases: false };
      }
    });
  };
  handleEdit = () => {
    const { tempName, tempSeq, tempNotes, tStatus, tempData, initialData } = this.state;
    const tData = tempData?.length > 0 && tempData.map(item => {
      if (item.dataType == 'Boolean' || item.dataType == 'Dropdown' || item.dataType == 'Date') {
        const { dataObj, limit, defData, accData, ...rest } = item;
        const data = defData && defData.length > 0 ? defData.map(item => item.value) : [];
        return { ...rest, data };
      } else if (item.dataType == 'Table') {
        const { dataObj, defData, accData, ...rest } = item;
        const data = defData && defData.length > 0 ? defData.map(item => item.value) : [];
        return { ...rest, data };
      } else if (item.dataType == 'Text') {
        const { dataObj, defData, accData, ...rest } = item;
        return { ...rest, data: defData ? defData : [] };
      } else if (item.dataType == 'Section') {
        const { defData, accData, ...rest } = item;
        const tArr = item?.dataObj?.tableArr;     
        const dataObj = {
          ...item.dataObj, tableArr: tArr?.length > 0 && tArr.map(table => ({ ...table, data: table.data.map(entry => ({ ...entry, ddData: entry.valueType === 'Dropdown' ? (entry.ddData ? entry.ddData.map(option => option.label || option) : entry.ddData): null })) }))
        }
        return { ...rest, dataObj };
      } else {
        const { dataObj, defData, accData, ...rest } = item;
        const data = accData && accData.length > 0 ? accData.map(item => item.value) : []
        return { ...rest, data: data.length > 0 ? data :[] };
      }
    })
    if (!tempName) {
      this.setState({ errMsg: 'Template Name is required' });
    } else if (!tempSeq) {
      this.setState({ errMsg: 'Template Sequence is required' });
    } else {
      const func = this.validate();
      if (func) {
        this.setState({ disable: true });
        const reqBody = { tempName, tempSeq, tempNotes, tStatus, tempData: tData };
        // const prevData = {
        //   tempName: initialData.tempName,
        //   tempSeq: initialData.tempSeq,
        //   tempNotes: initialData.tempNotes,
        //   tStatus: initialData.tStatus,
        //   tempData: initialData.tempData
        // }        
        // if (JSON.stringify(reqBody) !== JSON.stringify(prevData)) {
        this.props.putB2BTemplateEditAPI(this.props.id, reqBody, (resObj) => {
          if (resObj.status == '200') {
            hashHistory.push('/templates');
            this.setState({ disable: false });
          } else {
            this.setState({ errMsg: 'Template Update Failed', disable: false });
          }
        })
        // } else {
        //   this.setState({ errMsg: 'There are no changes' });
        // }
      }
    }
  }
  isManClick = (type, id) => {
    this.setState(prevState => ({ tempData: prevState.tempData.map(item => item._id === id ? { ...item, mandatory: type } : item) }));
  };
  handleBack = () => {
    const { isUpdate } = this.state;
    if (isUpdate) {
      this.setState({ dataChangeModal: true });
    } else {
      hashHistory.push('/templates');
    }
  }
  render() {
    return <TemplateEditComponent
      state={this.state}
      setStateData={this.setStateData}
      tempOnChange={this.tempOnChange}
      handleAddField={this.handleAddField}
      handleDeleteField={this.handleDeleteField}
      handleEdit={this.handleEdit}
      isManClick={this.isManClick}
      isTableManClick={this.isTableManClick}
      handleSelection={this.handleSelection}
      tableInptChange={this.tableInptChange}
      tableChange={this.tableChange}
      handleCloseCase={this.handleCloseCase}
      addSubHeading={this.addSubHeading}
      dltSubHeading={this.dltSubHeading}
      addRow={this.addRow}
      deleteRow={this.deleteRow}
      handleAddCase={this.handleAddCase}
      handleBack={this.handleBack}
    />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BTemplateViewAPI: (id, callback) => dispatch(getB2BTemplateViewAPI(id, callback)),
  putB2BTemplateEditAPI: (id, body, callback) => dispatch(putB2BTemplateEditAPI(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(TemplateSubEdit);