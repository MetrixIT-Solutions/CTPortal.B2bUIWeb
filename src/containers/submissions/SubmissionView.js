/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import SubmissionViewClass from './SubmissionViewClass';

const SubmissionView = () => {
    const { id } = useParams()
    return <SubmissionViewClass id={id} />;
}

export default SubmissionView;
