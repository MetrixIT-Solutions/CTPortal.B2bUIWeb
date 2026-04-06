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
import data from '../../../public/data/RolesAccess.json';
import { numebersOnly } from '../../hooks/common';

const RoleAccessCreateComponent = (props) => {
  const { rType, rOrg, rName, uName, raSeq, rolesList, usrsList, selectedItems, errMsg, disable, orgsList } = props.state;
  const { setStateData, handleOnChange, handleCheckBoxChange, roleAccessCreate } = props;  
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
                <h3 className='page-title'>Role Access Create</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page' onClick={() => hashHistory.push('/admin-users/roles-access')}>Role Access</li>
                      <li className='breadcrumb-item active' aria-current='page'>Create</li>
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
                            <label>Role Type</label><span className='text-danger'>*</span>
                            <select className='form-select' value={rType} onChange={(e) => handleOnChange(e, 'rType')}>
                              <option value=''>Select</option>
                              <option value='Management'>Management</option>
                              <option value='Employee'>Employee</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Name</label><span className='text-danger'>*</span>
                            <select className='form-select' value={rName} onChange={(e) => handleOnChange(e, 'rName')}>
                              <option value=''>Select</option>
                              {rolesList && rolesList.length > 0 && rolesList.map((item, i) => <option key={i} value={item._id}>{item.rName}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Organization</label>
                            <select className='form-select' value={rOrg} onChange={(e) => handleOnChange(e, 'rOrg')}>
                              <option value=''>Select</option>
                              {orgsList && orgsList.length > 0 && orgsList.map((item, i) => <option key={i} value={item._id}>{item.orgName}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>User Name</label>
                            <select className='form-select' value={uName} onChange={(e) => setStateData({ uName: e.target.value, errMsg: '' })}>
                              <option value=''>Select</option>
                              {usrsList && usrsList.length > 0 && usrsList.map((item, i) => <option key={i} value={item._id}>{item.name}</option>)}
                            </select>
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
                    <div className='row my-3'>
                      <div className='col-md-12'>
                      <h5>Roles Access</h5>
                      {data && data.length > 0 && data.map((item, i) => (
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
                        <div className='text-danger text-center'>{errMsg}</div>
                        <div className='text-center'>
                          <button type='button' className='btn btn-sm btn-danger mt-3 me-3' onClick={() => hashHistory.push('/admin-users/roles-access')}>Back</button>
                          <button type='button' className='btn btn-sm btn-primary mt-3' disabled={disable} onClick={roleAccessCreate}>Submit</button>
                        </div>
                      </div>
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

export default RoleAccessCreateComponent