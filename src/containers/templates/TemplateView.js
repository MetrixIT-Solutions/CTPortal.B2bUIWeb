/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { useParams } from 'react-router-dom';

import TemplateSubView from './TemplateSubView';

const TemplateView = () => {
  const { id } = useParams();
  return <TemplateSubView id={id} />
}

export default TemplateView;