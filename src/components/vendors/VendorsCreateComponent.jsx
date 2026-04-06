
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

const VendorsCreateComponent = (props) => {
  const { vendor, cVdrName, cVdrPerson, email, cVdrMobNum, mobCc, status, errMsg, vClient, orgId, orgsList, appAcc} = props.state;
  const { setStateData, vndrCreate, handleRouteHome } = props;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Create Vendors</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a href='#' onClick={handleRouteHome} ><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' onClick={() => hashHistory.push('/vendors')} aria-current='page'>Vendors</li>
                      <li className='breadcrumb-item active' aria-current='page'>Create Vendors</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  <div className='box-body'>
                  <form onSubmit={vndrCreate}>
                    <div className='row'>
                      <div className='col-md-3'>
                          <div className='form-group'>
                            <label className='form-label'>Organization</label>
                            <span className='text-danger'>*</span>
                            {appAcc ?  <select className='form-select' autoFocus={true} value={orgId} onChange={(e) => setStateData({  orgId: e.target.value, errMsg: '' })}>
                              <option value=''>Select</option>
                              {orgsList.length && orgsList.map(item => <option key={item._id} value={item._id}>{item.orgName + ' (' + item.orgCode.toUpperCase() + ')'}</option>)}
                            </select>
                            : <select className='form-select' disabled={true} value={orgId} onChange={(e) => setStateData({  orgId: e.target.value, errMsg: '' })}>
                              {orgsList.length && orgsList.map(item => <option key={item._id} value={item._id}>{item.orgName + ' (' + item.orgCode.toUpperCase() + ')'}</option>)}
                            </select>}
                          </div>
                        </div>
                      <div className='col-md-3'>
                        <div className='form-group'>
                          <label className='form-label'>Vendor Type</label>
                          <span className='text-danger'>*</span>
                          <select className='form-select' autoFocus={true} value={vendor} onChange={(e) => setStateData({ vendor: e.target.value, errMsg: '', pvipType: '', pvipName: '', pvipcPerson: '', pvipcMobCc: '+1', pvipcMobNum: '', pvipcMobCcNum: '', pvipcEmail: '', pvipClient: '' })}>
                            <option value=''>Select Type</option>
                            <option value='Prime Vendor'>Prime Vendor</option>
                            <option value='Vendor'>Vendor</option>
                            <option value="Implementation Partner">Implementation Partner</option>
                          </select>
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div className='form-group'>
                          <label className='form-label'>Vendor Company</label>
                          <span className='text-danger'>*</span>
                          <input
                            type='text'
                            className='form-control'
                            value={cVdrName}
                            maxLength={80}
                            onChange={(e) => setStateData({ cVdrName: initCaps(e.target.value), errMsg: '' })}
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
                            value={cVdrPerson}
                            maxLength={60}
                            onChange={(e) => setStateData({ cVdrPerson: initCaps(e.target.value), errMsg: '' })}
                            placeholder='Enter Vendor Name'
                          />
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div className='form-group'>
                          <label className='form-label'>Vendor Email</label>
                          <span className='text-danger'>*</span>
                          <input
                            type='text'
                            className='form-control'
                            value={email}
                            maxLength={100}
                            onChange={(e) => setStateData({ email: (e.target.value).toLowerCase().trim(), errMsg: '' })}
                            placeholder='Enter Vendor Email'
                          />
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div className='form-group'>
                          <label className='form-label'>Mobile Number</label>
                          <span className='text-danger'>*</span>
                          <div className='d-flex'>
                            <select className='form-select' style={{ width: 'auto' }} value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value, errMsg: '' })}>
                              <option value=''>Mob Code</option>
                              {Countries.length > 0 && Countries.map((val, i) => <option key={val.code} value={val.mobCC}>{val.mobCC + ' (' + val.sCode + ')'}</option>)}
                            </select>
                            <input className='form-control' placeholder='Enter Mobile Number' type='text' value={cVdrMobNum} onChange={(e) => setStateData({ cVdrMobNum: e.target.value, errMsg: '' })} onKeyPress={numebersOnly} maxLength='10' />
                          </div>
                        </div>
                      </div>
                      <div className='col-md-3'>
                        <div className='form-group'>
                          <label className='form-label'>Status</label>
                          <select className='form-select' value={status} onChange={(e) => setStateData({ status: e.target.value, errMsg: '' })}>
                            <option value='Active'>Active</option>
                            <option value='Inactive'>Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* {vendor == 'Vendor' &&
                        <div className='row mt-3'>
                          <div className='col-md-12'>
                            <h5>Prime Vendor / Implementation:</h5>
                            <div className='row m-2'>
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
                                  <input type='text' className='form-control' placeholder='Email ID' value={pvipcEmail} onChange={(e) => setStateData({ pvipcEmail: (e.target.value).toLowerCase().trim(), errMsg: '' })} />
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
                                      <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={pvipcMobNum} onChange={(e) => setStateData({ pvipcMobNum: e.target.value, errMsg: '' })} onKeyPress={numebersOnly} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>} */}
                    {errMsg && <p className='d-flex justify-content-center text-danger'>{errMsg}</p>}
                    <div className='d-flex justify-content-center'>
                      <button type='button' className='btn btn-secondary m-2' onClick={() => hashHistory.push('/vendors')}>Back</button>
                      <button type='submit' className='btn btn-success m-2'>Create</button>
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

export default VendorsCreateComponent;
