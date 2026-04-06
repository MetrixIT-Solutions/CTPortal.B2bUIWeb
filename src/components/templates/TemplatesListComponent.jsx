/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import classnames from 'classnames';
import Pagination from 'react-js-pagination';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import hashHistory from '../../hashHistory';
import NoData from '../../assets/images/no-data.svg';
import TooltipComponent from '../tootltip/TooltipComponent';
import Loader from '../loader/loader';

const TemplatesListComponent = (props) => {
  const { pgNum, limit, searchStr, tempList, tempsListCount, tempShow, loading, userInfo, rolesObj } = props.state;
  const { handleChangeLimit, handleKeyInput, handleChangeSearch, handleChangePage, tempRef, handleTempMenu } = props;
  const leftCount = tempsListCount == 0 ? '0' : ((pgNum - 1) * Number(limit)) + 1;
  const rightCount = pgNum * limit;
  const data = rightCount <= tempsListCount ? rightCount : tempsListCount;
  
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Templates</h3>
                <div className='d-inline-block align-items-center'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a><i className='fa-solid fa-house'></i></a></li>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/templates')}>Templates </a></li>
                    <li className='breadcrumb-item active' aria-current='page'>List</li>
                  </ol>
                </div>
              </div>
              {((rolesObj?.access?.length >= 17 && rolesObj?.access[16]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='btn btn-primary' onClick={() => hashHistory.push('/template/create')}><i className='fa fa-plus'></i> Add</a>}
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12'>
                <div className='box interview-box'>
                  <div className='box-body'>
                    <div className='dataTables_wrapper'>
                      <div className='row mb-2'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length'>
                            <label className='form-label'>Show <select className='form-select form-control-sm' value={limit} onChange={handleChangeLimit}>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='5'>5</option>
                              <option value='10'>10</option>
                              <option value='25'>25</option>
                              <option value='50'>50</option>
                              <option value='100'>100</option>
                            </select> entries </label>
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div id='example5_filter' className='dataTables_filter'>
                            <label className='form-label'>Search:
                              <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          {/* <div className='table-responsive'> */}
                          <table className='table table-bordered'>
                            <thead className='thead-light'>
                              <tr>
                                <th scope='col'>Category</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Sequence</th>
                                <th scope='col'>Temp Count</th>
                                {rolesObj?.appAcc && <th scope='col'>Organization</th>}
                                {(rolesObj?.appAcc || userInfo?.userType === 'Management') && <th scope='col'>Role</th>}
                                <th scope='col'>User</th>
                                <th scope='col'>Team</th>
                                <th scope='col'>Status</th>
                                <th scope='col' className='text-center'>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ?
                                <tr>
                                  <td colSpan={9}>
                                    <div className='no-data'>
                                      <Loader />
                                    </div>
                                  </td>
                                </tr>
                                : tempList && tempList.length > 0 ? tempList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      {/* <td className='d-flex'>{item.tempName} {item.tempNotes && <span><TooltipComponent position={"top"} isTemplate={true} notes={item.tempNotes} /></span>}</td> */}
                                      <td>{item.tempCat}</td>
                                      <td className='d-flex'>{item.tempName}</td>
                                      <td>{item.tempSeq} </td>
                                      <td className='d-flex'>{item.tempData.length} {item.tempData.length >0 && <span><TooltipComponent position={"top"} isTempData={true} tempData={item.tempData} /></span>}</td>
                                      {rolesObj?.appAcc && <td>{item.orgName}</td>}
                                      {(rolesObj?.appAcc || userInfo?.userType === 'Management') && <td>{item.userRoles?.length > 0 && item.userRoles.map(item1 => item1).join(', ')}</td>}
                                      <td scope='col'>{item?.uName || ''}</td>
                                      <td>{item.tName}</td>
                                      <td className={`${item.tStatus == 'Active' ? 'text-success fw-bold' : 'text-danger fw-bold'}`}>{item.tStatus}</td>
                                      <td className='text-center' data-bs-toggle="tooltip" title="Template Actions">
                                        {((rolesObj?.access?.length >= 17 && (rolesObj?.access[16]?.actions[5]?.isAlwd || rolesObj?.access[16]?.actions[6]?.isAlwd)) || rolesObj?.appAcc) &&
                                          <div className="dropdown" ref={(el) => tempRef[item._id] = el}>
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleTempMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': tempShow === item._id })}>
                                              {((rolesObj?.access?.length >= 17 && rolesObj?.access[16]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/template/view/${item._id}`)} data-bs-toggle="tooltip" title="Template View Details"><i className="fa-regular fa-eye"></i> View Details</a>}
                                              {((rolesObj?.access?.length >= 17 && rolesObj?.access[16]?.actions[6]?.isAlwd) || rolesObj?.appAcc || userInfo?.refUID === item.uRefID) && <a className='dropdown-item' onClick={() => hashHistory.push(`/template/edit/${item._id}`)} data-bs-toggle="tooltip" title="Edit Template Details"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                            </div>
                                          </div>}
                                      </td>
                                    </tr>
                                  )
                                }) :
                                  <tr>
                                    <td colSpan={12}>
                                      <div className='no-data'>
                                        <img src={NoData}></img>
                                        <p className='text-danger py-2'>No results found </p>
                                      </div>
                                    </td>
                                  </tr>
                              }
                            </tbody>
                          </table>
                          {/* </div> */}
                        </div>
                      </div>
                      {tempsListCount && tempsListCount > 0 ?
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {data} of {tempsListCount} entries</div>
                          </div>
                          <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={pgNum}
                                  itemsCountPerPage={Number(limit)}
                                  totalItemsCount={tempsListCount}
                                  pageRangeDisplayed={5}
                                  onChange={handleChangePage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content*/}
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default TemplatesListComponent;