/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import './style.css';
import { firstCharCaps } from '../../../hooks/common';

const LeadNotesComponent = (props) => {
  const {leadData, Notes, closeMpdal, errMsg, disable, notesList, notesModal, updtNotes, ntsErrMsg, ncAccess, userData} = props.state;  
  const {setStateData, handleClose, handleNotesCreate, updtNotesModal, handleNtsUpdate} = props;

  return (
    <div>
      {/* Followups */}
      <Offcanvas show={closeMpdal} onHide={handleClose} backdrop='static' className='w-50 submit-modal'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lead Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <p><strong className='mb-2'>Lead Info:</strong></p> */}
          <strong className='mb-2'>Lead Info:</strong> Lead ID - {leadData.leadId} ({leadData.jobTitle}) <br />
           Candidate - {leadData.euName} | Email: {leadData.euEmID} | Mobile Number: {leadData.euMobCcNum} | Visa Status: {leadData.visaStatus}<br /> <hr />

          {ncAccess && <>
            <p><strong>Create Notes</strong></p>
            <form>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label>Notes</label>
                    <span className='text-danger'>*</span>
                    <textarea className='form-control' value={Notes} rows='4' cols='65' placeholder='Notes*' onChange={(e) => setStateData({ Notes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                  </div>
                </div>
              </div>
              <div>
                <div className='text-center text-danger'>{errMsg}</div>
                <Button variant='success' disabled={disable} onClick={handleNotesCreate}> Create</Button>
              </div>
            </form>
            <hr />
          </>}

          <strong>Notes List</strong> <br />
          <div className='container mt-4'>
            <div className='row'>
              {notesList.length > 0 ? (
                notesList.map((item, index) => {                  
                  const offset = new Date().getTimezoneOffset();
                  const cDate = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                  const sed = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').add(1, 'hour').subtract(offset, 'minutes').format('YYYY-MM-DD HH:mm');
                  const ptm = moment().format('YYYY-MM-DD HH:mm');
                  return (
                    <div className='col-md-6' key={item._id}>
                      <div className='card mb-6'>
                        <div className=' d-flex justify-content-between m-2'>
                          <div className='card-body'>
                            <p className='card-text'>
                              <strong>Notes:</strong> {item.notes} <small>{item.cDtStr < item.uDtStr && '(edited)'}</small>
                            </p>
                            <p className='mb-0'>
                              <strong>Created By:</strong> {item.cuName} <br />
                              <strong>Created On:</strong> {cDate}
                            </p>
                          </div>
                          {userData.name === item.cuName && sed >= ptm && (
                            <div>
                              <a className='me-2' onClick={() => setStateData({ notesModal: true, notesData: item, updtNotes: item.notes, ntsErrMsg: '', Notes: '', errMsg: '', disable: false })}>
                                <i className='fa-solid fa-pen-to-square'></i>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>
                    <div className='text-center py-3'>
                      <strong>No data</strong>
                    </div>
                  </td>
                </tr>
              )}
            </div>
          </div>
        </Offcanvas.Body>

        {/* followups Notes Pop-up */}
        {notesModal && (
          <div className='review-modal offcanvas-backdrop w-50'>
            <div className='modal-container'>
              <div className='modal-content'>
                <h5 className="modal-title mb-3">Update Notes<span className='close-icon' onClick={updtNotesModal}>X</span></h5>
              </div>
              <div className='modal-body'>
                <textarea value={updtNotes} rows='4' cols='40' placeholder='On Boarding Notes*' onChange={(e) => setStateData({updtNotes: firstCharCaps(e.target.value), ntsErrMsg: ''})}></textarea>
                <div className='text-center text-danger'>{ntsErrMsg}</div>
              </div>
              <div className='container text-center'>
                <button type='submit' className='btn btn-success mt-3' disabled={disable} onClick={handleNtsUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </Offcanvas>
    </div>
  );
};

export default LeadNotesComponent;
