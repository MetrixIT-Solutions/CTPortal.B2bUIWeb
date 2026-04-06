/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import TemplateCheckList from './TemplateCheckList';

import { useParams } from 'react-router-dom';

const TemplateSubCheckList = () => {
  const { id, name } = useParams();
  return <TemplateCheckList id={id} name={name}/>
}

export default TemplateSubCheckList;