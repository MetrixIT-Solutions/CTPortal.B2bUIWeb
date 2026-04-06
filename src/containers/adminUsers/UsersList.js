/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';

import { UsersListComponent } from '../../components/adminUsers';
import { postB2BUsersList, PostB2BUserInviteCreate, PutB2BUserStatusUpdate, DeleteB2BUserDelete, PutLoginUserPasswordUpdate } from '../../actions/users/UsersActions';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';
import { PostB2BBrchsTotalList } from '../../actions/branches/BranchActions';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { postB2BRolesActiveList } from '../../actions/roles/RolesActions';
import {postB2BUsersReportList} from '../../actions/users/UsersActions' 
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      usersListCount: 0,
      actPgNum: 1,
      rLimit: 10,
      searchStr: '',
      isSearch: false,
      createModal: false,
      lgShow: false,
      rolesLists: [],
      firstname: '',
      lastname: '',
      email: '',
      mobCc: '',
      mobNum: '',
      role: '',
      errMsg: '',
      statusModal: false,
      userData: {},
      deleteModal: false,
      passwordModal: false,
      password: '',
      showPassword: '',
      showConfirmPassword: '',
      confirmPassword: '',
      disable: false,
      sucMsg: '' ,
      resendInvtn: false,
      sucMsg: '',
      usrsShow: '',
      rolesObj: {},
      StatusCuntShow: false,
      userInfo: {},
      orgsList: [],
      branchesList: [],
      teamsList: [],
      allTeams: [],
      rolesList: [],
      userList: [],
      userType: '',
      userRole: '',
      org: '',
      orgObj: {},
      obId: '',
      team: [],
      report: [],
      reportList: [],
      rprtName: '',
      rprtPrimary: '',
      pReports: [],
      urID: '',
      urSeq: '',
      statusData: [],
      usrsListStatusCountObj: { openCount: 0, submittedCount: 0, activeCount: 0, InactiveCount: 0 },
      showHide: '',
      reVtnModel: false,
      loading: true
    };
    this.usrsRef = {}
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidMount = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const { actPgNum, rLimit, searchStr, isSearch, statusData } = this.state;
    this.postB2BUsersData(actPgNum, rLimit, searchStr, isSearch, statusData);
    userInfo.userType == 'Employee' && this.setRolesList('Employee');
  }
  postB2BUsersData = async (actPgNum, rLimit, searchStr, isSearch, statusData) => {
    const {usrsListStatusCountObj} = this.state;
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value || {};
    const rlsObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const rolesObj = { ...rlsObj, appAcc }
    this.setOrgsList(userInfo, rolesObj);    
    const reqBody = { actPgNum, rLimit, searchStr, statusData }
    this.props.postB2BUsersList(reqBody, (resObj) => {            
      if (resObj.status == '200') {
        const resData = resObj.resData.result.CountByStatus;
        const countObj = resData.length > 0 ? this.setSataus(resData) : usrsListStatusCountObj;
       this.setState({ rolesObj, usersList: resObj.resData.result.usersList, usersListCount: resObj.resData.result.userListCount, usrsListStatusCountObj: countObj, actPgNum, rLimit, searchStr, userInfo, StatusCuntShow: true, loading: false});
      } else if (isSearch) {
        this.setState({ rolesObj, usersList: [], usersListCount: 0, actPgNum, rLimit, searchStr, isSearch, userInfo, loading: false });
      } else {
        this.setState({ rolesObj, userInfo, loading: false });
      }
    });
  }

  setSataus = (resData) => {
    let openCount = 0, submittedCount = 0, activeCount = 0, InactiveCount = 0;
    const opnObj = resData.find(item => item._id == "Open");
    const sbmtdObj = resData.find(item => item._id == "Submitted");
    const actObj = resData.find(item => item._id == "Active");
    const inactObj = resData.find(item => item._id == "Inactive");
    openCount = opnObj ? opnObj.count : 0,
      submittedCount = sbmtdObj ? sbmtdObj.count : 0,
      activeCount = actObj ? actObj.count : 0,
      InactiveCount = inactObj ? inactObj.count : 0
    return { openCount, submittedCount, activeCount, InactiveCount };
  }

  handleChangeSearch = (event) => {
    const { rLimit, statusData } = this.state;
    this.setState({ searchStr: event.target.value });
    event.target.value === '' && this.postB2BUsersData(1, rLimit, '', false, statusData)
  }
  handleKeyInput = (e) => e.key === "Enter" && this.postB2BUsersData(1, this.state.rLimit, this.state.searchStr, true, this.state.statusData);
  handleChangerLimit = (event) => {
    const { searchStr, statusData } = this.state;
    let pgrLimit = Number(event.target.value);
    this.postB2BUsersData(1, pgrLimit, searchStr, false, statusData);
  }
  handlePagination = (actPgNum) => {
    const { rLimit, searchStr, statusData } = this.state;
    this.postB2BUsersData(actPgNum, rLimit, searchStr, statusData);
  }

  statusClick = (key) => {    
    const { actPgNum, searchStr, rLimit, isSearch, statusData } = this.state;
    if (statusData.includes(key)) {
      const st = statusData.filter(statusData => statusData !== key)
      this.setState({ statusData: st });
      this.postB2BUsersData(actPgNum, rLimit,searchStr, isSearch, st);
    } else {
      this.setState({ statusData: [...statusData, key] });
      this.postB2BUsersData(actPgNum, rLimit, searchStr, isSearch, [...statusData, key]);
    }
  }

  handleInvite = () => this.setState({ createModal: true, lgShow: true });
  handleClose = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    
    const {org, rolesObj} = this.state;
    const orgId = !rolesObj.appAcc ? org : '';
    const userType = userInfo.userType == 'Employee' ? 'Employee' : '';
    this.setState({ createModal: false, firstname: '', lastname: '', email: '', userRole: '', org: orgId, obId: '', role: '', errMsg: '', team: '', userType, userRole: '', report: '', resendInvtn: false, disable: false, showHide: '' });
  }

  handleRenvite = (data) => {
    const seData = {userRole: data.userRole, email: data.emID, resendInvtn: true };
    this.setState({ userData: data, ...seData, reVtnModel: true });
  }
  handleResendInvtLink = (e) => this.handleCreate(e);

  handleCreate = (e) => {
    e.preventDefault();
    const { rolesObj, firstname, lastname, email, resendInvtn, orgObj, branchObj, teamObj, org, obId, team, userType, userRole, report, urID, urSeq, userInfo, orgName, orgCode, obName, obCode, tName, tCode } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    if(!resendInvtn && !org) {
      this.setState({ errMsg: 'Organization is required' });
    } else if (!resendInvtn && userInfo !== 'Employee' && !userType) {
      this.setState({ errMsg: 'User Type is required' });
    } else if (!userRole) {
      this.setState({ errMsg: 'User Role is required' });
    } else if (!email) {
      this.setState({ errMsg: 'Email is required' });
    } else if (email && !emailValid.test(email)) {
      this.setState({ errMsg: 'Invalid Email' });
    } else if (!resendInvtn && !firstname) {
      this.setState({ errMsg: 'Firstname is required' });
    } else if (!resendInvtn && !lastname) {
      this.setState({ errMsg: 'Lastname is required' });
    } else if (!resendInvtn && userType == 'Employee' && !team.length) {
      this.setState({ errMsg: 'Team is required' });
    } else if(!resendInvtn && userType == 'Employee' && !report.length ) {
      this.setState({ errMsg: 'Report To is required' });
    } else {
      let reports = [], pReports = [], rprtNames = '', teams=[], pTeamIDs=[], tNames='';
      report?.length > 0 && report.forEach(item => {
        const prs = [...item.pReports, item._id];
        rprtNames = rprtNames + item.name + ';'
        reports.push({_id: item._id, rprtName: item.name, rprtPrimary: item.myPrimary, pReports: [...new Set(prs)]});
        pReports.push(...item.pReports, item._id);
      });
      team?.length > 0 && team.forEach(item => {
        const pts = [...item.potlIds, item._id];
        teams.push({_id: item._id, tName: item.oTeam, tCode: item.otCode, pTeamIDs: [...new Set(pts)]});
        pTeamIDs.push(...item.potlIds, item._id);
        tNames = tNames + item.oTeam + ';'
      });
      this.setState({disable: true});
      const reqBody = {
        org,
        orgName: orgObj._id ? orgObj.orgName : '',
        orgCode: orgObj._id ? orgObj.orgCode : '',
        obId,
        obName: branchObj?._id ? branchObj.obName : '',
        obCode: branchObj?._id ? branchObj.obCode : '',
        teams, tNames, pTeamIDs: [...new Set(pTeamIDs)],
        userType,
        userRole,
        emID: email,
        fName: firstname,
        lName: lastname,
        reports, rprtNames,
        pReports: [...new Set(pReports)],
        urID, urSeq,
        resendInvtn
      };
      this.props.PostB2BUserInviteCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const org = !rolesObj.appAcc ? org : '';
          this.setState({sucMsg: 'Invitation Sent Successfully', org, firstname: '', lastname: '', email: '', userRole: '', team: '', role: '', errMsg: '', team: '', userType: '', userRole: '', report: '', resendInvtn: false});
          setTimeout(() => {
            this.setState({ createModal: false, sucMsg: '', disable: false, reVtnModel: false, userData: {}});
          }, 2000);
          this.postB2BUsersData(this.state.actPgNum, this.state.rLimit, this.state.searchStr, this.state.isSearch, this.state.statusData);
        } else if(resObj.status == '105') {
          this.setState({ errMsg: 'User already exists with the provided email', showHide: 'hide', disable: false });
        } else {
          this.setState({ errMsg: 'Creation Failed', resendInvtn: false, disable: false });
        }
      });
    }
  }

  handleStatusUpdate = () => {
    const { userData } = this.state;
    const recordid = userData._id;
    const status = (userData.uStatus == 'Active' || userData.uStatus == 'Open') ? 'Inactive' : 'Active';
    const reqBody = {status};
    this.setState({disable: true});
    this.props.PutB2BUserStatusUpdate(recordid, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, userData: {}, disable: false });
        this.postB2BUsersData(this.state.actPgNum, this.state.rLimit, this.state.searchStr, this.state.isSearch, this.state.statusData);
      } else {
        this.setState({ errMsg: 'Status update failed', disable: false });
      }
    });
  }

  handleUserDelete = () => {
    const { userData } = this.state;
    const recordid = userData._id;
    const userId = userData.refUID;
    const myPrimary = userData.myPrimary;
    const reqBody = {userId, myPrimary};
    this.setState({disable: true});
    this.props.DeleteB2BUserDelete(recordid, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false, disable: false });
        this.postB2BUsersData(this.state.actPgNum, this.state.rLimit, this.state.searchStr, this.state.isSearch, this.state.statusData);
      } else {
        this.setState({ errMsg: 'Delete failed', disable: false });
      }
    });
  }

  changePaswword = (e) => this.setState({ password: e.target.value, errMsg: '' });
  handlePasswordShowHide = () => {
    this.setState({
      showPassword: !this.state.showPassword,
      showConfirmPassword: this.state.showConfirmPassword
    });
  }
  changeConfirmPassWord = (e) => this.setState({ confirmPassword: e.target.value, errMsg: '' });
  handleConfirmPasswordShowHide = () => {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
      showPassword: this.state.showPassword,
    });
  }

  handleChangePassword = () => {
    const {password, confirmPassword, userData } = this.state;
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    if (!password) {
      this.setState({ errMsg: 'New Password is Requied'});
    } else if(password.length < 8) {
      this.setState({ errMsg: 'Password Should Be Greater Than 7 Characters'});
    } else if(password && (password.toLowerCase().includes('password') || !pswdRegex.test(password))){
      this.setState({ errMsg: 'New Password is not matching its rules'});
    } else if(!confirmPassword){
      this.setState({ errMsg: 'Confirm Password is Requied'});
    } else if(password != confirmPassword) {
      this.setState({ errMsg: 'New Password and confirm Password should be same' });
    } else {
      const recordid = userData._id;
      const pwdObj = {
        currPassword: md5(password),
        password: md5(confirmPassword),
      }
      this.setState({ disable: true });
      this.props.PutLoginUserPasswordUpdate(recordid, pwdObj, (resObj) => {        
        if (resObj.status === '200') {
          this.setState({sucMsg: resObj.resData.result});
          setTimeout(() => {
            this.setState({ passwordModal: false, errMsg: '', sucMsg: '', password: '', confirmPassword: '', disable: false });
          }, 3000);
          this.postB2BUsersData(this.state.actPgNum, this.state.rLimit, this.state.searchStr, this.state.isSearch, thsi.tate.statusData);
        } else {
          this.setState({ errMsg: resObj.resData.result, sucMsg: '' });
        }
      });
    }
  }

  handleUsrsMenu = (usrsId) => {
    const {usrsShow} = this.state;
    this.setState({usrsShow: usrsShow ? '' : usrsId});
  }
  handleClickOutside = (event) => {
    const { usrsShow } = this.state;
    if (this.usrsRef[usrsShow] && !this.usrsRef[usrsShow].contains(event.target)) {
      this.setState({ usrsShow: '' });
    }
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
    const reqBody = {status: 'Active', orgID};
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

  handleView = (data) => {
    hashHistory.push('/admin-users/view/' + data._id);
  }

  render() {
    return (
      <UsersListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangerLimit={this.handleChangerLimit}
        handlePagination={this.handlePagination}
        setStateData={this.setStateData}
        handleInvite = {this.handleInvite}
        handleClose = {this.handleClose}
        handleCreate = {this.handleCreate}
        handleStatusUpdate = {this.handleStatusUpdate}
        handleUserDelete = {this.handleUserDelete}
        changePaswword = {this.changePaswword}
        handlePasswordShowHide = {this.handlePasswordShowHide}
        changeConfirmPassWord = {this.changeConfirmPassWord}
        handleConfirmPasswordShowHide = {this.handleConfirmPasswordShowHide}
        handleChangePassword = {this.handleChangePassword}
        handleUsrsMenu={this.handleUsrsMenu}
        usrsRef={this.usrsRef}
        handleClickOutside={this.handleClickOutside}
        handleOnChange = {this.handleOnChange}
        handleRolesChange = {this.handleRolesChange}
        handleUserType = {this.handleUserType}
        handleReportChange = {this.handleReportChange}
        statusClick={this.statusClick}
        handleRenvite = {this.handleRenvite}
        handleResendInvtLink = {this.handleResendInvtLink}
        handleTeamChange = {this.handleTeamChange}
        handleView = {this.handleView}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BUsersList: (body, callback) => dispatch(postB2BUsersList(body, callback)),
  PostB2BUserInviteCreate: (reqBody, callback) => dispatch(PostB2BUserInviteCreate(reqBody, callback)),
  PutB2BUserStatusUpdate: (recordid, reqBody, callback) => dispatch(PutB2BUserStatusUpdate(recordid, reqBody, callback)),
  DeleteB2BUserDelete: (recordid, reqBody, callback) => dispatch(DeleteB2BUserDelete(recordid, reqBody, callback)),
  PutLoginUserPasswordUpdate: (recordid, reqBody, callback) => dispatch(PutLoginUserPasswordUpdate(recordid, reqBody, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  PostB2BBrchsTotalList: (body, callback) => dispatch(PostB2BBrchsTotalList(body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback)),
  postB2BRolesActiveList: (body, callback) => dispatch(postB2BRolesActiveList(body, callback)),
  postB2BUsersReportList: (body, callback) => dispatch(postB2BUsersReportList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(UsersList);
