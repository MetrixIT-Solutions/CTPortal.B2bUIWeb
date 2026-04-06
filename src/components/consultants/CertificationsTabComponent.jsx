/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import NoData from '../../assets/images/no-data.svg';

const CertificationsTabComponent = (props) => {
  const { certifications } = props;

  return (
    <div>
      {certifications && certifications.length
        ?
        <>
          {certifications.map((item, i) => {
            const cDt = item.cDtStr ? moment(item.cDtStr).format("DD MMM, YYYY") : "";
            return (
              <div className='table-responsive' key={i}>
                <table className='table user-view'>
                  <tbody>
                    <tr>
                      <td width={230}><span>Certification Name:</span> </td>
                      <td><p className='font-weight-500 mb-0'> {item.cName} </p></td>
                    </tr>
                    <tr>
                      <td><span>Specialization:</span></td>
                      <td><p className='font-weight-500 mb-0'> {item.cSpec}</p></td>
                    </tr>
                    <tr>
                      <td><span>Certificate Received Date:</span></td>
                      <td><p className='font-weight-500 mb-0'> {cDt}</p></td>
                    </tr>
                    <tr>
                      <td><span>Certified By:</span> </td>
                      <td><p className='font-weight-500 mb-0'> {item.cBy} </p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </>
        : <div className='text-center'>
          <img src={NoData}></img>
          <p className='text-danger'>No Data</p>
        </div>}
    </div>
  )
}


export default CertificationsTabComponent;