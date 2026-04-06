/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { H1BPetitionsListComponent } from '../../../components/immigration/h1b-petitions';
import H1BPetitionCreate from './H1BPetitionCreate';
import H1bPetitionsFwlpList from './H1bPetitionsFwlpList';
import H1BPetitionLfcsList from './H1BPetitionLfcsList';
import { postB2BH1BPtnsList, putB2BH1BPtnsStatusupdate, putB2BH1BPtnsCaseIdUpdate, putB2BH1BPtnsPrtyUpdt, putH1bPetitionDelete } from '../../../actions/immigration/H1BPetitionsActions';
import localForage from '../../../hooks/localForage';
import hashHistory from '../../../hashHistory';
import moment from 'moment';

class H1BPetitionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ptnsList: [],
      ptnsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      errMsg: '',
      loading: true,
      createModal: false,
      ptnsShow: '',
      status: [],
      ptnsListCountObj: { opnCount: 0, rvwCount: 0, sbmtdCount: 0 },
      updateModal: false,
      ptnsData: {},
      disable: false,
      infoModal: false,
      empData: {},
      type: '',
      viewModal: false,
      euName: '',
      pcNum: '',
      pType: '',
      rprtName: '',
      tName: '',
      pStatus: '',
      createdDt: '',
      euEmID: '',
      euMobCcNum: '',
      editModal: false,
      caseId: '',
      rprtPrimary: '',
      ptnStatus: '',
      psNotes: '',
      ptnsLfcModal: false,
      ptnsLfcList: [],
      prModal: false,
      priority: '',
      ptnFwlpModal: false,
      rolesObj: {},
      userData: {},
      psStatus: 'Submitted',
      delModal: false
    };
    this.ptnsRef = {};
  }

  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getH1BPtnsList(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  getH1BPtnsList = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
    const { ptnsListCountObj } = this.state;
    const userInfo = await localForage.getItem('userInfo');
    const userData = userInfo.value;
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const reqBody = {pgNum: actPgNum, limit: pageLimit, searchStr, status};
    if((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.isAlwd) || appAcc) {
      this.props.postB2BH1BPtnsList(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const respData = resObj.resData.result.petitionsCountByStatus;
          const countsObj = respData.length > 0 ? this.setStatus(respData) : ptnsListCountObj;
          this.setState({ rolesObj: { ...rolesObj, appAcc }, userData, ptnsList: resObj.resData.result.petitionsList, ptnsListCount: resObj.resData.result.petitionsListCount, actPgNum, searchStr, pageLimit, loading: false, ptnsListCountObj: countsObj });
        } else if (isSearch) {
          this.setState({ rolesObj: { ...rolesObj, appAcc }, userData, ptnsList: [], ptnsListCount: 0, actPgNum: 1, searchStr, pageLimit, loading: false, ptnsListCountObj: 0 });
        } else {
          this.setState({ rolesObj: { ...rolesObj, appAcc }, userData, loading: false });
        }
      });
    } else this.setState({ rolesObj: { ...rolesObj, appAcc }, userData, loading: false });
  }
  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  setStateData = (data) => this.setState({ ...data });

  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getH1BPtnsList(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getH1BPtnsList(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);

  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getH1BPtnsList(activePage, searchStr, pageLimit, false, status);
  }
  handleChangeLimit = (e) => {
    const { searchStr, actPgNum, isSearch, status } = this.state;
    let pageLimit = e.target.value;
    this.getH1BPtnsList(actPgNum, searchStr, pageLimit, isSearch, status);
  }

  handleH1BPtnsCreate = () => {
    this.setState({ createModal: true, errMsg: '', ptnsShow: '' })
  }

  handleClose = () => this.setState({ createModal: false, errMsg: '', infoModal: false, lfcModal: false, ptnFwlpModal: false });

  handlePtnsMenu = (ptnsId) => {
    const { ptnsShow } = this.state;
    this.setState({ ptnsShow: ptnsShow ? '' : ptnsId });
  }

  handleClickOutside = (event) => {
    const { ptnsShow } = this.state;
    if (this.ptnsRef[ptnsShow] && !this.ptnsRef[ptnsShow].contains(event.target)) {
      this.setState({ ptnsShow: '', });
    }
  }

  setStatus = (resData) => {
    let opnCount = 0, sbmtdCount = 0, rvwCount = 0;
    const opnObj = resData.find(item => item._id == 'Open');
    const sbmtdObj = resData.find(item => item._id == 'Submitted');
    const rvwObj = resData.find(item => item._id == 'Review');
    opnCount = opnObj ? opnObj.count : 0,
    sbmtdCount = sbmtdObj ? sbmtdObj.count : 0,
    rvwCount = rvwObj ? rvwObj.count : 0
    return { opnCount, sbmtdCount, rvwCount };
  }

  statusClick = (key) => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key)
      this.setState({ status: st });
      this.getH1BPtnsList(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.setState({ status: [...status, key] });
      this.getH1BPtnsList(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }

  handleStatusUpdate = () => {
    const { ptnsData, psNotes, psStatus } = this.state;
    if (!psNotes) {
      this.setState({ errMsg: 'Submitted Notes is required' })
    } else {
      this.setStateData({ disable: true });
      const recordId = ptnsData._id;
      const reqBody = { status: 'Submitted', psNotes, psStatus };
      this.props.putB2BH1BPtnsStatusupdate(recordId, reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ updateModal: false, errMsg: '', ptnsData: {}, disable: false, psNotes: '' });
          this.getH1BPtnsList(1, '', 10, false, []);
        } else {
          this.setState({ errMsg: 'H1BPetition Status Update Failed', disable: false });
        }
      });
    }
  }

  handlePtnsViewClick = (data) => {
    this.setState({ viewModal: true, ptnsShow: '', euName: data.euName, pcNum: data.pcNum, pType: data.pType, rprtName: data.rprtName, tName: data.tName, pStatus: data.pStatus, psStatus: data.psStatus, createdDt: moment(data.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY'), euEmID: data.euEmID, euMobCcNum: data.euMobCcNum, rprtPrimary: data.rprtPrimary });
  }

  handlePtnsUpdate = () => {
    const { caseId, ptnsData } = this.state;
    if (!caseId) {
      this.setState({ errMsg: 'Case Id Required' });
    } else {
      this.setStateData({ disable: true });
      const recordId = ptnsData._id;
      const reqBody = { pcNum: caseId };
      if (ptnsData.pcNum === reqBody.pcNum) {
        this.setState({ errMsg: 'There are no Changes' })
      } else {
        this.props.putB2BH1BPtnsCaseIdUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ editModal: false, errMsg: '', ptnsData: {}, disable: false });
            this.getH1BPtnsList(1, '', 10, false, []);
          } else {
            this.setState({ errMsg: 'H1BPetition Case-ID Updation Failed', disable: false });
          }
        });
      }
    }
  }

  handlePetitionsLifeCycle = (data) => {
    this.setState({ ptnsLfcModal: true, ptnsData: data, ptnsShow: '', errMsg: '' })
  }
  
  handlePetitionsFollowUpNotes = (data) => {
    this.setState({ ptnFwlpModal: true, ptnsData: data, ptnsShow: '', errMsg: '' })
  }

  handlePrClick = () => {
    let { priority, ptnsData, ptnsList } = this.state;
    if (priority === ptnsData.priority) {
      this.setState({ errMsg: 'There is no change in Priority' });
    } else {
      this.setState({ disable: true });
      const reqBody = { priority };
      this.props.putB2BH1BPtnsPrtyUpdt(ptnsData._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = ptnsList.findIndex(ptns => ptns._id === ptnsData._id);
          if (index > -1) ptnsList[index]['priority'] = priority;
          this.setState({ prModal: false, ptnsList, ptnsData: {}, errMsg: '', priority: '', disable: false });
        } else {
          this.setState({ prModal: false, errMsg: '', priority: '', disable: false });
        }
      })
    }
  }

  handleDelClick = () => {
    const { ptnsData, ptnsList, ptnsListCount } = this.state;
    const recordId = ptnsData._id;
    const reqBody = { pId: ptnsData.pId, pcNum: ptnsData.pcNum }
    this.props.putH1bPetitionDelete(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        const index = ptnsList.findIndex(ptn => ptn._id === recordId);
        if (index > -1) ptnsList.splice(index, 1);
        this.setState({ delModal: false, ptnsList, ptnsListCount: (ptnsListCount - 1), errMsg: '', ptnsData: {} });
      } else {
        this.setState({ errMsg: 'H1B Petition Delete Failed' });
      }
    });
  }

  render() {
    return <>
      <H1BPetitionsListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleH1BPtnsCreate={this.handleH1BPtnsCreate}
        handlePtnsMenu={this.handlePtnsMenu}
        handleClickOutside={this.handleClickOutside}
        ptnsRef={this.ptnsRef}
        statusClick={this.statusClick}
        handleStatusUpdate={this.handleStatusUpdate}
        handleClose={this.handleClose}
        handlePtnsViewClick={this.handlePtnsViewClick}
        handlePtnsUpdate={this.handlePtnsUpdate}
        handlePetitionsLifeCycle={this.handlePetitionsLifeCycle}
        handlePrClick={this.handlePrClick}
        handlePetitionsFollowUpNotes={this.handlePetitionsFollowUpNotes}
        handleDelClick={this.handleDelClick}
      />
      {this.state.createModal && <H1BPetitionCreate createModal={this.state.createModal} handleClose={this.handleClose} getH1BPtnsList={this.getH1BPtnsList} />}
      <H1bPetitionsFwlpList ptnFwlpModal={this.state.ptnFwlpModal} ptnsData={this.state.ptnsData} setStateData={this.setStateData} />
      <H1BPetitionLfcsList ptnsLfcModal={this.state.ptnsLfcModal} ptnsData={this.state.ptnsData} setStateData={this.setStateData} />
    </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BH1BPtnsList: (body, callback) => dispatch(postB2BH1BPtnsList(body, callback)),
  putB2BH1BPtnsStatusupdate: (recordId, body, callback) => dispatch(putB2BH1BPtnsStatusupdate(recordId, body, callback)),
  putB2BH1BPtnsCaseIdUpdate: (recordId, body, callback) => dispatch(putB2BH1BPtnsCaseIdUpdate(recordId, body, callback)),
  putB2BH1BPtnsPrtyUpdt: (recordId, body, callback) => dispatch(putB2BH1BPtnsPrtyUpdt(recordId, body, callback)),
  putH1bPetitionDelete: (recordId, body, callback) => dispatch(putH1bPetitionDelete(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(H1BPetitionList);