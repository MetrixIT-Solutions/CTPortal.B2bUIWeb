/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TemplatesListComponent } from '../../components/templates';
import { postB2BTemplatesListAPI } from '../../actions/templates/TemplatesActions';
import localForage from '../../hooks/localForage';

class TemplatesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tempList: [],
      tempsListCount: 0,
      pgNum: 1,
      searchStr: '',
      limit: 10,
      rolesObj: {},
      loading: true,
      tempShow: '',
      userInfo: {},
    };
    this.tempRef = {};
  };
  componentDidMount = () => {
    const { pgNum, searchStr, limit, isSearch } = this.state;
    this.getTempsList(pgNum, searchStr, limit, isSearch);
  }
  getTempsList = async (pgNum, searchStr, limit, isSearch) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value || {};
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = { pgNum, searchStr, limit };
    this.props.postB2BTemplatesListAPI(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, userInfo, tempList: resObj.resData.result.ftList, tempsListCount: resObj.resData.result.ftListCount, pgNum, searchStr, limit, loading: false });
        await localForage.setItem('tempAccCount', resObj.resData.result.ftListCount);
      } else if (isSearch) {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, userInfo, tempList: [], tempsListCount: 0, pgNum: 1, searchStr, limit, loading: false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, userInfo, loading: false });
      }
    });
  }
  setStateData = (data) => this.setState({ ...data });
  handleClickOutside = (event) => {
    const { tempShow } = this.state;
    if (this.tempRef[tempShow] && !this.tempRef[tempShow].contains(event.target)) {
      this.setState({ tempShow: '' });
    }
  }
  handleTempMenu = (id) => {
    const { tempShow } = this.state;
    this.setState({ tempShow: tempShow ? '' : id });
  }
  handleChangeLimit = (e) => {
    const { searchStr } = this.state;
    let limit = e.target.value;
    this.getTempsList(1, searchStr, limit, false);
  }
  handleChangeSearch = (e) => {
    const { limit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getTempsList(1, '', limit, false);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getTempsList(1, this.state.searchStr, this.state.limit, true);
  handleChangePage = (pgNum) => {
    const { searchStr, limit } = this.state;
    this.getTempsList(pgNum, searchStr, limit, false);
  }
  render() {
    return <TemplatesListComponent
      state={this.state}
      setStateData={this.setStateData}
      handleChangeLimit={this.handleChangeLimit}
      handleChangeSearch={this.handleChangeSearch}
      handleKeyInput={this.handleKeyInput}
      handleChangePage={this.handleChangePage}
      tempRef={this.tempRef}
      handleTempMenu={this.handleTempMenu}
    />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BTemplatesListAPI: (body, callback) => dispatch(postB2BTemplatesListAPI(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(TemplatesList);