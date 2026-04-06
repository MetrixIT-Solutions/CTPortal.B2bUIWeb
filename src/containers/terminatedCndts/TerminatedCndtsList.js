/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { TerminatedCndtsListComponent } from '../../components/terminatedCndts';
import {LeadsNotes} from '../leads/notes';
import { postB2BLeadsList, postB2BLeadPriorityCreate } from '../../actions/leads/LeadsAction';
import InviteConsultant from '../invitations/InviteConsultant';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import { InviteMeetingsList } from '../invitations/meetings';
import LeadsLfcList from '../leads/LeadsLfcList';
import LeadsFiltersPopup from '../leads/LeadsFiltersPopup';

class TerminatedCndtsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leadsList: [],
      leadsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      leadsListCountObj: { terminatedCnt: 0, jobEndedTerminatedCnt: 0 },
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
      infoModal: false,
      priority: '',
      prModal: false,
      showNotes: false,
      inviteData: {},
      showMeetings: false,
      userData: {},
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
    this.getleads(actPgNum, searchStr, pageLimit, isSearch,status);
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
      wStatus: ['Terminated', 'Job Ended Terminated']
    };
    this.props.postB2BLeadsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.leadsCountByStatus
        const leadsListCountObj = this.setStatus(respData);
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: resObj.resData.result.leadsList, leadsListCountObj, actPgNum, searchStr, pageLimit, status, leadsListCount: resObj.resData.result.leadsListCount, loading: false, userData: userInfo });
      } else if (isSearch) {
        const leadsListCountObj = { terminatedCnt: 0, jobEndedTerminatedCnt: 0 };
        this.setState({ rolesObj: {...rolesObj, appAcc}, leadsList: [], leadsListCountObj, actPgNum: 1, searchStr, pageLimit, status, leadsListCount: 0, loading: false, userData: userInfo });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc, loading: false , userData: userInfo }});
      }
    });
  }

  setStatus = (resData) => {
    let terminatedCnt = 0, jobEndedTerminatedCnt = 0;
    const trmObj = resData.find(item => item._id == "Terminated");
    const jobEndTrmntdObj = resData.find(item => item._id == "Job Ended Terminated");

    terminatedCnt = trmObj ? trmObj.count : 0;
    jobEndedTerminatedCnt = jobEndTrmntdObj ? jobEndTrmntdObj.count : 0;

    return { terminatedCnt, jobEndedTerminatedCnt }
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

  handleClose = () => this.setState({ statusModal: false, wStatus: '', errMsg: '', succMsg: '',notes: '', empData: {}, infoModal: false });

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
          this.setState({ prModal: false, errMsg: '', priority: '', disabled: false, leadsList, leadView: {} });
        } else {
          this.setState({ errMsg: 'Priority Update Failed', disabled: false });
        }
      });
    }
  }

  handleTrmntdInMarketing = (item) => {
    const inviteData = {name: item.euName, emID: item.euEmID, mobCcNum: item.euMobCcNum, ...item, refUID: item.euUID, _id: item.euUser};
    this.setState({ inviteData, showMeetings: true });
  }

  handleCloseFilters = (value) => {
    const {filters} = this.state;
    let pReports = [];
    switch (value) {
      case 'tName':
        this.setState({filters: {...filters, tName:'', team: '', pReports: []}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'onsName': 
        pReports = filters.pReports.filter(item => item !== filters.ons);
        this.setState({filters: {...filters, onsName:'', pReports, ons: ''}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'ofsName':
        pReports = filters.pReports.filter(item => item !== filters.ofs);
        this.setState({filters: {...filters, ofsName:'', pReports, ofs: ''}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'mntrName':
        pReports = filters.pReports  .filter(item => item !== filters.mntr);
        this.setState({filters: {...filters, mntrName:'', mntr: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
      case 'rctrName': 
        pReports = filters.pReports.filter(item => item !== filters.rctr);
        this.setState({filters: {...filters, rctrName:'', rctr: '', pReports}}, () => this.getleads(1, '', this.state.pageLimit, false, []));
        break;
    }
  }

  render() {
    const {rolesObj, showMeetings, userData, inviteData} = this.state;
    const ncAccess = ((rolesObj?.access?.length >= 14 && rolesObj?.access[13]?.actions[9]?.isAlwd) || rolesObj?.appAcc);
    const isMeeting = rolesObj?.access?.length >= 14 && rolesObj?.access[13]?.actions[7]?.isAlwd || rolesObj?.appAcc;

    return <>
      <TerminatedCndtsListComponent
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
        handleTrmntdInMarketing={this.handleTrmntdInMarketing}
        handleCloseFilters={this.handleCloseFilters}
        />
        <LeadsFiltersPopup state={this.state} setStateData={this.setStateData} />
        <InviteConsultant showInvite={this.state.showInvite} handleInviteCons={this.handleInviteCons} />
        <LeadsNotes showNotes={this.state.showNotes} leadData={this.state.leadView} type='Terminated' setStateData={this.setStateData} ncAccess={ncAccess}/>
        <InviteMeetingsList showMeetings={showMeetings} userData={userData} inviteData={inviteData} handleMeetings={this.setStateData} isMeeting={isMeeting} iType="Terminated" />
        <LeadsLfcList leadLfcModal={this.state.leadLfcModal} leadData={this.state.leadView} setStateData={this.setStateData} /> 
       </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BLeadsList: (body, callback) => dispatch(postB2BLeadsList(body, callback)),
  postB2BLeadPriorityCreate: (id, body, callback) => dispatch(postB2BLeadPriorityCreate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(TerminatedCndtsList);