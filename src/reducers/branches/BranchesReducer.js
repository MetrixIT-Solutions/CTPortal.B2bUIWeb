/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

const initialState = {
  branchesList: [],
  branchesListCount: 0,
};

const BranchesReducer = (state = initialState, action) => {
  const newState = { ...state };
  const data = action.data;
  switch (action.type) {
    case 'SET_B2B_BRANCHES_LIST':
      if (data.status === '200') {
        newState.branchesList = data.resData.result.orgBranchesList;
        newState.branchesListCount = data.resData.result.orgBranchesListCount;
      }
      break;
  }
  return newState;
}

export default BranchesReducer;