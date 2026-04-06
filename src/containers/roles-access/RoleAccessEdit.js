/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { useParams } from 'react-router-dom';
import RoleAccessSubEdit from './RoleAccessSubEdit';

const RoleAccessEdit = () => {
  const {id} = useParams();
  return <RoleAccessSubEdit id={id}/>
}

export default RoleAccessEdit