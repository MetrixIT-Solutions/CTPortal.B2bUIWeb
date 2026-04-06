/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { combineReducers } from 'redux';

import LoginReducer from './login/LoginReducer';
import OrgsReducer from './organizations/OrgsReducer';
import RolesReducer from './roles/RolesReducer';
import BranchesReducer from './branches/BranchesReducer';
import PanelsReducer from './panels/PanelsReducer';
import ConsultantsReducer from './consultants/ConsultantsReducer';
import NtfcReducer from './notifications/NtfcReducer';
import AISearchReducer from './aiSearch/AISearchReducer';

const appReducer = combineReducers({
  LoginReducer,
  OrgsReducer,
  RolesReducer,
  BranchesReducer,
  PanelsReducer,
  ConsultantsReducer,
  NtfcReducer,
  AISearchReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'B2B_USER_LOGGED_OUT') {
    state = {};
  }
  return appReducer(state, action);
};

export default rootReducer;
