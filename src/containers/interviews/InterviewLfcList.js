/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import  InterviewLfcListComponent  from '../../components/interviews/InterviewLfcListComponent';
import {GetB2BInvLfcList } from '../../actions//interviews/InterviewActions';

class InterviewLfcsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lfcModal: false,
      interData: {},
      intvLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ lfcModal: false, interData: {}, disable: false });
    this.props.setStateData({ interData: {}, invLfcModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.invLfcModal !== this.props.invLfcModal && this.props.invLfcModal) {
      this.intvLfcListData(this.props.interData);
    }
  }
  intvLfcListData = (interData) => {
    const subId = interData._id;
    this.props.GetB2BInvLfcList(subId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ lfcModal: true, intvLfcList: data, interData });
      } else {
        this.setState({ lfcModal: true, intvLfcList: [], interData });
      }
    });
  }

  render() {
    return (
      <InterviewLfcListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BInvLfcList: (subId, callback) => dispatch(GetB2BInvLfcList(subId, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InterviewLfcsList);
