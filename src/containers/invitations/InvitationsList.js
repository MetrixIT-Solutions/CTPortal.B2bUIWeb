/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InvitationsListComponent, InvitationPopupsComponent } from '../../components/invitations';
import { deleteB2BInvitationsDelete, PostB2BInvitationsList, postB2BInvitationsClosedList } from '../../actions/invitations/InvitationActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import InviteConsultant from './InviteConsultant';
import ReInviteCounsultant from './ReInviteCounsultant';
import {InviteNotesList} from './notes';
import {InviteMeetingsList} from './meetings';
import {InviteReviewersList} from './reviewers';

class InvitationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitationsList: [], invitationsListCount: 0,
      actPgNum: 1, searchStr: '', pageLimit: 10,
      isSearch: false, statusModal: false, deleteModal: false,
      disable: false, errMsg: '',
      userData: {}, inviteData: {}, showInvite: false,
      showNotes: false, showMeetings: false, showReview: false,
      statusModal : false, invtnsShow: '',
      invtsListCountObj: { opnCount: 0, sbmtdCount:0, apprvdCount:0, rjctdCount:0, reopenCount:0 }, 
      status: [],
      closedModal: false, 
      startDate: '', 
      endDate: '', 
      iStatus: 'All',
      invCuntShow: true,
      rolesObj:{}, 
      loading: true,
      isReInvite: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnJbTitleArr: []
    };
    this.invtnsRef = {};
  }
  setStateData = (data) => this.setState({ ...data });

  componentDidMount = async () => {
    const { actPgNum, searchStr, pageLimit, isSearch,status } = this.state;
    this.getInvList(actPgNum, searchStr, pageLimit, isSearch, status);
    this.getSkillsList();
  }
  getInvList = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
    const { invtsListCountObj } = this.state;
    // localForage get item for user info
    const userObj = await localForage.getItem('userInfo');
    const userData = userObj.value || {};    
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const reqBody = { pgNum: actPgNum, limit: pageLimit, searchStr, status };
    this.props.PostB2BInvitationsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.invitesCountByStatus;
        const countsObj = respData.length > 0 ? this.setStatus(respData) : invtsListCountObj;
        this.setState({ userData, rolesObj: {...rolesObj, appAcc}, invitationsList: resObj.resData.result.invitationsList, invitationsListCount: resObj.resData.result.invitationsListCount, actPgNum, searchStr, pageLimit, invtsListCountObj: countsObj, loading: false });
      } else if (isSearch) {
        this.setState({ userData, rolesObj: {...rolesObj, appAcc}, invitationsList: [], invitationsListCount: 0, actPgNum: 1, searchStr, pageLimit, loading: false });
      } else {
        this.setState({ userData, rolesObj: { ...rolesObj, appAcc}, loading: false });
      }
    });
  }
  getSkillsList = () => {
    const reqBody = { actPgNum: 1, rLimit: 100 }
    this.props.PostB2BDropdownsListAPI(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result.lookUpsList;
        const data = resData.map(item => ({ ...item, label: item.name, value: item.name }));
        const cmnJbTitleArr = data?.length > 0 ? data.filter(item => item.type === 'Job Title') : [];
        this.setState({ cmnJbTitleArr });
      } else {
        this.setState({ cmnJbTitleArr: [] });
      }
    })
  }
  setStatus = (resData) => {
    let opnCount = 0, sbmtdCount = 0, apprvdCount = 0, rjctdCount = 0, reopenCount = 0;
    const opnObj = resData.find(item => item._id == "Open");
    const sbmtdObj = resData.find(item => item._id == "Submitted");
    const apprvdObj = resData.find(item => item._id == "Approved");
    const rjctdObj = resData.find(item => item._id == "Rejected");
    const reopenObj = resData.find(item => item._id == "Reopen");
    opnCount = opnObj ? opnObj.count : 0,
    sbmtdCount = sbmtdObj ? sbmtdObj.count : 0,
    apprvdCount = apprvdObj ? apprvdObj.count : 0,
    rjctdCount = rjctdObj ? rjctdObj.count : 0,
    reopenCount = reopenObj ? reopenObj.count : 0
    return { opnCount, sbmtdCount, apprvdCount, rjctdCount, reopenCount }
  }

  statusClick = (key) => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key)
      this.setState({ status: st });
      this.getInvList(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.setState({ status: [...status, key] });
      this.getInvList(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  handleRouteCons = () => hashHistory.push('/consultants');
  handleInviteCons = (showInvite, lc) => {
    if(lc) {
      const {pageLimit} = this.state;
      this.getInvList(1, '', pageLimit, false);
    }
    this.setState({showInvite});
  }
  handleInvNotes = (inviteData) => this.setState({inviteData, showNotes: true, invtnsShow: '' });
  handleInvMeetings = (inviteData) => this.setState({ inviteData, showMeetings: true, invtnsShow: '' });
  handleReview = (inviteData) => this.setState({ inviteData, showReview: true, invtnsShow: '' });

  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getInvList(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getInvList(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);

  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state
    this.getInvList(activePage, searchStr, pageLimit, false, status);
  }
  handleChangeLimit = (e) => {
    const { searchStr,status } = this.state;
    let pageLimit = Number(e.target.value);
    this.getInvList(1, searchStr, pageLimit, false, status);
  }

  handleInviteDelete = () => {
    const { inviteData } = this.state;
    const recordId = inviteData._id;
    const reqBody = { userId: inviteData.refUID, myPrimary: inviteData.myPrimary };
    this.props.deleteB2BInvitationsDelete(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false, inviteData: {}, errMsg: '' });
        this.getInvList(1, '', 10, false);
      } else {
        this.setState({ errMsg: 'Invitation Delete Failed', disable: false });
      }
    });
  }

  handleInvtnsMenu = (invtnsId) => {
    const { invtnsShow } = this.state;
    this.setState({invtnsShow: invtnsShow ? '' : invtnsId});
  }

  handleClickOutside = (event) => {
    const { invtnsShow } = this.state;
    if (this.invtnsRef[invtnsShow] && !this.invtnsRef[invtnsShow].contains(event.target)) {
      this.setState({ invtnsShow: '',  });
    }
  }

  handleStatusApply = () => {
    const { startDate, endDate, iStatus, actPgNum, searchStr, pageLimit } = this.state;
    if(!startDate){
      this.setState({ errMsg: "Start Date is required"});
    } else if(!endDate){
      this.setState({ errMsg: "End Date is required"});
    } else if(!iStatus){
      this.setState({ errMsg: "Status is required"});
    } else {
      const reqBody = {
        startDate, endDate, iStatus, pgNum: actPgNum, searchStr: searchStr, limit: pageLimit
      };
      this.props.postB2BInvitationsClosedList(reqBody, (resObj) => {
        if(resObj.status == '200') {
          this.setState({ closedModal: false, errMsg: '', disable: false, invitationsList: resObj.resData.result.invitationsList, invitationsListCount: resObj.resData.result.invitationsListCount, actPgNum, searchStr, pageLimit, invCuntShow: false });
        } else {
          this.setState({ invitationsList: [], invitationsListCount: 0, closedModal: false, errMsg: '', disable: false });
        }
      })
    } 
  }

  handleClearInvFltr = () => {
    const { actPgNum, searchStr, pageLimit, isSearch,status } = this.state;

    this.setState({ startDate: '', endDate: '', iStatus: 'All', invCuntShow: true})
    this.getInvList(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  handleCreateSkill = (type) => {
      const { cmnValue } = this.state;
      if (!cmnValue) {
        this.setState({ cmnErrMsg: `${type} is required` });
      } else {
        const reqBody = { type, name: cmnValue.replace(/\s+$/, '') };
        this.props.PostB2BDropdownsCreateAPI(reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ cmnErrMsg: `${type} Created Successfully` });
            setTimeout(() => {
              this.getSkillsList();
              this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' })
            }, 1000);
          } else if (resObj.status == '103') this.setState({ cmnErrMsg: resObj.resData.message });
          else {
            this.setState({ cmnErrMsg: `${type} Create Failed` });
            setTimeout(() => {
              this.getSkillsList();
              this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' });
            }, 1000);
          }
        })
      }
    }
  render() {
    const {rolesObj, inviteData, userData} = this.state;
    const setMeeting = rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[21]?.isAlwd || rolesObj?.appAcc;
    const isMeeting = setMeeting && (inviteData?.iStatus && inviteData.iStatus !== 'Approved' && inviteData.iStatus !== 'Rejected') 
    return <>
      <InvitationsListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleRouteCons={this.handleRouteCons}
        handleInviteCons={this.handleInviteCons}
        handleInvNotes={this.handleInvNotes}
        handleInvMeetings={this.handleInvMeetings}
        handleReview = {this.handleReview}
        handleInvtnsMenu={this.handleInvtnsMenu}
        invtnsRef={this.invtnsRef}
        handleClickOutside={this.handleClickOutside}
        statusClick={this.statusClick}
        handleClearInvFltr={this.handleClearInvFltr}
      />
      <InviteConsultant showInvite={this.state.showInvite} handleInviteCons={this.handleInviteCons} />
      {(this.state.deleteModal || this.state.closedModal) && <InvitationPopupsComponent
        handleInviteDelete={this.handleInviteDelete}
        setStateData={this.setStateData}
        state={this.state}
        handleStatusApply={this.handleStatusApply}
        handleCreateSkill={this.handleCreateSkill}
      />}
      <ReInviteCounsultant isReInvite={this.state.isReInvite} setStateData={this.setStateData} inviteData={this.state.inviteData} />
      <InviteNotesList showNotes={this.state.showNotes} inviteData={this.state.inviteData} handleNotes={this.setStateData} />
      <InviteMeetingsList showMeetings={this.state.showMeetings} userData={userData} inviteData={this.state.inviteData} handleMeetings={this.setStateData} iType='Invitation' isMeeting={isMeeting}/>
      <InviteReviewersList showReview={this.state.showReview} inviteData={this.state.inviteData} handleReviewers={this.setStateData} />
    </>
  }
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BInvitationsList: (body, callback) => dispatch(PostB2BInvitationsList(body, callback)),
  deleteB2BInvitationsDelete: (recordId, body, callback) => dispatch(deleteB2BInvitationsDelete(recordId, body, callback)),
  postB2BInvitationsClosedList: (body, callback) => dispatch(postB2BInvitationsClosedList(body, callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(InvitationsList);
