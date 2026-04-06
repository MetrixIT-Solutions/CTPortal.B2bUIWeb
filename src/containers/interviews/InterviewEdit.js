/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { InterviewEditComponent } from '../../components/interviews';
import { GetB2BInvView } from '../../actions/interviews/InterviewActions';
import States from '../../../public/data/CountryStates.json';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';
import { setHeadersToken } from '../../hooks/apihooks';

class InterviewEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initialData: {},
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
      imgId: '',
      iPath: '',
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
      round: ''
    };
    this.fileInput = React.createRef();
  }
  componentDidMount = () => {
    this.getInvList();
  }
  getInvList = () => {
    this.props.GetB2BInvView(this.props.id, (resObj) => {            
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        const initialData = this.setData(data);
        this.setState({ ...initialData, initialData: data });
      }
    })
  }
  setData = (resData) => {
    const invArr = resData.isDtStr.split(' ');
    const statesArr = resData.cCode ? States[resData.cCode] : [];
    const skills = resData.skills.split(', ').map(skill => ({ label: skill, value: skill }));
    const file = resData.ifPath ? new File([], resData.ifPath) : null;
    const dt = resData.ifPath ? resData.ifPath.split('/') : '';
    const imgId = resData.ifPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
    const hrs = Math.floor(resData.duration / 60);
    const mins = resData.duration % 60; 
    return {
      scrType: resData.process,
      invDate: invArr[0],
      invTime: invArr[1],
      timeZone: resData.iTz || 'EST',
      // dur: resData.duration,
      hrs, mins,
      canName: resData.canName,
      canMobNum: resData.canPhNum,
      canEmail: resData.canEmail,
      jobTitle: resData.jobTitle,
      jobId: resData.jobId,
      skills,
      jobDesc: resData.jobDesc,
      invPmem: resData.process.includes('Interview') ? resData.panelMembers : '',
      testCompany: resData.process.includes('Test') ? resData.testCompany : '',
      invNotes: resData.isNotes,
      cCode: resData.cCode,
      sCode: resData.sCode,
      statesArr,
      adrs: resData.hNum,
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
      imgId,
      iconPath: resData.ifPath,
      iPath: resData.ifPath,
      imgUrl: resData.ifPath,
      file,
      invWith: resData.invWith,
      round: resData.round
    }
  }
  setStateData = (data) => this.setState({ ...data });
  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: '', iconPath: '' });
    }
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '', imgUrl:'' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleInvChange = (e) => {
    const { value } = e.target;
    this.setState({ scrType: value, errMsg: '' });
    if (value.includes('Interview')) {
      this.setState({ scrType: value, errMsg: '', testCompany: '' });
    } else {
      this.setState({ scrType: value, errMsg: '', invPmem: '' });
    }
  }
  handleEdit = async () => {
    const { scrType, invDate, invTime, timeZone, dur, hrs, mins, canName, canMobNum, jobTitle, jobId, skills, jobDesc, invNotes, invPmem, testCompany, cCode, statesArr, sCode, ards, area, city, zip, vType, companyName, client, vName, emId, mobCc, mobNum, file, iconPath, iPath, canEmail, initialData, invWith, round, imgUrl } = this.state;
    const countryObj = cCode ? Countries && Countries.length > 0 && Countries.find(item => item.code == cCode) : {};
    const stateObj = statesArr && statesArr.length > 0 ? statesArr.find(item => item.stateCode == sCode) : {};
    const skillsStr = skills && skills.length > 0 ? skills.map(skill => skill.value).join(', ') : '';
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
      const reqBody = {
        process: scrType,
        isDt: `${invDate} ${invTime}`, isDtStr: `${invDate} ${invTime}`,
        iTz: timeZone,
        duration,
        invWith, 
        round: round.replace(/\s+$/, ''),
        canName,
        canPhNum: canMobNum,
        canEmail,
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
        iconPath,
        iPath
      }
      const oldData = {
        process: initialData.process,
        isDt: initialData.isDtStr,
        isDtStr: initialData.isDtStr,
        iTz: initialData.iTz,
        duration: initialData.duration,
        canName: initialData.canName,
        canPhNum: initialData.canPhNum,
        canEmail: initialData.canEmail,
        jobTitle: initialData.jobTitle,
        jobId: initialData.jobId, 
        jobDesc: initialData.jobDesc,
        skills: initialData.skills,
        iStatus: initialData.iStatus,
        isNotes: initialData.isNotes,
        vType: initialData.vType,
        vName: initialData.vName,
        vcPerson: initialData.vcPerson,
        vcEmail: initialData.vcEmail,
        vcMobCc: initialData.vcMobCc,
        vcMobNum: initialData.vcMobNum,
        vcMobCcNum: initialData.vcMobCcNum,
        vClient: initialData.vClient,
        panelMembers: initialData.pannelMembers || "",
        testCompany: initialData.testCompany,
        hNum: initialData.hNum,
        area: initialData.area, 
        zip: initialData.zip,
        state: initialData.state,
        sCode: initialData.sCode,
        city: initialData.city,
        country: initialData.country,
        cCode: initialData.cCode,
        iconPath: initialData.ifPath,
        iPath: initialData.ifPath,
        invWith: initialData.invWith,
        round: initialData.round
      }
      if(JSON.stringify(reqBody) == JSON.stringify(oldData)){
        this.setState({ errMsg: "There are no Changes"})
      } else{
        const iSchData= initialData.iSchedules && initialData.iSchedules.length ?  initialData.iSchedules.filter(item => item._id !== initialData.round) : [];
        const sheduleData = this.setScheduledData(reqBody, iSchData);
        reqBody['iSchedules'] = sheduleData;
        const data = new FormData();
        const img = iconPath ? {} : file;
        data.append('intrvwData', JSON.stringify(reqBody));
        data.append('file', img);
        const accTkn = await localForage.getItem('accesstoken');
        const ctpb2bat = accTkn?.value || {};
        const ctpb2batoken = ctpb2bat.ctpb2batoken
        const headers = { headers: { ctpb2batoken } };
        this.handleApiCall(data, headers);
      }
    }
  }

  setScheduledData = (reqBody, schData) => {
    const data = [{
      _id: reqBody.round,
      process: reqBody.process,
      invWith: reqBody.invWith,
      round: reqBody.round,
      isDt: reqBody.isDt,
      isDtStr: reqBody.isDtStr,
      iTz: reqBody.iTz,
      duration: reqBody.duration,
      isNotes: reqBody.iNotes || '',
    }, ...schData];
    return data
  }

  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    const id = this.state.imgId ? this.state.imgId : this.props.id
    axios.put(config.putB2BInterviewUpdateAPI + this.props.id + '/' + id, data, headers)
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
  render() {
    return <InterviewEditComponent 
    state={this.state}
    setStateData={this.setStateData}
    handleEdit={this.handleEdit}
    handleOnchange={this.handleOnchange}
    removeImage={this.removeImage}
    handleInvChange={this.handleInvChange}
    fileInput={this.fileInput}/>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BInvView: (id, callback) => dispatch(GetB2BInvView(id, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InterviewEdit);
