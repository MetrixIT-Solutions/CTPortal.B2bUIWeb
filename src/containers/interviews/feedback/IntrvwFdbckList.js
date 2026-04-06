/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import {IntrvwFdbckComponent} from '../../../components/interviews/feedback';
import {postB2BIntrvwFdBkList} from '../../../actions/interviews/InterviewFeedbackActions';

class IntrvwFdbckList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listModal: false,
      action: 'List',
      intrvwData: {},
      intrvwFdbkList: [],
      fdbkData: {}
    };
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidUpdate(prevProps) {
    if (prevProps.showIntrvwFdbk !== this.props.showIntrvwFdbk && this.props.showIntrvwFdbk) {
      this.getIntrvwFdbkListData(this.props.interData);
    }
  }
  getIntrvwFdbkListData = (intrvwData) => {
    const itrvId = intrvwData._id;
    const reqBody = { pgNum: 1 };
    this.props.postB2BIntrvwFdBkList(itrvId, reqBody, (response) => {
      if (response.status == '200') {
        this.setState({ intrvwFdbkList: response.resData.result.fbList, listModal: true, intrvwData, disable: false });
      } else {
        this.setState({ intrvwFdbkList: [], listModal: true, intrvwData, disable: false });
      }
    });
  }
  handleClose = () => {
    this.setState({ listModal: false, action: 'List' });
    this.props.setStateData({ intrvwData: {}, showIntrvwFdbk: false });
  }

  render() {
    return <>
      <IntrvwFdbckComponent state={this.state} setStateData={this.setStateData} handleClose={this.handleClose} getIntrvwFdbkListData={this.getIntrvwFdbkListData}
        handleCreateClose={this.handleCreateClose}
        handleViewClose={this.handleViewClose}
        intrwFdbkUpdate={this.intrwFdbkUpdate}
      />
    </>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BIntrvwFdBkList: (itrvId, body, callback) => dispatch(postB2BIntrvwFdBkList(itrvId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(IntrvwFdbckList);