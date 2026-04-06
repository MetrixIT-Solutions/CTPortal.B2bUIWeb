/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const EmergencyContactTabComponent = (props) => {
  const { profile } = props;

  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='table-responsive'>
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={200}><span>Contact Person:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.ecPer} </p></td>
              </tr>
              <tr>
                <td><span>Contact Number:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.ecNum}</p></td>
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
                <td width={200}><span>Relation:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.ecRelt} </p></td>
              </tr>
              <tr>
                <td><span>Contact Email:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.ecEml} </p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default EmergencyContactTabComponent;
