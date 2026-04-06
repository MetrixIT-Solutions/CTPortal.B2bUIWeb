/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {putB2BConsInviteMeetingReSchedule} from '../../../actions/invitations/MeetingsActions';
import {putB2BSubMeetingReSchedule} from '../../../actions/submissions/SubmissionActions';
import {InviteMeetingsFormComponent} from '../../../components/invitations/meetings';
import { getTodayDate } from '../../../hooks/common';

class InviteMeetingEdit extends PureComponent {
  constructor(props) {
    super(props);
    const inviteData = props.inviteData;
    const {_id, members, msDtTmStr, mTz, msub, mType, mpCc, mpNum, mpExt, mLink, mobAdrs, mDesc, mbrIds, mbrNames} = props.meeting;
    const msDt = moment(msDtTmStr, 'YYYY-MM-DD HH:mm');
    const date = msDt.format('YYYY-MM-DD');
    const time = msDt.format('HH:mm');
    const attendeesObj = members.map(atnd => ({label: atnd.name, value: atnd._id, ...atnd}));
    const isChecked = attendeesObj.some(item => item.refUID === props.userData.refUID);
    const tObj = props.type ? {type: props.type} : {};
    const oldMeting = { invite: inviteData._id, mType, msub, mpCc, mpNum, mpExt, mLink, mobAdrs, mbrIds, mbrNames, members, msTm: msDtTmStr, mTz, mDesc, ...tObj };

    this.state = {
      inviteData, oldMeting, usrsList: props.usrsList, brnchList: props.brnchList, userData: props.userData, meeting: props.meeting,
      recordId: _id, date, time, mTz, attendeesObj, isChecked, msub, mType, mpCc: mpCc || '+1', mpNum, mpExt, mLink: mType == 'Video Call' ? mLink : '', mOffc: '', mobAdrs, mDesc,
      rolesObj: props.rolesObj, errMsg: '', disable: false, mTypes: ['Telephone', 'Video Call', 'Face to Face'], branchId: '',
      mLinkList: props.mLinkList, mLinkId: '', telmLink: mType == 'Telephone' ? mLink : '', telmLinkId: ''
    };
  }
  setStateData = (data) => this.setState({ ...data });
  handleBackToList = () => this.props.handleBackToList({reSchedule: false, meeting: {}});

  handleAttendees = (attendeesObj) => {
    const {userData} = this.state;
    const isChecked = attendeesObj.some(item => item.refUID === userData.refUID);
    this.setState({isChecked, attendeesObj, errMsg: ''});
  }
  handleProfileAttendee = (e) => {
    const { userData, attendeesObj, usrsList } = this.state;
    const isChecked = e.target.checked;
    if(isChecked) {
      const uData = usrsList.find(item => item.refUID === userData.refUID);
      uData.label = uData.name;
      uData.value = uData._id;
      attendeesObj.push(uData);
      this.setState({ isChecked, attendeesObj, errMsg: '' });
    } else {
      const uData = attendeesObj.filter(item => item.refUID !== userData.refUID);
      this.setState({ isChecked, attendeesObj: uData, errMsg: '' });
    }
  }
  // meeting Reschedule
  handleMeetingData = (event) => {
    event.preventDefault();
    const { inviteData, recordId, oldMeting, date, time, mTz, attendeesObj, msub, mType, mTypes, mpCc, mpNum, mpExt, mLink, mOffc, mobAdrs, mDesc, telmLink } = this.state;
    if(!date) {
      this.setState({ errMsg: 'Date is required'});
    } else if(date < getTodayDate()) {
      this.setState({ errMsg: 'Date cannot be past date'});
    } else if(!time) {
      this.setState({ errMsg: 'Time is required'});
    } else if(!mTz) {
      this.setState({ errMsg: 'Time Zone is required'});
    } else if(!attendeesObj.length) {
      this.setState({ errMsg: 'Attendee(s) required'});
    } else if(!msub) {
      this.setState({ errMsg: 'Discuss About is required'});
    } else if(!mType) {
      this.setState({ errMsg: 'Meeting Type is required'});
    } else if(mType === mTypes[0] && !mpNum) {
      this.setState({ errMsg: 'Phone Number is required'});
    } else if(mType === mTypes[1] && !mLink) {
      this.setState({ errMsg: 'Meeting Link is required'});
    } else if(mType === mTypes[2] && !mobAdrs) {
      this.setState({ errMsg: 'Office Address is required'});
    } else if(!mDesc) {
      this.setState({ errMsg: 'Comments is required'});
    } else {
      const mbrIds = [], mbrNames = [], members = [];
      attendeesObj.forEach(atnd => {
        mbrIds.push(atnd.value);
        mbrNames.push(atnd.name);
        members.push({_id: atnd._id, name: atnd.name, refUID: atnd.refUID, emID: atnd.emID});
      });
      const tObj = this.props.type ? {type: this.props.type} : {};
      const itObj = this.props.iType ? {type: this.props.iType} : {};
      const reqBody = {
        invite: inviteData._id,
        mType, msub,
        mpCc: mpNum ? mpCc : '',
        mpNum, mpExt, mLink: mLink ? mLink : telmLink, mobAdrs,
        mbrIds, mbrNames, members,
        msTm: moment(date).format('YYYY-MM-DD') + ' ' + time,
        mTz, mDesc,
        ...tObj,
        ...itObj
      };
      if(JSON.stringify(oldMeting) !== JSON.stringify(reqBody)) {
        this.setState({ disable: true });
        if (this.props.type) {
          this.props.putB2BSubMeetingReSchedule(recordId, reqBody, (resObj) => {
            if(resObj.status == '200') {
              this.handleBackToList();
            } else {
              this.setState({ errMsg: 'Meeting Update Failed', disable: false });
            }
          });
        } else {
          this.props.putB2BConsInviteMeetingReSchedule(recordId, reqBody, (resObj) => {
            if(resObj.status == '200') {
              this.handleBackToList();
            } else {
              this.setState({ errMsg: 'Meeting Update Failed', disable: false });
            }
          });
        }
      } else this.setState({ errMsg: 'There are no changes to submit' });
    }
  }

  handleOnChange = (e) => {
    const { brnchList } = this.state;
    const branchId = e.target.value;
    if(branchId) {
      const brnchObj = brnchList && brnchList.length > 0 && brnchList.find(item => item._id == branchId);
      const mobAdrs = brnchObj.hNum + ', ' + brnchObj.area + ', ' + brnchObj.city + ', ' + brnchObj.state + ', ' + brnchObj.country + ' - ' + brnchObj.zip;
      this.setState({ branchId, mobAdrs });
    } else {
      this.setState({ branchId, mobAdrs: '' });
    }
  }

  handlemLinkChange = (e) => { 
    const { mLinkList, mType } = this.state;
    if (mType == 'Telephone') { 
      const telmLinkObj = mLinkList && mLinkList.length > 0 && mLinkList.find((item) => item._id == e.target.value);
      const telmLink = telmLinkObj.mLink;
      this.setState({ telmLinkId: e.target.value, telmLink, errMsg: '' });
    } else if (mType == 'Video Call') { 
      const mLinkObj = mLinkList && mLinkList.length > 0 && mLinkList.find((item) => item._id == e.target.value);
      const mLink = mLinkObj.mLink;
      this.setState({ mLinkId: e.target.value, mLink, errMsg: '' });
    } else { 
      this.setState({ telmLinkId: '', telmLink: '', mLinkId: '', mLink: '' });
    }
  };

  render() {
    return <>
      {/* meetings */}
      <InviteMeetingsFormComponent state={this.state} setStateData={this.setStateData} handleAttendees={this.handleAttendees} handleProfileAttendee={this.handleProfileAttendee} handleBackToList={this.handleBackToList} handleMeetingData={this.handleMeetingData} handleOnChange={this.handleOnChange} handlemLinkChange={this.handlemLinkChange} />
    </>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  putB2BConsInviteMeetingReSchedule: (recordId, body, callback) => dispatch(putB2BConsInviteMeetingReSchedule(recordId, body, callback)),
  putB2BSubMeetingReSchedule: (recordId, body, callback) => dispatch(putB2BSubMeetingReSchedule(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InviteMeetingEdit);
