/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import background from '../../assets/images/auth-bg/bg-1.jpg';
import hashHistory from '../../hashHistory';
import { numebersOnly } from '../../hooks/common';

const ForgotPasswordComponent = (props) => {
  const { userID, errMsg, successMessage, emailBlock, otpBlock, otp, showPswd, password, disable, vdisable, timer } = props.state;
  const { setStateData, handleOtpChange, handleSendOTP, handleResendOtp, handleVerifyOTP, handleChangePassword } = props;
  return (
    <div className='hold-transition theme-primary bg-img' style={{ backgroundImage: `url(${background})` }}>
      <div className='container h-p100'>
        <div className='row align-items-center justify-content-md-center h-p100'>
          <div className='col-12'>
            <div className='row justify-content-center no-gutters'>
              <div className='col-lg-5 col-md-5 col-12'>
                <div className='bg-white rounded30 shadow-lg'>
                  <div className='content-top-agile p-20 pb-0'>
                    <h2 className='text-primary'>CT Portal Forgot Password</h2>
                    {emailBlock ? <p className='mb-0'>Provide your account email to get OTP to reset password.</p> : otpBlock ? <p className='mb-0'>Please enter forgot password OTP sent to <span className='text-primary'>{userID}</span></p> : <p className='mb-0'>OTP verified successfully! Please proceed to change your password.</p>}
                  </div>
                  <form>
                    {emailBlock ? <div className='p-40'>
                      <div className='form-group'>
                        <div className='input-group mb-3'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text bg-transparent'>
                              <i className='fa-solid fa-lock'></i>
                            </span>
                          </div>
                          <input type='text' autoFocus={true} value={userID} onChange={(event) => setStateData({ userID: event.target.value, errMsg: '' })} className='form-control pl-15 bg-transparent' placeholder='Enter Email' />
                        </div>
                      </div>
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='row'>
                        <div className='col-12 text-center'>
                          <div className="fog-pwd text-left">
                            <a className="hover-warning status" onClick={() => hashHistory.push('/login')}>
                              <i className="fa-solid fa-arrow-left"></i> Back to Login</a>
                          </div>
                          <button type='submit' disabled={disable} onClick={handleSendOTP} className='btn btn-info mt-10'>Send Otp</button>
                        </div>
                      </div>
                    </div> : (otpBlock ? <div className='p-40'>
                      <div className='form-group'>
                        <div className='input-group mb-3'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text bg-transparent'>
                              <i className='fa-solid fa-lock'></i>
                            </span>
                          </div>
                          <input className='form-control' type='text' id='userid' value={otp} onChange={handleOtpChange} onKeyPress={numebersOnly} maxLength='6' placeholder='Enter OTP' />
                        </div>
                      </div>
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='row'>
                        <div className='col-12 text-center'>
                          <div className='d-flex justify-content-between'>
                          <div className="fog-pwd text-left">
                            <a className="hover-warning status" onClick={() => hashHistory.push('/login')}>
                              <i className="fa-solid fa-arrow-left"></i> Back to Login</a>
                          </div>
                          <div className="fog-pwd text-right">
                            {timer ? <p>Resend OTP in <strong className='text-primary'>{timer} Seconds</strong></p>
                            : <a disabled={disable} onClick={handleResendOtp} className="hover-warning status">Resend OTP</a>}
                          </div>
                          </div>
                          <button type='submit' disabled={vdisable} onClick={handleVerifyOTP} className='btn btn-info mt-10'>Verify Otp</button>
                        </div>
                      </div>
                    </div> : <div className='p-40'>
                      <div className='form-group'>
                        <div className='input-group mb-3'>
                          <div className='input-group-prepend'>
                            <span className='input-group-text bg-transparent'>
                              <i className='fa-solid fa-lock'></i>
                            </span>
                          </div>
                          <input type={`${!showPswd ? 'password' : ''}`} className="form-control pl-15 bg-transparent" placeholder="Password" maxLength={20} value={password} onChange={(e) => setStateData({ password: e.target.value, errMsg: '' })} />
                          <span className="input-group-text bg-transparent eye-icon">
                            {!showPswd ? <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye-slash' ></i> : <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye' ></i>}
                          </span>
                        </div>
                      </div>
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
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='text-center text-success'>{successMessage}</div>
                      <div className='row'>
                        <div className='col-12 text-center'>
                          <div className="fog-pwd text-left">
                            <a className="hover-warning status" onClick={() => hashHistory.push('/login')}>
                              <i className="fa-solid fa-arrow-left"></i> Back to Login</a>
                          </div>
                          <button type='submit' disabled={disable} onClick={handleChangePassword} className='btn btn-info mt-10'>Submit</button>
                        </div>
                      </div>
                    </div>)}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordComponent;
