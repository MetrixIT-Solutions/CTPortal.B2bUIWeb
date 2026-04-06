/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { InterviewFollListComponent } from '../../../components/interviews/interviewFollups/index';
import { getB2BInterviewFollowUpsList, postB2BInterviewFollowupsCreate, putB2BInterviewFollowUpsNotesUpdate } from '../../../actions/interviewFoll/InterviewFollupsAction'
import localForage from '../../../hooks/localForage';

class InterviewFollList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FwlpsModal: false,
      interFollowupsList: [],
      errMsg: '',
      Notes: '',
      intrwData: {},
      fwlpsNotesModal: false,
      fwNotes: '',
      FwlerrMsg: '',
      followupData: {},
      refId: '',
      rolesObj: {},
      disable: false,
    }
  }
  setStateData = (data) => this.setState({ ...data });

  componentDidUpdate(prevProps) {
    if (prevProps.interFwlpModal !== this.props.interFwlpModal && this.props.interFwlpModal) {
      this.intrwFollowupListData(this.props.interData);
    }
  }

  handleClose = () => {
    this.setState({ FwlpsModal: false, disable: false, });
    this.props.setStateData({ interFwlpModal: false });
  }
  intrwFollowupListData = async (interData) => {
    const getData = await localForage.getItem('userInfo');
    const logUsrData = getData ? getData.value : {};
    const rolesObj = logUsrData?.rolesObj || {};
    const appAcc = (logUsrData?.userType == 'App' || logUsrData?.userType == 'Tech' || (logUsrData?.userType == 'Management' && logUsrData?.userRole == 'Super Admin'));
    const intrvwId = interData._id;
    this.setState({ rolesObj: { ...rolesObj, appAcc } })
    this.props.getB2BInterviewFollowUpsList(intrvwId, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ FwlpsModal: true, fwlpsNotesModal: false, interFollowupsList: resObj.resData.result, errMsg: '', intrwData: interData, disable: false, Notes: '', refId: logUsrData.refUID });
      } else {
        this.setState({ FwlpsModal: true, fwlpsNotesModal: false, interFollowupsList: [], errMsg: '', intrwData: interData, disable: false, refId: '' });
      }
    })
  }
  interFollowupsCreate = () => {
    const intrwData = this.props.interData;
    const { Notes } = this.state;
    if (!Notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({disable: true});
      const reqBody = {
        notes: Notes,
        intrw: intrwData._id,
        intrwId: intrwData.intrwId,
        euUser: intrwData.euUser,
        euName: intrwData.euName,
        submission: intrwData.submission,
        subId: intrwData.subId
      }
      this.props.postB2BInterviewFollowupsCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({disable: false});
          this.intrwFollowupListData(intrwData);
        } else {
          this.setState({ errMsg: 'note creation failed', disable: false });
        }
      }
      );
    }
  }
  handleFollowupsEdit = (followupData) => {
    this.setState({ fwlpsNotesModal: true, followupData, fwNotes: followupData.notes, errMsg: '' });
  }
  handleFwlpsNtsUpdate = () => {
    const { followupData, fwNotes } = this.state;
    if (!fwNotes) {
      this.setState({ FwlerrMsg: 'notes is requried' });
    } else {
      const recordId = followupData._id;
      const reqBody = { notes: fwNotes };
      if (reqBody.notes === followupData.notes) {
        this.setState({ FwlerrMsg: "There are no Changes"})
      } else {
        this.props.putB2BInterviewFollowUpsNotesUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ fwlpsNotesModal: false });
            this.intrwFollowupListData(this.props.interData);
          } else {
            this.setState({ FwlerrMsg: 'notes updations failed' });
          }
        });
      }
    }
  }
  toggleModal = () => this.setState({ fwlpsNotesModal: false, intrwData: {}, fwNotes: '', FwlerrMsg: '' });

  render() {
    return (
      <InterviewFollListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
        interFollowupsCreate={this.interFollowupsCreate}
        handleFollowupsEdit={this.handleFollowupsEdit}
        handleFwlpsNtsUpdate={this.handleFwlpsNtsUpdate}
        toggleModal={this.toggleModal}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BInterviewFollowUpsList: (intrvwId, callback) => dispatch(getB2BInterviewFollowUpsList(intrvwId, callback)),
  postB2BInterviewFollowupsCreate: (reqBody, callback) => dispatch(postB2BInterviewFollowupsCreate(reqBody, callback)),
  putB2BInterviewFollowUpsNotesUpdate: (recordId, reqBody, callback) => dispatch(putB2BInterviewFollowUpsNotesUpdate(recordId, reqBody, callback))
})

export default connect(mapStateToProps, mapDistachToProps)(InterviewFollList);
