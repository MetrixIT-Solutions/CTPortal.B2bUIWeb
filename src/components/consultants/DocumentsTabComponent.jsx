/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import NoData from '../../assets/images/no-data.svg';

const DocumentsTabComponent = () => {
  return (
    <div className='box'>
      <div className='box-header'>
        <h6>Documents</h6>
      </div>
      <div className='box-body'>
        <div className="no-data">
          <img src={NoData}></img>
          <p className="text-danger py-2">No Data Found </p>
        </div>
      </div>
    </div>
  )
}


export default DocumentsTabComponent
