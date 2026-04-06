/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { SubmissionfollowupsListComponent } from '../../../components/submissions/submissionFollowups/index';
import { getB2BSubmissionFollowUpsList, postB2BFollowupsNotesCreateAPI, putB2BSubmissionFollowUpsNotesUpdate } from '../../../actions/submissionFollw/SubmissionFollwAction';
import localForage from '../../../hooks/localForage';

class SubmisFwlpsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FwlpsModal: false,
      submitData: {},
      subFollowupsList: [],
      Notes: '',
      fwNotes: '',
      errMsg: '',
      disable: false,
      fwlpsNotesModal: false,
      followupData: {},
      FwlerrMsg: '',
      refId: '',
      rolesObj: {}
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ FwlpsModal: false, submitData: {}, disable: false });
    this.props.setStateData({ submitData: {}, subFwlpModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subFwlpModal !== this.props.subFwlpModal && this.props.subFwlpModal) {
      this.subFollowupsListData(this.props.submitData);
    }
  }
  // Submission Follo list
  subFollowupsListData = async (submitData) => {
    const getData = await localForage.getItem('userInfo');
    const logUsrData = getData ? getData.value : {};
    const rolesObj = logUsrData?.rolesObj || {};
    const appAcc = (logUsrData?.userType == 'App' || logUsrData?.userType == 'Tech' || (logUsrData?.userType == 'Management' && logUsrData?.userRole == 'Super Admin'));
    const subId = submitData._id;
    this.props.getB2BSubmissionFollowUpsList(subId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ FwlpsModal: true, subFollowupsList: data, submitData, Notes: '', errMsg: '', disable: false, refId: logUsrData.refUID, rolesObj: {...rolesObj, appAcc} });
      } else {
        this.setState({ FwlpsModal: true, subFollowupsList: [], submitData, Notes: '', errMsg: '', disable: false, refId: '', rolesObj: {...rolesObj, appAcc} });
      }
    });
  }

  subFollowupsCreate = () => {
    const { Notes, submitData } = this.state;
    if (!Notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({disable: true});
      const reqBody = {
        notes: Notes, submission: submitData._id, subId: submitData.subId, euUser: submitData.euUser,
        euName: submitData.euName, euIntrw: submitData.euIntrw
      };
      this.props.postB2BFollowupsNotesCreateAPI(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({disable: false});
          this.subFollowupsListData(this.props.submitData);
        } else {
          this.setState({ errMsg: 'Note creation failed', disable: false });
        }
      });
    }
  }

  handleFollowupsEdit = (followupData) => {
    this.setState({ fwlpsNotesModal: true, followupData, fwNotes: followupData.notes, errMsg: '' });
  }

  handleFwlpsNtsUpdate = () => {
    const { followupData, fwNotes } = this.state;
    if (!fwNotes) {
      this.setState({ FwlerrMsg: 'Notes is requried' });
    } else {
      const recordId = followupData._id;
      const reqBody = { notes: fwNotes };
      if (reqBody.notes === followupData.notes) {
        this.setState({ FwlerrMsg: "There are no changes" })
      } else {
        this.props.putB2BSubmissionFollowUpsNotesUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ fwlpsNotesModal: false });
            this.subFollowupsListData(this.props.submitData);
          } else {
            this.setState({ FwlerrMsg: 'Notes updation failed' });
          }
        });
      }
    }
  }

  toggleModal = () => this.setState({ fwlpsNotesModal: false, submitData: {}, fwNotes: '', FwlerrMsg: '' });

  render() {
    return (
      <SubmissionfollowupsListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
        subFollowupsCreate={this.subFollowupsCreate}
        toggleModal={this.toggleModal}
        handleFollowupsEdit={this.handleFollowupsEdit}
        handleFwlpsNtsUpdate={this.handleFwlpsNtsUpdate} />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BSubmissionFollowUpsList: (subId, callback) => dispatch(getB2BSubmissionFollowUpsList(subId, callback)),
  postB2BFollowupsNotesCreateAPI: (reqBody, callback) => dispatch(postB2BFollowupsNotesCreateAPI(reqBody, callback)),
  putB2BSubmissionFollowUpsNotesUpdate: (recordId, reqBody, callback) => dispatch(putB2BSubmissionFollowUpsNotesUpdate(recordId, reqBody, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(SubmisFwlpsList);
