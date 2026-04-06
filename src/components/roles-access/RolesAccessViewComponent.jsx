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
import Loader from '../loader/loader';

import './css/roles.css';

const RolesAccessViewComponent = (props) => {
  const { rType, loading } = props.state;
  const data = rType?.access
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
                <h3 className='page-title'>Role Access View</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page' onClick={() => hashHistory.push('/admin-users/roles-access')}>Role Access</li>
                      <li className='breadcrumb-item active' aria-current='page'>View</li>
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
                  {loading ? 
                    <div colspan={6}><Loader/></div>
                  : 
                  <div className='box-body'>
                    <form>
                      <div className='row'>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Type</label>
                            <input type='text' className='form-control' value={rType.rType} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Role Name</label>
                            <input type='text' className='form-control' value={rType.rName} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Organization</label>
                            <input type='text' className='form-control' value={rType.orgName} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>User Name</label>
                            <input type='text' className='form-control' value={rType.uName} disabled />
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
                            <input type="checkbox" checked={aItem.isAlwd} id="ch_bx_12" className="filled-in" />
                            <label htmlFor={`ch_bx_${item._id}_${aItem._id}`} className="mb-0">{aItem.aName}</label>
                          </div>
                        ))}
                      </div>
                       ))}
                    </div>
                    </div>
                  </div>}
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

export default RolesAccessViewComponent;
