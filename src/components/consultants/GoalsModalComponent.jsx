/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import {firstCharCaps } from '../../hooks/common';

const GoalsModalComponent = (props) => {
  const {handleCreateGoal, setStateData, handleGoalStatusUpdate, handleUpdate, handleReview, handleDelete, numbersOnly, handleCloseModal} = props;
  const {goalModal, errMsg, gType, gCategory, gAccmnts, gStatus, gStsModal, gsNotes, key, rvwModal, gReview, grNotes, grRating, sDate, cDate, viewModal, goalData, delModal, grDtStr} = props.state;
  return (
    <>
      <Modal show={goalModal} onHide={() => handleCloseModal(key)} size='xl' className='update-modal'>
      <Modal.Header closeButton>
        <h4 className="modal-title">{key=='update' ? 'Edit Goal & Accomplishments' :'Set Goal & Accomplishments'}</h4>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          <div className='col-md-3'>
            <div className='form-group'>
              <label>Goal Type<span className='text-danger'>*</span></label>
              <select className='form-select' value={gType} onChange={(e) => setStateData({gType: e.target.value, errMsg: ''})}>
                <option value=''>Select One</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Quarterly'>Quarterly</option>
                <option value='Half Yearly'>Half Yearly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
          </div>
          <div className='col-md-3'>
            <div className='form-group'>
              <label>Category	<span className='text-danger'>*</span></label>
              <select className='form-select' value={gCategory} onChange={(e) => setStateData({gCategory: e.target.value, errMsg: ''})}>
                <option>Select</option>
                <option>Business Goals</option>
                <option>Career Development Goals</option>
              </select>
            </div>
          </div>
          {/* <div className='col-md-3'>
            <div className='form-group'>
              <label>Goal Title	<span className='text-danger'>*</span></label>
              <input type='text' className='form-control' value={gTitle} onChange={(e) => setStateData({gTitle: firstCharCaps(e.target.value), errMsg: ''})}/>
            </div>
          </div> */}
          <div className='col-md-3'>
            <div className='form-group'>
              <label>Start Date	<span className='text-danger'>*</span></label>
              <input type='date' className='form-control' value={sDate} onChange={(e) => setStateData({sDate: e.target.value, errMsg: ''})}/>
            </div>
          </div>
          {gStatus == 'Completed' &&<div className='col-md-3'>
            <div className='form-group'>
              <label>completed Date	<span className='text-danger'>*</span></label>
              <input type='date' className='form-control' value={cDate} onChange={(e) => setStateData({cDate: e.target.value, errMsg: ''})}/>
            </div>
          </div>}
          <div className='col-md-3'>
            <div className='form-group'>
              <label>Goal Status	<span className='text-danger'>*</span></label>
              <select className='form-select' value={gStatus} onChange={(e) => setStateData({gStatus: e.target.value, errMsg: ''})} disabled={key == 'update'}>
                <option value=''>Select One</option>
                <option value='Not Started'>Not Started</option>
                <option value='In Progress'>In Progress</option>
                {key =='update' && <option value='Completed'>Completed</option>}
              </select>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form-group'>
              <label>Goal & Accomplishments	<span className='text-danger'>*</span></label>
              <textarea className='form-control' cols={20} rows={3} value={gAccmnts} maxLength={200} onChange={(e) => setStateData({gAccmnts: e.target.value, errMsg: ''})}></textarea>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <p className='text-danger'>{errMsg}</p>
        <Button variant='danger' size='sm' onClick={() => handleCloseModal(key)}>Cancel</Button>
        <Button variant='success' size='sm' onClick={key == 'update'? handleUpdate: handleCreateGoal}>Submit</Button>
      </Modal.Footer>
      </Modal>
      <Modal show={gStsModal} onHide={() => setStateData({gStsModal: false, errMsg: '',  gStatus: goalData.gStatus, sDate: goalData.gsDtStr[0], sDate: goalData.gsDtStr.length > 1 ? goalData.gsDtStr[1] : '', gsNotes: ''})} size='xl' className='update-modal'>
          <Modal.Header closeButton>
            <h4 className="modal-title">Status Update</h4>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
            <div className='col-md-3'>
                <div className='form-group'>
                  <label>Goal type	<span className='text-danger'>*</span></label>
                  <input className='form-select' value={gType} disabled />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Category	<span className='text-danger'>*</span></label>
                  <input className='form-select' value={gCategory} disabled />
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>Goal & Accomplishments	<span className='text-danger'>*</span></label>
                  <textarea className='form-control' cols={20} rows={3} value={gAccmnts} disabled></textarea>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Goal Status	<span className='text-danger'>*</span></label>
                  <select className='form-select' value={gStatus} onChange={(e) => setStateData({gStatus: e.target.value, errMsg: ''})}>
                    <option value=''>Select One</option>
                    <option value='Not Started'>Not Started</option>
                    <option value='In Progress'>In Progress</option>
                    <option value='Completed'>Completed</option>
                  </select>
                </div>
              </div>
              {gStatus !== 'Completed' && <div className='col-md-3'>
            <div className='form-group'>
              <label>Start Date	<span className='text-danger'>*</span></label>
              <input type='date' className='form-control' value={sDate} onChange={(e) => setStateData({sDate: e.target.value, errMsg: ''})}/>
            </div>
          </div>}
          {gStatus == 'Completed' &&<div className='col-md-3'>
            <div className='form-group'>
              <label>Completed Date	<span className='text-danger'>*</span></label>
              <input type='date' className='form-control' value={cDate} onChange={(e) => setStateData({cDate: e.target.value, sDate: goalData.gsDtStr[0], errMsg: ''})}/>
            </div>
          </div>}
          <div className='col-md-6'>
            <div className='form-group'>
              <label>Notes<span className='text-danger'>*</span></label>
              <textarea className='form-control' cols={20} rows={3} value={gsNotes} onChange={(e) => setStateData({gsNotes: firstCharCaps(e.target.value), errMsg: ''})}></textarea>
            </div>
          </div>
        </div>
          </Modal.Body>
          <Modal.Footer>
            <p className='text-danger'>{errMsg}</p>
            <Button variant='danger' size='sm' onClick={() => setStateData({gStsModal: false, errMsg: '',  gStatus: goalData.gStatus, sDate: goalData.gsDtStr[0], sDate: goalData.gsDtStr.length > 1 ? goalData.gsDtStr[1] : '', gsNotes: ''})}>Cancel</Button>
            <Button variant='success' size='sm' onClick={handleGoalStatusUpdate}>Submit</Button>
          </Modal.Footer>
      </Modal>
      <Modal show={rvwModal} onHide={() => setStateData({ rvwModal: false, errMsg: '' })} size='xl' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Goal Review</h4>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-2'>
              <div className='form-group'>
                <label>Rate out of 10<span className='text-danger'>*</span></label>
                <input type='text' className='form-control' maxLength={3} value={grRating} onKeyPress={numbersOnly} onChange={(e) => setStateData({grRating: e.target.value, errMsg: ''})}/>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Goal Review Date	<span className='text-danger'>*</span></label>
                <input type='date' className='form-control' value={grDtStr} onChange={(e) => setStateData({grDtStr: e.target.value, errMsg: ''})}/>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-5'>
              <div className='form-group'>
                <label>Goal Review<span className='text-danger'>*</span></label>
                <textarea className='form-control' cols={20} rows={3} value={gReview} maxLength={150} onChange={(e) => setStateData({gReview: firstCharCaps(e.target.value), errMsg: ''})}></textarea>
              </div>
            </div>
            <div className='col-md-5'>
              <div className='form-group'>
                <label>Notes</label>
                <textarea className='form-control' cols={20} rows={3} value={grNotes} onChange={(e) => setStateData({grNotes: firstCharCaps(e.target.value), errMsg: ''})}></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p className='text-danger'>{errMsg}</p>
          <Button variant='danger' size='sm' onClick={() => setStateData({rvwModal: false, errMsg: ''})}>Cancel</Button>
          <Button variant='success' size='sm' onClick={handleReview}>Submit</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={viewModal} onHide={() => setStateData({ viewModal: false, errMsg: '' })} size='xl' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Goal Details</h4>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className='col-md-6'>
            <div className='table-responsive'>
              <table className='table user-view'>
                <tbody>
                  <tr>
                    <td width={200}><span>Goal Type:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData.gType} </p> </td>
                  </tr>
                  <tr>
                    <td><span>Goal category:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData.gCategory}</p></td>
                  </tr>
                  <tr>
                    <td><span>Goal & Accomplishments:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData.gAccmnts} </p></td>
                  </tr>
                  <tr>
                    <td><span>Goal Status Notes:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gsNotes} </p></td>
                  </tr>
                  {goalData.gStatus == 'Reviewed' && <tr>
                    <td><span>Goal Rating:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.grRating} </p></td>
                  </tr>}
                  {goalData.gStatus == 'Reviewed' && <tr>
                    <td><span>Goal Review By:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gRvrName} </p></td>
                  </tr>}
                </tbody>
              </table>

            </div>
          </div>
          <div className='col-md-6'>
            <div className='table-responsive'>
              <table className='table user-view'>
                <tbody>
                  <tr>
                    <td><span>Goal Status:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gStatus} </p></td>
                  </tr>
                  <tr>
                    <td><span>Goal Start Date:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gsDtStr?.length ? moment(goalData.gsDtStr[0]).format('DD MMM, YYYY') : ''} </p></td>
                  </tr>
                    <tr>
                    <td><span>Goal Completed Date:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gsDtStr?.length ? moment(goalData.gsDtStr[1]).format('DD MMM, YYYY') : ''} </p></td>
                  </tr>
                  {goalData.gStatus == 'Reviewed' &&<tr>
                    <td><span>Goal Review:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gReview} </p></td>
                 </tr>}
                  {goalData.gStatus == 'Reviewed' &&<tr>
                    <td><span>Goal Review Date:</span></td>
                    <td><p className='font-weight-500 mb-0'> {moment(goalData.grDtStr).format('DD MMM, YYYY')} </p></td>
                  </tr>}
                  {goalData.gStatus == 'Reviewed' &&<tr>
                    <td><span>Goal Review Notes:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.grNotes} </p></td>
                  </tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({viewModal: false, errMsg: ''})}>close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={delModal} onHide={() => setStateData({ delModal: false, errMsg: '' })} size='xl' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Are you sure, you want to delete ?</h4>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className='col-md-6'>
            <div className='table-responsive'>
              <table className='table user-view'>
                <tbody>
                  <tr>
                    <td width={200}><span>Goal Type:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData.gType} </p> </td>
                  </tr>
                  <tr>
                    <td><span>Goal category:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData.gCategory}</p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='table-responsive'>
              <table className='table user-view'>
                <tbody>
                  <tr>
                    <td><span>Goal Status:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gStatus} </p></td>
                  </tr>
                  <tr>
                    <td><span>Goal Start Date:</span></td>
                    <td><p className='font-weight-500 mb-0'> {goalData?.gsDtStr?.length ? goalData?.gsDtStr[0] : ''} </p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <p className='text-danger'>{errMsg}</p>
          <Button variant='danger' size='sm' onClick={() => setStateData({delModal: false, errMsg: ''})}>No</Button>
          <Button variant='success' size='sm' onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default GoalsModalComponent;