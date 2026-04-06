/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import './login.css';
import hashHistory from '../../hashHistory';
import background from '../../assets/images/auth-bg/bg-1.jpg';

const UserLoginComponent = (props) => {

  const { userID, password, showPswd, isDisable, errMsg, errorMsgs } = props.state;
  const { setStateData, loginClick, handleShowPassword, handleEnterKeyPress } = props;

  return (
    <div className='hold-transition theme-primary bg-img' style={{ backgroundImage: `url(${background})` }}>
      <main className='w-100'>
        {/* sign in start  */}
        <div className='container h-p100'>
          <div className='row align-items-center justify-content-md-center h-p100'>
            <div className='col-12'>
              <div className='row justify-content-center no-gutters'>
                <div className='col-lg-5 col-md-5 col-12'>
                  <div className='bg-white rounded30 shadow-lg'>
                    <div className='content-top-agile p-20 pb-0'>
                      <h2 className='text-primary'>CT Portal Login</h2>
                      <p className='mb-0'>Login in to continue to CT Portal.</p>
                    </div>
                    <form>
                      <div className='p-40'>
                        <div className={`form-group ${errorMsgs.userID ? 'error' : ''}`}>
                          <div className='input-group mb-3'>
                            <div className='input-group-prepend'>
                              <span className='input-group-text bg-transparent'>
                                <i className='fa-solid fa-user'></i>
                              </span>
                            </div>
                            <input type='text' autoFocus={true} className='form-control pl-15 bg-transparent' placeholder='Email' value={userID} onChange={(e) => setStateData({ userID: e.target.value.toLowerCase().trim(), errorMsgs: {}, errMsg: '' })} onKeyPress={handleEnterKeyPress} />
                          </div>
                          <div>{errorMsgs.userID && <p className='text-danger'>{errorMsgs.userID}</p>}</div>
                        </div>
                        <div className={`form-group ${errorMsgs.password ? 'error' : ''}`}>
                          <div className='input-group mb-3'>
                            <div className='input-group-prepend'>
                              <span className='input-group-text  bg-transparent'><i className='fa-solid fa-lock'></i></span>
                            </div>
                            <input type={`${!showPswd ? 'password' : ''}`} className='form-control pl-15 bg-transparent' placeholder='Password' maxLength={20} value={password} onChange={(e) => setStateData({ password: e.target.value, errorMsgs: {}, isDisable: false, errMsg: '' })} onKeyPress={handleEnterKeyPress} />
                            <span className='input-group-text bg-transparent eye-icon'>
                              {!showPswd ? <i onClick={handleShowPassword} className='fa fa-eye-slash' ></i> : <i onClick={handleShowPassword} className='fa fa-eye' ></i>}
                            </span>
                          </div>
                          <div>{errorMsgs.password && <p className='text-danger'>{errorMsgs.password}</p>}</div>
                        </div>
                        <div className='text-danger'>{errMsg}</div>
                        <div className='row'>
                          <div className='fog-pwd text-right'>
                            <a className='hover-warning' onClick={() => hashHistory.push('/forgot-password')}>
                              <i className='fa-solid fa-lock'></i> Forgot Password?</a>
                          </div>
                          <div className='col-12 text-center'>
                            <button type='submit' onClick={loginClick} disabled={isDisable} role='button' className='btn btn-danger mt-10'>LOGIN</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserLoginComponent;