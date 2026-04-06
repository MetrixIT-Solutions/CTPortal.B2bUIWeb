/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  userObj: {},
};

const LoginReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_USER_LOGIN_RES':
      if (data.status === '200') {
        newState.userObj = data.resData.result;
      } else {
        newState.userObj = {};
      }
      break;
    case 'SET_B2B_USER_LOGIN_AUTH_OBJ':
      newState.userObj = data;
      break;
  }

  return newState;
}

export default LoginReducer;
