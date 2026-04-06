/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';
import React from 'react';
import { Modal, Card, Button, Form } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Select from "react-select";

const OffcanavsReviewComponent = (props) => {
  const { offCanvasReviewModal, offCanvasReviewCreateModal, setStateData, usrReviewData, inviteUser, handleReviewCreate, adUsersData, selectedadUsersData ,revErrMsg, comment, usrRevChange } = props;  
  return (
    <div>
      {/* Reviewers list */}
      <Offcanvas
        show={offCanvasReviewModal}
        onHide={() => setStateData({ offCanvasReviewModal: false, usrReviewData: [] })}
        className='w-50'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Reviewer(s) Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='mb-0'>
            <div>
              <strong>Invite User Info: {inviteUser?.fName} | {inviteUser?.mobNum} | {inviteUser?.emID}</strong>
              <div className='d-flex justify-content-end p-3'><Button onClick={() => setStateData({ offCanvasReviewCreateModal: true })}>Add</Button></div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              {usrReviewData && usrReviewData.length > 0 ?
                usrReviewData.map((item, i) => (
                  <div key={item._id} className='col-6 mb-3'>
                    <div className='card'>
                      <div className='card-body'>
                        <Card.Text className="mt-3">
                          <strong>Notes:</strong> {item.notes}<br />
                          <strong>Review By:</strong> {item.cuName}<br />
                          <strong>Review On:</strong> {moment(item.cDtStr).format('DD-MMM-YYYY')}<br />
                          <strong>Reviewer(s):</strong> {item.uNames.join(', ')}<br />
                        </Card.Text>
                      </div>
                    </div>
                  </div>
                ))
                :
                <div className='text-center py-3'><strong>No data</strong></div>
              }
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Reviewers Create */}
      <Offcanvas
        show={offCanvasReviewCreateModal}
        onHide={() => setStateData({ offCanvasReviewModal: false, offCanvasReviewCreateModal: false, usrReviewData: [], selectedadUsersData: '', comment: '', revErrMsg: '' })}
        className='w-50'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Reviewer(s) Data</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <h3 className="mb-4">User Reviewer</h3>
            <form>
              <div className='mb-3'>
              <label htmlFor="Users" className="form-label">Users</label>
              <Select
              options={adUsersData}
              value={selectedadUsersData}
              isMulti
              onChange={(data) => usrRevChange(data)} 
              />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Comment</label>
                <textarea className="form-control" id="comment" name="comment" placeholder="Enter your comment" rows="3"  value={comment} onChange={(e) =>setStateData({comment: e.target.value})}/>
              </div>
              <div className='text-align-center text-danger'><p>{revErrMsg}</p></div>
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-secondary" onClick={() => setStateData({ offCanvasReviewCreateModal: false, selectedadUsersData: '', comment: '', revErrMsg: '' })}>Close</button>
                <button type="submit" className="btn btn-primary ml-2" onClick={handleReviewCreate}>Submit</button>
              </div>
            </form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>

  )
}

export default OffcanavsReviewComponent;
