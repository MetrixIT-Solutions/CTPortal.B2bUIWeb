/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

const OfferLetterLfcListComponent = (props) => {
  const { lfcModal, ofrLtrLfcList, ofrLtrData } = props.state;
  const { handleClose } = props;
  
  return (
    <div>
      <Offcanvas show={lfcModal} onHide={handleClose} backdrop='static' className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offer Letter Lifecycle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {ofrLtrData.euName} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {ofrLtrData.euEmID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {ofrLtrData.euMobCcNum} </span>
            </p>
          </div>
          <p><strong>Offer Letter Lifecycle</strong> </p>
          <div className='table-responsive'>
            {ofrLtrLfcList && ofrLtrLfcList.length > 0 ?
              ofrLtrLfcList.map((item, i) => {
                const offset = new Date().getTimezoneOffset();
                const date = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                return (
                  <div className='card mb-2' key={i}>
                    <div className='d-flex justify-content-between m-2'>
                      <div className='card-body p-1'>
                        <p className='card-text'>
                          <strong>Notes:</strong> {item.olsNotes}
                        </p>
                        <p className='mb-0'>
                          <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Status:</strong> <span className={`${(item.olStatus == 'Open') ? 'badge badge-primary-light' : item.olStatus == 'Review' ? 'badge badge-warning-light' : item.olStatus == 'Issued' ? 'badge badge-success-light' : 'badge badge-dark'}`}>{item.olStatus}</span>
                        </p>
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

export default OfferLetterLfcListComponent