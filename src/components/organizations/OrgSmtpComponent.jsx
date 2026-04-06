/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { allSmallAlpha, numebersOnly } from '../../hooks/common';

const OrgSmtpComponent = (props) => {
  const { orglistObj, smpDetailsModal, errMsg, disable, senderMail, senderMailPswd, smtp, smtpPort, service, fromMail, sucMsg, showPswd, handleSmtpDetails, setStateData} = props
  return (
    <Modal show={smpDetailsModal} onHide={() => setStateData({ smpDetailsModal: false, errMsg: '' })} className='modal-s'>
    <Modal.Header closeButton>
      <h5 className="box-title text-info"><i className="fa-regular fa-address-book"></i> Mail SMTP Details:</h5>
    </Modal.Header>
    <Modal.Body>
      <div>
        <div className='mb-2'><strong>Organization Info: </strong>{orglistObj?.orgCode} | {orglistObj?.orgName} | {orglistObj?.orgMobCcNum}| {orglistObj?.orgEmID}</div>
        <div className='row mb-2 mt-2'>
          <div className='col-md-12'>
            <hr className="my-15" />
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Sender Mail</label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="Sender Mail" value={senderMail} onChange={(e) => setStateData({ senderMail: allSmallAlpha(e.target.value).trim(), errMsg: '' })} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Sender Mail Password</label><span className='text-danger'>*</span>
                  <div className="input-group mb-3">
                    <input type={`${!showPswd ? 'password' : ''}`} className="form-control pl-15 bg-transparent" placeholder="Sender Mail Password" maxLength={20} value={senderMailPswd} onChange={(e) => setStateData({ senderMailPswd: e.target.value, errMsg: '' })} />
                    <span className="input-group-text bg-transparent eye-icon">
                      {!showPswd ? <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye-slash' ></i> : <i onClick={() => setStateData({ showPswd: !showPswd })} className='fa fa-eye' ></i>}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>SMTP Domain</label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="SMTP Domain" value={smtp} onChange={(e) => setStateData({ smtp: allSmallAlpha(e.target.value), errMsg: '' })} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>SMTP Port</label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="SMTP Port" value={smtpPort} onKeyPress={numebersOnly} onChange={(e) => setStateData({ smtpPort: e.target.value, errMsg: '' })} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Service</label>
                  <input type="text" className="form-control" placeholder="Service" value={service} onChange={(e) => setStateData({ service: allSmallAlpha(e.target.value), errMsg: '' })} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>From Mail</label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="From Mail" value={fromMail} onChange={(e) => setStateData({ fromMail: e.target.value, errMsg: '' })} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal.Body>
    <div className={`text-center ${sucMsg ? 'text-success' : 'text-danger'}`}>{errMsg}</div>
    <Modal.Footer>
      <Button variant='danger' onClick={() => setStateData({ smpDetailsModal: false, errMsg: '' })}>Close</Button>
      <Button variant='success' disabled={disable} onClick={handleSmtpDetails}>Submit</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default OrgSmtpComponent