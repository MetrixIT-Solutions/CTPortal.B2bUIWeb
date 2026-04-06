/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Button} from 'react-bootstrap';

import {postB2BConsInviteMeetingsList, putB2BConsInviteMeetingStsUpdt} from '../../../actions/invitations/MeetingsActions';
import {postB2BSubMeetingsList, putB2BSubMeetingStsUpdt} from '../../../actions/submissions/SubmissionActions';
import {InviteMeetingsListComponent} from '../../../components/invitations/meetings';
import {postB2bUsersTotalList} from '../../../actions/users/UsersActions';
import { PostB2BBranchesList } from '../../../actions/branches/BranchActions';
import { getB2BMeetingLinkList } from '../../../actions/meetingLink/meetingLinkActions';
import InviteMeetingCreate from './InviteMeetingCreate';
import InviteMeetingEdit from './InviteMeetingEdit';
import localForage from '../../../hooks/localForage';


class InviteMeetingsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      meetingsModal: false, pgNum: 1, create: false, inviteData: {}, meetingsList: [], usrsList: [], brnchList: [], userData: this.props.userData,
      reSchedule: false, stsUpdt: false, mStatus: '', mNotes: '', meeting: {}, actTab: '0', tabsArr: ['Scheduled', 'Completed', 'Cancelled'],
      errMsg: '', disabled: false, loading: true, rolesObj: {}, mLinkList: []
    };
  }
  setStateData = (data) => this.setState({ ...data });
  handleClose = () => {
    this.setState({meetingsModal: false, pgNum: 1, create: false, reSchedule: false, inviteData: {}, meetingsList: []});
    this.props.handleMeetings({inviteData: {}, showMeetings: false});
  }
  componentDidUpdate (prevProps) {
    if(prevProps.showMeetings !== this.props.showMeetings && this.props.showMeetings) {
      this.getInviteMeetingsList(1, this.props.inviteData, this.props.userData, this.state.actTab);
      this.postB2BUsersData(this.props.inviteData);
      this.getBranchesList(this.props.inviteData);
      this.getmLinkList(this.props.inviteData);
    }
  }
  getInviteMeetingsList = async (pgNum, inviteData, userData, actTab) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.setState({loading: true, meetingsModal: true, rolesObj: {...rolesObj, appAcc}});
    const invId = inviteData._id;
    const tObj = this.props.type ? {type: this.props.type} : {};
    const itObj = this.props.iType ? {type: this.props.iType} : {};
    const reqBody = {pgNum, status: this.state.tabsArr[actTab], ...tObj, ...itObj};
    if (this.props.type) {
      this.props.postB2BSubMeetingsList(invId, reqBody, (resObj) => {
        if(resObj.status == '200') {
          this.setState({pgNum, create: false, inviteData, meetingsList: resObj.resData.result.mtLIst, userData, actTab, stsUpdt: false, errMsg: '', disabled: false, mStatus: '', mNotes: '', meeting: {}, loading: false});
        } else {
          this.setState({pgNum, create: false, inviteData, meetingsList: [], userData, actTab, stsUpdt: false, errMsg: '', disabled: false, mStatus: '', mNotes: '', meeting: {}, loading: false});
        }
      });
    } else {
      this.props.postB2BConsInviteMeetingsList(invId, reqBody, (resObj) => {
        if(resObj.status == '200') {
          this.setState({pgNum, create: false, inviteData, meetingsList: resObj.resData.result.mtLIst, userData, actTab, stsUpdt: false, errMsg: '', disabled: false, mStatus: '', mNotes: '', meeting: {}, loading: false});
        } else {
          this.setState({pgNum, create: false, inviteData, meetingsList: [], userData, actTab, stsUpdt: false, errMsg: '', disabled: false, mStatus: '', mNotes: '', meeting: {}, loading: false});
        }
      });
    }
  }
  postB2BUsersData = (inviteData) => {
    const reqBody = { orgId: inviteData.org };
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const usrsList = resObj?.resData?.result?.length ? resObj.resData.result.map((item) => ({ label: item.name + ' ' + '(' + item.refUID.split(':')[1] + ')', value: item._id, ...item })) : [];
        this.setState({ usrsList });
      } else this.setState({ usrsList: [] });
    });
  }
  getBranchesList = (inviteData) => {
    const reqBody = { pgNum: 1, limit: 50, searchStr: ''};
    this.props.PostB2BBranchesList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ brnchList: resObj.resData.result.orgBranchesList });
      } else {
        this.setState({ brnchList: [] });
      }
    });
  }
  getmLinkList = () => { 
    this.props.getB2BMeetingLinkList((resObj) => { 
      if (resObj.status === '200') { 
        this.setState({ mLinkList: resObj.resData.result.usrsMetLinkList });
      } else { 
        this.setState({ mLinkList: [] });
      }
    });
  }

  handleSelectTab = (actTab) => {
    const {inviteData, userData} = this.state;
    this.getInviteMeetingsList(1, inviteData, userData, actTab);
  }

  handleBackToList = (data) => {
    this.setState({ ...data, actTab: '0' });
    const {inviteData, userData} = this.state;
    this.getInviteMeetingsList(1, inviteData, userData, '0');
  }
  handleCreate = () => this.setState({create: true});
  handleReSchedule = (meeting) => this.setState({reSchedule: true, meeting});
  handleStatusUpdt = (meeting, mStatus) => this.setState({stsUpdt: true, mStatus, meeting});
  submitStatusUpdate = (event) => {
    event.preventDefault();
    const {mStatus, mNotes, meeting} = this.state;
    const recordId = meeting._id;
    const tObj = this.props.type ? {type: this.props.type} : {};
    const itObj = this.props.iType ? {type: this.props.iType} : {};
    const body = {mStatus, mNotes, ...tObj, ...itObj};
    if(!mNotes) {
      this.setState({errMsg: 'Meeting status notes required.', disabled: false});
    } else {
      this.setState({disabled: true});
      if (this.props.type) {
        this.props.putB2BSubMeetingStsUpdt(recordId, body, resObj => {
          if (resObj.status == '200') {
            const {inviteData, userData} = this.state;
            this.getInviteMeetingsList(1, inviteData, userData, '0');
          } else {
            this.setState({errMsg: 'Meeting status update failed, please try again.', disabled: false});
          }
        });
      } else {
        this.props.putB2BConsInviteMeetingStsUpdt(recordId, body, resObj => {
          if (resObj.status == '200') {
            const {inviteData, userData} = this.state;
            this.getInviteMeetingsList(1, inviteData, userData, '0');
          } else {
            this.setState({errMsg: 'Meeting status update failed, please try again.', disabled: false});
          }
        });
      }
    }
  }

  render() {
    const {meetingsModal, meetingsList, inviteData, create, reSchedule, usrsList, brnchList, userData, rolesObj, meeting, mLinkList } = this.state;
    const isAction = this.props.isMeeting;
    return <>
      {/* meetings */}
      <Offcanvas show={meetingsModal} onHide={this.handleClose} className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Meetings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='row'>
            <div className='col-md-10'>
              {/* <strong className='mb-2'>Candidate Info: </strong> {inviteData.name} | {inviteData.emID} | {inviteData.mobCcNum} */}
              <div className="alert alert-info alert-dismissible">
                <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
                <p className='mb-0'>
                  <span className="me-3"><i className="fas fa-user"></i> {inviteData.name} </span>
                  <span className="me-3"><i className="fas fa-envelope"></i> {inviteData.emID} </span>
                  <span className="me-3"><i className="fas fa-phone"></i> {inviteData.mobCcNum} </span>
                </p>
              </div>
            </div>
            {isAction && !reSchedule && !create && <div className='col-md-2'>
              <Button variant='success' onClick={this.handleCreate}><i className='fa fa-plus'></i> Setup Meeting</Button>
            </div>}
          </div>
          <hr />
          {(!reSchedule && !create) && <InviteMeetingsListComponent meetingsList={meetingsList} state={this.state} handleSelectTab={this.handleSelectTab} handleReSchedule={this.handleReSchedule} setStateData={this.setStateData} handleStatusUpdt={this.handleStatusUpdt} submitStatusUpdate={this.submitStatusUpdate} loading={this.state.loading} isAction={isAction} />}
          {create && <InviteMeetingCreate rolesObj={rolesObj} handleBackToList={this.handleBackToList} inviteData={inviteData} usrsList={usrsList} userData={userData} brnchList={brnchList} type={this.props.type} mLinkList={mLinkList} iType={this.props.iType} />}
          {reSchedule && <InviteMeetingEdit rolesObj={rolesObj} handleBackToList={this.handleBackToList} inviteData={inviteData} usrsList={usrsList} userData={userData} brnchList={brnchList} meeting={meeting} type={this.props.type} mLinkList={mLinkList} iType={this.props.iType} />}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BConsInviteMeetingsList: (invId, body, callback) => dispatch(postB2BConsInviteMeetingsList(invId, body, callback)),
  putB2BConsInviteMeetingStsUpdt: (recordId, body, callback) => dispatch(putB2BConsInviteMeetingStsUpdt(recordId, body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  PostB2BBranchesList: (body, callback) => dispatch(PostB2BBranchesList(body, callback)),
  postB2BSubMeetingsList: (invId, body, callback) => dispatch(postB2BSubMeetingsList(invId, body, callback)),
  putB2BSubMeetingStsUpdt: (recordId, body, callback) => dispatch(putB2BSubMeetingStsUpdt(recordId, body, callback)),
  getB2BMeetingLinkList: (callback) => dispatch(getB2BMeetingLinkList(callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InviteMeetingsList);
