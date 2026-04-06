/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {useEffect} from "react";
import {ColorRing} from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="text-center">
      <ColorRing visible={true} height="50px" width="50px" ariaLabel="color-ring-loading" wrapperClass={{}} colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />
    </div>
  );
};

export default Loader;
