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

const OrgPanelsPopUpComponent = (props) => {
  const {viewModal, setStateData, handlePanelsDelete, deleteModal, panelsData, errMsg, disable, statusModal, handleStatusUpdate} = props;

  return (
    <div>
      {/* view */}
      <Modal show={viewModal} onHide={() => setStateData({viewModal: false, panelsData: {}, errMsg: ''})} size='lg'>
        <Modal.Header closeButton>
          <h5 className='mb-0'>Team View</h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix mb-2'>
              <li className='w-md-p35 float-left'>
                <span>Name</span>
                <p className='font-weight-500 mb-0'>{panelsData.orgName + '(' + panelsData.orgCode.toUpperCase() + ')'}</p>
              </li>
               <li className='w-md-p35 float-left'>
                <span>Parent Team</span>
                <p className='font-weight-500'>{panelsData.potLevel ? panelsData.potName + '(' + panelsData.potLevel + ')' : panelsData.potName}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Name</span>
                <p className='font-weight-500 mb-0'>{panelsData.oTeam}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                <span>Code</span>
                <p className='font-weight-500 mb-0'>{panelsData.otCode}</p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Status</span>
                <p className='font-weight-500 mb-0'>{panelsData.otStatus} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Created At</span>
                <p  className='font-weight-500 mb-0'>{moment(panelsData.cDtStr).format('DD MMM, YYYY HH:mm')}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix mb-2'>
              <li className='w-md-p35 float-left'>
                <span>Updated At</span>
                <p className='font-weight-500 mb-0'>{moment(panelsData.uDtStr).format('DD MMM, YYYY HH:mm')} </p>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({viewModal: false, panelsData: {}, errMsg: ''})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({deleteModal: false, panelsData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Delete Data</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div>
              <strong>Panels Info: </strong> {panelsData?.oTeam} | {panelsData?.otCode}
            </div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({deleteModal: false, panelsData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handlePanelsDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Update Pop-up */}
      <Modal show={statusModal} onHide={() => setStateData({statusModal: false, panelsData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div>
              <strong>Panels Info: </strong> {panelsData?.oTeam} | {panelsData?.otCode}
            </div>
          </div>
          <h6>Are you sure want to {panelsData?.otStatus === 'Active' ? 'Inactivate' : 'Activate'} <span style={{fontWeight: 700}}>?</span></h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({statusModal: false, panelsData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrgPanelsPopUpComponent;
