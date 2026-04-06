/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment';

import { numebersOnly, firstCharCaps } from '../../../hooks/common';

const InviteMeetingsFormComponent = (props) => {

  const animatedComponents = makeAnimated();

  const { date, time, mTz, usrsList, attendeesObj, isChecked, msub, mType, mpCc, mpNum, mpExt, mLink, rolesObj, mobAdrs, mDesc, mTypes, errMsg, disable, branchId, brnchList, mLinkList, mLinkId, telmLink, telmLinkId } = props.state;
  const { setStateData, handleAttendees, handleProfileAttendee, handleBackToList, handleMeetingData, handleOnChange, handlemLinkChange } = props;

  return (
    <form>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Date <span className='text-danger'>*</span></label>
              <input type='date' className='form-control' autoFocus={true} min={moment().format('YYYY-MM-DD')} value={date} onChange={(e) => setStateData({ date: e.target.value, errMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Time <span className='text-danger'>*</span></label>
              <input type='time' min='00:00' max='23:59' className='form-control' placeholder='' value={time} onChange={(e) => setStateData({ time: e.target.value, errMsg: '' })} />
            </div>
          </div>
          <div className='col-md-4'>
            <div className='form-group'>
              <label>Time Zone <span className='text-danger'>*</span></label>
              <select className='form-select' value={mTz} onChange={(e) => setStateData({ mTz: e.target.value, errMsg: '' })}>
                {/* <option value=''>Select</option> */}
                <option value='EST'>EST</option>
                {/* <option value='CST'>CST</option>
                <option value='MST'>MST</option>
                <option value='PST'>PST</option>
                <option value='AKST'>AKST</option>
                <option value='IST'>IST</option> */}
              </select>
            </div>
          </div>
          <div className='col-md-8'>
            <div className='form-group'>
              <label>Attendee(s) <span className='text-danger'>*</span></label>
              <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={usrsList} value={[...attendeesObj]} onChange={handleAttendees} />
            </div>
          </div>
          {rolesObj?.access?.length && !rolesObj?.appAcc &&
          <div className='form-check mb-3'>
            <input type='checkbox' id='profile-attendee' className='form-check-input' checked={isChecked} onChange={handleProfileAttendee} />
            <label htmlFor='profile-attendee' className='form-check-label'>
              I am also attending
            </label>
          </div>}
          <div className='col-md-8'>
            <div className='form-group'>
              <label>Discussion About <span className='text-danger'>*</span></label>
              <input type='text' className='form-control' value={msub} maxLength={200} onChange={(e) => setStateData({ msub: firstCharCaps(e.target.value), errMsg: '' })} />
            </div>
          </div>
          <div className='col-md-8'>
            <div className='form-group'>
              <label className='me-3'>Meeting Type <span className='text-danger'>*</span></label>
              <input className='form-check-input' type='radio' id='telephone' value={mTypes[0]} checked={mType === mTypes[0]} onChange={(e) => setStateData({ mType: e.target.value, errMsg: '', mobAdrs: '', branchId: '', mLinkId: '', mLink: '' })} />
              <label className='form-check-label me-3' htmlFor='telephone'>{mTypes[0]}</label>
              <input className='form-check-input' type='radio' id='video-call' value={mTypes[1]} checked={mType === mTypes[1]} onChange={(e) => setStateData({ mType: e.target.value, errMsg: '', mobAdrs: '', mpCc: '+1', mpNum: '', mpExt: '', branchId: '', telmLink: '', telmLinkId: '' })} />
              <label className='form-check-label me-3' htmlFor='video-call'>{mTypes[1]}</label>
              <input className='form-check-input' type='radio' id='face-to-face' value={mTypes[2]} checked={mType === mTypes[2]} onChange={(e) => setStateData({ mType: e.target.value, errMsg: '', mpCc: '+1', mpNum: '', mpExt: '', mLink: '', mLinkId: '', telmLink: '', telmLinkId: '' })} />
              <label className='form-check-label me-3' htmlFor='face-to-face'>{mTypes[2]}</label>
            </div>
          </div>
          {mType === mTypes[0] && <div>
            <div className='form-group d-flex'>
              <select className='form-select form-control' style={{ width: '70px' }} value={mpCc} onChange={(e) => setStateData({ mpCc: e.target.value })}>
                <option value='+1'>+1</option>
                <option value='+91'>+91</option>
              </select>
              <div>
                <input type='text' className='form-control' placeholder='Phone Number Required' maxLength={10} value={mpNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mpNum: e.target.value, errMsg: '' })} />
              </div><div>
                <input type='text' className='form-control' placeholder='Extension' maxLength={6} value={mpExt} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mpExt: e.target.value })} />
              </div>
            </div>
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Meeting Links</label>
                <select className='form-select' autoFocus={true} value={telmLinkId} onChange={handlemLinkChange} >
                  <option value=''>Select</option>
                  {mLinkList && mLinkList.length && mLinkList.map(item => <option key={item._id} value={item._id}>{item.mTitle + ' ( ' + item.mProvider + ' )'}</option>)}
                </select>
              </div>
            </div>
            <div className='form-group col-md-12'>
              <input type='text' className='form-control' placeholder='Meeting Link' maxLength={300} value={telmLink} onChange={(e) => setStateData({ telmLink: e.target.value })} />
            </div>
          </div>}
          {mType === mTypes[1] && <div className='form-group col-md-12'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Meeting Links</label>
                <select className='form-select' autoFocus={true} value={mLinkId} onChange={handlemLinkChange} >
                  <option value=''>Select</option>
                  {mLinkList && mLinkList.length && mLinkList.map(item => <option key={item._id} value={item._id}>{item.mTitle + ' ( ' + item.mProvider + ' )'}</option>)}
                </select>
              </div>
            </div>
            <input type='text' className='form-control' placeholder='Meeting Link Required' maxLength={300} value={mLink} onChange={(e) => setStateData({ mLink: e.target.value, errMsg: '' })} />
          </div>}
          {mType === mTypes[2] && <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Branches</label>
                <select className='form-select' autoFocus={true} value={branchId} onChange={handleOnChange} >
                  <option value=''>Select</option>
                  {brnchList.length && brnchList.map(item => <option key={item._id} value={item._id}>{item.obName + ' (' + item.obCode + ')'}</option>)}
                </select>
              </div>
            </div>
            <div className='form-group col-md-12'>
              <textarea placeholder='Office Address Required' className='form-control' rows='2' maxLength={400} value={mobAdrs} onChange={(e) => setStateData({ mobAdrs: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
            </div>
          </div>}
          <div className='col-md-12'>
            <div className='form-group'>
              <textarea placeholder='Comments Required' className='form-control' rows='4' maxLength={1000} value={mDesc} onChange={(e) => setStateData({ mDesc: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
            </div>
          </div>
        </div>
        <div className='text-center text-danger'>{errMsg}</div>
      </div>
      <div className='d-flex justify-content-center'>
        <button type='button' variant='success' className='btn btn-danger me-2' onClick={handleBackToList}> Back </button>
        <button type='submit' variant='success' className='btn btn-primary' disabled={disable} onClick={handleMeetingData}> Submit </button>
      </div>
    </form>
  );
}

export default InviteMeetingsFormComponent;
