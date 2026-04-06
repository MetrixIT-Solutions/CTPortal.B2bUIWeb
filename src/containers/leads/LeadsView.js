/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {Component} from "react";
import {useParams} from "react-router-dom";
import ConsultantViewClass from "../consultants/ConsultantViewClass";

const LeadsView = () => {
  const {id} = useParams();
  return <ConsultantViewClass id={id} />;
};

export default LeadsView;