/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import { initCaps, firstCharCaps, capHifenLetter } from '../../hooks/common';

const OrgPanelsCreateComponent = (props) => {
  const { appAcc, name, code, notes, errMsg, orgId, status, orgsList, disable, potId, potList } = props.state;
  const { setStateData, teamCreate, handleRouteHome, handleChangeOrg } = props;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Create Team</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome} ><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/organizations/teams')}>Teams</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Create Team</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content --> */}
          <section className='content'>
            <div className='row'>
              <div className="col-md-12 col-12">
                <div className="box">
                  <form>
                    <div className='box-body'>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Organization</label>{appAcc && <span className='text-danger'>*</span>}
                            {appAcc ? <select className='form-select' autoFocus={true} value={orgId} onChange={handleChangeOrg}>
                              <option value=''>Select</option>
                              {orgsList.length && orgsList.map(item => <option key={item._id} value={item._id}>{item.orgName + ' (' + item.orgCode.toUpperCase() + ')'}</option>)}
                            </select>
                            : <select className='form-select' disabled={true} value={orgId} onChange={handleChangeOrg}>
                              {orgsList.length && orgsList.map(item => <option key={item._id} value={item._id}>{item.orgName + ' (' + item.orgCode.toUpperCase() + ')'}</option>)}
                            </select>}
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Parent Team</label>
                            <select className='form-select' value={potId} onChange={(e) => setStateData({ potId: e.target.value, errMsg: '' })}>
                              <option value=''>Select</option>
                              {potList.length && potList.map(item => <option key={item._id} value={item._id}>{item.potLevel ? item.oTeam + '(' + item.potLevel + ')' : item.oTeam}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Name</label>
                            <span className='text-danger'>*</span>
                            <input type='text' className='form-control' value={name} autoFocus={!appAcc}
                              maxLength={60} onChange={(e) => setStateData({ name: initCaps(e.target.value), errMsg: '' })} placeholder='Enter Name' />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Code</label>
                            <span className='text-danger'>*</span>
                            <input type='text' className='form-control' value={code} maxLength={20}
                              onChange={(e) => setStateData({ code: capHifenLetter(e.target.value), errMsg: '' })} placeholder='Enter Code' 
                            />
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Status</label>
                            <select className='form-select' value={status} onChange={(e) => setStateData({ status: e.target.value, errMsg: '' })}>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='form-group'>
                            <label className='form-label'>Notes</label>
                            <textarea className='form-control' value={notes}
                              onChange={(e) => setStateData({ notes: firstCharCaps(e.target.value), errMsg: '' })}
                              placeholder='Enter Notes' maxLength={1000}></textarea>
                          </div>
                        </div>
                        {errMsg && <p className='d-flex justify-content-center text-danger'>{errMsg}</p>}
                        <div className='d-flex justify-content-center'>
                          <button type='button' className='btn btn-secondary m-2' disabled={disable} onClick={() => hashHistory.push('/organizations/teams')} >Back</button>
                          <button type='submit' className='btn btn-success m-2' disabled={disable} onClick={teamCreate}>Create</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default OrgPanelsCreateComponent;
