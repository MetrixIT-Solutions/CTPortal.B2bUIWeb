/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const BranchesPopupsComponent = (props) => {
  const { rolesObj, viewModal, setStateData, branchData, statusModal, errMsg, disable, handleStatusUpdate, handleBranchDelete, deleteModal } = props;
  return (
    <div>
      <Modal show={viewModal} onHide={() => setStateData({ viewModal: false, branchData: {} })}
        backdrop='static' size='xl' keyboard={false}
      >
        <Modal.Header closeButton>
          <h5 className='mb-0'>Branch View</h5>
        </Modal.Header>
        <Modal.Body className='p-2'>
      <div>
        <div className='mb-3'>
          {branchData && branchData.obCode &&
          <div className='user-view'>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p25 float-left pb-10'>
                <span>Organization</span>
                <p className='font-weight-500 mb-0'> {branchData.orgName} - <strong>{branchData.orgCode.toUpperCase()}</strong> </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Branch Name</span>
                <p className='font-weight-500 mb-0'> {branchData.obName} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Branch Code</span>
                <p className='font-weight-500 mb-0'> {branchData.obCode} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Mobile Number</span>
                <p className='font-weight-500 mb-0'>{branchData.obMobCc} {branchData.obMobNum} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p25 float-left pb-10'>
                <span>Alternate Mobile Number</span>
                <p className='font-weight-500 mb-0'>{branchData.obAltMobCc} {branchData.obAltMobNum} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Email</span>
                <p className='font-weight-500 mb-0'>{branchData.obEmID} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Alternate Email</span>
                <p className='font-weight-500 mb-0'>{branchData.obAltEmID} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                <span>Status</span>
                <p className='font-weight-500 mb-0'><span className='badge badge-success'>{branchData.obStatus} </span></p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p25 float-left pb-10'>
                <span>Created At</span>
                <p className='font-weight-500 mb-0'> {moment(branchData.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm')} </p>
              </li>
              <li className='w-md-p25 float-left pb-10'>
                  <span>Updated At</span>
                  <p className='font-weight-500 mb-0'> {moment(branchData.uDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm')} </p>
              </li>
              <li className='w-md-p50 float-left pb-10'>
                <span>Notes</span>
                <p className='font-weight-500 mb-0'>{branchData.obNotes} </p>
              </li>
            </ul>
          </div>
          }
        </div>
            {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[6]?.isAlwd) || rolesObj?.appAcc) &&
              <div className='mb-3'>
                <div>
                  <h5 className='box-title mb-0 text-info'><i className='fa-regular fa-address-book'></i> Address</h5>
                </div>
                <hr className='my-2' />
                <div className='user-view'>
                  <ul className='list-unstyled clearfix'>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>Country</span>
                      <p className='font-weight-500 mb-0'> {branchData.country} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>State</span>
                      <p className='font-weight-500 mb-0'> {branchData.state} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>Address</span>
                      <p className='font-weight-500 mb-0'> {branchData.hNum} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>Street/Area</span>
                      <p className='font-weight-500 mb-0'> {branchData.area} </p>
                    </li>
                  </ul>
                  <ul className='list-unstyled clearfix bg-grey'>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>City</span>
                      <p className='font-weight-500 mb-0'> {branchData.city} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>Zip</span>
                      <p className='font-weight-500 mb-0'> {branchData.zip} </p>
                    </li>
                  </ul>
                </div>
              </div>}
            {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[7]?.isAlwd) || rolesObj?.appAcc) &&
              <>
                <div>
                  <h5 className='box-title mb-0 text-info'><i className='fa-regular fa-address-book'></i> Organization Info</h5>
                </div>
                <hr className='my-2' />
                <div className='user-view'>
                  <ul className='list-unstyled clearfix'>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>Website</span>
                      <p className='font-weight-500 mb-0'> {branchData.obWs} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>GST</span>
                      <p className='font-weight-500 mb-0'> {branchData.obGst} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>PAN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obPan} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>CIN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obCin} </p>
                    </li>
                  </ul>
                  <ul className='list-unstyled clearfix bg-grey'>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>TIN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obTin} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>SSN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obSsn} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>EIN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obEin} </p>
                    </li>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>ITIN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obItin} </p>
                    </li>
                  </ul>
                  <ul className='list-unstyled clearfix'>
                    <li className='w-md-p25 float-left pb-10'>
                      <span>TAN</span>
                      <p className='font-weight-500 mb-0'> {branchData.obTan} </p>
                    </li>
                  </ul>
                </div>
              </>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({ viewModal: false, branchData: {} })}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* status update */}
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, branchData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Branch Info: </strong>{branchData?.orgName} | { branchData?.obName} | {branchData?.obCode}</div>
          </div>
          <h6>
            Are you sure want to {branchData?.obStatus === 'Active' ? 'Inactivate' : 'Activate'} <span style={{ fontWeight: 700 }}>?</span>
          </h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ statusModal: false, branchData: {}, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({ deleteModal: false, branchData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Branch Delete</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Branch Info: </strong> {branchData?.orgName} | {branchData?.obName} | {branchData?.obCode}</div>
          </div>
          <h6>Are you sure want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ deleteModal: false, branchData: {}, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleBranchDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BranchesPopupsComponent;
