/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import {Modal, Button} from 'react-bootstrap';

import {firstCharCaps} from '../../hooks/common';

const MeetingLinkPopUpComponent = (props) => {
  const {errorMsg, deleteModal, disable, createModal, mProvider, mLink, mUserID, mPassword, mNotes, showPswd, pName, mTitle, mSeq, linkData, updateModal} = props.state;
  const {setStateData, handleDelete, handleMeetingLink, handleShowPassword, handleClose, handlemLinkUpdate} = props;
  return (
    <div>
      {/* Create Pop-Up */}
      <Modal show={createModal} onHide={() => handleClose()} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Create Meeting Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Provider</label>
                <span className='text-danger'>*</span>
                <select className='form-select form-control' value={mProvider} onChange={(e) => setStateData({mProvider: e.target.value, errorMsg: '', pName: ''})}>
                  <option value=''>Select</option>
                  <option value='Microsoft Teams'>Microsoft Teams</option>
                  <option value='Google Meet'>Google Meet</option>
                  <option value='Zoom'>Zoom</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>
            {mProvider === 'Others' && (
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Provider Name</label>
                  <span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Provider Name' value={pName} onChange={(e) => setStateData({pName: firstCharCaps(e.target.value), errorMsg: ''})} />
                </div>
              </div>
            )}
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Title</label>
                <span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Title' value={mTitle} onChange={(e) => setStateData({mTitle: firstCharCaps(e.target.value), errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Sequence</label>
                <span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Sequence' value={mSeq} onChange={(e) => setStateData({mSeq: e.target.value, errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Meeting Link</label>
                <span className='text-danger'>*</span>
                <input type='url' className='form-control' placeholder='Meeting Link' value={mLink} onChange={(e) => setStateData({mLink: e.target.value, errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>User ID</label>
                <input type='text' className='form-control' placeholder='User Id' value={mUserID} onChange={(e) => setStateData({mUserID: firstCharCaps(e.target.value)})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Password</label>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-lock'></i>
                    </span>
                  </div>
                  <input type={`${!showPswd ? 'password' : ''}`} onChange={(e) => setStateData({mPassword: e.target.value})} className='form-control' placeholder='Password' value={mPassword} />
                  <span className='input-group-text bg-transparent eye-icon'>{!showPswd ? <i onClick={handleShowPassword} className='fa fa-eye-slash'></i> : <i onClick={handleShowPassword} className='fa fa-eye'></i>}</span>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Description</label>
                <textarea name='description1' id='description1' rows='4' className='form-control' value={mNotes} placeholder='Description' onChange={(e) => setStateData({mNotes: firstCharCaps(e.target.value)})}></textarea>
              </div>
            </div>
            <div className='text-center text-danger'>{errorMsg}</div>
            <div className='d-flex justify-content-center mt-3'>
              <button className='btn btn-danger me-3' type='button' disabled={disable} onClick={() => handleClose()}>
                Close
              </button>
              <button type='submit' disabled={disable} className='btn btn-success' onClick={handleMeetingLink}>
                Create
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Pop-Up */}
      <Modal show={deleteModal} onHide={() => setStateData({deleteModal: false, userData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Delete Meeting Links Data</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div>
              <strong>Meeting Links Info: </strong> {linkData.mProvider} || {linkData.mTitle} || {linkData.mSeq} || {linkData.mLink} || {linkData.mUserID} || {linkData.mPassword}
            </div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errorMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({deleteModal: false, userData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Pop-Up */}
      <Modal show={updateModal} onHide={() => handleClose()} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Edit Meeting Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Provider</label>
                <span className='text-danger'>*</span>
                <select className='form-select form-control' value={mProvider} onChange={(e) => setStateData({mProvider: e.target.value, errorMsg: '', pName: ''})}>
                  <option value=''>Select</option>
                  <option value='Microsoft Teams'>Microsoft Teams</option>
                  <option value='Google Meet'>Google Meet</option>
                  <option value='Zoom'>Zoom</option>
                  <option value='Others'>Others</option>
                </select>
              </div>
            </div>

            {mProvider === 'Others' && (
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Provider Name</label>
                  <span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Provider Name' value={pName} onChange={(e) => setStateData({pName: firstCharCaps(e.target.value), errorMsg: ''})} />
                </div>
              </div>
            )}
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Title</label>
                <span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Title' value={mTitle} onChange={(e) => setStateData({mTitle: firstCharCaps(e.target.value), errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Sequence</label>
                <span className='text-danger'>*</span>
                <input type='number' className='form-control' placeholder='Sequence' value={mSeq} onChange={(e) => setStateData({mSeq: e.target.value, errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Meeting Link</label>
                <span className='text-danger'>*</span>
                <input type='url' className='form-control' placeholder='Meeting Link' value={mLink} onChange={(e) => setStateData({mLink: e.target.value, errorMsg: ''})} />
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>User ID</label>
                <input type='text' className='form-control' placeholder='User Id' value={mUserID} onChange={(e) => setStateData({mUserID: e.target.value})} />
              </div>
            </div>

            <div className='col-md-4'>
              <div className='form-group'>
                <label>Password</label>
                <div className='input-group mb-3'>
                  <div className='input-group-prepend'>
                    <span className='input-group-text'>
                      <i className='fas fa-lock'></i>
                    </span>
                  </div>
                  <input type={`${!showPswd ? 'password' : ''}`} onChange={(e) => setStateData({mPassword: e.target.value})} className='form-control' placeholder='Password' value={mPassword} />
                  <span className='input-group-text bg-transparent eye-icon'>{!showPswd ? <i onClick={handleShowPassword} className='fa fa-eye-slash'></i> : <i onClick={handleShowPassword} className='fa fa-eye'></i>}</span>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='form-group'>
                <label>Description</label>
                <textarea name='description1' id='description1' rows='4' className='form-control' value={mNotes} placeholder='Description' onChange={(e) => setStateData({mNotes: firstCharCaps(e.target.value)})}></textarea>
              </div>
            </div>
            <div className='text-center text-danger'>{errorMsg}</div>
            <div className='d-flex justify-content-center mt-3'>
              <button className='btn btn-danger me-3' type='button' disabled={disable} onClick={() => handleClose()}>
                Close
              </button>
              <button type='submit' disabled={disable} className='btn btn-success' onClick={handlemLinkUpdate}>
                Update
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MeetingLinkPopUpComponent;