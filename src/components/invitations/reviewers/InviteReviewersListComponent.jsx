/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Select from "react-select";
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './styles.css';

import { firstCharCaps } from '../../../hooks/common';

const InviteReviewersListComponent = (props) => {

  const { Notes, reviewModal, errMsg, disable, reviewList, inviteData, usrsList, selectedUsers, rvNotesModal, reviewData, rvNotes, rvErrMsg } = props.state;
  const { setStateData, handleClose, handleReviewChange, reviewCreate, handleAddReviewNotes, handleWriteReview, toggleModal } = props;

  return (
    <div>
      {/* Reviews */}
        {/* <strong className='mb-2'>Candidate Info: </strong> {inviteData.name} | {inviteData.emID} | {inviteData.mobNum} <br />  */}
        <div className="alert alert-info alert-dismissible">
          <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
          <p className='mb-0'>
            <span className="me-3"><i className="fas fa-user"></i> {inviteData.name} </span>
            <span className="me-3"><i className="fas fa-envelope"></i> {inviteData.emID} </span>
            <span className="me-3"><i className="fas fa-phone"></i> {inviteData.mobNum} </span>
          </p>
        </div>

          {(inviteData?.iStatus && inviteData.iStatus !== 'Approved' && inviteData.iStatus !== 'Rejected') && <>
          <strong>Add Review</strong> <br />
          <form>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>Users</label><span className='text-danger'>*</span>
                  <Select
                    options={usrsList}
                    isMulti
                    value={selectedUsers}
                    onChange={(data) => handleReviewChange(data)}
                  />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Notes</label><span className='text-danger'>*</span>
                  <textarea value={Notes} rows='4' cols='65' placeholder='Review Notes*' onChange={(e) => setStateData({ Notes: first(e.target.value), errMsg: '' })}></textarea>
                </div>
              </div>
            </div>
            <div>
              <div className='text-center text-danger'>{errMsg}</div>
              <Button variant='success' disabled={disable} onClick={reviewCreate}>Create</Button>
            </div>
          </form>
          </>}
          <hr />
          <strong>View Reviews</strong> <br />
          <div className="container mt-4">
            <div className="row">
              {reviewList && reviewList.length > 0 ? reviewList.map((item, index) => {
                const rvData = item.rvNotes;
                const names = rvData && rvData.length > 0 && rvData.map(data => data.notes);
                let nameData =  names ? names.join(", ") : '';
                return (
                  <div className="col-md-6" key={index}>
                    <div className="card mb-6">
                      <div className="card-body">
                        {
                          <p className="card-text">
                            <strong>Notes:</strong> {nameData}
                          </p>
                        }
                        <p className="card-text">
                          <strong>Notes:</strong> {item.notes}
                        </p>
                        <p className="card-text">
                          <strong>Review By:</strong> {item.cuName}
                        </p>
                        <p className="card-text">
                          <strong>Review On:</strong> {moment(item.cDtStr).format('DD MMM, YYYY HH:mm')}
                        </p>
                        <p className="card-text">
                          <strong>Reviewer(s):</strong> {item.uNames.join(', ')}
                        </p>
                        {(inviteData?.iStatus && inviteData.iStatus !== 'Approved' && inviteData.iStatus !== 'Rejected') &&
                        <button className='btn btn-secondary r-3' onClick={() => handleAddReviewNotes(item)}>Write Review</button>}
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

        {/* Review Notes Pop-up */}
        {rvNotesModal && (
        <div className='review-modal offcanvas-backdrop w-50'>
          <div className="modal-container">
            <div className="modal-content">
              <div className='d-flex mb-2'> <strong className='mb-2'>Candidate Info: </strong>  {reviewData.uNames}<br /><hr /></div>
              <p className='mb-0'><strong>Review Notes</strong> <span className='close-icon' onClick={toggleModal}>X</span></p>
              <textarea value={rvNotes} rows='4' cols='50' placeholder='Review Notes*' onChange={(e) => setStateData({ rvNotes: firstCharCaps(e.target.value), rvErrMsg: '' })}></textarea>
              <div className='text-center text-danger'>{rvErrMsg}</div>
            </div>
            <div className='container text-center'>
              <button type='submit' className='btn btn-success mt-3' disabled={disable} onClick={handleWriteReview}>Submit</button>
            </div>
          </div>
          </div>
        )}
    </div>
  );
}

export default InviteReviewersListComponent;
