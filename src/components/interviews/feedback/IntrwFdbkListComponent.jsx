/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

const IntrvwFdbckListComponent = (props) => {

  const { intrvwData, intrvwFdbkList, handleEditData } = props;

  return (
    <div>
      <div className='container mt-4'>
        <div className='row'>
          {intrvwFdbkList && intrvwFdbkList.length > 0 ? intrvwFdbkList.map((item, index) => {
            const offset = new Date().getTimezoneOffset();
            const cDate = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
            const sed = moment(item.cDtStr, 'YYYY-MM-DD HH:mm').add(24, 'hour').subtract(offset, 'minutes').format('YYYY-MM-DD HH:mm');
            const ptm = moment().format('YYYY-MM-DD HH:mm');
            const {tStatus, intrwStatus} = setStatus(item.testStatus, item.intrwStatus);

            return (
              <div className='col-md-6 ' key={index}>
                <div className='card mb-3'>
                  <div className='d-flex justify-content-between'>
                    <div className='card-body'>
                      <p className='mb-0'>
                        <span>Questions Asked:</span> {item.qus}<br />
                        <span>Feedback:</span> {item.ifNotes}<br />
                        {intrvwData.process === 'Video Interview' || intrvwData.process === 'Audio Interview' || intrvwData.process === 'Face to Face' ?
                          <>
                            <span>Sent Thank you Email to Interviewer?:</span> {item.intrwTyEmail == true ? 'Yes' : 'No'} <br />
                            <span>Interviewer Names:</span> {item.intrwdBy} <br />
                            <span>Interview Notes:</span> {item.intrwNotes} <br />
                            <div className='d-flex'>
                              <div className='p-0'>
                                <span>Status:</span> {intrwStatus}
                              </div>
                            </div>
                            <div className='ml-auto p-0'>
                                <span>Created By:</span> {item.cuName} | <span>Created On:</span> {cDate}
                              </div>
                          </>
                          :
                          <>
                            <span>Informed Test being Completed?:</span> {item.testNotify == true ? 'Yes' : 'No'} <br />
                            <span>Test Notes:</span> {item.testNotes} <br />
                            <div className='d-flex'>
                              <div className='p-0'>
                                <span>Test Score:</span> {item.testScore} | <span>Status:</span> {tStatus}
                              </div>
                            </div>
                            <div className='ml-auto p-0'>
                              <span>Created By:</span> {item.cuName} | <span>Created On:</span> {cDate}
                            </div>
                          </>
                        }
                      </p>
                    </div>
                    {sed >= ptm && <div>
                      <a className='btn btn-sm btn-primary me-2' onClick={() => handleEditData({ action: 'Edit', fdbkData: item })}  data-bs-toggle='tooltip' title='Edit Details'><i className='fa-solid fa-pen-to-square'></i></a>
                      </div>}
                  </div>
                </div>
              </div>
            )
          }) : <tr>
            <td colSpan={6}>
              <div className='text-center py-3'>
                <strong>No data</strong>
              </div>
            </td>
          </tr>}
        </div>
      </div>
    </div>
  );
}

export default IntrvwFdbckListComponent;

const setStatus = (status, status1) => {
  let tStatus = <span className='badge badge-sm text-primary fs-6'>{status}</span>;
  switch(status) {
    case 'Passed':
      tStatus = <span className='badge badge-sm text-success fs-6'>{status}</span>;
      break;
    case 'Failed':
      tStatus = <span className='badge badge-sm text-danger fs-6'>{status}</span>;
      break;
    default:
      tStatus = <span className='badge badge-sm text-primary fs-6'>{status}</span>;
      break;
  }

  let intrwStatus = <span className='badge badge-sm text-primary fs-6'>{status1}</span>;
  switch (status1){
    case 'Selected':
      intrwStatus =  <span className='badge badge-sm text-success fs-6'>{status1}</span>;
      break;
    case 'Rejected':
      intrwStatus =  <span className='badge badge-sm text-danger fs-6'>{status1}</span>;
      break;
    case 'On Hold':
      intrwStatus = <span className='badge badge-sm text-warning fs-6'>{status1}</span>;
      break;
    default :
      intrwStatus = <span className='badge badge-sm text-primary fs-6'>{status1}</span>;
      break;
  }

  return {tStatus, intrwStatus};
}
