/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const VendorsPopupsComponent = (props) => {
  const {rolesObj, handleStatusUpdate, setStateData, statusModal, vndrData, errMsg, disable, viewModal, deleteModal, handlevndrsDelete} = props;
  return (
    <div>
      {/* status update */}
      <Modal show={statusModal} onHide={() => setStateData({statusModal: false, vndrData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Vendor Info: </strong> {vndrData?.vName} | {vndrData?.vcPerson}</div>
          </div>
          <h6>
            Are you sure want to {vndrData?.vStatus === 'Active' ? 'Inactivate' : 'Activate'} <span style={{fontWeight: 700}}>?</span>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({statusModal: false, vndrData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* view */}
      <Modal show={viewModal} onHide={() => setStateData({viewModal: false, vndrData: {}, errMsg: ''})} size='lg'>
        <Modal.Header closeButton>
          <h5>Vendor Details</h5>
        </Modal.Header>
        <Modal.Body>
        <div className='user-view'>
          <ul className='list-unstyled clearfix'>
            <li className='w-md-p30 float-left'>
              <span>Vendor Type</span>
              <p className='font-weight-500 mb-0'>{vndrData.vType}</p>
            </li>
            <li className='w-md-p30 float-left'>
              <span>Vendor Company</span>
              <p className='font-weight-500 mb-0'>{vndrData.vName}</p>
            </li>
            <li className='w-md-p30 float-left'>
              <span>End Client</span>
              <p className='font-weight-500 mb-0'>{vndrData.vClient}</p>
            </li>
          </ul>
          <ul className='list-unstyled clearfix bg-grey'>
          <li className='w-md-p30 float-left'>
              <span>Vendor Name</span>
              <p className='font-weight-500 mb-0'>{vndrData.vcPerson}</p>
            </li>
            <li className='w-md-p30 float-left'>
              <span>Vendor Email</span>
              <p className='font-weight-500 mb-0'>{vndrData.vcEmail}</p>
            </li>
            <li className='w-md-p30 float-left'>
              <span>Mobile Number</span>
              <p className='font-weight-500 mb-0'>{vndrData.vcMobCcNum}</p>  
            </li>
            <li className='w-md-p30 float-left'>
              <span>Status</span>
              <p className='font-weight-500 mb-0'>{vndrData.vStatus}</p>
            </li>
          </ul>
        </div>
        
          {/* {vndrData.vType == 'Vendor' && (
            <div className='user-view'>
              <h5 className='text-info mt-3'>Prime Vendor / Implementation</h5>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <span>Type</span>
                <p className='font-weight-500 mb-0'>{vndrData.pvipType}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Company Name</span>
                <p className='font-weight-500 mb-0'>{vndrData.pvipName}</p>
              </li>
            </ul>
              {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[6]?.isAlwd) || rolesObj?.appAcc) &&
                <ul className='list-unstyled clearfix bg-grey'>
                  <li className='w-md-p30 float-left'>
                    <span>Name</span>
                    <p className='font-weight-500 mb-0'>{vndrData.pvipcPerson}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    <span>Email ID</span>
                    <p className='font-weight-500 mb-0'>{vndrData.pvipcEmail}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    <span>Phone Number</span>
                    <p className='font-weight-500 mb-0'>{vndrData.pvipcMobNum}</p>
                  </li>
                </ul>}
            </div>
          )} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({viewModal: false, vndrData: {}, errMsg: ''})}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({deleteModal: false, vndrData: {}, errMsg: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Vendor Delete</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Vendor Info: </strong> {vndrData?.vName} | {vndrData?.vcPerson}</div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({deleteModal: false, vndrData: {}, errMsg: ''})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handlevndrsDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VendorsPopupsComponent;
