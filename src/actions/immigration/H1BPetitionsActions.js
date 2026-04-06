/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

export const postB2BH1BPtnsList = (body, callback) => ({type: 'POST_B2B_H1BPTNS_LIST', body, callback});
export const postB2BH1BPtnsCreate = (body, callback) => ({type: 'POST_B2B_H1BPTNS_CREATE', body, callback});
export const putB2BH1BPtnsStatusupdate = (recordId, body, callback) => ({type: 'PUT_B2B_H1BPTNS_STATUS_UPDATE', recordId, body, callback});
export const putB2BH1BPtnsCaseIdUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_H1BPTNS_CASEID_UPDATE', recordId, body, callback});
export const getB2BH1BPtnsLyfCylHstry = (recordId, callback) => ({type: 'GET_B2B_H1BPTNS_LYFCYL_HSTRY', recordId, callback});
export const putB2BH1BPtnsPrtyUpdt = (recordId, body, callback) => ({type: 'PUT_B2B_H1BPTNS_PRTY_UPDT', recordId, body, callback});

export const postB2BH1BPtnsfllwUpNtsCreate = (body, callback) => ({type: 'POST_B2B_H1BPTNS_FLLWUP_NTS_CREATE', body, callback});
export const getB2BH1BPtnsfllwUpNtsList = (recordId, callback) => ({type: 'GET_B2B_H1BPTNS_FLLWUP_NTS_LIST', recordId, callback});
export const putB2BH1BPtnsfllwUpNtsUpdate = (recordId, body, callback) => ({type: 'PUT_B2B_H1BPTNS_FLLWUP_NTS_UPDATE', recordId, body, callback});
export const putH1bPetitionDelete = (recordId, body, callback) => ({type: 'PUT_B2B_H1BPTNS_DELETE', recordId, body, callback});
