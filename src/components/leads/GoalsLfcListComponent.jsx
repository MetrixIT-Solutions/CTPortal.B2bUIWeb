/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

const GoalsLfcListComponent = (props) => {
  const { gfLfcModal, goalsLfcList, goalView } = props.state;
  const { handleClose } = props;

  return (
    <div>
      <Offcanvas show={gfLfcModal} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lifecycle</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong className='mb-2'>Goal Info:</strong> <br />
          Category - {goalView.gCategory} | Goal Type	: {goalView.gType}<br /> Goal & Accomplishments: {goalView.gAccmnts} <br/> <hr />
          <p><strong>Lifecycle</strong> </p>
          <div className='table-responsive'>
            {goalsLfcList && goalsLfcList.length > 0 ?
              goalsLfcList.map((item, i) => {                
                const offset = new Date().getTimezoneOffset();
                const date = item.cDtStr ? moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm') : '';
                return (
                <div className='col-md-12' key={i}>
                  <div className='card mb-2'>
                    <div className='d-flex justify-content-between m-2'>
                      <div className='card-body'>
                        <p className='card-text'>
                          <strong>Notes:</strong> {item.gsNotes}
                        </p>
                        <p className='mb-0'>
                          <strong>Created By:</strong> {item.cuName} | <strong>Created On:</strong> {date} | <strong>Status:</strong> <span className= ''>{item.gStatus}</span>
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

export default GoalsLfcListComponent