/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import CreatableSelect from 'react-select/creatable';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { numebersOnly, firstCharCaps, initCaps } from '../../hooks/common';
import hashHistory from '../../hashHistory';

const CandidateInterviwsViewComponent = (props) => {
  const { interviwView, rolesObj, errMsg, sucMsg, iStatus, mShow, vrfyNts, invName, invEmail, invMobCc, invMobNum, cmnInvgtrArr, invglstrs} = props.state;
  const {handleInvView, setStateData, handleStatusUpdate, handleIntrvwReview} = props;

  const date = interviwView.isDtStr ? moment(interviwView.isDtStr).format('DD MMM, YYYY HH:mm') : '';
  const hours = Math.floor(interviwView.duration / 60);
  const minutes = interviwView.duration % 60;
  const time = hours == 0 ? '' : (hours == 1 ? `${hours} hr ` : `${hours} hrs `);
  const mTime = `${time} ${minutes} mins`;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Interview View</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/interviews')} aria-current='page'>Interview</li>
                      <li className='breadcrumb-item active' aria-current='page'>View</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-7 col-xl-12'>
                <div className='box'>
                  <div className='box-body'>
                    <div className='text-info d-flex justify-content-between'>
                      <div className='back'>
                        <a onClick={() => hashHistory.push('/interviews')}><i className='fa-solid fa-arrow-left'></i></a>
                      <h4 className='box-title mb-0 text-info'>Interview Details </h4>
                      </div>
                      <div>
                        {(interviwView.isVrfd == false) && 
                          <button className="btn btn-sm btn-success me-2" onClick={() => handleIntrvwReview('Approved')} title="Approve" >Approve</button>}
                        {(interviwView.isVrfd  == false) && 
                          <button className="btn btn-sm btn-danger me-2" onClick={() => handleIntrvwReview('Rejected')} title="Reject" >Reject</button>}
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleInvView()}>Consultant Details</button>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => hashHistory.push('/interviews')} title="Back" >Back</button>
                      </div>
                    </div>
                    <hr className='my-10' />
                    <div className='user-view'>
                    <ul className='list-unstyled clearfix bg-grey'>
                      <li className='w-md-p30 float-left'>
                        <span>Screening Type</span>
                        <p className='font-weight-500 mb-0'> {interviwView.process} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Interview WIth</span>
                        <p className='font-weight-500 mb-0'> {interviwView.invWith} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Interview Round</span>
                        <p className='font-weight-500 mb-0'> {interviwView.round} </p>
                      </li>
                      </ul>
                      <ul className='list-unstyled clearfix'>
                      <li className='w-md-p30 float-left'>
                        <span>Interview ID</span>
                        <p className='font-weight-500 mb-0'> {interviwView.intrwId} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Submission ID</span>
                        <p className='font-weight-500 mb-0'> {interviwView.subId} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                          <span>Status</span>
                          <p className='font-weight-500 mb-0'><div className={`${interviwView.iStatus == 'Scheduled' ? 'badge badge-primary-light' : interviwView.iStatus == 'Completed' ? 'badge badge-success-light' : interviwView.iStatus == 'Next Round' ? 'badge badge-warning-light' : interviwView.iStatus == 'Placed' ? 'badge badge-success-light' : interviwView.iStatus == 'On Hold' ? 'badge badge-danger-light' : interviwView.iStatus == 'Not Selected' ? 'badge badge-danger-light' : ''}`}> {interviwView.iStatus} </div></p>
                      </li>
                    </ul>
                    <ul className='list-unstyled clearfix bg-grey'>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Name</span>
                        <p className='font-weight-500 mb-0'> {interviwView.canName} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Mobile #</span>
                        <p className='font-weight-500 mb-0'> {interviwView.canPhNum} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Email</span>
                        <p className='font-weight-500 mb-0'> {interviwView.canEmail} </p>
                      </li>
                    </ul>
                    <ul className='list-unstyled clearfix'>
                    <li className='w-md-p30 float-left'>
                        <span>Scheduled On</span>
                        <p className='font-weight-500 mb-0'>{date + ' ' + interviwView.iTz}</p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Duration</span>
                        <p className='font-weight-500 mb-0'> {mTime} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Job Title</span>
                        <p className='font-weight-500 mb-0'> {interviwView.jobTitle && interviwView.jobId ? interviwView.jobTitle + ' | ' + interviwView.jobId + '(' + ' ID ' + ')' : interviwView.jobTitle} </p>
                      </li>
                      {/* <li className='w-md-p30 float-left'>
                        <span>Job Title</span>
                        <p className='font-weight-500 mb-0'> {interviwView.jobTitle}</p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Job ID</span>
                        <p className='font-weight-500 mb-0'> {interviwView.jobId} </p>
                      </li> */}
                    </ul>
                    <ul className='list-unstyled clearfix bg-grey'>
                      <li className='w-md-p30 float-left'>
                        <span>Skills</span>
                        <p className='font-weight-500 mb-0'> {interviwView.skills}</p>
                      </li>
                      <li className='w-md-p60 float-left'>
                        <span>Job Description</span>
                        <p className='font-weight-500 mb-0'> {interviwView.jobDesc} </p>
                      </li>
                    </ul>
                  {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[11]?.isAlwd) || rolesObj?.appAcc) &&
                    <>
                    <div className='text-info mt-3'>
                      <h5>Job Location:</h5>
                      <hr className='my-10' />
                    </div>
                    <div>
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span>Country</span>
                          <p className='font-weight-500 mb-0'> {interviwView.country} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span>State</span>
                          <p className='font-weight-500 mb-0'> {interviwView.state}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span> City</span>
                          <p className='font-weight-500 mb-0'> {interviwView.city} </p>
                        </li>
                      </ul>
                    </div>
                  </>}
                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[12]?.isAlwd) || rolesObj?.appAcc) && <>
                    <div className='text-info'>
                      <h5>Vendor Information</h5>
                      <hr className='my-10' />
                    </div>
                    <div>
                      <ul className='list-unstyled clearfix'>
                        <li className='w-md-p30 float-left'>
                          <span>Vendor Type</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vType} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span>Company Name</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vName}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span>Client</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vClient}</p>
                        </li>
                      </ul>
                      {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && 
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span>Vendor Name</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vcPerson} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span> Email ID</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vcEmail} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span>Phone Number</span>
                          <p className='font-weight-500 mb-0'> {interviwView.vcMobCcNum} </p>
                        </li>
                      </ul>}
                    </div>
                    {interviwView.vType == 'Vendor' &&
                      <div className='text-info'>
                        <h5>Prime Vendor / Implementation:</h5>
                      </div>}
                    {interviwView.vType == 'Vendor' &&
                      <>
                        <div>
                          <ul className='list-unstyled clearfix'>
                            <li className='w-md-p30 float-left'>
                              <span>Type</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipType} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span>Company Name</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipName}</p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span>End Client</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipClient}</p>
                            </li>
                            <div className='clearfix'></div>
                          </ul>
                          {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && 
                          <ul className='list-unstyled clearfix bg-grey'>
                          <li className='w-md-p30 float-left'>
                              <span>Name</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipcPerson} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span> Email ID</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipcEmail} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span>Phone Number</span>
                              <p className='font-weight-500 mb-0'> {interviwView.pvipcMobCcNum} </p>
                            </li>
                          </ul>}
                        </div>
                      </>
                    }
                  </>}
                    </div>
                  </div>
                </div>
              </div>
              {/* /.col  */}
            </div>
            {/* /.row  */}
            <Modal show={mShow} onHide={() => setStateData({ mShow: false,  errMsg: '', sucMsg: '' })} size='lg'>
              <Modal.Header closeButton>
                <h5><strong>{iStatus === 'Rejected'? "Interview Reject" : "Interview Approve"} </strong></h5>
              </Modal.Header>
              <Modal.Body>
                <div className='user-view mb-3'>
                  <ul className='list-unstyled clearfix'>
                    <li className='w-md-p30 float-left'>
                      <label className='form-label'>Candidate	</label>
                      <p className='font-weight-500 mb-0'>{interviwView.euName}</p>
                    </li>
                    <li className='w-md-p30 float-left'>
                      <label className='form-label'>Interview ID</label>
                      <p className='font-weight-500 mb-0'>{interviwView.intrwId}</p>
                    </li>
                    <li className='w-md-p30 float-left'>
                      <label className='form-label'>Job Title</label>
                      <p className='font-weight-500 mb-0'>{interviwView.jobTitle}</p>
                    </li>
                  </ul>
                  <ul className='list-unstyled clearfix bg-grey'>
                    <li className='w-md-p30 float-left'>
                      <label className='form-label'>Current Status</label>
                      <p className='font-weight-500 mb-0'><div  className={`${interviwView.iStatus == 'Submitted' ? 'badge badge-primary-light' : interviwView.iStatus == 'Shortlisted' ? 'badge badge-success-light' : interviwView.iStatus == 'Rejected' ? 'badge badge-danger-light' : interviwView.iStatus == 'No Response' ? 'badge badge-primary-light' : interviwView.iStatus == 'Interview Scheduled' ? 'badge badge-warning-light' : 'badge badge-warning-light'}`}> {interviwView.iStatus} </div></p>
                    </li>
                    <li className='w-md-p60 float-left'>
                      <label className='form-label'>Interview Notes</label>
                      <p className='font-weight-500 mb-0'>{interviwView.isNotes}</p>
                    </li>
                  </ul>
                </div>
                <form>
                  <div className='row'>
                    {iStatus == 'Approved' && <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Invigilator Name</label><span className='text-danger'>*</span>
                        <div className='form-control'>
                          <CreatableSelect
                            isClearable
                            value={invglstrs}
                            options={cmnInvgtrArr}
                            onChange={(data) => setStateData({ invglstrs: data?.__isNew__ ? { label: initCaps(data.label), value: initCaps(data.value) } : data, invMobCc: data?.mobCcNum?.split(' ')[0] || '+1', invMobNum: data?.mobCcNum?.split(' ')[1] || '',  invEmail: data?.emId || '', errMsg: '' })}
                          />
                        </div>
                      </div>
                    </div>}
                    {iStatus == 'Approved' && <div className='col-md-4'>
                      <div className='form-group'>
                        <label>Phone Number</label>
                        <div className='d-flex'>
                          <select className='form-select form-control' style={{ width: '70px' }} value={invMobCc} onChange={(e) => setStateData({ invMobCc: e.target.value, errMsg: '' })}>
                            <option value='+1'>+1</option>
                            <option value='+91'>+91</option>
                          </select>
                          <div className='flex-grow-1'>
                            <input type='text' className='form-control' placeholder='Mobile Number' onKeyPress={numebersOnly} maxLength={10} value={invMobNum} onChange={(e) => setStateData({ invMobNum: e.target.value, errMsg: '' })} />
                          </div>
                        </div>
                      </div>
                    </div>}
                    {iStatus == 'Approved' && <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Invigilator Email</label>
                        <input type='text'className='form-control' placeholder='Enter Invigilator Email' value={invEmail} onChange={(e) => setStateData({ invEmail: e.target.value, errMsg: '' })} rows='3'></input>
                      </div>
                    </div>}
                    <div className='col-md-8'>
                      <div className='form-group'>
                        <label className='form-label'>Verify Notes {<span className='text-danger'>*</span>}</label>
                        <textarea name='decisions' id='decisions3' value={vrfyNts} onChange={(e) => setStateData({ vrfyNts: firstCharCaps(e.target.value), errMsg: '' })} rows='3' className='form-control'></textarea>
                      </div>
                    </div>
                  </div>
                  <div className='row mb-2 mt-2'>
                    <div className='text-center text-danger'>{errMsg}</div>
                    <div className='text-center text-success'>{sucMsg}</div>
                  </div>
                  <div className='text-end'>
                    <button type='button' className='btn btn-danger me-2' onClick={() => setStateData({ mShow: false, errMsg: '', sucMsg: '' })}>No</button>
                    <button type='button' className='btn btn-success' onClick={handleStatusUpdate}>{iStatus == 'Rejected' ? "Reject" : "Approve"}</button>
                  </div>
                </form>
              </Modal.Body>``
            </Modal>
          </section>
        </div>
      </div>
    </div>
  )
}

export default CandidateInterviwsViewComponent;
