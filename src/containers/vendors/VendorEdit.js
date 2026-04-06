/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import VendorEditClass from './VendorEditClass';
import { useParams } from 'react-router-dom';

const VendorEdit = () => {
    const { id } = useParams();
    return <VendorEditClass id={id} />
}

export default VendorEdit;
