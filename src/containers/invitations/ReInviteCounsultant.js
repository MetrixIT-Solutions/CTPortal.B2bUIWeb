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

class ReInviteCounsultant extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inviteModal: false, disable: false, errMsg: '',
      successMsg: '', resendInvtn: true, usrsList: [], userInfo: {}, 
      orgsList: [], rprtsList: [], rprtId: '',
      emID: props, mobCC: '+1', mobNum: '', fName: '', lName: '',
      referredBy: 'Other', otherRefer: '', refUser: '',
      successMsg: '', resendInvtn: false, usrsList: [], userInfo: {}, 
      emID: '',
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

  componentDidUpdate = async (prevProps) => {
    if (prevProps.isReInvite !== this.props.isReInvite) {
      if (this.props.isReInvite) {
        const usrData = await localForage.getItem('userInfo');
        const userInfo = usrData.value || {};
        this.setState({ userInfo, inviteModal: true, disable: false, errMsg: '', successMsg: '', resendInvtn: true, orgId: this.props.inviteData.org,
          emID: this.props.inviteData.emID, mobCC: this.props.inviteData.mobCc, mobNum: this.props.inviteData.mobNum, fName: this.props.inviteData.fName, lName: this.props.inviteData.lName,
          referredBy: this.props.inviteData.refType, otherRefer: this.props.inviteData.refByName, refUser: this.props.inviteData.refByUser});
          userInfo && (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) && this.getOrganisationsList();
        this.postB2BUsersData(userInfo.org);
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
    const reqBody = { orgId };
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const usrsList = resObj.resData.result.map((item) => ({ label: item.name, value: item._id, ...item }));
        const rprtsL = resObj.resData.result.filter(item => (item.userRole == 'Onsite Manager' || item.userRole == 'Onsite Lead'));
        const rprtsData = userInfo?.userType == 'Employee' ? ((userInfo?.userRole == 'Onsite Manager' || userInfo?.userRole == 'Onsite Lead') ? rprtsL : (rprtsL?.length ? rprtsL.filter(item => userInfo?.pReports?.toString()?.includes(item._id)) : rprtsL)) : rprtsL;
        const rprtsList = rprtsData.map((item) => ({ label: item.name, value: item._id, ...item }));
        this.setState({usrsList, rprtsList: rprtsList.length ? rprtsList : [], rprtId: this.props.inviteData.report});
      } else {
        this.setState({usrsList: [], rprtsList: [], rprtId: '' });
      }
    });
  }

  handleInviteClose = () => {
    this.setState({ inviteModal: false, errMsg: ''});
    this.props.setStateData({inviteData: {}, isReInvite: false});
  }
  handleInviteConsultant = () => {
    this.setState({ errMsg: '' });
    const { emID, mobCC, mobNum, fName, lName, referredBy, resendInvtn, refUser, otherRefer, usrsList, rprtsList, rprtId } = this.state;
    const uData = usrsList.length ? usrsList.find(item => item._id == refUser) : {};
    const userD = uData && uData._id ? uData : {};
    const rptData = rprtsList.length ? rprtsList.find(item => item._id == rprtId) : {};
    const rptD = rptData && rptData._id ? rptData : {};
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
      org: this.props.inviteData.org, 
      orgName: this.props.inviteData.orgName, 
      orgCode: this.props.inviteData.orgCode,
      report: this.props.inviteData.report,
      rprtName: this.props.inviteData.rprtName,
      rprtPrimary: this.props.inviteData.rprtPrimary,
      pReports: this.props.inviteData.pReports,
      iFrom: 'Invitations'
    };
    this.props.PostB2BInviteCnsltant(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ successMsg: 'Invitation Sent Successfully', errMsg: '', resendInvtn: true });
        setTimeout(() => {
          this.setState({ inviteModal: false, disable: false, orgId: '', orgsList: [], rprtId: '', rprtsList: [] });
          this.props.setStateData({inviteData: {}, isReInvite: false});
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

  render() {   

    return <InviteConsComponent state={this.state} handleInviteClose={this.handleInviteClose} handleInviteConsultant={this.handleInviteConsultant} handleChangeOrg={this.handleChangeOrg} isdisable={true}/>
  }
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BInviteCnsltant: (body, callback) => dispatch(PostB2BInviteCnsltant(body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BOrgsList: (body, callback) => dispatch(PostB2BOrgsList(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(ReInviteCounsultant);
