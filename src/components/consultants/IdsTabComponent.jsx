/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const IdsTabComponent = () => {
  return (
    <div className='box'>
      <div className='box-header'>
        <div className="d-flex justify-content-between">
          <div>
            <h6 className="box-title mb-md-0 mb-20">National IDs</h6>
          </div>
          <div>
            <i className="fa-regular fa-file-excel me-3" title='Excel'></i>
            <i className="fa-solid fa-arrow-up-wide-short" title='Filters'></i>
          </div>
        </div>
      </div>
      <div className='box-body'>
        <table className='table mt-0 table-hover no-wrap table-borderless dataTable no-footer'>
          <thead className='thead-light'>
            <tr>
              <th>ID Type</th>
              <th>Identification #</th>
              <th>Issued Date</th>
              <th>Expiration Date </th>
              <th>Issued By</th>
              <th>Verification Date</th>
              <th>Verified By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID Type</td>
              <td>Identification #</td>
              <td>Issued Date</td>
              <td>Expiration Date </td>
              <td>Issued By</td>
              <td>Verification Date</td>
              <td>Verified By</td>
              <td><i className='fas fa-eye' title='View Details'></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default IdsTabComponent;