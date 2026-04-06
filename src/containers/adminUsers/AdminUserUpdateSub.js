/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import { AdminUserUpdateComponent } from '../../components/adminUsers';
import { GetB2BUserView } from '../../actions/users/UsersActions';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { PostB2BBrchsTotalList } from '../../actions/branches/BranchActions';
import { postB2BRolesActiveList } from '../../actions/roles/RolesActions';
import {postB2BUsersReportList} from '../../actions/users/UsersActions'
import { setHeadersToken } from '../../hooks/apihooks';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';

class AdminUserUpdateSub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      orgsList: [],
      orgObj: {},
      branchesList: [],
      teamsList: [],
      allTeams: [],
      teamObj: {},
      rolesList: [],
      org: '',
      orgName: '',
      orgCode: '',
      obId: '',
      obName: '',
      obCode: '',
      team: '',
      tName: '',
      tCode: '',
      name: '',
      sName: '',
      fName: '',
      lName: '',
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
      imgId: '',
      iconPath: '', 
      iPath: '',
      disable: false,
      errMsg: '',
      userInfo: {},
      urID: '',
      urSeq: '',
      report: [],
      reportList: [],
      rprtName: '',
      rprtPrimary: '',
      pReports: [],
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
    this.getViewData(userInfo, rolesObj);
  }

  getViewData = (userInfo, rolesObj) => {
    this.props.GetB2BUserView(this.props.id, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result;
        // const jDate = resData.joinDtStr ? moment(resData.joinDtStr).format('YYYY-MM-DD') : null;
        const file = resData.piPath ? new File([], resData.piPath) : null;
        const dt = resData.piPath ? resData.piPath.split('/') : '';
        const imgid = resData.piPath ? dt.length > 2 ? dt[dt.length - 2] : '' : '';
        const refuId = resData.uStatus !== 'Open' ? resData.refUID.split(':') : '';
        const workUrl =  resData.wrkUrls.length ? resData.wrkUrls[0] : [];
        const report = resObj.resData.result?.reports.length ? resObj.resData.result?.reports.map(item => ({value: item._id, label: item.rprtName, _id: item._id, name: item.rprtName, myPrimary: item.rprtPrimary, pReports: item.pReports})) : [];
        const team = resObj.resData.result?.teams.length ? resObj.resData.result?.teams.map(item => ({value: item._id, label: item.tName, _id: item._id, oTeam: item.tName, otCode: item.tCode, potlIds: item.pTeamIDs})) : []
        this.setOrgsList(resObj.resData.result, userInfo, rolesObj);
        this.setRolesList(resData.userType, resData.userRole, report, team);
        this.setState({ userInfo, rolesObj, userData: resObj.resData.result, ...resObj.resData.result, file, iconPath: resData.piPath, iPath: resData.piPath, imgid, userId: refuId && refuId.length ? refuId[1] : '', dob: resData.dobStr, workUrl, userType: resData.userType, years: resData?.expYear || 0, months: resData?.expMonth || 0, joinDte: resData?.joinDtStr || '', descNumCode: resData?.descCc || '+1', descNum: resData?.descNum || '', extnsn: resData?.descExtnsn || '', descLoc: resData?.descLoc || ''});
      } else {
        this.setState({ userInfo, rolesObj, userData: {} });
      }
    });
  }

  setOrgsList = (userData, userInfo, rolesObj) => {
    // if(rolesObj?.appAcc) {
    //   const reqBody = { status: 'Active' };
    //   this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
    //     if (resObj.status === '200') {
    //       this.setState({ orgsList: resObj.resData.result });
    //     } else {
    //       this.setState({ orgsList: [] });
    //     }
    //   });
    //   this.setTeamsList(userData.org, '');
    //   this.setBranchesList(userData.org);
    // } else {
      const orgObj = {_id: userData.org, orgName: userData.orgName, orgCode: userData.orgCode};
      this.setState({ org: orgObj._id, orgObj });
      this.setTeamsList(orgObj._id, userInfo);
      this.setBranchesList(orgObj._id);
    // }
  }
  setRolesList = (userType, userRole, report, team) => {
    const reqBody = { actPgNum: 1, rLimit: 100, searchStr: '', status: 'Active', userType };
    this.props.postB2BRolesActiveList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.handleReportList(resObj.resData.result.rolesList, userType, userRole, report, team);
      } else {
        this.setState({ rolesList: [], userType, userRole, userList: [], report, team });
      }
    });
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
      this.setState({ errMsg: '', file, imgUrl, iconPath: '' });
    }
  };
  removeImage = () => {
    this.setState({ imageUrl: null, errMsg: '', file: null, iconPath: ''});
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }
  handleOnChange = (e, type) => {
    const { value } = e.target;
    const { userInfo, orgsList, branchesList, teamsList } = this.state;
    if (type == 'org') {
      if (value) {
        const orgObj = orgsList && orgsList.length > 0 ? orgsList.find(item => item._id == value) : {};
        this.setState({ org: value, orgObj, errMsg: '', obId: '', obName: '', obCode: '', team: [], teamObj: {}, report: [], userType: '', userRole: '', userList: [] });
        this.setTeamsList(value, userInfo);
        this.setBranchesList(value);
      } else {
        this.setState({ org: '', obId: '', obName: '', obCode: '', team: [], branchesList: [], teamsList: [], orgObj: {}, teamObj: {}, errMsg: '',  report: [], userType: '', userRole: '', userList: []});
      }
    } else if (type == 'branch') {
      if (value) {
        const branchObj = branchesList && branchesList.length > 0 ? branchesList.find(item => item._id == value) : {};
        this.setState({ obId: value, obName: branchObj?.obName, obCode: branchObj?.obCode, errMsg: '' });
      } else {
        this.setState({ obId: '', obName: '', obCode: '', errMsg: '' });
      }
    } else {
      const teamObj = teamsList && teamsList.length > 0 ? teamsList.find(item => item._id == value) : {};
      value ? this.setState({ team: value, teamObj, errMsg: '' }) : this.setState({ team: [], teamObj: {}, errMsg: '',  report: [], reportList: [], userList: [] });
    }
  }
  setTeamsList = (orgID, userInfo) => {
    const reqBody = { status: 'Active', orgID };
    this.props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        const tmData = resObj.resData.result.map(item => ({value: item._id, label: item.potLevel ? (item.oTeam+'('+item.potLevel+')') : item.oTeam, ...item}));
        if(userInfo.userType === 'Employee') {
          const newTeams = [];
          tmData.forEach(tm => {
            const dt = userInfo.teams.filter(utm => tm.potlIds.includes(utm._id) || tm._id == utm._id);
            dt?.length && newTeams.push(tm);
          });
          this.setState({ teamsList: newTeams, allTeams: newTeams})
        } else
          this.setState({ teamsList: tmData, allTeams: tmData});
      } else {
        this.setState({ teamsList: [], allTeams: []});
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

  handleUpdateUser = async () => {
    const { orgObj, teamObj, org, obId, obName, obCode, team, sName, fName, lName, mobCc, mobNum, emID, userId, altMobCc, altMobNum, altEmID, dob, gender, userType, /*buildingName, hNum, area, aLocality, zip, country, cCode, state, sCode, city, plusCode, geocoordinates, latitude, longitude,*/ userRole, workUrl, uStatus, file, iconPath, iPath, userInfo, urID, urSeq, report, rprtName, rprtPrimary, pReports,
      years, months, descNum, extnsn, joinDte, descLoc, descNumCode, userData } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const mobValid = /^[0-9]{10}$/;
    const minDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
    
    const str =  userData.refUID;
    const result = str.replace('tsit:', '');

    const oldData = {
      userRole: userData.userRole,
      emID: userData.emID,
      userId: result,
      name: userData.fName + ' ' + userData.lName,
      chngNumber: userData.mobCc + ' ' + userData.mobNum,
      officeNum: userData.descCcNum,
      extnsn: userData.descExtnsn
    };
    const newData = {
      userRole, 
      emID,
      userId,
      name: fName + ' ' + lName,
      chngNumber: mobCc + ' ' + mobNum,
      officeNum: descNum ? descNumCode + ' ' + descNum : '',
      extnsn
    };
    const checkData = JSON.stringify(oldData) === JSON.stringify(newData);

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
      const reports = [], pReports = [], teams = [], pTeamIDs = [];
      let rprtNames = '' , tNames = '';
        report.length > 0 && report.forEach(item => {
        const prs = [...item.pReports, item._id];
        reports.push({_id: item._id, rprtName: item.name, rprtPrimary: item.myPrimary, pReports: [...new Set(prs)]});
        pReports.push(...item.pReports, item._id);
        rprtNames = rprtNames + item.name + ';';
      });
      team.length > 0 && team.forEach(item => {
        const pts = [...item.potlIds, item._id];
        teams.push({_id: item._id, tName: item.oTeam, tCode: item.otCode, pTeamIDs: [...new Set(pts)]});
        pTeamIDs.push(...item.potlIds, item._id);
        tNames = tNames + item.oTeam + ';';
      });
      this.setState({ disable: true });
      const reqBody = {
        org,
        orgName: orgObj._id ? orgObj.orgName : '',
        orgCode: orgObj._id ? orgObj.orgCode : '',
        obId, obName, obCode,
        pReports: [...new Set(pReports)],
        reports, rprtNames,
        pTeamIDs: [...new Set(pTeamIDs)],
        teams, tNames,
        name: fName + ' ' + lName,
        sName,
        fName,
        lName,
        mobCc: mobNum ? mobCc : '',
        mobNum,
        mobCcNum: mobNum ? mobCc + ' ' + mobNum : '',
        emID,
        refUID: (userId).toLowerCase(),
        altMobCc: altMobNum ? altMobCc : '',
        altMobNum,
        altMobCcNum: altMobNum ? altMobCc + ' ' + altMobNum : '',
        altEmID,
        dob,
        dobStr: dob,
        gender,
        userRole,
        wrkUrls: workUrl,
        uStatus,
        iPath,
        iconPath,
        userType,
        urID,
        urSeq, 
        years: Number(years), months: Number(months), descNum, extnsn, joinDte: joinDte || null, descLoc,
        descNumCode: descNum ? descNumCode : '', joinDtStr: joinDte ? moment(joinDte).format('YYYY-MM-DD') : '',
        descCcNum: descNum ? descNumCode + ' ' + descNum : '',
        checkData
      };
      const img = iconPath ? {} : file;
      const data = new FormData();
      data.append('userData', JSON.stringify(reqBody));
      data.append('iconFile', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = (data, headers) => {
    const { imgId } = this.state;
    const imageId = imgId ? imgId : this.props.id;
    axios.put(config.putB2BUserUpdateAPI + imageId +  '/' + this.props.id + '/update', data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          hashHistory.push('/admin-users');
          this.setState({ disable: false });
        } else if(res.status == '105') {
          this.setState({ errMsg: res?.resData?.message, disable: false });
        } else {
          this.setState({ errMsg: 'User update failed', disable: false });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '105') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ errMsg: 'User update failed', disable: false });
        }
      });
  }
  
  handleUserType = (e) => {
    const userType = e.target.value;
    if (userType) { 
      this.setRolesList(userType, '', [], []);
    } else {
      this.setState({rolesList: [], userType: '', report: [], userList: [], team: []});
    }
  }

  handleRolesChange = (e) => {
    const userRole = e.target.value;
    if (userRole) {
      const {team} = this.state;
      this.handleReportList(this.state.rolesList, this.state.userType, userRole, [], team);
    } else {
      this.setState({urID: '', urSeq: '', userRole: '', userList: [], errMsg: ''});
    } 
  }

  handleReportList = (rolesList, userType, userRole, report, team) => {
    if (userRole) {
      let tmList = this.state.allTeams;
      team.length && team.forEach(item => {
        const pIds = item?.potlIds.filter(id => id !==item._id)
        tmList = tmList.filter(td => !pIds.includes(td._id));
      });
      this.setReportList(rolesList, userType, userRole, team, tmList, report);
    } else {
      this.setState({urID: '', urSeq: '', userRole, userList: [], rolesList, userType, errMsg: '', report: [], team: [], teamsList: this.state.allTeams});
    }
  }
  handleReportChange = (report) => {
    if (report && report.length < 6) {
      let userList = this.state.reportList;
      report.length && report.forEach(item => {
        const pIds = item?.pReports.filter(id => id !==item._id)
        userList = this.state.userList.filter(td => !pIds.includes(td._id));
        report = report.filter(td => !pIds.includes(td._id));
      });
      this.setState({report, userList, errMsg: ''});
    } else {
      this.setState({report: [], errMsg: 'Report To limit is 5 users', userList: this.state.reportList});
    }
  }

  handleTeamChange = (team) => {
    const {rolesList, userType, userRole, allTeams, teamsList} = this.state;
    if (team.length) {
      let tmList = allTeams;
      team.length && team.forEach(item => {
        const pIds = item?.potlIds.filter(id => id !==item._id)
        team = team.filter(td => !pIds.includes(td._id));
        tmList = tmList.filter(td => !pIds.includes(td._id));
      });
      this.setReportList(rolesList, userType, userRole, team, tmList, this.state.report);
    } else {
      this.setReportList(rolesList, userType, userRole, [], allTeams, this.state.report);
    }
  }
  setReportList = (rolesList, userType, userRole, team, teamsList, report) => {
    const {org} = this.state;
    if (org && userRole && ((userType == 'Employee' && team.length) || userType === 'Management')) {
      const pTeamIDs = [];
      team.length > 0 ? team.forEach(item => pTeamIDs.push(item._id, ...item.potlIds)) : [];
      const rObj = rolesList.find(item => item.rName == userRole);
      const reqBody = {org, userType, urSeq: rObj.rSeq, pTeamIDs: [...new Set(pTeamIDs)], usrID: this.props.id};
      this.props.postB2BUsersReportList(reqBody, resObj => {
        if (resObj.status == '200') {
          const uList = [], userList = [];
          resObj.resData.result.map(item => {
            const sr = report.length && report.filter(rpt => rpt._id === item._id);
            const tmsArr = item?.userType === 'Employee' ? item.teams.filter(tm => pTeamIDs.includes(tm._id)) : ['Management'];
            tmsArr?.length && !sr?.length && userList.push({value: item._id, label: item.name + '('+item.refUID.split(':')[1]+')', ...item});
            tmsArr?.length && uList.push({value: item._id, label: item.name + '('+item.refUID.split(':')[1]+')', ...item})
          });
          this.setState({urID: rObj._id, urSeq: rObj.rSeq, userRole, userList, reportList: uList, team, userType, rolesList, errMsg: '', teamsList, report});
        } else {
          this.setState({urID: rObj._id, urSeq: rObj.rSeq, userRole, userList: [], reportList: [], rolesList, userType, team, errMsg: '', teamsList, report});
        }
      });
    } else this.setState({rolesList, userType, userRole, team, errMsg: '', teamsList, userList: [], report: []});
  }

  render() {    
    return (
      <AdminUserUpdateComponent
        state={this.state}
        fileInput={this.fileInput}
        handleRouteHome= {this.handleRouteHome}
        handleOnChange={this.handleOnChange}
        handleUpdateUser={this.handleUpdateUser}
        onImageChange={this.onImageChange}
        removeImage={this.removeImage}
        handleUserType={this.handleUserType}
        // stepperRef={this.stepperRef}
        // handleNext={this.handleNext}
        // handlePrevious={this.handlePrevious}
        // handleGetCoordinates={this.handleGetCoordinates}
        // handleCountryChange={this.handleCountryChange}
        // handleStateChange={this.handleStateChange}
        setStateData={this.setStateData} 
        handleRolesChange={this.handleRolesChange}
        handleReportChange={this.handleReportChange}
        handleTeamChange={this.handleTeamChange} />
    )
  };
};

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  GetB2BUserView: (id, callback) => dispatch(GetB2BUserView(id, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback)),
  PostB2BBrchsTotalList: (body, callback) => dispatch(PostB2BBrchsTotalList(body, callback)),
  postB2BRolesActiveList: (body, callback) => dispatch(postB2BRolesActiveList(body, callback)),
  postB2BUsersReportList: (body, callback) => dispatch(postB2BUsersReportList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(AdminUserUpdateSub);
