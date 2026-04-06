/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BranchesListComponent } from '../../components/branches';
import { PostB2BBranchesList, GetB2BBranchesView, putB2BBranchesStatusUpdate, deleteB2BBranchesDelete } from '../../actions/branches/BranchActions';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';

class BranchesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      branchesList: [],
      branchesListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      isSearch: false,
      viewModal: false,
      branchData: {},
      statusModal: false,
      deleteModal: false,
      brchShow: '',
      rolesObj:{},
      loading: true
    }
    this.brchRef = {};
  }
  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch } = this.state;
    this.getBranchesList(actPgNum, searchStr, pageLimit, isSearch);
  }
  getBranchesList = async (actPgNum, searchStr, pageLimit, isSearch) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = {
      pgNum: actPgNum,
      limit: pageLimit,
      searchStr: searchStr
    };
    this.props.PostB2BBranchesList(reqBody, async (resObj) => {      
      if (resObj.status == '200') {
        this.setState({  rolesObj: {...rolesObj, appAcc}, branchesList: resObj.resData.result.orgBranchesList, branchesListCount: resObj.resData.result.orgBranchesListCount, actPgNum, searchStr, pageLimit, loading : false });
      } else if (isSearch) {
        this.setState({  rolesObj: {...rolesObj, appAcc}, branchesList: [], branchesListCount: 0, actPgNum: 1, searchStr, pageLimit, loading : false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc, loading : false } });
      }
    });
  }
  setStateData = (data) => this.setState({ ...data });

  handleChangeSearch = (e) => {
    const { pageLimit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getBranchesList(1, '', pageLimit, false);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getBranchesList(1, this.state.searchStr, this.state.pageLimit, true);
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit } = this.state;
    this.getBranchesList(activePage, searchStr, pageLimit, false);
  }
  handleChangeLimit = (e) => {
    const { searchStr } = this.state;
    let pageLimit = e.target.value;
    this.getBranchesList(1, searchStr, pageLimit, false);
  }
  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  handleViewBranch = (branchData) => {
    const recordId = branchData._id;
    this.props.GetB2BBranchesView(recordId, resObj => {
      if (resObj.status == '200') {
        this.setState({ branchData: resObj.resData.result, viewModal: true, brchShow: '' });
      } else {
        this.setState({ branchData, viewModal: true, brchShow: '' });
      }
    });
  }

  handleStatusUpdate = () => {
    const { branchData } = this.state;
    this.setState({ disable: true });
    const recordId = branchData._id;
    const status = branchData.obStatus == 'Active' ? 'Inactive' : 'Active';
    const reqBody = { status };
    this.props.putB2BBranchesStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', branchData: {} });
        this.getBranchesList(this.state.actPgNum, this.state.searchStr, this.state.pageLimit, this.state.isSearch);
      }
      else {
        this.setState({ errMsg: 'Branch Status Update Failed', disable: false })
      }
    });
  }

  handleBranchDelete = () => {
    const { branchData } = this.state;
    const recordId = branchData._id;
    this.setState({ disable: true })
    const reqBody = { obranch: branchData._id, obCode: branchData.obCode }
    this.props.deleteB2BBranchesDelete(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false, branchData: {}, errMsg: '' });
        this.getBranchesList(1, '', 10, false);
      } else {
        this.setState({ errMsg: 'Branch Delete Failed', disable: false });
      }
    });
  }

  handleBrchMenu = (brchId) => {
    const {brchShow} = this.state;
    this.setState({brchShow: brchShow ? '' : brchId});
  }

  handleClickOutside = (event) => {
    const { brchShow } = this.state;
    if (this.brchRef[brchShow] && !this.brchRef[brchShow].contains(event.target)) {
      this.setState({ brchShow: '' });
    }
  }

  render() {
    return (
      <BranchesListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleViewBranch={this.handleViewBranch}
        handleStatusUpdate={this.handleStatusUpdate}
        handleBranchDelete={this.handleBranchDelete}
        handleRouteHome={this.handleRouteHome}
        handleBrchMenu={this. handleBrchMenu}
        brchRef={this.brchRef}
        handleClickOutside={this.handleClickOutside}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BBranchesList: (body, callback) => dispatch(PostB2BBranchesList(body, callback)),
  GetB2BBranchesView: (recordId, callback) => dispatch(GetB2BBranchesView(recordId, callback)),
  putB2BBranchesStatusUpdate: (recordId, body, callback) => dispatch(putB2BBranchesStatusUpdate(recordId, body, callback)),
  deleteB2BBranchesDelete: (recordId, body, callback) => dispatch(deleteB2BBranchesDelete(recordId, body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(BranchesList);
