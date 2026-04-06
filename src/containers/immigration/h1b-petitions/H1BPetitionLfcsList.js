/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { H1BPetitionsLfcListComponent } from '../../../components/immigration/h1b-petitions';
import { getB2BH1BPtnsLyfCylHstry } from '../../../actions/immigration/H1BPetitionsActions';

class H1BPetitionLfcsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lfcModal: false,
      ptnsData: {},
      ptnsLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ lfcModal: false, ptnsData: {}, disable: false });
    this.props.setStateData({ ptnsData: {}, ptnsLfcModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ptnsLfcModal !== this.props.ptnsLfcModal && this.props.ptnsLfcModal) {
      this.ptnsLfcListData(this.props.ptnsData);
    }
  }
  ptnsLfcListData = (ptnsData) => {
    const recordId = ptnsData._id;
    this.props.getB2BH1BPtnsLyfCylHstry(recordId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ lfcModal: true, ptnsLfcList: data, ptnsData });
      } else {
        this.setState({ lfcModal: true, ptnsLfcList: [], ptnsData});
      }
    });
  }

  render() {
    return (
      <H1BPetitionsLfcListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BH1BPtnsLyfCylHstry: (recordId, callback) => dispatch(getB2BH1BPtnsLyfCylHstry(recordId, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(H1BPetitionLfcsList);
