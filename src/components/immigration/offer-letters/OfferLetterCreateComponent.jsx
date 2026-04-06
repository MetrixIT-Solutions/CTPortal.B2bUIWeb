/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';

import { initCaps, numebersOnly } from '../../../hooks/common';

const OfferLetterCreateComponent = (props) => {
  const {benType, fName, lName, emID, mobCC, mobNum, referredBy, otherRefer, refUser, usrsList, cnsltantsList, isdisable, cnsltUsr, errMsg, rprtId, orgsList, userInfo, orgId, teams, teamId, template, tempList} = props.state;
  const { setStateData, handleClose, createModal, offerLetterCreate, handleChangeReporter, handleChangeOrg, handleChangeTeams, handleInputChange } = props;
  return (
    <div>
      {/* create modal */}
      <Modal show={createModal} onHide={handleClose} size='lg' aria-labelledby='example-modal-sizes-title-lg' >
        <Modal.Header closeButton>
          <Modal.Title>Offer Letter Create</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row' >
            {(userInfo?.userType === 'App') && <div className='col-md-12'>
              <div className='form-group'>
                <label>Organization</label><span className='text-danger'>*</span>
                <select disabled={isdisable} className='form-select form-control' value={orgId} onChange={handleChangeOrg}>
                  <option value=''>Select</option>
                  {orgsList?.length > 0 && orgsList.map((item, i) => <option key={i} value={item._id}>{item.orgName}</option>)}
                </select>
              </div>
            </div>}
            {(userInfo?.userType !== 'Employee') && <div className='col-md-12'>
              <div className='form-group'>
                <label>Reviewer</label><span className='text-danger'>*</span>
                <select disabled={isdisable} className='form-select form-control' value={rprtId} onChange={handleChangeReporter}>
                  <option value=''>Select</option>
                  {usrsList?.length > 0 && usrsList.map((item, i) => <option key={i} value={item._id}>{item.name}</option>)}
                </select>
              </div>
            </div>}
            <div className='col-md-12'>
              <div className='form-group'>
                <label>Teams</label><span className='text-danger'>*</span>
                <select disabled={isdisable} className='form-select form-control' value={teamId} onChange={handleChangeTeams}>
                  {teams?.length !== 1 && <option value=''>Select</option>}
                  {teams?.length > 0 && teams.map((item, i) => <option key={i} value={item._id}>{item.tName}</option>)}
                </select>
              </div>
            </div>
            <div className='col-md-12'>
              <div className='form-group'>
                <label className='form-lable'>Apply Template</label><span className='text-danger'>*</span>
                <select className='form-select' value={template} onChange={(e) => setStateData({ template: e.target.value, errMsg: '' })}>
                  <option value=''>Select</option>
                  {tempList && tempList.length > 0 && tempList.map((item, i) => <option key={i} value={item._id}>{item.tempName}</option>)}
                </select>
              </div>
            </div>
            <div className='col-md-12'>
              <div className='form-group mt-4 d-flex'>
                <div className='demo-radio-button'>
                  <input name='benType' type='radio' id='radio_benType1' value='newBenfcry' className='with-gap radio-col-primary' checked={benType === 'newBenfcry'} onChange={(e) => setStateData({ benType: e.target.value, errMsg: '', cnsltUsr: '' })} />
                  <label htmlFor='radio_benType1'>New Beneficiary</label>
                  <input name='benType' type='radio' id='radio_benType2' value='exsBenfcry' className='with-gap radio-col-success' checked={benType === 'exsBenfcry'} onChange={(e) => setStateData({ benType: e.target.value, errMsg: '', fName: '', lName: '', emID: '', mobNum: '', refUser: '', otherRefer: '' })} />
                  <label htmlFor='radio_benType2'>Existing Beneficiary</label>
                </div>
              </div>
            </div>
          </div>
          {benType === 'newBenfcry' &&
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>First Name</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='First Name' disabled={isdisable} value={fName} onChange={(e) => setStateData({ fName: initCaps(e.target.value), errMsg: '' })} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Last Name</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Last Name' disabled={isdisable} value={lName} onChange={(e) => setStateData({ lName: initCaps(e.target.value), errMsg: '' })} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Email</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Email' disabled={isdisable} value={emID} onChange={(e) => setStateData({ emID: e.target.value.toLowerCase().trim(), errMsg: '' })} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Mobile Number</label><span className='text-danger'>*</span>
                <div className='d-flex'>
                  <select className='form-select form-control' style={{ width: '70px' }} disabled={isdisable} value={mobCC} onChange={(e) => setStateData({ mobCC: e.target.value })}>
                    <option value='+1'>+1</option>
                    <option value='+91'>+91</option>
                  </select>
                  <input type='text' className='form-control' placeholder='Mobile Number' disabled={isdisable} maxLength={10} value={mobNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} />
                </div>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label>Referred By</label><span className='text-danger'>*</span>
                <div className='demo-radio-button'>
                  <input name='group5' type='radio' id='radio_1' disabled={isdisable} value='Internal' className='with-gap radio-col-primary' checked={referredBy === 'Internal'} onChange={(e) => setStateData({ referredBy: e.target.value, errMsg: '' })} />
                  <label htmlFor='radio_1'>Internal</label>
                  <input name='group5' type='radio' id='radio_2' disabled={isdisable} value='Other' className='with-gap radio-col-success' checked={referredBy === 'Other'} onChange={(e) => setStateData({ referredBy: initCaps(e.target.value), errMsg: '' })} />
                  <label htmlFor='radio_2'>Other</label>
                </div>
              </div>
            </div>
            <div className='row'>
              {referredBy == 'Other' && <div className='col-md-6'>
                <div className='form-group'>
                  <input type='text' className='form-control ' placeholder='Other' disabled={isdisable} value={otherRefer} onChange={(e) => setStateData({ otherRefer: initCaps(e.target.value), errMsg: '' })} />
                </div>
              </div>}
              {referredBy == 'Internal' && <div className='col-md-6'>
                <div className='form-group'>
                  <select className='form-select form-control' value={refUser} disabled={isdisable} onChange={(e) => setStateData({ refUser: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    {usrsList?.length > 0 && usrsList.map((item, i) => <option key={i} value={item._id}>{item.name + '(' + item.refUID.split(':')[1] + ')'}</option>)}
                  </select>
                </div>
              </div>}
            </div>
          </div>}

          {benType === 'exsBenfcry' &&
          <div className='row'>
            <div className='col-md-6'>
              <div className='form-group'>
                <Select isClearable value={cnsltUsr} options={cnsltantsList} onChange={(data) => setStateData({ cnsltUsr: data, errMsg: '' })} onInputChange={handleInputChange} className='w-100' />
              </div>
            </div>
          </div>}
          <div className='text-danger text-center'>{errMsg}</div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-secondary text-center mx-3' onClick={handleClose}>Close</button>
            <button className='btn btn-primary text-center' disabled={isdisable} onClick={(e) => offerLetterCreate(e)}>Create</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default OfferLetterCreateComponent