/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

const SubmisLfcListComponent = (props) => {
  const { lfcModal, subLfcList, submitData } = props.state;
  const { handleClose } = props;
  
  return (
    <div>
      <Offcanvas show={lfcModal} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Submission Lifecycle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong className='mb-2'>Submission Info:</strong> (Submission ID - {submitData.subId}) <br />
           Candidate - {submitData.euName} | Job Title: {submitData.jobTitle} | Location: {submitData.jobLoc} | Vendor: {submitData.vName}<br /> <hr />
          <p><strong>Submission Lifecycle</strong> </p>
          <div className='table-responsive'>
            {subLfcList && subLfcList.length > 0 ?
              subLfcList.map((item, i) => {
                const offset = new Date().getTimezoneOffset();
                const date = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                return (
                <div className='col-md-12' key={i}>
                  <div className='card mb-2'>
                    <div className='d-flex justify-content-between m-2'>
                      <div className='card-body'>
                        <p className='card-text'>
                          <strong>Notes:</strong> {item.sNotes}
                        </p>
                        <p className='mb-0'>
                          <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Status:</strong> <span className={`${(item.sStatus == 'Submitted' || item.sStatus == 'Resubmitted') ? 'badge badge-primary-light' : item.sStatus == 'Shortlisted' ? 'badge badge-success-light' : item.sStatus == 'Rejected' ? 'badge badge-danger-light' : item.sStatus == 'No Response' ? 'badge badge-warning-light' : 'badge badge-success-light'}`}>{item.sStatus}</span>
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

export default SubmisLfcListComponent