/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { addLocale, useLocale } from 'ttag';
import * as cookie from './cookie';

const LOCALE_COOKIE = '__locale';

function getLocale() {
  return cookie.get(LOCALE_COOKIE) || 'en';
}

export function saveLocale(locale) {
  cookie.set(LOCALE_COOKIE, locale);
}

// setup
const locale = getLocale();

/* eslint-disable */
if (locale) {
  const translationsObj = require(`../../config/i18n/${locale}.json`);
  addLocale(locale, translationsObj);
  useLocale(locale);
} else {
  const translationsObj = require('../../config/i18n/en.json');
  addLocale('en', translationsObj);
  useLocale('en');
}
