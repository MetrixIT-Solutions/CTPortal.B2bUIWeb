/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import md5 from 'md5';
import moment from 'moment';

import { AdminUserCreateComponent } from '../../components/adminUsers';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { PostB2BBrchsTotalList } from '../../actions/branches/BranchActions';
import { postB2BRolesActiveList } from '../../actions/roles/RolesActions';
import {postB2BUsersReportList} from '../../actions/users/UsersActions'
import { setHeadersToken } from '../../hooks/apihooks';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';

class AdminUserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgsList: [],
      orgObj: {},
      branchesList: [],
      branchObj: {},
      teamsList: [],
      allTeams: [], 
      teamObj: {},
      rolesList: [],
      org: '',
      obId: '',
      team: [],
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
      workUrl: [],
      uStatus: 'Active',
      file: '',
      imgUrl: '',
      disable: false,
      errMsg: '',
      userInfo: {},
      rolesObj: {},
      userType: '',
      urID: '',
      urSeq: '',
      report: [],
      reportList: [],
      rprtName: '',
      rprtPrimary: '',
      years: 0,
      months: 0,
      descNum: '',
      extnsn: '',
      joinDte: '',
      descLoc: '',
      descNumCode: '+1'
    };
    this.fileInput = React.createRef();
  };
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const urObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...urObj, appAcc };
    this.setOrgsList(userInfo, rolesObj);
    userInfo.userType === 'Employee' && this.setRolesList('Employee');
  }
  setOrgsList = (userInfo, rolesObj) => {
    if(rolesObj?.appAcc) {
      const reqBody = { status: 'Active' };
      this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ userInfo, rolesObj, orgsList: resObj.resData.result });
        } else {
          this.setState({ userInfo, rolesObj, orgsList: [] });
        }
      });
    } else {
      const orgObj = {_id: userInfo.org, orgName: userInfo.orgName, orgCode: userInfo.orgCode};
      this.setState({ userInfo, rolesObj, org: orgObj._id, orgObj });
      this.setTeamsList(orgObj._id, userInfo);
      this.setBranchesList(orgObj._id);
    }
  }
  setRolesList = (userType) => {
    const reqBody = { actPgNum: 1, rLimit: 100, searchStr: '', status: 'Active', userType }
    this.props.postB2BRolesActiveList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesList: resObj.resData.result.rolesList, userType, errMsg: '', userRole: '', team: [], teamObj: {}, report: [], userList: [] });
      } else {
        this.setState({ rolesList: [], userType, errMsg: '', userList: [], userRole: '', team: [], teamObj: {}, report: [], userList: [] });
      }
    });
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  setStateData = (data) => this.setState({ ...data });
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
  handleOnChange = (e, type) => {
    const { value } = e.target;
    const { orgsList, branchesList, teamsList, userInfo } = this.state;
    if (type == 'org') {
      if (value) {
        const orgObj = orgsList && orgsList.length > 0 ? orgsList.find(item => item._id == value) : {};
        this.setState({ org: value, orgObj, errMsg: '', obId: '', team: [], branchObj: {}, teamObj: {} });
        this.setTeamsList(value, userInfo);
        this.setBranchesList(value);
      } else {
        this.setState({ org: '', obId: '', team: '', branchesList: [], teamsList: [], orgObj: {}, branchObj: {}, teamObj: {}, errMsg: '', userList: [], report: [] });
      }
    } else if (type == 'branch') {
      if (value) {
        const branchObj = branchesList && branchesList.length > 0 ? branchesList.find(item => item._id == value) : {};
        this.setState({ obId: value, branchObj, errMsg: '' });
      } else {
        this.setState({ obId: '', branchObj: {}, errMsg: '' });
      }
    } else {
      const teamObj = teamsList && teamsList.length > 0 ? teamsList.find(item => item._id == value) : {};
      value ? this.setState({ team: value, teamObj, errMsg: '' }) : this.setState({ team: '', teamObj: {}, errMsg: '' });
    }
  }
  setTeamsList = (orgID, userInfo) => {
    const reqBody = { status: 'Active', orgID};
    this.props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        const tmData = resObj.resData.result.map(item => ({value: item._id, label: item.potLevel ? (item.oTeam+'('+item.potLevel+')') : item.oTeam, ...item}));
        if(userInfo.userType === 'Employee') {
          const newTeams = [];
          tmData.forEach(tm => {
            const dt = userInfo.teams.filter(utm => tm.potlIds.includes(utm._id) || tm._id == utm._id);
            dt?.length && newTeams.push(tm);
          });
          this.setState({ teamsList: newTeams, allTeams: newTeams, userList: [], report: []})
        } else
          this.setState({ teamsList: tmData, allTeams: tmData, userList: [], report: []});
      } else {
        this.setState({ teamsList: [], userList: [], report: [] });
      }
    });
  }
  setBranchesList = (orgID) => {
    const reqBody = { status: 'Active', orgID };
    this.props.PostB2BBrchsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        this.setState({ branchesList: resObj.resData.result });
      } else {
        this.setState({ branchesList: [] });
      }
    });
  }
  // handleGetCoordinates = (event) => {
  //   if (navigator && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(pos => {
  //       const coords = pos.coords;
  //       this.setState({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude,
  //         errMsg: '',
  //       });
  //     });
  //   }
  //   event.preventDefault();
  // }
  // handleCountryChange = (e) => {
  //   const { value } = e.target;
  //   const cntryObj = Countries.filter(item => item.code == value);
  //   const statesArr = value ? States[value] : [];
  //   this.setState({ country: cntryObj.value, cCode: value, statesArr: statesArr, errMsg: '' });
  // }
  // handleStateChange = (e) => {
  //   const { cCode } = this.state;
  //   const { value } = e.target;
  //   const statesArray = cCode ? States[cCode] : [];
  //   const satesObj = statesArray && statesArray.length > 0 ? statesArray.find(item => item.stateCode == value) : {};
  //   this.setState({ state: satesObj.stateName, sCode: value, errMsg: '' });
  // }
  handleCreateUser = async () => {
    const { orgObj, branchObj, teamObj, org, obId, team, sName, fName, lName, password, mobCc, mobNum, emID, userId, altMobCc, altMobNum, altEmID, dob, gender, /*buildingName, hNum, area, aLocality, zip, country, cCode, state, sCode, city, plusCode, geocoordinates, latitude, longitude,*/ userRole, workUrl, uStatus, file, userInfo, userType, urID, urSeq, report, rprtName, rprtPrimary, pReports,
      years, months, descNum, extnsn, joinDte, descLoc, descNumCode } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    // const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/;
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    const mobValid = /^[0-9]{10}$/;
    const minDate = moment().subtract(18, 'years').format('YYYY-MM-DD');

    if (!org) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (userInfo !== 'Employee' && !userType) {
      this.setState({ errMsg: 'User Type is required' });
    } else if (!userRole) {
      this.setState({ errMsg: 'User Role is required' });
    } else if (!fName) {
      this.setState({ errMsg: 'First Name is required' });
    } else if (!lName) {
      this.setState({ errMsg: 'Last Name is required' });
    } else if (userType == 'Employee' && !team.length) {
      this.setState({ errMsg: 'Team is required' });
    } else if (userType == 'Employee' && !report.length) {
      this.setState({ errMsg: 'Report to is required' });
    } else if (!userId) {
      this.setState({ errMsg: 'User Id is required' });
    } else if (!password) {
      this.setState({ errMsg: 'Password is required' });
    } else if (password.toLowerCase().includes('password')) {
      this.setState({ errMsg: "Password Can not contain 'password'." });
    } else if (!pswdRegex.test(password)) {
      // this.setState({ errMsg: 'Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character.' });
      this.setState({ errMsg: "Password is not matching it's rules." });
    } else if (!emID) {
      this.setState({ errMsg: 'Email is required' });
    } else if (emID && !emailValid.test(emID)) {
      this.setState({ errMsg: 'Invalid Email' })
    } else if (!mobNum) {
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
      const reports = [], pReports = [], teams = [], pTeamIDs = []
      let rprtNames = '' , tNames = '';
      report.length > 0 && report.forEach(item => {
        const prs = [...item.pReports, item._id];
        reports.push({_id: item._id, rprtName: item.name, rprtPrimary: item.myPrimary, pReports: [...new Set(prs)]});
        pReports.push(...item.pReports, item._id);
        rprtNames = rprtNames + item.name + ';'
      });
      team.length > 0 && team.forEach(item => {
        const pts = [...item.potlIds, item._id];
        teams.push({_id: item._id, tName: item.oTeam, tCode: item.otCode, pTeamIDs: [...new Set(pts)]});
        pTeamIDs.push(...item.potlIds, item._id);
        tNames = tNames + item.oTeam + ';'
      });
      this.setState({ disable: true });
      const reqBody = {
        org, orgName: orgObj.orgName, orgCode: orgObj.orgCode,
        obId, obName: branchObj._id ? branchObj.obName : '', obCode: branchObj._id ? branchObj.obCode : '',
        // team, tName: teamObj._id ? teamObj.oTeam : '', tCode: teamObj._id ? teamObj.otCode : '',
        sName, fName, lName, name: fName + ' ' + lName,
        password: md5(password),
        mobCc: mobNum ? mobCc : '', mobNum, mobCcNum: mobNum ? mobCc + ' ' + mobNum : '',
        altMobCc: altMobNum ? altMobCc : '', altMobNum, altMobCcNum: altMobNum ? altMobCc + ' ' + altMobNum : '',
        emID, refUID: (userId).toLowerCase(), altEmID,
        dob, dobStr: dob,
        gender, wrkUrls: workUrl,
        uStatus, userType,
        urID, urSeq, userRole,
        pReports: [...new Set(pReports)],
        reports,
        rprtNames,
        pTeamIDs: [...new Set(pTeamIDs)],
        teams,
        tNames,
        years: Number(years), months: Number(months), descNum, extnsn, joinDte, descLoc,
        descNumCode: descNum ? descNumCode : '', joinDtStr: joinDte ? moment(joinDte).format('YYYY-MM-DD') : '',
        descCcNum: descNum ? descNumCode+ ' '+ descNum : ''
      };      
      const data = new FormData();
      data.append('userData', JSON.stringify(reqBody));
      data.append('iconFile', file);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken;
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = (data, headers) => {
    axios.post(config.postB2BUserCreateAPI, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/admin-users');
          this.setState({ disable: false });
        } else if(res.status == '105') {
          this.setState({ errMsg: res?.resData?.message, disable: false });
        } else {
          this.setState({ errMsg: 'User create failed', disable: false });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '105') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ errMsg: 'User create failed', disable: false });
        }
      });
  }

  handleUserType = (e) => {
    const userType = e.target.value;
    if (userType) this.setRolesList(userType);
    else this.setState({rolesList: [], userType: '', team: [], teamObj: {}, report: [], userList: []});
  }
  handleRolesChange = (e) => {
    const userRole = e.target.value;
    if (userRole) {
      const {team, teamsList} = this.state;
      this.setReportList(userRole, team, teamsList);
    } else {
      this.setState({urID: '', urSeq: '', userRole: '', errMsg: '', report: [], userList: []});
    } 
  }
  handleReportChange = (report) => {
    if (report && report.length < 6) {
      let userList = this.state.reportList;
      report.length && report.forEach(item => {
        userList = this.state.userList.filter(td => !item.pReports.includes(td._id));
        report = report.filter(td => !item.pReports.includes(td._id));
      });
      this.setState({report, userList, errMsg: ''});
    } else {
      this.setState({report: [], errMsg: 'Report To limit is 5 users', userList: this.state.reportList});
    }
  }

  handleTeamChange = (team) => {
    if (team.length) {
      let tmList = this.state.allTeams;
      team.length && team.forEach(item => {
        tmList = this.state.teamsList.filter(td => !item.potlIds.includes(td._id));
        team = team.filter(td => !item.potlIds.includes(td._id));
      });
      this.setReportList(this.state.userRole, team, tmList);
    } else {
      this.setReportList(this.state.userRole, [], this.state.allTeams);
    }
  }
  setReportList = (userRole, team, teamsList) => {
    const pTeamIDs = [];
    const {org, userType} = this.state;
    if (org && userRole && ((userType == 'Employee' && team.length) || userType === 'Management')) {
      team.length > 0 ? team.forEach(item => pTeamIDs.push(item._id, ...item.potlIds)) : [];
      const rObj = this.state.rolesList.find(item => item.rName == userRole);
      const reqBody = {org, userType, urSeq: rObj.rSeq, pTeamIDs};
      this.props.postB2BUsersReportList(reqBody, resObj => {
        if (resObj.status == '200') {
          const userList = [];
          resObj.resData.result.map(item => {
            const tmsArr = item?.userType === 'Employee' ? item.teams.filter(tm => pTeamIDs.includes(tm._id)) : ['Management'];
            tmsArr?.length && userList.push({value: item._id, label: item.name + '('+item.refUID.split(':')[1]+')', ...item})
          });
          this.setState({urID: rObj._id, urSeq: rObj.rSeq, userRole, userList, reportList: userList, team, errMsg: '', teamsList, report: []});
        } else {
          this.setState({urID: rObj._id, urSeq: rObj.rSeq, userRole, userList: [], reportList: [], team, errMsg: '', teamsList, report: []});
        }
      });
    } else {
      this.setState({userRole, team, errMsg: '', teamsList, userList: [], report: []})
    }
  }

  render() {    
    return (
      <AdminUserCreateComponent
        state={this.state}
        fileInput={this.fileInput}
        handleOnChange={this.handleOnChange}
        handleCreateUser={this.handleCreateUser}
        onImageChange={this.onImageChange}
        removeImage={this.removeImage}
        handleRouteHome={this.handleRouteHome}
        handleUserType={this.handleUserType}
        setStateData={this.setStateData}
        handleRolesChange={this.handleRolesChange}
        handleReportChange={this.handleReportChange}
        handleTeamChange={this.handleTeamChange}
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
});

export default connect(mapStateToProps, mapDistachToProps)(AdminUserCreate);