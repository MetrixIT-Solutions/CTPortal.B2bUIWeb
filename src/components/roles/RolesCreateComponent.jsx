/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import hashHistory from '../../hashHistory';
import { numebersOnly } from '../../hooks/common';
import { HeaderComponent } from '../../components/header';
import { NavComponent } from '../../components/navbar';
import { FooterComponent } from '../../components/footer';

const RolesCreateComponent = (props) => {
  const { state, setStateData, rolesCreate } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Admin User Roles</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/admin-users/roles')}>Roles</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Create</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='box-body'>
                    <form>
                      <div className='row'>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Type<span className='text-danger'>*</span></label>
                            <select className='form-select' value={state.rType} onChange={(e) => setStateData({ rType: e.target.value, errMsg: '' })}>
                              <option value=''>Select</option>
                              <option value='Management'>Management</option>
                              <option value='Employee'>Employee</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Name<span className='text-danger'>*</span></label>
                            <input type='text' autoFocus={true} className='form-control' placeholder='Role Name' maxLength={50} value={state.roleName} onChange={(e) => setStateData({ roleName: e.target.value.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Code<span className='text-danger'>*</span></label>
                            <input type='text' className='form-control' placeholder='Role Code' maxLength={20} value={state.roleCode} onChange={(e) => setStateData({ roleCode: e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().trim(), errMsg: '' })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Sequence<span className='text-danger'>*</span></label>
                            <input type='text' className='form-control' placeholder='Role Sequence' maxLength={3} value={state.roleSeq} onChange={(e) => setStateData({ roleSeq: e.target.value, errMsg: '' })} onKeyPress={numebersOnly} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Status</label>
                            <select className='form-select' value={state.roleStatus} onChange={(e) => setStateData({ roleStatus: e.target.value, errMsg: '' })}>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <p className='text-danger text-center'>{state.errMsg}</p>
                      <button type='submit' disabled={state.disabled} className='btn btn-sm btn-primary me-2' onClick={rolesCreate}>Submit</button>
                      <button type='button' className='btn btn-sm btn-danger' onClick={() => hashHistory.push('/admin-users/roles')}>Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
              {/* /.box 	 */}
            </div>
          </section>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default RolesCreateComponent;



