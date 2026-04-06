/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import hashHistory from '../../hashHistory';
import BranchesEditComponent from '../../components/branches/BranchesEditComponent'
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions'
import { GetB2BBranchesView, putB2BBranchesUpdate } from '../../actions/branches/BranchActions';
import CountryStates from '../../../public/data/CountryStates.json';
import Countries from '../../../public/data/Countries.json';

class BranchesEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recordId: props.id,
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
      oldData: {},
      statesList: [],
      disable: false,
      org: ''
    };
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidMount = () => {
    this.getB2BBrchData();
  }
  getB2BBrchData = () => {
    const recordId = this.props.id;
    this.props.GetB2BBranchesView(recordId, (resObj) => {
      if (resObj.status == '200') {
        const result = resObj.resData.result;
        this.setBrachData(result);
      } else {

      }
    });
  }
  setBrachData = (data) => {
    const statesList = data.countryCode ? CountryStates[data.countryCode] : [];
    const branchData = {
      obName: data.obName,
      obCode: data.obCode,
      obMobCc: data.obMobCc,
      obMobNum: data.obMobNum,
      obAltMobCc: data.obAltMobCc,
      obAltMobNum: data.obAltMobNum,
      obEmID: data.obEmID,
      obAltEmID: data.obAltEmID,
      obStatus: data.obStatus,
      obNotes: data.obNotes,
      hNum: data.hNum,
      area: data.area,
      zip: data.zip,
      city: data.city,
      country: data.country,
      countryCode: data.countryCode,
      stateCode: data.stateCode,
      state: data.state,
      obWs: data.obWs,
      obGst: data.obGst,
      obPan: data.obPan,
      obCin: data.obCin,
      obTin: data.obTin,
      obSsn: data.obSsn,
      obEin: data.obEin,
      obItin: data.obItin,
      obTan: data.obTan
    };
    this.setState({ org: data.org, orgName: data.orgName, orgCode: data.orgCode, ...branchData, oldData: branchData, recordId: this.props.id, statesList});
  }

  handleCountryChange = (e) => {
    const countryCode = e.target.value;
    if (countryCode) {
      const countryData = Countries.find(item => item.code == countryCode)
      const statesList = CountryStates[countryCode];
      this.setState({ countryCode, statesList, country: countryData.value, errMsg: '' })
    } else {
      this.setState({ countryCode: '', statesList: [], country: '' , errMsg: ''})
    }
  }
  handleStateChange = (e) => {
    const stateCode = e.target.value;
    if (stateCode) {
      const stateData = this.state.statesList.find(item => item.stateCode == stateCode);
      this.setState({ stateCode, state: stateData.label, errMsg: '' })
    } else {
      this.setState({ stateCode: '', state: '' , errMsg: ''})
    }
  }

  handleUpdate = (event) => {
    const { oldData, recordId, obName, obCode, obMobNum, obAltMobNum, obEmID, obAltEmID, obMobCc, obAltMobCc, obNotes, obStatus, obWs, obGst, obPan, obCin, obTin, obSsn, obEin, obItin, obTan,
      hNum, area, zip, city, state, stateCode, country, countryCode } = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobValid = /^[0-9]{10}$/;

    if (!obName) {
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
      const reqBody = {
        obName, obCode, obMobCc: obMobNum ? obMobCc : '', obMobNum, obAltMobCc: obAltMobNum ? obAltMobCc : '', obAltMobNum, obEmID, obAltEmID, obStatus, obNotes,
        hNum, area, zip, city, country, countryCode, stateCode, state, obWs, obGst, obPan, obCin, obTin, obSsn, obEin, obItin, obTan
      };
      if (JSON.stringify(oldData) != JSON.stringify(reqBody)) {
        this.setState({ disable: true });
        this.props.putB2BBranchesUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == 200) {
            hashHistory.push('/organizations/branches')
          } else this.setState({ errMsg: 'Update Failed', disable: false });
        });
      } else {
        this.setState ({errMsg: 'There are no changes'});
      }
    }
    event.preventDefault();
  }

  render() {
    return <BranchesEditComponent
      state={this.state}
      handleCountryChange={this.handleCountryChange}
      handleStateChange={this.handleStateChange}
      handleUpdate={this.handleUpdate}
      setStateData={this.setStateData}
    />
  }
}
const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BBranchesView: (recordId, callback) => dispatch(GetB2BBranchesView(recordId, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  putB2BBranchesUpdate: (recordId, body, callback) => dispatch(putB2BBranchesUpdate(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(BranchesEditClass);
