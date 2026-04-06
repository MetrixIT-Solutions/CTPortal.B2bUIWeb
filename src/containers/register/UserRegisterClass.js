/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
// import axios from 'axios';
import { connect } from 'react-redux';
import md5 from 'md5';
import moment from 'moment';

import { UserRegisterComponent } from '../../components/register/Index';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { PostB2BBrchsTotalList } from '../../actions/branches/BranchActions';
import { postB2BRolesActiveList } from '../../actions/roles/RolesActions';
import { postB2BUsersReportList } from '../../actions/users/UsersActions'
import { GetB2BRegisterUserData, putRegisterUsrUpdate } from '../../actions/users/UsersActions';
// import { setHeadersToken } from '../../hooks/apihooks';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
// import config from '../../../config/apis.json';

class UserRegisterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      orgsList: [],
      orgObj: {},
      branchesList: [],
      branchObj: {},
      teamsList: [],
      teamObj: {},
      rolesList: [],
      b2b: '',
      b2bCode: '',
      org: '',
      orgName: '',
      orgCode: '',
      obId: '',
      obName: '',
      obCode: '',
      teams: [],
      tName: '',
      tCode: '',
      name: '',
      sName: '',
      fName: '',
      lName: '',
      password: '',
      mobCc: '+1',
      mobNum: '',
      emID: '',
      userId: '',
      altMobCc: '+1',
      altMobNum: '',
      altEmID: '',
      dob: '',
      gender: '',
      userRole: '',
      workUrl: '',
      uStatus: 'Submitted',
      file: '',
      imgUrl: '',
      disable: false,
      errMsg: '',
      userInfo: {},
      userType: '',
      urID: '',
      urSeq: '',
      report: [],
      rprtName: '',
      rprtPrimary: '',
      pReports: [],
      regUsrData: {},
      recordId: '',
      years: 0, months: 0, descNum: '', extnsn: '', joinDte: '', descLoc: '', descNumCode: '+1'
    };
    this.fileInput = React.createRef();
  };
  componentDidMount = async () => {  
    this.getRegsiterUsrData();
  }
  getRegsiterUsrData = () => {    
    const id = this.props.id;
    this.props.GetB2BRegisterUserData(id, (resObj) => {
      if (resObj.status == '200') {
        this.setData(resObj.resData.result);
      } else {
        this.setState({ errMsg: 'Link expired, please contact support' });
      }
    });
  }

  setData = (data) => {
    const report = data.reports.map((item) => ' '+item.rprtName);    
    const setData = {
      b2b: data.b2b,
      b2bCode: data.b2bCode,
      org: data.orgName,
      obId: data.obName,
      teams: data.teams,
      userRole: data.userRole,
      report,
      emID: data.emID,
      recordId: data._id,
      fName: data.fName,
      lName: data.lName,
      name: data.fName + ' ' + data.lName
    }
    this.setState({ ...setData });
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  setStateData = (data) => {
    this.setState({ ...data });
  }
  onImageChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      this.setState({ errMsg: '', file, imgUrl });
    }
  }
  removeImage = () => {
    this.setState({ imageUrl: null, errMsg: '', file: null });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleCreateUser = async () => {
    const {b2bCode, sName, fName, lName, password, mobCc, mobNum, userId, altMobCc, altMobNum, altEmID, dob, gender, workUrl, uStatus, recordId, id, joinDte, descNum, extnsn, years, months, descLoc, descNumCode } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    const mobValid = /^[0-9]{10}$/;
    const minDate = moment().subtract(18, 'years').format('YYYY-MM-DD');

    if(!b2bCode) {
      this.setState({ errMsg: 'Link expired, please contact support' });
    } else if (!fName) {
      this.setState({ errMsg: 'First Name is required' });
    } else if (!lName) {
      this.setState({ errMsg: 'Last Name is required' });
    } else if (!userId) {
      this.setState({ errMsg: 'User Id is required' });
    } else if (!password) {
      this.setState({ errMsg: 'Password is required' });
    } else if (password.toLowerCase().includes('password')) {
      this.setState({ errMsg: "Password Can not contain 'password'." });
    } else if (!passRegex.test(password)) {
      this.setState({ errMsg: 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.' });
    }  else if (!mobNum) {
      this.setState({ errMsg: 'Mobile Number is required' });
    } else if (!mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' })
    } else if (!dob) {
      this.setState({ errMsg: 'Date of birth is required' });
    } else if (dob > minDate) {
      this.setState({ errMsg: 'You must be at least 18 years old. Please check your date of birth.' });
    } else if (!gender) {
      this.setState({ errMsg: 'Gender is required' });
    } else if (altEmID && !emailValid.test(altEmID)) {
      this.setState({ errMsg: 'Invalid alternate email' })
    } else if (altMobNum && !mobValid.test(altMobNum)) {
      this.setState({ errMsg: 'Please enter a valid alternate mobile number' })
    } else if (workUrl.length < 1) {
      this.setState({ errMsg: 'Linkedin ID is required' });
    } else {
      this.setState({ disable: true });
      const reqBody = {
        name: fName + ' ' + lName,
        sName,
        fName,
        lName,
        password: md5(password),
        mobCc: mobNum ? mobCc : '',
        mobNum,
        mobCcNum: mobNum ? mobCc + ' ' + mobNum : '',
        refUID: b2bCode+':'+(userId).toLowerCase(),
        altMobCc: altMobNum ? altMobCc : '',
        altMobNum,
        altMobCcNum: altMobNum ? altMobCc + ' ' + altMobNum : '',
        altEmID,
        dob,
        dobStr: dob,
        gender,
        wrkUrls: workUrl ? [workUrl] : [],
        uStatus, years: Number(years), months: Number(months), descNum, extnsn, joinDte, descLoc,
        descNumCode: descNum ? descNumCode : '', descCcNum: descNum ? descNumCode+ ' '+ descNum : '',
        joinDtStr: joinDte
      };
      this.props.putRegisterUsrUpdate(recordId+'/'+id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          hashHistory.push('/success');
        } else if(resObj.status == '105') {
          this.setState({errMsg: 'Account already exists with the given User ID.'});
        } else {
          this.setState({errMsg: 'Submit failed'});
        }
      });
    }
  }

  render() {
    return (
      <UserRegisterComponent
        state={this.state}
        fileInput={this.fileInput}
        handleCreateUser={this.handleCreateUser}
        onImageChange={this.onImageChange}
        removeImage={this.removeImage}
        handleRouteHome={this.handleRouteHome}
        setStateData={this.setStateData}
      />
    )
  };
};

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback)),
  PostB2BBrchsTotalList: (body, callback) => dispatch(PostB2BBrchsTotalList(body, callback)),
  postB2BRolesActiveList: (body, callback) => dispatch(postB2BRolesActiveList(body, callback)),
  postB2BUsersReportList: (body, callback) => dispatch(postB2BUsersReportList(body, callback)),
  GetB2BRegisterUserData: (id, callback) => dispatch(GetB2BRegisterUserData(id, callback)),
  putRegisterUsrUpdate: (recordId, body, callback) => dispatch(putRegisterUsrUpdate(recordId, body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(UserRegisterClass);