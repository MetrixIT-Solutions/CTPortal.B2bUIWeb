/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';
import VendorsEditComponent from '../../components/vendors/VendorsEditComponent';
import { GetB2BVendorsView, PutB2BVendorsUpdate } from '../../actions/vendors/VendorActions';

class VendorEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordId: props.id,
      userInfo: {},
      oldData: {},
      vendorType: '',
      vendorName: '',
      vendorPerson: '',
      vendorEmail: '',
      vendorMobNumber: '',
      vendorMobCode: '',
      vendorStatus: '',
      errMsg: '',
      vClient: '',
      orgName: '',
      appAcc: false,
      // pvipType: '',
      // pvipName: '',
      // pvipcPerson: '',
      // pvipcMobCc: '+1',
      // pvipcMobNum: '',
      // pvipcMobCcNum: '',
      // pvipcEmail: ''
    };
  }

  setStateData = (data) => this.setState({ ...data });

  componentDidMount = () => {
    this.getB2BVndrsData();
  }
  getB2BVndrsData = () => {
    const recordId = this.props.id;
    this.props.GetB2BVendorsView(recordId, (resObj) => {
      if (resObj.status == '200') {
        const result = resObj.resData.result;
        this.setVndrData(result);
      }
    });
  }
  setVndrData = (data) => {
    const vndrData = {
      vendorType: data.vType,
      vendorName: data.vName,
      vendorPerson: data.vcPerson,
      vendorEmail: data.vcEmail,
      vendorMobNumber: data.vcMobNum,
      vendorMobCode: data.vcMobCc,
      vendorStatus: data.vStatus,
      vClient: data.vClient,
      // pvipType: data.pvipType,
      // pvipName: data.pvipName,
      // pvipcPerson: data.pvipcPerson,
      // pvipcMobCc:data.pvipcMobCc,
      // pvipcMobNum: data.pvipcMobNum,
      // pvipcMobCcNum: data.pvipcMobCcNum,
      // pvipcEmail: data.pvipcEmail
    };
    this.setState({ ...data, ...vndrData, oldData: vndrData });
  }

  vndrUpdate = (event) => {
    const { orgId, orgsList, userInfo, vendorType, vendorName, recordId, vendorPerson, vendorEmail, vendorMobNumber, vendorStatus, vendorMobCode, vClient, oldData } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobValid = /^[0-9]{10}$/;
    if (!vendorType) {
      this.setState({ errMsg: 'Vendor Type is requried' });
    } else if (!vendorName) {
      this.setState({ errMsg: 'Vendor Company is requried' });
    } else if (!vendorPerson) {
      this.setState({ errMsg: 'Vendor Name is requried' });
    } else if (!vendorEmail) {
      this.setState({ errMsg: 'Vendor Email is requried' })
    } else if (vendorEmail && !regex.test(vendorEmail)) {
      this.setState({ errMsg: 'Please enter a valid email address' })
    } else if (!vendorMobCode) {
      this.setState({ errMsg: 'Mobile Code is requried' });
    } else if (!vendorMobNumber) {
      this.setState({ errMsg: 'Mobile Number is requried' });
    } else if (vendorMobNumber && !mobValid.test(vendorMobNumber)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' });
    } 
    // else if (vendorType == 'Vendor' && !pvipType) {
    //   this.setState({ errMsg: 'Prime Vendor / Implementation Type is required' });
    // } else if (vendorType == 'Vendor' && !pvipName) {
    //   this.setState({ errMsg: 'Prime Vendor / Implementation Company name is required' });
    // } else if (pvipcEmail && !regex.test(pvipcEmail)) {
    //   this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Email' });
    // } else if (pvipcMobNum && !mobValid.test(pvipcMobNum)) {
    //   this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Mobile number' });
    // }
    else {
      const reqBody = {
        vendorType,
        vendorName,
        vendorPerson,
        vendorEmail,
        vendorMobNumber,
        vendorMobCode,
        vendorStatus,
        vClient,
        // pvipType: vendorType == 'Vendor' ? pvipType : '',
        // pvipName: vendorType == 'Vendor' ? pvipName : '',
        // pvipcPerson: vendorType == 'Vendor' ? pvipcPerson : '',
        // pvipcMobCc: vendorType == 'Vendor' ? pvipcMobCc : '',
        // pvipcMobNum: vendorType == 'Vendor' ? pvipcMobNum : '',
        // pvipcMobCcNum: vendorType == 'Vendor' ? pvipcMobNum ? pvipcMobCc + ' ' + pvipcMobNum : '' : '',
        // pvipcEmail: vendorType == 'Vendor' ? pvipcEmail : '',
      };
      if(JSON.stringify(reqBody) != JSON.stringify(oldData)){
        this.props.PutB2BVendorsUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            hashHistory.push('/vendors');
          } else if (resObj.status == '103') {
            this.setState({ errMsg: resObj.resData.message });
          } else {
            this.setState({ errMsg: 'Update Failed' });
          }
        });
      } else {
          this.setState({ errMsg: 'There are no Changes'})
      }
    }
    event.preventDefault();
  }

  render() {
    return <VendorsEditComponent state={this.state} vndrUpdate={this.vndrUpdate} setStateData={this.setStateData} />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BVendorsView: (recordId, callback) => dispatch(GetB2BVendorsView(recordId, callback)),
  PutB2BVendorsUpdate: (recordId, body, callback) => dispatch(PutB2BVendorsUpdate(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(VendorEditClass);
