/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const ExperienceTabComponent = (props) => {
  const { wrkExps } = props;
  const Exprss =
  (wrkExps.expYears == 0 && wrkExps.expMonths == 0) || (!wrkExps.expYears && !wrkExps.expMonths)
    ? 'No Experience'
    : wrkExps.expYears == 0
      ? `${wrkExps.expMonths} Months`
      : wrkExps.expMonths == 0
        ? `${wrkExps.expYears} Years`
        : `${wrkExps.expYears} Years ${wrkExps.expMonths} Months`;

  return (
    <div className='row'>
      <div className='col-md-12'>
        <div className='table-responsive'>
          {/* <div className='text-info'>
                <h6 className='text-info'>Total Experience</h6>
                <hr className='my-2' />
              </div> */}
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={230}><span>Job Title:</span></td>
                <td><p className='font-weight-500 mb-0'> {wrkExps.jobTitle}</p></td>
              </tr>
              <tr>
                <td><span>Experience:</span></td>
                <td><p className='font-weight-500 mb-0'> {Exprss} </p></td>
              </tr>
              <tr>
                <td><span>Primary Skills:</span></td>
                <td><p className='font-weight-500 mb-0'> {wrkExps.primSkills} </p></td>
              </tr>
              <tr>
                <td><span>Professional Summary:</span></td>
                <td><p className='font-weight-500 mb-0'> {wrkExps.prfsSrm} </p></td>
              </tr>
              <tr>
                <td><span>Do you need health Insurance through our company:</span></td>
                <td><p className='font-weight-500 mb-0'> {wrkExps.healthIns ? 'Yes' : 'No'} </p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ExperienceTabComponent;