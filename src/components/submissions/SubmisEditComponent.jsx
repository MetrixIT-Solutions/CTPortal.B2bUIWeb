/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { numebersOnly, initCaps, firstCharCaps } from '../../hooks/common';
import data from '../../../public/data/Lookups.json';
import Countries from '../../../public/data/Countries.json';
import hashHistory from '../../hashHistory';
import CommonDropdownComponent from '../common/CommonDropdownComponent';

const SubmisEditComponent = (props) => {
  const { subDate, jobTitle, jobId, status, sNotes, skills, jobDesc, prHr, prNotes, cCode, sCode, statesArr, adrs, area, city, zip, vType, companyName, vName, emId, mobNum, mobCc, client, errMsg, disable, consList, canObj, file, imgUrl, iconPath, initialData, pvipType, pvipName, pvipcPerson, pvipcMobCc, pvipcMobNum, pvipcEmail, userInfo, orgId, rolesObj, cmnModal, cmnValue, cmnErrMsg, cmnSkillArr, cmnJbTitleArr, cmnType } = props.state;
  const { setStateData, handleCountryChange, handleEdit, handleOnchange, removeImage, fileInput, handleJbTitleChange, handleCreateSkill } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Edit Submission</h3>
                <div className='d-inline-block align-items-center'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                    <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/submissions')}>Submissions</a></li>
                    <li className='breadcrumb-item active' aria-current='page'>Edit</li>
                  </ol>
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
                        {(userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) &&
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Organization</label><span className='text-danger'>*</span>
                              <input type='text' className='form-control' placeholder='Organization' value={orgId} disabled/>
                            </div>
                          </div>}
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Candidate</label><span className='text-danger'>*</span>
                            <Select
                              placeholder="Select an option"
                              options={consList}
                              value={canObj || null}
                              isDisabled={true}
                              onChange={(data) => setStateData({ canObj: data, errMsg: '' })}
                            />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Submission Date</label><span className='text-danger'>*</span>
                            <input type='date' className='form-control' placeholder='Date' value={subDate} onChange={(e) => setStateData({ subDate: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Job Title</label><span className='text-danger'>*</span>
                            <div className='d-flex justify-content-between'>
                            <Select
                              isClearable
                              value={jobTitle}
                              options={cmnJbTitleArr}
                              onChange={(data) => setStateData({ jobTitle: data, errMsg: '' })}
                              className='w-100'
                            />
                            <button onClick={() => setStateData({ cmnModal: true, cmnType:'Job Title' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
                          </div>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Job ID</label>
                            <input type='text' className='form-control' placeholder='Job ID' value={jobId} onChange={(e) => setStateData({ jobId: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Status</label><span className='text-danger'>*</span>
                            <select className='form-select form-control' value={status} onChange={(e) => setStateData({ status: e.target.value, errMsg: '' })} disabled>
                              <option value=''>Select </option>
                              <option value='Submitted'>Submitted</option>
                              <option value='Shortlisted'>Shortlisted</option>
                              <option value='No Response'>No Response</option>
                              <option value='Not Submitted'>Not Submitted</option>
                              <option value='Rejected'>Rejected</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group '>
                            <label>Skills </label><span className='text-danger'>*</span>
                            <div className='d-flex justify-content-between'>
                            <Select
                              isMulti
                              value={skills}
                              options={cmnSkillArr || []}
                              onChange={(data) => setStateData({ skills: data.map(item => item.__isNew__ ? { label: initCaps(item.label), value: initCaps(item.value) } : item), errMsg: '' })}
                              className='w-100'
                            />
                            <button onClick={() => setStateData({ cmnModal: true, cmnType:'Skill' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
                          </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Submission Notes</label><span className='text-danger'>*</span>
                            <textarea type='text' className='form-control' rows='2' value={sNotes} onChange={(e) => setStateData({ sNotes: firstCharCaps(e.target.value), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Job Description</label><span className='text-danger'>*</span>
                            <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={jobDesc} onChange={(e) => setStateData({ jobDesc: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                          </div>
                        </div>
                      </div>

                      {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&
                        <div className='row bg-grey d-flex align-items-center'>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Pay Rate/Hr</label>
                              {/* <input type='text' className='form-control' placeholder='Pay Rate/Hr' onKeyPress={numebersOnly} maxLength={3} value={prHr} onChange={(e) => setStateData({ prHr: e.target.value, errMsg: '' })} /> */}
                              <p className='font-weight-500 mb-0'> {prHr} </p>
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Pay Rate Notes</label>
                              {/* <textarea type='text' className='form-control' value={prNotes} onChange={(e) => setStateData({ prNotes: firstCharCaps(e.target.value), errMsg: '' })} /> */}
                              <p className='font-weight-500 mb-0'> {prNotes} </p>
                            </div>
                          </div>
                          {/* <div className='col-md-2'>
                          <div className='form-group mt-1'>
                            <label>RTR confirmation image</label>{prHr && <span className='text-danger'>*</span>}<span><p className='mb-0 text-mute'><small>(File Type: image only)</small></p> </span>
                            <label className='custom-upload btn btn-info px-5'>
                              <input type='file' accept="image/*" name='file' onChange={handleOnchange} ref={fileInput} />
                              <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                            </label>
                          </div>
                        </div> */}
                          {file && <div className='col-md-3'>
                            <div className='d-flex mt-1'>
                              <div className='add-img'>
                                {iconPath ? <img src={initialData.iconPath} alt='Image' style={{ width: 100 }} className="img-fluid me-2" /> : ''}
                              </div>
                              {/* <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a> */}
                            </div>
                          </div>}
                        </div>
                      }
                      <div className='row mb-2 mt-2'>
                        <div className='col-md-12'>
                          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Job Location:</h5>
                          <hr className='my-15' />
                          <div className='row'>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Country</label><span className='text-danger'>*</span>
                                <select className='form-select form-control' value={cCode} onChange={handleCountryChange}>
                                  <option value=''>Select</option>
                                  {Countries.length && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                                </select>
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>State</label><span className='text-danger'>*</span>
                                <select className='form-select form-control' value={sCode} onChange={(e) => setStateData({ sCode: e.target.value, errMsg: '' })}>
                                  <option value=''>Select</option>
                                  {statesArr && statesArr.length && statesArr.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                                </select>
                              </div>
                            </div>
                            {/* <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Address</label>
                                <input type='text' className='form-control' placeholder='Address' value={adrs} onChange={(e) => setStateData({ adrs: e.target.value, errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Street / Area</label>
                                <input type='text' className='form-control' placeholder='Street / Area' value={area} onChange={(e) => setStateData({ area: e.target.value, errMsg: '' })} />
                              </div>
                            </div>                      */}
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>City</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='City' value={city} onChange={(e) => setStateData({ city: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            {/* <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Zip</label>
                                <input type='text' className='form-control' placeholder='Zip' maxLength={10} value={zip} onKeyPress={numebersOnly} onChange={(e) => setStateData({ zip: e.target.value, errMsg: '' })} />
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
                                <label>Vendor Type</label><span className='text-danger'>*</span>
                                <select className='form-select form-control' value={vType} onChange={(e) => setStateData({ vType: e.target.value, errMsg: '' })}>
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
                                <label>Vendor Company Name</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='Vendor Company Name' value={companyName} onChange={(e) => setStateData({ companyName: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>End Client</label>
                                <input type='text' className='form-control' placeholder='End Client' value={client} onChange={(e) => setStateData({ client: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Vendor Name</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='Vendor Name' value={vName} onChange={(e) => setStateData({ vName: initCaps(e.target.value), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Email ID</label><span className='text-danger'>*</span>
                                <input type='text' className='form-control' placeholder='Email ID' value={emId} onChange={(e) => setStateData({ emId: (e.target.value).toLowerCase().trim(), errMsg: '' })} />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Phone Number</label><span className='text-danger'>*</span>
                                <div className='d-flex'>
                                  <select className='form-select form-control' style={{ width: '70px' }} value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value, errMsg: '' })}>
                                    <option value='+1'>+1</option>
                                    <option value='+91'>+91</option>
                                  </select>
                                  <div className='flex-grow-1'>
                                    <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={mobNum} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} />
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
                            <h5> Prime Vendor / Implementation:</h5>
                            <div className='row'>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Type</label>{vType == 'Vendor' && (pvipName || pvipcPerson || pvipcEmail || pvipcMobNum) && <span className='text-danger'>*</span>}
                                  <select className='form-select form-control' value={pvipType} onChange={(e) => setStateData({ pvipType: e.target.value, errMsg: '' })}>
                                    <option value=''>Select Type</option>
                                    <option value='Prime Vendor'>Prime Vendor</option>
                                    <option value="Implementation Partner">Implementation Partner</option>
                                  </select>
                                </div>
                              </div>
                              <div className='col-md-3'>
                                <div className='form-group'>
                                  <label>Company Name</label>
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
                                      <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} value={pvipcMobNum} onChange={(e) => setStateData({ pvipcMobNum: e.target.value, errMsg: '' })} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>}
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <button className='btn btn-danger mr-2' onClick={() => hashHistory.push('/submissions')}>Cancel</button>
                        <button className='btn btn-primary' disabled={disable} onClick={handleEdit}>Update</button>
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
      <CommonDropdownComponent
        title={`${cmnType === 'Skill' ? 'Skill' : 'Job Title'}`}
        show={cmnModal}
        name={cmnValue}
        errMsg={cmnErrMsg}
        onChange={(e) => setStateData({ cmnValue: initCaps(e.target.value), cmnErrMsg: '' })}
        onHide={() => setStateData({ cmnModal: false, cmnValue: '', cmnErrMsg:'' })}
        onClick={() => handleCreateSkill(cmnType === 'Skill' ? 'Skill' : 'Job Title')}
      />
    </div>
  )
}

export default SubmisEditComponent;