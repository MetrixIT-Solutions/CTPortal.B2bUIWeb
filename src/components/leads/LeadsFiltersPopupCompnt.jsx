/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { Modal, Button } from 'react-bootstrap';

const LeadsFiltersPopupCompnt = (props) => {
  const {showFilters, userData, teams, users, data} = props.state;
  const {setStateData, setData, handleFiltersApply, handleClearFilters, handleOnChange} = props;

  return <Modal show={showFilters} onHide={() => setStateData({ showFilters: false })} size='md' centered>
    <Modal.Header closeButton>
      <h6 className='mb-0'>Filters</h6>
    </Modal.Header>
    <Modal.Body >
      <div className='row'>
        <div className='col-md-8'>
          <dl>
            <dt><label>Teams</label> </dt>
            <dd>
              <div className='form-group'>
                <select className="form-select form-control" name='teams' value={data.team} onChange={(e) => handleOnChange(e, 'team')}>
                  <option value=''>Select</option>
                  {teams.map((tm, i) => <option key={i} value={tm.value}>{tm.label}</option>)}
                </select>
              </div>
            </dd>
            {(userData?.userType !== 'Employee') && <>
            <dt><label>Onsite</label>  </dt>
            <dd>
              <div className='form-group'>
                <select className="form-select form-control" name='onsite' value={data.ons} onChange={(e) => handleOnChange(e, 'ons')}>
                  <option value=''>Select</option>
                  {users.onss.map((usr, i) => <option key={i} value={usr._id}>{usr.name}</option>)}
                </select>
              </div>
            </dd></>}
            {(userData?.userType !== 'Employee' || userData?.userRole === 'Onsite Manager' || userData?.userRole === 'Onsite Lead') && <>
            <dt><label>Offshore</label>  </dt>
            <dd>
              <div className='form-group'>
                <select className="form-select form-control" name='offshore' value={data.ofs} onChange={(e) => handleOnChange(e, 'ofs')}>
                  <option value=''>Select</option>
                  {users.ofss.map((usr, i) => <option key={i} value={usr._id}>{usr.name}</option>)}
                </select>
              </div>
            </dd></>}
            {(userData?.userType !== 'Employee' || userData?.userRole === 'Onsite Manager' || userData?.userRole === 'Onsite Lead' || userData?.userRole === 'Offshore Manager' || userData?.userRole === 'Offshore Lead') && <>
            <dt><label>Mentor</label></dt>
            <dd>
              <div className='form-group'>
                <select className="form-select form-control" name='mentors' value={data.mntr} onChange={(e) => handleOnChange(e, 'mntr')}>
                  <option value=''>Select</option>
                  {users.mntrs.map((usr, i) => <option key={i} value={usr._id}>{usr.name}</option>)}
                </select>
              </div>
            </dd>
            <dt><label>Recruiter</label> </dt>
            <dd>
              <div className='form-group'>
                <select className="form-select form-control" name='recruiters' value={data.rctr} onChange={(e) => handleOnChange(e, 'rctr')}>
                  <option value=''>Select</option>
                  {users.rctrs.map((usr, i) => <option key={i} value={usr._id}>{usr.name}</option>)}
                </select>
              </div>
            </dd></>}
          </dl>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <div className='text-end'>
        <Button type='button' className='btn btn-danger me-2' disabled={data.disabled} title='Clear All Filters' onClick={handleClearFilters}>Clear</Button>
        <Button type='button' className='btn btn-primary me-2' disabled={data.disabled} title='Close Filters' onClick={() => setStateData({ showFilters: false })}>Close</Button>
        <Button type='submit' className='btn btn-success' disabled={data.disabled} title='Apply Filters' onClick={handleFiltersApply}>Apply</Button>
      </div>
    </Modal.Footer>
  </Modal>
}

export default LeadsFiltersPopupCompnt;
