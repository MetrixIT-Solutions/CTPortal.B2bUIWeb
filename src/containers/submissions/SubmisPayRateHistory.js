/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import  SubmisPayRateHistoryComponent  from '../../components/submissions/SubmisPayRateHistoryComponent';
import {PostB2BSubmissionPayRateHistory } from '../../actions/submissions/SubmissionActions';

class SubmisLfcsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ispaylc: false,
      submitData: {},
      payRateList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ ispaylc: false, submitData: {}, disable: false });
    this.props.setStateData({ submitData: {}, subPrModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subPrModal !== this.props.subPrModal && this.props.subPrModal) {
      this.payRateListData(this.props.submitData);
    }
  }
  payRateListData = (submitData) => {
    const reqBody = {submission: submitData._id, euUser: submitData.euUser};
    this.props.PostB2BSubmissionPayRateHistory(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ ispaylc: true, payRateList: data, submitData });
      } else {
        this.setState({ ispaylc: true, payRateList: [], submitData});
      }
    });
  }

  render() {
    return (
      <SubmisPayRateHistoryComponent
        state={this.state}
        setStateData={this.props.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BSubmissionPayRateHistory: (body, callback) => dispatch(PostB2BSubmissionPayRateHistory(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(SubmisLfcsList);
