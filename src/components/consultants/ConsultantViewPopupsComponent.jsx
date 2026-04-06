/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

import {InvitationViewListComponent} from "../invitations";
import {InviteNotesListComponent} from '../invitations/notes';
import { InviteMeetingsListComponent } from "../invitations/meetings";
import { InviteReviewersListComponent } from "../invitations/reviewers";
import data from '../../../public/data/Lookups.json';
import { firstCharCaps, initCaps, numebersOnly} from '../../hooks/common';
import CommonDropdownComponent from "../common/CommonDropdownComponent";

const years = data.years;
const months = data.months;

const ConsultantViewPopupsComponent = (props) => {
  const {viewModal, rolesObj, invtaView, inviteData, showNotesPopup, showMetgsPopup, showreviewPopup, iAddress, iWorkAuths, iWrkExps, iEducation, iCertification, iUaddress, notesList, meetingsList, reviewList, tabsArr, actTab, meeting, wStatus, leadView, recruiter, recruitersList, showStatusPopUp, notes, errMsg, succMsg, email, visaStatus, mobNum, jobTitle, currentClient, previousClient, mobCc, linkedIn, expYrs, expMonths, disabled, cmnModal, cmnValue, cmnErrMsg, cmnType, cmnJbTitleArr, userData, showViewSsn } = props.state;
  const {setStateData, handleOpenModels, handleSelectTab, handleModalStatusUpdate, handleCreateSkill, handleViewShowSsn} = props;
  const invState = {invtaView, rolesObj, address: iAddress, workAuths: iWorkAuths, wrkExps: iWrkExps, education: iEducation, certifications: iCertification, uAddress: iUaddress};
  const notesState = {notes: '',  inviteData: invtaView, notesList};
  const meetingsState= {meetingsList, inviteData: invtaView, actTab, tabsArr, meeting}
  const reviewState={reviewList, inviteData: invtaView};
  return (
    <div>
      {/* Invitation View  Pop-up */}
      <Modal show={viewModal} size="xl" onHide={() => setStateData({viewModal: false, errMsg: "", showNotesPopup: false, showMetgsPopup: false, showreviewPopup: false})}>
        <Modal.Header closeButton>
        <div className="box-body">
          <div className="d-flex justify-content-between">
            <h4 className="modal-title mx-3">Invitations View</h4>
            <div>
              {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && (
                <button
                  className={!showNotesPopup && !showMetgsPopup && !showreviewPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"}
                  title="Invitation Details"
                  onClick={() => handleOpenModels("details")}
                >
                  Invitation Details
                </button>
              )}
              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[20]?.isAlwd) || rolesObj?.appAcc) && (
                <button className={showNotesPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"} title="Notes" onClick={() => handleOpenModels("notes")}>
                  <i className="fa-solid fa-notes-medical"></i> Notes
                </button>
              )}
              {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (
                <button className={showMetgsPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"} title="Meetings" onClick={() => handleOpenModels("meetings")}>
                  <i className="fa-regular fa-handshake"></i> Meeting
                </button>
              )}
              {/* {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (
                <button className={showreviewPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"} onClick={() => handleOpenModels("reviewers")}>
                  <i className="fa-solid fa-comment"></i> Reviewer(s)
                </button>
              )} */}
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
          {showNotesPopup ? (
            <InviteNotesListComponent showNotes={true} cnsFlag={true} state={notesState} />
          ) : showMetgsPopup ? (
            <InviteMeetingsListComponent meetingsList={meetingsList} state={meetingsState} handleSelectTab={handleSelectTab} cnsFlag={true} />
          ) : showreviewPopup ? (
            <InviteReviewersListComponent reviewList={reviewList} inviteData={inviteData} state={reviewState} />
          ) : (
            <InvitationViewListComponent state={invState} setStateData={setStateData} cnsFlag={true} userData={userData} showViewSsn={showViewSsn} handleViewShowSsn={handleViewShowSsn} />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showStatusPopUp} onHide={() => setStateData({ succMsg: '', errMsg: '', notes: '', recruiter: '', mentor: '', wStatus: '', showStatusPopUp: false, disabled: false })} size='lg'>
        <Modal.Header closeButton={() => setStateData({ succMsg: '', errMsg: '', notes: '', recruiter: '', mentor: '', wStatus: '', showStatusPopUp: false, disabled: false })} >
          <h5 className='mb-0'>On Boarding Status Update </h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label>Name</label>
                <p className='font-weight-500 mb-0'>{leadView.euName}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label>Mobile Number</label>
                <p className='font-weight-500 mb-0'>{leadView.euMobCcNum}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p30 float-left'>
                <label>Email</label>
                <p className='font-weight-500 mb-0'>{leadView.euEmID}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label>Current Status</label>
                <p className='font-weight-500 mb-0'><div className={`${(leadView.wStatus == 'Approved' ||  leadView.wStatus == 'Job Ended') ? 'badge badge-primary-light' : leadView.wStatus == 'Placed' ? 'badge badge-success-light' : (leadView.wStatus == 'Terminated' ||  leadView.wStatus == 'Job Ended Terminated') ? 'badge badge-danger-light' :  (leadView.wStatus == 'Trainy' || leadView.wStatus == 'Job Ended Trainy') ? 'badge badge-warning-light' : (leadView.wStatus == 'In Marketing' || leadView.wStatus == 'Job Ended Marketing') ? 'badge badge-secondary-light' :  'badge badge-dark'}`}> {leadView.wStatus} </div></p>
              </li>
            </ul>
          </div>
          {/* <form> */}
            <div className='row'>
            {wStatus !== 'Send To Marketing' && <div className='col-md-5'>
                <div className='form-group'>
                  <label className='form-lable'>New Status</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" name='orgCode' value={wStatus}>
                   <option value={wStatus}>{wStatus}</option>

                  </select>
                </div>
              </div> }
             {(wStatus == 'Send To Marketing' || wStatus == 'In Marketing') &&
              <div className='col-md-5'>
                <div className='form-group'>
                  <label className='form-lable'>Assing to Recruiter</label><span className='text-danger'>*</span>
                    <select className='form-select' value={recruiter} disabled={wStatus == 'In Marketing' ? true: false} onChange={(e) => setStateData({ recruiter: e.target.value, errMsg: '' })}>
                      <option value=''>Select</option>
                      {recruitersList && recruitersList.length > 0 && recruitersList.map((item, i) => <option key={i} value={item._id}>{item.name + '(' + item.refUID.split(':')[1] + ')'}</option>)}
                    </select>
                </div>
              </div>}
              <div className='col-md-7'>
                <div className='form-group'>
                  <label className='form-lable'>Notes</label><span className='text-danger'>*</span>
                  <textarea className="form-control form-control-sm" placeholder="Notes" aria-controls="example5" value={notes}  onChange={(e) => setStateData({ notes: e.target.value, errMsg: ''})} />
                </div>
              </div>
              {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && <div><strong>Marketing Info: </strong></div>}
              {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && 
              <div className="row">
                <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Email:</label>{(wStatus == 'Send To Marketing' || wStatus == 'In Marketing') && <span className='text-danger'>*</span>}
                  <input type="text" className="form-control" placeholder='Email' value={email} onChange={(e) => setStateData({ email: e.target.value.toLowerCase().trim(), errMsg: '' })} />
              </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Mob Number:</label>{(wStatus == 'Send To Marketing'|| wStatus == 'In Marketing')  && <span className='text-danger'>*</span>}
                  <div className='d-flex'>
                    <select className="form-select form-control" name='mobCc' value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                      <option value='+1'>+1</option>
                      <option value='+91'>+91</option>
                    </select>
                    <input type='text' className='form-control' placeholder='Mob Number' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                </div>
                </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Visa Status:</label>{(wStatus == 'Send To Marketing' || wStatus == 'In Marketing') && <span className='text-danger'>*</span>}
                  <select className='form-select' id='participants6' value={visaStatus} onChange={(e) => setStateData({ visaStatus: e.target.value, errMsg: '' })}>
                    <option value=''>Select Visa Status</option>
                    <option value='CPT'>CPT</option>
                    <option value='OPT'>OPT</option>
                    <option value='Stem OPT'>Stem OPT</option>
                    <option value='H1B'>H1B</option>
                    <option value='H4EAD'>H4 EAD</option>
                    <option value='H4'>H4</option>
                    <option value='GCEAD'>GC EAD</option>
                    <option value='GC'>GC</option>
                    <option value='L2'>L2</option>
                    <option value='Citizen'>Citizen</option>
                    <option value='Canadian'>Canadian</option>
                  </select>
                </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Job Title:</label>{(wStatus == 'Send To Marketing'|| wStatus == 'In Marketing')  && <span className='text-danger'>*</span>}
                 <div className="d-flex">
                 <Select
                    isClearable
                    placeholder="Select an option"
                    options={cmnJbTitleArr}
                    value={jobTitle || null}
                    onChange={(data) => setStateData({ jobTitle: data, errMsg: '' })}
                    className='w-100'
                  />
                  <button onClick={() => setStateData({ cmnModal: true, cmnType: 'Job Title' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
                 </div>
              </div>
              </div>
              <div className='col-md-5'>
                <div className='form-group'>
                  <label className="form-lable">Experience:</label>{(wStatus == 'Send To Marketing'|| wStatus == 'In Marketing') && <span className='text-danger'>*</span>}
                  <div className='d-flex'>
                    <div className='col-md-6'>
                      <label>Years</label>
                      <Select
                        options={years}
                        value={expYrs}
                        onChange={(data) => setStateData({ expYrs: data, errMsg: '' })} />
                    </div>
                    <div className='col-md-6'>
                      <label>Months</label>
                      <Select
                        defaultValue={months[1]}
                        options={months}
                        value={expMonths}
                        onChange={(data) => setStateData({ expMonths: data, errMsg: '' })} />
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">LinkedIn URL:</label>{(wStatus == 'Send To Marketing' || wStatus == 'In Marketing') && <span className='text-danger'>*</span>}
                <input type="url" className="form-control" value={linkedIn} placeholder='https://www.linkedin.com/...' onChange={(e) => setStateData({ linkedIn: e.target.value, errMsg: '' })} />
              </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Current Client:</label>
                  <input type="text" className="form-control" value={currentClient} placeholder='Current Client' onChange={(e) => setStateData({ currentClient: firstCharCaps(e.target.value), errMsg: '' })} />
                </div>
              </div>
              <div className='col-md-5'>
              <div className='form-group'>
                <label className="form-lable">Previous Client:</label>
                  <input type="text" className="form-control" value={previousClient} placeholder='Previous Client' onChange={(e) => setStateData({ previousClient: firstCharCaps(e.target.value), errMsg: '' })} />
              </div>
              </div>
              </div>}
              <div className='text-center text-danger'>{errMsg}</div>
              <div className='text-center text-success'>{succMsg}</div>
            </div>
            <div className='text-end'>
              <button type='button' className='btn btn-danger me-2' disabled={disabled} onClick={() => setStateData({succMsg: '', errMsg: '', notes: '', recruiter: '', mentor: '', wStatus: '', showStatusPopUp: false, disabled: false})}>No</button>
              <button type='button' className='btn btn-success' disabled={disabled} onClick={handleModalStatusUpdate}>Update</button>
            </div>
          {/* </form> */}
        </Modal.Body>
      </Modal>
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
  );
};

export default ConsultantViewPopupsComponent;
