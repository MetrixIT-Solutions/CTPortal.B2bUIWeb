/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { allCapsAlphaNum, initCaps, numebersOnly, capHifenLetter, firstCharCaps } from '../../hooks/common';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';

const BranchesCreateComponent = (props) => {
  const { orgId, obName, obCode, obEmID, obAltEmID, orgsList, obWs, obGst, obPan, obCin, obTin, obSsn, obEin, obItin, obTan, hNum, area, zip, city, stateCode, countryCode, obMobCc, obAltMobCc, obMobNum, obAltMobNum, obStatus, obNotes, statesList, errMsg, disable,isCheck } = props.state;
  const { handleChangeOrg, handleCountryChange, handleStateChange, setStateData, branchCreate, handleCheckBox } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Create Branch</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/organizations/branches')}>Branches</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Create</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='bs-stepper mt-3'>
                    <div className='bs-stepper-content'>
                      <div className='row'>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Organization</label><span className='text-danger'>*</span>
                            <select className='form-select' autoFocus={true} value={orgId} onChange={handleChangeOrg}>
                              <option value=''>Select</option>
                              {orgsList.length && orgsList.map(item => <option key={item._id} value={item._id}>{item.orgName + ' (' + item.orgCode + ')'}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Branch Name</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Branch Name' value={obName} onChange={(e) => setStateData({ obName: initCaps(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Branch Code</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Branch Code' maxLength={10} value={obCode} onChange={(e) => setStateData({ obCode: capHifenLetter(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Status</label><span className='text-danger'>*</span>
                            <select className='form-select form-control' value={obStatus} onChange={(e) => setStateData({ obStatus: e.target.value, errMsg: '' })}>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Mobile Number</label>
                            <div className='d-flex'>
                              <select className='form-select form-control' style={{ width: '70px', height: '33px' }} value={obMobCc} onChange={(e) => setStateData({ obMobCc: e.target.value })}>
                                <option value='+1'>+1</option>
                                <option value='+91'>+91</option>
                              </select>
                              <div className="flex-grow-1">
                                <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={obMobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ obMobNum: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Email</label>
                            <input type='text' className='form-control' placeholder='Email' value={obEmID} onChange={(e) => setStateData({ obEmID: (e.target.value.replace(/\s/g, '')).toLowerCase(), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Alternate Mobile Number</label>
                            <div className='d-flex'>
                              <select className='form-select form-control' style={{ width: '70px', height: '33px' }} value={obAltMobCc} onChange={(e) => setStateData({ obAltMobCc: e.target.value })}>
                                <option value='+1'>+1</option>
                                <option value='+91'>+91</option>
                              </select>
                              <div className="flex-grow-1">
                                <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={obAltMobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ obAltMobNum: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Alternate Email</label>
                            <input type='text' className='form-control' placeholder='Email' value={obAltEmID} onChange={(e) => setStateData({ obAltEmID: (e.target.value.replace(/\s/g, '')).toLowerCase(), errMsg: '' })} />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <div className='form-group'>
                            <label>Notes:</label>
                            <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={obNotes} onChange={(e) => setStateData({ obNotes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                              <div className='form-check d-flex pl-0'>
                              <h5 className='box-title text-info me-3'><i className='fa-regular fa-address-book'></i> Address:</h5>
                              <input className='form-check-input' type='checkbox' id='flexCheckDefault' value={isCheck} onChange={handleCheckBox} />
                              <label className=' text-info' for='flexCheckDefault'>Same as Organization </label>
                          </div>
                          <h5 className='box-title text-info'></h5>
                          <hr className='my-15' />
                          <div className='row'>
                          <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Country</label><span className='text-danger'>*</span>
                                <select className='form-select form-control' value={countryCode} onChange={handleCountryChange}>
                                  <option value=''>Select</option>
                                  {Countries.length > 0 && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>State</label><span className='text-danger'>*</span>
                                <select className='form-select form-control' value={stateCode} onChange={handleStateChange}>
                                  <option value=''>Select</option>
                                  {statesList && statesList.length > 0 && statesList.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Address</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='House No.' value={hNum} onChange={(e) => setStateData({ hNum: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Street/Area</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='Area' value={area} onChange={(e) => setStateData({ area: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>City</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='City' value={city} onChange={(e) => setStateData({ city: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Zip</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='Zip' maxLength={10} value={zip} onKeyPress={numebersOnly} onChange={(e) => setStateData({ zip: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* -------------------------------------- */}
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Organization Info:</h5>
                          <hr className='my-15' />
                          <div className='row'>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Website</label>
                                <input type='text' className='form-control' placeholder='Website' value={obWs} onChange={(e) => setStateData({ obWs: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>GST</label>
                                <input type='text' className='form-control' placeholder='Goods and Services Tax' value={obGst} onChange={(e) => setStateData({ obGst: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>PAN</label>
                                <input type='text' className='form-control' placeholder='Permanent Account Number' value={obPan} onChange={(e) => setStateData({ obPan: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>CIN</label>
                                <input type='text' className='form-control' placeholder='Corporate Identification Number' value={obCin} onChange={(e) => setStateData({ obCin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>TIN</label>
                                <input type='text' className='form-control' placeholder='Tax Identification Number' value={obTin} onChange={(e) => setStateData({ obTin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>SSN</label>
                                <input type='text' className='form-control' placeholder='Social Security Number' value={obSsn} onChange={(e) => setStateData({ obSsn: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>EIN</label>
                                <input type='text' className='form-control' placeholder='Employer Identification Number' value={obEin} onChange={(e) => setStateData({ obEin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>ITIN</label>
                                <input type='text' className='form-control' placeholder='Individual Taxpayer Identification Number' value={obItin} onChange={(e) => setStateData({ obItin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>TAN</label>
                                <input type='text' className='form-control' placeholder='Tax deduction and collection Account Number' value={obTan} onChange={(e) => setStateData({ obTan: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <button className='btn btn-danger me-2' onClick={() => hashHistory.push('/organizations/branches')}>Back</button>
                        <button className='btn btn-primary' type='button' disabled={disable} onClick={branchCreate}>Create</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box*/}
              </div>
            </div>
          </section>
        </div>
      </div>
      <NavComponent />
      <FooterComponent />
    </div>
  )
}

export default BranchesCreateComponent