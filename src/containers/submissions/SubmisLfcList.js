/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import  SubmisLfcListComponent  from '../../components/submissions/SubmisLfcListComponent';
import {GetB2BSubLfcHistoryList } from '../../actions/submissions/SubmissionActions';

class SubmisLfcsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lfcModal: false,
      submitData: {},
      subLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ lfcModal: false, submitData: {}, disable: false });
    this.props.setStateData({ submitData: {}, subLfcModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subLfcModal !== this.props.subLfcModal && this.props.subLfcModal) {
      this.subLfcListData(this.props.submitData);
    }
  }
  subLfcListData = (submitData) => {
    const subId = submitData._id;
    this.props.GetB2BSubLfcHistoryList(subId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ lfcModal: true, subLfcList: data, submitData });
      } else {
        this.setState({ lfcModal: true, subLfcList: [], submitData});
      }
    });
  }

  render() {
    return (
      <SubmisLfcListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BSubLfcHistoryList: (subId, callback) => dispatch(GetB2BSubLfcHistoryList(subId, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(SubmisLfcsList);
