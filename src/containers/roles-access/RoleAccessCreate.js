/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostB2BRoleAccessCreate } from '../../actions/rolesAccess/RolesAccessActions';
import { postB2BRolesList } from '../../actions/roles/RolesActions';
import { postB2bUsersTotalList } from '../../actions/users/UsersActions';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';

import { RoleAccessCreateComponent } from '../../components/roles-access';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import data from '../../../public/data/RolesAccess.json'

class RoleAccessCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rType: '',
      rOrg: '',
      rName: '',
      uName: '',
      raSeq: 0,
      errMsg: '',
      disable: false,
      selectedItems: data,
      rolesList: [],
      usrsList: [],
      orgsList: []
    }
  }
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const rc = await localForage.getItem('rAccCount');
    const raSeq = rc.value || '';
    this.setState({ raSeq: raSeq + 1 });
    userInfo.userType == 'Employee' && this.getRolesList('Employee');
    this.postB2BOrgsData();
  }
  setStateData = (data) => this.setState({ ...data });
  getRolesList = (userType) => {
    const reqBody = { actPgNum: 1, rLimit: 100, searchStr: '', status: 'Active', userType }
    this.props.postB2BRolesList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesList: resObj.resData.result.rolesList });
      } else {
        this.setState({ rolesList: [] });
      }
    })
  }
  handleOnChange = (e, type) => {
    const { value } = e.target;
    const { rType, rName, rOrg, rolesList } = this.state;
    if (type == 'rType') {
      if (value) {
        this.setState({ rType: e.target.value, errMsg: '', usrsList: [], uName: '' });
        this.getRolesList(value);
        const rInfo = rolesList && rolesList.length > 0 ? rolesList.find(item => item._id == value) : {};
        value && rInfo?.rName && rOrg && this.postB2BUsersData(value, rInfo?.rName, rOrg);
      } else {
        this.setState({ rType: '', rolesList: [], rName: '', usrsList: [], uName: '' });
      }
    } else if (type == 'rName') {
      if (value) {
        this.setState({ rName: value, errMsg: '' });
        const rInfo = rolesList && rolesList.length > 0 ? rolesList.find(item => item._id == value) : {};
        rType && value && rOrg && this.postB2BUsersData(rType, rInfo.rName, rOrg);
      } else {
        this.setState({ rName: '', errMsg: '', usrsList: [], uName: '' });
      }
    } else if (type == 'rOrg') {      
      this.setState({ rOrg: value, errMsg: '' });
      const rInfo = rolesList && rolesList.length > 0 ? rolesList.find(item => item._id == rName) : {};
      rType && rName && value && this.postB2BUsersData(rType, rInfo?.rName, value);
    } else {
      this.setState({ uName: value, errMsg: '' });
    }
  }
  postB2BUsersData = (rType, rName, oName) => {
    const { orgsList } = this.state;    
    const oInfo = orgsList && orgsList.length > 0 ? orgsList.find(item => item._id == oName) : {};        
    const reqBody = {
      userType: [rType],
      userRole: [rName],
      org: oInfo._id,
      orgName: oInfo.orgName,
      orgCode: oInfo.orgCode,
      orgs: [oInfo._id],
      orgNames: [oInfo.orgName],
    };    
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const usrsList = resObj.resData.result.map((item) => {
          return { label: item.name, value: item._id, ...item };
        });
        this.setState({ usrsList });
      } else {
        this.setState({ usrsList: [] });
      }
    });
  }
  postB2BOrgsData = () => {
    const reqBody = { status: 'Active' };
    this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        this.setState({ orgsList: resObj.resData.result });
      } else {
        this.setState({ orgsList: [] });
      }
    });
  }
  handleCheckBoxChange = (product, action) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      const productIndex = selectedItems.findIndex(item => item._id === product._id);
      if (productIndex === -1) {
        const listAction = updatedActions.find(a => a.aName === 'List');
        return {
          selectedItems: [
            ...selectedItems,
            { ...product, isAlwd: listAction ? listAction.isAlwd : false, actions: product.actions.map(a => ({ ...a, isAlwd: a._id === action._id ? !a.isAlwd : a.isAlwd })) }
          ], errMsg: ''
        };
      } else {
        const updatedProduct = { ...selectedItems[productIndex] };
        const updatedActions = updatedProduct.actions.map(a => a._id === action._id ? { ...a, isAlwd: !a.isAlwd } : a);
        // updatedProduct.isAlwd = updatedActions.some(a => a.isAlwd);
        const listAction = updatedActions.find(a => a.aName === 'List');        
        updatedProduct.isAlwd = listAction ? listAction.isAlwd : false;
        updatedProduct.actions = updatedActions;
        let updatedItems = [...selectedItems];
        // if (!updatedProduct.isAlwd) {
        //   updatedItems = updatedItems.filter(item => item._id !== product._id);
        // } else {
        updatedItems[productIndex] = updatedProduct;
        // }
        return { selectedItems: updatedItems, errMsg: '' };
      }
    });
  };
  roleAccessCreate = () => {
    const { rType, rName, uName, raSeq, selectedItems, rolesList, usrsList, orgsList, rOrg } = this.state
    const rInfo = rolesList && rolesList.length > 0 ? rolesList.find(item => item._id == rName) : {};
    const usrInfo = uName && usrsList && usrsList.length > 0 ? usrsList.find(item => item._id == uName) : {};
    const oInfo = orgsList && orgsList.length > 0 ? orgsList.find(item => item._id == rOrg) : {};            
    if (!rType) {
      this.setState({ errMsg: 'Role Type is required' });
    } else if (!rName) {
      this.setState({ errMsg: 'Role Name is required' });
    } else {
      const reqBody = {
        raSeq,
        rType,
        role: rName,
        rName: rInfo ? rInfo.rName : '',
        rCode: rInfo ? rInfo.rCode : '',
        user: uName,
        uName: usrInfo.name ? usrInfo.name : '',
        urefUID: usrInfo.refUID ? usrInfo.refUID : '',
        uPrimary: usrInfo.myPrimary ? usrInfo.myPrimary : '',
        // ===========
        org: oInfo && oInfo._id ? oInfo._id :'',
        orgName: oInfo && oInfo._id ? oInfo.orgName :'',
        orgCode: oInfo && oInfo._id ? oInfo.orgCode :'',
        orgs: oInfo && oInfo._id ? [oInfo._id] :[],
        orgNames: oInfo && oInfo._id ? [oInfo.orgName] :[],
        obId: '',
        obName: '',
        obCode: '',
        obIds: '',
        team: '',
        tName: '',
        tCode: '',
        teams: '',
        // ===========
        access: selectedItems,
      }
      this.setState({ disable: true });
      this.props.PostB2BRoleAccessCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          hashHistory.push('/admin-users/roles-access');
          this.setState({ disable: false });
        } else if (resObj.status == '103') {
          this.setState({ errMsg: 'Role Name Already Exists', disable: false });
        } else {
          this.setState({ errMsg: 'Role Access Create Failed', disable: false });
        }
      })
    }
  }
  render() {
    return <RoleAccessCreateComponent
      state={this.state}
      setStateData={this.setStateData}
      handleOnChange={this.handleOnChange}
      handleCheckBoxChange={this.handleCheckBoxChange}
      roleAccessCreate={this.roleAccessCreate} />
  }
}

const mapStateToProps = (state) => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BRoleAccessCreate: (body, callback) => dispatch(PostB2BRoleAccessCreate(body, callback)),
  postB2BRolesList: (body, callback) => dispatch(postB2BRolesList(body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(RoleAccessCreate);