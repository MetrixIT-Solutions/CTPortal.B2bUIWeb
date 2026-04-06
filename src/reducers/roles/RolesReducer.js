/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  rolesList: [],
  rolesListCount: 0
};
  
const RolesReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_ROLES_LIST_RES':
      if (data.status === '200') {     
        newState.rolesList = data.resData.result.rolesList;
        newState.rolesListCount = data.resData.result.rolesCount;
      } else {
        newState.rolesList = [];
        newState.rolesListCount = 0;
      }
      break;
  }

  return newState;
}

export default RolesReducer;