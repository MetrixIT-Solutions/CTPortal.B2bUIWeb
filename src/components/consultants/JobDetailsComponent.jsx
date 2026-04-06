/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const JobDetailsComponent = (props) => {
  return (
    <div className="row">
      <div className='col-md-6'>
        <div className='table-responsive'>
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={200}><span>Employee ID:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p> </td>
              </tr>
              <tr>
                <td><span>Hire Date:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>End Client:</span> </td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Visa Type:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Job Description:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
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
                <td width={200}><span>Title:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Time Type: </span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Compensation:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Visa Expiry Date:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
              <tr>
                <td><span>Work Location:</span></td>
                <td><p className='font-weight-500 mb-0'> {'N/A'} </p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


export default JobDetailsComponent;