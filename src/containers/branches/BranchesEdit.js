/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import BranchesEditClass from './BranchesEditClass';
import { useParams } from 'react-router-dom';

const BranchesEdit = () => {
    const { id } = useParams();
    return <BranchesEditClass id={id} />
}

export default BranchesEdit;
