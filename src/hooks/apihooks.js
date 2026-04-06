/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';
import localForage from './localForage';
import hashHistory from '../hashHistory';

export const setHeadersToken = async (response) => {
  const responseJson = response?.data;
  if (response.headers.get('ctpb2batoken')) {
    const sdt = moment().format();
    const ctpb2batoken = response.headers.get('ctpb2batoken');
    if (ctpb2batoken !== 'NA') {
      await localForage.setItem('accesstoken', { ctpb2batoken, sdt });
      responseJson?.userObj?.rolesObj?._id && await localForage.setItem('userInfo', responseJson.userObj);
    } else {
      localForage.clearItems();
      hashHistory.push('/');
    }
  }
}