/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { CandidateInterviwsViewComponent } from '../../components/interviews';
import { GetB2BInvView, putB2BInterviewVerStsUpdate } from '../../actions/interviews/InterviewActions';
import localForage from '../../hooks/localForage';
import {getB2BInvitationView} from '../../actions/invitations/InvitationActions';
import {postB2BConsInviteMeetingsList} from '../../actions/invitations/MeetingsActions';
import { postB2BConsInviteNotesList } from '../../actions/invitations/NotesActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI, PostB2BDropdownsUpdateAPI } from '../../actions/dropdowns/DropdownsActions';
import { SubmisInvtViewComponent } from '../../components/submissions';
import hashHistory from '../../hashHistory';

class CandidateInterviwsViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interviwView: {},
      rolesObj:{},
      inviteData: {},
      iAddress: {},
      iEducation: [],
      iWorkAuths: {},
      iWrkExps: {},
      iUaddress: {},
      viewModal: false,
      showNotesPopup: false,
      showMetgsPopup: false,
      notesList: [],
      meetingsList: [],
      tabsArr: ['Scheduled', 'Completed', 'Cancelled'],
      actTab: '0',
      meeting: {},
      userData: {},
      iStatus: '',
      mShow: false,
      errMsg: '',
      sucMsg: '',
      vrfyNts: '',
      invName: '', invEmail: '', invMobCc: '+1', invMobNum: '',
      cmnInvgtrArr: [], invglstrs: [], cmnValue: '',cmnErrMsg: ''
    };
  }

  componentDidMount = () => {
    this.handileInterviView();
  }
  handileInterviView = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const id = this.props.id
    this.props.GetB2BInvView(id, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: {...rolesObj, appAcc}, interviwView: resObj.resData.result, userData: userInfo });
      } else {
        this.setState({ rolesObj: {...rolesObj, appAcc}, interviwView: {}, userData: {} });
      }
    });
  }
  setStateData = (data) => this.setState({...data});
  handleInvView = () => {
    this.getInvData();
  };

  getInvData = async () => {
    const {interviwView} = this.state;
    this.props.getB2BInvitationView(interviwView.euUser, (resObj) => {
      if (resObj.status == '200') {
        const resAd = resObj.resData.result.address && resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA RES') : {};
        const uAd = resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA ID') : {};
        const iAddress = resAd && resAd._id ? resAd : {};
        const iUaddress = uAd && uAd._id ? uAd : {};
        const iEducation = resObj.resData.result.education.length ? resObj.resData.result.education : [];
        const iWorkAuths = resObj.resData.result.workAuths.length ? resObj.resData.result.workAuths[0] : {};
        const iWrkExps = resObj.resData.result.wrkExps.length ? resObj.resData.result.wrkExps[0] : {};
        this.setState({inviteData: resObj.resData.result, iAddress, iWorkAuths, iWrkExps, iEducation, iUaddress, viewModal: true, showMetgsPopup: false, showNotesPopup: false});
      } else {
        this.setState({inviteData: {}, iAddress: {}, iWorkAuths: {}, iWrkExps: {}, iEducation: [], iUaddress: {}, viewModal: true, showMetgsPopup: false, showNotesPopup: false,});
      }
    });
  };
  handleOpenModels = (model) => {
    if(model == 'details'){
      this.getInvData();
    } else if (model == 'notes') {
      this.inviteNotesList(1, this.state.inviteData)
    } else{
      this.getInviteMeetingsList(1, this.state.inviteData, 0)
    }
  };

  inviteNotesList = (pgNum, inviteData) =>{
    const recordId = inviteData._id;
    const reqBody = { pgNum };
    this.props.postB2BConsInviteNotesList(recordId, reqBody, (response) => {
      if(response.status == '200') {
        this.setState({showNotesPopup: true, showMetgsPopup: false, notesList: response.resData.result.NotesList, pgNum,inviteData});
      } else{
        this.setState({showNotesPopup: true, showMetgsPopup: false, notesList: [], pgNum});
      }
    });
  }
  getInviteMeetingsList = (pgNum, inviteData, actTab) => {
    const invId = inviteData._id;
    const reqBody = { pgNum, status: this.state.tabsArr[actTab]};
    this.props.postB2BConsInviteMeetingsList(invId, reqBody, (resObj) => {
      if(resObj.status == '200') {
        this.setState({showMetgsPopup: true, showNotesPopup: false, pgNum, meetingsList: resObj.resData.result.mtLIst, actTab, inviteData});
      } else {
        this.setState({showMetgsPopup: true, showNotesPopup: false, pgNum, meetingsList: [], actTab,});
      }
    });
  }
 
  handleClosePopup = () => {
    this.setState({ showNotesPopup: false, showMetgsPopup: false, errMsg: '', sucMsg: '' });
  };

  handleStatusUpdate = () => {
    const invId =  this.props.id;
    const {vrfyNts, iStatus, invMobCc, invMobNum, invEmail, invglstrs, cmnInvgtrArr, interviwView} = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const invName = invglstrs?.value ? invglstrs.value : '';
    if (iStatus == 'Approved' && !invName) {
      this.setState({ mShow: true, errMsg: 'Invigilator Name is required', sucMsg: ''});
    } else if (iStatus == 'Approved' && invEmail && !emailValid.test(invEmail)) {
      this.setState({ mShow: true, errMsg: 'Invalid Email', sucMsg: ''});
    } else if (!vrfyNts) {
      this.setState({ mShow: true, errMsg: 'Verify Notes is required', sucMsg: ''});
    } else {
      const isNewInv = invglstrs?.name && cmnInvgtrArr.some(item => item.name == invglstrs.value);
      const invData = isNewInv && cmnInvgtrArr.find(item => item.name == invglstrs.value);
      const isInvChng = isNewInv && (invData.mobCcNum == invMobCc + ' '+invMobNum && invData.emId == invEmail);
      !isInvChng && this.handleCreateInvgltr(false);
      !isNewInv && iStatus == 'Approved' && this.handleCreateInvgltr(true);
      const reqBody = { vrfyNts, intrwAppr: iStatus, invName, invEmail, mobNum: invMobNum ? invMobCc + ' '+ invMobNum : '', round: interviwView.round, iSchedules: interviwView.iSchedules};
      this.props.putB2BInterviewVerStsUpdate(invId, reqBody, (resObj) => {
        if(resObj.status == '200') {
          this.setState({ errMsg: '', sucMsg: 'Interview Reviewed Successfully' });
          setTimeout(() => {
            hashHistory.push('/interviews');
            this.setState({ mShow: false, sucMsg: '' });
          }, 2000);
        } else {
          this.setState({ mShow: true, errMsg: 'Interview Reviewed Failed', sucMsg: ''});
        }
      });
    }
  }
  
  handleIntrvwReview = (iStatus) => {
    if (iStatus == 'Approved') {
      this.getInvgltrList();
    } else {
      this.setState({iStatus, mShow: true});
    }
  }

  getInvgltrList = () => {
    const {interviwView} = this.state;
    const reqBody = { actPgNum: 1, rLimit: 100 }
    this.props.PostB2BDropdownsListAPI(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result.lookUpsList;
        const data = resData.map(item => ({ ...item, label: item.name, value: item.name }));
        const cmnInvgtrArr = data?.length > 0 ? data.filter(item => item.type === 'Investigator') : [];
        this.setState({ cmnInvgtrArr,  mShow: true, iStatus: 'Approved', invglstrs: {label: interviwView.invsgtrName, value: interviwView.invsgtrName}, invMobCc: interviwView?.invsgtrMobNum?.split(' ')[0] || '+1', invMobNum: interviwView?.invsgtrMobNum?.split(' ')[1] || '', invEmail: interviwView.invsgtrEmID});
      } else {
        this.setState({ cmnInvgtrArr: [], mShow: true, iStatus: 'Approved', invglstrs: {label: interviwView.invsgtrName, value: interviwView.invsgtrName}, invMobCc: interviwView?.invsgtrMobNum?.split(' ')[0] || '+1', invMobNum: interviwView?.invsgtrMobNum?.split(' ')[1] || '', invEmail: interviwView.invsgtrEmID });
      }
    });
  }

  handleCreateInvgltr = (isInvChng) => {
    const {invEmail, invMobCc, invMobNum, invglstrs} = this.state;
    const reqBody = { type: 'Investigator', name: invglstrs.value, emId: invEmail, mobCcNum: invMobNum ? invMobCc + ' ' +  invMobNum : ''};
    isInvChng ? this.props.PostB2BDropdownsCreateAPI(reqBody, (resObj) => {}) : this.props.PostB2BDropdownsUpdateAPI(reqBody, (resObj) => {});;
  }

  render() {
    return (
      <>
      <CandidateInterviwsViewComponent
        state={this.state}
        handleInvView={this.handleInvView}
        setStateData={this.setStateData}
        handleStatusUpdate={this.handleStatusUpdate}
        handleIntrvwReview={this.handleIntrvwReview}
        handleCreateInvgltr={this.handleCreateInvgltr}
      />
      {this.state.viewModal && (
        <SubmisInvtViewComponent handleOpenModels={this.handleOpenModels} setStateData={this.setStateData} state={this.state} id={this.props.id}/>
      )}
        </>
    )
  }
}
const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BInvView: (id, callback) => dispatch(GetB2BInvView(id, callback)),
  getB2BInvitationView: (recordId, callback) => dispatch(getB2BInvitationView(recordId, callback)),
  postB2BConsInviteNotesList: (invId, body, callback) => dispatch(postB2BConsInviteNotesList(invId, body, callback)),
  postB2BConsInviteMeetingsList: (invId, body, callback) => dispatch(postB2BConsInviteMeetingsList(invId, body, callback)),
  putB2BInterviewVerStsUpdate: (id, body, callback) => dispatch(putB2BInterviewVerStsUpdate(id, body, callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback)),
  PostB2BDropdownsUpdateAPI: (body, callback) => dispatch(PostB2BDropdownsUpdateAPI(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(CandidateInterviwsViewClass);
