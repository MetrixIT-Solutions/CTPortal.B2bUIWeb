/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import md5 from 'md5';
import { connect } from 'react-redux';

import { UserLoginComponent } from '../../components/login';
import { PostB2BUserLogin } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
// import config from '../../../config/config.json';

class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: '',
      showPswd: false,
      loginAttempts: 5,
      isDisable: false,
      host:'',
      errMsg: '',
      errorMsgs: {}
    };
  }
  componentDidMount = () => {
    const host = window.location.host;
    this.setState({ host });
  }
  loginClick = async (event) => {
    event.preventDefault();
    const { userID, password, loginAttempts } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    const isBlocked = await localForage.getItem('loginObj');
    const loginObj = isBlocked?.value;
    const lAttempt = await localForage.getItem('loginAttempts');
    let errorMsgs = {};
    const sLoginAttempts = lAttempt?.value || loginAttempts;
    if (!userID) {
      // this.setState({ errMsg: 'Email is required' });
      errorMsgs.userID = 'Login Email is required'
    } else if (userID && !emailValid.test(userID)) {
      // this.setState({ errMsg: 'Invalid Email' })
      errorMsgs.userID = 'Invalid Login Email'
    } else if (!password) {
      // this.setState({ errMsg: 'Password is required' });
      errorMsgs.password = 'Password is required'
    } else if (loginObj && loginObj.name && loginObj.dtm) {
      const diff = new Date() - new Date(loginObj.dtm);
      const seconds = Math.floor(diff / 1000);
      await localForage.setItem('tabValue', 'dashboard');
      if (seconds > 3600) {
        localForage.removeItem('loginObj');
        localForage.removeItem('loginAttempts');
        this.setState({ isDisable: true });
        this.handleApiCall(userID, password, sLoginAttempts);
      } else {
        errorMsgs.password = 'Account blocked due to multiple failed login attempts, try after 1 hour';
        // this.setState({ errMsg: 'Account blocked due to multiple failed login attempts try after 1 hour', isDisable: true });
      }
    } else {
      this.setState({ isDisable: true });
      this.handleApiCall(userID, password, sLoginAttempts);
    }
    this.setState({ errorMsgs });
  }
  handleApiCall = async (userID, password, sLoginAttempts) => {
    const { host } = this.state;
    const reqBody = {userID, password: md5(password), b2bCode: host};
    this.props.PostB2BUserLogin(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ isDisable: false });
        await localForage.setItem('userInfo', resObj.resData.result);
        localForage.removeItem('loginAttempts');
        localForage.removeItem('loginObj');
        hashHistory.push('/home');
      } else if (resObj.status === '100') {
        this.setState({ errMsg: 'Invalid Credentials', isDisable: false });
      } else if (resObj.status === '102') {
        const newAttemptsLeft = sLoginAttempts - 1;
        let errorMessage = `Entered Wrong Password. ${newAttemptsLeft} ${newAttemptsLeft == 1 ? 'attempt' : 'attempts'} left`;
        if (newAttemptsLeft <= 0) {
          errorMessage = 'Account blocked due to multiple failed login attempts try after 1 hour';
          const loginObj = { 'name': userID, dtm: new Date() };
          localForage.setItem('loginObj', loginObj);
        }
        localForage.setItem('loginAttempts', newAttemptsLeft);
        this.setState({ errMsg: errorMessage, isDisable: newAttemptsLeft <= 0, loginAttempts: newAttemptsLeft })
      } else if (resObj.status == '104') {
        this.setState({ errMsg: 'Login authorization restricted due to non secure browser' });
      } else if (resObj.status == '150') {
        this.setState({ errMsg: 'Account blocked due to multiple failed login attempts try after 1 hour' });
      } else if (resObj.status == '151') {
        this.setState({ errMsg: 'Account hold' });
      } else if (resObj.status == '152') {
        this.setState({ errMsg: 'Account inactive' });
      } else if (resObj.status == '153') {
        this.setState({ errMsg: 'Invalid account status' });
      } else {
        this.setState({ errMsg: 'User login failed, please try after some time.', isDisable: false });
      }
    });
  }
  setStateData = (data) => this.setState({ ...data });
  handleShowPassword = () => this.setState({ showPswd: !this.state.showPswd });
  handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.loginClick(event);
    }
  }
  render() {
    return <UserLoginComponent state={this.state} loginClick={this.loginClick} setStateData={this.setStateData} handleShowPassword={this.handleShowPassword} handleEnterKeyPress={this.handleEnterKeyPress} />;
  }
}

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BUserLogin: (body, callback) => dispatch(PostB2BUserLogin(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(UserLogin);
