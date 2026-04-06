/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import localforage from 'localforage';
import config from '../../config/config.json';

var CryptoJS = require('crypto-js');

localforage.config({
  name: config.swctpb2bdb
});

const setItem = async (key, value) => {
  try {
    const ciphertext = dataEncrypt({key, value});
    await localforage.setItem(key, ciphertext);
  } catch(err) {
    const cipherdata = dataEncrypt({key, value});
    localStorage.setItem(key, JSON.stringify({key, value: cipherdata}));
  }
}

const getItem = async (key) => {
  try {
    const value = await localforage.getItem(key);
    const decryptedData = value ? dataDecrypt(value) : {};
    return decryptedData;
  } catch(err) {
    const dataStr = localStorage.getItem(key);
    const data = dataStr ? JSON.parse(dataStr) : {};
    const decryptedObj = data.value ? dataDecrypt(data.value) : {};
    return decryptedObj;
  }
}

const removeItem = async (key) => {
  try {
    await localforage.removeItem(key);
  } catch(err) {
    localStorage.removeItem(key);
  }
}

const clearItems = async () => {
  try {
    await localforage.clear();
  } catch(err) {
    localStorage.clear();
  }
}

const dropInstance = async () => {
  try {
    await localforage.dropInstance();
  } catch(err) {
    localStorage.clear();
  }
}

export default {setItem, getItem, removeItem, clearItems, dropInstance};

function dataEncrypt(data) {
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), config.swctpb2b).toString();
  return ciphertext;
}
function dataDecrypt(ciphertext) {
  var bytes = CryptoJS.AES.decrypt(ciphertext, config.swctpb2b);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}
