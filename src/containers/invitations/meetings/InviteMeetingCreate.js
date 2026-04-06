/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {postB2BConsInviteMeetingsCreate} from '../../../actions/invitations/MeetingsActions';
import {postB2BSubMeetingsCreate} from '../../../actions/submissions/SubmissionActions';
import {InviteMeetingsFormComponent} from '../../../components/invitations/meetings';
import { getTodayDate } from '../../../hooks/common';

class InviteMeetingCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inviteData: props.inviteData, usrsList: props.usrsList, userData: props.userData, rolesObj: props.rolesObj,
      date: '', time: '', mTz: 'EST', attendeesObj: [], isChecked: false, msub: '', mType: '', mpCc: '+1', mpNum: '', mpExt: '', mLink: '', mOffc: '', mDesc: '', 
      errMsg: '', disable: false, mTypes: ['Telephone', 'Video Call', 'Face to Face'],
      branchId: '', mobAdrs : '', brnchList: props.brnchList,
      mLinkList: props.mLinkList, telmLink: '', telmLinkId: '', mLinkId: '',
    };
  }
  setStateData = (data) => this.setState({ ...data });

  handleBackToList = () => this.props.handleBackToList({create: false});

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
      const attendee = uData?.name && {label: uData.name  + ' ' + '(' + uData.refUID.split(':')[1] + ')', value: uData._id, ...uData};
      uData?.name && attendeesObj.push(attendee);
      this.setState({ isChecked, attendeesObj, errMsg: '' });
    } else {
      const uData = attendeesObj.filter(item => item.refUID !== userData.refUID);
      this.setState({ isChecked, attendeesObj: uData, errMsg: '' });
    }
  }

  // meeting create
  handleMeetingData = (event) => {
    event.preventDefault();
    const { inviteData, date, time, mTz, attendeesObj, msub, mType, mTypes, mpCc, mpNum, mpExt, mLink, mOffc, mobAdrs, mDesc, telmLink } = this.state;
    if(!date) {
      this.setState({ errMsg: 'Date is required'});
    } else if (date < getTodayDate()) { 
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
      this.setState({ disable: true });
      const userId = inviteData.refUID ? inviteData.refUID.split(':') : '';
      const mbrIds = [], mbrNames = [], members = [];
      attendeesObj.forEach(atnd => {
        mbrIds.push(atnd.value);
        mbrNames.push(atnd.name);
        members.push({_id: atnd._id, name: atnd.name, refUID: atnd.refUID, emID: atnd.emID });
      });
      const tObj = this.props.type ? {type: this.props.type} : {};
      const itObj = this.props.iType ? {type: this.props.iType} : {};
      const reqBody = {
        invite: inviteData._id,
        userId: userId ? userId.length > 1 ? userId[1] : userId[0] : '',
        email: inviteData.emID,
        scName: inviteData.name,
        scMob: inviteData.mobCcNum,
        mType, msub,
        mpCc: mpNum ? mpCc : '',
        mpNum, mpExt, mLink: mLink ? mLink : telmLink,
        // mobId: inviteData.obId,
        // mobName: inviteData.obName,
        // mobCode: inviteData.obCode,
        mobAdrs, mbrIds, mbrNames, members,
        msTm: moment(date).format('YYYY-MM-DD') + ' ' + time,
        mTz, mDesc,
        ...tObj,
        ...itObj
      };
      if (this.props.type) {
        this.props.postB2BSubMeetingsCreate(reqBody, (resObj) => {
          if(resObj.status == '200') {
            this.handleBackToList();
          } else{
            this.setState({ errMsg: 'Meeting Create Failed', disable: false })
          }
        });
      } else {
        this.props.postB2BConsInviteMeetingsCreate(reqBody, (resObj) => {
          if(resObj.status == '200') {
            this.handleBackToList();
          } else{
            this.setState({ errMsg: 'Meeting Create Failed', disable: false })
          }
        });
      }    
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
  }

  render() {
    return <>
      {/* meetings */}
      <InviteMeetingsFormComponent state={this.state} setStateData={this.setStateData} handleAttendees={this.handleAttendees} handleProfileAttendee={this.handleProfileAttendee} handleBackToList={this.handleBackToList} handleMeetingData={this.handleMeetingData} handleOnChange={this.handleOnChange} handlemLinkChange={this.handlemLinkChange} />
    </>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BConsInviteMeetingsCreate: (body, callback) => dispatch(postB2BConsInviteMeetingsCreate(body, callback)),
  postB2BSubMeetingsCreate: (body, callback) => dispatch(postB2BSubMeetingsCreate(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InviteMeetingCreate);
