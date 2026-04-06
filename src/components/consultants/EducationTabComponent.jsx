/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

const EducationTabComponent = (props) => {
  const { education } = props;

  return (
    <div>
      {education && education.length
        ? education.map((item, i) => {
          return (
            <div className='table-responsive' key={i}>
              <table className='table user-view'>
                <tbody>
                  <tr>
                    <td width={230}><span>Degree:</span> </td>
                    <td><p className='font-weight-500 mb-0'> {item.degree} </p></td>
                  </tr>
                  <tr>
                    <td><span>Specialization:</span></td>
                    <td><p className='font-weight-500 mb-0'> {item.dSpcl} </p></td>
                  </tr>
                  <tr>
                    <td><span>Degree Passout:</span></td>
                    <td><p className='font-weight-500 mb-0'> {item.dYear}</p></td>
                  </tr>
                  <tr>
                    <td><span>Name of the institution:</span> </td>
                    <td><p className='font-weight-500 mb-0'> {item.noi} </p></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })
        : ''}
    </div>
  )
}


export default EducationTabComponent;
