/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

const LeadsApplyTempComponent = (props) => {
  const { showModal, lead, uaRoles, userRole, uaUsers, user, userData, tempList, template, errMsg } = props.state;
  const { handleClose, setStateData, getUsersByUaRole, getTemplatesData, getApplyTemplates } = props;
  return (
    <Modal show={showModal} onHide={handleClose} size='md' centered>
      <Modal.Header closeButton>
        <h5 className='mb-0'>Apply Template</h5>
      </Modal.Header>
      <Modal.Body>
        <div className='row'>
          {userData.userType != 'Employee' && <>
            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-lable'>User Role</label><span className='text-danger'>*</span>
                <Select
                  options={uaRoles}
                  value={userRole}
                  onChange={(data) => getUsersByUaRole(lead, data)}
                />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='form-group'>
                <label className='form-lable'>User</label><span className='text-danger'>*</span>
                <Select
                  options={uaUsers}
                  value={user}
                  onChange={(data) => getTemplatesData(lead, userRole, data)}
                />
              </div>
            </div>
          </>}
          <div className='col-md-6'>
            <div className='form-group'>
              <label className='form-lable'>Apply Template</label><span className='text-danger'>*</span>
              <select className='form-select' value={template} onChange={(e) => setStateData({ template: e.target.value, errMsg: '' })}>
                <option value=''>Select</option>
                {tempList && tempList.length > 0 && tempList.map((item, i) => <option key={i} value={item._id}>{item.tempName}</option>)}
              </select>
            </div>
          </div>
          <div className='text-center text-danger'>{errMsg}</div>
          <div>
            <div className='text-end'>
              <Button type='button' className='btn btn-danger me-2' onClick={handleClose}>Close</Button>
              <Button type='button' className='btn btn-success' onClick={getApplyTemplates}>Apply</Button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LeadsApplyTempComponent;
