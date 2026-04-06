/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ConsultantsListComponent } from '../../components/consultants';
import { postB2BCnsltantsList, deleteB2BConsultantsDelete, putB2BConsultantsStatusUpdate, putB2BConsultantsChangePassword, PostB2BCnsltantsPwdLink } from '../../actions/consultants/ConsultantActions';
import InviteConsultant from '../invitations/InviteConsultant';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import md5 from 'md5';
import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';

class ConsultantsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cnsltantsList: [],
      cnsltantsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      statusModal: false,
      isSearch: false,
      consultantData: {},
      statusModal: false,
      deleteModal: false,
      passwordModal: false,
      resetPasswordModal: false,
      password: '',
      showPassword: '',
      confirmPassword: '',
      showConfirmPassword: '',
      errMsg: '',
      sucMsg: '',
      cnsltantUsr: {},
      showInvite: false,
      cnsltntsShow: '',
      rolesObj: {},
      teamIds: [],
      loading: true
    };
    this.cnsltntsRef = {};
  }

  componentDidMount = async () => {
    const { actPgNum, searchStr, pageLimit, isSearch } = this.state;
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    if (userInfo.userRole == 'HR Manager' || userInfo.userRole == 'HR Executive')
      this.getTeamsList(userInfo);
    else
      this.getCnsltantsList(actPgNum, searchStr, pageLimit, isSearch);
  }
  getCnsltantsList = async (actPgNum, searchStr, pageLimit, isSearch) => {
    const { teamIds } = this.state;
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = {
      pgNum: actPgNum,
      limit: pageLimit,
      searchStr: searchStr,
      team: teamIds
    };
    this.props.postB2BCnsltantsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, cnsltantsList: resObj.resData.result.consultantsList, cnsltantsListCount: resObj.resData.result.consultantsListCount, actPgNum, searchStr, pageLimit, loading: false });
      } else if (isSearch) {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, cnsltantsList: [], cnsltantsListCount: 0, actPgNum: 1, searchStr, pageLimit, loading: false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, loading: false });
      }
    });
  }

  getTeamsList = async (userInfo) => {
    const { actPgNum, searchStr, pageLimit, isSearch } = this.state;
    const reqBody = { status: 'Active', orgID: userInfo.org };
    const teams = userInfo.teams && userInfo.teams.length ? userInfo.teams.map(item => item._id) : [];
    this.props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
      if (resObj.status === '200') {
        const data = resObj.resData.result;
        const teamIds = [...teams];
        data.forEach(item => {
          const flag = item?.potlIds?.some(value => teams.includes(value));
          flag && teamIds.push(item._id);
        });
        this.setState({ teamIds }, () => this.getCnsltantsList(actPgNum, searchStr, pageLimit, isSearch));
      } else {
        this.getCnsltantsList(actPgNum, searchStr, pageLimit, isSearch);
      }
    });
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  setStateData = (data) => this.setState({ ...data });

  handleInviteCons = (showInvite, lc) => {
    this.setState({showInvite});
    if(lc){
      hashHistory.push('/consultants/invitations');
    }
  }

  handleChangeSearch = (e) => {
    const { pageLimit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getCnsltantsList(1, '', pageLimit, false);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getCnsltantsList(1, this.state.searchStr, this.state.pageLimit, true);

  handleChangePage = (activePage) => {
    const { searchStr, pageLimit } = this.state;
    this.getCnsltantsList(activePage, searchStr, pageLimit, false);
  }
  handleChangeLimit = (e) => {
    const { searchStr, actPgNum, isSearch } = this.state;
    let pageLimit = e.target.value;
    this.getCnsltantsList(actPgNum, searchStr, pageLimit, isSearch);
  }
  handleConsultantDelete = () => {
    const { consultantData } = this.state;
    const recordId = consultantData._id;
    const reqBody = { myPrimary: consultantData.myPrimary, userId: consultantData.refUID, conKey: 'Active'};
    this.props.deleteB2BConsultantsDelete(recordId, reqBody, (resObj) => {            
      if (resObj.status == '200') {
        this.setState({sucMsg: 'Consultant Deleted Successfully'});
        setTimeout(() => {
          this.setState({ deleteModal: false, consultantData: {}, errMsg: '' });
          this.getCnsltantsList(1, '', 10, true);
        }, 2000);
      } else {
        this.setState({ errMsg: resObj.resData.result, disable: false });
      }
    });
  }
  handleStatusUpdate = () => {
    const { consultantData } = this.state;
    this.setStateData({ disable: true });
    const recordId = consultantData._id;
    const status = consultantData.uStatus == 'Active' ? 'Inactive' : 'Active';
    const reqBody = { status };
    this.props.putB2BConsultantsStatusUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', consultantData: {}, disable: false });
        this.getCnsltantsList(1, '', 10, false);
      } else {
        this.setState({ errMsg: 'Consultant Status Update Failed', disable: false });
      }
    });
  }
  handleChangePassword = (event) => {
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    const { password, confirmPassword, consultantData } = this.state;
    if (!password) {
      this.setState({ errMsg: 'New Password is Requied' });
    } else if (password.length < 8) {
      this.setState({ errMsg: 'Password requires atleast 8 characters' });
    } else if (password && (password.toLowerCase().includes('password') || !pswdRegex.test(password))) {
      this.setState({ errMsg: "New Password is not matching it's rules"});
    } else if (!confirmPassword) {
      this.setState({ errMsg: 'Confirm Password is Requied' });
    } else if (password != confirmPassword) {
      this.setState({ errMsg: 'New Password and Confirm Password should be same' });
    } else {
      const reqBody = {
        recordid: consultantData._id,
        currPassword: md5(password),
        password: md5(confirmPassword),
      }
      this.props.putB2BConsultantsChangePassword(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ sucMsg: resObj.resData.result });
          setTimeout(() => {
            this.setState({ passwordModal: false, errMsg: '' });
          }, 1000);
          this.getCnsltantsList(1, '', 10, false);
        } else {
          this.setState({ errMsg: resObj.resData.result });
        }
      });
    }
  }

  changePaswword = (e) => this.setState({ password: e.target.value, errMsg: '' });
  handlePasswordShowHide = () => this.setState({ showPassword: !this.state.showPassword });
  changeConfirmPassWord = (e) => this.setState({ confirmPassword: e.target.value, errMsg: '' });
  handleConfirmPasswordShowHide = () => this.setState({ showConfirmPassword: !this.state.showConfirmPassword });

  sendPwdLink = (data) => {            
   this.setState({resetPasswordModal: true, consultantData: data});
  }

  handleResetPassword = () => {
    const { consultantData } = this.state;
    const recordId = consultantData._id;
    const reqBody = { emID: consultantData.emID };
    this.props.PostB2BCnsltantsPwdLink(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ sucMsg: 'Password Link send Successfully' });
        setTimeout(() => {
          this.setState({ resetPasswordModal: false, sucMsg: '' });
        }, 1000)
      } else {
        this.setState({ errMsg: 'Password Link send failed' });
      }
    })
  }

  handleCnsltntsMenu = (cnsltntsId) => {
    const { cnsltntsShow } = this.state;
    this.setState({cnsltntsShow: cnsltntsShow ? '' : cnsltntsId});
  }

  handleClickOutside = (event) => {
    const { cnsltntsShow } = this.state;
    if (this.cnsltntsRef[cnsltntsShow] && !this.cnsltntsRef[cnsltntsShow].contains(event.target)) {
      this.setState({ cnsltntsShow: '',  });
    }
  }

  render() {
    return <>
      <ConsultantsListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleConsultantDelete={this.handleConsultantDelete}
        handleStatusUpdate={this.handleStatusUpdate}
        handleChangePassword={this.handleChangePassword}
        changePaswword={this.changePaswword}
        handlePasswordShowHide={this.handlePasswordShowHide}
        changeConfirmPassWord={this.changeConfirmPassWord}
        handleConfirmPasswordShowHide={this.handleConfirmPasswordShowHide}
        sendPwdLink = {this.sendPwdLink} 
        handleResetPassword = {this.handleResetPassword}
        handleInviteCons={this.handleInviteCons}
        handleCnsltntsMenu={this.handleCnsltntsMenu}
        cnsltntsRef={this.cnsltntsRef}
        handleClickOutside={this.handleClickOutside}
      />
      <InviteConsultant showInvite={this.state.showInvite} handleInviteCons={this.handleInviteCons} />
      </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BCnsltantsList: (body, callback) => dispatch(postB2BCnsltantsList(body, callback)),
  putB2BConsultantsStatusUpdate: (recordId, body, callback) => dispatch(putB2BConsultantsStatusUpdate(recordId, body, callback)),
  deleteB2BConsultantsDelete: (recordId, body, callback) => dispatch(deleteB2BConsultantsDelete(recordId, body, callback)),
  putB2BConsultantsChangePassword: (body, callback) => dispatch(putB2BConsultantsChangePassword(body, callback)),
  PostB2BCnsltantsPwdLink: (recordId, body, callback) => dispatch(PostB2BCnsltantsPwdLink(recordId, body, callback)),
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(ConsultantsList);