/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AdminUserViewComponent } from '../../components/adminUsers';
import { GetB2BUserView, PutB2BUserStatusUpdate } from '../../actions/users/UsersActions';

import localForage from '../../hooks/localForage';
class AdminUserViewSub extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userViewObj: {},
      statusModal: false,
      rejectModal: false,
      disabled: false, rolesObj: {},
      key: '', errMsg: '', loading: true
    };
  };
  componentDidMount = () => {this.usrViewData();}
  usrViewData = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value || {};
    const rlsObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...rlsObj, appAcc };
    this.props.GetB2BUserView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ userViewObj: resObj.resData.result, rolesObj, loading: false });
      } else {
        this.setState({ userViewObj: {}, rolesObj, loading: false });
      }
    });
  }
  setStateData = (data) => {
    this.setState({ ...data });
  }

  handleApproved = () => this.setState({statusModal: true});
  handleRejected = () => this.setState({rejectModal: true, key: 'reject'});
  
  handleStatusUpdate = () => {    
    const {key, userViewObj} = this.state;
    const recordid = userViewObj._id;
    const status = key == 'reject' ? 'Inactive' : 'Active';
    const reqBody = {status};
    const succMsg =  key == 'reject' ? 'Review User Rejected successfully' : 'Review User Approved successfully';
    const errorMsg =  key == 'reject' ? 'Review User Rejected failed' : 'Review User Approved failed';
    this.setState({disabled: true});
    this.props.PutB2BUserStatusUpdate(recordid, reqBody, (resObj) => {
      if(resObj.status == '200') {
        this.setState({ succMsg });
        setTimeout(() => {
          this.setState({ statusModal: false, rejectModal: false, disabled: false });
          this.usrViewData();
        },2000)
      } else {
        this.setState({errMsg: errorMsg, disabled: false});
      }
    });
  }

  render() {
    return (
      <AdminUserViewComponent
        state={this.state}
        setStateData={this.setStateData}
        handleApproved = {this.handleApproved}
        handleRejected = {this.handleRejected}
        handleStatusUpdate = {this.handleStatusUpdate} />
    )
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BUserView: (id, callback) => dispatch(GetB2BUserView(id, callback)),
  PutB2BUserStatusUpdate: (recordid, reqBody, callback) => dispatch(PutB2BUserStatusUpdate(recordid, reqBody, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(AdminUserViewSub);
