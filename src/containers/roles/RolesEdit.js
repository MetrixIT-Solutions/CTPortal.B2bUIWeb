/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import RolesEditClass from './RolesEditClass';
import { useParams } from 'react-router-dom';

const RolesEdit = () => {
  const { id } = useParams();
  return <RolesEditClass id={id} />
}

export default RolesEdit;
