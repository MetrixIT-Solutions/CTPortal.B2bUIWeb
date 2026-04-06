/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import { numebersOnly } from '../../hooks/common';
import CommonImageViewComponent from '../common/CommonImageViewComponent';

const SubmissionViewComponent = (props) => {
  const { rolesObj, submissiView, statusModal, errMsg, sucMsg, sStatus, sNotes, prHr, file, imgUrl, prNotes, fileInput, isVrfyNotes, isprImage} = props.state;
  const { setStateData, handleStatus, handleOnchange, removeImage, handleStatusUpdate, handleInvView, payRateChange} = props;
  const date = submissiView.sDtStr ? moment(submissiView.sDtStr).format('DD MMM, YYYY') : '';
  const reviewAcc = ((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && !submissiView.isVrfd;
  const payRateAcc = ((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) 
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Submission View</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/submissions')} aria-current='page'>Submissions</li>
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
                  <div className='d-flex justify-content-between'>
                  <div className='text-info d-flex'>
                    <div className='back'><a onClick={() => hashHistory.push('/submissions')}><i className='fa-solid fa-arrow-left'></i></a></div>
                    <h4 className='box-title mb-0 text-info'>Submission Details</h4>
                    </div>
                      <div className='float-right'>
                        <button className="btn btn-sm btn-success me-2" onClick={() => handleInvView()}>Consultant Details</button>
                        {(submissiView.sStatus !== 'Interview Scheduled') && reviewAcc &&
                          <button className="btn btn-sm btn-success me-2" onClick={() => handleStatus('Approve')} title="Approve" >Approve</button>}
                        {(submissiView.sStatus !== 'Interview Scheduled' &&submissiView.sStatus != 'Rejected') && reviewAcc && 
                          <button className="btn btn-sm btn-danger me-2" onClick={() => handleStatus('Rejected')} title="Reject" >Reject</button>}
                        {(submissiView.sStatus !== 'Interview Scheduled') && reviewAcc &&  
                          <button className="btn btn-sm btn-primary me-2" onClick={() => hashHistory.push('/submissions')} title="Back" >Back</button>}
                      </div>
                    </div>
                    <hr className='my-15' />
                    <div className='user-view'>
                    <ul className='list-unstyled clearfix'>
                      <li className='w-md-p30 float-left'>
                          <span>Submission Date</span>
                          <p className='font-weight-500 mb-0'> {date} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                          <span>Submission ID</span>
                          <p className='font-weight-500 mb-0'> {submissiView.subId} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                          <span>Status</span>
                          <p className='font-weight-500 mb-0'><div  className={`${submissiView.sStatus == 'Submitted' ? 'badge badge-primary-light' : submissiView.sStatus == 'Shortlisted' ? 'badge badge-success-light' : submissiView.sStatus == 'Rejected' ? 'badge badge-danger-light' : submissiView.sStatus == 'No Response' ? 'badge badge-primary-light' : submissiView.sStatus == 'Interview Scheduled' ? 'badge badge-warning-light' : 'badge badge-warning-light'}`}> {submissiView.sStatus} </div></p>
                      </li>
                    </ul>
                    <ul className='list-unstyled clearfix bg-grey'>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Name</span>
                        <p className='font-weight-500 mb-0'> {submissiView.euName} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Mobile #</span>
                        <p className='font-weight-500 mb-0'> {submissiView.canPhNum} </p>
                      </li>
                      <li className='w-md-p30 float-left'>
                        <span>Candidate Email</span>
                        <p className='font-weight-500 mb-0'> {submissiView.canEmail} </p>
                      </li>
                     </ul>
                      <ul className='list-unstyled clearfix'>
                      <li className='w-md-p30 float-left'>
                        <span>Job Title</span>
                        <p className='font-weight-500 mb-0'> {submissiView.jobTitle && submissiView.jobId ? submissiView.jobTitle + ' | ' + submissiView.jobId + '(' + ' ID ' + ')' : submissiView.jobTitle} </p>
                      </li>
                      <li className='w-md-p60 float-left'>
                          <span>Skills</span>
                          <p className='font-weight-500 mb-0'> {submissiView.skills}</p>
                      </li>
                      </ul>
                      <ul className='list-unstyled clearfix bg-grey'>
                      <li className='w-md-p90 float-left'>
                          <span>Job Description</span>
                          <p className='font-weight-500 mb-0'> {submissiView.jobDesc} </p>
                      </li>
                    </ul>
                  {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&
                    <ul className='list-unstyled clearfix'>
                    <li className='w-md-p30 float-left'>
                          <span>Pay Rate/Hr</span>
                          <p className='font-weight-500 mb-0'> {submissiView.prHr} </p>
                      </li>
                      <li className='w-md-p30 float-left '>
                          <span>RTR Confirmation Image</span>
                          <div className='font-weight-500 mb-3'>
                            {submissiView.prfPath ? <p> <img onClick={() => setStateData({isprImage: true})} style={{ width: '150px', height: '150px' }} src={submissiView.prfPath}></img></p> : ''}
                          </div>
                      </li>
                      <li className='w-md-p30 float-left'>
                          <span>Pay Rate Notes</span>
                          <p className='font-weight-500 mb-0'> {submissiView.prNotes} </p>
                      </li>
                    </ul>}
                {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[12]?.isAlwd) || rolesObj?.appAcc) &&
                <>
                    <div className='text-info mt-3'>
                      <h5>Job Location</h5>
                      <hr className='my-10' />
                    </div>
                    <div>
                    <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span>Country</span>
                          <p className='font-weight-500 mb-0'> {submissiView.country} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span>State</span>
                          <p className='font-weight-500 mb-0'> {submissiView.state}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span> City</span>
                          <p className='font-weight-500 mb-0'> {submissiView.city} </p>
                        </li>
                      </ul>
                    </div>
                  </>}
                {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[13]?.isAlwd) || rolesObj?.appAcc) &&
                  <>
                    <div className='text-info'>
                      <h5>Vendor Information</h5>
                    </div>
                    <hr className='my-15' />
                    <div>
                      <ul className='list-unstyled clearfix'>
                        <li className='w-md-p30 float-left'>
                            <span>Vendor Type</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vType} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                            <span>Vendor Company Name</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vName}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                            <span>End Client</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vClient}</p>
                        </li>
                      </ul>
                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[14]?.isAlwd) || rolesObj?.appAcc) &&
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                            <span>Vendor Name</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vcPerson} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                            <span> Email ID</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vcEmail} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                            <span>Phone Number</span>
                            <p className='font-weight-500 mb-0'> {submissiView.vcMobCcNum} </p>
                        </li>
                      </ul>}
                    </div>
                    {submissiView.vType == 'Vendor' &&
                     <div className='text-info'>
                     <h5>Prime Vendor / Implementation</h5>
                   </div>}
                    {submissiView.vType == 'Vendor' &&
                      <>
                        <div>
                          <ul className='list-unstyled clearfix'>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'>Type</span>
                              <p> {submissiView.pvipType} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'>Company Name</span>
                              <p> {submissiView.pvipName}</p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'>End Client</span>
                              <p> {submissiView.pvipClient}</p>
                            </li>
                          </ul>
                        {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[14]?.isAlwd) || rolesObj?.appAcc) &&
                          <ul className='list-unstyled clearfix bg-grey'>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'>Name</span>
                              <p> {submissiView.pvipcPerson} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'> Email ID</span>
                              <p> {submissiView.pvipcEmail} </p>
                            </li>
                            <li className='w-md-p30 float-left'>
                              <span className='font-weight-500 mb-3'>Phone Number</span>
                              <p> {submissiView.pvipcMobCcNum} </p>
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
          </section>
        </div>
      </div>
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false })} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>{sStatus === 'Rejected'? "Submission Reject" : "Submission Approve"} </strong></h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view mb-3'>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Candidate	</label>
                <p className='font-weight-500 mb-0'>{submissiView.euName}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Submission ID</label>
                <p className='font-weight-500 mb-0'>{submissiView.subId}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Job Title</label>
                <p className='font-weight-500 mb-0'>{submissiView.jobTitle}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Current Status</label>
                <p className='font-weight-500 mb-0'><div  className={`${submissiView.sStatus == 'Submitted' ? 'badge badge-primary-light' : submissiView.sStatus == 'Shortlisted' ? 'badge badge-success-light' : submissiView.sStatus == 'Rejected' ? 'badge badge-danger-light' : submissiView.sStatus == 'No Response' ? 'badge badge-primary-light' : submissiView.sStatus == 'Interview Scheduled' ? 'badge badge-warning-light' : 'badge badge-warning-light'}`}> {submissiView.sStatus} </div></p>
              </li>
              <li className='w-md-p60 float-left'>
                <label className='form-label'>Submission Notes</label>
                <p className='font-weight-500 mb-0'>{submissiView.sNotes}</p>
              </li>
            </ul>
          </div>
          <form>
            <div className='row'>
             {/* <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>New Status</label>{sStatus === 'Rejected' ? <span className='text-danger'>*</span> : ''}
                  <select className='form-select form-control' name='orgCode' value={sStatus} onChange={(e) => setStateData({ sStatus: e.target.value, errMsg: '' })}>
                    {sStatus !== 'Rejected' && <option value=''>Select</option> }
                    {(submissiView.sStatus !== 'Submitted' && sStatus !== 'Rejected') && <option value='Submitted'>Submitted</option>}
                    {(submissiView.sStatus !== 'Shortlisted' && sStatus !== 'Rejected') && <option value='Shortlisted'>Shortlisted</option>}
                    {(submissiView.sStatus !== 'No Response'&& sStatus !== 'Rejected') && <option value='No Response'>No Response</option>}
                    {(submissiView.sStatus !== 'Not Submitted'&& sStatus !== 'Rejected') && <option value='Not Submitted'>Not Submitted</option>}
                    {sStatus === 'Rejected' && <option value='Rejected'>Rejected</option> }
                  </select>
                </div>
              </div>
              <div className='col-md-8'>
                <div className='form-group'>
                  <label className='form-label'>Submission Notes{sStatus ? <span className='text-danger'>*</span> : ''}</label>
                  <textarea name='decisions' id='decisions3' value={sNotes} onChange={(e) => setStateData({ sNotes: e.target.value, errMsg: '' })} rows='3' className='form-control'></textarea>
                </div>
              </div> */}
              <div className='col-md-8'>
                <div className='form-group'>
                  <label className='form-label'>Verify Notes {<span className='text-danger'>*</span>}</label>
                  <textarea name='decisions' id='decisions3' value={isVrfyNotes} onChange={(e) => setStateData({ isVrfyNotes: e.target.value, errMsg: '' })} rows='3' className='form-control'></textarea>
                </div>
              </div>
            </div>
            {payRateAcc &&
              <div className='user-view'>
                <ul className='list-unstyled clearfix bg-grey'>
                  <li className='w-md-p30 float-left'>
                    <label className='form-label'>Pay Rate/Hr</label>
                    <p className='font-weight-500 mb-0'>{submissiView.prHr}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    <label className='form-label'>Pay Rate Notes</label>
                    <p className='font-weight-500 mb-0'>{submissiView.prNotes}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    {submissiView.prfPath ? <div className='d-inline-flex mt-1 position-relative'>
                      <div className='add-img'>
                        <img onClick={() => setStateData({isprImage: true})} src={submissiView.prfPath} style={{ width: 100 }} className='img-fluid me-2' />
                      </div>
                    </div> : ''}
                  </li>
                </ul>
              </div>
            }
            {(payRateAcc || (sStatus !== 'Rejected' && !submissiView.prHr)) &&
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>Pay Rate/Hr {sStatus !== 'Rejected' && !submissiView.prHr && <span className='text-danger'>*</span>}</label>
                  <input type='text' className='form-control' placeholder='Pay Rate/Hr' onKeyPress={numebersOnly} maxLength={3} value={prHr} onChange={payRateChange} />
                </div>
              </div>
              <div className='col-md-8'>
                <div className='form-group'>
                  <label className='form-label'>Pay Rate Notes</label>
                  <textarea type='text' className='form-control' rows='3' value={prNotes} onChange={(e) => setStateData({ prNotes: e.target.value, errMsg: '' })} />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group mt-1'>
                  <label className='mb-0'>RTR Confirmation {((sStatus !== 'Rejected' && !submissiView.prHr) || prHr) && <span className='text-danger'>*</span>}</label>
                  <p className='mb-0 text-mute'>
                    <span className='mb-1'>(If Payrate Ensure RTR)</span>
                    <label className='custom-upload btn btn-info px-5'>
                      <input type='file' accept='image/*' name='file' onChange={handleOnchange} ref={fileInput} />
                      <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                    </label>
                    <small>(File Type: image only)</small>{((sStatus !== 'Rejected' && !submissiView.prHr) || prHr) && <span className='text-danger'>*</span>}
                  </p>
                </div>
              </div>
              <div className='col-md-4'>
                {imgUrl ? <div className='d-inline-flex mt-1 position-relative'>
                  <div className='add-img'>
                    <img src={imgUrl} alt={file && file.name ? file.name : ''} style={{ width: 100 }} className='img-fluid me-2' />
                  </div>
                  {/* <div className='close-bth'>
                    <a onClick={removeImage}><i className='fa-solid fa-xmark'></i></a>
                  </div> */}
                </div> : ''}
              </div>
              
            </div>}
            <div className='row mb-2 mt-2'>
              <div className='text-center text-danger'>{errMsg}</div>
              <div className='text-center text-success'>{sucMsg}</div>
            </div>
            <div className='text-end'>
              <button type='button' className='btn btn-danger me-2' onClick={() => setStateData({ statusModal: false })}>No</button>
              <button type='button' className='btn btn-success' onClick={handleStatusUpdate}>{sStatus == 'Rejected' ? "Reject" : "Approve"}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <CommonImageViewComponent title='Payrate Image' show={isprImage} onHide={() => setStateData({isprImage: false})} imgPath={submissiView.prfPath}/>
    </div>
  )
}

export default SubmissionViewComponent;
