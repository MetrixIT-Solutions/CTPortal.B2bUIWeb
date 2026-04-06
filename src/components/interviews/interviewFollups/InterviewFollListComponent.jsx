/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */
import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { firstCharCaps } from '../../../hooks/common';

const InterviewFollListComponent = (props) => {
  const { FwlpsModal, interFollowupsList, fwlpsNotesModal, Notes, disable, errMsg, intrwData, fwNotes, FwlerrMsg, refId, rolesObj } = props.state;
  const { setStateData, handleClose, interFollowupsCreate, handleFwlpsNtsUpdate, handleFollowupsEdit, toggleModal } = props;
  const date = intrwData.isDtStr ? moment(intrwData.isDtStr).format("DD MMM, YYYY") : '';
  const name = intrwData.vName ? intrwData.vName : '';
  const jobtitle = intrwData.jobTitle ? intrwData.jobTitle : '';
  const dateStr = intrwData.isDtStr ? intrwData.isDtStr.split(' ') : '';
  const minutes = intrwData.duration % 60;
  const hours = Math.floor(intrwData.duration / 60);
  const time = hours == 0 ? '' : (hours == 1 ? `${hours}hr` : `${hours}hrs`);
  const mTime = `${time} ${minutes}mins`;

  return (
    <div>
      {/* Followups */}
      <Offcanvas show={FwlpsModal} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Interview Followups</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong className='mb-2'>Interview Info:</strong> <br /> <b>{intrwData.process} </b> (ID - {intrwData.intrwId})
          {'Scheduled @' + date + ' ' + dateStr[1] + ' ' + intrwData.iTz + ' | Duration - ' + mTime} | <b>Submission ID: </b> {intrwData.subId} <br /> <b>Candidate: </b> {intrwData.euName} | <b>Job: </b> {jobtitle} | <b>Vendor: </b> {name}<br /> <hr />
          {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[16]?.isAlwd) || rolesObj?.appAcc) &&
            <>
              <strong>Create Followups</strong> <br />
              <form>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label>Notes</label><span className='text-danger'>*</span>
                      <textarea value={Notes} rows='4' cols='65' className='form-control' placeholder='Followups Notes*' onChange={(e) => setStateData({ Notes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='text-center text-danger'>{errMsg}</div>
                  <Button variant='success' disabled={disable} onClick={interFollowupsCreate}>Create</Button>
                </div>
              </form>
              <hr />
            </>}
          <strong>List Interview Followups</strong> <br />
          <div className="container mt-4">
            <div className="row">
              {interFollowupsList && interFollowupsList.length > 0 ? interFollowupsList.map((item, index) => {
                const offset = new Date().getTimezoneOffset();
                const cDate = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                const sed = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').add(1, 'hour').subtract(offset, 'minutes').format('YYYY-MM-DD HH:mm');
                const ptm = moment().format('YYYY-MM-DD HH:mm');
                return (
                  <div className="col-md-6" key={index}>
                    <div className="card mb-6">
                      <div className=' d-flex justify-content-between'>
                        <div className="card-body">
                          <p>
                            <strong>Notes:</strong> {item.notes} <small>{item.cDtStr < item.uDtStr && '(edited)'}</small>
                          </p>
                          <p className="mb-0">
                            <strong>Created By:</strong> {item.cuName}<br />
                            <strong>Created On:</strong> {cDate}
                          </p>
                        </div>
                        {item.cUId === refId && sed >= ptm && <div>
                          <a className='me-2' onClick={() => handleFollowupsEdit(item)}><i className="fa-solid fa-pen-to-square"></i></a>
                        </div>}
                      </div>
                    </div>
                  </div>
                )
              }) : (
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
        {fwlpsNotesModal && (
          <div className='review-modal offcanvas-backdrop w-50'>
            <div className="modal-container">
              <div className="modal-content">
                <p className='mb-3'><strong>Followup Notes</strong> <span className='close-icon' onClick={toggleModal}>X</span></p>
                <textarea value={fwNotes} rows='4' cols='50' placeholder='Followup Notes*' onChange={(e) => setStateData({ fwNotes: firstCharCaps(e.target.value), FwlerrMsg: '' })}></textarea>
              </div>
              <div className='text-center text-danger'>{FwlerrMsg}</div>
              <div className='container text-center'>
                <button type='submit' className='btn btn-success mt-3' disabled={disable} onClick={handleFwlpsNtsUpdate}>Update</button>
              </div>
            </div>
          </div>
        )}
      </Offcanvas>
    </div>
  )
}

export default InterviewFollListComponent