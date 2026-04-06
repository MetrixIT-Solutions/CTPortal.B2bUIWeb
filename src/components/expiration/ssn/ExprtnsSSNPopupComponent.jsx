/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';
import React from 'react';
import {Button, Modal} from 'react-bootstrap';

import {getTomorrowDate} from '../../../hooks/common';

const ExprtnsSSNPopupComponent = (props) => {
  const {modal, num, expDt, isCheck, disabled, errMsg, isVrfdModal, expObj} = props.state;
  const {setStateData, handleVrfyUpdate, handleSSNUpdate} = props;

  const newObj = expObj?.newObj;
  const expDate = newObj?.expDt ? moment(newObj.expDt).format('DD MMM, YYYY') : '';

  return (
    <>
      <Modal show={modal} onHide={() => setStateData({modal: false, expObj: {}, errMsg: '', num: '', expDate: '', isCheck: false})} size='l'>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>SSN Number</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {!isCheck ? (
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>SSN Number</label>
                  <span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='SSN Number' name='ssnNum' value={num} onChange={(e) => setStateData({num: e.target.value, errMsg: '', expDt: ''})} />
                </div>
              </div>
            ) : (
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>SSN Expected Date</label>
                  <span className='text-danger'>*</span>
                  <input type='date' className='form-control' placeholder='SSN Expected Date' name='ssnExpDate' min={getTomorrowDate()} value={expDt} onChange={(e) => setStateData({expDt: e.target.value, errMsg: '', num: ''})} />
                </div>
              </div>
            )}
            <div className='col-md-6'>
              <div className='form-group' style={{marginTop: 33}}>
                <input type='checkbox' id='isCheck' name='isCheck' checked={isCheck} onChange={(e) => setStateData({isCheck: e.target.checked, expDt: '', num: ''})} />
                <label for='isCheck'> Yet to recieve</label>
                <br></br>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='text-center text-danger'>{errMsg}</div>
                {/* <div className='text-center text-success'>{successMsg}</div> */}
                <div className='d-flex justify-content-center mt-3'>
                  <button type='button' disabled={disabled} className='btn btn-danger mr-3' onClick={() => setStateData({modal: false, expObj: {}, errMsg: '', num: '', expDt: '', isCheck: false})}>
                    Back
                  </button>
                  <button onClick={handleSSNUpdate} disabled={disabled} type='button' className='btn btn-success'>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Verified update */}
      <Modal show={isVrfdModal} onHide={() => setStateData({isVrfdModal: false, errMsg: ''})} size='md' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className='modal-title'>Verified Update</h4>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-10'>
              <div className='card-body p-3'>
                <dl>
                  {newObj?.num ? (
                    <>
                      <dt>SSN Number: </dt>
                      <dd>{newObj?.num}</dd>
                    </>
                  ) : (
                    <>
                      <dt>SSN Expected Date: </dt>
                      <dd>{expDate}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
          <h6 className='text-danger'>
            Are you sure, want to <strong>Approve ? </strong>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({isVrfdModal: false, leadData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disabled} onClick={handleVrfyUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExprtnsSSNPopupComponent;
