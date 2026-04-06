/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const InvitationSelectOffcanvasComponent = (props) => {
  const {usrsList, attendeeObj, handleAttendees, isChecked, handleAttendeeCheck} = props;
  const animatedComponents = makeAnimated();

  return (
    <div>
      <div className='col-md-6'>
        <div className='form-group'>
          <label>Attendee(s)</label>
          <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={usrsList} value={[attendeeObj[0], ...attendeeObj]} onChange={handleAttendees} />
        </div>
      </div>
    </div>
  );
}

export default InvitationSelectOffcanvasComponent;
