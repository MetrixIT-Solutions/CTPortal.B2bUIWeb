/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import MyProfileSideComponent from './MyProfileSideComponent';
import hashHistory from '../../hashHistory';

const ChangePasswordComponent = (props) => {

  const { oldPassword, newPassword, confirmPassword, showPswd, newShowPswd, conShowPswd, errMsg, successMessage, isDisable } = props.state;
  const { setStateData, handleSubmit, handleShowPassword, handleNewShowPassword, handleConfirmShowPassword, handleLogout } = props;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Profile</h3>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-7 col-xl-8'>
                <form>
                  <div className='box'>
                    <div className='box-body'>
                      <h4 className='box-title mb-0'>
                        Change Password
                      </h4>
                      <hr />
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Current Password</label>
                            <div className='input-group mb-3'>
                              <div className='input-group-prepend'>
                                <span className='input-group-text'><i className='fas fa-lock'></i></span>
                              </div>
                              <input autoFocus={true} type={`${!showPswd ? 'password' : ''}`} onChange={(e) => setStateData({oldPassword: e.target.value, errMsg: '' })} className='form-control' placeholder='Current Password' value={oldPassword} />
                              <span className='input-group-text bg-transparent eye-icon'>
                                {!showPswd ? <i onClick={handleShowPassword} className='fa fa-eye-slash' ></i> : <i onClick={handleShowPassword} className='fa fa-eye' ></i>}
                              </span>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label>New Password</label>
                            <div className='input-group mb-3'>
                              <div className='input-group-prepend'>
                                <span className='input-group-text'><i className='fas fa-lock'></i></span>
                              </div>
                              <input type={`${!newShowPswd ? 'password' : ''}`} onChange={(e) => setStateData({newPassword: e.target.value, errMsg: '' })} maxLength={20} className='form-control' placeholder='New Password' value={newPassword} />
                              <span className='input-group-text bg-transparent eye-icon'>
                                {!newShowPswd ? <i onClick={handleNewShowPassword} className='fa fa-eye-slash' ></i> : <i onClick={handleNewShowPassword} className='fa fa-eye' ></i>}
                              </span>
                            </div>
                          </div>
                          <div className='form-group'>
                            <label>Confirm Password</label>
                            <div className='input-group mb-3'>
                              <div className='input-group-prepend'>
                                <span className='input-group-text'><i className='fas fa-lock'></i></span>
                              </div>
                              <input type={`${!conShowPswd ? 'password' : ''}`} onChange={(e) => setStateData({confirmPassword: e.target.value, errMsg: '' })} maxLength={20} className='form-control' placeholder='Confirm Password' value={confirmPassword} />
                              <span className='input-group-text bg-transparent eye-icon'>
                                {!conShowPswd ? <i onClick={handleConfirmShowPassword} className='fa fa-eye-slash' ></i> : <i onClick={handleConfirmShowPassword} className='fa fa-eye' ></i>}
                              </span>
                            </div>
                          </div>
                          <p className='text-error'>{errMsg} </p>
                          <p className='text-success'>{successMessage}</p>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-control-feedback'>
                            <p className='mb-1 text-danger'>Password Rules: </p>
                            <ul>
                              <li><small>Contains at least eight characters.</small></li>
                              <li><small>Including at least one number.</small></li>
                              <li><small>Includes both lower and uppercase letters.</small></li>
                              <li><small>Include at least one special characters.</small></li>
                              <li><small>Cannot be your current password.</small></li>
                              <li><small>Cannot contain your 'password'</small></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='box-footer'>
                      <button className='btn btn-danger me-3' type='button' onClick={() => hashHistory.push('/profile')}>Back</button>
                      <button type='submit' onClick={handleSubmit} disabled={isDisable} className='btn btn-rounded btn-primary'>
                        <i className='fas fa-save'></i> Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* /.col  */}
              <div className='col-12 col-lg-5 col-xl-4'>
                <MyProfileSideComponent state={props.profileData} handleLogout={handleLogout}/>                
              </div>
            </div>
            {/* /.row  */}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordComponent;
