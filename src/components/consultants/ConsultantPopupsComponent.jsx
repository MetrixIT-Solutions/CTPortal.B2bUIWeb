/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConsultantPopupsComponent = (props) => {
  const { handleConsultantDelete, handleChangePassword, changePaswword, changeConfirmPassWord, handlePasswordShowHide, handleConfirmPasswordShowHide, handleStatusUpdate, setStateData, handleResetPassword } = props;
  const { deleteModal, consultantData, errMsg, sucMsg, disable, statusModal, passwordModal, password, showPassword, confirmPassword, showConfirmPassword, resetPasswordModal } = props.state;

  return (
    <div>
      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({ deleteModal: false, consultantData: {}, errMsg: '' })} size='md' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Consultant Delete</h4>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Consultant Info: </strong></p>
          <dl className='dl-horizontal'>
            <dt>Name </dt>
            <dd>{consultantData?.name}</dd>
            <dt>Email ID</dt>
            <dd>{consultantData?.emID}</dd>
            <dt>Mobile</dt>
            <dd>{consultantData?.mobCcNum}</dd>
          </dl>
          <hr className='mb-3' />
          <h6 className='text-danger'>Are you sure, want to <strong>Delete ? </strong></h6>
        </Modal.Body>
        <div className='text-center text-success'>{sucMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ deleteModal: false, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleConsultantDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* status update */}
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, consultantData: {}, errMsg: '' })} size='md' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Status Update</h4>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Consultant Info: </strong></p>
          <dl className='dl-horizontal'>
            <dt>Name </dt>
            <dd>{consultantData?.name}</dd>
            <dt>Email ID</dt>
            <dd>{consultantData?.emID}</dd>
            <dt>Mobile</dt>
            <dd>{consultantData?.mobCcNum}</dd>
          </dl>
          <hr className='mb-3' />
          <h6 className='text-danger'> Are you sure, want to <strong>{consultantData?.uStatus === 'Active' ? 'Inactivate' : 'Activate'} ? </strong></h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ statusModal: false, consultantData: {}, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Update */}
      <Modal show={passwordModal} onHide={() => setStateData({ passwordModal: false, consultantData: {}, password: '', confirmPassword: '', errMsg: '' })} size='md' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Change Password</h4>
        </Modal.Header>
        <Modal.Body>
          <p><strong>User Info: </strong></p>
          <dl className='dl-horizontal'>
            <dt>Name </dt>
            <dd>{consultantData?.name}</dd>
            <dt>Email ID</dt>
            <dd>{consultantData?.emID}</dd>
            <dt>Mobile</dt>
            <dd>{consultantData?.mobCcNum}</dd>
          </dl>
          <div className='form-group position-relative'>
            <label className='form-control-label'>New Password </label>
            <input type={showPassword ? 'text' : 'password'} onChange={changePaswword} className='form-control' value={password} maxLength={20} />
            <i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} onClick={handlePasswordShowHide} style={{ position: 'absolute', bottom: 9, right: 10, zIndex: 99 }} />
          </div>
          <div className='form-group position-relative'>
            <label className='form-control-label'>Confirm Password </label>
            <input type={showConfirmPassword ? 'text' : 'password'} onChange={changeConfirmPassWord} className='form-control' id='password' value={confirmPassword} maxLength={20} />
            <i className={showConfirmPassword ? 'far fa-eye' : 'far fa-eye-slash'} onClick={handleConfirmPasswordShowHide} style={{ position: 'absolute', bottom: 9, right: 10, zIndex: 99 }} />
          </div>
          <div className='row'>
            <div className='col-md-8'>
              <div className='form-control-feedback'>
                <p className='mb-1 text-danger'>Password Rules: </p>
                <ul>
                  <li><small>Contains at least eight characters.</small></li>
                  <li><small>Including at least one number.</small></li>
                  <li><small>Includes both lower and uppercase letters.</small></li>
                  <li><small>Include at least one special characters.</small></li>
                  <li><small>Cannot be your current password.</small></li>
                  <li><small>Cannot contain your 'password'</small></li>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
        <center>
          <div className='text-center text-success'>{sucMsg}</div>
          <div className='text-center text-danger'>{errMsg}</div>
        </center>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ passwordModal: false, consultantData: {}, password: '', confirmPassword: '', errMsg: '' })}> Close</Button>
          <Button variant='success' size='sm' onClick={handleChangePassword}> Update </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={resetPasswordModal} onHide={() => setStateData({ resetPasswordModal: false, consultantData: {}, errMsg: '' })} size='md' className='update-modal'>
        <Modal.Header closeButton>
          <h4 className="modal-title">Reset Password</h4>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Consultant Info: </strong></p>
          <dl className='dl-horizontal'>
            <dt>Name </dt>
            <dd>{consultantData?.name}</dd>
            <dt>Email ID</dt>
            <dd>{consultantData?.emID}</dd>
            <dt>Mobile</dt>
            <dd>{consultantData?.mobCcNum}</dd>
          </dl>
          <hr className='mb-3' />
          <h6 className='text-danger'>Are you sure, you want to send <strong>Reset Password Link ? </strong></h6>
        </Modal.Body>
        <div className='text-center text-success'>{sucMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ resetPasswordModal: false, errMsg: '' })}>  No </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleResetPassword}> Yes </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConsultantPopupsComponent;
