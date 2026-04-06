/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import hashHistory from '../../hashHistory';
import RolesCreateComponent  from '../../components/roles/RolesCreateComponent';
import { postB2BRolesCreate } from '../../actions/roles/RolesActions';

class RolesCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleName: '',
      roleCode: '',
      roleSeq: '',
      rType: '',
      roleStatus: 'Active',
      errMsg: '',
      disabled: false
    };
  }

  componentDidMount = () => {
    const {rolesListCount} = this.props.RolesReducer;
    this.setState({roleSeq: rolesListCount + 1 });
  }

  setStateData = (data) => this.setState({...data});

  rolesCreate = (event) => {
    const { roleName, roleCode, roleSeq, roleStatus, rType } = this.state;
    if (!rType) {
      this.setState({ errMsg: 'Role Type is required' });
    } else if (!roleName.trim()) {
      this.setState({ errMsg: 'Name is required' });
    } else if (!roleCode) {
      this.setState({ errMsg: 'Code is required' });
    } else if (!roleSeq) {
      this.setState({ errMsg: 'Sequence is required' });
    } else if (!roleStatus) {
      this.setState({ errMsg: "Status is required" });
    } else if(rType == 'Management' && roleName.trim() == 'Super Admin'){
      this.setState({errMsg: 'Given role name is not allowed to create'});
    } else {
      this.setState({disabled: true});
      const reqBody = { roleName: roleName.trim(), roleCode, roleSeq, roleStatus, rType };
      this.props.postB2BRolesCreate(reqBody, (resObj) => {
        this.setState({disabled: false});
        if (resObj.status == '200') {
          hashHistory.push('/admin-users/roles');
        } else if(resObj.status == '196'){
          this.setState({errMsg: resObj.resData.message });
        } else {
          this.setState({ errMsg: 'Role Creation Failed' });
        }
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <RolesCreateComponent
        state={this.state}
        setStateData={this.setStateData}
        rolesCreate={this.rolesCreate}
      />
    )
  };
}

const mapStateToProps = (state) => ({
  RolesReducer: state.RolesReducer
});
const mapDistachToProps = (dispatch) => ({
  postB2BRolesCreate: (body, callback) => dispatch(postB2BRolesCreate(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(RolesCreate);
