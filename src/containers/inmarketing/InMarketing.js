/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InMarketingListComponent } from '../../components/inmarketing';
import {InviteMeetingsList} from '../invitations/meetings';
import {LeadsNotes} from '../leads/notes';
import { postB2BLeadsList, putB2BLeadStatusUpdate, postB2BLeadPriorityCreate, putB2BLeadReassignUa } from '../../actions/leads/LeadsAction';
import {postB2bUsersTotalList} from '../../actions/users/UsersActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import InviteConsultant from '../invitations/InviteConsultant';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import LeadsLfcList from '../leads/LeadsLfcList';
import LeadsFiltersPopup from '../leads/LeadsFiltersPopup';
import LeadsApplyTemp from '../leads/LeadsApplyTemp';

class InMarketing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsList: [],
      leadsCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      leadsListCountObj: { inMrktingCnt: 0, jobEndedMtktingCnt: 0 },
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
      email: '',
      mobCc: '+1',
      mobNum: '',
      jobTitle: null,
      visaStatus: '',
      currentClient: '', 
      previousClient: '',
      linkedIn: '',
      expYrs: { label: 0, value: 0 },
      expMonths: { label: 0, value: 0 },
      empShowModal: false,
      empData: {},
      loading: true,
      userData: {},
      inviteData: {},
      disabled: false,
      type: '',
      priority: '',
      infoModal: false, showNotes: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnJbTitleArr: [],
      reAssModal: false,
      recData: {},
      reAssMntrModal: false,
      mentrsData: [],
      leadLfcModal: false,
      sType: 'Marketing',
      showFilters: false,
      filters: {team: '', pReports: [], tName: '', ons: '', onsName: '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''},
      isSearch: false,
      appTemp: false
    };
    this.cndtRef = {};
  }

  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getleads(actPgNum, searchStr, pageLimit, isSearch, status);
    this.getSkillsList();
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
      wStatus: ['In Marketing', 'Job Ended Marketing']
    };
    this.props.postB2BLeadsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.leadsCountByStatus
        const leadsListCountObj = this.setStatus(respData);
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: resObj.resData.result.leadsList, leadsListCountObj, actPgNum, searchStr, pageLimit, status, leadsListCount: resObj.resData.result.leadsListCount, loading: false, userData: userInfo });
      } else if (isSearch) {
        const leadsListCountObj = { inMrktingCnt: 0, jobEndedMtktingCnt: 0 };
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: [], leadsListCountObj, actPgNum: 1, searchStr, pageLimit, status, submsnsListCount: 0, loading: false, userData: userInfo });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, loading: false, userData: userInfo });
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
    let inMrktingCnt = 0,jobEndedMtktingCnt = 0,placedCnt = 0,jobEndedCnt = 0,terminatedCnt = 0,jobEndedTerminatedCnt = 0;

    const inMrktgObj = resData.find(item => item._id == 'In Marketing');
    const jobEndMrktgObj = resData.find(item => item._id == 'Job Ended Marketing');

    inMrktingCnt = inMrktgObj ? inMrktgObj.count : 0;
    jobEndedMtktingCnt = jobEndMrktgObj ? jobEndMrktgObj.count : 0;

    return { inMrktingCnt, jobEndedMtktingCnt }
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

  handleClose = () => this.setState({ statusModal: false, wStatus: '', errMsg: '', succMsg: '',notes: '', email: '', mobCc: '+1',
    mobNum: '', jobTitle: null, visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 }, 
    expMonths: { label: 0, value: 0 }, empData: {}, mrktngStatusModel: false, infoModal: false });
    
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getleads(activePage, searchStr, pageLimit, false, status);
  }
  handleChangeLimit = (e) => {
    const { searchStr, actPgNum, isSearch, status } = this.state;
    let pageLimit = e.target.value;
    this.getleads(actPgNum, searchStr, pageLimit, isSearch, status);
  }

  handleStatus = (item, key) => {
    if (key == 'Template') {
      this.setState({leadView: item, appTemp: true});
    } else {
      const years = item.mTexp ? Math.floor(item.mTexp  / 12) : 0; const months = item.mTexp ? item.mTexp % 12 : 0;
    this.setState({ statusModal: true, leadView: item, cndtShow: '', wStatus: key, email: item.mEmail, mobCc: item.mMobCc, mobNum: item.mMobNum, jobTitle: item.mJobTitle ? {label: item.mJobTitle, value: item.mJobTitle} : null, visaStatus: item.mVisaStatus, currentClient: item.mCurrClient,previousClient: item.mPrevClient,linkedIn: item.mWrkUrls && item.mWrkUrls.length ? item.mWrkUrls[0]: '', expYrs: { label: years, value: years}, expMonths: { label: months, value: months }, recruiter: key == 'In Marketing' && item.rat, appTemp: false });
    }
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
        this.setState({recruitersList: recruitersList?.length ? recruitersList : []});
      } else {
        this.setState({ recruitersList: [] });
      }
    });
  }

  handleStatusUpdate = () => {
    const { wStatus, status, leadView, notes, recruiter, mentor, recruitersList, mentorsList, email, mobCc, mobNum, jobTitle, visaStatus, currentClient, previousClient, linkedIn, expYrs, expMonths} = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    const linkedinValid = /^(https?:\/\/)/;
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
    // } else if (linkedIn && !linkedinValid.test(linkedIn)) {
    //   this.setState({ errMsg: 'LinkedIn URL, Starting "http:// or https://" is required' });  
    // } else if(linkedIn && (linkedIn.split('/').length < 3 || linkedIn.split('/')[2].length < 1)) {
    //   this.setState({ errMsg: 'Provide a valid Linkedin URL' });
    } else if (mobNum && !mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    } else {
      this.setState({disabled: true})
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
        mTexp: leadView.mTexp
      }
      const updatedMrkD = {
        mEmail: email,
        mMobCc: mobNum ? mobCc ? mobCc : '+1' : '',
        mMobNum: mobNum,
        mJobTitle: jt,
        mVisaStatus: visaStatus,
        mCurrClient: currentClient,
        mPrevClient: previousClient,
        mWrkUrls: linkedIn ? [linkedIn] : [],
        mTexp: expMonths.value + (expYrs.value * 12),
      }
      const mrkt = JSON.stringify(initialMrkD) !== JSON.stringify(updatedMrkD);
      const reqBody = {
        status: wStatus,
        notes,
        ua,
        pReports,
        ...updatedMrkD,
        ofsVrfy: wStatus == 'Trainy' ? false : leadView.ofsVrfy,
        ofsVrfyNotes: leadView.ofsVrfyNotes,
        mrkt,
        name: leadView.euName
      }
      this.props.putB2BLeadStatusUpdate(leadView._id, reqBody, (resObj) => {
        if(resObj.status == '200'){
          this.setState({ succMsg: 'Status updated successfully' });
          this.getleads(1, '', 10, false, status);
          setTimeout(() => {
            this.setState({ succMsg: '', errMsg: '', statusModal: false, leadView: {}, notes: '', recruiter: '', mentor: '', wStatus: '', disabled: false });
          }, 2000)
        } else {
          this.setState({ errMsg: 'Status update failed', disabled: false });
        }
      })
    }
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

  handleInvMeetings = (data) => {
    const inviteData = {name: data.euName, emID: data.euEmID, mobCcNum: data.euMobCcNum, ...data, refUID: data.euUID, _id: data.euUser}
    this.setState({ inviteData, showMeetings: true, invtnsShow: '' })
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

  handlePrClick = () => {
    let { priority, leadView, leadsList } = this.state;
    if (priority === leadView.priority) {
      this.setState({ errMsg: 'There is no change in Priority' });
    } else {
      this.setState({ disabled: true });
      const reqBody = { priority }
      this.props.postB2BLeadPriorityCreate(leadView._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = leadsList.findIndex((lead) => lead._id === leadView._id);
          if(index > -1) leadsList[index]['priority'] = priority;
          this.setState({ prModal: false, errMsg: '', priority: '', disabled: false, leadsList, leadView: {} });
        } else {
          this.setState({ errMsg: 'Priority Update failed', disabled: false });
        }
      });
    }
  }

  handleReassignRec = (item) => {
    this.postB2BUsersData(item);
    const recruiterD = item.ua && item.ua.find(item => item.role == 'Recruiter');
    const recData = recruiterD && recruiterD._id ? recruiterD : {};
    const extn = recData.deskNumExtn ? `Extn: ${recData.deskNumExtn} ` : '';
    this.setState({reAssModal: true, leadView: item, recData: {...recData, extn}});
  }
  
  handleUpdateRecruiter = () => {
    const { status, leadView, recruiter, notes, recruitersList, recData} = this.state;
    if (!recruiter) {
      this.setState({ errMsg: 'Recruiter is required' });
    } else if (!notes) {
      this.setState({ errMsg: 'Notes is required' });
    } else {
      this.setState({ disabled: true });
      const recruiterData = recruiter && recruitersList.length ? recruitersList.find(item => item._id == recruiter) : {};
      const recD = recruiterData && recruiterData._id ? recruiterData : {};
      const pReportsD = leadView.pReports.filter(item => item != recData._id);
      const pReports = recD && recD?._id ? [...new Set([recD._id, ...pReportsD])] : [...new Set([...leadView.pReports])];
      const uaD = leadView.ua && leadView.ua.filter(item => item._id !== recData._id);
      const ua = [...uaD];
      recD && recD?._id && ua.push({
        _id: recD._id, role: recD.userRole, name: recD.name, mobCcNum: recD.mobCcNum, emID: recD.emID, refUID: recD.refUID, primary: recD.myPrimary, deskCcNum: recD?.descCcNum || '', deskNumExtn: recD?.descExtnsn || ''
      });
      const reqBody = { notes, ua, pReports };
      this.props.putB2BLeadReassignUa(leadView._id, reqBody, (resObj) => {
        if(resObj.status == '200'){
          this.setState({ succMsg: 'Reassigned Recruiter successfully' });
          this.getleads(1, '', 10, false, status);
          setTimeout(() => {
            this.setState({ succMsg: '', errMsg: '', recData: {}, reAssModal: false, leadView: {}, notes: '', recruiter: '', recruitersList: [],  disabled: false });
          }, 2000)
        } else {
          this.setState({ errMsg: 'Reassigned failed',  disabled: false });
        }
      })
    }
   }

   handleReassignMentor = (item) => {
    const mentrsData = item.ua && item.ua.filter(item => item.role == 'Mentor');
    this.getMentorsData(item);
    this.setState({reAssMntrModal: true, leadView: item, mentrsData})
  }

  getMentorsData = (lead) => {
    const userType = ['Employee'];
    const userRole = ['Mentor'];
    const reqBody = { userType, userRole, teams: [lead.team], orgId: lead.org };
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        let usrArr = resObj.resData.result.map(item => {return {...item, label: item.name, value: item._id}});
        const mentorsList = usrArr.filter(uo => uo.pReports.includes(lead.report));
        this.setState({ mentorsList });
      } else {
        this.setState({ mentorsList: []});
      }
    })
  }

  handleMentorChange = (mentor) => {
    if (mentor && mentor.length < 6) {
      this.setState({mentor, errMsg: ''});
    } else {
      this.setState({mentor: this.state.mentor, errMsg: 'Selection Limit Exceeded: You can only select up to 5 mentors.'});
    }
  }

  handleUpdateMentor = () => {
    const { status, leadView, mentor, mentrsData, notes, mentorsList, recData } = this.state;
    if (mentor.length == 0) {
      this.setState({ errMsg: 'Mentor is required' });
    } else if (!notes) {
      this.setState({ errMsg: 'Notes is required' });
    } else {
      this.setState({ disabled: true });
      const mntrds = mentrsData.map(item => item._id);
      const pReports = leadView.pReports.filter(item => !mntrds.includes(item));
      const uaD = leadView.ua && leadView.ua.filter(item => !mntrds.includes(item._id));
      const ua = [...uaD];
      mentor && mentor.length && mentor.forEach(item => {
        ua.push({
          _id: item._id, role: item.userRole, name: item.name, mobCcNum: item.mobCcNum, emID: item.emID, refUID: item.refUID, primary: item.myPrimary, deskCcNum: item?.descCcNum || '', deskNumExtn: item?.descExtnsn || ''
        });
        pReports.push(item._id);
      });
      const reqBody = { notes, ua, pReports };
      this.props.putB2BLeadReassignUa(leadView._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ succMsg: 'Reassigned Mentor successfully' });
          this.getleads(1, '', 10, false, status);
          setTimeout(() => {
            this.setState({ succMsg: '', errMsg: '', mentor: '', reAssMntrModal: false, leadView: {}, notes: '',  mentorsList: [], disabled: false });
          }, 2000)
        } else {
          this.setState({ errMsg: 'Reassigned failed', disabled: false });
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
    const isMeeting = rolesObj?.access?.length >= 10 && rolesObj?.access[9]?.actions[9]?.isAlwd || rolesObj?.appAcc;
    const ncAccess = ((rolesObj?.access?.length >= 10 && rolesObj?.access[9]?.actions[11]?.isAlwd) || rolesObj?.appAcc);
    return <>
      <InMarketingListComponent
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
        handleStatusUpdate={this.handleStatusUpdate}
        handleInviteCons={this.handleInviteCons}
        handleCndtMenu={this.handleCndtMenu}
        cndtRef={this.cndtRef}
        handleClickOutside={this.handleClickOutside}
        handleStatus={this.handleStatus}
        handleInvMeetings={this.handleInvMeetings}
        handleCreateSkill={this.handleCreateSkill}
        handlePrClick={this.handlePrClick}
        handleReassignRec={this.handleReassignRec}
        handleUpdateRecruiter = {this.handleUpdateRecruiter}
        handleReassignMentor={this.handleReassignMentor}
        handleMentorChange={this.handleMentorChange}
        handleUpdateMentor={this.handleUpdateMentor}
        handleCloseFilters={this.handleCloseFilters}
      />
      <LeadsFiltersPopup state={this.state} setStateData={this.setStateData} />
      <InviteConsultant showInvite={this.state.showInvite} handleInviteCons={this.handleInviteCons} />
      <InviteMeetingsList showMeetings={this.state.showMeetings} userData={this.state.userData} inviteData={this.state.inviteData} handleMeetings={this.setStateData} iType="In Marketing" isMeeting={isMeeting}/>
      <LeadsNotes showNotes={this.state.showNotes} leadData={this.state.leadView} type='In Marketing' setStateData={this.setStateData} ncAccess={ncAccess} />
      <LeadsLfcList leadLfcModal={this.state.leadLfcModal} leadData={this.state.leadView} setStateData={this.setStateData} />
      <LeadsApplyTemp appTemp={this.state.appTemp} lead={this.state.leadView} userData={this.state.userData} setStateData={this.setStateData} leadsList={this.state.leadsList} tempCat="Consultant In Marketing"/>
    </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BLeadsList: (body, callback) => dispatch(postB2BLeadsList(body, callback)),
  putB2BLeadStatusUpdate: (id, body, callback) => dispatch(putB2BLeadStatusUpdate(id, body, callback)), 
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)), 
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback)),
  postB2BLeadPriorityCreate: (id, body, callback) => dispatch(postB2BLeadPriorityCreate(id, body, callback)),
  putB2BLeadReassignUa: (id, body, callback) => dispatch(putB2BLeadReassignUa(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InMarketing);