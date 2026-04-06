/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RolesPopupsComponent = (props) => {
  const {handleStatusUpdate, setStateData, statusModal, errMsg, disable, viewModal, roleData, deleteModal, handleRolesDelete} = props;

  return (
    <div>
      {/* status update */}
      <Modal show={statusModal} onHide={() => setStateData({statusModal: false, roleData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Role Info: </strong>{roleData?.rName} | {roleData?.rCode}</div>
          </div>
          <h6>
            Are you sure want to {roleData?.rStatus === 'Active' ? 'Inactivate' : 'Activate'} <span style={{fontWeight: 700}}>?</span>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({statusModal: false, roleData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* view */}
      <Modal show={viewModal} onHide={() => setStateData({viewModal: false, roleData: {}, errMsg: ''})} size='lg'>
        <Modal.Header closeButton>
          <h5>Roles View</h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix mb-2'>
              <li className='w-md-p35 float-left'>
                  <span>Role Type</span>
                  <p className='font-weight-500 mb-0'> {roleData.rType} </p>
              </li>
              <li className='w-md-p35 float-left'>
                  <span>Name</span>
                  <p className='font-weight-500 mb-0'> {roleData.rName} </p>
              </li>
              <li className='w-md-p30 float-left'>
                  <span>Code</span>
                  <p className='font-weight-500 mb-0'> {roleData.rCode} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                  <span>Sequence</span>
                  <p className='font-weight-500 mb-0'> {roleData.rSeq} </p>
              </li>
              <li className='w-md-p35 float-left'>
                  <span>Status</span>
                  <p className='font-weight-500 mb-0'> {roleData.rStatus} </p>
              </li>
            </ul>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({viewModal: false, roleData: {}, errMsg: ''})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({deleteModal: false, roleData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Delete Data</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Role Info: </strong> {roleData?.rName} | {roleData?.rCode}</div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({deleteModal: false, roleData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleRolesDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RolesPopupsComponent;
