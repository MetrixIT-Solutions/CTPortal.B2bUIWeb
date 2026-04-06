/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

const H1BPetitionsLfcListComponent = (props) => {
  const { lfcModal, ptnsLfcList, ptnsData } = props.state;
  const { handleClose } = props;
  
  return (
    <div>
      <Offcanvas show={lfcModal} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>H1B Petition Lifecycle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <b>Candidate Info:</b> {ptnsData.euName} | {ptnsData.euEmID} | {ptnsData.euMobCcNum} <hr /> */}
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ptnsData.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ptnsData.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ptnsData.euMobCcNum} </span>
            </p>
          </div>

          <p><strong>H1B Petitions Lifecycle</strong> </p>
          <div className='table-responsive'>
            {ptnsLfcList && ptnsLfcList.length > 0 ?
              ptnsLfcList.map((item, i) => {
                const offset = new Date().getTimezoneOffset();
                const date = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                return (
                  <div className='col-md-12' key={i}>
                    <div className='card mb-2'>
                      <div className='d-flex justify-content-between m-2'>
                        <div className='card-body'>
                          <p className='card-text'>
                            <strong>Notes:</strong> {item.psNotes}
                          </p>
                          <p className='mb-0'>
                            <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Status:</strong> <span className={`${(item.pStatus == 'Open') ? 'badge badge-primary-light' : item.pStatus == 'Review' ? 'badge badge-warning-light' : item.pStatus == 'Submission Approved' ? 'badge badge-success-light' : 'badge badge-dark-light'}`}>{item.pStatus}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }) : <div className='text-center py-3'><strong>No data</strong></div>
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default H1BPetitionsLfcListComponent