/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import Select from "react-select";;
import makeAnimated from 'react-select/animated';

import data from '../../../public/data/Lookups.json';
import CommonDropdownComponent from '../common/CommonDropdownComponent';
import { firstCharCaps, initCaps, numebersOnly} from '../../hooks/common';

const years = data.years;
const months = data.months;

const animatedComponents = makeAnimated();

const InvitationPopupsComponent = (props) => {

  const { deleteModal, inviteData, errMsg, disable, statusModal, rejectModal, reOpenModal, invtaView, closedModal, startDate, endDate, iStatus, mentor, notes, usrArr, succMsg, team, teamsList, email, visaStatus, mobNum, jobTitle, currentClient, previousClient, mobCc, linkedIn, expYrs, expMonths, rolesObj, cmnModal, cmnValue, cmnErrMsg, cmnType, cmnJbTitleArr, workStatus, userData, recruiter} = props.state;
  const { handleInviteDelete, setStateData, handleStatusApprove, handleStatusReject,  handleStatusReopen, handleStatusApply, handleChangeTeam, handleMentorChange, handleCreateSkill, handleRecruiterChange} = props;
  const sD = moment().format('YYYY-MM-DD');
  const sixMonthsAgo = moment().subtract(6, 'months').format('YYYY-MM-DD');
  const endDateAddSixM = startDate ? moment(startDate).add(6, 'months').format('YYYY-MM-DD') : '';
  const eD = startDate ? (startDate > sixMonthsAgo ? sD : endDateAddSixM) : sD;

  return (
    <div>
      {/* Delete Pop-up */}
      <Modal show={deleteModal} onHide={() => setStateData({ deleteModal: false, inviteData: {}, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Invitation Delete</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Invitation Info: </strong> {inviteData?.fName} | {inviteData?.emID} {inviteData?.mobCcNum ? ' | ' + inviteData?.mobCcNum : ''}</div>
          </div>
          <h6>Are you sure, you want to Delete?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ deleteModal: false, inviteData: {}, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleInviteDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Approve Pop-up */}
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, errMsg: '',  mentor: '', notes: '', team: teamsList.length == 1 ? teamsList[0]._id : '', usrArr: teamsList.length == 1 ? usrArr : [], email: '', mobCc: '+1', mobNum: '', jobTitle: null,
        visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 },  expMonths: { label: 0, value: 0 }, workStatus: ''})} className='modal-s mt-3'>
        <Modal.Header closeButton={() => setStateData({ statusModal: false, errMsg: '',  mentor: '', notes: '', team: teamsList.length == 1 ? teamsList[0]._id : '', usrArr: teamsList.length == 1 ? usrArr : [], email: '', mobCc: '+1', mobNum: '', jobTitle: null,
        visaStatus: '', currentClient: '',  previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 },  expMonths: { label: 0, value: 0 },  workStatus: ''})}>
          <p className='mb-0'>
            <strong>Invitation Approve</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Invitation Info: </strong> {invtaView?.fName} | {invtaView?.emID} {invtaView?.mobCcNum ? ' | ' + invtaView?.mobCcNum : ''}</div>
          </div>
          <h6>Are you sure, you want to Approve?</h6>

          <div className="form-group row">
            <label className="col-md-3 col-form-label">Work Status:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              {(invtaView?.iFrom !== 'Petition' && (userData.userType == 'Management' || userData?.userType == 'App' || userData?.userRole == 'HR Manager' || userData?.userRole == 'HR Executive')) ?
              <select className='form-select' id='participants6' value={workStatus} onChange={(e) => setStateData({ workStatus: e.target.value, errMsg: '', mentor: [] })}>
                <option value=''>Select</option>
                <option value='Approved'>On Boarding</option>
                <option value='In Marketing'>In Marketing</option>
                <option value='Placed'>Placed</option>
                <option value='BGV'>BGV</option>
                <option value='In Job'>In Job</option>
              </select>
              : <select className='form-select' disabled={true} value={workStatus}>
                <option value='Approved'>On Boarding</option>
              </select>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Team:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <select className='form-select' disabled={teamsList?.length === 1} value={team} onChange={(e) => handleChangeTeam(e.target.value)}>
                {teamsList?.length !== 1 && <option value=''>Select</option>}
                {teamsList?.length && teamsList.map((item, i) => <option key={i} value={item._id}>{item.tName}</option>)}
              </select>
            </div>
          </div>
          {(invtaView?.iFrom !== 'Petition' && workStatus == 'Approved') &&
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Mentor:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={usrArr} value={mentor && mentor.length ? [...mentor] : []} onChange={handleMentorChange} />
            </div>
          </div>}
          {(workStatus == 'In Marketing')  &&
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Recruiter:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={usrArr} value={recruiter && recruiter.length ? [...recruiter] : []} onChange={handleRecruiterChange} />
            </div>
          </div>}
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Notes:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <textarea type="text" className="form-control" value={notes} onChange={(e) => setStateData({ notes: firstCharCaps(e.target.value), errMsg: '' })} />
            </div>
          </div>
          {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && 
          <>
            <div><strong>Marketing Info: </strong></div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Email:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className="col-md-9">
                <input type="text" className="form-control" placeholder='Email' value={email} onChange={(e) => setStateData({ email: e.target.value.toLowerCase().trim(), errMsg: '' })} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Mob Number:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className="col-md-9">
                <div className='d-flex'>
                  <select className="form-select form-control" name='mobCc' value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                    <option value='+1'>+1</option>
                    <option value='+91'>+91</option>
                  </select>
                  <input type='text' className='form-control' placeholder='Mob Number' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Visa Status:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className="col-md-9">
                <select className='form-select' id='participants6' value={visaStatus} onChange={(e) => setStateData({ visaStatus: e.target.value, errMsg: '' })}>
                  <option value=''>Select Visa Status</option>
                  <option value='CPT'>CPT</option>
                  <option value='OPT'>OPT</option>
                  <option value='Stem OPT'>Stem OPT</option>
                  <option value='H1B'>H1B</option>
                  <option value='H4EAD'>H4 EAD</option>
                  <option value='H4'>H4</option>
                  <option value='GCEAD'>GC EAD</option>
                  <option value='GC'>GC</option>
                  <option value='L2'>L2</option>
                  <option value='Citizen'>Citizen</option>
                  <option value='Canadian'>Canadian</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Job Title:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className="col-md-9">
              <div className="d-flex">
                <Select
                  isClearable
                  placeholder="Select an option"
                  options={cmnJbTitleArr}
                  value={jobTitle || null}
                  onChange={(data) => setStateData({ jobTitle: data, errMsg: '' })}
                  className='w-100'
                />
                <button onClick={() => setStateData({ cmnModal: true, cmnType: 'Job Title' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
              </div>
            </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Experience:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Years</label>
                  <Select options={years} value={expYrs}
                    onChange={(data) => setStateData({ expYrs: data, errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Months</label>
                  <Select defaultValue={months[1]} options={months} value={expMonths}
                    onChange={(data) => setStateData({ expMonths: data, errMsg: ''})} />
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">LinkedIn URL:{workStatus == 'In Marketing' ? <span className='text-danger'>*</span> : ''}</label>
              <div className="col-md-9">
                <input type="url" className="form-control" value={linkedIn} placeholder='https://www.linkedin.com/...' onChange={(e) => setStateData({ linkedIn: e.target.value, errMsg: ''})} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Current Client:</label>
              <div className="col-md-9">
                <input type="text" className="form-control" value={currentClient} placeholder='Current Client' onChange={(e) => setStateData({ currentClient: firstCharCaps(e.target.value), errMsg: ''})} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-md-3 col-form-label">Previous Client:</label>
              <div className="col-md-9">
                <input type="text" className="form-control" value={previousClient} placeholder='Previous Client' onChange={(e) => setStateData({ previousClient: firstCharCaps(e.target.value), errMsg: ''})} />
              </div>
            </div>
          </>}
        </Modal.Body>
        <div className='text-center text-success'>{succMsg}</div>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ statusModal: false, errMsg: '', mentor: '', notes: '', usrArr: [], email: '', mobCc: '+1', mobNum: '', jobTitle: null, visaStatus: '', currentClient: '', 
            previousClient: '', linkedIn: '', expYrs: { label: 0, value: 0 }, expMonths: { label: 0, value: 0 }, workStatus: '', team: teamsList.length == 1 ? teamsList[0]._id : '', usrArr: teamsList.length == 1 ? usrArr : []})}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusApprove}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Reject Pop-up */}
      <Modal show={rejectModal} onHide={() => setStateData({ rejectModal: false, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Invitation Reject</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Invitation Info: </strong> {invtaView?.fName} | {invtaView?.emID} {invtaView?.mobCcNum ? ' | ' + invtaView?.mobCcNum : ''}</div>
          </div>
          <h6>Are you sure, you want to Reject?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ rejectModal: false, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusReject}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Status Reject Pop-up */}
      <Modal show={reOpenModal} onHide={() => setStateData({ reOpenModal: false, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Invitation Reopen</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>Invitation Info: </strong> {invtaView?.fName} | {invtaView?.emID} {invtaView?.mobCcNum ? ' | ' + invtaView?.mobCcNum : ''}</div>
          </div>
          <h6>Are you sure, you want to Reopen?</h6>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' disabled={disable} onClick={() => setStateData({ reOpenModal: false, errMsg: '' })}>
            No
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusReopen}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* closed Modal Pop-Up  */}
      <Modal show={closedModal} onHide={() => setStateData({ closedModal: false, errMsg: '' })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Invitation Filter</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Start Date:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <input type="date" className="form-control" value={startDate} onChange={(e) => setStateData({ startDate: e.target.value, errMsg: '' , endDate: ''})} max={sD} />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">End Date:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <input type="date" className="form-control" value={endDate} onChange={(e) => setStateData({ endDate: e.target.value, errMsg: '' })}  min={startDate} max={eD}/>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-3 col-form-label">Status:<span className='text-danger'>*</span></label>
            <div className="col-md-9">
              <select className="form-select form-control" value={iStatus} onChange={(e) => setStateData({ iStatus: e.target.value, errMsg: '' })} >
                <option value="All">All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' size='sm' onClick={() => setStateData({ closedModal: false, errMsg: '' })}>
            Close
          </Button>
          <Button variant='success' size='sm' disabled={disable} onClick={handleStatusApply}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
      <CommonDropdownComponent
        title={`${cmnType === 'Skill' ? 'Skill' : 'Job Title'}`}
        show={cmnModal}
        name={cmnValue}
        errMsg={cmnErrMsg}
        onChange={(e) => setStateData({ cmnValue: initCaps(e.target.value), cmnErrMsg: '' })}
        onHide={() => setStateData({ cmnModal: false, cmnValue: '', cmnErrMsg:'' })}
        onClick={() => handleCreateSkill(cmnType === 'Skill' ? 'Skill' : 'Job Title')}
      />
    </div>
  )
}

export default InvitationPopupsComponent;
