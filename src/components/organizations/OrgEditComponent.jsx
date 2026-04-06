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
import { allCapsAlphaNum, firstCharCaps, numebersOnly, allSmallAlpha, capHifenLetter, initCaps } from '../../hooks/common';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';

const OrgEditComponent = (props) => {
  const { orgName, orgCode, orgMobNum, orgMobCc, orgEmID, orgStatus, orgNotes, hNum, area, aLocality, zip, stateCode, city, countryCode, orgWs, orgGst, orgPan, orgCin, orgTin, orgSsn, orgEin, orgItin, orgTan, errMsg, disable, statesArr, file, imgUrl, iconPath, initialData, orgType} = props.state;
  const { setStateData, handleCountryChange, handleEditClick, handleStateChange, onImageChange, removeImage, fileInput, handleRouteHome } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className="content-wrapper">
        <div className="container-full">
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="page-title">Edit Organization</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-home"></i></a></li>
                      <li className="breadcrumb-item" aria-current="page"><a onClick={() => hashHistory.push('/organizations')}>Organizations</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Edit</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content */}
          <section className="content">
            <div className='row'>
              <div className="col-md-12 col-12">
                <div className="box">
                  {/* <div className="box-header with-border">
                    <h4 className="box-title">Sample form 1</h4>
                  </div> */}
                  <div className="bs-stepper mt-3">
                    <div className="bs-stepper-content">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Name</label><span className='text-danger'>*</span>
                            <input type="text" className="form-control" placeholder="Name" value={orgName} onChange={(e) => setStateData({ orgName: firstCharCaps(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Code</label><span className='text-danger'>*</span>
                            <input type="text" className="form-control" placeholder="Code" disabled={orgType == 'Principal' ? true : false} maxLength={10} value={orgCode} onChange={(e) => setStateData({ orgCode: capHifenLetter(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Mobile Number</label><span className='text-danger'>*</span>
                            <div className='d-flex'>
                              <select className="form-select form-control" style={{ width: '70px', height: '33px' }} value={orgMobCc} onChange={(e) => setStateData({ orgMobCc: e.target.value })}>
                                <option value='+1'>+1</option>
                                <option value='+91'>+91</option>
                              </select>
                              <div className="flex-grow-1">
                                <input type="text" className="form-control" placeholder="Mobile Number" maxLength={10} value={orgMobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ orgMobNum: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Email</label><span className='text-danger'>*</span>
                            <input type="text" className="form-control" placeholder="Email" value={orgEmID} onChange={(e) => setStateData({ orgEmID: (e.target.value).toLowerCase().trim(), errMsg: '' })} />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Status</label><span className='text-danger'>*</span>
                            <select className="form-select form-control" id="participants6" name="" value={orgStatus} onChange={(e) => setStateData({ orgStatus: e.target.value, errMsg: '' })}>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className="mb-3">
                            <label>Icon</label>
                            <input className='form-control' type='file' onChange={onImageChange} ref={fileInput} accept="image/png" />

                            {file &&
                              <div className='d-flex mt-1'>
                                {iconPath ?
                                  (
                                    <img src={initialData.oiPath} alt={initialData.oiActualName} style={{ width: 130, height: 130 }} className="img-fluid me-2" />
                                  ) : (
                                    <img src={imgUrl} alt={file.name} style={{ width: 130, height: 130 }} className="img-fluid me-2" />
                                  )}
                                <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
                              </div>}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Notes:</label>
                            <textarea name="decisions" id="decisions3" rows="4" className="form-control" value={orgNotes} onChange={(e) => setStateData({ orgNotes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                          <h5 className="box-title text-info"><i className="fa-regular fa-address-book"></i> Address:</h5>
                          <hr className="my-15" />
                          <div className="row">
                          <div className="col-md-3">
                              <div className="form-group">
                                <label>Country</label><span className='text-danger'>*</span>
                                <select className="form-select form-control" id="participants6" name="" value={countryCode} onChange={handleCountryChange}>
                                  <option value="">Select</option>
                                  {Countries.length > 0 && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>State</label><span className='text-danger'>*</span>
                                <select className="form-select form-control" id="participants6" name="" value={stateCode} onChange={handleStateChange}>
                                  <option value="">Select</option>
                                  {statesArr && statesArr.length > 0 && statesArr.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Address</label><span className='text-danger'>*</span>
                                <input type="text" className="form-control" placeholder="Address" value={hNum} onChange={(e) => setStateData({ hNum: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Street / Area</label><span className='text-danger'>*</span>
                                <input type="text" className="form-control" placeholder="Street / Area" value={area} onChange={(e) => setStateData({ area: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>City</label><span className='text-danger'>*</span>
                                <input type="text" className="form-control" placeholder="City" value={city} onChange={(e) => setStateData({ city: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Zip</label><span className='text-danger'>*</span>
                                <input type="text" className="form-control" placeholder="Zip" maxLength={10} value={zip} onKeyPress={numebersOnly} onChange={(e) => setStateData({ zip: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                          <h5 className="box-title text-info"><i className="fa-regular fa-address-book"></i> Organization Info:</h5>
                          <hr className="my-15" />
                          <div className="row">
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>Website</label>
                                <input type="text" className="form-control" placeholder="Website" value={orgWs} onChange={(e) => setStateData({ orgWs: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>GST</label>
                                <input type="text" className="form-control" placeholder="Goods and Services Tax" value={orgGst} onChange={(e) => setStateData({ orgGst: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>PAN</label>
                                <input type="text" className="form-control" placeholder="Permanent Account Number" value={orgPan} onChange={(e) => setStateData({ orgPan: allCapsAlphaNum(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>CIN</label>
                                <input type="text" className="form-control" placeholder="Corporate Identification Number" value={orgCin} onChange={(e) => setStateData({ orgCin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>TIN</label>
                                <input type="text" className="form-control" placeholder="Tax Identification Number" value={orgTin} onChange={(e) => setStateData({ orgTin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>SSN</label>
                                <input type="text" className="form-control" placeholder="Social Security Number" value={orgSsn} onChange={(e) => setStateData({ orgSsn: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>EIN</label>
                                <input type="text" className="form-control" placeholder="Employer Identification Number" value={orgEin} onChange={(e) => setStateData({ orgEin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>ITIN</label>
                                <input type="text" className="form-control" placeholder="Individual Taxpayer Identification Number" value={orgItin} onChange={(e) => setStateData({ orgItin: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="form-group">
                                <label>TAN</label>
                                <input type="text" className="form-control" placeholder="Tax deduction and collection Account Number" value={orgTan} onChange={(e) => setStateData({ orgTan: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <button className="btn btn-danger me-2" onClick={() => hashHistory.push('/organizations')}>Back</button>
                        <button className="btn btn-primary" disabled={disable} onClick={handleEditClick} >Submit</button>
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

export default OrgEditComponent