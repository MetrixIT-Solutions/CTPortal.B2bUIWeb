/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import CreatableSelect from 'react-select/creatable';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { firstCharCaps, numebersOnly, initCaps } from '../../hooks/common';
import hashHistory from '../../hashHistory';
import Countries from '../../../public/data/Countries.json';
import data from '../../../public/data/Lookups.json';

const InterviewEditComponent = (props) => {
  const { scrType, invDate, invTime, timeZone, hrs, mins, canName, canMobNum, canMobCc, jobTitle, jobId, jobDesc, invNotes, invPmem, testCompany, file, imgUrl, cCode, sCode, ards, area, city, zip, statesArr, client, skills, vType, companyName, vName, emId, mobCc, mobNum, errMsg, disable, iconPath, initialData, invWith, round } = props.state;
  const { setStateData, handleEdit, handleOnchange, removeImage, fileInput, handleInvChange } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Schedule Interview</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/interviews')}>Interviews</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Edit</li>
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
                        <div className='col-md-2'>
                          <div className='form-group'>
                            <label>Screening Type	</label><span className='text-danger'>*</span>
                            <select className='form-select form-control' id='participants6' value={scrType} onChange={handleInvChange}>
                              <option value=''>Select</option>
                              <option value='Video Interview'>Video Interview</option>
                              <option value='Audio Interview'>Audio Interview</option>
                              <option value='Face to Face'>Face to Face</option>
                              <option value='Online Test'>Online Test</option>
                              <option value='Written Test'>Written Test</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-2'>
                          <div className='form-group'>
                            <label>Interview With</label><span className='text-danger'>*</span>
                            <select className='form-select form-control' id='participants6' value={invWith} onChange={(e) => setStateData({ invWith: e.target.value, errMsg: '' })}>
                              <option value=''>Select</option>
                              <option value='Client'>Client</option>
                              <option value='Prime Vendor'>Prime Vendor</option>
                              <option value='Vendor'>Vendor</option>
                              <option value="Implementation Partner">Implementation Partner</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-2'>
                          <div className='form-group'>
                            <label>Interview Round</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Round' value={round}  disabled={true} onChange={(e) => setStateData({ round: initCaps(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Job Title</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Job Title' value={jobTitle} disabled={true} onChange={(e) => setStateData({ jobTitle: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Job ID</label>
                            <input type='text' className='form-control' placeholder='Job ID' value={jobId} disabled={true} onChange={(e) => setStateData({ jobId: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-2'>
                          <div className='form-group'>
                            <label>Scheduled Date</label><span className='text-danger'>*</span>
                            <input type='date' className='form-control' placeholder='Scheduled Date' value={invDate} onChange={(e) => setStateData({ invDate: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-1'>
                          <div className='form-group'>
                            <label>Scheduled time</label><span className='text-danger'>*</span>
                            <input type='time' className='form-control' placeholder='Scheduled Time' value={invTime} onChange={(e) => setStateData({ invTime: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-1'>
                          <div className='form-group'>
                            <label>Time Zone</label><span className='text-danger'>*</span>
                            <select className='form-select form-control' id='participants6' value={timeZone} onChange={(e) => setStateData({ timeZone: e.target.value, errMsg: '' })}>
                              {/* <option value=''>Select</option> */}
                              <option value='EST'>EST</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-2'>
                          <div className='form-group'>
                            <label>Duration</label><span className='text-danger'>*</span>
                            <div className='d-flex'>
                              <input type='text' className='form-control me-2' placeholder='Hours' maxLength={1} onKeyPress={numebersOnly} value={hrs} onChange={(e) => setStateData({ hrs: e.target.value, errMsg: '' })} />
                              <input type='text' className='form-control' placeholder='Minutes' maxLength={2} onKeyPress={numebersOnly} value={mins} onChange={(e) => setStateData({ mins: e.target.value, errMsg: '' })} />
                            </div>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Candidate Name</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Candidate Name' value={canName} disabled={true} Change={(e) => setStateData({ canName: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Candidate Mobile Number</label><span className='text-danger'>*</span>
                            <div className='d-flex'>
                              {/* <select className='form-select form-control' style={{ width: '70px' }} value={canMobCc} onChange={(e) => setStateData({ canMobCc: e.target.value, errMsg: '' })}>
                                <option value='+1'>+1</option>
                                <option value='+91'>+91</option>
                              </select> */}
                              <div className='flex-grow-1'>
                                <input type='text' className='form-control' placeholder='Candidate Mobile Number' onKeyPress={numebersOnly} maxLength={10} value={canMobNum} disabled={true} onChange={(e) => setStateData({ canMobNum: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className='row'>
                        <div className='col-md-2'>
                          <div className='form-group mt-1'>
                            <label className='mb-0'>Interview Invite</label><span className='text-danger'>*</span>
                            <label className='custom-upload btn btn-info px-5'>
                              <input type='file' accept="image/*" name='file' onChange={handleOnchange} ref={fileInput} />
                              <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload photo
                            </label>
                          </div>
                        </div>
                        {file && <div className='col-md-2'>
                          <div className='d-flex mt-1'>
                            {iconPath ?
                              (
                                <img src={initialData.ifPath} alt='Image' style={{ width: 130, height: 130 }} className="img-fluid me-2" />
                              ) : (
                                <img src={imgUrl} alt={file.name} style={{ width: 130, height: 130 }} className="img-fluid me-2" />
                              )}
                            <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
                          </div>
                        </div>}
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Skills</label><span className='text-danger'>*</span>
                            <CreatableSelect
                              isMulti
                              value={skills}
                              options={data.skillsList}
                              isDisabled={true}
                              onChange={(data) => setStateData({ skills: data, errMsg: '' })}
                            />
                          </div>
                        </div>
                        <div className='col-md-5'>
                          <div className='form-group'>
                            <label>Job Description:</label><span className='text-danger'>*</span>
                            <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={jobDesc} disabled={true} onChange={(e) => setStateData({ jobDesc: e.target.value, errMsg: '' })}></textarea>
                          </div>
                        </div>
                        </div>
                        <div className='row'>
                        {scrType ? !scrType.includes('Test') ? <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Interview Panel Members</label>
                            <input type='text' className='form-control' placeholder='Interview Panel Members' value={invPmem} onChange={(e) => setStateData({ invPmem: e.target.value, errMsg: '' })} />
                          </div>
                        </div> :
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Test Company</label>
                              <input type='text' className='form-control' placeholder='Test Company' value={testCompany} onChange={(e) => setStateData({ testCompany: e.target.value, errMsg: '' })} />
                            </div>
                          </div> : ''}
                        {/* {scrType ? !scrType.includes('Test') ?
                          <>
                            <div className='col-md-3'>
                              <div className='form-group mt-1'>
                                <label>Interview Files</label> <span><small>(File Type: image only)</small></span>
                                <label className='custom-upload btn btn-info px-5'>
                                  <input type='file' accept="image/*" name='file' onChange={handleOnchange} ref={fileInput} />
                                  <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                                </label>
                              </div>
                            </div>
                          </> :
                          <>
                            <div className='col-md-3'>
                              <div className='form-group mt-1'>
                                <label>Test Files</label> <span><small>(File Type: image only)</small></span>
                                <label className='custom-upload btn btn-info px-5'>
                                  <input type='file' accept="image/*" name='file' onChange={handleOnchange} ref={fileInput} />
                                  <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                                </label>
                              </div>
                            </div>
                          </> : ''} */}
                       
                      </div>
                      <div className='row'>
                        {scrType ? !scrType.includes('Test') ?
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Interview Notes:</label>
                              <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={invNotes} onChange={(e) => setStateData({ invNotes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                            </div>
                          </div> : <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Test Notes:</label>
                              <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={invNotes} onChange={(e) => setStateData({ invNotes: e.target.value, errMsg: '' })}></textarea>
                            </div>
                          </div>
                          : ''}
                      </div>
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Job Location:</h5>
                          <hr className='my-15' />
                          <div className='row'>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Country</label>
                                <select className='form-select form-control' id='participants6' value={cCode} disabled>
                                  <option value=''>Select</option>
                                  {Countries.length > 0 && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>State</label>
                                <select className='form-select form-control' id='participants6' value={sCode} disabled>
                                  <option value=''>Select</option>
                                  {statesArr && statesArr.length > 0 && statesArr.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                              </div>
                            </div>
                            {/* <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Address</label>
                                <input type='text' className='form-control' placeholder='Address' value={ards} disabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Street / Area</label>
                                <input type='text' className='form-control' placeholder='Street / Area' value={area} disabled />
                              </div>
                            </div> */}
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>City</label>
                                <input type='text' className='form-control' placeholder='City' value={city} disabled />
                              </div>
                            </div>
                            {/* <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Zip</label>
                                <input type='text' className='form-control' placeholder='Zip' value={zip} disabled />
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Vendor Information:</h5>
                          <hr className='my-15' />
                          <div className='row'>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Vendor Type</label>
                                <select className='form-select form-control' value={vType} disabled>
                                  <option value=''>Select Type</option>
                                  <option value='Prime Vendor'>Prime Vendor</option>
                                  <option value='Vendor'>Vendor</option>
                                  <option value="Implementation Partner">Implementation Partner</option>
                                </select>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Vendor Company Name</label>
                                <input type='text' className='form-control' placeholder='Vendor Company Name' value={companyName} disabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>End Client</label>
                                <input type='text' className='form-control' placeholder='End Client' value={client} disabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Vendor Name</label>
                                <input type='text' className='form-control' placeholder='Vendor Name' value={vName} disabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Email ID</label>
                                <input type='text' className='form-control' placeholder='Email ID' value={emId} disabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Mobile Number</label>
                                <div className='d-flex'>
                                  <select className='form-select form-control' style={{ width: '70px' }} value={mobCc} disabled>
                                    <option value='+1'>+1</option>
                                    <option value='+91'>+91</option>
                                  </select>
                                  <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={mobNum} disabled />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {vType == 'Vendor' &&
                        <div className='row'>
                          <div className='col-md-12'>
                            <h5>Prime Vendor / Implementation:</h5>
                            <div className='row'>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Type</label>
                                  <select className='form-select form-control' value={initialData.pvipType} disabled={true}>
                                    <option value=''>Select Type</option>
                                    <option value='Prime Vendor'>Prime Vendor</option>
                                    <option value="Implementation Partner">Implementation Partner</option>
                                  </select>
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Company Name</label>
                                  <input type='text' className='form-control' placeholder='Company Name' value={initialData.pvipName} disabled={true}/>
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Name</label>
                                  <input type='text' className='form-control' placeholder='Name' value={initialData.pvipcPerson} disabled={true} />
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Email ID</label>
                                  <input type='text' className='form-control' placeholder='Email ID' value={initialData.pvipcEmail} disabled={true} />
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Phone Number</label>
                                  <div className='d-flex'>
                                    <select className='form-select form-control' style={{ width: '70px' }} value={initialData.pvipcMobCc} disabled={true}>
                                      <option value='+1'>+1</option>
                                      <option value='+91'>+91</option>
                                    </select>
                                    <div className='flex-grow-1'>
                                      <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={initialData.pvipcMobNum} disabled={true}/>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      <div className='text-danger text-center'>{errMsg}</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <button className='btn btn-danger mr-2' onClick={() => hashHistory.push('/interviews')}>Back</button>
                        <button className='btn btn-primary' disabled={disable} onClick={handleEdit}>Edit</button>
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

export default InterviewEditComponent;