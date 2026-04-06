/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import  LeadsLfcListComponent  from '../../components/leads/LeadsLfcListComponent';
import { getB2BLeadLfcHistoryList } from '../../actions/leads/LeadsAction';

class LeadsLfcList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lfcModal: false,
      leadData: {},
      leadLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ lfcModal: false, leadData: {}, disable: false });
    this.props.setStateData({ leadView: {}, leadLfcModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.leadLfcModal !== this.props.leadLfcModal && this.props.leadLfcModal) {
      this.leadLfcListData(this.props.leadData);
    }
  }
  leadLfcListData = (leadData) => {
    const lead = leadData._id;
    this.props.getB2BLeadLfcHistoryList(lead, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ lfcModal: true, leadLfcList: data, leadData });
      } else {
        this.setState({ lfcModal: true, leadLfcList: [], leadData});
      }
    });
  }

  render() {
    return (
        <LeadsLfcListComponent
          state={this.state}
          setStateData={this.setStateData}
          handleClose={this.handleClose}
        />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BLeadLfcHistoryList: (lead, callback) => dispatch(getB2BLeadLfcHistoryList(lead, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(LeadsLfcList);
