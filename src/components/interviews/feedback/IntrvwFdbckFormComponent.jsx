/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { firstCharCaps, initCaps } from '../../../hooks/common';

const IntrvwFdbckFormComponent = (props) => {

  const { intrvwData, qus, intrwTyEmail, intrwdBy, intrwStatus, intrwNotes, ifNotes, testNotify, testScore, testStatus,  testNotes, errMsg, disable, fdbkData } = props.state;
  const { setStateData, handleFdbkSubmit } = props;

  return (
    <div>
      <form>
          <div className='row'>
            <div className='col-md-9'>
              <div className='form-group'>
                <p className='mb-0'><label className='form-label'>Questions Asked <span className='text-danger'>*</span></label></p>
                <textarea className='form-control' value={qus} rows='4' cols='78' placeholder='Interview Questions Asked' onChange={(e) => setStateData({ qus: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
              </div>
            </div>
            <div className='col-md-9'>
              <div className='form-group'>
                <label>Feedback <span className='text-danger'>*</span></label>
                <input type='text' className='form-control' placeholder='' value={ifNotes} onChange={(e) => setStateData({ifNotes: firstCharCaps(e.target.value), errMsg: ''})} />
              </div>
            </div>
          </div>
          {intrvwData.process === 'Video Interview' || intrvwData.process === 'Audio Interview'  || intrvwData.process === 'Face to Face' ?
            <div className='row'>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Sent Thank you Email to Interviewer? <span className='text-danger'>*</span></label>
                  <select className='form-select form-control' value={intrwTyEmail} onChange={(e) => setStateData({ intrwTyEmail: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Interviewer Names <span className='text-danger'>*</span></label>
                  <input type='text' className='form-control' placeholder='' value={intrwdBy} onChange={(e) => setStateData({intrwdBy: initCaps(e.target.value), errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Interview Status</label>
                  <select className='form-select form-control' value={intrwStatus} onChange={(e) => setStateData({ intrwStatus: e.target.value, errMsg: '' })}>
                    <option value=''>Select </option>
                    <option value='Selected'>Selected</option>
                    <option value='Rejected'>Rejected</option>
                    <option value='Moved to Next Round'>Moved to Next Round</option>
                    <option value='On Hold'>On Hold</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Interview Notes{intrwStatus === 'Rejected' || intrwStatus === 'Onhold' && '*'}</label>
                  <input type='text' className='form-control' placeholder='' value={intrwNotes} onChange={(e) => setStateData({intrwNotes: firstCharCaps(e.target.value), errMsg: ''})} />
                </div>
              </div>
            </div>
          :
            <div className='row'>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Informed Test being Completed? <span className='text-danger'>*</span></label>
                  <select className='form-select form-control' value={testNotify} onChange={(e) => setStateData({ testNotify: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    <option value='true'>Yes</option>
                    <option value='false'>No</option>
                  </select>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Test Score</label>
                  <input type='text' className='form-control' placeholder='' value={testScore} onChange={(e) => setStateData({testScore: e.target.value, errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Test Status</label>
                  <select className='form-select form-control' value={testStatus} onChange={(e) => setStateData({ testStatus: e.target.value, errMsg: '' })}>
                    <option value=''>Select </option>
                    <option value='Passed'>Passed</option>
                    <option value='Failed'>Failed</option>
                    <option value='Waiting for Result'>Waiting for Result</option>
                  </select>
                </div>
              </div>
              <div className='col-md-9'>
                <div className='form-group'>
                  <label>Test Notes{testStatus === 'Failed' && '*'}</label>
                  <input type='text' className='form-control' placeholder='' value={testNotes} onChange={(e) => setStateData({ testNotes: firstCharCaps(e.target.value), errMsg: ''})} />
                </div>
              </div>
            </div>
          }
          <div className='text-center text-danger'>{errMsg}</div>
          <button className='btn btn-primary' type='submit' disabled={disable} onClick={handleFdbkSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default IntrvwFdbckFormComponent;