/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {InvitationPopupsComponent, InvitationViewComponent} from '../../components/invitations';
import {getB2BInvitationView, putB2BInvitationsStatusUpdate} from '../../actions/invitations/InvitationActions';
import {GetB2BUserView, postB2bUsersTotalList} from '../../actions/users/UsersActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import localForage from '../../hooks/localForage';
import {InviteNotesList} from './notes';
import {InviteMeetingsList} from './meetings';
import {InviteReviewersList} from './reviewers';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';

class InvitationViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invtaView: {},
      address: {},
      education: [],
      certifications: [],
      workAuths: {},
      wrkExps: {},
      statusModal: false,
      rejectModal: false,
      reOpenModal: false,
      isprvBtn: false,
      isrejBtn: false,
      isReopenBtn: false,
      uAddress: {},
      rolesObj:{},
      mentor: [], recruiter: [],
      notes:'',
      usrArr:[],
      allUsrs: [],
      errMsg:'',
      succMsg: '',
      showNotes: false,
      showMeetings: false,
      userData: {},
      showReview: false,
      loading: true,
      teamsList: [],
      team: '',
      email: '',
      mobCc: '+1',
      mobNum: '',
      jobTitle: null,
      visaStatus: '',
      currentClient: '', 
      previousClient: '',
      linkedIn: '',
      expYrs: {label: '0 Years', value: 0},
      expMonths: { label: '0 Months', value: 0 },
      disable: false,
      showSsn: false,
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnJbTitleArr: [], workStatus: 'Approved'
    };
  }

  setStateData = (data) => {
    if(data.workStatus){
      this.setState({...data}, () => this.handleChangeTeam(this.state.team));
    } else {
      this.setState({...data});
    }
  }
  componentDidMount = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.props.getB2BInvitationView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        const resAd = resObj.resData.result.address && resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA RES') : {};
        const uAd = resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA ID') : {};
        const address = resAd && resAd._id ? resAd : {};
        const uAddress = uAd && uAd._id ? uAd : {};
        const education = resObj.resData.result.education.length ? resObj.resData.result.education : [];
        const certifications = resObj.resData.result.certs && resObj.resData.result.certs.length > 0 ? resObj.resData.result.certs : [];
        const workAuths = resObj.resData.result.workAuths.length ? resObj.resData.result.workAuths[0] : {};
        const wrkExps = resObj.resData.result.wrkExps.length ? resObj.resData.result.wrkExps[0] : {};
        this.setState({userData: userInfo, rolesObj: {...rolesObj, appAcc}, invtaView: resObj.resData.result, address, workAuths, wrkExps, education, certifications, isprvBtn: true, isrejBtn: true, isReopenBtn: true, uAddress, loading: false});
        const data = resObj.resData.result;
        const teams = data?.team ? [{ _id: data.team, tCode: data.tCode, team: data.team, tName: data.tName }] : userInfo.teams;
        this.getTeamsList(userInfo, data, teams);
      } else {
        this.setState({userData: userInfo, rolesObj: {...rolesObj, appAcc}, invtaView: {}, address: {}, workAuths: {}, wrkExps: {}, education: [], certifications: [], isprvBtn: false, isrejBtn: false, isReopenBtn: false, uAddress: {}, loading: false});
      }
    });
    this.getSkillsList();
  }

  getTeamsList = (userInfo, invtaView, teams) => {
    if(teams.length) {
      this.getTeamsData(userInfo, teams)
    } else {
      this.props.GetB2BUserView(invtaView.report, resObj => {
        if(resObj.status == '200') {
          const reviewer = resObj.resData.result;
          this.getTeamsData(userInfo, reviewer.teams)
        } else {
          alert('Something went wrong, please try again.');
        }
      });
    }
  }

getTeamsData = (userInfo, teams) => {
  const reqBody = { status: 'Active', orgID: userInfo.org };
  this.props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
    if (resObj.status === '200') {
      const data = resObj.resData.result;
      const teamData = teams.map(item => item._id)
      const teamsList = [...teams];
      data.forEach(item => {
        const flag = item?.potlIds?.some(value => teamData.includes(value));
        flag && teamsList.push({ ...item, tName: item.oTeam, tCode: item.otCode });
      });
      const team = teamsList?.length === 1 ? teamsList[0]._id : '';
      const teamIds = teamsList.length ? teamsList.map(item => item._id) : [];
      this.getUsersData(teamIds);
      this.setState({ teamsList, team });
    } else {
      this.setState({ teamsList: [], team: '' });
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
  
  getUsersData = (teamIds) => {
    if(teamIds.length) {
      const {invtaView} = this.state;
      const userType = ['Employee'];
      const userRole = ['Mentor', 'Onsite Manager', 'Onsite Lead', 'Offshore Manager', 'Offshore Lead', 'HR Manager', 'HR Executive', 'Recruiter'];
      const reqBody = { userType, userRole, teams: [...teamIds], orgId: invtaView.org };
      this.props.postB2bUsersTotalList(reqBody, (resObj) => { 
        if (resObj.status == '200') {
          this.setState({ allUsrs: resObj.resData.result }, () => teamIds.length == 1 && this.handleChangeTeam(teamIds[0]));
        } else {
          this.setState({ allUsrs: [] });
        }
      })
    } this.setState({ allUsrs: []});
  }
  
  handleChangeTeam = (team) => {
    if(team){
      const {invtaView, allUsrs, workStatus} = this.state;
      const usrData = allUsrs.find(item => item._id == invtaView.report);
      let usrArrD = allUsrs?.length ? allUsrs.map(item => {return {...item, label: item.name, value: item._id}}) : [];
      usrArrD = (usrData?.userType == 'Management' || usrData?.userType == 'App' || usrData?.userRole == 'HR Manager' || usrData?.userRole == 'HR Executive') ? usrArrD.filter(uo => workStatus == 'In Marketing' ? uo.userRole === 'Recruiter' : uo.userRole === 'Mentor') : usrArrD.filter(uo => (workStatus == 'In Marketing' ? uo.userRole === 'Recruiter' : uo.userRole === 'Mentor') && uo.pReports.includes(invtaView.report));
      const usrArr = usrArrD.filter(item => item.teams.some(value => value._id == team));
      const data = usrArr?.length === 1 ? [{label: usrArr[0].name, value: usrArr[0].name, ...usrArr[0]}] : [];
      this.setState({ usrArr, mentor: workStatus == 'Approved' ? data : [], recruiter: workStatus == 'In Marketing' ? data : [], team, errMsg: '' });
    } else {
      this.setState({ usrArr: [], mentor: [], recruiter: [], team, errMsg: '' });
    }
  }

  handleStatusApprove = () => {
    const {team, mentor, notes, invtaView, email, mobNum, workStatus, userData, recruiter, visaStatus, jobTitle, linkedIn } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    const mobValid = /^[0-9]{10}$/;
    if ((userData?.userType == 'Management' || userData?.userType == 'App' || userData.userRole == 'HR Manager' || userData.userRole == 'HR Executive') && !workStatus) {
      this.setState({ errMsg: 'Work Status is required' });
    } else if (!team) {
      this.setState({ errMsg: 'Team is required' });
    } else if (invtaView?.iFrom !== 'Petition' && workStatus == 'Approved' && mentor.length == 0) {
      this.setState({ errMsg: 'Mentor is required' });
    // } else if (invtaView?.iFrom == 'Offer Letter' && !workStatus) {
    //   this.setState({ errMsg: 'Work Status is required' })
    } else if (workStatus == 'In Marketing' && recruiter.length == 0) {
      this.setState({ errMsg: 'Recruiter is required' });
    } else if (!notes) {
      this.setState({ errMsg: 'Notes is required' })
    } else if (workStatus == 'In Marketing') {
      if(!email){
        this.setState({ errMsg: 'Email is required' });
      } else if (email && !emailValid.test(email)) {
        this.setState({ errMsg: 'Invalid Email' });
      } else if(!mobNum){
        this.setState({ errMsg: 'Mobile Number is required' });
      } else if (mobNum && !mobValid.test(mobNum)) {
        this.setState({ errMsg: 'Please enter a valid mobile number' });
      } else if(!visaStatus){
        this.setState({ errMsg: 'Visa Status is required' });
      } else if(!jobTitle){
        this.setState({ errMsg: 'Job Title is required' });
      } else if(!linkedIn){
        this.setState({ errMsg: 'LinkedIn URL is required' });
      } else {
        this.statusUpdateApiCall();
      }
    } else if (email && !emailValid.test(email)) {
      this.setState({ errMsg: 'Invalid Email' })
    } else if (mobNum && !mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    // } else if (linkedIn && !linkedinValid.test(linkedIn)) {
    //   this.setState({ errMsg: 'LinkedIn URL, Starting "http:// or https://" is required' });  
    // } else if(linkedIn && (linkedIn.split('/').length < 3 || linkedIn.split('/')[2].length < 1)) {
    //   this.setState({ errMsg: 'Provide a valid LinkedIn URL' });
    } else {
      this.statusUpdateApiCall();
    }
  };

  handleMentorChange = (mentor) => {
    if (mentor && mentor.length < 6) {
      this.setState({mentor, errMsg: ''});
    } else {
      this.setState({mentor: this.state.mentor, errMsg: 'Selection Limit Exceeded: You can only select up to 5 mentors.'});
    }
  }

  handleRecruiterChange = (recruiter) => {
    if (recruiter && recruiter.length < 6) {
      this.setState({recruiter, errMsg: ''});
    } else {
      this.setState({recruiter: this.state.recruiter, errMsg: 'Selection Limit Exceeded: You can only select up to 5 recruiters.'});
    }
  }

  statusUpdateApiCall = () => {
    this.setState({disable: true})
    const { invtaView, mentor, notes, allUsrs, usrArr, teamsList, team, email, mobCc, mobNum, jobTitle, visaStatus, currentClient, previousClient, linkedIn, expYrs, expMonths, workStatus, recruiter} = this.state;
    const recordId = invtaView._id;
    const usrData = allUsrs.find(item => item._id == invtaView.report);
    const onSmngrData = usrData && usrData.userRole == 'Onsite Manager' ? usrData : {};
    const onSleadsData = usrData && usrData.userRole == 'Onsite Lead' ? usrData : {};
    const hrManager = usrData && usrData.userRole == 'HR Manager' ? usrData : {};
    const hrExecutive = usrData && usrData.userRole == 'HR Executive' ? usrData : {};
    let pUa = onSmngrData && onSmngrData._id ? [onSmngrData] : allUsrs.filter(item => item?.pTeamIDs?.includes(team) && onSleadsData?.pReports?.includes(item._id));
    const hrData = hrManager?._id ? hrManager : hrExecutive?._id ? hrExecutive : {};
    onSleadsData?._id && pUa.push(onSleadsData);
    hrData?._id && pUa.push(hrData);
    const reportsD = [];
    const ua = [];
    mentor && mentor?.length && mentor.forEach(item => {
      const onlArr = !onSleadsData?._id ? allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Onsite Lead') : [];
      const ofmArr = allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Offshore Manager');
      const oflArr = allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Offshore Lead');
      pUa = [...new Set([...pUa, ...onlArr, ...ofmArr, ...oflArr, item])];
    });
    recruiter && recruiter?.length && recruiter.forEach(item => {
      const onlArr = !onSleadsData?._id ? allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Onsite Lead') : [];
      const ofmArr = allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Offshore Manager');
      const oflArr = allUsrs.filter(uObj => uObj.pTeamIDs.includes(team) && item.pReports.includes(uObj._id) && uObj.userRole == 'Offshore Lead');
      pUa = [...new Set([...pUa, ...onlArr, ...ofmArr, ...oflArr, item])];
    });
    pUa.forEach(item => {
      ua.push({
        _id: item._id, role: item.userRole, name: item.name, mobCcNum: item.mobCcNum, emID: item.emID, refUID: item.refUID, primary: item.myPrimary, deskCcNum: item?.descCcNum || '', deskNumExtn: item?.descExtnsn || ''
      });
      reportsD.push(item._id);
    });
    const pReports = [...new Set([...reportsD, ...invtaView.pReports])];
    const teamData = teamsList.find(item => item._id == team);
    const jt = jobTitle && jobTitle.label ? jobTitle.label : '';
    const mrkt = (email || mobNum || jt || visaStatus || currentClient || previousClient || linkedIn || expMonths.value > 0 || expYrs.value > 0) ? true : false
    const reqBody = {
      status: 'Approved',
      notes,
      pReports,
      invpReports: pReports,
      team: teamData._id,
      tName: teamData.tName,
      tCode: teamData.tCode,
      mEmail: email,
      mMobCc: mobNum ? mobCc : '', 
      mMobNum: mobNum, 
      mJobTitle: jt, 
      mVisaStatus: visaStatus, 
      mCurrClient: currentClient, 
      mPrevClient: previousClient, 
      mWrkUrls: linkedIn ? [linkedIn] : [],
      mTexp: expMonths.value + (expYrs.value  * 12),
      mrkt, ua, workStatus
    };
    this.props.putB2BInvitationsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ succMsg: 'Status Approved Successfully', errMsg: '' });
        setTimeout(() => {
          this.setState({ statusModal: false, isprvBtn: false, isrejBtn: false, isReopenBtn: false, disable: false, 
            email: '', mobCc: '+1',mobNum: '', jobTitle: null, visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 }, expMonths: { label: 0, value: 0 },  workStatus: 'Approved'
          });
        }, 1000)
      } else {
        this.setState({ errMsg: 'Status Approve Failed', succMsg: '', disable: false });
      }
    });
  };
  handleStatusReject = () => {
    const {invtaView} = this.state;
    const recordId = invtaView._id;
    const reqBody = {status: 'Rejected'};
    this.setState({disable: true});
    this.props.putB2BInvitationsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({rejectModal: false, isrejBtn: false, isprvBtn: false, isReopenBtn: false, disable: false});
      } else {
        this.setState({errMsg: 'Status Reject Failed', disable: false});
      }
    });
  }
  handleStatusReopen = () => {
    const {invtaView} = this.state;
    const recordId = invtaView._id;
    const reqBody = {status: 'Reopen'};
    this.setState({disable: true});
    this.props.putB2BInvitationsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({reOpenModal: false, isReopenBtn: false, isrejBtn: false, isprvBtn: false, disable: false});
      } else {
        this.setState({errMsg: 'Status Reopen Failed', disable: false});
      }
    });
  }
  handleOpenModels = (value) => {
    if (value == 'notes') this.setState({showNotes: true});
    else if (value == 'meetings') this.setState({showMeetings: true});
    else this.setState({showReview: true});
  }

  handleShowSsn = () => this.setState({showSsn: !this.state.showSsn});
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
    const {rolesObj} = this.state;
    const isMeeting = rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[21]?.isAlwd;
    return (
      <>
        <InvitationViewComponent state={this.state} setStateData={this.setStateData} approveClick={this.approveClick} handleOpenModels={this.handleOpenModels} cnsFlag={this.props.cnsFlag ? this.props.cnsFlag: false} handleShowSsn={this.handleShowSsn} />
        {(this.state.statusModal || this.state.rejectModal || this.state.reOpenModal) && <InvitationPopupsComponent setStateData={this.setStateData} state={this.state} handleStatusApprove={this.handleStatusApprove} handleStatusReject={this.handleStatusReject} handleStatusReopen={this.handleStatusReopen} handleChangeTeam={this.handleChangeTeam} handleMentorChange={this.handleMentorChange} handleCreateSkill={this.handleCreateSkill} handleRecruiterChange={this.handleRecruiterChange}/>}
        <InviteNotesList showNotes={this.state.showNotes} inviteData={this.state.invtaView} handleNotes={this.setStateData} />
        <InviteMeetingsList showMeetings={this.state.showMeetings} userData={this.state.userData} inviteData={this.state.invtaView} handleMeetings={this.setStateData} iType='Invitation' isMeeting={isMeeting} />
        <InviteReviewersList showReview={this.state.showReview} inviteData={this.state.invtaView} handleReviewers={this.setStateData} />
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BInvitationView: (recordId, callback) => dispatch(getB2BInvitationView(recordId, callback)),
  putB2BInvitationsStatusUpdate: (recordId, body, callback) => dispatch(putB2BInvitationsStatusUpdate(recordId, body, callback)),
  GetB2BUserView: (id, callback) => dispatch(GetB2BUserView(id, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(InvitationViewClass);
