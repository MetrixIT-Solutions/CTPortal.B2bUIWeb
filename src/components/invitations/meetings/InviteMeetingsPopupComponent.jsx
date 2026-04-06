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

const InviteMeetingsPopupComponent = (props) => {

  const { stsUpdt, inviteData, meeting, mStatus, mNotes, errMsg, disabled } = props.state;
  const { submitStatusUpdate, setStateData } = props;
  const meetingAt = moment(meeting.msDtTmStr, 'YYYY-MM-DD HH:mm').format('DD MMM, YYYY HH:mm');

  return (
    <div>
      {/* Delete Pop-up */}
      <Modal show={stsUpdt} onHide={() => setStateData({ stsUpdt: false, mStatus: '', mNotes: '', meeting: {}, errMsg: '', disabled: false })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Invitation Meeting Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Invitation Info: </strong> {inviteData?.fName} | {inviteData?.emID} {inviteData?.mobCcNum ? ' | ' + inviteData?.mobCcNum : ''}</div>
          </div>
          <div className='d-flex mb-2'>
            <div><strong>Meeting Info: </strong><br />Type: {meeting.mType} | At: {meetingAt} | Attendee(s): {meeting.mbrNames}<br />
            Discuss About: {meeting.msub}</div>
          </div>
          <div className='d-flex mb-2'>
            <textarea placeholder='Meeting Status Notes Required' className='form-control' rows='4' maxLength={1000} onChange={(e) => setStateData({mNotes: e.target.value, errMsg: ''})} value={mNotes}></textarea><br /><br />
          </div>
          <h6>Are you sure, you want to <strong>{mStatus === 'Cancelled' ? 'cancel' : 'complete'}</strong> meeting?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ stsUpdt: false, mStatus: '', mNotes: '', meeting: {}, errMsg: '', disabled: false })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disabled} onClick={submitStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default InviteMeetingsPopupComponent;
