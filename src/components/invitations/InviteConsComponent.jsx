/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { initCaps, numebersOnly } from '../../hooks/common';

const InviteConsComponent = (props) => {

  const { inviteModal, emID, mobCC, mobNum, fName, lName, referredBy, refUser, otherRefer, disable, errMsg, successMsg, resendInvtn, usrsList, userInfo, orgsList, orgId , rprtsList, rprtId} = props.state;
  const { setStateData, handleInviteClose, handleInviteConsultant, handleChangeOrg, isdisable, handleChangeReporter } = props;

  return (
    <Modal show={inviteModal} onHide={handleInviteClose} className='modal-s'>
      <Modal.Header closeButton>
        <h5 className='mb-0'>Invite Consultant</h5>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          {(userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin')) &&
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Organization</label><span className='text-danger'>*</span>
                <select disabled={isdisable} className='form-select form-control' value={orgId} onChange={handleChangeOrg}>
                  <option value=''>Select</option>
                  {orgsList && orgsList.length > 0 && orgsList.map((item, i) => <option key={i} value={item._id}>{item.orgName}</option>)}
                </select>
              </div>
            </div>
          }
          <div className='col-md-12'>
            <div className='form-group'>
            <label>Reviewer</label><span className='text-danger'>*</span>
              <select disabled={isdisable} className='form-select form-control' value={rprtId} onChange={handleChangeReporter}>
                <option value=''>Select</option>
                {rprtsList && rprtsList.length > 0 && rprtsList.map((item, i) => <option key={i} value={item._id}>{item.name}</option>)}
              </select>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>First Name</label><span className='text-danger'>*</span>
              <input type='text' disabled={isdisable} className='form-control' placeholder='First Name' value={fName} onChange={(e) => setStateData({ fName: initCaps(e.target.value), errMsg: '', resendInvtn: false })} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>Last Name</label><span className='text-danger'>*</span>
              <input type='text' disabled={isdisable} className='form-control' placeholder='Last Name' value={lName} onChange={(e) => setStateData({ lName: initCaps(e.target.value), errMsg: '', resendInvtn: false })} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>Email</label><span className='text-danger'>*</span>
              <input type='text' disabled={isdisable} className='form-control' placeholder='Email' value={emID} onChange={(e) => setStateData({ emID: e.target.value.toLowerCase().trim(), errMsg: '', resendInvtn: false })} />
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>Mobile Number</label><span className='text-danger'>*</span>
              <div className='d-flex'>
                <select className='form-select form-control' disabled={isdisable} style={{ width: '70px' }} value={mobCC} onChange={(e) => setStateData({ mobCC: e.target.value, resendInvtn: false })}>
                  <option value='+1'>+1</option>
                  <option value='+91'>+91</option>
                </select>
                <input type='text' disabled={isdisable} className='form-control' placeholder='Mobile Number' maxLength={10} value={mobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '', resendInvtn: false })} />
              </div>
            </div>
          </div>
          <div className='col-md-12'>
            <div className='form-group'>
              <label>Referred By</label><span className='text-danger'>*</span>
              <div className="demo-radio-button">
                <input name="group5" type="radio" disabled={isdisable} id="radio_30" value='Internal' className="with-gap radio-col-primary"  checked={referredBy === 'Internal'} onChange={(e) => setStateData({referredBy: e.target.value, errMsg: '', resendInvtn: false})} />
                <label for="radio_30">Internal</label>					
                <input name="group5" type="radio" disabled={isdisable} id="radio_32" value='Other' className="with-gap radio-col-success" checked={referredBy === 'Other'} onChange={(e) => setStateData({referredBy: initCaps(e.target.value), errMsg: '', resendInvtn: false})} />
                <label for="radio_32">Other</label>
              </div>
            </div>
          </div>
          {referredBy == 'Other' && <div className='col-md-12'>
            <div className='form-group'>
              <input type='text' disabled={isdisable} className='form-control ' placeholder='Other' value={otherRefer} onChange={(e) => setStateData({ otherRefer: initCaps(e.target.value), errMsg: '', resendInvtn: false })} />
            </div>
          </div>}
          {referredBy == 'Internal' && <div className='col-md-12'>
            <div className='form-group'>
              <select className='form-select form-control' disabled={isdisable} value={refUser} onChange={(e) => setStateData({ refUser: e.target.value, errMsg: '', resendInvtn: false })}>
                <option value=''>Select</option>
                {usrsList && usrsList.length > 0 && usrsList.map((item, i) => <option key={i} value={item._id}>{item.name + '(' + item.refUID.split(':')[1] + ')'}</option>)}
              </select>
            </div>
          </div>}
        </div>
      </Modal.Body>
      <div className='text-center text-success'>{successMsg}</div>
      <div className='text-center text-danger'>{errMsg}</div>
      <Modal.Footer>
        <Button variant='danger' onClick={handleInviteClose}>No</Button>
        <Button variant='success' disabled={disable} onClick={handleInviteConsultant}>{resendInvtn ? 'Re-Invite' : 'Invite'}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InviteConsComponent;
