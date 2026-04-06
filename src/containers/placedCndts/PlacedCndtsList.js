/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PlacedCndtsListComponent } from '../../components/placedCndts';
import {LeadsNotes} from '../leads/notes';
import { postB2BLeadsList, postB2BLeadPriorityCreate, putB2BLeadStatusUpdate } from '../../actions/leads/LeadsAction';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import {postB2bUsersTotalList} from '../../actions/users/UsersActions';
import InviteConsultant from '../invitations/InviteConsultant';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import { InviteMeetingsList } from '../invitations/meetings';
import LeadsLfcList from '../leads/LeadsLfcList';
import LeadsFiltersPopup from '../leads/LeadsFiltersPopup';

class PlacedCndtsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsList: [],
      leadsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      leadsListCountObj: { placedCnt: 0 },
      status: [],
      statusModal: false,
      leadView: {},
      wStatus: '',
      showInvite: false,
      cndtShow: '',
      rolesObj:{},
      notes: '',
      recruiterList: [],
      mentorsList: [],
      mentor: '', 
      recruiter: '',
      loading: true,
      empShowModal: false,
      empData: {},
      type: '',
      priority: '',
      prModal: false,
      infoModal: false,
      showNotes: false,
      isModal: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnJbTitleArr: [], showNotes: false,
      showMeetings: false,
      userData: {},
      inviteData: {},
      leadLfcModal: false,
      disabled: false,
      sType: 'Marketing',
      showFilters: false,
      filters: {team: '', pReports: [], tName: '', ons: '', onsName: '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''},
      isSearch: false,
    };
    this.cndtRef = {};
  }

  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getleads(actPgNum, searchStr, pageLimit, isSearch, status);
    this.getSkillsList();
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
    });
  }
  getleads = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const { sType, filters } = this.state;

    const reqBody = {
      pgNum: actPgNum,
      limit: pageLimit,
      searchStr, sType,
      filters: filters.pReports,
      status,
      wStatus: ['Placed']
    };
    this.props.postB2BLeadsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.leadsCountByStatus
        const leadsListCountObj = this.setStatus(respData);
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: resObj.resData.result.leadsList, leadsListCountObj, actPgNum, searchStr, pageLimit, status, leadsListCount: resObj.resData.result.leadsListCount, loading: false, userData: userInfo });
      } else if (isSearch) {
        const leadsListCountObj = { placedCnt: 0 };
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: [], leadsListCountObj, actPgNum: 1, searchStr, pageLimit, status, leadsListCount: 0, loading: false, userData: userInfo });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc, loading: false, userData: userInfo } });
      }
    });
  }

  setStatus = (resData) => {
    let placedCnt = 0
    const placedObj = resData.find(item => item._id == "Placed");
    placedCnt = placedObj ? placedObj.count : 0;
    return { placedCnt }
  }

  statusClick = (key) => {
    const { status, actPgNum, searchStr, pageLimit, isSearch } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key);
      this.getleads(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.getleads(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  handleRouteCons = async() => {
    await localForage.setItem('tabValue', 'consultants');
    await localForage.setItem('subTabValue', 'consultant');
    hashHistory.push('/consultants');
  }

  setStateData = (data) => this.setState({ ...data }, () => {
    if(data?.filters?.team === '' || data?.filters?.team) {
      this.getleads(1, '', this.state.pageLimit, false, []);
    }
  });

  handleInviteCons = (showInvite, lc) => {
    this.setState({showInvite});
    if(lc){
      hashHistory.push('/consultants/invitations');
    }
  }

  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getleads(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getleads(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);

  handleClose = () => this.setState({ statusModal: false, wStatus: '', errMsg: '', succMsg: '',notes: '', empShowModal: false, empData: {}, infoModal: false  });
  
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getleads(activePage, searchStr, pageLimit, false, status);
  }
  handleChangeLimit = (e) => {
    const { searchStr, actPgNum, isSearch, status } = this.state;
    let pageLimit = e.target.value;
    this.getleads(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  
  handleCndtMenu = (cndtId) => {
    const { cndtShow } = this.state;
    this.setState({cndtShow: cndtShow ? '' : cndtId});
  }

  handleClickOutside = (event) => {
    const { cndtShow } = this.state;
    if ( this.cndtRef[cndtShow] && ! this.cndtRef[cndtShow].contains(event.target)) {
      this.setState({ cndtShow: '',  });
    }
  }

  handlePrClick = () => {
    const { priority, leadView, leadsList } = this.state;
    if (priority === leadView.priority) {
      this.setState({ errMsg: 'There is no changes in Priority' });
    } else {
      this.setState({disabled: true});
      const reqBody = { priority }
      this.props.postB2BLeadPriorityCreate(leadView._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = leadsList.findIndex((lead) => lead._id === leadView._id);
          if(index > -1) leadsList[index]['priority'] = priority;
          this.setState({ prModal: false, errMsg: '', priority: '', disabled: false, disabled: false, leadsList, leadView: {} });
        } else {
          this.setState({ errMsg: 'Priority Update Failed', disabled: false });
        }
      });
    }
  }

  handlePlcdInMarketing = (item) => {
    const inviteData = {name: item.euName, emID: item.euEmID, mobCcNum: item.euMobCcNum, ...item, refUID: item.euUID, _id: item.euUser};
    this.setState({ inviteData, showMeetings: true });
  }
  handleStatus = (item, wStatus) => {     
    const years = item.mTexp ? Math.floor(item.mTexp  / 12) : 0; const months = item.mTexp ? item.mTexp % 12 : 0;
    this.setState({ statusModal: true, leadView: item, cndtShow: '', wStatus, email: item.mEmail, mobCc: item.mMobCc, mobNum: item.mMobNum, jobTitle: item.mJobTitle ? {label: item.mJobTitle, value: item.mJobTitle} : null, visaStatus: item.mVisaStatus, currentClient: item.mCurrClient,previousClient: item.mPrevClient,linkedIn: item.mWrkUrls && item.mWrkUrls.length ? item.mWrkUrls[0]: '', expYrs: { label: years, value: years}, expMonths: { label: months, value: months, mrktngStatusModel: false },
      });
    this.postB2BUsersData(item);
  }

  postB2BUsersData = (leadView) => {
    const userType = ['Employee'];
    const reqBody = { userType, userRole: 'Recruiter', teams: [leadView.team], orgId: leadView.org };
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const ofSmngrD = leadView.ua && leadView.ua.length ? leadView.ua.filter(item => item.role == 'Offshore Manager') : {};
        const ofSleadD = leadView.ua && leadView.ua.length ? leadView.ua.filter(item => item.role == 'Offshore Lead') : {};
        const ids = [];
        ofSmngrD && ofSmngrD.length && ofSmngrD.forEach(item => ids.push(item._id));
        ofSleadD && ofSleadD.length && ofSleadD.forEach(item => ids.push(item._id));
        const recruitersList = resObj.resData.result.filter(item => item.pReports.some(item1 => ids.includes(item1)));
        this.setState({ recruitersList: recruitersList?.length ? recruitersList : [] });
      } else {
        this.setState({ recruitersList: [] });
      }
    });
  }
  
  handleStatusUpdate = () => {
    const { wStatus, leadView, notes, recruiter, mentor,  email, mobNum} = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    const mobValid = /^[0-9]{10}$/;
    if (!wStatus) {
      this.setState({ errMsg: 'Status is required' });
    } else if (wStatus == 'In Marketing' && !recruiter) {
      this.setState({ errMsg: 'Recruiter is required' });
    } else if (leadView.wStatus == 'Job Ended' && (wStatus == 'Job Ended Trainy' || wStatus == 'Send To Marketing') && !mentor ) {
      this.setState({ errMsg: 'Mentor is required' });
    } else if (!notes) {
      this.setState({ errMsg: 'Notes is required' });
    } else if (email && !emailValid.test(email)) {
      this.setState({ errMsg: 'Invalid Email' })
    } else if (mobNum && !mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    } else {
      this.setState({disabled: true});
      this.handleUpdateApiCall();
    }
  }
  
  handleUpdateApiCall = () => {
    const { wStatus, status, leadView, notes, recruiter, recruitersList, email, mobCc, mobNum, jobTitle, visaStatus, currentClient, previousClient, linkedIn, expYrs, expMonths, mrktngStatusModel} = this.state;
    const recruiterData = recruiter && recruitersList.length ? recruitersList.find(item => item._id == recruiter) : {};
    const recData = recruiterData && recruiterData._id ? recruiterData : {};
    const pReports = recData && recData?._id ? [...new Set([recData._id, ...leadView.pReports])] : [...new Set([...leadView.pReports])];
    const ua = [...leadView.ua];
    const rec = ua && ua.length && ua.find(item => item._id == recruiter);
      rec && rec._id ? {} : recData && recData._id && ua.push({
      _id: recData._id, role: recData.userRole, name: recData.name, mobCcNum: recData.mobCcNum, emID: recData.emID, refUID: recData.refUID, primary: recData.myPrimary, deskCcNum: recData?.descCcNum || '', deskNumExtn: recData?.descExtnsn || ''
    })
    const jt = jobTitle && jobTitle.label ? jobTitle.label : '';
    const initialMrkD = {
      mEmail: leadView.mEmail, 
      mMobCc: leadView.mMobCc, 
      mMobNum: leadView.mMobNum, 
      mJobTitle: leadView.mJobTitle, 
      mVisaStatus: leadView.mVisaStatus, 
      mCurrClient: leadView.mCurrClient, 
      mPrevClient: leadView.mPrevClient, 
      mWrkUrls: leadView.mWrkUrls,
      mTexp:  leadView.mTexp
    }
    const updatedMrkD = {
      mEmail: email, 
      mMobCc: mobNum ? (mobCc ? mobCc : '+1') : '', 
      mMobNum: mobNum,
      mJobTitle: jt, 
      mVisaStatus: visaStatus, 
      mCurrClient: currentClient, 
      mPrevClient: previousClient, 
      mWrkUrls: linkedIn ? [linkedIn] : [],
      mTexp: expMonths.value + (expYrs.value  * 12), 
    };
    const mrkt = JSON.stringify(initialMrkD) !== JSON.stringify(updatedMrkD);
    const reqBody = {
      status: wStatus,
      notes,
      ua,
      pReports,
      ...updatedMrkD,
      ofsVrfy: false, 
      ofsVrfyNotes: leadView.ofsVrfyNotes, 
      mrkt
    }
    this.props.putB2BLeadStatusUpdate(leadView._id, reqBody, (resObj) => {
      if(resObj.status == '200'){
        this.setState({ succMsg:'Status updated successfully' });
        this.getleads(1, '', 10, false, status);
        setTimeout(() => {
          this.setState({ succMsg: '', errMsg: '', statusModal: false, leadView: {}, notes: '', recruiter: '', mentor: '', wStatus: '', email: '', mobCc: '+1',
            mobNum: '', jobTitle: null, visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 }, expMonths: { label: 0, value: 0 }, disabled: false });
        }, 2000);
      } else {
        this.setState({ errMsg: 'Status update failed', disabled: false });
      }
    });
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
          this.getSkillsList();
          setTimeout(() => {
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' })
          }, 1000);
        } else if (resObj.status == '103') this.setState({ cmnErrMsg: resObj.resData.message });
        else {
          this.setState({ cmnErrMsg: `${type} Create Failed` });
          this.getSkillsList();
          setTimeout(() => {
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' });
          }, 1000);
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
        this.setState({filters: {...filters, tName: '', team: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'onsName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.ons);
        this.setState({filters: {...filters, onsName: '', ons: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'ofsName':
        pReports = filters.pReports.filter(item => item.pReports !== filters.ofs);
        this.setState({filters: {...filters, ofsName: '', ofs: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'mntrName':
        pReports = filters.pReports  .filter(item => item.pReports !== filters.mntr);
        this.setState({filters: {...filters, mntrName: '', mntr: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'rctrName': 
        pReports = filters.pReports.filter(item => item.pReports !== filters.rctr);
        this.setState({filters: {...filters, rctrName: '', rctr: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
    }
  }

  render() {
    const {rolesObj} = this.state;
    const ncAccess = ((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[9]?.isAlwd) || rolesObj?.appAcc);
    const isMeeting = rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[7]?.isAlwd || rolesObj?.appAcc;

    return <>
      <PlacedCndtsListComponent
        state={this.state}
        statusClick={this.statusClick}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleRouteCons={this.handleRouteCons}
        handleClose={this.handleClose}
        handleInviteCons={this.handleInviteCons}
        handleCndtMenu={this.handleCndtMenu}
        cndtRef={this.cndtRef}
        handleClickOutside={this.handleClickOutside}
        handlePrClick={this.handlePrClick}
        handleStatus={this.handleStatus}
        handleStatusUpdate={this.handleStatusUpdate}
        handlePlcdInMarketing={this.handlePlcdInMarketing}
        handleCreateSkill={this.handleCreateSkill}
        handleCloseFilters={this.handleCloseFilters}
      />
      <LeadsFiltersPopup state={this.state} setStateData={this.setStateData} />
      <InviteConsultant showInvite={this.state.showInvite} handleInviteCons={this.handleInviteCons} />
      <LeadsNotes showNotes={this.state.showNotes} leadData={this.state.leadView} type='Terminated' setStateData={this.setStateData} ncAccess={ncAccess} />
      <InviteMeetingsList showMeetings={this.state.showMeetings} userData={this.state.userData} inviteData={this.state.inviteData} handleMeetings={this.setStateData} isMeeting={isMeeting} iType="Placed"/>
      <LeadsLfcList leadLfcModal={this.state.leadLfcModal} leadData={this.state.leadView} setStateData={this.setStateData} /> 
    </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BLeadsList: (body, callback) => dispatch(postB2BLeadsList(body, callback)),
  postB2BLeadPriorityCreate: (id, body, callback) => dispatch(postB2BLeadPriorityCreate(id, body, callback)),
  putB2BLeadStatusUpdate: (id, body, callback) => dispatch(putB2BLeadStatusUpdate(id, body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback)), 
});

export default connect(mapStateToProps, mapDistachToProps)(PlacedCndtsList);