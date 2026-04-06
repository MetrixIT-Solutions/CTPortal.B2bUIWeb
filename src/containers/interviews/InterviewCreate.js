/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { InterviewCreateComponent } from '../../components/interviews';
import { GetB2BSubView } from '../../actions/submissions/SubmissionActions';
import { getB2BLeadView } from '../../actions/leads/LeadsAction';
import States from '../../../public/data/CountryStates.json';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';
import { setHeadersToken } from '../../hooks/apihooks';

class InterviewCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subObj: {},
      initialData: {},
      userInfo: {},
      scrType: '',
      invDate: '',
      invTime: '',
      timeZone: 'EST',
      dur: '',
      hrs:'',
      mins:'',
      canName: '',
      canMobCc: '',
      canMobNum: '',
      jobTitle: '',
      jobId: '',
      skills: [],
      jobDesc: '',
      invNotes:'',
      invPmem: '',
      testCompany:'',
      file: '',
      iconPath: '',
      imgUrl: '',
      cCode: '',
      sCode: '',
      ards: '',
      area: '',
      city: '',
      zip: '',
      statesArr: [],
      vType: '',
      companyName: '',
      client: '',
      vName: '',
      emId: '',
      mobCc: '',
      mobNum: '',
      errMsg: '',
      invWith: '',
      round: '',
      leadObj: {}
    };
    this.fileInput = React.createRef();
  }

  componentDidMount = async () => {
    const ui = await localForage.getItem('userInfo');
    const userInfo = ui.value || {};
    this.setState({ userInfo });
    this.getSubView();
  }
  getSubView = () => {
    this.props.GetB2BSubView(this.props.id, (resObj) => {      
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        const initialData = this.setData(data);
        this.setState({ ...initialData, initialData, subObj: data });
        this.getB2bLeadData(data.lead);
      }
    })
  }
  setData = (resData) => {
    const { userInfo } = this.state
    const statesArr = resData.cCode ? States[resData.cCode] : [];
    const skills = resData.skills.split(', ').map(skill => ({ label: skill, value: skill }));
    return {
      canName: resData.canName,
      canMobNum: resData.canPhNum,
      jobTitle: resData.jobTitle,
      jobId: resData.jobId,
      skills,
      jobDesc: resData.jobDesc,
      cCode: resData.cCode,
      sCode: resData.sCode,
      statesArr,
      ards: resData.hNum,
      area: resData.area,
      city: resData.city,
      zip: resData.zip,
      vType: resData.vType,
      companyName: resData.vName,
      client: resData.vClient,
      vName: resData.vcPerson,
      emId: resData.vcEmail,
      mobCc: resData.vcMobCc,
      mobNum: resData.vcMobNum,
    }
  }

 getB2bLeadData = (id) => {
  this.props.getB2BLeadView(id, (resObj) => {    
    if (resObj.status == '200') {
      const data = resObj.resData.result;
      this.setState({ leadObj: data });
    }
  })
 }
  setStateData = (data) => this.setState({ ...data });
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
    const { scrType, invDate, invTime, timeZone, dur, canName, canMobNum, jobTitle, jobId, skills, jobDesc, invNotes, invPmem, testCompany, cCode, statesArr, sCode, ards, area, city, zip, vType, companyName, client, vName, emId, mobCc, mobNum, subObj, file, hrs, mins, invWith, round, leadObj, imgUrl} = this.state;
    const { _id, subId, euUser, euName, canPhNum, canEmail, euPrimary, euRefID } = subObj; 
    const countryObj = cCode ? Countries && Countries.length > 0 && Countries.find(item => item.code == cCode) : {};
    const stateObj = statesArr && statesArr.length > 0 ? statesArr.find(item => item.stateCode == sCode) : {};
    const skillsStr = skills && skills.length > 0 ? skills.map(skill => skill.value).join(', ') : '';
    const phRegex = /^\d{10}$/;
    const duration = ((hrs ? parseInt(hrs, 10) : 0) * 60) + (mins ? parseInt(mins, 10) : 0);    
    if (!scrType) {
      this.setState({ errMsg: 'Screening Type is required' });
    } else if (!invWith) {
      this.setState({ errMsg: 'Interview With is required' });
    } else if (!round) {
      this.setState({ errMsg: 'Interview Round is required' });
    } else if (!invDate) {
      this.setState({ errMsg: 'Scheduled Date is required' });
    } else if (!invTime) {
      this.setState({ errMsg: 'Scheduled Time is required' });
    } else if (!timeZone) {
      this.setState({ errMsg: 'Timezone is required' });
    } else if ((hrs == '' || hrs == 0) && (mins == 0  || mins == '')) {
      this.setState({ errMsg: 'Duration is required' });
    } else if ((hrs == 8 && mins && mins > 0) || (hrs > 8)) {
      this.setState({ errMsg: 'Interview should not exceed 8 hours' });
    } else if (mins > 60) {
      this.setState({ errMsg: 'Interview should not exceed 60 minutes' });
    } else if (!imgUrl) {
      this.setState({ errMsg: 'Interview Invite is required' });
    } else {
      const subData = this.setSubmissionData(subObj);
      const reqBody = {
        process: scrType,
        isDt: `${invDate} ${invTime}`, isDtStr: `${invDate} ${invTime}`,
        iTz: timeZone,
        duration,
        invWith,
        round: round.replace(/\s+$/, ''),
        canName, canPhNum, canEmail,
        // canPhNum: canMobNum,
        jobTitle, jobId, jobDesc,
        skills: skillsStr,
        iStatus: 'Scheduled',
        isNotes: invNotes,
        vType: vType,
        vName: companyName,
        vcPerson: vName,
        vcEmail: emId,
        vcMobCc: mobCc,
        vcMobNum: mobNum,
        vcMobCcNum: mobNum ? mobCc + mobNum : '',
        vClient: client,
        panelMembers: invPmem,
        testCompany: testCompany,
        hNum: ards,
        area, zip,
        state: stateObj?.stateName ? stateObj.stateName : '',
        sCode: sCode,
        city: city,
        country: countryObj?.label ? countryObj.label : '',
        cCode: cCode,
        submission: _id,
        subId: subId,
        lead: subObj.lead,
        leadId: subObj.leadId,
        euUser, euName, euPrimary, euRefID,
        ua: leadObj.ua,

        ...subData,
        prHr: subObj.prHr,
        prNotes: subObj.prNotes,
        prfPath: subObj.prfPath
      }      
      const data = new FormData();
      data.append('intrvwData', JSON.stringify(reqBody));
      data.append('file', file);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    axios.post(config.postB2BInterviewCreateAPI, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/interviews');
          this.setState({ disable: false });
        } else {
          this.setState({ disable: false, errMsg: 'Interview Schedule Failed, Try Again' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: 'Interview Schedule Failed, Try Again', disable: false });
        } else {
          this.setState({ disable: false });
        }
      });
  }
  setSubmissionData = (subObj) => {
    return {
      org : subObj.org,
      orgName : subObj.orgName,
      orgCode : subObj.orgCode,
      team: subObj.team,
      tName: subObj.tName,
      tCode: subObj.tCode,
      obId: subObj.obId,
      obName: subObj.obName,
      obCode: subObj.obCode,
      
      pvipType: subObj.pvipType,
      pvipName: subObj.pvipName,
      pvipcPerson: subObj.pvipcPerson,
      pvipcMobCc: subObj.pvipcMobCc,
      pvipcMobNum: subObj.pvipcMobNum,
      pvipcMobCcNum: subObj.pvipcMobCcNum,
      pvipcEmail: subObj.pvipcEmail,
      pvipClient: subObj.pvipClient,
      pReports: subObj.pReports,

      visaStatus: subObj.visaStatus || '',
      tExp: subObj.tExp || '',
      primSkills: subObj.primSkills || '',
      wrkUrls: subObj.wrkUrls || [],
      wrkAuthExpDtStr: subObj.wrkAuthExpDtStr || '',
      usaNatID: subObj.usaNatID || '',
      unidType: subObj.unidType || '',
      unidExpDtStr: subObj.unidExpDtStr || '',
      resState: subObj.resState || '',
      resScode: subObj.resScode || '',
      certificates: subObj. certificates || [],  

      mVisaStatus: subObj.mVisaStatus,  
      mEmail: subObj.mEmail,
      mMobCc: subObj.mMobCc,
      mMobNum: subObj.mMobNum,
      mTexp: subObj.mTexp,
      mPrimSkills: subObj.mPrimSkills,
      mCurrClient: subObj.mCurrClient,
      mPrevClient: subObj.mPrevClient,
      mWrkUrls: subObj.mWrkUrls,
      mWrkAuthExpDtStr: subObj.mWrkAuthExpDtStr,
      mUsaNatID: subObj.mUsaNatID, 
      mUnidType: subObj.mUnidType,
      mUnidExpDtStr: subObj.mUnidExpDtStr,
      mState: subObj.mState,
      mSCode: subObj.mSCode,
      mJobTitle: subObj.mJobTitle,
      mCertificates: subObj.mCertificates,
    };
  }

  render() {
    return (
      <InterviewCreateComponent
      state={this.state}
      setStateData={this.setStateData}
      handleCreate={this.handleCreate}
      handleOnchange={this.handleOnchange}
      removeImage={this.removeImage}
      fileInput={this.fileInput}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BSubView: (id, callback) => dispatch(GetB2BSubView(id, callback)),
  getB2BLeadView: (id, callback) => dispatch(getB2BLeadView(id, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(InterviewCreate);
