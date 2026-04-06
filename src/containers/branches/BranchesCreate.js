/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';

import BranchesCreateComponent from '../../components/branches/BranchesCreateComponent'
import { postB2BBranchesCreate } from '../../actions/branches/BranchActions'
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions'
import CountryStates from '../../../public/data/CountryStates.json';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';

class BranchesCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: '',
      orgCode: '',
      obName: '',
      obCode: '',
      obMobNum: '',
      obAltMobNum: '',
      obEmID: '',
      obAltEmID: '',
      obMobCc: '',
      obAltMobCc: '',
      obNotes: '',
      obStatus: 'Active',
      obWs: '',
      obGst: '',
      obPan: '',
      obCin: '',
      obTin: '',
      obSsn: '',
      obEin: '',
      obItin: '',
      obTan: '',
      hNum: '',
      area: '',
      zip: '',
      city: '',
      state: '',
      stateCode: '',
      country: '',
      countryCode: '',
      orgsList: [],
      orgData: {},
      statesList: [],
      disable: false,
      isCheck: false,
      addressData: {},
    };
  }
  setStateData = (data) => this.setState({ ...data });

  componentDidMount = () => {
    this.getOrgsList();
  }
  getOrgsList = () => {
    const reqBody = { status: 'Active' };
    this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        this.setState({ orgsList: resObj.resData.result });
      } else {
        this.setState({ orgsList: [] });
      }
    });
  }

  handleChangeOrg = (e) => {
    const orgId = e.target.value;
    if (orgId) {
      const orgData = this.state.orgsList.find(item => item._id == orgId);
      this.setorgData(orgData);
    } else {
      this.setState({ orgData: {}, orgName: '', orgCode: '', errMsg: '', orgId: '' })
    }
  }
  setorgData = (orgData) => {
    const statesList = orgData.countryCode ? CountryStates[orgData.countryCode] : [];
    const addressData = {
      hNum: orgData.hNum || '',
      area: orgData.area || '',
      zip: orgData.zip || '',
      city: orgData.city || '',
      state: orgData.state || '',
      stateCode: orgData.stateCode || '',
      country: orgData.country || '',
      countryCode: orgData.countryCode || '',
    };

    const orgAddData = this.state.isCheck ?  addressData : {};

    this.setState({
      orgId: orgData._id,
      orgName: orgData.orgName,
      orgCode: orgData.orgCode,
      obWs: orgData.orgWs || '',
      obGst: orgData.orgGst || '',
      obPan: orgData.orgPan || '',
      obCin: orgData.orgCin || '',
      obTin: orgData.orgTin || '',
      obSsn: orgData.orgSsn || '',
      obEin: orgData.orgEin || '',
      obItin: orgData.orgItin || '',
      obTan: orgData.orgTan || '',
      statesList,
      addressData,
      errMsg: '',
      ...orgAddData
    });
  }

  handleCountryChange = (e) => {
    const countryCode = e.target.value;
    if (countryCode) {
      const countryData = Countries.find(item => item.code == countryCode);
      const statesList = CountryStates[countryCode] || [];
      this.setState({ countryCode, statesList, country: countryData.value, errMsg: '' });
    } else {
      this.setState({countryCode: '', statesList: [], country: '',  errMsg: '' });
    }
  }
  handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (stateCode) {
      const stateData = this.state.statesList.find(item => item.stateCode == stateCode);
      this.setState({ stateCode, state: stateData.label,  errMsg: '' });
    } else {
      this.setState({stateCode: '', state: '',  errMsg: '' });
    }
  }

  handleCheckBox = () => {
    const isCheck = !this.state.isCheck;
    const addressData = isCheck ? this.state.addressData : {};
    this.setAddress(addressData, isCheck);
  }
  setAddress = (addressData, isCheck) => {
    const statesList = addressData.countryCode ? CountryStates[addressData.countryCode] : [];

    this.setState({
      hNum: addressData.hNum || '',
      area: addressData.area || '',
      zip: addressData.zip || '',
      city: addressData.city || '',
      state: addressData.state || '',
      stateCode: addressData.stateCode || '',
      country: addressData.country || '',
      countryCode: addressData.countryCode || '',
      isCheck,
      statesList
    });
  }

  branchCreate = (event) => {
    const { orgId, obName, obCode, orgName, orgCode, obMobNum, obAltMobNum, obEmID, obAltEmID, obMobCc, obAltMobCc, obNotes, obStatus, obWs, obGst, obPan, obCin, obTin, obSsn, obEin, obItin, obTan,
      hNum, area, zip, city, state, stateCode, country, countryCode } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobValid = /^[0-9]{10}$/;

    if (!orgId) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (!obName) {
      this.setState({ errMsg: 'Branch Name is required' });
    } else if (!obCode) {
      this.setState({ errMsg: 'Branch Code is required' });
    } else if (obMobNum && !mobValid.test(obMobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' });
    } else if(obEmID && !regex.test(obEmID)){
      this.setState({ errMsg: 'Please enter a valid Email address' });
    } else if (obAltMobNum && !mobValid.test(obAltMobNum)) {
      this.setState({ errMsg: 'Please enter a valid alternate mobile number' });
    } else if(obAltEmID && !regex.test(obAltEmID)){
      this.setState({ errMsg: 'Please enter a valid Alternate Email address' });
    } else if(!countryCode){
      this.setState({ errMsg: 'Country is required' });
    } else if(!stateCode){
      this.setState({ errMsg: 'State is required' });
    } else if(!hNum){
      this.setState({ errMsg: 'Address is required' });
    } else if(!area){
      this.setState({ errMsg: 'Street/Area is required' });
    } else if(!city){
      this.setState({ errMsg: 'City is required' });
    } else if(!zip){
      this.setState({ errMsg: 'Zip Code is required' });
    } else {
      this.setState({ disable: true });
      const reqBody = {
        org: orgId, orgName, orgCode, obName, obCode, obMobCc: obMobNum ? obMobCc : '', obMobNum, obAltMobCc: obAltMobNum ? obAltMobCc : '', obAltMobNum, obEmID, obAltEmID, obNotes, obStatus,
        obWs, obGst, obPan, obCin, obTin, obSsn, obEin, obItin, obTan, hNum, area, zip, city, state, stateCode, country, countryCode
      };
      this.props.postB2BBranchesCreate(reqBody, (resObj) => {
        if (resObj.status == 200) {
          hashHistory.push('/organizations/branches')
        } else this.setState({ errMsg: 'Create Failed', disable: false });
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <BranchesCreateComponent
        state={this.state}
        setStateData={this.setStateData}
        branchCreate={this.branchCreate}
        handleCountryChange = {this.handleCountryChange}
        handleStateChange={this.handleStateChange}
        handleCheckBox={this.handleCheckBox}
        handleChangeOrg={this.handleChangeOrg}
      />
    )
  }
}

const mapStateToProps = (state) => ({ PanelsReducer: state.PanelsReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  postB2BBranchesCreate: (body, callback) => dispatch(postB2BBranchesCreate(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(BranchesCreate);
