/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplateViewComponent } from '../../components/templates';
import { getB2BTemplateViewAPI } from '../../actions/templates/TemplatesActions';
import localForage from '../../hooks/localForage';

class TemplateSubView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempViewObj: {},
      loading: true,
      rolesObj: {},
      tempData:[],
      userInfo: {},
      sectionData: {},
      showCases: false
    };
  };
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const urObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...urObj, appAcc };
    this.setState({ userInfo, rolesObj });
    this.getTempView(this.props.id);
  }
  getTempView = (id) => {
    this.props.getB2BTemplateViewAPI(id, (resObj) => {      
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        const tempData = this.setData(data.tempData);
        const urData = data?.urData?.length > 0? data.urData.map((item) => ({ ...item, label: item.userRole, value: item._id })) :[];
        this.setState({ tempViewObj: {...data, urData}, loading: false, tempData });
      } else {
        this.setState({ tempViewObj: {}, loading: false });
      }
    })
  }
  setData = (tempData) => {
    const processedData = tempData && tempData.length > 0 && tempData.map(item => {
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
        return { ...rest };
      }
      if(item.dataType === "Image" || item.dataType === "File"|| item.dataType === "Image/File"){
        const {data, ...rest} = item
        // return { ...rest, [dataKey]: item.data?.join(", ") || "" };
        return { ...rest, [dataKey]: item.data.map(item => ({value: item, label: item})) };
      }
      if (item.dataType === "Number") {
        const { data, ...rest } = item;
        return { ...rest };
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
    return processedData
  };
  setStateData = (data) => this.setState({...data}); 
  render() {
    return <TemplateViewComponent
      state={this.state}
      setStateData={this.setStateData}
    />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BTemplateViewAPI: (id, callback) => dispatch(getB2BTemplateViewAPI(id, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(TemplateSubView);