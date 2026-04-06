/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

import React from 'react';
import moment from 'moment';

import {numebersOnly} from '../../hooks/common';
import { initCaps } from '../../hooks/common';
import data from '../../../public/data/Lookups.json';

const MyProfileEditComponent = (props) => {
  const { sName, fName, lName, mobCc, mobNum, altMobCc, altMobNum, emID, altEmID, dob, gender, linUrl, userRole, errorMsg,  years, months, descNum, extnsn, joinDte, descLoc, descNumCode, disable } = props.state;
  const { setStateData, editProfileClick } = props;
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  const yearData = data.years;
  const monthData = data.months;

  return (
    <div>
      <form>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>First Name</label><span className='text-danger'>*</span>
              <input type='text' className='form-control' autoFocus={true} placeholder='First Name' maxLength={50} value={fName} onChange={(e) => setStateData({ fName: e.target.value, errorMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Last Name</label><span className='text-danger'>*</span>
              <input type='text' className='form-control' placeholder='Last Name' maxLength={30} value={lName} onChange={(e) => setStateData({ lName: e.target.value, errorMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Alias Name</label>
              <input type='text' className='form-control' placeholder='Alias Name' maxLength={20} value={sName} onChange={(e) => setStateData({ sName: e.target.value, errorMsg: '' })} />
            </div>
          </div>

          <div className='col-md-4'>
            <div className='form-group'>
              <label>Email</label>
              <input type='text' className='form-control' placeholder='Email' maxLength={100} value={emID} disabled={true} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Alternate Email</label>
              <input type='text' className='form-control' placeholder='Alternate Email' maxLength={100} value={altEmID} onChange={(e) => setStateData({ altEmID: (e.target.value).toLowerCase().trim(), errorMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Role</label>
              <input type='text' className='form-control' value={userRole} disabled={true} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Mobile Number</label><span className='text-danger'>*</span>
              <div className='d-flex flex-wrap'>
                <select className='form-select form-control' value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value, errorMsg: '' })} style={{ width: '70px' }} >
                  <option value='+1'>+1</option>
                  <option value='+91'>+91</option>
                </select>
                <div className='flex-grow-1'>
                  <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={mobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mobNum: e.target.value, errorMsg: '' })} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Alternate Mobile Number</label>
              <div className='d-flex flex-wrap'>
                <select className='form-select form-control' value={altMobCc} onChange={(e) => setStateData({ altMobCc: e.target.value, errorMsg: '' })} style={{ width: '70px' }} >
                  <option value=''>Select</option>
                  <option value='+1'>+1</option>
                  <option value='+91'>+91</option>
                </select>
                <div className='flex-grow-1'>
                  <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={altMobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ altMobNum: e.target.value, errorMsg: '' })} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-4'>
            <div className='form-group'>
              <label>Date of Birth</label><span className='text-danger'>*</span>
              <input type='date' className='form-control' value={dob} min='1900-01-01' max={maxDate} maxLength={40}  onChange={(e) => setStateData({ dob: e.target.value, errorMsg: '' })} />
            </div>
          </div>
          <div className='col-sm-4'>
            <label>Gender</label><span className='text-danger'>*</span>
            <select className='form-select form-control' value={gender} onChange={(e) => setStateData({ gender: e.target.value, errorMsg: '' })}  >
              <option value=''>Select</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Linkedin Profile</label><span className='text-danger'>*</span>
              <input type='url' className='form-control' placeholder='https://www.linkedin.com/...' maxLength={80} value={linUrl} onChange={(e) => setStateData({ linUrl: e.target.value, errorMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Office Number</label><span className='text-danger'>*</span>
              <div className='d-flex'>
                <select className="form-select form-control" value={descNumCode} onChange={(e) => setStateData({ descNumCode: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                  <option value='+1'>+1</option>
                  <option value='+91'>+91</option>
                </select>
                <input type='text' className='form-control' placeholder='Office Number'  maxLength={10} onKeyPress={numebersOnly} value={descNum} onChange={(e) => setStateData({ descNum: e.target.value, errorMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                <input type='text' className='form-control' placeholder='Extension'  value={extnsn} onChange={(e) => setStateData({ extnsn: e.target.value, errorMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Desk Location</label>
              <div className='d-flex'>
                <input type='text' className='form-control' placeholder='Desk Location'  value={descLoc} onChange={(e) => setStateData({ descLoc: initCaps(e.target.value), errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
              </div>
            </div>
          </div>   
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Experience</label>
                <div className='d-flex'>
                  <div className='w-100 me-2'>
                    <select value={years} onChange={(e) => setStateData({ years: e.target.value })} className='form-select form-control'>
                      {yearData.map((item) => (<option value={item.value}>{item.label}</option>))}
                    </select>
                  </div>
                  <div className='w-100'>
                    <select value={months} onChange={(e) => setStateData({ months: e.target.value })} className='form-select form-control'>
                      {monthData.map((item) =>(<option value={item.value}>{item.label}</option>))}
                    </select>
                  </div>
                </div>
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Joining Date</label>
              <input type='text' className='form-control' placeholder='mm/dd/yyyy' value={joinDte ? moment(joinDte, 'YYYY-MM-DD').format('DD MMM, YYYY') : ''} disabled={true} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='text-center text-danger'>{errorMsg}</div>
            <div className='d-flex justify-content-center mt-3'>
              <button className='btn btn-danger me-3' type='button' onClick={() => setStateData({ profileModal: false })}>Back</button>
              <button type='submit' disabled={disable} className='btn btn-success' onClick={editProfileClick}>Update</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MyProfileEditComponent;