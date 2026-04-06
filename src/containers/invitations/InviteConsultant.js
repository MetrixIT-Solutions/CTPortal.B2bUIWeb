/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {InviteConsComponent} from '../../components/invitations';
import {PostB2BInviteCnsltant} from '../../actions/invitations/InvitationActions';
import {postB2bUsersTotalList} from '../../actions/users/UsersActions';
import { PostB2BOrgsList } from '../../actions/organizations/OrgActions';
import localForage from '../../hooks/localForage';

class InviteConsultant extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inviteModal: false, disable: false, errMsg: '',
      emID: '', mobCC: '+1', mobNum: '', fName: '', lName: '',
      referredBy: 'Other', otherRefer: '', refUser: '',
      successMsg: '', resendInvtn: false, usrsList: [], userInfo: {}, 
      orgsList: [], rprtsList: [], rprtId: '', rptD: {}, usrsTotalList: []
    };
  }
  
  getOrganisationsList = () => {
    const reqBody = { pgNum: 1, limit: 100, searchStr: ''};
    this.props.PostB2BOrgsList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({  orgsList: resObj.resData.result.orgsList});
      } else this.setState({ orgsList: [] });
    });
  }

  setStateData = (data) => this.setState({ ...data });
  componentDidUpdate = async (prevProps) => {
    if (prevProps.showInvite !== this.props.showInvite) {
      if (this.props.showInvite) {
        const usrData = await localForage.getItem('userInfo');
        const userInfo = usrData.value || {};
        this.setState({ userInfo, inviteModal: true, disable: false, errMsg: '', successMsg: '', resendInvtn: false, emID: '', mobCC: '+1', mobNum: '', fName: '', lName: '', referredBy: 'Other', otherRefer: '', refUser: '' });
        userInfo && (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) && this.getOrganisationsList();
        userInfo && (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) ? '' : this.postB2BUsersData(userInfo.org);
      }
    }
  }

  handleChangeOrg = (e) => {
    this.setState({orgId: e.target.value, errMsg: '', rprtId: '', rprtsList: [], resendInvtn: false});
    this.postB2BUsersData(e.target.value);
  }

  postB2BUsersData = async(orgId) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value || {};
    const teamsInUsr = userInfo?.userType == 'Employee' && userInfo.teams && userInfo.teams.length ? userInfo.teams.map(team => team._id) : [];
    const reqBody = { orgId, teams: teamsInUsr?.length ? teamsInUsr : [] };
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const usrsList = resObj.resData.result.map((item) => ({ label: item.name, value: item._id, ...item }));
        const rprtsL = resObj.resData.result.filter(item => (item.userRole == 'Onsite Manager' || item.userRole == 'Onsite Lead' || item.userRole == 'HR Manager'));
        const rprtsData = userInfo?.userType == 'Employee' ? ((userInfo?.userRole == 'Onsite Manager' || userInfo?.userRole == 'Onsite Lead' || userInfo?.userRole == 'HR Manager' || userInfo?.userRole == 'HR Executive') ? rprtsL : (rprtsL?.length ? rprtsL.filter(item => userInfo?.pReports?.toString()?.includes(item._id)) : rprtsL)) : rprtsL;
        const rprtsList = rprtsData.map((item) => ({ label: item.name, value: item._id, ...item }));
        const rprtData = userInfo?.userType === 'Employee' && (userInfo?.userRole == 'Onsite Manager' || userInfo?.userRole == 'Onsite Lead' || userInfo?.userRole == 'HR Manager' || userInfo?.userRole == 'HR Executive') ? rprtsList.find(item => item.refUID == userInfo.refUID) : {};
        this.setState({usrsList, rprtsList: rprtsList.length ? rprtsList : [], rprtId: rprtData?._id ? rprtData._id : '', usrsTotalList: usrsList, rptD: rprtData});
      } else {
        this.setState({usrsList: [], rprtsList: [], rprtId: '', usrsTotalList: [] });
      }
    });
  }

  handleInviteClose = () => {
    this.setState({ inviteModal: false, errMsg: '', orgId: '', orgsList: [], rprtId: '', rptD: {}, rprtsList: [] });
    this.props.handleInviteCons(false, false);
  }

  handleChangeReporter = (e) => {
    const {rprtsList, userInfo, usrsList, usrsTotalList} = this.state;
    const rprtId = e.target.value;
    const rptData = rprtsList.length ? rprtsList.find(item => item._id == rprtId) : {};
    const rptD = rptData && rptData._id ? rptData : {};
    const rprtsTeams = rptD?._id ? rptD.teams.map(team => team._id) : [];
    const usrsData = userInfo?.userType != 'Employee' ? usrsTotalList.filter(item => item.teams.some(team => rprtsTeams.includes(team._id))) : usrsList;
    this.setState({ rprtId, errMsg: '', resendInvtn: false, rptD, usrsList: usrsData })
  }

  handleInviteConsultant = () => {
    this.setState({ errMsg: '' });
    const { emID, mobCC, mobNum, fName, lName, referredBy, resendInvtn, refUser, otherRefer, usrsList, orgsList, orgId, userInfo, rptD, rprtId } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const phRegex = /^\d{10}$/;
    if (((userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) && !orgId)) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (!rprtId) {
      this.setState({ errMsg: 'Reviewer is required' });
    } else if (!fName) {
      this.setState({ errMsg: 'First Name is required' });
    } else if (!lName) {
      this.setState({ errMsg: 'Last Name is required' });
    } else if (!emID) {
      this.setState({ errMsg: 'Email is required' });
    } else if (emID && !emailValid.test(emID)) {
      this.setState({ errMsg: 'Invalid Email' });
    } else if (!mobNum) {
      this.setState({ errMsg: 'Mobile Number is required' });
    } else if (mobNum && !phRegex.test(mobNum)) {
      this.setState({ errMsg: 'Invalid Mobile number' });
    } else if (referredBy == 'Internal' && !refUser) {
      this.setState({ errMsg: 'Referred By is required.' });
    } else if (referredBy == 'Other' && !otherRefer) {
      this.setState({ errMsg: 'Referred By Name is required.' });
    } else {
      const uData = usrsList.length ? usrsList.find(item => item._id == refUser) : {};
      const userD = uData && uData._id ? uData : {};
      const orgs = orgsList.length ? orgsList.find(item => item._id == orgId) : {};
      const orgData = orgs && orgs._id ? orgs : {};
      this.setState({ disable: true });
      const reqBody = {
        emID,
        mobNum,
        mobCc: mobNum ? mobCC : '',
        mobCcNum: mobNum ? mobCC + ' ' + mobNum : '',
        name: (fName && lName) ? fName + ' ' + lName : (fName ? fName : lName),
        fName,
        lName,
        refByName: referredBy == 'Internal' ? userD.name: otherRefer,
        refType: referredBy,
        resendInvtn,
        refByUser : referredBy == 'Internal' ? refUser : '',
        refByUID : referredBy == 'Internal' ? userD.refUID : '',
        org: orgData && orgData._id ? orgData._id : '', 
        orgName: orgData && orgData._id ? orgData.orgName : '', 
        orgCode: orgData && orgData._id ? orgData.orgCode : '',
        report: rptD._id ? rptD._id : '',
        rprtName: rptD._id ? rptD.fName + ' ' +  rptD.lName: '',
        rprtPrimary: rptD._id ? rptD.myPrimary : '',
        pReports:  rptD.pReports && rptD.pReports.length ? [...rptD.pReports, rptD._id] : [rptD._id],
        iFrom: 'Invitations'
      };
      this.props.PostB2BInviteCnsltant(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ successMsg: 'Invitation Sent Successfully', errMsg: '', resendInvtn: false });
          setTimeout(() => {
            this.setState({ inviteModal: false, disable: false, orgId: '', orgsList: [], rprtId: '', rprtsList: [], rptD: {} });
            this.props.handleInviteCons(false, true);
          }, 2000);
        } else if (resObj.status == '105') {
          const msgD = resObj.resData.message;
          if(msgD?.status == 'Approved'){
            this.setState({ errMsg: 'Provided email already Approved, Invite a different candidate.', disable: false, successMsg: '', resendInvtn: false});
          } else if(rptD?._id != msgD?.report){
            this.setState({ errMsg: `This candidate has a Reviewer '${msgD.rprtName}', still you want to Re-Invite?`, disable: false, successMsg: '', resendInvtn: true});
          }  else {
            this.setState({ errMsg: msgD ? msgD.msg : '', disable: false, successMsg: '', resendInvtn: true});
          }
        } else {
          this.setState({ errMsg: 'Invitation Sent Failed', disable: false, successMsg: '', resendInvtn: false});
        }
      });
    }
  }

  render() {
    return <InviteConsComponent state={this.state} setStateData={this.setStateData} handleInviteClose={this.handleInviteClose} handleInviteConsultant={this.handleInviteConsultant} handleChangeOrg={this.handleChangeOrg} isdisable={false} handleChangeReporter={this.handleChangeReporter}/>
  }
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BInviteCnsltant: (body, callback) => dispatch(PostB2BInviteCnsltant(body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BOrgsList: (body, callback) => dispatch(PostB2BOrgsList(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(InviteConsultant);
