/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const ResidentialAddressTabComponent = (props) => {
  const {address } = props;

  return (
    <div className='row'>
      <div className='col-md-6'>
        <div className='table-responsive'>
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={150}><span>Country:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.country} </p> </td>
              </tr>
              <tr>
                <td><span>Address:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.hNum}</p></td>
              </tr>
              <tr>
                <td><span>City:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.city} </p> </td>
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
                <td width={150}><span>State:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.state} </p> </td>
              </tr>
              <tr>
                <td><span>Apt/Suite:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.area}</p></td>
              </tr>
              <tr>
                <td><span>ZIP Code:</span></td>
                <td><p className='font-weight-500 mb-0'> {address.zip} </p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ResidentialAddressTabComponent;
