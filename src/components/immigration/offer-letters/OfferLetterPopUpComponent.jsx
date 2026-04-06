/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react'
import { Modal, Button } from 'react-bootstrap'

import moment from 'moment';
import { initCaps } from '../../../hooks/common';

const OfferLetterPopUpComponent = (props) => {
  const { infoModal, empData, type, setStateData, handleClose, viewModal, ofrLtrData, updateModal, handleStatusUpdate, olStatus, olNotes, errMsg, disable, editModal, olcNum, handleOfrLtrUpdate, priority, prModal, handlePrClick, file, handleOnchange, fileInput, imgUrl, removeImage, handleDownloadFiles, rolesObj, handleOfrLtrPdfView, delModal, handleDelClick } = props;
  const createdDt = moment(ofrLtrData.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY')
  const appliedDate = moment(ofrLtrData.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');
  const emMntr = ofrLtrData?.rprtPrimary ? ofrLtrData?.rprtPrimary.split(':') : [];
  const mntrEmail = emMntr?.length > 1 ? emMntr[1] : '';

  return (
    <div>
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
      <Modal show={viewModal} onHide={() => setStateData({ viewModal: false, ofrLtrData: {} })} size='lg'>
        <Modal.Header closeButton>
          <div className='w-100'>
            <h5 className='mb-1'>Offer Letter View</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span> 
              <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span> 
              <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
            </p>
          </div>
          <div className='table-responsive'>
            <table className='table table-striped user-view'>
              <tbody>
                <tr>
                  <td width={160}><span>Case ID</span></td>
                  <td><p className='font-weight-500 mb-0'> {ofrLtrData.olcNum} </p> </td>
                </tr>
                <tr>
                  <td><span>Applied Date</span></td>
                  <td><p className='font-weight-500 mb-0'> {createdDt} </p></td>
                </tr>
                <tr>
                  <td><span>Reviewer</span> </td>
                  <td><p className='font-weight-500 mb-0'> {ofrLtrData.rprtName} </p> </td>
                </tr>
                <tr>
                  <td><span>Team</span></td>
                  <td><p className='font-weight-500 mb-0'> {ofrLtrData.tName} </p> </td>
                </tr>
                <tr>
                  <td><span>Reviewer Email</span></td>
                  <td><p className='font-weight-500 mb-0'> {mntrEmail} </p></td>
                </tr>
              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && <tr>
                  <td><span>View Offer Letter</span></td>
                  <td>
                  {ofrLtrData.olStatus !== 'Issued' ? (<p className='font-weight-500 mb-0'>Not Issued</p>) : (
                  <button className="d-flex text-align-center p-1" onClick={() => handleOfrLtrPdfView(ofrLtrData.olfPath)} >
                    <i className="fa-solid fa-file-pdf text-danger" style={{ fontSize: '35px' }}></i>
                    <span style={{ textAlign: 'left', paddingLeft: '10px'}}>{ofrLtrData?.olfaName || ''}</span>
                  </button>)}
                  </td>
                </tr>}
                <tr>
                  <td><span>Offer Letter Status</span></td>
                  <td>
                    <div className={`badge ${ofrLtrData.olStatus === 'Open' ? 'badge-primary' : ofrLtrData.olStatus === 'Review' ? 'badge-warning' : ofrLtrData.olStatus === 'Issued' ? 'badge-success' : 'badge-dark'}`}><i className='fas fa-tasks me-1'></i>{ofrLtrData.olStatus}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({ viewModal: false, ofrLtrData: {} })}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* status update */}
      <Modal show={updateModal} onHide={() => setStateData({ updateModal: false,  ofrLtrData: {}, errMsg: '', olNotes: '', file: '' })} size='lg'>
        <Modal.Header closeButton>
          <div className='w-100'>
            <h5 className='mb-1'>Issue Offer Letter</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData?.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData?.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData?.euMobCcNum} </span>
            </p>
          </div>
          <div className='user-view'>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <span>Case ID</span>
                <p className='font-weight-500 mb-0'> {ofrLtrData?.olcNum} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Applied Date</span>
                <p className='font-weight-500 mb-0'> {appliedDate} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Reviewer</span>
                <p className='font-weight-500 mb-0'> { ofrLtrData?.rprtName} </p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p35 float-left'>
                <span>Reviewer Email</span>
                <p className='font-weight-500 mb-0'> {mntrEmail} </p>
              </li>
              <li className='w-md-p35 float-left'>
                <span>Team</span>
                <p className='font-weight-500 mb-0'> { ofrLtrData?.tName} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <div className='form-group'>
                  <label>Status</label><span className='text-danger'>*</span>
                  <select className='form-select form-control' value={olStatus} onChange={(e) => setStateData({ olStatus: e.target.value, errMsg: '' })}>
                    <option value='Issued'>Issued</option>
                  </select>
                </div>
              </li>
            </ul>
            <ul className='list-unstyled clearfix '>
              <li className='w-md-p35 float-left'>
                <div className='form-group mt-1'>
                  <label className='mb-0'>Issue Offer Letter</label>{<span className='text-danger'>*</span>}<span><p className='mb-0 text-mute'><small>(File Type: pdf only)</small></p> </span>
                  <label className='custom-upload btn btn-info px-5'>
                    <input type='file' accept='application/pdf' name='file' onChange={handleOnchange} ref={fileInput} />
                    <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your Document
                  </label>
                </div>
                {file && <div className='col-md-2'>
                  <div className='d-inline-flex mt-1 position-relative'>
                    <div className='add-img d-flex align-items-center'>
                      <i className="fa-solid fa-file-pdf text-danger me-2" style={{ fontSize: '35px' }}></i>
                      <p className='mb-0'>{file.name}</p>
                    </div>
                    <div className='close-bth'>
                      <a onClick={removeImage}><i className='fa-solid fa-xmark'></i></a>
                    </div>
                  </div>
                </div>}
              </li>
              <li className='w-md-p65 float-left'>
                <div className='form-group'>
                  <label className='form-lable'>Notes</label><span className='text-danger'>*</span>
                  <textarea className='form-control form-control-lg' rows='2' cols='50' placeholder='Notes' aria-controls='example5' value={olNotes} onChange={(e) => setStateData({ olNotes: initCaps(e.target.value), errMsg: '' })} />
                </div>
              </li>
            </ul>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ updateModal: false,  ofrLtrData: {}, errMsg: '', olNotes: '', file: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

       {/* case-id update */}
        <Modal show={editModal} onHide={() => setStateData({ editModal: false, ofrLtrData: {}, errMsg: '' })} size='lg'>
          <Modal.Header closeButton>
            <div className='w-100'>
              <h5 className='mb-1'>Offer Letter Update Case ID</h5>
              {/* <span className='d-block'><b>Candidate Info:</b> {ofrLtrData.euName} | {ofrLtrData.euEmID} | {ofrLtrData.euMobCcNum}</span> */}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="alert alert-info alert-dismissible">
              <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
              <p className='mb-0'>
                <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span>
                <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span>
                <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
              </p>
            </div>
            <div className='table-responsive'>
              <table className='table table-striped user-view'>
                <tbody>
                  <tr>
                    <td width={160}><span>Applied Date</span></td>
                    <td><p className='font-weight-500 mb-0'> {appliedDate} </p> </td>
                  </tr>
                  <tr>
                    <td><span>Reviewer</span></td>
                    <td><p className='font-weight-500 mb-0'> {ofrLtrData?.rprtName} </p></td>
                  </tr>
                  <tr>
                    <td><span>Reviewer Email</span></td>
                    <td><p className='font-weight-500 mb-0'> {mntrEmail} </p></td>
                  </tr>
                  <tr>
                    <td><span>Team</span> </td>
                    <td><p className='font-weight-500 mb-0'> {ofrLtrData?.tName} </p></td>
                  </tr>
                  <tr>
                    <td><span>Status</span></td>
                    <td><p className='font-weight-500 mb-0'> {ofrLtrData?.olStatus} </p></td>
                  </tr>
                  <tr>
                    <td><label>Case ID</label></td>
                    <td><input type='text' className='form-control' placeholder='Case ID' value={olcNum} onChange={(e) => setStateData({ olcNum: e.target.value, errMsg: '' })} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <div className='text-danger text-center'>{errMsg}</div>
          <Modal.Footer>
            <Button variant='danger' onClick={() => setStateData({ editModal: false, ofrLtrData: {}, errMsg: '' })}>
              Close
            </Button>
            <Button variant='secondary' onClick={(e) => handleOfrLtrUpdate(e)}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* priority modal */}
        <Modal show={prModal} onHide={() => setStateData({ prModal: false, errMsg: '', priority: '', disable: false, ofrLtrData: {} })} size='md' centered>
          <Modal.Header closeButton>
            <h6 className='mb-0'>Priority Update</h6>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-md-12'>
                <div className='form-group'>
                  <div className='align-items-center'>
                    <div className="alert alert-info alert-dismissible">
                      <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
                      <p className='mb-0'>
                        <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span>
                        <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span>
                        <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
                      </p>
                    </div>
                    {/* <b className='mb-0'>Candidate Info:</b> */}
                    {/* <span className='ms-2'>{ofrLtrData.euName}  |  {ofrLtrData.euEmID}  |  {ofrLtrData.euMobCcNum}</span> */}
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
              <Button type='button' className='btn btn-danger me-2' disabled={disable} onClick={() => setStateData({ prModal: false, errMsg: '', priority: '', disable: false, ofrLtrData: {} })}>Close</Button>
              <Button type='button' className='btn btn-success' disabled={disable} onClick={handlePrClick}>Update</Button>
            </div>
          </Modal.Footer>
        </Modal>

      {/* delete modal */}
      <Modal show={delModal} onHide={() => setStateData({ delModal: false, errMsg: '', disable: false, ofrLtrData: {} })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>Offer Letter Delete</h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <div className='align-items-center'>
                  <div className="alert alert-info alert-dismissible">
                    <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
                    <p className='mb-0'>
                      <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span>
                      <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span>
                      <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
                    </p>
                  </div>
                </div>
                 <idv>
                  <p className='mb-0'>Are you sure You want to Delete <b>{ofrLtrData.olcNum}</b> ?</p>
                 </idv>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <div className='text-end'>
            <Button type='button' className='btn btn-danger me-2' disabled={disable} onClick={() => setStateData({ delModal: false, errMsg: '', disable: false, ofrLtrData: {} })}>No</Button>
            <Button type='button' className='btn btn-success' disabled={disable} onClick={handleDelClick}>Yes</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OfferLetterPopUpComponent

