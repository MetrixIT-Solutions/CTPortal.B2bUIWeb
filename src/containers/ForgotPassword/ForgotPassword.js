/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';

import { PostB2BUserFrgtSendOtp, PostB2BUserFrgtVrfOtp, PostB2BUserFrgtRstPswd } from '../../actions/login/LoginActions';
import { ForgotPasswordComponent } from '../../components/ForgotPassword';
import hashHistory from '../../hashHistory';

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      emailBlock: true,
      otpBlock: false,
      changePswrdBlock: false,
      showPswd: false,
      password: '',
      otp: '',
      errMsg: '',
      disable: false,
      vdisable: false,
      host: '',
      timer: 30,
      successMessage: '',
    };
    this.timerRef = null;
  }
  componentDidMount = () => {
    const host = window.location.host;
    this.setState({ host });
  }
  setTimer = () => {
    clearInterval(this.timerRef); 
    this.setState({ timer: 30 });
    
    this.timerRef = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer === 0) {
          clearInterval(this.timerRef);
          return null;
        }
        return { timer: prevState.timer - 1 };
      });
    }, 1000);
  };
  componentWillUnmount() {
    clearInterval(this.timerRef);
  }
  setStateData = (data) => this.setState({ ...data });
  handleSendOTP = (event) => {
    const { userID, host } = this.state;
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,5}$/;
    if (!userID) {
      this.setState({ errMsg: 'Email is Required' })
    } else if (userID && !emailValid.test(userID)) {
      this.setState({ errMsg: 'Invalid Email' })
    } else {
      this.setState({ disable: true });
      const reqBody = { userID, b2bCode: host };
      this.props.PostB2BUserFrgtSendOtp(reqBody, (resObj) => {
        if (resObj.status == '180') {
          this.setTimer();
          this.setState({ emailBlock: false, otpBlock: true, changePswrdBlock: false, disable: false, errMsg: '' });
        } else {
          this.setState({ emailBlock: true, otpBlock: false, changePswrdBlock: false, disable: false, errMsg: 'OTP sent failed' });
        }
      });
    }
    event.preventDefault();
  }
  handleResendOtp = (event) => this.handleSendOTP(event);
  handleOtpChange = (e) => this.setState({ otp: e.target.value, errMsg: '' });
  handleVerifyOTP = (event) => {
    event.preventDefault();
    const { otp } = this.state;
    if (!otp) {
      this.setState({ errMsg: 'OTP is required' });
    } else {
      this.setState({ vdisable: true });
      const reqBody = { otp };
      this.props.PostB2BUserFrgtVrfOtp(reqBody, (resObj) => {
        if (resObj.status === '182') {
          this.setState({ emailBlock: false, otpBlock: false, changePswrdBlock: true, vdisable: false, errMsg: '' });
        } else {
          this.setState({ emailBlock: false, otpBlock: true, changePswrdBlock: false, vdisable: false, errMsg: 'Incorrect OTP' });
        }
      });
    }
  }
  handleChangePassword = (event) => {
    event.preventDefault();
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    const { password } = this.state;
    if (!password.trim()) {
      this.setState({ errMsg: 'Password is required' });
    } else if(password && (password.toLowerCase().includes('password') || !pswdRegex.test(password))) {
      this.setState({ errMsg: "Password is not matching it's rules"});
    } else {
      this.setState({ disable: true });
      const reqBody = { password: md5(password) }
      this.props.PostB2BUserFrgtRstPswd(reqBody, (resObj) => {
        if (resObj.status == '200') {
          setTimeout(() => {
            this.setState({ successMessage: 'Password updated successfully', errMsg: '', disable: true });
          }, 3000);
          hashHistory.push('/login');
        } else {
          this.setState({ errMsg: 'Password change failed', disable: false });
        }
      });
    }
  }

  render() {
    return <ForgotPasswordComponent
      state={this.state}
      setStateData={this.setStateData}
      handleOtpChange={this.handleOtpChange}
      handleSendOTP={this.handleSendOTP}
      handleResendOtp={this.handleResendOtp}
      handleVerifyOTP={this.handleVerifyOTP}
      handleChangePassword={this.handleChangePassword}
    />
  }
}

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BUserFrgtSendOtp: (body, callback) => dispatch(PostB2BUserFrgtSendOtp(body, callback)),
  PostB2BUserFrgtVrfOtp: (body, callback) => dispatch(PostB2BUserFrgtVrfOtp(body, callback)),
  PostB2BUserFrgtRstPswd: (body, callback) => dispatch(PostB2BUserFrgtRstPswd(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ForgotPassword);
