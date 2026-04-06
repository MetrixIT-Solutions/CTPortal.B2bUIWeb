/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { SubmisListComponent } from '../../components/submissions';
import { PostB2BSubsList, postB2BSubmissionPriorityCreate } from '../../actions/submissions/SubmissionActions';
import {SubmisFwlpsList} from './submisFollowups';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import SubmisLfcsList from './SubmisLfcList';
import { setHeadersToken } from '../../hooks/apihooks';
import {InviteMeetingsList} from '../invitations/meetings';
import SubmisPayRateHistory from './SubmisPayRateHistory';
import hashHistory from '../../hashHistory';
import LeadsFiltersPopup from '../leads/LeadsFiltersPopup';

class SubmisList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submsnsList: [],
      submsnsListCountObj: { subCount: 0, shortCount: 0, invSchCount:0, noRespCount: 0, ntSubCount: 0, rejCount: 0 },
      submsnsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      isStatus: false,
      status: [],
      submitData: {},
      subFwlpModal: false,
      subLfcModal: false,
      statusModal: false,
      payrateModal: false,
      submsnsView: {},
      subStatus: '',
      file: '',
      imgUrl: '',
      iconPath: '',
      sucMsg: '',
      errMsg: '',
      sbmsnShow: '',
      rolesObj: {},
      isVrfd: false,
      userData: {},
      subPrModal: false,
      isprImage: false,
      ipath: '',
      isprHImage:'',
      empData: {}, 
      infoModal: false,
      priority: '',
      prModal: false,
      disabled: false,
      showFilters: false,
      filters: {team: '', pReports: [], tName: '', ons: '', onsName: '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''},
      isSearch: false,
    };
    this.fileInput = React.createRef();
    this.sbmsnRef = {};
  }
  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getSubmsList(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  getSubmsList = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const { filters } = this.state;
    const reqBody = {
      pgNum: actPgNum,
      limit: pageLimit,
      searchStr: searchStr,
      filters: filters.pReports,
      status
    };
    this.props.PostB2BSubsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.submsnsCountByStatus
        const submsnsListCountObj = this.setStatus(respData);
        this.setState({ rolesObj: {...rolesObj, appAcc}, submsnsList: resObj.resData.result.submsnsList, submsnsListCountObj, actPgNum, searchStr, pageLimit, status, submsnsListCount: resObj.resData.result.submsnsListCount, userData: userInfo });
      } else if (isSearch) {
        const submsnsListCountObj = { subCount: 0, shortCount: 0, invSchCount:0, noRespCount: 0, ntSubCount: 0, rejCount: 0 };
        this.setState({ rolesObj: {...rolesObj, appAcc}, submsnsList: [], submsnsListCountObj, actPgNum: 1, searchStr, pageLimit, status, submsnsListCount: 0, userData: userInfo });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, userData: userInfo });
      }
    });
  }
  setStatus = (resData) => {
    let subCount = 0, shortCount = 0, invSchCount = 0, noRespCount = 0, ntSubCount = 0, rejCount = 0;
    const subObj = resData?.find(item => item._id == "Submitted");
    const shortObj = resData?.find(item => item._id == "Shortlisted");
    const invSchObj = resData?.find(item => item._id == "Interview Scheduled");
    const noRespObj = resData?.find(item => item._id == "No Response");
    const ntSbmtdObj = resData?.find(item => item._id == "Not Submitted");
    const rejObj = resData?.find(item => item._id == "Rejected");
    subCount = subObj ? subObj.count : 0,
    shortCount = shortObj ? shortObj.count : 0,
    invSchCount = invSchObj ? invSchObj.count : 0,
    noRespCount = noRespObj ? noRespObj.count : 0,
    ntSubCount = ntSbmtdObj ? ntSbmtdObj.count : 0,
    rejCount = rejObj ? rejObj.count : 0
    return { subCount, shortCount, invSchCount, noRespCount, ntSubCount, rejCount }
  }
  setStateData = (data) => this.setState({ ...data }, () => {
    if(data?.filters?.team === '' || data?.filters?.team) {
      this.getSubmsList(1, '', 10, false, []);
    }
  });
  statusClick = (key) => {
    const { status, actPgNum, searchStr, pageLimit, isSearch } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key);
      this.getSubmsList(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.getSubmsList(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }
  handleChangeLimit = (e) => {
    const { searchStr, status } = this.state;
    let pageLimit = e.target.value;
    this.getSubmsList(1, searchStr, pageLimit, false, status);
  }
  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getSubmsList(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getSubmsList(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getSubmsList(activePage, searchStr, pageLimit, false, status);
  }

  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: ''});
    }
  }

  handleInterview = async(value, item) => {
    await localForage.setItem('tabValue', 'inter');
    if(value == 'create') hashHistory.push(`/interview/create/${item._id}`);
    else hashHistory.push(`/interview/view/${item.intrw}`);
  }

  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '', imgUrl: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleStatusUpdate = async () => {
    const { file, sNotes, prHr, prNotes, imgUrl, sStatus, rolesObj, submsnsView } = this.state;
    const payRateAcc = ((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc);
    if (!sStatus) {
      this.setState({ errMsg: 'Status is required' });
    } else if (!sNotes) {
      this.setState({ errMsg: 'Submission Notes is required' });
    } else if ((sStatus != 'Shortlisted' && !submsnsView.prHr) && !prHr) {
      this.setState({ errMsg: 'Payrate is required' });
    } else if ((((sStatus != 'Shortlisted' && !submsnsView.prHr) || (sStatus != 'Shortlisted' && prHr)) && payRateAcc) && !imgUrl) {
      this.setState({ errMsg: 'RTR Confirmation image is required' });
    } else {
      const oldPr = {prHr: submsnsView.prHr, prNotes: submsnsView.prNotes, imgUrl: submsnsView.prfPath};
      const newPr = {prHr, prNotes, imgUrl};
      const isPrChg = JSON.stringify(oldPr) !== JSON.stringify(newPr);
      const reqBody = {
        status: sStatus,
        prHr,
        prNotes,
        sNotes,
        // isVrfd: submsnsView.isVrfd, 
        // vrfyNts: submsnsView.vrfyNts,
        isPrChg
      }
      const data = new FormData();
      const img = imgUrl ? file : {};
      data.append('submsnData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleClose = () => this.setState({ statusModal: false, payrateModal: false, ispaylc: false, isprHImage: false, errMsg: '', sucMsg: '', sbmsnShow: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '', empData: {}, infoModal: false });
  handleApiCall = async (data, headers) => {
    const { submsnsView } = this.state;
    axios.put(config.putB2BSubmissionStatusUpdateAPI + '/' + submsnsView._id, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          this.setState({ errMsg: '', sucMsg: 'Status Updated Successfully' });
          setTimeout(() => {
            this.getSubmsList(1, '', 10, false, []);
            this.setState({ statusModal: false, sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
          }, 2000);
        } else {
          this.setState({ statusModal: true, errMsg: 'Submission Create Failed', sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, statusModal: false });
        } else {
          this.setState({ statusModal: false });
        }
      });
  }
  handleSubFollowups = (data) => {        
    this.setState({subFwlpModal: true, errMsg: '', submitData: data, sbmsnShow: ''});
  }

  handleSubLifecycle = (data) => {
    this.setState({subLfcModal: true, errMsg: '', submitData: data, sbmsnShow: ''});
  }
  handlePayrateStatusUpdate = async () => {
    const { file, prHr, prNotes, imgUrl, sbmsnShow } = this.state;
    if (!prHr) {
      this.setState({ errMsg: 'Payrate is required' });
    } else if (prHr && !imgUrl) {
      this.setState({ errMsg: 'RTR Confirmation Image is required' });
    } else {
      const reqBody = {
        prHr,
        prNotes
      }
      const data = new FormData();
      const img = imgUrl ? file : {};
      data.append('submsnData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handlePayrateApiCall(data, headers);
    }
  }
  handlePayrateApiCall = async (data, headers) => {
    const { submsnsView } = this.state;
    axios.put(config.putB2BSubmissionPerHourUpdateAPI + '/' + submsnsView._id, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          this.setState({ errMsg: '', sucMsg: 'Payrate Status Updated Successfully' });
          setTimeout(() => {
            this.getSubmsList(1, '', 10, false, []);
            this.setState({ payrateModal: false, sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
          }, 2000);
        } else {
          this.setState({ payrateModal: true, errMsg: 'Payrate Create Failed', sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, payrateModal: false });
        } else {
          this.setState({ handlePayrateChange: false, });
        }
      });
  }

  handleSbmsnMenu = (sbmsnId) => {
    const { sbmsnShow } = this.state;
    this.setState({sbmsnShow: sbmsnShow ? '' : sbmsnId});
  }

  handleClickOutside = (event) => {
    const { sbmsnShow } = this.state;
    if (this.sbmsnRef[sbmsnShow] && !this.sbmsnRef[sbmsnShow].contains(event.target)) {
      this.setState({ sbmsnShow: '',  });
    }
  }

  handleInvMeetings = (data) => {
    const inviteData = {name: data.canName, emID: data.canEmail, mobCcNum: data.canPhNum, iStatus: data.sStatus, refUID: data.euRefID, ...data, _id: data.euUser}
    this.setState({ inviteData, showMeetings: true, invtnsShow: '' })
  };

  handlePayRatehistory = (data) => this.setState({subPrModal: true, errMsg: '', submitData: data});
  payRateChange = (e) => {
    const { value } = e.target;
    if (value) {
      this.setState({ prHr: e.target.value, errMsg: '' })
    } else {
      this.setState({ prHr: '' }, () => this.removeImage())
    }
  }

  handlePrClick = () => {
    let { priority, submsnsView, submsnsList } = this.state;
    if (priority === submsnsView.priority) {
      this.setState({ errMsg: 'There is no change in Priority' });
    } else {
      this.setState({disabled: true});
      const reqBody = { priority };
      this.props.postB2BSubmissionPriorityCreate(submsnsView._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = submsnsList.findIndex(subsn => subsn._id === submsnsView._id);
          if(index > -1) submsnsList[index]['priority'] = priority;
          this.setState({ prModal: false, submsnsList, submsnsView: {}, errMsg: '', priority: '', disabled: false });
        } else {
          this.setState({ prModal: false, errMsg: '', priority: '', disabled: false });
        }
      })
    }
  }

  handleCloseFilters = (value) => {
    const {filters} = this.state;
    let pReports = [];
    switch (value) {
      case 'tName':
        pReports = filters.pReports.filter(item => item.team !== filters.team);
        this.setState({filters: {...filters, tName: '', team: '', pReports}}, () => this.getSubmsList(1, '', this.state.pageLimit, false, []));
        break;
      case 'onsName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.ons);
        this.setState({filters: {...filters, onsName: '', ons: '', pReports}}, () => this.getSubmsList(1, '', this.state.pageLimit, false, []));
        break;
      case 'ofsName':
        pReports = filters.pReports.filter(item => item.pReports !== filters.ofs);
        this.setState({filters: {...filters, ofsName: '', ofs: '', pReports}}, () => this.getSubmsList(1, '', this.state.pageLimit, false, []));
        break;
      case 'mntrName':
        pReports = filters.pReports  .filter(item => item.pReports !== filters.mntr);
        this.setState({filters: {...filters, mntrName: '', mntr: '', pReports}}, () => this.getSubmsList(1, '', this.state.pageLimit, false, []));
        break;
      case 'rctrName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.rctr);
        this.setState({filters: {...filters, rctrName: '', rctr: '', pReports}}, () => this.getSubmsList(1, '', this.state.pageLimit, false, []));
        break;
    }
  }

  render() {
    const {rolesObj} = this.state;
    const isMeeting = rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[16]?.isAlwd || rolesObj?.appAcc;
    return (
      <>
      <SubmisListComponent
        state={this.state}
        setStateData={this.setStateData}
        statusClick={this.statusClick}
        handleChangeLimit={this.handleChangeLimit}
        handleChangePage={this.handleChangePage}
        handleKeyInput={this.handleKeyInput}
        handleChangeSearch={this.handleChangeSearch}
        handleInterview={this.handleInterview}
        handleSubFollowups={this.handleSubFollowups}
        handleStatusUpdate={this.handleStatusUpdate}
        handleClose={this.handleClose}
        handleOnchange={this.handleOnchange}
        handlePayrateStatusUpdate={this.handlePayrateStatusUpdate}
        removeImage={this.removeImage}
        fileInput={this.fileInput}
        handleSubLifecycle={this.handleSubLifecycle}
        handleSbmsnMenu={this.handleSbmsnMenu}
        sbmsnRef={this.sbmsnRef}
        handleClickOutside={this.handleClickOutside}
        handleInvMeetings={this.handleInvMeetings}
        handlePayRatehistory={this.handlePayRatehistory}
        payRateChange={this.payRateChange}
        handlePrClick={this.handlePrClick}
        handleCloseFilters={this.handleCloseFilters}
      />
      <LeadsFiltersPopup state={this.state} setStateData={this.setStateData} />
      <SubmisFwlpsList subFwlpModal={this.state.subFwlpModal} submitData={this.state.submitData} setStateData={this.setStateData} />
      <SubmisLfcsList subLfcModal={this.state.subLfcModal} submitData={this.state.submitData} setStateData={this.setStateData} />
      <InviteMeetingsList showMeetings={this.state.showMeetings} userData={this.state.userData} inviteData={this.state.inviteData} handleMeetings={this.setStateData} type="Submission" isMeeting={isMeeting}/>
      <SubmisPayRateHistory subPrModal={this.state.subPrModal} submitData={this.state.submitData} setStateData={this.setStateData} />
      </>
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BSubsList: (body, callback) => dispatch(PostB2BSubsList(body, callback)),
  postB2BSubmissionPriorityCreate: (id, body, callback) => dispatch(postB2BSubmissionPriorityCreate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(SubmisList);
