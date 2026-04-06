/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { initCaps } from '../../hooks/common';
const animatedComponents = makeAnimated();

const AdminUsersPopUpComponent = (props) => {
  const { firstname, lastname, email, rolesObj, setStateData, errMsg, sucMsg, createModal, rolesList, statusModal, userData, deleteModal, passwordModal, password, showPassword, showConfirmPassword, confirmPassword, disable, resendInvtn, userInfo, org, orgObj, obId, team, userType, userRole, report, branchesList, orgsList, teamsList, userList, showHide, reVtnModel } = props;
  const { handleClose, handleCreate, handleStatusUpdate, handleUserDelete, handleChangePassword, changePaswword, changeConfirmPassWord, handlePasswordShowHide, handleConfirmPasswordShowHide, handleOnChange, handleUserType, handleRolesChange, handleReportChange, handleResendInvtLink, handleTeamChange } = props;
 
  return (
    <div>
      <Modal show={createModal} onHide={handleClose} size='lg' aria-labelledby='example-modal-sizes-title-lg' >
        <Modal.Header closeButton>
          <Modal.Title> Invite - Admin User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='row mb-3'>
              <div className='col-md-4'>
                <div className='from-group'>
                  <label className='form-label'>Organization</label>{rolesObj?.appAcc && <span className='text-danger'>*</span>}
                  {rolesObj?.appAcc ? <select className="form-select form-control"firstname name='orgCode' value={org} onChange={(e) => handleOnChange(e, 'org')}>
                    <option value=''>Select</option>
                    {orgsList && orgsList.length > 0 && orgsList.map((item, i) => <option key={i} value={item._id}>{item.potLevel ? item.orgName + '(' + item.potLevel + ')' : item.orgName}</option>)}
                  </select>
                  : <select className="form-select form-control" name='orgCode' disabled={true} value={org} onChange={(e) => handleOnChange(e, 'org')}>
                  <option value={orgObj._id}>{orgObj.orgName}</option>
                </select>}
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>Branch</label>
                  <select className="form-select form-control" name='obId' value={obId} onChange={(e) => handleOnChange(e, 'branch')}>
                    <option value=''>Select</option>
                    {branchesList && branchesList.length > 0 && branchesList.map((item, i) => <option key={i} value={item._id}>{item.obName}</option>)}
                  </select>
                </div>
              </div>
              {(userInfo.userType == 'App' || userInfo.userType == 'Tech' || userInfo.userType == 'Management') &&
                <div className='col-md-4'>
                  <div className="form-group">
                    <label>User Type</label><span className='text-danger'>*</span>
                    <select className="form-select form-control" name='userRole' value={userType} onChange={handleUserType}>
                      <option value=''>Select</option>
                      <option value='Management'>Management</option>
                      <option value='Employee'>Employee</option>
                    </select>
                  </div>
                </div>
              }
              <div className="col-md-4">
                <div className="form-group">
                  <label>User Role</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" name='userRole' value={userRole} onChange={handleRolesChange}>
                    <option value=''>Select</option>
                    {rolesList && rolesList.length > 0 && rolesList.map((item, i) => <option key={i} value={item.rName}>{item.rName}</option>)}
                  </select>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>Email<span className='text-danger'>*</span></label>
                  <input type='email' autoFocus={true} className='form-control' value={email} maxLength={100} onChange={(e) => { setStateData({ email: (e.target.value).toLocaleLowerCase(), errMsg: '', resendInvtn: false }) }} placeholder='Enter Email' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>First Name<span className='text-danger'>*</span></label>
                  <input type='text' className='form-control' value={firstname} maxLength={40} onChange={(e) => { setStateData({ firstname:initCaps(e.target.value), errMsg: '', resendInvtn: false }) }} placeholder='Enter FirstName' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>Last Name<span className='text-danger'>*</span></label>
                  <input type='text' className='form-control' value={lastname} maxLength={40} onChange={(e) => { setStateData({ lastname: initCaps(e.target.value), errMsg: '', resendInvtn: false }) }} placeholder='Enter LastName' />
                </div>
              </div>
              {userType == 'Employee' &&<div className='col-md-4'>
                <div className="form-group">
                  <label>Team</label>{userType == 'Employee' &&<span className='text-danger'>*</span>}
                  <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={teamsList} value={[...team]} onChange={handleTeamChange} />
                </div>
              </div>}
              <div className="col-md-4">
                <div className="form-group">
                  <label>Report To</label>{userType == 'Employee' && <span className='text-danger'>*</span>}
                  <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={userList} value={[...report]} onChange={handleReportChange} />
                </div>
              </div>
            </div>
            <div className='text-danger'><p className='text-center' >{errMsg}</p></div>
            <div className='text-success'><p className='text-center' >{sucMsg}</p></div>
            <div className='text-center'>
              <button className='btn btn-primary m-2' disabled={disable} type='button' onClick={handleClose}>Close</button>
             {showHide == 'hide' ? '' : <button type='submit' className='btn btn-success' disabled={disable} onClick={handleCreate}>{resendInvtn ? 'Re-Invite' : 'Invite'}</button>}
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* status update */}
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, userData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong>{userData?.fName} | {userData?.mobNum}</div>
          </div>
          <h6>
            Are you sure want to {(userData?.uStatus === 'Active' || userData?.uStatus === 'Open') ? 'Inactivate' : 'Activate'} <span style={{ fontWeight: 700 }}>?</span>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ statusModal: false, userData: {}, errMsg: '' })}> No </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}> Yes </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({ deleteModal: false, userData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Delete Data</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong> {userData?.fName} | {userData?.mobNum}</div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ deleteModal: false, userData: {}, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleUserDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Update */}
      <Modal show={passwordModal} onHide={() => setStateData({ passwordModal: false, userData: {}, errMsg: '', sucMsg: '', password: '', confirmPassword: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Change Password</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong>{userData?.fName} | {userData?.emID}</div>
          </div>
          <div className='form-group position-relative'>
            <label className='form-control-label'>New Password </label>
            <input type={showPassword ? 'text' : 'password'} onChange={changePaswword} className='form-control' id='password' value={password} maxLength={20} />
            <i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} onClick={handlePasswordShowHide} style={{ position: 'absolute', bottom: 9, right: 10, zIndex: 99 }} />
          </div>
          <div className='form-group position-relative'>
            <label className='form-control-label'>Confirm Password </label>
            <input type={showConfirmPassword ? 'text' : 'password'} onChange={changeConfirmPassWord} className='form-control' id='password' value={confirmPassword} maxLength={20} />
            <i className={showConfirmPassword ? 'far fa-eye' : 'far fa-eye-slash'} onClick={handleConfirmPasswordShowHide} style={{ position: 'absolute', bottom: 9, right: 10, zIndex: 99 }} />
          </div>
        </Modal.Body>
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
        <div className='text-center text-success'>{sucMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button type='button' variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ passwordModal: false, userData: {}, errMsg: '', sucMsg: '', password: '', confirmPassword: '' })}> Close</Button>
          <Button type='button' variant='success' size='sm' disabled={disable} onClick={handleChangePassword}> Update </Button>
        </Modal.Footer>
      </Modal>

      {/* Re-Invite Mail */}
      <Modal show={reVtnModel} onHide={() => setStateData({ reVtnModel: false, userData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Re-Send Mail</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>User Info: </strong>{userData?.fName} | {userData?.emID}</div>
          </div>
          <h6>
            Are you sure, you want to Re-Send the invitation link<span style={{ fontWeight: 700 }}>?</span>
          </h6>
        </Modal.Body>
        <div className='text-center text-success'>{sucMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ reVtnModel: false, userData: {}, errMsg: '' })}> No </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleResendInvtLink}> Yes </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminUsersPopUpComponent;
