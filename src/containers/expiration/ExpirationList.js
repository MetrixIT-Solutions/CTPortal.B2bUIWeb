/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ExpirationListComponent} from '../../components/expiration';
import {putB2BExpirationUpdate, putB2BExpirationVrfctnUpdate} from '../../actions/expiration/ExpirationAction';


class ExpirationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actvTab: '',
      exprActList: [],
      userData: {},
      rolesObj: {}
    };
  }

  componentDidUpdate = (prevProps) => {
    const {exprActList} = this.props.state;
    if (prevProps.state !== this.props.state) {
      this.setState({actvTab: this.props.actvTab, exprActList, userData: this.props.state.userData, rolesObj: this.props.state.rolesObj});
    }
  }
  setStateData = (data) => this.setState({...data});

  handleUpdateExprtn = (recordId, reqBody, callback) => {
    this.props.putB2BExpirationUpdate(recordId, reqBody, callback);
  }

  handleVryfyUpdateExprtn = (recordId, reqBody, callback) => {
    this.props.putB2BExpirationVrfctnUpdate(recordId, reqBody, callback);
  }

  render() {
    return <ExpirationListComponent state={this.state} handleUpdateExprtn={this.handleUpdateExprtn} handleVryfyUpdateExprtn={this.handleVryfyUpdateExprtn}/>;
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  putB2BExpirationUpdate: (recordId, body, callback) => dispatch(putB2BExpirationUpdate(recordId, body, callback)),
  putB2BExpirationVrfctnUpdate: (recordId, body, callback) => dispatch(putB2BExpirationVrfctnUpdate(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ExpirationList);
