/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplateCreateComponent } from '../../components/templates';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { postB2BRolesActiveList } from '../../actions/roles/RolesActions';
import { postB2bUsersTotalList } from '../../actions/users/UsersActions';
import { postB2BTemplateCreateAPI } from '../../actions/templates/TemplatesActions';
import { initCaps } from '../../hooks/common';
import localForage from '../../hooks/localForage';
import dTypes from '../../../public/data/Lookups.json';
import hashHistory from '../../hashHistory';

class TemplateCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orgsList: [],
      teamsList: [],
      rolesList: [],
      usersList: [],
      userInfo: {},
      rolesObj: {},
      orgId: '',
      teamId: '',
      roleId: '',
      userId: '',
      tempName: '',
      tempSeq: 0,
      tempCat: [],
      tempNotes: '',
      tStatus: 'Active',
      tempData: [{
        mandatory: true, _id: '', seq: 1, dataType: '', limit: '', level: 'Organization', display: 'Hide',
        dataObj: {
          heading: '',
          tableArr: [{ subHeading: '', tableStructure: 'Horizontal', limit: '', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] }]
        }
      }],
      errIndex: null,
      errMsg: '',
      tempErrMsg: [],
      disable: false,
      orgObj: {},
      userRoleObj: {},
      showCases: false,
      dataObj:{},
      id:'',
      sectionData:{},
      tempIndex: 0
    };
  };
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const urObj = userInfo?.rolesObj || {};
    const rc = await localForage.getItem('tempAccCount');
    const tempSeq = rc.value || '';
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...urObj, appAcc };
    this.getOrgsList(userInfo, rolesObj);
    this.getRolesList(userInfo, rolesObj);
    this.setState({ userInfo, rolesObj, tempSeq: tempSeq + 1 });
  }
  setStateData = (data) => this.setState({ ...data });
  getOrgsList = (userInfo, rolesObj) => {
    if (rolesObj?.appAcc) {
      const reqBody = { status: 'Active' };
      this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ orgsList: resObj.resData.result });
        } else {
          this.setState({ orgsList: [] });
        }
      });
    } else {
      const orgObj = { _id: userInfo.org, orgName: userInfo.orgName, orgCode: userInfo.orgCode };
      this.setState({ orgObj });
      userInfo?.userType === 'Management' && this.getTeamsList(orgObj._id);
    }
  }
  getTeamsList = (orgID) => {
    const reqBody = { status: 'Active', orgID };
    this.props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        this.setState({ teamsList: resObj.resData.result });
      } else
        this.setState({ teamsList: [] });
    });
  }
  getRolesList = (userInfo, rolesObj) => {
    const reqBody = { actPgNum: 1, rLimit: 100, searchStr: '', status: 'Active' }
    this.props.postB2BRolesActiveList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const rolesData = resObj.resData.result.rolesList;
        // const roleObj = (rolesObj?.appAcc || userInfo?.userType === 'Management') ? rolesList?.length > 0 ? rolesList.find(item => item.rName === 'Mentor') : {} : (rolesList?.length > 0 ? rolesList.find(item => item.rName === userInfo.userRole) : {});
        const rlData = rolesData?.length > 0 ? [...rolesData, {_id: 'All', rName:'All'}] :[];        
        const rolesList = rlData?.length > 0 ? rlData.map((item) => ({...item, value: item._id, label: item.rName})) :[];        
        this.setState({ rolesList });
      } else {
        this.setState({ rolesList: [] });
      }
    });
  }
  handleChangeOrg = (e) => {
    const { value } = e.target;
    this.setState({ orgId: value, errMsg: '', tempErrMsg: [], teamsList: [], teamId: '' });
    value && this.getTeamsList(value);
  }
  handleChangeTeam = (e) => {
    const { value } = e.target;
    this.setState({ teamId: value, errMsg: '', tempErrMsg: [] });
  }
  handleChangeRole = (data) => {
    const lastObj = data?.length > 0 && data[data.length - 1];    
    if (lastObj.value == 'All') {      
      this.setState({ roleId: [{ label: 'All', value: 'All' }], errMsg:'' });
    } else {
      const roleId = data?.length > 0 && data.filter(item => item.value !== 'All');            
      this.setState({ roleId, errMsg:'' });
    }
  }
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
    this.setState({ [dataType]: data, tempErrMsg: [], errIndex: null });
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
      this.setState({ tempCat: [{ label: 'All', value: 'All' }], errMsg:'' });
    } else {
      const tempCat = data?.length > 0 && data.filter(item => item.value !== 'All');
      this.setState({ tempCat, errMsg:'' });
    }
  }
isTableManClick = (type, label, rowIndex, subIndex) => {
  this.setState((prevState) => {
    const updatedTempData = prevState.tempData.map((item) => ({
      ...item,
      dataObj: {
        ...item.dataObj,
        tableArr: item.dataObj.tableArr.map((table, tIndex) =>
          tIndex === subIndex ? { ...table, data: table.data.map((row, index) => index === rowIndex ? { ...row, mandatory: type } : row) } : table
        ),
      },
    }));
    const updatedSectionData = {
      ...prevState.sectionData,
      dataObj: {
        ...prevState.sectionData.dataObj,
        tableArr: prevState.sectionData.dataObj.tableArr.map((table, tsIndex) =>
          tsIndex === subIndex ? { ...table, data: table.data.map((row, rIndex) => rIndex === rowIndex ? { ...row, mandatory: type } : row), } : table),
      },
    };
    return { tempData: updatedTempData, sectionData: updatedSectionData };
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
    this.setState({ tempData: uptData, errMsg: '', sectionData: sectData });
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
    this.setState({ tempData, errMsg: '', sectionData: sectData });
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
    this.setState({ tempData: uptData, errMsg: '' });
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
    this.setState({ showCases: false, heading: '', tableArr: [{ subHeading: '', tableStructure: 'Horizontal', limit:'', data: [{ mandatory: true, label: '', valueType: '', ddData: null }] }] })
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
  handleCreate = () => {
    const { orgsList, teamsList, rolesList, orgId, teamId, roleId, tempName, tempSeq, tempCat, tempNotes, tStatus, tempData, userInfo, orgObj, rolesObj } = this.state;
    const tData = tempData.map(item => {
      if (item.dataType == 'Boolean' || item.dataType == 'Dropdown' || item.dataType == 'Date') {
        const { dataObj, limit, defData, accData, ...rest } = item;
        const data = defData && defData.length > 0 ? defData.map(item => item.value) : [];
        return { ...rest, data };
      } if (item.dataType == 'Table') {
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
          ...item.dataObj, tableArr: tArr.map(table => ({ ...table, data: table.data.map(entry => ({ ...entry, ddData: entry.valueType === 'Dropdown' ? (entry.ddData ? entry.ddData.map(option => option.label || option) : entry.ddData): null })) }))
        }
        return { ...rest, dataObj };
      } else {
        const { dataObj, defData, accData, ...rest } = item;
        const data = accData && accData.length > 0 ? accData.map(item => item.value) : []
        return { ...rest, data: data.length > 0 ? data : [] };
      }
    })
    const orgData = orgId ? orgsList && orgsList.length > 0 && orgsList.find(item => item._id == orgId) : {};
    const teamObj = teamId && teamsList && teamsList.length > 0 ? teamsList.find(item => item._id == teamId) : {};
    const rObjData = userInfo.userRole && rolesList && rolesList.length > 0 ? rolesList.filter(item => item.rName == userInfo.userRole) : [];
    const aArr = rObjData?.length > 0 ? rObjData.map(item => ({ _id: item._id, userRole: item.rName, urSeq: item.rSeq })) : [];

    const allCat = dTypes?.tempCategory?.length > 0 ? dTypes.tempCategory.map(item => item.value).slice(0, -1) : [];
    const tempCatString = tempCat && tempCat.length > 0 ? tempCat.map(a => a.value == 'All' ? allCat : a.value).flat() : [];

    const allRoles = rolesList?.length > 0 ? rolesList.map(item => item).slice(0, -1) : [];

    const fnlArr = roleId?.length > 0 ? roleId.map(a => a.value == 'All' ? allRoles : a).flat() : [];
    const rlData = fnlArr?.length > 0 ? fnlArr.map(item => ({ _id: item._id, userRole: item.rName, urSeq: item.rSeq })) : [];

    const urData = (rolesObj.appAcc || userInfo?.userType === 'Management') ? rlData : aArr;
    const urIDs = urData?.length > 0 ? urData.map(item => item._id) : [];
    const userRoles = urData?.length > 0 ? urData.map(item => item.userRole) : [];        
    if (rolesObj.appAcc && !orgId) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (rolesObj.appAcc && !roleId) {
      this.setState({ errMsg: 'Role is required' });
    } else if (tempCat && tempCat.length == 0) {
      this.setState({ errMsg: 'Category is required' });
    } else if (!tempName) {
      this.setState({ errMsg: 'Template Name is required' });
    } else if (!tempSeq) {
      this.setState({ errMsg: 'Template Sequence is required' });
    } else {
      const func = this.validate();
      if (func) {
        this.setState({ disable: true });
        const pTeamIDs = teamObj._id ? [...teamObj.potlIds, teamObj._id] : [];
        const reqBody = {
          org: orgData._id ? orgData._id : orgObj._id,
          orgName: orgData._id ? orgData.orgName : orgObj.orgName,
          orgCode: orgData._id ? orgData.orgCode : orgObj.orgCode,
          orgs: orgData._id ? [orgData._id] : [orgObj._id],
          team: teamObj._id ? teamObj._id : '',
          tName: teamObj._id ? teamObj.oTeam : '',
          tCode: teamObj._id ? teamObj.otCode : '',
          pTeamIDs,
          urData,
          urIDs,
          userRoles,
          tempName,
          tempSeq,
          tempCat:tempCatString,
          tempNotes,
          tStatus,
          tempData: tData
        }
        this.props.postB2BTemplateCreateAPI(reqBody, (resObj) => {
          if (resObj.status == '200') {
            hashHistory.push('/templates');
            this.setState({ disable: false });
          } else {
            this.setState({ errMsg: 'Template Create Failed', disable: false });
          }
        })
      }
    }
  }
  render() {
    return <TemplateCreateComponent
      state={this.state}
      setStateData={this.setStateData}
      handleChangeOrg={this.handleChangeOrg}
      handleChangeTeam={this.handleChangeTeam}
      handleChangeRole={this.handleChangeRole}
      tempOnChange={this.tempOnChange}
      handleAddField={this.handleAddField}
      handleDeleteField={this.handleDeleteField}
      handleCreate={this.handleCreate}
      isManClick={this.isManClick}
      tempCatChange={this.tempCatChange}
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
    />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback)),
  postB2BRolesActiveList: (body, callback) => dispatch(postB2BRolesActiveList(body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  postB2BTemplateCreateAPI: (body, callback) => dispatch(postB2BTemplateCreateAPI(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(TemplateCreate);