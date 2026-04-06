/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

const WorkAuthorizationTabComponent = (props) => {
  const { workAuths } = props;
  const visaExpDt = workAuths.visaExpDtStr ? moment(workAuths.visaExpDtStr).format('DD MMM, YYYY') : '';
  const cardExpDt = workAuths.cardExpDtStr ? moment(workAuths.cardExpDtStr).format('DD MMM, YYYY') : '';
  const li94Num = workAuths.li94Num ? workAuths.li94Num : '';
  const i94ExpDt = workAuths.i94ExpDtStr ? moment(workAuths.i94ExpDtStr).format('DD MMM, YYYY') : '';
  const wrkAuthExpDt = workAuths.wrkAuthExpDtStr ? moment(workAuths.wrkAuthExpDtStr).format('DD MMM, YYYY') : '';
  const visaStDt = workAuths.visaStDtStr ? moment(workAuths.visaStDtStr).format('DD MMM, YYYY') : '';
  
  return (
    <div>
      <div className='table-responsive'>
        <table className='table user-view'>
          <tbody>
            <tr>
              <td width={250}><span>Nationality:</span></td>
              <td><p className='font-weight-500 mb-0'> {workAuths.nationality} </p></td>
            </tr>
          </tbody>
        </table>
        {workAuths.nationality !== 'American' && (
          <div className='row'>
            <div className='col-md-6'>
              <div className='table-responsive'>
                <table className='table user-view'>
                  <tbody>
                    <tr>
                      <td width={250}><span>Visa Status:</span></td>
                      <td><p className='font-weight-500 mb-0'> {workAuths.visaStatus} </p></td>
                    </tr>
                    <tr>
                      <td><span>Visa Expiry Date:</span></td>
                      <td><p className='font-weight-500 mb-0'> {visaExpDt} </p></td>
                    </tr>
                    <tr>
                      <td><span>Expected Date:</span></td>
                      <td><p className='font-weight-500 mb-0'> {cardExpDt}</p></td>
                    </tr>
                    <tr>
                      <td><span>i-94 Number:</span></td>
                      <td><p className='font-weight-500 mb-0'> {li94Num} </p></td>
                    </tr>
                    <tr>
                      <td><span>Work Authorization Expiry:</span></td>
                      <td><p className='font-weight-500 mb-0'> {wrkAuthExpDt} </p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='table-responsive'>
                <table className='table user-view'>
                  <tbody>
                    <tr>
                      <td width={250}><span>Visa Start Date:</span></td>
                      <td><p className='font-weight-500 mb-0'> {visaStDt}</p></td>
                    </tr>
                    <tr>
                      <td><span>Receipt Number:</span></td>
                      <td><p className='font-weight-500 mb-0'> {workAuths.cardRcptNum} </p></td>
                    </tr>
                    <tr>
                      <td><span>USCIS Number:</span></td>
                      <td><p className='font-weight-500 mb-0'> {workAuths.uscisNum} </p></td>
                    </tr>
                    <tr>
                      <td><span>i-94 Expiry Date:</span></td>
                      <td><p className='font-weight-500 mb-0'> {i94ExpDt}</p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default WorkAuthorizationTabComponent;