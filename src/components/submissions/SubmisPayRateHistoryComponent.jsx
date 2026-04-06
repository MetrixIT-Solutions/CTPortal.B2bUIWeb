/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

const SubmisPayRateHistoryComponent = (props) => {
  const { ispaylc, payRateList, submitData } = props.state;
  const { handleClose, setStateData } = props;
  return (
    <div>
      <Offcanvas show={ispaylc} onHide={handleClose} backdrop="static" className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>PayRate History</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <strong className='mb-2'>Submission Info:</strong> (Submission ID - {submitData.subId}) <br />
           Candidate - {submitData.euName} | Job Title: {submitData.jobTitle} | Location: {submitData.jobLoc}<br /> <hr />
          <div className='table-responsive'>
            <table className='table table-bordered mb-0'>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>Created On</th>
                  <th scope='col'>Created By</th>
                  <th scope='col'>PayRate/Hr</th>
                  <th scope='col'>PayRate Notes</th>
                  <th scope='col'>PayRate Image</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              {payRateList && payRateList.length > 0 ?
                <tbody>
                  {payRateList.map((item, i) => {
                    const offset = new Date().getTimezoneOffset();
                    const cDate = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                    return (
                      <tr key={i}>
                        <td>{cDate}</td>
                        <td>{item.cuName}</td>
                        <td>{item.prHr}</td>
                        <td>{item.prNotes}</td>
                        <td>{<img onClick={() => setStateData({isprHImage: true, ipath: item.prfPath})} src={item.prfPath} style={{width: 100}}></img>}</td>
                      </tr>
                    )
                  })}
                </tbody> :
                <tr>
                  <td colSpan={12}>
                    <div className='text-center py-3'><strong>No data</strong></div>
                  </td>
                </tr>
              }
            </table>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default SubmisPayRateHistoryComponent