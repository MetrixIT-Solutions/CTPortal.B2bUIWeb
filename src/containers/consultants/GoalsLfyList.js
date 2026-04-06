/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import  GoalsLfcListComponent  from '../../components/leads/GoalsLfcListComponent';
import { getB2BGoalsLfcHistoryList } from '../../actions/leads/LeadsAction';

class GoalsLfyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gfLfcModal: false,
      goalView: {},
      goalsLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });
  handleClose = () => {
    this.setState({ gfLfcModal: false, goalView: {}, disable: false });
    this.props.setStateData({ goalData: {}, lifeCycleModal: false });
  }

  componentDidMount() {
    // if (prevProps.lifeCycleModal !== this.props.lifeCycleModal && this.props.lifeCycleModal) {
      this.goalsLfcListData(this.props.goalView);
    // }
  }
  goalsLfcListData = (goalView) => {    
    const recordId = goalView._id;
    this.props.getB2BGoalsLfcHistoryList(recordId, (resObj) => {        
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ gfLfcModal: true, goalsLfcList: data, goalView });
      } else {
        this.setState({ gfLfcModal: true, goalsLfcList: [], goalView});
      }
    });
  }

  render() {
    return (
      <GoalsLfcListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BGoalsLfcHistoryList: (recordId, callback) => dispatch(getB2BGoalsLfcHistoryList(recordId, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(GoalsLfyList);
