/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ConsultantViewComponent, ConsultantViewPopupsComponent } from '../../components/consultants';
import {postB2BConsInviteMeetingsList} from '../../actions/invitations/MeetingsActions';
import { getB2BConsInviteReviewersList } from '../../actions/invitations/ReviewersAction';

import { getB2BConsultantView, putB2BConsultantsStatusUpdate, deleteB2BConsultantsDelete, postB2BCnsltantsList, putB2BConsultantsChangePassword, PostB2BCnsltantsPwdLink } from '../../actions/consultants/ConsultantActions';
import {getB2BInvitationView} from '../../actions/invitations/InvitationActions';
import { postB2BConsInviteNotesList } from '../../actions/invitations/NotesActions';
import localForage from '../../hooks/localForage';
import {postB2bUsersTotalList} from '../../actions/users/UsersActions';
import { postB2BLeadsList, putB2BLeadStatusUpdate } from '../../actions/leads/LeadsAction';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import { PostB2BCuntntExpirationList } from '../../actions/expiration/ExpirationAction';
import hashHistory from '../../hashHistory';
import md5 from 'md5';

class ConsultantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cnsltantView: {},
      consultantData: {},
      address: {},
      profile: {},
      education: [],
      certifications: [],
      workAuths: {},
      wrkExps: {},
      uAddress: {},
      viewModal: false,
      showNotesPopup: false,
      showMetgsPopup: false,
      showreviewPopup: false,
      userData: {},
      rolesObj: {},
      inviteData: {},
      invtaView: {},
      iAddress: {},
      iEducation: [],
      iCertification: [],
      iWorkAuths: {},
      iWrkExps: {},
      iUaddress: {},
      notesList: [],
      meetingsList: [],
      reviewList: [],
      tabsArr: ['Scheduled', 'Completed', 'Cancelled'],
      actTab: '0',
      meeting: {},
      leadView: {},
      exprActList: {i94: {data: [], count: 0}, Visa: {data: [], count: 0}, Passport: {data: [], count: 0}, WrkAuth: {data: [], count: 0}, USid: {data: [], count: 0}, SSN: {data: [], count: 0}},
      wStatus: '',
      recruiter: '',
      recruitersList: [],
      notes: '',
      errMsg: '',
      succMsg: '',
      loading: true,
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
      disabled: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnJbTitleArr: [],
      showSsn: false,
      showViewSsn: false,
      actTab: 'personal',
      cnsltntsShow: '',
      openMore: false,
      statusModal: false,
      deleteModal: false,
      password: '',
      showPassword: '',
      confirmPassword: '',
      showConfirmPassword: '',
      resetPasswordModal: false,
      smTypes: [],
    }
    this.cnsltntsRef = {};
  };
  setStateData = (data) => this.setState({...data});
  componentDidMount = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};    
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.props.getB2BConsultantView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        const resAd = resObj.resData.result.address && resObj.resData.result.address.length ? resObj.resData.result.address.find(item => item.adrsType == 'USA RES') : {};
        const uAd = resObj.resData.result.address.length ? resObj.resData.result.address.find(item => item.adrsType == 'USA ID') : {};
        const address = resAd && resAd._id ? resAd : {}
        const uAddress = uAd && uAd._id ? uAd : {};
        const profile = resObj.resData.result.profile.length ? resObj.resData.result.profile [0] : {};
        const education = resObj.resData.result.education.length ? resObj.resData.result.education  : [];
        const certifications = resObj.resData.result.certs && resObj.resData.result.certs.length ? resObj.resData.result.certs  : [];
        const workAuths = resObj.resData.result.workAuths.length ? resObj.resData.result.workAuths[0] : {};
        const wrkExps = resObj.resData.result.wrkExps.length ? resObj.resData.result.wrkExps[0] : {} ;
        this.setState({rolesObj: {...rolesObj, appAcc}, userData: userInfo, cnsltantView: resObj.resData.result, address, profile, education, certifications, workAuths, wrkExps, uAddress, inviteData: resObj.resData.result, loading: false});
        this.getleads(resObj.resData.result.wStatus, false);
      } else {
        this.setState({rolesObj: {...rolesObj, appAcc}, userData: userInfo, cnsltantView: {}, address: {}, profile: {}, education: [], certifications: [], workAuths: {}, wrkExps: {}, uAddress: {}, inviteData: {}, loading: false});
      }
    });
    this.getSkillsList();
    this.getExprActList();
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
  getExprActList = () => {
    const reqBody = {uid: this.props.id};
    this.props.PostB2BCuntntExpirationList(reqBody, (resObj) => {
      if(resObj.status === '200') {
        const exprActList = this.setResData(resObj.resData.result);
        this.setState({exprActList});
      } else {
        this.setState({exprActList: {}});
      }
    });
  }

  setResData = (resData) => {
    const { expTotalList, expLatestList } = resData;
    const expLatest = expLatestList.length ? expLatestList.map(item => item.latest) : [];
    const types = ["i94", "Visa", "Passport", "WrkAuth", "USid", "SSN"]
    const result = {};
    types.forEach(type => {
      let filtered = expTotalList.filter(item => item.type === type);
      if (filtered.length === 0) {
        filtered = expLatest.filter(item => item.type === type);
      }
      result[type] = {
        data: filtered,
        count: filtered.length
      };
    });
  return result;
  }

  handleInvView = () => {
   this.getInvData();
  }
  getInvData = async() => {
    this.props.getB2BInvitationView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        const resAd = resObj.resData.result.address && resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA RES') : {};
        const uAd = resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA ID') : {};
        const iAddress = resAd && resAd._id ? resAd : {};
        const iUaddress = uAd && uAd._id ? uAd : {};
        const iEducation = resObj.resData.result.education.length ? resObj.resData.result.education : [];
        const iCertification = resObj.resData.result.certs && resObj.resData.result.certs.length ? resObj.resData.result.certs : [];
        const iWorkAuths = resObj.resData.result.workAuths.length ? resObj.resData.result.workAuths[0] : {};
        const iWrkExps = resObj.resData.result.wrkExps.length ? resObj.resData.result.wrkExps[0] : {};
        this.setState({invtaView: resObj.resData.result, iAddress, iWorkAuths, iWrkExps, iEducation, iCertification, iUaddress, viewModal: true, showMetgsPopup: false, showNotesPopup: false, showreviewPopup: false});
      } else {
        this.setState({invtaView: {}, iAddress: {}, iWorkAuths: {}, iWrkExps: {}, iEducation: [], iCertification: [], iUaddress: {}, viewModal: true, showMetgsPopup: false, showNotesPopup: false, showreviewPopup: false });
      }
    });
  }

  handleOpenModels = (model) => {
    if(model == 'details'){
      this.getInvData();
    } else if (model == 'notes') {
      this.inviteNotesList(1, this.state.inviteData)
    } else if (model == 'meetings') {
      this.getInviteMeetingsList(1, this.state.inviteData, 0)
    } else {
      this.reviewsListData(1, this.state.inviteData)
    }
  };

  inviteNotesList = (pgNum, inviteData) =>{
    const recordId = inviteData._id;
    const reqBody = { pgNum };
    this.props.postB2BConsInviteNotesList(recordId, reqBody, (response) => {
      if(response.status == '200') {
        this.setState({showNotesPopup: true, showMetgsPopup: false, showreviewPopup: false, notesList: response.resData.result.NotesList, pgNum});
      } else{
        this.setState({showNotesPopup: true, showMetgsPopup: false, showreviewPopup: false, notesList: [], pgNum});
      }
    });
  }
  getInviteMeetingsList = (pgNum, inviteData, actTab) => {
    const invId = inviteData._id;
    const reqBody = { pgNum, status: this.state.tabsArr[actTab]};
    this.props.postB2BConsInviteMeetingsList(invId, reqBody, (resObj) => {
      if(resObj.status == '200') {
        this.setState({showMetgsPopup: true, showNotesPopup: false, showreviewPopup: false, pgNum, meetingsList: resObj.resData.result.mtLIst, actTab});
      } else {
        this.setState({showMetgsPopup: true, showNotesPopup: false, showreviewPopup: false, pgNum, meetingsList: [], actTab});
      }
    });
  }
  reviewsListData = (pgNum, inviteData) => {
    const invId = inviteData._id;
    const reqBody = { pgNum };
    this.props.getB2BConsInviteReviewersList(invId, reqBody, (resObj) => {            
      if (resObj.status == '200') {
        this.setState({showreviewPopup: true, showMetgsPopup: false, showNotesPopup: false, reviewModal: true, reviewList: resObj.resData.result, pgNum, inviteData});
      } else {
        this.setState({showreviewPopup: true, showMetgsPopup: false, showNotesPopup: false, reviewModal: true, reviewList: [], pgNum});
      }
    })
  }

  handleSelectTab = (actTab) => {
    const {inviteData} = this.state;
    this.getInviteMeetingsList(1, inviteData, actTab);
  }

  handleClosePopup = () => {
    this.setState({ showNotesPopup: false, showMetgsPopup: false, showreviewPopup: false });
  };

  handleStatus = (wStatus) => {
    this.getleads(wStatus, true);
  }

  getCnsltantsList = async (actPgNum, searchStr, pageLimit, isSearch) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = {
      pgNum: actPgNum,
      limit: pageLimit,
      searchStr: searchStr
    };
    this.props.postB2BCnsltantsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, cnsltantsList: resObj.resData.result.consultantsList, cnsltantsListCount: resObj.resData.result.consultantsListCount, actPgNum, searchStr, pageLimit, loading: false });
      } else if (isSearch) {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, cnsltantsList: [], cnsltantsListCount: 0, actPgNum: 1, searchStr, pageLimit, loading: false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, loading: false });
      }
    });
  }

  handleStatusUpdate = () => {
    const { consultantData } = this.state;
    this.setStateData({ disable: true });
    const recordId = consultantData._id;
    const status = consultantData.uStatus == 'Active' ? 'Inactive' : 'Active';
    const reqBody = { status };
    this.props.putB2BConsultantsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', consultantData: {}, disable: false });
        this.getCnsltantsList(1, '', 10, false);
      } else {
        this.setState({ errMsg: 'Consultant Status Update Failed', disable: false });
      }
    });
  }

  handleConsultantDelete = () => {
    const { consultantData } = this.state;
    const recordId = consultantData._id;
    const reqBody = { myPrimary: consultantData.myPrimary, userId: consultantData.refUID, conKey: 'Active'};
    this.props.deleteB2BConsultantsDelete(recordId, reqBody, (resObj) => {            
      if (resObj.status == '200') {
        this.setState({sucMsg: 'Consultant Deleted Successfully'});
        setTimeout(() => {
          this.setState({ deleteModal: false, consultantData: {}, errMsg: '' });
          this.getCnsltantsList(1, '', 10, true);
        }, 2000);
      } else {
        this.setState({ errMsg: resObj.resData.result, disable: false });
      }
    });
  }

  getleads = async (wStatus, flag) => {
    const reqBody = {
      pgNum: 1,
      limit: 100,
      searchStr: '',
      filters: [],
      euUser: this.props.id,
      wStatus: ['Send To Marketing', 'Job Ended Send To Marketing']
    };
    this.props.postB2BLeadsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result.leadsList;
        const leadData = data.find(item => item.euUser == this.props.id);
        const leadView = leadData && leadData._id ? leadData : {};
        const years = leadView.mTexp ? Math.floor(leadView.mTexp  / 12) : 0; const months = leadView.mTexp ? leadView.mTexp % 12 : 0;
        const recData = leadView.ua && leadView.ua.length ? leadView.ua.find(item => item.role == 'Recruiter') : {};
        this.setState({ leadView, wStatus, showStatusPopUp: flag, email: leadView.mEmail, mobCc: leadView.mMobCc, mobNum: leadView.mMobNum, jobTitle: leadView.mJobTitle ?  {label: leadView.mJobTitle, value: leadView.mJobTitle} : null, visaStatus: leadView.mVisaStatus, currentClient: leadView.mCurrClient,previousClient: leadView.mPrevClient,linkedIn: leadView.mWrkUrls && leadView.mWrkUrls.length ? leadView.mWrkUrls[0]: '', expYrs: { label: years, value: years}, expMonths: { label: months, value: months }, recruiter: recData && recData._id ? recData._id : ''});
        leadView && leadView._id && this.postB2BUsersData(leadView);
      } else {
        this.setState({ leadView: {} });
      }
    });
  }

  postB2BUsersData = (leadView) => {
    const userType = ['Employee'];
    const reqBody = {userType, userRole: 'Recruiter', teams: [leadView.team], orgId: leadView.org};
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const ofSmngrD = leadView.ua && leadView.ua.length ? leadView.ua.filter(item => item.role == 'Offshore Manager') : [];
        const ofSleadD = leadView.ua && leadView.ua.length ? leadView.ua.filter(item => item.role == 'Offshore Lead') : [];
        const ids = [];
        ofSmngrD && ofSmngrD.length && ofSmngrD.forEach(item => ids.push(item._id));
        ofSleadD && ofSleadD.length && ofSleadD.forEach(item => ids.push(item._id));
        const recruitersList = resObj.resData.result.filter(item => item.pReports.some(item1 => ids.includes(item1)));
        this.setState({recruitersList: recruitersList?.length ? recruitersList : []});
      } else {
        this.setState({recruitersList: [] });
      }
    });
  }

  handleModalStatusUpdate = () => {
    const { wStatus, notes, recruiter, email, mobNum, jobTitle, visaStatus, linkedIn } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    const mobValid = /^[0-9]{10}$/;
    const linkedinValid = /^(https?:\/\/)/;
    if (!wStatus) {
      this.setState({ errMsg: 'Status is required' });
    } else if ((wStatus == 'Send To Marketing' || wStatus == 'In Marketing') && !recruiter) {
      this.setState({ errMsg: 'Recruiter is required' });
    } else if (!notes) {
      this.setState({ errMsg: 'Notes is required' });
    } else if (wStatus == 'Send To Marketing' || wStatus == 'In Marketing') {
      if(!email){
        this.setState({ errMsg: 'Email is required' })
      } else if (email && !emailValid.test(email)) {
        this.setState({ errMsg: 'Invalid Email' })
      } else if(!mobNum){
        this.setState({ errMsg: 'Mobile Number is required' })
      } else if (mobNum && !mobValid.test(mobNum)) {
        this.setState({ errMsg: 'Please enter a valid mobile number' })
      } else if(!visaStatus){
        this.setState({ errMsg: 'Visa Status is required' })
      }  else if(!jobTitle){
        this.setState({ errMsg: 'Job Title is required' })
      } else if(!linkedIn){
        this.setState({ errMsg: 'LinkedIn URL is required' })
      // } else if (linkedIn && !linkedinValid.test(linkedIn)) {
      //   this.setState({ errMsg: 'LinkedIn URL, Starting "http:// or https://" is required' });  
      // } else if(linkedIn && (linkedIn.split('/').length < 3 || linkedIn.split('/')[2]?.length < 1)) {
      //   this.setState({ errMsg: 'Provide a valid LinkedIn URL' });
      } else {
        this.handleUpdateApiCall();
      }
    } else if (email && !emailValid.test(email)) {
      this.setState({ errMsg: 'Invalid Email' })
    } else if (mobNum && !mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    } else {
      this.handleUpdateApiCall()
    }
  }
  handleUpdateApiCall = () => {
    this.setState({disabled: true})
    const { wStatus, leadView, notes, recruiter, recruitersList, email, mobCc, mobNum, jobTitle, visaStatus, currentClient, previousClient, linkedIn, expYrs, expMonths} = this.state;
    const uaD = leadView.ua && leadView.ua.length ? leadView.ua.filter(item => item.role !== 'Recruiter') : [];
    const recrD = leadView.ua && leadView.ua.length  ? leadView.ua.find(item => item.role == 'Recruiter') : {};
    const recruiterData = recruiter && recruitersList.length ? recruitersList.find(item => item._id == recruiter) : {};
    const recData = recruiterData && recruiterData._id ? recruiterData : {};
    const reportsD = recrD && recrD?._id ? leadView.pReports.filter(item => item !== recrD._id) : leadView.pReports
    const pReports = recData && recData?._id ? [...new Set([...reportsD, recData._id])] : [...new Set([...reportsD])];
    const ua = [...uaD];
    recData && recData._id && ua.push({
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
      mMobCc:  mobNum ? mobCc ? mobCc : '+1' : '',
      mMobNum: mobNum,
      mJobTitle: jt,
      mVisaStatus: visaStatus,
      mCurrClient: currentClient,
      mPrevClient: previousClient,
      mWrkUrls: linkedIn ? [linkedIn] : [],
      mTexp: expMonths.value + (expYrs.value  * 12), 
    }
    const mrkt = JSON.stringify(initialMrkD) !== JSON.stringify(updatedMrkD);
    const reqBody = {
      status: wStatus,
      notes: wStatus == 'Send To Marketing' ? leadView.notes : notes,
      ua,
      pReports,
      ...updatedMrkD,
      ofsVrfy: wStatus == 'Trainy' ? false : true, 
      ofsVrfyNotes: wStatus == 'Send To Marketing' ? notes : leadView.ofsVrfyNotes, 
      mrkt,
      name: leadView.euName,
      review: leadView.ofsVrfy ? 'Onsite Review': 'Offshore Review',
    }
    this.props.putB2BLeadStatusUpdate(leadView._id, reqBody, (resObj) => {
      if(resObj.status == '200'){
        this.setState({ succMsg: 'Status updated successfully' });
        setTimeout(() => {
        hashHistory.push('/consultants/onboarding');
        this.setState({ succMsg: '', errMsg: '', showStatusPopUp: false, notes: '', recruiter: '', mentor: '', wStatus: '', email: '', mobCc: '+1',
            mobNum: '', jobTitle: null, visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 }, expMonths: { label: 0, value: 0 }, disabled: false});
        }, 2000)
      } else {
        this.setState({ errMsg: 'Status update failed', disabled: false });
      }
    })
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

  handleChangePassword = (event) => {
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    const { password, confirmPassword, consultantData } = this.state;
    if (!password) {
      this.setState({ errMsg: 'New Password is Requied' });
    } else if (password.length < 8) {
      this.setState({ errMsg: 'Password requires atleast 8 characters' });
    } else if (password && (password.toLowerCase().includes('password') || !pswdRegex.test(password))) {
      this.setState({ errMsg: "New Password is not matching it's rules"});
    } else if (!confirmPassword) {
      this.setState({ errMsg: 'Confirm Password is Requied' });
    } else if (password != confirmPassword) {
      this.setState({ errMsg: 'New Password and Confirm Password should be same' });
    } else {
      const reqBody = {
        recordid: consultantData._id,
        currPassword: md5(password),
        password: md5(confirmPassword),
      }
      this.props.putB2BConsultantsChangePassword(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ sucMsg: resObj.resData.result });
          setTimeout(() => {
            this.setState({ passwordModal: false, errMsg: '' });
          }, 1000);
          this.getCnsltantsList(1, '', 10, false);
        } else {
          this.setState({ errMsg: resObj.resData.result });
        }
      });
    }
  }

  handleShowSsn = () => this.setState({showSsn: !this.state.showSsn });
  handleViewShowSsn = () => this.setState({showViewSsn: !this.state.showViewSsn});

  sendPwdLink = (data) => {            
    this.setState({resetPasswordModal: true, consultantData: data});
  }

  handleResetPassword = () => {
    const { consultantData } = this.state;
    const recordId = consultantData._id;
    const reqBody = { emID: consultantData.emID };
    this.props.PostB2BCnsltantsPwdLink(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ sucMsg: 'Password Link send Successfully' });
        setTimeout(() => {
          this.setState({ resetPasswordModal: false, sucMsg: '' });
        }, 1000)
      } else {
        this.setState({ errMsg: 'Password Link send failed' });
      }
    })
  }

  changePaswword = (e) => this.setState({ password: e.target.value, errMsg: '' });
  handlePasswordShowHide = () => this.setState({ showPassword: !this.state.showPassword });
  changeConfirmPassWord = (e) => this.setState({ confirmPassword: e.target.value, errMsg: '' });
  handleConfirmPasswordShowHide = () => this.setState({ showConfirmPassword: !this.state.showConfirmPassword });

  togglePopup = () => {
    this.setState((prevState) => ({ isOpen: !prevState.openMore }));
  };

  handleCnsltntsMenu = (cnsltntsId) => {
    const { cnsltntsShow } = this.state;
    this.setState({cnsltntsShow: cnsltntsShow ? '' : cnsltntsId});
  }

  handleClickOutside = (event) => {
    const { cnsltntsShow } = this.state;
    if (this.cnsltntsRef[cnsltntsShow] && !this.cnsltntsRef[cnsltntsShow].contains(event.target)) {
      this.setState({ cnsltntsShow: '',  });
    }
  }

  handleShowMoreData = (type) => {
    let {exprActList, smTypes} = this.state;
    const reqBody = {type, uid: this.props.id};
    this.props.PostB2BCuntntExpirationList(reqBody, (resObj) => { 
      if(resObj.status == '200') {
        exprActList[type].data = resObj?.resData?.result;
        exprActList[type].count = resObj?.resData?.result?.length;
        smTypes.push(type);
        this.setState({exprActList, smTypes});
      }
    });
  }

  render() {
    return (
      <>
      <ConsultantViewComponent 
        state={this.state} 
        setStateData={this.setStateData} 
        handleInvView ={this.handleInvView} 
        handleStatus={this.handleStatus} 
        handleStatusUpdate={this.handleStatusUpdate}
        handleConsultantDelete={this.handleConsultantDelete}
        handleShowSsn={this.handleShowSsn} 
        handleCnsltntsMenu={this.handleCnsltntsMenu} 
        handleClickOutside={this.handleClickOutside} 
        togglePopup={this.togglePopup} 
        andleConsultantDelete={this.handleConsultantDelete}
        handleChangePassword={this.handleChangePassword}
        changePaswword={this.changePaswword}
        changeConfirmPassWord={this.changeConfirmPassWord}
        handlePasswordShowHide={this.handlePasswordShowHide}
        handleConfirmPasswordShowHide={this.handleConfirmPasswordShowHide}
        sendPwdLink = {this.sendPwdLink}
        cnsltntsRef={this.cnsltntsRef}
        handleResetPassword = {this.handleResetPassword}
        handleShowMoreData={this.handleShowMoreData}
        getExprActList={this.getExprActList}
      />
      {(this.state.viewModal || this.state.showStatusPopUp) && (
      <ConsultantViewPopupsComponent 
        handleOpenModels={this.handleOpenModels} 
        setStateData={this.setStateData} 
        state={this.state} 
        id={this.props.id}
        handleSelectTab={this.handleSelectTab} 
        handleModalStatusUpdate={this.handleModalStatusUpdate} 
        handleCreateSkill={this.handleCreateSkill} 
        handleViewShowSsn={this.handleViewShowSsn}/>
      )}
      </>
    )
  }
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BCnsltantsList: (body, callback) => dispatch(postB2BCnsltantsList(body, callback)),
  getB2BConsultantView: (recordId, callback) => dispatch(getB2BConsultantView(recordId, callback)),
  putB2BConsultantsStatusUpdate: (recordId, body, callback) => dispatch(putB2BConsultantsStatusUpdate(recordId, body, callback)),
  deleteB2BConsultantsDelete: (recordId, body, callback) => dispatch(deleteB2BConsultantsDelete(recordId, body, callback)),
  getB2BInvitationView: (recordId, callback) => dispatch(getB2BInvitationView(recordId, callback)),
  postB2BConsInviteNotesList: (invId, body, callback) => dispatch(postB2BConsInviteNotesList(invId, body, callback)),
  postB2BConsInviteMeetingsList: (invId, body, callback) => dispatch(postB2BConsInviteMeetingsList(invId, body, callback)),
  getB2BConsInviteReviewersList: (invId, reqBody, callback) => dispatch(getB2BConsInviteReviewersList(invId, reqBody, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  postB2BLeadsList: (body, callback) => dispatch(postB2BLeadsList(body, callback)),
  putB2BLeadStatusUpdate: (id, body, callback) => dispatch(putB2BLeadStatusUpdate(id, body, callback)), 
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback)),
  putB2BConsultantsChangePassword: (body, callback) => dispatch(putB2BConsultantsChangePassword(body, callback)),
  PostB2BCnsltantsPwdLink: (recordId, body, callback) => dispatch(PostB2BCnsltantsPwdLink(recordId, body, callback)),
  PostB2BCuntntExpirationList: (body, callback) => dispatch(PostB2BCuntntExpirationList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ConsultantView);
