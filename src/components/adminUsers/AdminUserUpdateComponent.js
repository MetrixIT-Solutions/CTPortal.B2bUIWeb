/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import data from '../../../public/data/Lookups.json';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { allCapsAlphaNum, initCaps, numebersOnly } from '../../hooks/common';
import hashHistory from '../../hashHistory';

const animatedComponents = makeAnimated();

// import Countries from '../../../public/data/Countries.json';

const AdminUserUpdateComponent = (props) => {
  const { orgsList, rolesObj, teamsList, branchesList, rolesList, org, orgObj, obId, team, sName, fName, lName, mobCc, mobNum, emID, userId, workUrl, altMobCc, altMobNum, altEmID, dob, gender, file, imgUrl, userRole, uStatus, /*buildingName, hNum, area, aLocality, zip, cCode, sCode, statesArr, city, userType, plusCode, latitude, longitude,*/ disable, errMsg, iconPath, userData, userInfo, userType, userList, report,  years, months, descNum, extnsn, joinDte, descLoc, descNumCode } = props.state;
  const { setStateData, handleRouteHome, handleOnChange, /*handleCountryChange, handleStateChange, handleGetCoordinates*/ onImageChange, removeImage, fileInput, handleUpdateUser, handleUserType, handleRolesChange, handleReportChange, handleTeamChange } = props;
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');
  const yearData = data.years;
  const monthData = data.months;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Update Admin User</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a href='#' onClick={handleRouteHome}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/admin-users')} aria-current='page'>Admin User</li>
                      <li className='breadcrumb-item active' aria-current='page'>Update</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='box-body'>
                  <div className='row'>
                        <div className='col-md-3'>
                          <div className='form-group'>
                          <label>Organization</label>
                          <select disabled={true} className="form-select form-control" name='orgCode' value={org} onChange={(e) => handleOnChange(e, 'org')}>
                              <option value={orgObj._id}>{orgObj.orgName}</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Branch</label>
                            <select className="form-select form-control" name='obId' value={obId} onChange={(e) => handleOnChange(e, 'branch')}>
                              <option value=''>Select</option>
                              {branchesList && branchesList.length > 0 && branchesList.map((item, i) => <option key={i} value={item._id}>{item.obName}</option>)}
                            </select>
                          </div>
                        </div>
                        {(userInfo.userType == 'App' || userInfo.userType == 'Tech' || userInfo.userType == 'Management') && <div className="col-md-3">
                          <div className="form-group">
                            <label>User Type</label><span className='text-danger'>*</span>
                            <select className="form-select form-control" name='userRole' value={userType} onChange={handleUserType}>
                              <option value=''>Select</option>
                              <option value='Management'>Management</option>
                              <option value='Employee'>Employee</option>
                            </select>
                          </div>
                        </div>}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>User Role</label><span className='text-danger'>*</span>
                            <select className="form-select form-control" name='userRole' value={userRole} onChange={handleRolesChange}>
                            <option value=''>Select</option>
                              {rolesList && rolesList.length > 0 && rolesList.map((item, i) => <option key={i} value={item.rName}>{item.rName}</option>)}
                            </select>
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
                        {userType == 'Employee' &&<div className='col-md-3'>
                          <div className='form-group'>
                            <label>Team</label>{userType == 'Employee' && <span className='text-danger'>*</span>}
                            <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={teamsList} value={[...team]} onChange={handleTeamChange} />
                          </div>
                        </div>}
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Report To</label>{userType == 'Employee' && <span className='text-danger'>*</span>}
                            <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={userList} value={[...report]} onChange={handleReportChange} />
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
                            <input type='text' className='form-control' placeholder='User ID' name='userId' maxLength={20} value={(userId.toUpperCase())} onChange={(e) => setStateData({ userId: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Email</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Email' name='emID' maxLength={100} value={emID} onChange={(e) => setStateData({ emID: e.target.value.toLowerCase().trim(), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Alt Email</label>
                            <input type='text' className='form-control' placeholder='Alt Email' maxLength={100} value={altEmID} onChange={(e) => setStateData({ altEmID: e.target.value.toLowerCase().trim(), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Office Number</label>
                            <div className='d-flex'>
                            <select className="form-select form-control" value={descNumCode} onChange={(e) => setStateData({ descNumCode: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                             <option value='+1'>+1</option>
                             <option value='+91'>+91</option>
                            </select>
                              <input type='text' className='form-control' placeholder='Office Number'  maxLength={10} onKeyPress={numebersOnly} value={descNum} onChange={(e) => setStateData({ descNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
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
                            <label>Alt Mobile Number</label>
                            <div className='d-flex'>
                              <select className="form-select form-control" value={altMobCc} onChange={(e) => setStateData({ altMobCc: e.target.value, errMsg:'' })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                                <option value='+1'>+1</option>
                                <option value='+91'>+91</option>
                              </select>
                              <input type='text' className='form-control' placeholder='Alt Mobile Number' maxLength={10} onKeyPress={numebersOnly} value={altMobNum} onChange={(e) => setStateData({ altMobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                            </div>
                          </div>
                        </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Experience</label>
                              <div className='d-flex'>
                                <div className='w-100 me-2'>
                                  <select value={years} onChange={(e) => setStateData({ years: e.target.value })} className='form-select form-control'>
                                    {yearData.map((item,i) => (<option key={i} value={item.value}>{item.label}</option>))}
                                  </select>
                                </div>
                                <div className='w-100'>
                                  <select value={months} onChange={(e) => setStateData({ months: e.target.value })} className='form-select form-control'>
                                    {monthData.map((item,i) =>(<option key={i} value={item.value}>{item.label}</option>))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Joining Date</label>
                            <input type='date' className='form-control' maxLength={40} value={joinDte} onChange={(e) => setStateData({ joinDte: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>User Status</label>
                            <select className="form-select form-control" name='uStatus' value={uStatus} onChange={(e) => setStateData({ uStatus: e.target.value, errMsg:'' })}>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
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
                            <label>Linkedin ID<span className='text-danger'>*</span></label>
                            <input type='text' className='form-control' placeholder='Linkedin ID' name='workUrl' maxLength={80} value={workUrl} onChange={(e) => setStateData({ workUrl: e.target.value ? [e.target.value] : [], errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className="mb-3">
                            <label>Icon</label>
                            <input className='form-control' type='file' onChange={onImageChange} ref={fileInput} accept="image/*" />
                            {file &&
                              <div className='d-flex mt-1'>
                                {iconPath ?
                                  (
                                    <img src={userData.piPath} alt={userData.piActualName} style={{ width: 130 }} className="img-fluid me-2" />
                                  ) : (
                                    <img src={imgUrl} alt={file.name} style={{ width: 130 }} className="img-fluid me-2" />
                                  )}
                                <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
                              </div>}
                          </div>
                        </div>
                        <div className='text-danger text-center'>{errMsg}</div>
                        <div className='d-flex justify-content-center'>
                          <button className='btn btn-secondary text-center mx-3' onClick={() => hashHistory.push('/admin-users')}>Back</button>
                          <button className='btn btn-primary text-center' disabled={disable} onClick={handleUpdateUser}>Update</button>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default AdminUserUpdateComponent;
