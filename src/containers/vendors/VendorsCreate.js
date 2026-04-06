/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import { postB2BVendorsCreate } from '../../actions/vendors/VendorActions';
import { VendorsCreateComponent } from '../../components/vendors';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';

class VendorsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vendor: '',
      cVdrName: '',
      cVdrPerson: '',
      email: '',
      cVdrMobNum: '',
      mobCc: '',
      status: 'Active',
      errMsg: '',
      vClient: '',
      orgId: '',
      orgsList: [],
      appAcc: false,
      // pvipType: '',
      // pvipName: '',
      // pvipcPerson: '',
      // pvipcMobCc: '+1',
      // pvipcMobNum: '',
      // pvipcMobCcNum: '',
      // pvipcEmail: '',
    };
  }

  componentDidMount = () => {
    this.getOrgsList();
  }

  getOrgsList = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    if(appAcc) {
      const reqBody = { status: 'Active' };
      this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({orgsList: resObj.resData.result, appAcc });
        } else {
          this.setState({orgsList: [], appAcc });
        }
      });
    } else {
      const orgObj = {_id: userInfo.org, orgName: userInfo.orgName, orgCode: userInfo.orgCode};
      this.setState({ orgsList: [orgObj], orgId: userInfo.org, appAcc });
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleRouteHome = async() => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  vndrCreate = (event) => {
    const { vendor, cVdrName, cVdrPerson, email, cVdrMobNum, status, mobCc,  pvipType, pvipName, pvipcPerson, pvipcMobCc, pvipcMobNum, pvipcEmail, vClient, orgsList, orgId } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobValid = /^[0-9]{10}$/;
    const orgData = orgsList && orgsList.length > 0 && orgsList.find(item => item._id == orgId);
    if (!orgId) {
      this.setState({ errMsg: 'Organization is requried' });
    } else if (!vendor) {
      this.setState({ errMsg: 'Vendor Type is requried' });
    } else if (!cVdrName) {
      this.setState({ errMsg: 'Vendor Company is requried' });
    } else if (!cVdrPerson) {
      this.setState({ errMsg: 'Vendor Name is requried' });
    } else if (!email) {
      this.setState({ errMsg: 'Vendor Email is requried' })
    } else if (email && !regex.test(email)) {
      this.setState({ errMsg: 'Please enter a valid email address' })
    } else if (!mobCc) {
      this.setState({ errMsg: 'Mobile Code is requried' });
    } else if (!cVdrMobNum) {
      this.setState({ errMsg: 'Mobile Number is requried' });
    } else if (cVdrMobNum && !mobValid.test(cVdrMobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' });
    // } else if (vendor == 'Vendor' && !pvipType) {
    //   this.setState({ errMsg: 'Prime Vendor / Implementation Type is required' });
    // } else if (vendor == 'Vendor' && !pvipName) {
    //   this.setState({ errMsg: 'Prime Vendor / Implementation Company name is required' });
    // } else if (pvipcEmail && !regex.test(pvipcEmail)) {
    //   this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Email' });
    // } else if (pvipcMobNum && !mobValid.test(pvipcMobNum)) {
    //   this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Mobile number' });} 
    } else {
      const reqBody = {
        vendorType: vendor,
        vendorName: cVdrName,
        vendorPerson: cVdrPerson,
        vendorEmail: email,
        vendorMobNumber: cVdrMobNum,
        vendorMobCode: mobCc,
        vendorStatus: status,
        vClient,
        org: orgId,
        orgName: orgData.orgName,
        orgCode: orgData.orgCode,
        // pvipType,
        // pvipName,
        // pvipcPerson,
        // pvipcMobCc,
        // pvipcMobNum,
        // pvipcMobCcNum: pvipcMobNum ? pvipcMobCc + ' ' + pvipcMobNum : '',
        // pvipcEmail
      };
      this.props.postB2BVendorsCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          hashHistory.push('/vendors');
        } else if(resObj.status == '103') {
          this.setState({ errMsg: resObj.resData.message });
        } else {
          this.setState({ errMsg: 'Create Failed' });
        }
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <VendorsCreateComponent
        state={this.state}
        handleRouteHome = {this.handleRouteHome}
        setStateData={this.setStateData}
        vndrCreate={this.vndrCreate}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BVendorsCreate: (body, callback) => dispatch(postB2BVendorsCreate(body, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(VendorsCreate);
