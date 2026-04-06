/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { HeaderComponent } from '../header';
import moment from 'moment';
import data from '../../../public/data/Lookups.json';

import { FooterComponent } from '../footer';
import { allCapsAlphaNum, initCaps, numebersOnly } from '../../hooks/common';
import TooltipComponent from '../tootltip/TooltipComponent';

const UserRegisterComponent = (props) => {
  const { org, obId, teams, sName, fName, lName, password, showPswd, mobCc, mobNum, emID, userId, workUrl, altMobCc, altMobNum, altEmID, dob, gender, userRole, disable, errMsg, userType, report, joinDte, descNum, extnsn, years, months, descLoc, descNumCode } = props.state;
  const { setStateData, handleCreateUser } = props;
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  const position = "top";
  const tNames = teams.map(tm => ' ' + tm.tName);
  const yearData = data.years;
  const monthData = data.months;

  return (
    <div className='wrapper'>
      <HeaderComponent register='register' />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Admin User Profile Submission</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item active' aria-current='page'>Submission</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='box'>
              <div className='box-body'>
                <div className='row'>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Organization</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' value={org} disabled />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Branch</label>
                      <input type='text' className='form-control' value={obId} disabled />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Team</label>
                      <input type='text' className='form-control' value={tNames} disabled />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>User Role</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='User Role' maxLength={40} value={userRole} disabled />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>First Name</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='First Name' name='fName' maxLength={40} value={fName} onChange={(e) => setStateData({ fName: initCaps(e.target.value), errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Last Name</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='Last Name' name='lName' maxLength={40} value={lName} onChange={(e) => setStateData({ lName: initCaps(e.target.value), errMsg: '' })} />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Report To</label>{userType == 'Employee' && <span className='text-danger'>*</span>}
                      <input type='text' className='form-control' maxLength={40} value={report} disabled/>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Alias Name</label>
                      <input type='text' className='form-control' placeholder='Alias Name' name='sName' maxLength={40} value={sName} onChange={(e) => setStateData({ sName: initCaps(e.target.value), errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>User ID</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='User ID' name='userId' maxLength={20} value={userId} onChange={(e) => setStateData({ userId: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <div className='d-flex'>
                        <label>Password <span className='text-danger'>*</span></label>
                        <TooltipComponent position={position} password={true}/> 
                      </div>
                      <div className="input-group">
                        <input type={`${!showPswd ? 'password' : ''}`} className="form-control" placeholder="Password" maxLength={20} value={password} onChange={(e) => setStateData({ password: e.target.value, errMsg: '' })} />
                        <span className="input-group-text bg-transparent eye-icon">
                          {!showPswd ? <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye-slash' ></i> : <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye' ></i>}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Email</label><span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='Email' name='emID' maxLength={100} value={emID} onChange={(e) => setStateData({ emID: e.target.value.toLowerCase().trim(), errMsg: '' })} disabled />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Alt Email</label>
                      <input type='text' className='form-control' placeholder='Alt Email' name='altEmail' maxLength={100} value={altEmID} onChange={(e) => setStateData({ altEmID: e.target.value.toLowerCase().trim(), errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Office Number</label>
                      <div className='d-flex'>
                      <select className="form-select form-control"  value={descNumCode} onChange={(e) => setStateData({ descNumCode: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                          <option value='+1'>+1</option>
                          <option value='+91'>+91</option>
                        </select>
                          <input type='text' className='form-control' placeholder='Office Number' maxLength={10} onKeyPress={numebersOnly} value={descNum} onChange={(e) => setStateData({ descNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                         <input type='text' className='form-control' placeholder='Extension'  value={extnsn} onChange={(e) => setStateData({ extnsn: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Desk Location</label>
                      <div className='d-flex'>
                        <input type='text' className='form-control' placeholder='Desk Location'  value={descLoc} onChange={(e) => setStateData({ descLoc: initCaps(e.target.value), errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Personal Phone Number</label><span className='text-danger'>*</span>
                      <div className='d-flex'>
                        <select className="form-select form-control" value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                          <option value='+1'>+1</option>
                          <option value='+91'>+91</option>
                        </select>
                        <input type='text' className='form-control' placeholder='Personal Phone Number' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
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
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Joining Date</label>
                      <input type='date' className='form-control' placeholder='Joining Date' maxLength={40}  value={joinDte} onChange={(e) => setStateData({ joinDte: e.target.value, errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>DoB</label><span className='text-danger'>*</span>
                      <input type='date' className='form-control' placeholder='DoB' max={maxDate} maxLength={40} name='dob' value={dob} onChange={(e) => setStateData({ dob: e.target.value, errMsg: '' })} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Gender</label><span className='text-danger'>*</span>
                      <select className="form-select form-control" name='gender' value={gender} onChange={(e) => setStateData({ gender: e.target.value, errMsg: '' })}>
                        <option value=''>Select</option>
                        <option value='Female'>Female</option>
                        <option value='Male'>Male</option>
                        <option value='Other'>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Alt Mobile Number</label>
                      <div className='d-flex'>
                        <select className="form-select form-control" name='altMobCc' value={altMobCc} onChange={(e) => setStateData({ altMobCc: e.target.value, errMsg: '' })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                          <option value='+1'>+1</option>
                          <option value='+91'>+91</option>
                        </select>
                        <input type='text' className='form-control' placeholder='Alt Mobile Number' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={altMobNum} onChange={(e) => setStateData({ altMobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Linkedin ID<span className='text-danger'>*</span></label>
                      <input type='text' className='form-control' placeholder='Linkedin ID' name='workUrl' maxLength={80} value={workUrl} onChange={(e) => setStateData({ workUrl: e.target.value, errMsg: '' })} />
                    </div>
                  </div>
                  {/* <div className='col-md-3'>
                    <div className="mb-3">
                      <label>Icon</label>
                      <input className='form-control' type='file' onChange={onImageChange} ref={fileInput} accept="image" />
                      {file &&
                        <div className='d-flex mt-1'>
                          <img src={imgUrl} alt={file.name} style={{ width: 130, height: 130 }} className="img-fluid me-2" />
                          <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
                        </div>}
                    </div>
                  </div> */}
                  <div className='text-danger text-center'>{errMsg}</div>
                  <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-primary text-center' onClick={handleCreateUser}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterComponent />
    </div>


  );

}

export default UserRegisterComponent;