/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { OrgCreateComponent } from '../../components/organizations';
import { setHeadersToken } from '../../hooks/apihooks';
import localForage from '../../hooks/localForage';
import Countries from '../../../public/data/Countries.json';
import States from '../../../public/data/CountryStates.json';
import config from '../../../config/apis.json';
import hashHistory from '../../hashHistory';

class OrgCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgName: '',
      orgCode: '',
      orgMobNum:'',
      orgMobCc: '+1',
      orgEmID:'',
      orgNotes: '',
      orgStatus: 'Active',
      hNum: '',
      area: '',
      aLocality: '',
      city: '',
      zip: '',
      statesArr: [],
      state: '',
      stateCode: '',
      country: '',
      countryCode: '',
      file: '',
      imgUrl: '',
      orgWs:'',
      orgGst:'',
      orgPan:'',
      orgCin:'',
      orgTin:'',
      orgSsn:'',
      orgEin:'',
      orgItin:'',
      orgTan:'',
      errMsg: '',
      disable: false,
      branchName: '',
      branchCode: '',
      userInfo: {}
    }
    this.fileInput = React.createRef();
  };
  componentDidMount = async () => {
    const { orgsListCount } = this.props.OrgsReducer;
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    this.setState({ orgSeq: orgsListCount ? orgsListCount + 1 : '', userInfo })
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  setStateData = (data) => this.setState({ ...data });
  handleCountryChange = (e) => {
    const { value } = e.target;
    const cntryObj = value ? Countries.find(item => item.code == value) : {};
    const statesArr = value ? States[value] : [];
    this.setState({ country: cntryObj.value || '', countryCode: value, statesArr: statesArr, errMsg:'', state: '', stateCode : '' });
  }
  handleStateChange = (e) => {
    const { countryCode } = this.state;
    const { value } = e.target;
    const statesArray = countryCode ? States[countryCode] : [];
    const satesObj = value ? statesArray && statesArray.length > 0 ? statesArray.find(item => item.stateCode == value) : {} : '';
    this.setState({ state: value ? satesObj.stateName : '', stateCode: value, errMsg:'' });
  }
  onImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      this.setState({ errMsg: '', file, imgUrl });
    }
  };

  removeImage = () => {
    this.setState({ imageUrl: null, errMsg: '', file: null });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleCreate = async () => {
    const { orgName, orgCode, orgSeq, orgEmID, orgMobNum, orgMobCc, orgNotes, orgStatus, hNum, area, aLocality, city, zip, state, stateCode, country, countryCode, plusCode, latitude, longitude, file, orgWs, orgGst, orgPan, orgCin, orgTin, orgSsn, orgEin, orgItin, orgTan, branchName, branchCode} = this.state;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobValid = /^[0-9]{10}$/;
    if (!orgName) {
      this.setState({ errMsg: 'Organization Name is required' })
    } else if (!orgCode) {
      this.setState({ errMsg: 'Organization Code is required' })
    } else if (!orgMobNum) {
      this.setState({ errMsg: 'Mobile Number is required' })
    } else if (!mobValid.test(orgMobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    } else if (!orgEmID) {
      this.setState({ errMsg: 'Email is required' })
    } else if (!regex.test(orgEmID)) {
      this.setState({ errMsg: 'Please enter a valid email address' })
    } else if (!orgStatus) {
      this.setState({ errMsg: 'Organization Status is required' })
    } else if (!country) {
      this.setState({ errMsg: 'Country is required' })
    } else if (!state) {
      this.setState({ errMsg: 'State is required' })
    } else if (!hNum) {
      this.setState({ errMsg: 'Address is required' })
    } else if (!area) {
      this.setState({ errMsg: 'Area is required' })
    } else if (!city) {
      this.setState({ errMsg: 'City is required' })
    }else if (!zip) {
      this.setState({ errMsg: 'Zip is required' })
    } else if (!branchName) {
      this.setState({ errMsg: 'Head Branch is required' })
    } else if (!branchCode) {
      this.setState({ errMsg: 'Head Branch Code is required' })
    } else {
      const reqBody = {
        orgName,
        orgCode,
        orgSeq,
        orgMobNum,
        orgMobCc,
        orgMobCcNum: orgMobCc + ' ' + orgMobNum,
        orgEmID,
        orgNotes,
        orgStatus,
        hNum,
        area,
        aLocality,
        city,
        zip,
        state,
        stateCode,
        country,
        countryCode,
        plusCode: '',
        geocoordinates: {},
        orgWs,
        orgGst,
        orgPan,
        orgCin,
        orgTin,
        orgSsn,
        orgEin,
        orgItin,
        orgTan,
        branchName,
        branchCode
      }
      const data = new FormData();
      data.append('orgData', JSON.stringify(reqBody));
      data.append('iconFile', file);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    axios.post(config.postB2BOrgCreateAPI, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/organizations');
          this.setState({ disable: false });
        } else {
          this.setState({ errMsg: 'Organization create failed', disable: false });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ errMsg: 'Organization create failed', disable: false });
        }
      });
  }
  render() {
    return (
      <OrgCreateComponent
        state={this.state}
        fileInput={this.fileInput}
        handleCountryChange={this.handleCountryChange}
        handleStateChange={this.handleStateChange}
        handleCreate={this.handleCreate}
        onImageChange={this.onImageChange}
        removeImage={this.removeImage}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome} />
    )
  };
}
const mapStateToProps = (state) => ({ OrgsReducer: state.OrgsReducer });
const mapDistachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDistachToProps)(OrgCreate);