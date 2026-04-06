/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import hashHistory from '../../hashHistory';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';

import { initCaps, firstCharCaps, capHifenLetter } from '../../hooks/common';

const OrgPanelsEditComponent = (props) => {
  const { oTeam, otCode, otNotes, errMsg, org, otStatus, disable, potId, potList, orgName, orgCode } = props.state;
  const { setStateData, orgPanelsUpdate, handleRouteHome } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Update Team</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome} ><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/organizations/teams')}>Teams</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Update Team</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content --> */}
          <section className='content'>
            <form>
              <div className='box'>
                <div className='box-body'>
                  <div className='row'>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Organization <span className='text-danger'>*</span> </label>
                        <select className='form-select' value={org} disabled={true}>
                          <option value={org}>{orgName + ' (' + orgCode.toUpperCase() + ')'}</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Parent Team</label>
                        <select className='form-select' value={potId} onChange={(e) => setStateData({ potId: e.target.value, errMsg: '' })}>
                          <option value=''>Select</option>
                          {potList ? potList.length > 0 && potList.map(item => <option key={item._id} value={item._id}>{item.potLevel ? item.oTeam + '(' + item.potLevel + ')' :  item.oTeam}</option>) : ' '}
                        </select>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Name <span className='text-danger'>*</span></label>
                        <input type='text' autoFocus={true} className='form-control' value={oTeam} maxLength={60}
                          onChange={(e) => setStateData({ oTeam: initCaps(e.target.value), errMsg: '' })}
                        />
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Code</label>
                        <span className='text-danger'>*</span>
                        <input type='text' className='form-control' value={otCode} maxLength={20}
                          onChange={(e) => setStateData({ otCode: capHifenLetter(e.target.value), errMsg: '' })}
                        />
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Status</label>
                        <select className='form-select' value={otStatus} onChange={(e) => setStateData({ otStatus: e.target.value, errMsg: '' })}>
                          <option value='Active'>Active</option>
                          <option value='Inactive'>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className='col-md-4'>
                      <div className='form-group'>
                        <label className='form-label'>Notes</label>
                        <textarea className='form-control' value={otNotes}
                          onChange={(e) => setStateData({ otNotes: firstCharCaps(e.target.value), errMsg: '' })}
                          maxLength={1000}></textarea>
                      </div>
                    </div>
                  </div>
                  {errMsg && <p className='d-flex justify-content-center text-danger'>{errMsg}</p>}
                  <div className='d-flex justify-content-center'>
                    <button type='button' className='btn btn-secondary m-2' disabled={disable} onClick={() => hashHistory.push('/organizations/teams')} >Back</button>
                    <button type='button' className='btn btn-success m-2' disabled={disable} onClick={orgPanelsUpdate}>Update</button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};

export default OrgPanelsEditComponent;
