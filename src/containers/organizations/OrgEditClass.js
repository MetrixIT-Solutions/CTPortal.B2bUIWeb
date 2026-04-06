/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { OrgEditComponent } from '../../components/organizations';
import { GetB2BOrgView } from '../../actions/organizations/OrgActions';
import { setHeadersToken } from '../../hooks/apihooks';
import localForage from '../../hooks/localForage';
import Countries from '../../../public/data/Countries.json';
import States from '../../../public/data/CountryStates.json';
import hashHistory from '../../hashHistory';
import config from '../../../config/apis.json';

class OrgEditClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      orgName: '',
      orgCode: '',
      orgMobNum:'',
      orgMobCc:'',
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
      imgid: '',
      iconPath: '',
      initialData: {},
      imgUrl: '',
      errMsg: '',
      disable: false,
      orgType:'',
      userInfo: {}
    }
    this.fileInput = React.createRef();
  };
  componentDidMount = async() => {
    const { id } = this.state;
    this.handleOrgView(id);
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    this.setState({ userInfo })
  }
  handleOrgView = (recordid) => {
    this.props.GetB2BOrgView(recordid, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result;
        setViewData(resData);
      } else {
        const { orgsList } = this.props.OrgsReducer;
        const respData = orgsList && orgsList.length > 0 ? orgsList.find(item => item._id == recordid) : {};
        const resData = respData && respData._id ? respData : {};
        setViewData(resData);
      }
    })
    const setViewData = (resData) => {
      const file = resData.oiPath ? new File([], resData.oiPath) : null;
      const dt = resData.oiPath ? resData.oiPath.split('/') : '';
      const imgid = resData.oiPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
      const initialData = this.setData(resData);
      const statesArr = resData.countryCode ? States[resData.countryCode] : [];
      this.setState({ ...initialData, initialData, statesArr: statesArr ? statesArr : [], file, iconPath: resData.oiPath, iPath: resData.oiPath, imgid })
    }
  }
  setData = (resData) => {
    return { ...resData, orgCode: (resData.orgCode).toUpperCase(), orgType: resData.orgType, fromMail: resData.from};
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
    this.setState({ country: value ? cntryObj.value : '', countryCode: value, statesArr: statesArr , errMsg: '', state: '', stateCode: ''});
  }
  handleStateChange = (e) => {
    const { countryCode } = this.state;
    const { value } = e.target;
    const statesArr = countryCode && value ? States[countryCode] : [];
    const satesObj = value && statesArr && statesArr.length > 0 ? statesArr.find(item => item.stateCode == value) : {};
    this.setState({ state: value ? satesObj.stateName : '', stateCode: value, errMsg: '' });
  }

  onImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      this.setState({ errMsg: '', file, imgUrl, iconPath: '' });
    }
  };
  removeImage = () => {
    this.setState({ imageUrl: null, errMsg: '', file: null, iconPath: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleEditClick = async () => {
    const { orgName, orgCode, orgMobNum, orgMobCc, orgEmID, orgNotes, orgStatus, hNum, area, aLocality, city, zip, state, stateCode, country, countryCode, plusCode, latitude, longitude, file, initialData, iconPath, iPath, imgUrl, orgWs, orgGst, orgPan, orgCin, orgTin, orgSsn, orgEin, orgItin, orgTan} = this.state;
    const geocoordinates = latitude && longitude ? { type: 'Point', coordinates: [longitude, latitude] } : { "coordinates": [], "type": "Point" };
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
    } else if (!zip) {
      this.setState({ errMsg: 'Zip is required' })
    } else {
      this.setState({ disable: true });
      const reqBody = {
        orgName,
        orgCode,
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
        geocoordinates,
        iPath,
        imgUrl,
        iconPath,
        orgWs,
        orgGst,
        orgPan,
        orgCin,
        orgTin,
        orgSsn,
        orgEin,
        orgItin,
        orgTan
      }
      const prevData = {
        orgName: initialData.orgName, orgCode: initialData.orgCode, orgMobNum: initialData.orgMobNum, orgMobCc: initialData.orgMobCc, orgMobCcNum: initialData.orgMobCcNum, orgEmID: initialData.orgEmID, orgNotes: initialData.orgNotes, orgStatus: initialData.orgStatus,
        hNum: initialData.hNum, area: initialData.area, aLocality: initialData.aLocality, city: initialData.city, zip: initialData.zip, state: initialData.state, stateCode: initialData.stateCode, country: initialData.country, countryCode: initialData.countryCode,plusCode: initialData.plusCode, geocoordinates: initialData.geocoordinates, 
        iPath: initialData.oiPath, imgUrl: '', iconPath: initialData.oiPath, 
        orgWs: initialData.orgWs,orgGst: initialData.orgGst, orgPan: initialData.orgPan, orgCin: initialData.orgCin, orgTin: initialData.orgTin, orgSsn: initialData.orgSsn, orgEin: initialData.orgEin, orgItin: initialData.orgItin, orgTan: initialData.orgTan,
      }      
      const img = iconPath ? {} : file;
      const data = new FormData();
      data.append('orgData', JSON.stringify(reqBody));
      data.append('iconFile', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      if (JSON.stringify(reqBody) == JSON.stringify(prevData)) {
        this.setState({ errMsg: 'There are no changes', disable: false });
      } else {
        reqBody['entObj'] = { ...prevData, orgIcon: initialData.orgIcon, oiActualName: initialData.oiActualName, oiPath: initialData.oiPath };
        this.handleApiCall(data, headers);
      }
    }
  }
  handleApiCall = (data, headers) => {
    const { id, imgid } = this.state
    const imageid = imgid ? imgid : id;
    const api = `${config.postB2BOrgAPI}${id}/${imageid}/update`
    axios.put(api, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/organizations');
          this.setState({ disable: false });
        } else {
          this.setState({ errMsg: 'Organization edit failed', disable: false });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ errMsg: 'Organization edit failed', disable: false });
        }
      });
  }
  render() {
    return <OrgEditComponent
      state={this.state}
      fileInput={this.fileInput}
      handleCountryChange={this.handleCountryChange}
      handleStateChange={this.handleStateChange}
      onImageChange={this.onImageChange}
      removeImage={this.removeImage}
      setStateData={this.setStateData}
      handleEditClick={this.handleEditClick} 
      handleRouteHome={this.handleRouteHome}
      />
  }
};

const mapStateToProps = (state) => ({ OrgsReducer: state.OrgsReducer });
const mapDistachToProps = (dispatch) => ({
  GetB2BOrgView: (id, callback) => dispatch(GetB2BOrgView(id, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(OrgEditClass);