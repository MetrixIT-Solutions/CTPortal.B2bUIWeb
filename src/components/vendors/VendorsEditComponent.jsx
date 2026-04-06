/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { numebersOnly, initCaps } from '../../hooks/common';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/CountriesAll.json';

const VendorsEditComponent = (props) => {
  const { orgName, vendorType, vendorName, vClient, vendorPerson, vendorEmail, vendorMobNumber, vendorMobCode, vendorStatus, errMsg} = props.state;
  const { setStateData, vndrUpdate, handleRouteHome } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Vendor Update</h3>
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
          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='box-body'>
                    <form onSubmit={vndrUpdate}>
                      <div className='row'>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Organization</label>
                            <input type='text' className='form-control' value={orgName} disabled={true} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Vendor Type <span className='text-danger'>*</span></label>
                            <select className='form-select' autoFocus={true} value={vendorType} onChange={(e) => setStateData({ vendorType: e.target.value, errMsg: '' })}>
                              <option value=''>Select Type</option>
                              <option value='Prime Vendor'>Prime Vendor</option>
                              <option value='Vendor'>Vendor</option>
                              <option value="Implementation Partner">Implementation Partner</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Vendor Company <span className='text-danger'>*</span></label>
                            <input type='text'
                              className='form-control'
                              value={vendorName}
                              maxLength={80}
                              onChange={(e) => setStateData({ vendorName: initCaps(e.target.value), errMsg: '' })}
                              placeholder='Enter Vendor Company' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>End Client</label>
                            <input
                              type='text'
                              className='form-control'
                              value={vClient}
                              maxLength={80}
                              onChange={(e) => setStateData({ vClient: initCaps(e.target.value), errMsg: '' })}
                              placeholder='Enter End Client' />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Vendor Name</label>
                            <span className='text-danger'>*</span>
                            <input
                              type='text'
                              className='form-control'
                              value={vendorPerson}
                              maxLength={60}
                              onChange={(e) => setStateData({ vendorPerson: initCaps(e.target.value), errMsg: '' })}
                              placeholder='Enter Vendor Name'
                            />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Vendor Email <span className='text-danger'>*</span></label>
                            <input
                              type='text'
                              className='form-control'
                              value={vendorEmail}
                              maxLength={100}
                              onChange={(e) => setStateData({ vendorEmail: e.target.value, errMsg: '' })}
                              placeholder='Enter Vendor Email'
                            />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Mobile Number <span className='text-danger'>*</span></label>
                            <div className='d-flex'>
                              <select className='form-select' style={{ width: 'auto' }} value={vendorMobCode} onChange={(e) => setStateData({ vendorMobCode: e.target.value, errMsg: '' })}>
                                <option value=''>Mob Code</option>
                                {Countries.length > 0 && Countries.map((val, i) => <option key={val.code} value={val.mobCC}>{val.mobCC + ' (' + val.sCode + ')'}</option>)}
                              </select>
                              <input className='form-control' placeholder='Enter Mobile Number' type='text' value={vendorMobNumber} onChange={(e) => setStateData({ vendorMobNumber: e.target.value, errMsg: '' })} onKeyPress={numebersOnly} maxLength='10' />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Status</label>
                            <select className='form-select' value={vendorStatus} onChange={(e) => setStateData({ vendorStatus: e.target.value, errMsg: '' })}>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      {/* {vendorType == 'Vendor' &&
                        <div className='row mt-2'>
                          <div className='col-md-12'>
                            <h5>Prime Vendor / Implementation:</h5>
                            <hr className="my-15" />
                            <div className='row'>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Type</label><span className='text-danger'>*</span>
                                  <select className='form-select form-control' value={pvipType} onChange={(e) => setStateData({ pvipType: e.target.value, errMsg: '' })}>
                                    <option value=''>Select Type</option>
                                    <option value='Prime Vendor'>Prime Vendor</option>
                                    <option value="Implementation Partner">Implementation Partner</option>
                                  </select>
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Company Name</label><span className='text-danger'>*</span>
                                  <input type='text' className='form-control' placeholder='Company Name' value={pvipName} onChange={(e) => setStateData({ pvipName: initCaps(e.target.value), errMsg: '' })} />
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Name</label>
                                  <input type='text' className='form-control' placeholder='Name' value={pvipcPerson} onChange={(e) => setStateData({ pvipcPerson: initCaps(e.target.value), errMsg: '' })} />
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Email ID</label>
                                  <input type='text' className='form-control' placeholder='Email ID' value={pvipcEmail} onChange={(e) => setStateData({ pvipcEmail: e.target.value, errMsg: '' })} />
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Phone Number</label>
                                  <div className='d-flex'>
                                    <select className='form-select form-control' style={{ width: '70px' }} value={pvipcMobCc} onChange={(e) => setStateData({ pvipcMobCc: e.target.value, errMsg: '' })}>
                                      <option value='+1'>+1</option>
                                      <option value='+91'>+91</option>
                                    </select>
                                    <div className='flex-grow-1'>
                                      <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={pvipcMobNum} onChange={(e) => setStateData({ pvipcMobNum: e.target.value, errMsg: '' })} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>} */}
                      {errMsg && <p className='d-flex justify-content-center text-danger'>{errMsg}</p>}
                      <div className='d-flex justify-content-center'>
                        <button type='button' className='btn btn-danger m-2' onClick={() => hashHistory.push('/vendors')}>Cancel</button>
                        <button type='submit' className='btn btn-success m-2'>Update</button>
                      </div>
                    </form>
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
};

export default VendorsEditComponent;
