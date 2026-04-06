/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import {ExpirationsWorkAuth, ExpirationSsn} from '../../containers/expiration';

const tabsArr = ['Work Auth', 'SSN'];
const eTypes = ['WrkAuth', 'SSN'];

const ExpirationListComponent = (props) => {
  const {actvTab} = props.state;
  const {handleUpdateExprtn, handleVryfyUpdateExprtn} = props;
  return (
    <div className='py-3'>
      {/* //WrkAuth// */}
     {(actvTab === tabsArr[0]) && <ExpirationsWorkAuth state={props.state} eType={eTypes[0]} handleUpdateExprtn={handleUpdateExprtn} handleVryfyUpdateExprtn={handleVryfyUpdateExprtn}/>}

      {/* //SSN Number// */}
      {(actvTab === tabsArr[1]) && <ExpirationSsn state={props.state} eType={eTypes[1]} handleUpdateExprtn={handleUpdateExprtn} handleVryfyUpdateExprtn={handleVryfyUpdateExprtn}/>}
    </div>
  );
};

export default ExpirationListComponent;
