/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import NoData from '../../assets/images/no-data.svg';

const InsuranceTabComponent = (props) => {
  return (
    <div className='text-center'>
      <img src={NoData}></img>
      <p className='text-danger'>No Data Found</p>
    </div>
  )
}


export default InsuranceTabComponent;