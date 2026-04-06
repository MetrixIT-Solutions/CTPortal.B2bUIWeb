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

import Countries from '../../../public/data/Countries.json';
import hashHistory from '../../hashHistory';

const ProfileAddressComponent = (props) => {

  const { profileData, hNum, area, zip, city, sCode, cCode, errorMsg, successMessage, statesList } = props.state;
  const { editProfileAddress, setStateData, handleCountryChange, handleStateChange } = props;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Profile Address</h3>
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
                        Address Update
                      </h4>
                      <hr />
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Address</label><span className='text-danger'>*</span>
                            <input type='text' autoFocus={true} className='form-control' placeholder='Address' value={hNum} maxLength={100} onChange={(e) => setStateData({ hNum: e.target.value, errorMsg: '', successMessage: '' })} />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Street / Area</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Street/Area' value={area} maxLength={60} onChange={(e) => setStateData({ area: e.target.value, errorMsg: '', successMessage: '' })} />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label>City</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='City' value={city} maxLength={60} onChange={(e) => setStateData({ city: e.target.value, errorMsg: '', successMessage: '' })} />
                          </div>
                        </div>
                        <div className='col-sm-4'>
                          <label>Country</label><span className='text-danger'>*</span>
                          <select className='form-select form-control' value={cCode} onChange={handleCountryChange}  >
                            <option value=''>Select Country</option>
                            {Countries.length > 0 && Countries.map((val, i) =><option key ={val.code} value = {val.code}>{val.label}</option>)}
                          </select>
                        </div>
                        <div className='col-sm-4'>
                          <label>State</label><span className='text-danger'>*</span>
                          <select className='form-select form-control' value={sCode} onChange={handleStateChange}>
                            <option value=''>Select State</option>
                            {statesList.length > 0 && statesList.map((item, i) => <option key={i} value={item.stateCode}>{item.label}</option>)}
                          </select>
                        </div>
                         <div className='col-md-4'>
                          <div className='form-group'>
                            <label>Zip Code</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Zip Code' maxLength={10} value={zip} onChange={(e) => setStateData({ zip: e.target.value, errorMsg: '', successMessage: '' })} />
                          </div>
                        </div>
                      </div>
                      <p className='text-danger text-center'>{errorMsg}</p>
                      <p className='text-success text-center'>{successMessage}</p>
                    </div>
                    <div className='box-footer'>
                      <button className='btn btn-danger me-3' type='button' onClick={() => hashHistory.push('/profile')}>Back</button>
                      <button type='submit' onClick={editProfileAddress} className='btn btn-rounded btn-primary me-2'>
                        <i className='fas fa-save'></i> Update
                      </button>
                      {/* <button type='button' className='btn btn-danger me-3'>Cancel</button> */}
                    </div>
                  </div>
                </form>
              </div>
              {/* /.col  */}
              <div className='col-12 col-lg-5 col-xl-4'>
                <MyProfileSideComponent profileData={profileData} state={profileData} handleLogout={props.handleLogout}
                />
              </div>
            </div>
            {/* /.row  */}
          </section>
        </div>
      </div>
    </div>
  )
}

export default ProfileAddressComponent;
