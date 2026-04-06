/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { SubmisEditComponent } from '../../components/submissions';
import { GetB2BSubView } from '../../actions/submissions/SubmissionActions';
import { postB2BSubmissionLeadList } from '../../actions/leads/LeadsAction';
import { PostB2BDropdownsCreateAPI, PostB2BDropdownsListAPI } from '../../actions/dropdowns/DropdownsActions';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';
import States from '../../../public/data/CountryStates.json';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import { setHeadersToken } from '../../hooks/apihooks';

class SubmisEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      subDate: '',
      jobTitle: {label:'', value:''},
      jobId: '',
      status: '',
      sNotes:'',
      skills: [],
      skillOptions: [],
      jobDesc: '',
      prHr: '',
      prNotes: '',
      cCode: '',
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
      mobCc: '+91',
      client: '',
      disable: false,
      errMsg: '',
      userInfo: {},
      consList: [],
      canObj: null,
      file: '',
      iconPath: '',
      imgUrl: '',
      imgId:'',
      initialData:{},
      iPath: '',
      pvipType: '',
      pvipName: '',
      pvipcPerson: '',
      pvipcMobCc: '+1',
      pvipcMobNum: '',
      pvipcMobCcNum: '',
      pvipcEmail: '',
      subObj: {},
      orgId:'',
      rolesObj: {},
      cmnModal: false, cmnValue: '', cmnErrMsg: '', cmnType: '', cmnSkillArr: [], cmnJbTitleArr: []
    };
    this.fileInput = React.createRef();
  }

  componentDidMount = async () => {
    const ui = await localForage.getItem('userInfo');
    const userInfo = ui.value || {};
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'))
    this.setState({ userInfo, rolesObj: {...rolesObj, appAcc} });
    this.getSubList();
    this.getSkillsList();
  }
  getSubList = () => {
    this.props.GetB2BSubView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        const initialData = this.setData(data);
        this.setState({ ...initialData, initialData, subObj: {...data, iconPath: data.prfPath, iPath: data.prfPath}});
      }
    })
  }

  setData = (resData) => {    
    const statesArr = resData.cCode ? States[resData.cCode] : [];
    const skills = resData.skills.split(', ').map(skill => ({ label: skill, value: skill }));
    const file = resData.prfPath ? new File([], resData.prfPath) : null;
    const dt = resData.prfPath ? resData.prfPath.split('/') : '';
    const imgId = resData.prfPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
    const jobTitle = {label: resData.jobTitle, value: resData.jobTitle};
    return {
      subDate: resData.sDtStr,
      jobTitle,
      jobId: resData.jobId,
      status: resData.sStatus,
      skills,
      jobDesc: resData.jobDesc,
      prHr: resData.prHr,
      prNotes: resData.prNotes,
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
      iconPath: resData.prfPath,
      iPath: resData.prfPath,
      imgUrl: resData.prfPath,
      file,
      pvipType: resData.pvipType,
      pvipName: resData.pvipName,
      pvipcPerson: resData.pvipcPerson,
      pvipcMobCc: resData.pvipcMobCc,
      pvipcMobNum: resData.pvipcMobNum,
      pvipcMobCcNum: resData.pvipcMobCcNum,
      pvipcEmail: resData.pvipcEmail,
      cUser: resData.cUser,
      consList: [{label: resData.euName, value: resData.euUser}],
      canObj: {label: resData.euName, value: resData.euUser},
      sNotes: resData.sNotes,
      orgId: resData.orgName
    }
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
  setStateData = (data) => this.setState({ ...data });

  handleCountryChange = (e) => {
    const { value } = e.target;
    const statesArr = value ? States[value] : [];
    this.setState({ cCode: value, statesArr, errMsg: '' });
  }

  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: '', iconPath:'' });
    }
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '', imgUrl: ''});
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleEdit = async () => {
    const { subDate, jobTitle, jobId, status, sNotes, skills, jobDesc, cCode, sCode, adrs, area, city, zip, vType, companyName, vName, emId, mobCc, mobNum, client, userInfo, statesArr, canObj, file, imgUrl, prHr, prNotes, iconPath, iPath, pvipType, pvipName, pvipcPerson, pvipcMobCc, pvipcMobNum, pvipcEmail, subObj, cUser} = this.state;    
    const countryObj = cCode ? Countries && Countries.length > 0 && Countries.find(item => item.code == cCode) : {};
    const stateObj = statesArr && statesArr.length > 0 ? statesArr.find(item => item.stateCode == sCode) : {};
    const skillString = skills && skills.length > 0 ? skills.map(skill => skill.value).join(', ') : '';
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const phRegex = /^\d{10}$/;
    if (canObj == null) {
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
    } else if (!sNotes) {
      this.setState({ errMsg: 'Submission Notes is required' });
    } else if (!jobDesc) {
      this.setState({ errMsg: 'Job Description is required' });
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
      const reqBody = {
        sDt: subDate,
        sDtStr: subDate,
        jobTitle: jobTitle.value,
        jobId,
        skills: skillString,
        jobDesc,
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
        vcMobCcNum: mobNum ? mobCc + mobNum : '',
        vClient: client,
        cUser: cUser ? cUser : userInfo.cUser,
        hNum: adrs,
        area,
        zip,
        state: stateObj?.stateName ? stateObj.stateName : '',
        sCode,
        city,
        cityCode: '',
        country: countryObj?.label ? countryObj.label : '',
        cCode,
        euUser: subObj.euUser,
        euName: subObj.euName,
        euPrimary: subObj.euPrimary,
        euRefID: subObj.euUID,
        lead: subObj._id,
        leadId: subObj.leadId,
        canPhNum: subObj.canPhNum,
        canEmail: subObj.canEmail,
        prHr,
        prNotes,
        iconPath,
        iPath,
        pvipType: (vType == 'Vendor' && (pvipName || pvipcPerson || pvipcMobNum || pvipcEmail)) ? pvipType : '',
        pvipName: vType == 'Vendor' ? pvipName : '',
        pvipcPerson: vType == 'Vendor' ? pvipcPerson : '',
        pvipcMobCc: vType == 'Vendor' ? pvipcMobCc : '',
        pvipcMobNum: vType == 'Vendor' ? pvipcMobNum : '',
        pvipcMobCcNum: vType == 'Vendor' ? pvipcMobNum ? pvipcMobCc + ' ' + pvipcMobNum : '' : '',
        pvipcEmail: vType == 'Vendor' ? pvipcEmail : '',
        sNotes
      }      
      const oldData = {
        sDt: subObj.sDtStr,
        sDtStr: subObj.sDtStr,
        jobTitle: subObj.jobTitle,
        jobId: subObj.jobId,
        skills: subObj.skills,
        jobDesc: subObj.jobDesc,
        cCode: subObj.cCode,
        sCode: subObj.sCode,
        adrs: subObj?.adrs || "",
        area: subObj.area,
        city: subObj.city,
        zip: subObj.zip,
        vType: subObj.vType,
        vName: subObj.vName,
        vcPerson: subObj.vcPerson,
        vcEmail: subObj.vcEmail,
        vcMobCc: subObj.vcMobCc,
        vcMobNum: subObj.vcMobNum,
        vcMobCcNum: subObj.vcMobCcNum,
        vClient: subObj.vClient,
        cUser: subObj.cUser,
        hNum: subObj.hNum,
        area: subObj.area,
        zip: subObj.zip,
        state: subObj.state,
        sCode: subObj.sCode,
        city: subObj.city,
        cityCode: subObj.cityCode,
        country: subObj.country,
        cCode: subObj.cCode,
        euUser: subObj.euUser,
        euName: subObj.euName,
        euPrimary: subObj.euPrimary,
        euRefID: subObj.euUID,
        lead: subObj._id,
        leadId: subObj.leadId,
        canPhNum: subObj.canPhNum,
        canEmail: subObj.canEmail,
        prHr: subObj.prHr,
        prNotes: subObj.prNotes,
        iconPath: subObj?.iconPath || "",
        iPath: subObj?.iPath || "",
        pvipType: subObj.pvipType,
        pvipName: subObj.pvipName,
        pvipcPerson: subObj.pvipcPerson,
        pvipcMobCc: subObj.pvipcMobCc,
        pvipcMobNum: subObj.pvipcMobNum,
        pvipcMobCcNum: subObj.pvipcMobCcNum,
        pvipcEmail: subObj.pvipcEmail,
        sNotes: subObj.sNotes
      }
      if(JSON.stringify(oldData) == JSON.stringify(reqBody)){
        this.setState({ errMsg: "There are no changes"})
      } else {
        const data = new FormData();
        const img = iconPath ? {} : file;
        data.append('submsnData', JSON.stringify(reqBody));
        data.append('file', img);
        const accTkn = await localForage.getItem('accesstoken');
        const ctpb2bat = accTkn?.value || {};
        const ctpb2batoken = ctpb2bat.ctpb2batoken
        const headers = { headers: { ctpb2batoken } };
        this.handleApiCall(data, headers);}
    }
  }
  handleApiCall = async (data, headers) => {
    this.setState({ disable: true });
    const id = this.state.imgId ? this.state.imgId : this.props.id
    axios.put(config.putB2BSubmissionEditAPI + this.props.id + '/' + id, data, headers)
      .then((res) => {                
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/submissions');
          this.setState({ disable: false });
        } else {
          this.setState({ disable: false, errMsg: 'Submission Edit Failed' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ disable: false });
        }
      });
  }

  handleJbTitleChange = (data) => {
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
      const reqBody = { type, name: cmnValue.replace(/\s+$/, '') };
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
    return <SubmisEditComponent
      state={this.state}
      handleEdit={this.handleEdit}
      handleCountryChange={this.handleCountryChange}
      setStateData={this.setStateData}
      handleOnchange={this.handleOnchange}
      removeImage={this.removeImage}
      fileInput={this.fileInput} 
      handleJbTitleChange = {this. handleJbTitleChange} 
      handleCreateSkill={this.handleCreateSkill}/>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BSubView: (id, callback) => dispatch(GetB2BSubView(id, callback)),
  postB2BSubmissionLeadList: (callback) => dispatch(postB2BSubmissionLeadList(callback)),
  PostB2BDropdownsCreateAPI: (body, callback) => dispatch(PostB2BDropdownsCreateAPI(body, callback)),
  PostB2BDropdownsListAPI: (body, callback) => dispatch(PostB2BDropdownsListAPI(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(SubmisEdit);