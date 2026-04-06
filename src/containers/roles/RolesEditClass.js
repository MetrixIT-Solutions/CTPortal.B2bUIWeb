/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';

import { RolesEditComponent } from '../../components/roles';
import { getB2BRoleView } from '../../actions/roles/RolesActions';
import { putB2BRoleUpdate } from '../../actions/roles/RolesActions';

class RolesEditClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roleName: '',
      roleCode: '',
      roleSeq: '',
      rType: '',
      roleStatus: 'Active',
      errMsg: '',
      id: props.id,
      disabled: false,
      oldData: {},
      rolesListData: []
    };
  }
  
  setStateData = (data) => this.setState({ ...data });

  componentDidMount = () => {
    // Get latest role data by ID
    this.getB2BRoleViewData();
  }
  getB2BRoleViewData = () => {
    const {id} = this.state;
    this.props.getB2BRoleView(id, (resObj) => {
      if (resObj.status == '200') {
        const rlData = resObj.resData.result;
        this.setRoleData(rlData);
      } else {
        const rData = this.getSelectedRole(id);
        rData && rData.rName && this.setRoleData(rData);
      }
    });
  }
  setRoleData = (data) => {
    const rData = {
      roleName: data.rName,
      roleCode: data.rCode,
      roleSeq: data.rSeq.toString(),
      roleStatus: data.rStatus,
      rType: data.rType
    };
    this.setState({ ...rData, oldData: rData });
  }
  // Set role data from Roles Reducer
  getSelectedRole = (id) =>{
    const {rolesList} = this.props.RolesReducer;
    const rData = rolesList && rolesList.length > 0 && rolesList.find(item => item._id === id);
    return rData;
  }

  // update api in edit
  roleUpdate = (event) => {
    const { id, roleName, roleCode, roleSeq, roleStatus, oldData, rType } = this.state;
    if(!rType) {
      this.setState({errMsg: 'Role Type is required'});
    } else if(!roleName.trim()){
      this.setState({errMsg: 'Name is required'});
    } else if(!roleCode){
      this.setState({errMsg: 'Code is required'});
    } else if(!roleSeq){
      this.setState({errMsg: 'Sequence is required'});
    } else if(rType == 'Management' && roleName.trim() == 'Super Admin'){
      this.setState({errMsg: 'Given role name is not allowed to update'});
    } else {
      const reqBody = { roleName: roleName.trim(), roleCode, roleSeq, roleStatus, rType };
      if (JSON.stringify(oldData) != JSON.stringify(reqBody)) {
        this.setState({disabled: true});
        this.props.putB2BRoleUpdate(id, reqBody, (resObj) => {
          if (resObj.status == '200') {
            hashHistory.push('/admin-users/roles')
          } else if (resObj.status == '196') {
            this.setState({ errMsg: resObj.resData.message, disabled: false });
          } else {
            this.setState({ errMsg: 'Role Updation Failed', disabled: false })
          }
        });
      } else {
        this.setState({ errMsg: 'There are no changes' });
      }
    }
    event.preventDefault();
  }

  render() {  
    return <RolesEditComponent state={this.state} roleUpdate={this.roleUpdate} setStateData={this.setStateData} />
  }
}

const mapStateToProps = (state) => ({
  RolesReducer: state.RolesReducer
});
const mapDistachToProps = (dispatch) => ({
  getB2BRoleView: (id, callback) => dispatch(getB2BRoleView(id, callback)),
  putB2BRoleUpdate: (id, body, callback) => dispatch(putB2BRoleUpdate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(RolesEditClass);
