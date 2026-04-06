/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';
import { initCaps, firstCharCaps } from '../../../hooks/common';
import Offcanvas from 'react-bootstrap/Offcanvas';

const H1BPetitionsPopUpComponent = (props) => {
  const { updateModal, infoModal, viewModal, setStateData, errMsg, ptnsData, disable, empData, type, euName, pcNum, pType, rprtName, tName, pStatus, createdDt, handleStatusUpdate, handleClose, euEmID, euMobCcNum, editModal, caseId, handlePtnsUpdate, rprtPrimary, ptnStatus, psNotes, prModal, handlePrClick, priority, psStatus, delModal, handleDelClick } = props;
  const appliedDate = moment(ptnsData.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');

  const emMntr = ptnsData?.rprtPrimary ? ptnsData?.rprtPrimary.split(':') : [];
  const mntrEmail = emMntr?.length > 1 ? emMntr[1] : '';

  const viewMntr = rprtPrimary ? rprtPrimary.split(':') : [];
  const rvwMntrMl = viewMntr.length > 1 ? viewMntr[1] : '';

  return (
    <div>
      {/* status update */}
      <Modal show={updateModal} onHide={() => setStateData({ updateModal: false, ptnsData: {}, errMsg: '', psNotes: '' })} size='lg'>
        <Modal.Header closeButton>
          <div className='w-100'>
            <h5 className='mb-1'>H1B Petition Submitted</h5>
            {/* <span className='d-block'><b>Candidate Info:</b>  {ptnsData?.euName} | {ptnsData?.euEmID} | {ptnsData?.euMobCcNum}</span> */}
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ptnsData?.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ptnsData?.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ptnsData?.euMobCcNum} </span>
            </p>
          </div>
          <div className='user-view'>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <span>Petiton Type</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.pType} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Case ID</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.pcNum} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Applied Date</span>
                <p className='font-weight-500 mb-0'> {appliedDate} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                <span>Reviewer</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.rprtName} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Reviewer Email</span>
                <p className='font-weight-500 mb-0'> {mntrEmail} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Team</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.tName} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <div className="form-group">
                  <label>Status</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" name='psStatus' value={psStatus} onChange={(e) => setStateData({ psStatus: e.target.value, errMsg: '' })}>
                    <option value='Submitted'>Submitted</option>
                    <option value='Approved'>Approved</option>
                    <option value='Denied'>Denied</option>
                    <option value='RFE'>RFE</option>
                  </select>
                </div>
              </li>
              <li className='w-md-p60 float-left'>
                <div className='form-group'>
                  <label className='form-lable'>Notes</label><span className='text-danger'>*</span>
                  <textarea className='form-control form-control-lg' rows="3" cols="50" placeholder='Notes' aria-controls='example5' value={psNotes} onChange={(e) => setStateData({ psNotes: initCaps(e.target.value), errMsg: '' })} />
                </div>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ updateModal: false, ptnsData: {}, errMsg: '', psNotes: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* info modal */}
      <Modal show={infoModal} onHide={handleClose} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>{empData.title}</h6>
        </Modal.Header>
        <Modal.Body>
          {type == 'empInfo' &&
            <div className='jobdetails-left'>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-phone'></i> {empData.mobile}
                </span>
              </h6>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a> </span>
              </h6>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-brands fa-linkedin'></i> {empData?.linkedin?.length ? <a href={empData.linkedin[0]} target='_blank'>{empData.linkedin[0]}</a> : 'N/A'}
                </span>
              </h6>
            </div>}

          {type == 'mentor' &&
            <div className='jobdetails-left'>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-user'></i> {empData.name} </span>
              </h6>
              <h6>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a>
                </span>
              </h6>
            </div>}
        </Modal.Body>
      </Modal>

      {/* view */}
      <Modal show={viewModal} onHide={() => setStateData({ viewModal: false, ptnsData: {}, errMsg: '' })} size='lg'>
        <Modal.Header closeButton>
          <div className='w-100'>
            <h5 className='mb-1'>H1B Petition View</h5>
            <span className='d-block'><b>Candidate Info:</b> {euName} | {euEmID} | {euMobCcNum}</span>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <span>Petiton Type</span>
                <p className='font-weight-500 mb-0'> {pType} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Case ID</span>
                <p className='font-weight-500 mb-0'> {pcNum} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Applied Date</span>
                <p className='font-weight-500 mb-0'> {createdDt} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                <span>Reviewer</span>
                <p className='font-weight-500 mb-0'> {rprtName} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Team</span>
                <p className='font-weight-500 mb-0'> {tName} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span className="d-block fw-bold">Petition Status</span>
                <div className={`${(pStatus == 'Open') ? 'badge badge-primary' : pStatus == 'Review' ? 'badge badge-warning' : (pStatus == 'Submitted') ? 'badge badge-success' : 'badge badge-dark'}`}><i className='fas fa-tasks me-1'></i>  {pStatus}</div>
              </li>
            </ul>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <span>Reviewer Email</span>
                <p className='font-weight-500 mb-0'> {rvwMntrMl} </p>
              </li>
              {pStatus === 'Submitted' ? <li className='w-md-p35 float-left'>
                <span>Submitted Status</span>
                <p className='font-weight-500 mb-0'> {psStatus} </p>
              </li> : ''}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({ viewModal: false, ptnsData: {}, errMsg: '' })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* case-id update */}
      <Modal show={editModal} onHide={() => setStateData({ editModal: false, ptnsData: {}, errMsg: '' })} size='lg'>
        <Modal.Header closeButton>
          <div className='w-100'>
            <h5 className='mb-1'>H1B Petititon Update Case ID</h5>
            <span className='d-block'><b>Candidate Info:</b> {ptnsData.euName} | {ptnsData.euEmID} | {ptnsData.euMobCcNum}</span>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <span>Petiton Type</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.pType} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Applied Date</span>
                <p className='font-weight-500 mb-0'> {appliedDate} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Reviewer</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.rprtName} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                <span>Reviewer Email</span>
                <p className='font-weight-500 mb-0'> {mntrEmail} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Team</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.tName} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Status</span>
                <p className='font-weight-500 mb-0'> {ptnsData?.pStatus} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <div className="form-group">
                  <label>Case ID</label>
                  <input type='text' className='form-control' placeholder='Case ID' value={caseId} onChange={(e) => setStateData({ caseId: e.target.value, errMsg: '' })} />
                </div>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <div className='text-danger text-center'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({ editModal: false, ptnsData: {}, errMsg: '' })}>
            Close
          </Button>
          <Button variant='secondary' onClick={(e) => handlePtnsUpdate(e)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* priority modal */}
      <Modal show={prModal} onHide={() => setStateData({ prModal: false, errMsg: '', priority: '', disable: false, ptnsData: {} })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>Priority Update</h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <div className="align-items-center">
                  <b className="mb-0">Candidate Info:</b>
                  <span className="ms-2">{ptnsData.euName}  |  {ptnsData.euEmID}  |  {ptnsData.euMobCcNum}</span>
                </div>
                <label className='form-lable'>Priority</label><span className='text-danger'>*</span>
                <select className='form-select form-control' name='orgCode' value={priority} onChange={(e) => setStateData({ priority: e.target.value, errMsg: '' })}>
                  <option value=''>No Priority</option>
                  <option value='071'>Low</option>
                  <option value='051'>Medium</option>
                  <option value='031'>High</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <div className='text-end'>
            <Button type='button' className='btn btn-danger me-2' disabled={disable} onClick={() => setStateData({ prModal: false, errMsg: '', priority: '', disable: false, ptnsData: {} })}>Close</Button>
            <Button type='button' className='btn btn-success' disabled={disable} onClick={handlePrClick}>Update</Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* delete modal */}
      <Modal show={delModal} onHide={() => setStateData({ delModal: false, errMsg: '', disable: false, ptnsData: {} })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>H1B Petition Delete</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ptnsData.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ptnsData.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ptnsData.euMobCcNum} </span>
            </p>
          </div>
          <div>
            <p>Are you sure you want to delete <b>{ptnsData.pcNum}</b> ?</p>
          </div>

        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <div className='text-end'>
            <Button type='button' className='btn btn-danger me-2' disabled={disable} onClick={() => setStateData({ delModal: false, errMsg: '', disable: false, ptnsData: {} })}>No</Button>
            <Button type='button' className='btn btn-success' disabled={disable} onClick={handleDelClick}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default H1BPetitionsPopUpComponent
