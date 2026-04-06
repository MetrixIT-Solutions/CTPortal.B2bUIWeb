/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import SubmisEdit from './SubmisEdit';

import { useParams } from 'react-router-dom';

const SubmisSubEdit = () => {
  const { id } = useParams();
  return <SubmisEdit id={id} />
}

export default SubmisSubEdit;