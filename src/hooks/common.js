/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const numebersOnly = (event) => {
  if ((event.charCode >= 32 && event.charCode < 48) || (event.charCode > 57 && event.charCode < 127)) {
    event.preventDefault();
  }
}

export const mobileChars = (event) => { // allowed: 0 to 9 and ()-+
  if ((event.charCode >= 32 && event.charCode < 48 && event.charCode !== 40 &&
    event.charCode !== 41 && event.charCode !== 43 && event.charCode !== 45) ||
    (event.charCode > 57 && event.charCode < 127)) {
    event.preventDefault();
  }
}

export const getMinDob = () => { //min date as 18 years ago
  const today = new Date();
  const eighteenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
    return eighteenYearsAgo.toISOString().split('T')[0];
}

export const getTodayDate = () => { //past dates from today
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export const getYesterdayDate = () => { 
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

export const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); // Add one day
  return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const initCaps = (val) => {
  const value = val.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
  return value;
}

export const addTenYears = (date) => { //passport expiry date 10 years
  if (!isValidDate(date)) return null;
  const issuedDate = new Date(date);
  issuedDate.setFullYear(issuedDate.getFullYear() + 10);
  issuedDate.setDate(issuedDate.getDate() - 1); // Subtract one day
  return issuedDate.toISOString().split('T')[0];
}

export const selctedDatePlusOneday = (dt) => { //selected Date + 1 day
  if (!dt) return '';
  const date = new Date(dt);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

const isValidDate = (date) => {
  return !isNaN(Date.parse(date)); // Check if the date can be parsed
}

export const firstCharCaps = (val) => { //only first letter caps
  const value = val.charAt(0).toUpperCase() + val.slice(1);
  return value;
}

export const allCapsAlphaNum = (val) => { // caps letters with numbers
  const value = val.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  return value;
}

export const allCapsAlpha = (val) => { // caps letters only
  const value = val.replace(/[^A-Za-z]/g, '').toUpperCase();
  return value;
}

export const allSmallAlpha = (val) => { // small letters with numbers
  const value = val.toLowerCase();
  return value;
}

export const capHifenLetter = (val) => { // caps letters with numbers and -
  const value = val.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
  return value;
}

export const getPriority = (val) => {
  switch (val) {
    case '031':
      return 'Low';
    case '051':
      return 'Medium';
    case '071':
      return 'High';
    default:
      return val;
  }
}

export const setPriority = (val) => {
  switch (val) {
    case 'Low':
      return '031';
    case 'Medium':
      return '051';
    case 'High':
      return '071';
    default:
      return val;
  }
}

export const getPtnsPriority = (val) => {
  switch (val) {
    case '999':
      return 'NA';
    case '071':
      return 'Low';
    case '051':
      return 'Medium';
    case '031':
      return 'High';
    default:
      return val;
  }
}

export const setPtnsPriority = (val) => {
  switch (val) {
    case 'NA':
      return '999';
    case 'Low':
      return '071';
    case 'Medium':
      return '051';
    case 'High':
      return '031';
    default:
      return val;
  }
}
