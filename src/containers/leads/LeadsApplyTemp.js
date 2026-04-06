/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LeadsApplyTempComponent } from '../../components/leads';
import { getB2BTemplateAssignListAPI } from '../../actions/templates/TemplatesActions';
import { putB2BLeadsTemplateUpdate } from '../../actions/leads/LeadsAction';

class LeadsApplyTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      lead: props.lead,
      leadsList: props.leadsList,
      userData: props.userData,
      org: props.lead.org,
      team: props.lead.team,
      uaRoles: [],
      userRole: '',
      uaUsers: [],
      user: '',
      tempList: [],
      template: '',
      errMsg: '',
      tempCat:''
    };
  }

  setStateData = (data) => this.setState({ ...data });

  componentDidUpdate = (prevProps) => {    
    if (this.props?.appTemp !== prevProps?.appTemp && prevProps?.lead?._id !== this.props?.lead?._id && this.props?.lead?._id) {      
      const { lead, userData, leadsList, tempCat } = this.props;      
      this.setState({ lead, userData, org: lead.org, team: lead.team, showModal: true, leadsList, tempCat });
      this.applyTemplates(lead, userData, tempCat);
    }
  }
  handleClose = () => {
    this.setState({ lead: {}, userData: {}, org: '', team: '', showModal: false, uaRoles: [], userRole: '', uaUsers: [], user: '', tempList: [], template: '', errMsg: '' });
    this.props.setStateData({ leadView: {}, appTemp: false });
  }
  applyTemplates = (lead, userData, tempCat) => {
    if (userData.userType === 'Employee') {
      // Call API to get templates list
      // CallAPI tempCat
      const reqBody = { tempCat}
      this.tempApiCall(reqBody);
    } else {
      const uniqueData = lead?.ua && lead.ua?.length > 0 ? [...new Map(lead.ua.map(obj => [obj._id, obj])).values()] :[];
      const uaRoles = uniqueData && uniqueData.length > 0 ? uniqueData.map(item => ({ ...item, value: item.role, label: item.role })) : [];
      this.setState({ uaRoles });
      // 1. Get unique userRoles from lead.ua
      // 2. Set to luaRoles 
    }
  }
  getUsersByUaRole = (lead, userRole) => {
    // filter users from lead.ua with usersRole
    // Set luaUsers
    const uniqueData = lead?.ua && lead.ua?.length > 0 ? [...new Map(lead.ua.map(obj => [obj._id, obj])).values()] :[];
    const uaRoles = uniqueData && uniqueData.length > 0 ? uniqueData.filter(item => item.role == userRole.role) : [];
    const uaUsers = userRole._id && uaRoles && uaRoles.length > 0 ? uaRoles.map(item => ({ ...item, value: item.name, label: item.name })) : [];
    this.setState({ userRole, uaUsers, errMsg: '',user:'' });
  }
  getTemplatesData = (lead, userRole, user) => {    
    // set Request Body => userRole, user, lead.team, lead.org
    const {tempCat} = this.state;
    this.setState({ user, errMsg: '' })
    const reqBody = { userRole: userRole.role, user: user._id, team: lead.team, org: lead.org, tempCat };
    this.tempApiCall(reqBody);
  }
  tempApiCall = (reqBody) => {    
    this.props.getB2BTemplateAssignListAPI(reqBody, (resObj) => { 
      if (resObj.status == '200') {
        const tempList = resObj.resData.result.length > 0 ? resObj.resData.result.map(item => ({ ...item, value: item.tempName, label: item.tempName })) : [];
        this.setState({ tempList });
      } else {
        this.setState({ tempList: [] });
      }
    })
  }
  getApplyTemplates = () => {
    // Final Call API
    const { userData, userRole, user, template, tempList, lead, leadsList, tempCat } = this.state;
    const tempObj = tempList && tempList.length > 0 ? tempList.find(item => item._id == template) :{};        
    if (userData.userType != 'Employee' && !userRole.role) {
      this.setState({ errMsg: 'User Role is required' });
    } else if ( userData.userType != 'Employee' && !user._id) {
      this.setState({ errMsg: 'User is required' });
    } else if (!template) {
      this.setState({ errMsg: 'Apply Template is required' });
    } else {
      const reqBody = { 
        template,
        tempCat,
        tempName: tempObj.tempName,
        urID: userRole._id ? userRole._id :'',
        userRole: userRole._id ? userRole.role :'',
        urSeq: tempObj._id ? tempObj.urSeq :'',
        tdCount: tempObj.tempData && tempObj.tempData.length,
        lType: (tempCat === 'Consultant On Boarding' || tempCat === 'Consultant In Marketing' || tempCat === 'Consultant BGV') ? 'Leads':''
      };
      this.props.putB2BLeadsTemplateUpdate(lead._id, reqBody, (resObj) => {         
        if (resObj.status == '200') {
          const index = leadsList.findIndex((a) => a._id === lead._id);
          if(index > -1) leadsList[index] = resObj.resData.result;
          this.handleClose();
        } else {
          this.setState({ errMsg: 'Apply Template Failed' })
        }
      })
    }
  }

  render() {    
    return <LeadsApplyTempComponent state={this.state} handleClose={this.handleClose} setStateData={this.setStateData} getUsersByUaRole={this.getUsersByUaRole} getTemplatesData={this.getTemplatesData} getApplyTemplates={this.getApplyTemplates} />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BTemplateAssignListAPI: (body, callback) => dispatch(getB2BTemplateAssignListAPI(body, callback)),
  putB2BLeadsTemplateUpdate: (id, body, callback) => dispatch(putB2BLeadsTemplateUpdate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(LeadsApplyTemp);