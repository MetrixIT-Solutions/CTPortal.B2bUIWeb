/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { InterviewsListComponent } from '../../components/interviews';
import { PostB2BInterviewsList, postB2BInterviewPriorityCreate } from '../../actions/interviews/InterviewActions';
import { InterviewFollList } from './interviewFoll';
import { IntrvwFdbckList } from './feedback';
import localForage from '../../hooks/localForage';
import InterviewLfcList from './InterviewLfcList';
import config from '../../../config/apis.json';
import { setHeadersToken } from '../../hooks/apihooks';
import {InviteMeetingsList} from '../invitations/meetings';
import hashHistory from '../../hashHistory';
import LeadsFiltersPopup from '../leads/LeadsFiltersPopup';

class InterviewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ivList: [],
      ivListCountObj: { scheCount: 0, complCount: 0, nxtRndCount: 0, slctdCount: 0, holdCound: 0, ntSlctdCount: 0, rjctdCount: 0, otherCount: 0 },
      ivListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      status: [],
      ivTotalCount: 0,
      statusModal: false,
      disable: false,
      errMsg: '',
      interFwlpModal: false,
      invLfcModal: false,
      interData: {},
      interviewView: {},
      file: '',
      imgUrl: '',
      iconPath: '',
      sucMsg: '',
      showIntrvwFdbk: false,
      intrwShow: '',
      rolesObj: {},
      inviteData: {},
      userData: {},
      scrType: '',
      invDate: '',
      invTime: '',
      timeZone: 'EST',
      dur: '',
      hrs: '',
      mins: '',
      invWith: '',
      round: '',
      infoModal: false,
      empData: {},
      isprHImage: '',
      priority: '',
      prModal: false,
      schId: [],
      showFilters: false,
      filters: {team: '', pReports: [], tName: '', ons: '', onsName: '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''},
      disabled: false,
      isSearch: false,
    };
    this.fileInput = React.createRef();
    this.intrwRef = {};
  }
  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getIvList(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  getIvList = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
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
    this.props.PostB2BInterviewsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.intrvwsCountByStatus
        const ivListCountObj = this.setStatus(respData);
        this.setState({ rolesObj: {...rolesObj, appAcc}, ivList: resObj.resData.result.intrvwsList, ivListCountObj, actPgNum, searchStr, pageLimit, status, ivListCount: resObj.resData.result.intrvwsListCount, userData: userInfo });
      } else if (isSearch) {
        const ivListCountObj = { scheCount: 0, complCount: 0, nxtRndCount: 0, slctdCount: 0, holdCound: 0, ntSlctdCount: 0, rjctdCount: 0, otherCount: 0 };
        this.setState({ rolesObj: {...rolesObj, appAcc}, ivList: [], ivListCountObj, actPgNum: 1, searchStr, pageLimit, status, ivListCount: 0, userData: userInfo });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, userData: userInfo });
      }
    });
  }
  setStatus = (resData) => {
    let scheCount = 0, complCount = 0, nxtRndCount = 0, slctdCount = 0, holdCound = 0, ntSlctdCount = 0, rjctdCount = 0, otherCount = 0;
    const scheObj = resData?.find(item => item._id == "Scheduled");
    const complObj = resData?.find(item => item._id == "Completed");
    const nxtRndObj = resData?.find(item => item._id == "Next Round");
    const slctdObj = resData?.find(item => item._id == "Placed");
    const holdObj = resData?.find(item => item._id == "On Hold");
    const ntSlctdObj = resData?.find(item => item._id == "Not Selected");
    const rjctdObj = resData?.find(item => item._id == "Rejected");
    const otherObj = resData?.find(item => item._id == "Other");
    scheCount = scheObj ? scheObj.count : 0;
    complCount = complObj ? complObj.count : 0;
    nxtRndCount = nxtRndObj ? nxtRndObj.count : 0;
    slctdCount = slctdObj ? slctdObj.count : 0;
    holdCound = holdObj ? holdObj.count : 0;
    ntSlctdCount = ntSlctdObj ? ntSlctdObj.count : 0;
    rjctdCount = rjctdObj ? rjctdObj.count : 0;
    otherCount = otherObj ? otherObj.count : 0;
    return { scheCount, complCount, nxtRndCount, slctdCount, holdCound, ntSlctdCount, rjctdCount, otherCount }
  }
  setStateData = (data) => this.setState({ ...data }, () => {
    if(data?.filters?.team === '' || data?.filters?.team) {
      this.getIvList(1, '', 10, false, []);
    }
  });
  statusClick = (key) => {
    const { status, actPgNum, searchStr, pageLimit, isSearch } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key);
      this.getIvList(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.getIvList(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }
  handleChangeLimit = (e) => {
    const { searchStr, status } = this.state;
    let pageLimit = e.target.value;
    this.getIvList(1, searchStr, pageLimit, false, status);
  }
  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getIvList(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getIvList(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getIvList(activePage, searchStr, pageLimit, false, status);
  }
  handleIntrvwFollowups = (data) => {
      this.setState({ interFwlpModal: true, errMsg: '', interData: data, intrwShow: '' });
  }
  handleClose = () => this.setState({ statusModal: false, isprHImage: false, errMsg: '', intrwShow: '', empData: {}, infoModal: false });
  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: '', intrwShow: '' });
    }
  }
  handleStatusUpdate = async () => {
    const { file, imgUrl, iStatus, sNotes, scrType, interviewView, timeZone, invDate, invTime, hrs,  mins, round, invWith} = this.state;
    const schData = interviewView.iSchedules && interviewView.iSchedules.length ? interviewView.iSchedules.find(item => item._id == round.replace(/\s+$/, '')) : {};
    if (!iStatus) {
      this.setState({ errMsg: 'Status is required' });
    } else if ((iStatus == 'Scheduled' || invDate) && !scrType) {
      this.setState({ errMsg: 'Screening Type is required' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && !invWith) {
      this.setState({ errMsg: 'Interview With is required' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && !round) {
      this.setState({ errMsg: 'Interview Round is required' });
    } else if ((iStatus == 'Scheduled' || scrType) && !invDate) {
      this.setState({ errMsg: 'Scheduled Date is required' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && !invTime) {
      this.setState({ errMsg: 'Scheduled Time is required' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && (hrs == '' || hrs == 0) && (mins == 0  || mins == '')) {
      this.setState({ errMsg: 'Duration is required' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && (hrs == 8 && mins && mins > 0) || (hrs > 8)) {
      this.setState({ errMsg: 'Interview should not exceed 8 hours' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && mins > 60) {
      this.setState({ errMsg: 'Interview should not exceed 60 minutes' });
    } else if ((iStatus == 'Scheduled' || invDate || scrType) && !imgUrl) {
        this.setState({ errMsg: 'Interview Invite is required' });
    } else if (!sNotes) {
      this.setState({ errMsg: 'Interview Notes is required' });
    } else if(schData && schData._id){
      this.setState({ errMsg: 'Given round alread completed' });
    } else {
      const duration = (hrs || mins) ? ((hrs ? parseInt(hrs, 10) : 0) * 60) + (mins ? parseInt(mins, 10) : 0) : interviewView.duration; 
      const reqBody = {
        status: (scrType || invDate) ? 'Scheduled' : iStatus,
        process: scrType ? scrType : interviewView.process,
        isDt: invDate && invTime ? `${invDate} ${invTime}` : interviewView.isDt, isDtStr: invDate && invTime ? `${invDate} ${invTime}` : interviewView.isDtStr,
        iTz: timeZone,
        duration,
        invWith: invWith ? invWith : interviewView.invWith,
        round: round ? round.replace(/\s+$/, '') : interviewView.round,
        isVrfd: (scrType || invDate) ? false :  interviewView.isVrfd,
        iNotes: sNotes,
        iPath: interviewView.ifPath
      }
      const scheduledData = (scrType || invDate) ? this.setScheduledData(reqBody) : {};
      const iSchedules = [scheduledData, ...interviewView.iSchedules];
      reqBody['iSchedules'] = iSchedules;
      const data = new FormData();
      const img = imgUrl ? file : {};
      data.append('intrvwData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }

 setScheduledData = (reqBody) => {
  return {
    _id: reqBody.round,
    process: reqBody.process,
    invWith: reqBody.invWith,
    round: reqBody.round,
    isDt: reqBody.isDt,
    isDtStr: reqBody.isDtStr,
    iTz: reqBody.iTz,
    duration: reqBody.duration,
    isNotes: reqBody.iNotes || '',
  }
}
  handleApiCall = async (data, headers) => {
    const { interviewView } = this.state;
    const dt = interviewView.ifPath ? interviewView.ifPath.split('/') : '';
    const imgId = interviewView.ifPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
    const id = imgId ? imgId : interviewView._id;
    axios.put(config.putB2BInterviewStatusUpdateAPI + '/' + interviewView._id + '/' + id, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          this.setState({ errMsg: '', sucMsg: 'Status Updated Successfully'});
          setTimeout(() => {
            this.setState({ statusModal: false, sucMsg: '', iStatus: '' });
            this.getIvList(1, '', 10, false, []);
          }, 2000);
        } else {
          this.setState({ statusModal: true, errMsg: 'Status Update Failed', sucMsg: '' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, statusModal: false });
        } else {
          this.setState({ statusModal: false });
        }
      });
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '', imgUrl: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleIntrvwLfc = (data) => {
    this.setState({ invLfcModal: true, errMsg: '', intrwShow: '', interData: data });
  }

  handleIntrvwFdbk = (interData) => this.setState({ interData, showIntrvwFdbk: true, intrwShow: '' });
  
  handleIntrwMenu = (intrvId) => {
    const {intrwShow} = this.state;
    this.setState({intrwShow: intrwShow ? '' : intrvId});
  }

  handleClickOutside = (event) => {
    const { intrwShow } = this.state;
    if (this.intrwRef[intrwShow] && !this.intrwRef[intrwShow].contains(event.target)) {
      this.setState({ intrwShow: '' });
    }
  }

  handleInvMeetings = (data) => {
    const inviteData = {name: data.canName, emID: data.canEmail, mobCcNum: data.canPhNum, ...data, _id: data.euUser}
    this.setState({ inviteData, showMeetings: true, invtnsShow: '' })
  };
  handleSubview = async (item) => {
    await localForage.setItem('tabValue','sub')
    hashHistory.push(`/submissions/view/${item.submission}`);
  }

  handlePrClick = () => {
    let { priority, interviewView, ivList } = this.state;
    if (priority === interviewView.priority) {
      this.setState({ errMsg: 'There is no change in Priority' });
    } else {
      this.setState({disable: true});
      const reqBody = { priority };
      this.props.postB2BInterviewPriorityCreate(interviewView._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = ivList.findIndex(intrw => intrw._id === interviewView._id);
          if(index > -1) ivList[index]['priority'] = priority;
          this.setState({ prModal: false, errMsg: '', priority: '', disable: false, ivList, interviewView: {} });
        } else {
          this.setState({ errMsg: 'Priority update failed', disable: false });
        }
      });
    }
  }

  handleClickExpand = (item) => {
    const d = this.state.schId.find(item1 => item1 == item._id);
    const schId = d ? this.state.schId.filter(item1 => item1 !== item._id) : [...this.state.schId, item._id];
    this.setState({schId});
  }

  handleCloseFilters = (value) => {
    const {filters} = this.state;
    let pReports = [];
    switch (value) {
      case 'tName':
        pReports = filters.pReports.filter(item => item.team !== filters.team);
        this.setState({filters: {...filters, tName: '', team: '', pReports}}, () => this.getIvList(1, '', this.state.pageLimit, false, []));
        break;
      case 'onsName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.ons);
        this.setState({filters: {...filters, onsName: '', ons: '', pReports}}, () => this.getIvList(1, '', this.state.pageLimit, false, []));
        break;
      case 'ofsName':
        pReports = filters.pReports.filter(item => item.pReports !== filters.ofs);
        this.setState({filters: {...filters, ofsName: '', ofs: '', pReports}}, () => this.getIvList(1, '', this.state.pageLimit, false, []));
        break;
      case 'mntrName':
        pReports = filters.pReports  .filter(item => item.pReports !== filters.mntr);
        this.setState({filters: {...filters, mntrName: '', mntr: '', pReports}}, () => this.getIvList(1, '', this.state.pageLimit, false, []));
        break;
      case 'rctrName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.rctr);
        this.setState({filters: {...filters, rctrName: '', rctr: '', pReports}}, () => this.getIvList(1, '', this.state.pageLimit, false, []));
        break;
    }
  }

  render() {
    const {rolesObj} = this.state;
    const isMeeting = rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[15]?.isAlwd || rolesObj?.appAcc;
    return (
      <>
        <InterviewsListComponent
          state={this.state}
          setStateData={this.setStateData}
          statusClick={this.statusClick}
          handleChangeLimit={this.handleChangeLimit}
          handleChangePage={this.handleChangePage}
          handleKeyInput={this.handleKeyInput}
          handleChangeSearch={this.handleChangeSearch}
          handleStatusUpdate={this.handleStatusUpdate}
          handleIntrvwFollowups={this.handleIntrvwFollowups}
          handleClose={this.handleClose}
          handleOnchange={this.handleOnchange}
          removeImage={this.removeImage}
          fileInput={this.fileInput}
          handleIntrvwLfc={this.handleIntrvwLfc}
          handleIntrvwFdbk={this.handleIntrvwFdbk}
          intrwRef={this.intrwRef}
          handleIntrwMenu={this.handleIntrwMenu}
          handleClickOutside={this.handleClickOutside}
          handleInvMeetings={this.handleInvMeetings}
          handleSubview={this.handleSubview}
          handlePrClick={this.handlePrClick}
          handleClickExpand={this.handleClickExpand}
          handleCloseFilters={this.handleCloseFilters}
        />
        <LeadsFiltersPopup state={this.state} setStateData={this.setStateData} />
        <InterviewFollList interFwlpModal={this.state.interFwlpModal} interData={this.state.interData} setStateData={this.setStateData} />
        <InterviewLfcList invLfcModal={this.state.invLfcModal} interData={this.state.interData} setStateData={this.setStateData} />
        <IntrvwFdbckList showIntrvwFdbk={this.state.showIntrvwFdbk} interData={this.state.interData} setStateData={this.setStateData} />
        <InviteMeetingsList showMeetings={this.state.showMeetings} userData={this.state.userData} inviteData={this.state.inviteData} handleMeetings={this.setStateData} type="Interview" isMeeting={isMeeting}/>  
      </>
    )
  }
}
const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BInterviewsList: (body, callback) => dispatch(PostB2BInterviewsList(body, callback)),
  postB2BInterviewPriorityCreate: (id, body, callback) => dispatch(postB2BInterviewPriorityCreate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InterviewsList);
