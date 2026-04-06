/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import hashHistory from '../../hashHistory';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import Loader from "../loader/loader";

const RolesAccessListComponent = (props) => {
  const { rLimit, searchStr, actPgNum, rolesAcsList, rolesAcsCount, rlAcssShow, loading } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleRouteHome, handleRlAcssMenu, rlAcssRef, handleClickOutside } = props;
  const leftCount = rolesAcsCount == 0 ? '0' : ((actPgNum - 1) * Number(rLimit)) + 1;
  const rightCount = actPgNum * rLimit;
  const data = rightCount <= rolesAcsCount ? rightCount : rolesAcsCount;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
                <h3 className='page-title'>Roles Access</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-house"></i></a></li>
                      <li className='breadcrumb-item' aria-current='page' onClick={() => hashHistory.push('/admin-users/roles-access')}>Roles Access</li>
                      <li className='breadcrumb-item active' aria-current='page'>List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              <a className='btn btn-primary' onClick={() => hashHistory.push('/admin-users/roles-access/create')}>+Add </a>
            </div>
          </div>
          {/* Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-12'>
                <div className='box'>
                  <div className='box-body'>
                    {/* <div className='table-responsive'> */}
                      <div className='dataTables_wrapper'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-6'>
                            <div className="dataTables_length">
                              <label>Show <select name="example5_length" className="form-select form-control-sm" value={rLimit} onChange={handleChangeLimit}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select> entries </label>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6'>
                            <div id='example5_filter' className='dataTables_filter'>
                              <label> Search </label>
                              <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </div>
                          </div>
                        </div>
                        <div className='row mb-2'>
                          <div className='col-md-12'>
                            <table className='table mt-0 table-hover no-wrap table-striped dataTable no-footer'>
                              <thead className='thead-light'>
                                <tr>
                                  <th scope='col'>Role Type</th>
                                  <th scope='col'>Role Name</th>
                                  <th scope='col'>Role Sequence</th>
                                  <th scope='col'>Organization</th>
                                  <th scope='col'>User Name</th>
                                  {/* <th scope='col'>Branches</th>
                                  <th scope='col'>Teams</th> */}
                                  <th scope='col' className='text-center'>Actions </th>
                                </tr>
                              </thead>
                              {loading ? 
                                <tr>
                                  <td colSpan={8}>
                                    <div className='no-data'>
                                      <Loader/>
                                    </div>
                                  </td>
                                </tr>
                              : rolesAcsList && rolesAcsList.length > 0 ? <tbody>
                                {rolesAcsList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{item.rType}</td>
                                      <td>{item.rName}</td>
                                      <td>{item.raSeq}</td>
                                      <td>{item?.orgName ? item.orgName : ''}</td>
                                      <td>{item.uName}</td>
                                      {/* <td>{item.obNames[0]}</td>
                                      <td>{item.tNames[0]}</td> */}
                                      <td className='text-center' data-bs-toggle="tooltip" title="Roles Access Actions">
                                        <div className='dropdown' ref={(el) => rlAcssRef[item._id] = el}>
                                          <a className='btn btn-xs btn-primary btn-circle' onClick={() => handleRlAcssMenu(item._id)} data-toggle='dropdown'><i className='fas fa-ellipsis' style={{ fontSize: 15 }}></i></a>
                                          <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': rlAcssShow === item._id })}>
                                            <a className='dropdown-item me-2' onClick={() => hashHistory.push(`/admin-users/roles-access/view/${item._id}`)} data-bs-toggle="tooltip" title="View Roles Access Details"><i className='fa-regular fa-eye'></i>View Details</a>
                                            <a className='dropdown-item' onClick={() => hashHistory.push(`/admin-users/roles-access/update/${item._id}`)} data-bs-toggle="tooltip" title="Edit Roles Access Details"><i className="fa-regular fa-pen-to-square"></i> Edit</a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody> :
                                <tr>
                                  <td colSpan={8}>
                                    <div className='no-data'>
                                      <img src={NoData}></img>
                                      <p className='text-danger py-2'>No results found </p>
                                    </div>
                                  </td>
                                </tr>}
                            </table>
                          </div>
                        </div>
                        {rolesAcsCount && rolesAcsCount > 0 ?
                          <div className="row">
                            <div className="col-sm-12 col-md-5">
                              <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {rolesAcsCount} entries</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                                <div className='paginate_button page-item active'>
                                  <Pagination
                                    className='mt-0'
                                    activePage={actPgNum}
                                    itemsCountPerPage={Number(rLimit)}
                                    totalItemsCount={rolesAcsCount}
                                    pageRangeDisplayed={5}
                                    onChange={handleChangePage}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          : ''}
                      </div>
                    {/* </div> */}
                  </div>
                  {/* /.box-body */}
                </div>
              </div>
            </div>
          </section>
          {/* /.content  */}
        </div>
      </div>
    </div>
  )
}

export default RolesAccessListComponent;