/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import hashHistory from '../../hashHistory';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { numebersOnly } from '../../hooks/common';

const RoleAccessEditComponent = (props) => {
  const { rType, rOrg, rName, uName, raSeq, selectedItems, errMsg, disable } = props.state;      
  const { setStateData, handleCheckBoxChange, roleAccessEdit } = props;  
  return (
    <div className='wrapper'>
    <HeaderComponent />
    <NavComponent />
    <div className='content-wrapper'>
      <div className='container-full'>
        {/* <Content Header (Page header) -- */}
        <div className='content-header'>
          <div className='d-flex align-items-center'>
            <div className='mr-auto'>
              <h3 className='page-title'>Role Access Update</h3>
              <div className='d-inline-block align-items-center'>
                <nav>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-house'></i></a></li>
                    <li className='breadcrumb-item' aria-current='page' onClick={() => hashHistory.push('/admin-users/roles-access')}>Role Access</li>
                    <li className='breadcrumb-item active' aria-current='page'>Update</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Main content */}
        <section className='content'>
          <div className='row'>
            <div className='col-md-12 col-12'>
              <div className='box'>
                <div className='box-body'>
                  <form>
                    <div className='row'>
                    <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Type</label>
                            <input type='text' className='form-control' placeholder='Role Type' value={rType} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Name</label>
                            <input type='text' className='form-control' placeholder='Role Name' value={rName} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Organization</label>
                            <input type='text' className='form-control' placeholder='Organization' value={rOrg} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>User Name</label>
                            <input type='text' className='form-control' placeholder='User Name' value={uName} disabled />
                          </div>
                        </div>
                      <div className='col-md-2'>
                        <div className='form-group'>
                          <label>Role Access Sequence</label>
                          <input type='text' className='form-control' placeholder='Role Access Sequence' value={raSeq} onKeyPress={numebersOnly} onChange={(e) => setStateData({ raSeq: Number(e.target.value), errMsg: '' })} />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className='row mt-2'>
                    <div className='col-md-12'>
                      <h5>Roles Access</h5>
                      {selectedItems && selectedItems.length > 0 && selectedItems.map((item, i) => (
                      <div className="d-flex flex-wrap" key={i + item._id}>
                        <div className='p-2 w-100 mt-2'>
                          <strong>{item.pName} </strong>
                          <hr className='my-2' />
                        </div>
                        {item.actions.map((aItem) => (
                          <div className='p-2 mb-2' key={item._id + aItem._id}>
                            <input
                              type="checkbox"
                              checked={selectedItems.some((selected) => selected._id === item._id && selected.actions.some((action) => action._id === aItem._id && action.isAlwd))}
                              id={`ch_bx_${item._id}_${aItem._id}`}
                              className="filled-in"
                              onChange={() => handleCheckBoxChange(item, aItem)}
                            />
                            <label htmlFor={`ch_bx_${item._id}_${aItem._id}`} className="mb-0">
                              {aItem.aName}
                            </label>
                          </div>
                        ))}
                      </div>
                       ))}
                    </div>
                  </div>
                </div>
                <div className='box-footer'>
                  <div className='text-danger text-center'>{errMsg}</div>
                  <div className='text-center'>
                    <button type='button' className='btn btn-sm btn-danger mt-3 me-3' onClick={() => hashHistory.push('/admin-users/roles-access')}>Back</button>
                    <button type='button' className='btn btn-sm btn-primary mt-3' disabled={disable} onClick={roleAccessEdit}>Update</button>
                  </div>
                </div>
              </div>
            </div>
            {/* /.box 	 */}
          </div>
        </section>
        {/* /.content  */}
      </div>
    </div>
  </div>
  )
}

export default RoleAccessEditComponent