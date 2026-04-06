/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postB2BOrgTeamsList, getB2BOrgTeamsView, deleteB2BOrgTeamsDelete, putB2BOrgTeamsStatusUpdate } from '../../actions/panels/PanelsActions';
import OrgPanelsListComponent from '../../components/panels/OrgPanelsListComponent';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

class OrgPanelsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgTeamsList: [],
      orgTeamsListCount: 0,
      pgNum: 1,
      limit: 10,
      searchStr: '',
      deleteModal: false,
      panelsData: {},
      viewModal: false,
      statusModal: false,
      pnlsShow: '',
      rolesObj: {},
      loading: true
    };
    this.pnlsRef = {};
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidMount = () => {
    const { pgNum, limit, searchStr } = this.state;
    this.postB2BOrgTeamsListData(pgNum, limit, searchStr, false);
  }
  postB2BOrgTeamsListData = async (pgNum, limit, searchStr, searchKey) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = { pgNum, limit, searchStr };
    this.props.postB2BOrgTeamsList(reqBody, (response) => {
      if(response.status == '200') {
        this.setState({ rolesObj: {...rolesObj, appAcc}, orgTeamsList: response.resData.result.orgTeamsList, orgTeamsListCount: response.resData.result.orgTeamsListCount, pgNum, limit, searchStr, loading : false })
      } else if(searchKey){
        this.setState({ rolesObj: {...rolesObj, appAcc}, orgTeamsList: [], orgTeamsListCount: 0, pgNum, limit, searchStr, loading : false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, loading : false });
      }
    });
  }
  handleRouteHome = async() => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  handleChangeSearch = (event) => {
    const { limit } = this.state;
    this.setState({ searchStr: event.target.value });
    event.target.value === '' && this.postB2BOrgTeamsListData(1, limit, '', false);
  }
  handleKeyInput = (e) => e.key === "Enter" && this.postB2BOrgTeamsListData(1, this.state.limit, this.state.searchStr, true);
  handlePagination = (pgNum) => {
    const { limit, searchStr } = this.state;
    this.postB2BOrgTeamsListData(pgNum, limit, searchStr, false);
  }
  handleChangelimit = (event) => {
    const { searchStr } = this.state;
    const pgLimit = Number(event.target.value);
    this.postB2BOrgTeamsListData(1, pgLimit, searchStr, false);
  } 
  handleViewData = (data) =>{
    this.props.getB2BOrgTeamsView(data._id,(resObj) => {
      if(resObj.status = '200') {
        this.setState({ panelsData: resObj.resData.result, viewModal: true, pnlsShow: ''});
      } else {
        this.setState({ panelsData: data, viewModal: true, pnlsShow: '' });
      }
    });
  }
  handlePanelsDelete = () => {
    const { panelsData } = this.state;
    const recordId = panelsData._id;
    const oTeam = panelsData.oTeam;
    const otCode = panelsData.otCode; 
    const reqBody = { oTeam,otCode }
    this.props.deleteB2BOrgTeamsDelete( recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false });
        this.postB2BOrgTeamsListData(1, 10, '', true);
      } else if(resObj.status == '194') {
        this.setState({ errMsg: resObj.resData.result || 'Delete failed' });
      } else {
        this.setState({ errMsg: 'Delete failed' });
      }
    });
  }
  handleStatusUpdate = () => {
    const { panelsData } = this.state;
    const recordId = panelsData._id;
    this.setState({ disable: true });
    const reqBody = { status:panelsData.otStatus == 'Active' ? 'Inactive' : 'Active' };
    this.props.putB2BOrgTeamsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', panelsData: {}, disable: false });
        this.postB2BOrgTeamsListData(1, 10, '', true);
      } else if (resObj.status == '195') {
        this.setState({ errMsg: resObj.resData.result || 'Panels Status update failed', disable: false });
      } else {
        this.setState({ errMsg: 'Panels Status update failed', disable: false });
      }
    });
  }

  handlePnlsMenu = (pnlsId) => {
    const {pnlsShow} = this.state;
    this.setState({pnlsShow: pnlsShow ? '' : pnlsId});
  }

  handleClickOutside = (event) => {
    const { pnlsShow } = this.state;
    if (this.pnlsRef[pnlsShow] && !this.pnlsRef[pnlsShow].contains(event.target)) {
      this.setState({ pnlsShow: '' });
    }
  }

  render() {
    return (
      <OrgPanelsListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handlePagination={this.handlePagination}
        handleChangelimit={this.handleChangelimit}
        handleViewData={this. handleViewData}
        handlePanelsDelete={this.handlePanelsDelete}
        handleStatusUpdate={this. handleStatusUpdate}
        handlePnlsMenu={this.handlePnlsMenu}
        pnlsRef={this.pnlsRef}
        handleClickOutside={this. handleClickOutside}
      />
    );
  }
}

const mapStateToProps = () => ({})
const mapDistachToProps = (dispatch) => ({
  postB2BOrgTeamsList: (body, callback) => dispatch(postB2BOrgTeamsList(body, callback)),
  getB2BOrgTeamsView: (body, callback) => dispatch(getB2BOrgTeamsView(body, callback)),
  deleteB2BOrgTeamsDelete:(recordId, body, callback) => dispatch(deleteB2BOrgTeamsDelete(recordId, body, callback)),
  putB2BOrgTeamsStatusUpdate:(recordId, body, callback) => dispatch(putB2BOrgTeamsStatusUpdate(recordId, body, callback)),  
});

export default connect(mapStateToProps, mapDistachToProps)(OrgPanelsList);