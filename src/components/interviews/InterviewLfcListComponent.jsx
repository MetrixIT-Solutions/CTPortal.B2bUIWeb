/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';
import NoData from '../../assets/images/no-data.svg';

const InterviewLfcListComponent = (props) => {
  const {lfcModal, intvLfcList, interData } = props.state;
  const {handleClose} = props;

  return (
    <div>
      <Offcanvas show={lfcModal} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Interview Lifecycle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong className='mb-2'>Interview Info:</strong> (Interview ID - {interData.intrwId}) <br />
           Candidate - {interData.euName} | Job Title: {interData.jobTitle} | Location: {interData.jobLoc} | Vendor: {interData.vName}<br /> <hr />
          <div className='table-responsive'>
            {intvLfcList && intvLfcList.length > 0 ?
              intvLfcList.map((item, i) => {
                const offset = new Date().getTimezoneOffset();
                const date = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                const isc = item.isDtStr ? moment(item.isDtStr).format('DD MMM, YYYY HH:mm') : '';
                return (
                <div className='col-md-12' key={i}>
                  <div className='card mb-2'>
                    <div className='d-flex justify-content-between m-2'>
                      <div className='card-body'>
                        <p className='card-text'>
                          <strong>Notes:</strong> {item.isNotes}
                        </p>
                        <p className='mb-0'>
                          <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Scheduled on:</strong> {isc}  {interData.iTz}| <strong>Status:</strong> <span className={`${(item.iStatus == 'Scheduled' || item.iStatus == 'Rescheduled') ? 'badge badge-primary-light' : (item.iStatus == 'Completed' || item.iStatus == 'Approved') ? 'badge badge-success-light' : item.iStatus == 'Next Round' ? 'badge badge-warning-light' : item.iStatus == 'Placed' ? 'badge badge-success-light' : item.iStatus == 'On Hold' ? 'badge badge-danger-light' : (item.iStatus == 'Not Selected' || item.iStatus == 'Rejected') ? 'badge badge-danger-light' : ''}`}>{item.iStatus}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                )
              }) : <div className="no-data">
                <img src={NoData}></img>
                <p className="text-danger py-2">No Data Found </p>
              </div>
            }
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default InterviewLfcListComponent