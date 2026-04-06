/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RolesListComponent } from '../../components/roles';
import { postB2BRolesList, putB2BRoleStatusUpdate, getB2BRoleView, deleteB2BRolesDelete } from '../../actions/roles/RolesActions';

class RolesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rolesList: [],
      rolesListCount: 0,
      actPgNum: 1,
      rLimit: 10,
      searchStr: '',
      statusModal: false,
      disable: false,
      errMsg: '',
      roleData: {},
      viewModal: false,
      isSearch: false,
      deleteModal: false,
      rolsShow: '',
      loading: true
    };
    this.rolsRef = {}
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidMount = () => {
    const { actPgNum, rLimit, searchStr, isSearch } = this.state;
    this.postB2BRolesData(actPgNum, rLimit, searchStr, isSearch);
  }
  postB2BRolesData = (actPgNum, rLimit, searchStr, isSearch) => {
    const reqBody = { actPgNum, rLimit, searchStr }
    this.props.postB2BRolesList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesList: resObj.resData.result.rolesList, rolesListCount: resObj.resData.result.rolesCount, actPgNum, rLimit, searchStr, loading: false });
      } else if (isSearch) {
        this.setState({ rolesList: [], rolesListCount: 0, actPgNum, rLimit, searchStr, isSearch: searchStr ? true : false, loading: false });
      }
    });
  }
  handleChangeSearch = (event) => {
    const { rLimit } = this.state;
    this.setState({ searchStr: event.target.value });
    event.target.value === '' && this.postB2BRolesData(1, rLimit, '', false);
  }
  handleKeyInput = (e) => e.key === "Enter" && this.postB2BRolesData(1, this.state.rLimit, this.state.searchStr, true);
  handleChangerLimit = (event) => {
    const { searchStr } = this.state;
    let pgrLimit = Number(event.target.value);
    this.postB2BRolesData(1, pgrLimit, searchStr, false);
  }
  handlePagination = (actPgNum) => {
    const { rLimit, searchStr, isSearch } = this.state;
    this.postB2BRolesData(actPgNum, rLimit, searchStr, isSearch);
  }
  handleStatusUpdate = () => {
    const { roleData, actPgNum, rLimit, searchStr } = this.state;
    this.setState({ disable: true });
    const reqBody = { roleStatus: roleData.rStatus == 'Active' ? 'Inactive' : 'Active' };
    this.props.putB2BRoleStatusUpdate(roleData._id, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', roleData: {}, disable: false });
        this.postB2BRolesData(actPgNum, rLimit, searchStr);
      } else {
        this.setState({ errMsg: 'Roles Status update failed', disable: false });
      }
    });
  }
  handleViewClick = (data) => {
    this.setState({ viewModal: true,rolsShow: '' });
    this.handleViewData(data)
  }
  handleViewData = (list) => {
    const { rolesList,rolsShow } = this.props.RolesReducer;
    this.props.getB2BRoleView(list._id, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ roleData: resObj.resData.result,rolsShow: '' })
      } else {
        const rolesObj = rolesList && rolesList.length > 0 ? rolesList.find(item => item._id === list._id) : {}
        this.setState({ roleData: rolesObj,rolsShow: '' })
      }
    });
  }
  handleRolesDelete = () => {
    const { roleData ,rolsShow } = this.state;
    const id = roleData._id;
    const rCode = roleData.rCode;
    const rName = roleData.rName;
    const reqBody = {rCode, rName};
    this.props.deleteB2BRolesDelete(id, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false,rolsShow: '' });
        this.postB2BRolesData(1, 10, '', true);
      } else {
        this.setState({ errMsg: 'Delete failed',rolsShow: '' });
      }
    });
  }

  handleRolsMenu = (rolsId) => {
    const {rolsShow} = this.state;
    this.setState({rolsShow: rolsShow ? '' : rolsId});
  }

  handleClickOutside = (event) => {
    const { rolsShow } = this.state;
    if (this.rolsRef[rolsShow] && !this.rolsRef[rolsShow].contains(event.target)) {
      this.setState({ rolsShow: '' });
    }
  }
  
  render() {
    return (
      <RolesListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangerLimit={this.handleChangerLimit}
        handlePagination={this.handlePagination}
        handleStatusUpdate={this.handleStatusUpdate}
        setStateData={this.setStateData}
        handleViewClick={this.handleViewClick}
        handleRolesDelete={this.handleRolesDelete}
        handleRolsMenu={this.handleRolsMenu}
        rolsRef={this.rolsRef}
        handleClickOutside={this.handleClickOutside}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  RolesReducer: state.RolesReducer
});
const mapDistachToProps = (dispatch) => ({
  postB2BRolesList: (body, callback) => dispatch(postB2BRolesList(body, callback)),
  putB2BRoleStatusUpdate: (id, body, callback) => dispatch(putB2BRoleStatusUpdate(id, body, callback)),
  getB2BRoleView: (id, callback) => dispatch(getB2BRoleView(id, callback)),
  deleteB2BRolesDelete: (id, body, callback) => dispatch(deleteB2BRolesDelete(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(RolesList);

