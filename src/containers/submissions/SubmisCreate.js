/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { SubmisCreateComponent } from '../../components/submissions';
import { postB2BSubmissionLeadList } from '../../actions/leads/LeadsAction';
import { PostB2BOrgsList } from '../../actions/organizations/OrgActions';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';
import States from '../../../public/data/CountryStates.json';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import { setHeadersToken } from '../../hooks/apihooks';

class SubmisCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subDate: new Date().toISOString().slice(0, 10),
      jobTitle: null,
      jobId: '',
      status: '',
      skills: [],
      skillOptions: [],
      jobDesc: '',
      prHr: '',
      prNotes: '',
      cCode: 'USA',
      statesArr: [],
      sCode: '',
      adrs: '',
      area: '',
      city: '',
      zip: '',
      vType: '',
      companyName: '',
      vName: '',
      emId: '',
      mobNum: '',
      mobCc: '+1',
      client: '',
      disable: false,
      errMsg: '',
      userInfo: {},
      consList: [],
      canObj: null,
      file: '',
      iconPath: '',
      imgUrl: '',
      pvipType: '',
      pvipName: '',
      pvipcPerson: '',
      pvipcMobCc: '+1',
      pvipcMobNum: '',
      pvipcMobCcNum: '',
      pvipcEmail: '',
      sNotes: '',
      orgId: '',
      orgsList: [],
      rolesObj: {},
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnSkillArr: [], cmnJbTitleArr: []
    }
    this.fileInput = React.createRef();
  }

  componentDidMount = async () => {
    const ui = await localForage.getItem('userInfo');
    const userInfo = ui.value || {};
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'))
    this.setState({ userInfo, rolesObj: { ...rolesObj, appAcc } });
    !appAcc && this.getSubLeadsList('');
    appAcc && this.getOrganisationsList();
    const e = { target: { value: 'USA' } };
    this.handleCountryChange(e);
    this.getSkillsList();
  }
  getSkillsList = () => {
    const reqBody = { actPgNum: 1, rLimit: 100 }
    this.props.PostB2BDropdownsListAPI(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result.lookUpsList;
        const data = resData.map(item => ({ ...item, label: item.name, value: item.name }));
        const cmnSkillArr = data?.length > 0 ? data.filter(item => item.type === 'Skill') : [];
        const cmnJbTitleArr = data?.length > 0 ? data.filter(item => item.type === 'Job Title') : [];
        this.setState({ cmnSkillArr, cmnJbTitleArr });
      } else {
        this.setState({ cmnSkillArr: [], cmnJbTitleArr: [] });
      }
    })
  }
  getSubLeadsList = (org) => {
    const {userInfo} = this.state;
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'))
    const reqBody = appAcc ? {org} : '';
    this.props.postB2BSubmissionLeadList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result;
        const consList = resData.length > 0 && resData.map(item => ({ ...item, value: item._id, label: item.euName }));
        this.setState({ consList });
      } else {
        this.setState({ consList: [] });
      }
    });
  }
  getOrganisationsList = () => {    
    const reqBody = { pgNum: 1, limit: 100, searchStr: '' };
    this.props.PostB2BOrgsList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ orgsList: resObj.resData.result.orgsList });
      } else this.setState({ orgsList: [] });
    });
  }
  setStateData = (data) => this.setState({ ...data });
  handleChangeOrg = (e) => {
    this.setState({ orgId: e.target.value, errMsg: '' });
    this.getSubLeadsList(e.target.value);
  }
  handleCountryChange = (e) => {
    const { value } = e.target;
    const statesArr = value ? States[value] : [];
    this.setState({ cCode: value, statesArr, errMsg: '' });
  }

  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: '' });
    }
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleCreate = async () => {
    const { orgId, subDate, jobTitle, jobId, status, sNotes, skills, jobDesc, cCode, sCode, adrs, area, city, zip, vType, companyName, vName, emId, mobCc, mobNum, client, userInfo, statesArr, canObj, file, imgUrl, prHr, prNotes, pvipType, pvipName, pvipcPerson, pvipcMobCc, pvipcMobNum, pvipcEmail, pvipClient, orgsList } = this.state;
    const countryObj = cCode ? Countries && Countries.length > 0 && Countries.find(item => item.code == cCode) : {};
    const stateObj = statesArr && statesArr.length > 0 ? statesArr.find(item => item.stateCode == sCode) : {};
    const skillString = skills && skills.length > 0 ? skills.map(skill => skill.value).join(', ') : '';
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const phRegex = /^\d{10}$/;
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const orgObj = appAcc && orgId ? orgsList && orgsList.length > 0 && orgsList.find(item => item._id == orgId) :{};
    if (appAcc && !orgId) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (canObj == null) {
      this.setState({ errMsg: 'Candidate is required' });
    } else if (!subDate) {
      this.setState({ errMsg: 'Submission Date is required' });
    } else if (!jobTitle) {
      this.setState({ errMsg: 'Job Title is required' });
    } else if (!status) {
      this.setState({ errMsg: 'Status is required' });
    } else if (skills.length === 0) {
      this.setState({ errMsg: 'Skills are required' });
    } else if (skills[0] && !skills[0].value) {
      this.setState({ errMsg: 'Skills are required' });
    } else if (!jobDesc) {
      this.setState({ errMsg: 'Job Description is required' });
    } else if (prHr && !imgUrl) {
      this.setState({ errMsg: 'Image is required' });
    } else if (!cCode) {
      this.setState({ errMsg: 'Country is required' });
    } else if (!sCode) {
      this.setState({ errMsg: 'State is required' });
    } else if (!city) {
      this.setState({ errMsg: 'City is required' });
    } else if (!vType) {
      this.setState({ errMsg: 'Vendor Type is required' });
    } else if (!companyName) {
      this.setState({ errMsg: 'Vendor Company is required' });
    } else if (!vName) {
      this.setState({ errMsg: 'Vendor Name is required' });
    } else if (!emId) {
      this.setState({ errMsg: 'Email is required' });
    } else if (emId && !emailValid.test(emId)) {
      this.setState({ errMsg: 'Invalid Email' });
    } else if (!mobNum) {
      this.setState({ errMsg: 'Mobile number is required' });
    } else if (mobNum && !phRegex.test(mobNum)) {
      this.setState({ errMsg: 'Invalid Mobile number' });
    } else if (vType == 'Vendor' && (pvipName || pvipcPerson || pvipcEmail || pvipcMobNum) && !pvipType) {
      this.setState({ errMsg: 'Prime Vendor / Implementation Type is required' });
    } else if (pvipcEmail && !emailValid.test(pvipcEmail)) {
      this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Email' });
    } else if (pvipcMobNum && !phRegex.test(pvipcMobNum)) {
      this.setState({ errMsg: 'Invalid Prime Vendor / Implementation Mobile number' });
    } else {
      const canData = this.setCandidateData(canObj);
      const reqBody = {
        sDt: subDate,
        sDtStr: subDate,
        jobTitle: jobTitle.value,
        jobId,
        sStatus: status,
        skills: skillString,
        jobDesc: jobDesc,
        cCode: cCode,
        sCode: sCode,
        adrs: adrs,
        area: area,
        city: city,
        zip: zip,
        vType,
        vName: companyName,
        vcPerson: vName,
        vcEmail: emId,
        vcMobCc: mobCc,
        vcMobNum: mobNum,
        vcMobCcNum: mobNum ? mobCc + ' ' + mobNum : '',
        vClient: client,
        cUser: userInfo.cUser,
        hNum: adrs,
        area,
        zip,
        state: stateObj?.stateName ? stateObj.stateName : '',
        sCode,
        city,
        cityCode: '',
        country: countryObj?.label ? countryObj.label : '',
        cCode,

        org: orgObj && orgObj._id ? orgObj._id : canObj.org,
        orgName: orgObj && orgObj._id ? orgObj.orgName : canObj.orgName,
        orgCode: orgObj && orgObj._id ? orgObj.orgCode : canObj.orgCode,
        ...canData,

        prHr,
        prNotes,
        pvipType: (pvipName || pvipcPerson || pvipcMobNum || pvipcEmail) ? pvipType :'',
        pvipName,
        pvipcPerson,
        pvipcMobCc,
        pvipcMobNum,
        pvipcMobCcNum: pvipcMobNum ? pvipcMobCc + ' ' + pvipcMobNum : '',
        pvipcEmail,
        sNotes,
      };
      const data = new FormData();
      const img = file;
      data.append('submsnData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    axios.post(config.postB2BSubmissionCreateAPI, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/submissions');
          this.setState({ disable: false });
        } else {
          this.setState({ disable: false, errMsg: 'Submission Create Failed' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ disable: false });
        }
      });
  }
  setCandidateData = (canObj) => {
    return {
      euUser: canObj.euUser,
      euName: canObj.euName,
      euPrimary: canObj.euPrimary,
      euRefID: canObj.euUID,
      lead: canObj._id,
      leadId: canObj.leadId,
      canPhNum: canObj.euMobCcNum,
      canEmail: canObj.euEmID,

      team: canObj.team,
      tName: canObj.tName,
      tCode: canObj.tCode,
      obId: canObj.obId,
      obName: canObj.obName,
      obCode: canObj.obCode,

      visaStatus: canObj.visaStatus || '',
      tExp: canObj.tExp || '',
      primSkills: canObj.primSkills || '',
      wrkUrls: canObj.wrkUrls || [],
      wrkAuthExpDtStr: canObj.wrkAuthExpDtStr || '',
      usaNatID: canObj.usaNatID || '',
      unidType: canObj.unidType || '',
      unidExpDtStr: canObj.unidExpDtStr || '',
      resState: canObj.resState || '',
      resScode: canObj.resScode || '',
      certificates: canObj. certificates || [],

      ua: canObj.ua,
      pReports: canObj.pReports,
      mVisaStatus: canObj.mVisaStatus,  
      mEmail: canObj.mEmail,
      mMobCc: canObj.mMobCc,
      mMobNum: canObj.mMobNum,
      mTexp: canObj.mTexp,
      mPrimSkills: canObj.mPrimSkills,
      mCurrClient: canObj.mCurrClient,
      mPrevClient: canObj.mPrevClient,
      mWrkUrls: canObj.mWrkUrls,
      mWrkAuthExpDtStr: canObj.mWrkAuthExpDtStr,
      mUsaNatID: canObj.mUsaNatID, 
      mUnidType: canObj.mUnidType,
      mUnidExpDtStr: canObj.mUnidExpDtStr,
      mState: canObj.mState,
      mSCode: canObj.mSCode,
      mJobTitle: canObj.mJobTitle,
      mCertificates: canObj.mCertificates,
    };
  }

  handleJbTitleChange = (type, data) => {
    if (type === 'jobTitle') {
      this.setState(prevState => {
        const updatedJobTitleList = data?.__isNew__ 
          ? [...prevState.jobTitleList, { label: initCaps(data.label), value: initCaps(data.value) }]
          : data;
  
        return {
          jobTitle: updatedJobTitleList,
          errors: {} 
        };
      });
    }
  }
  handleCreateSkill = (type) => {
    const { cmnValue } = this.state;
    if (!cmnValue) {
      this.setState({ cmnErrMsg: `${type} is required` });
    } else {
      const reqBody = { type, name: cmnValue.replace(/\s+$/, '')};
      this.props.PostB2BDropdownsCreateAPI(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ cmnErrMsg: `${type} Created Successfully` });
          setTimeout(() => {
            this.getSkillsList();
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' })
          }, 1000);
        } else if (resObj.status == '103') this.setState({ cmnErrMsg: resObj.resData.message });
        else {
          this.setState({ cmnErrMsg: `${type} Create Failed` });
          setTimeout(() => {
            this.getSkillsList();
            this.setState({ cmnModal: false, cmnValue: '', cmnErrMsg: '' });
          }, 1000);
        }
      })
    }
  }
    render() {
      return (
        <SubmisCreateComponent
          state={this.state}
          handleChangeOrg={this.handleChangeOrg}
          handleCreate={this.handleCreate}
          handleCountryChange={this.handleCountryChange}
          setStateData={this.setStateData}
          handleOnchange={this.handleOnchange}
          removeImage={this.removeImage}
          fileInput={this.fileInput}
          handleJbTitleChange={this.handleYearChange}
          handleCreateSkill={this.handleCreateSkill}
        />
      )
    }
  }

  const mapStateToProps = () => ({});
  const mapDistachToProps = (dispatch) => ({
    postB2BSubmissionLeadList: (body, callback) => dispatch(postB2BSubmissionLeadList(body, callback)),
    PostB2BOrgsList: (body, callback) => dispatch(PostB2BOrgsList(body, callback)),
    PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
    PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback))
  });

export default connect(mapStateToProps, mapDistachToProps)(SubmisCreate);
