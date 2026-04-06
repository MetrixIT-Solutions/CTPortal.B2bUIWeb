/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import '../../../assets/css/style.css';
import { firstCharCaps } from '../../../hooks/common';
import NoData from '../../../assets/images/no-data.svg';

const OfferLetterFlwpListComponent = (props) => {
  const {Notes, fwNotes, FwlpsModal, errMsg, disable, ofrLtrFlwpsList, FwlerrMsg, fwlpsNotesModal, ofrLtrData, refId, rolesObj} = props.state;
  const {setStateData, handleClose, ofrLtrFollowupsCreate, toggleModal, handleFollowupsEdit, handleFwlpsNtsUpdate} = props;

  return (
    <div>
      {/* Followups */}
      <Offcanvas show={FwlpsModal} onHide={handleClose} backdrop='static' className='w-50 submit-modal'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offer Letter Notes</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <p className='mb-0'><b>Candidate Info:</b> {ofrLtrData.euName} | {ofrLtrData.euEmID} | {ofrLtrData.euMobCcNum}</p> <hr /> */}
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
            </p>
          </div>
          {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[7]?.isAlwd) || rolesObj?.appAcc) &&
            <>
              <p><strong>Create Notes</strong></p>
              <form>
                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <label>Notes</label>
                      <span className='text-danger'>*</span>
                      <textarea className='form-control' value={Notes} rows='4' cols='65' placeholder='Followups Notes*' onChange={(e) => setStateData({ Notes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='text-center text-danger'>{errMsg}</div>
                  <Button variant='success' disabled={disable} onClick={ofrLtrFollowupsCreate}>
                    Create
                  </Button>
                </div>
              </form>
              <hr />
            </>
          }
          <strong>Offer Letter Notes List</strong> <br />
          <div className='container mt-4'>
            <div className='row'>
              {ofrLtrFlwpsList && ofrLtrFlwpsList.length > 0 ? (
                ofrLtrFlwpsList.map((item, index) => {
                  const offset = new Date().getTimezoneOffset();
                  const cDate = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                  const sed = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').add(1, 'hour').subtract(offset, 'minutes').format('YYYY-MM-DD HH:mm');
                  const ptm = moment().format('YYYY-MM-DD HH:mm');

                  return (
                    <div className='col-md-6' key={index}>
                      <div className='card mb-6'>
                        <div className=' d-flex justify-content-between m-2'>
                          <div className='card-body'>
                            <p className='card-text'>
                              <strong>Notes:</strong> {item.notes} <small>{item.cDtStr < item.uDtStr && '(edited)'}</small>
                            </p>
                            <p className='mb-0'>
                              <strong>Created By:</strong> {item.cuName} <br />
                              <strong>Created On:</strong> {cDate}
                            </p>
                          </div>
                          {/* {item.cUId == refId && sed >= ptm && ( */}
                          {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && sed >= ptm && (
                            <div>
                              <a className='me-2' onClick={() => handleFollowupsEdit(item)}>
                                <i className='fa-solid fa-pen-to-square'></i>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                // <tr>
                  // <td colSpan={6}>
                    <div className='text-center bg-grey py-3'>
                      <img src={NoData}></img>
                      <p className='text-danger'><strong>No data</strong></p>
                    </div>
                  // </td>
                // </tr> 
              )}
            </div>
          </div>
        </Offcanvas.Body>

        {/* followups Notes Pop-up */}
        {fwlpsNotesModal && (
          <div className='review-modal offcanvas-backdrop w-50'>
            <div className='modal-container'>
              <div className=' modal-content'>
                <h5 className='modal-title mb-3'>H1B Petition Notes Edit<span className='close-icon' onClick={toggleModal}>X</span></h5>
              </div>
              <div className='modal-body'>
                <textarea value={fwNotes} rows='4' cols='40' placeholder='Followup Notes*' onChange={(e) => setStateData({fwNotes: firstCharCaps(e.target.value), FwlerrMsg: ''})}></textarea>
                <div className='text-center text-danger'>{FwlerrMsg}</div>
              </div>
              <div className='container text-center'>
                <button type='submit' className='btn btn-success mt-3' disabled={disable} onClick={handleFwlpsNtsUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </Offcanvas>
    </div>
  );
};

export default OfferLetterFlwpListComponent;
