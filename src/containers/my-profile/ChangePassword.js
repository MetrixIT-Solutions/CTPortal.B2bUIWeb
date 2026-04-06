/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import md5 from 'md5';

import { ChangePasswordComponent } from '../../components/my-profile';
import { postB2BUserChangePassword } from '../../actions/profile/ProfileActions';
import { PostB2BUserLogout } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      errMsg: '',
      successMessage: '',
      showPswd: false,
      newShowPswd: false,
      conShowPswd: false,
      isDisable: false
    }
  }

  setStateData = (data) => this.setState(data)

  handleSubmit = (event) => {
    const pswdRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=])[A-Za-z\d~!@#$%^&*\[\]\\()|{}:';"<>,./?_+-=]{8,20}$/;
    const { oldPassword, newPassword, confirmPassword } = this.state;
    if(!oldPassword) {
      this.setState({ errMsg: 'Current Password is required'});
    } else if(!newPassword.trim()) {
      this.setState({ errMsg: 'New Password is required'});
    } else if(oldPassword === newPassword) {
      this.setState({ errMsg: 'New Password should not be same as Current Password'});
    } else if(newPassword && (newPassword.toLowerCase().includes('password') || !pswdRegex.test(newPassword))) {
      this.setState({ errMsg: "New Password is not matching it's rules"});
    } else if(newPassword !== confirmPassword) {
      this.setState({ errMsg: 'New Password and Confirm Password should be same'});
    } else {
      const reqBody = { oldPassword: md5(oldPassword), newPassword: md5(newPassword) }
      this.props.postB2BUserChangePassword(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ successMessage: 'Password updated successfully', errMsg: '', isDisable: true });
        } else if(resObj.status == '102') {
          this.setState({ errMsg: 'Current Password is Invalid'});
        } else {
          this.setState({ errMsg: 'Password Update Failed'});
        }
      });
    }
    event.preventDefault();
  }

  handleLogout = async () => {
    this.props.PostB2BUserLogout(resObj => {})
    hashHistory.push('/login');
    await localForage.clearItems()
  }

  handleShowPassword = () => this.setState({ showPswd: !this.state.showPswd });
  handleNewShowPassword = () => this.setState({ newShowPswd: !this.state.newShowPswd});
  handleConfirmShowPassword = () => this.setState({ conShowPswd: !this.state.conShowPswd});

  render() {
    return (
      <div>
        <ChangePasswordComponent state={this.state} profileData={this.props.LoginReducer.userObj}
          setStateData={this.setStateData} handleSubmit={this.handleSubmit} handleShowPassword={this.handleShowPassword}
          handleNewShowPassword={this.handleNewShowPassword} handleConfirmShowPassword={this.handleConfirmShowPassword}
          handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  postB2BUserChangePassword: (reqBody, callback) => dispatch(postB2BUserChangePassword(reqBody, callback)),
  PostB2BUserLogout: (callback) => dispatch(PostB2BUserLogout(callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ChangePassword);
