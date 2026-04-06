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

import {HeaderComponent} from '../../components/header';
import {NavComponent} from '../../components/navbar';
import {FooterComponent} from '../../components/footer';
import RolesPopupsComponent from './RolesPopupsComponent';
import Loader from '../loader/loader';

const ClickBtn = () => {
  hashHistory.push('/admin-users/roles/create');
}

const RolesListComponent = (props) => {
  const { handleChangeSearch, handleKeyInput, handleChangerLimit, handlePagination, handleStatusUpdate, setStateData, handleViewClick, handleRolesDelete, handleRolsMenu, rolsRef, handleClickOutside } = props;
  const { searchStr, actPgNum, rLimit, rolesList, rolesListCount, statusModal, errMsg, disable, viewModal, roleData, deleteModal, rolsShow, loading } = props.state;
  const leftCount = rolesListCount == 0 ? '0' : (actPgNum - 1) * Number(rLimit) + 1;
  const rightCount = actPgNum * Number(rLimit);
  const data = rightCount <= rolesListCount ? rightCount : rolesListCount;

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
                <h3 className='page-title'>Admin User Roles</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'>
                        <a onClick={() => hashHistory.push('/home')}>
                          <i className='fa-solid fa-house'></i>
                        </a>
                      </li>
                      <li className='breadcrumb-item' aria-current='page'>
                        Roles
                      </li>
                      <li className='breadcrumb-item active' aria-current='page'>
                        List
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              <a className='btn btn-primary' onClick={ClickBtn}>+Add </a>
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
                        <div className='row mb-3'>
                          <div className='col-sm-12 col-md-6'>
                            <div className='dataTables_length'>
                              <label>
                                Show{' '}
                                <select className='form-select form-control-sm' value={rLimit} onChange={handleChangerLimit}>
                                  <option value='1'>1</option>
                                  <option value='2'>2</option>
                                  <option value='5'>5</option>
                                  <option value='10'>10</option>
                                  <option value='25'>25</option>
                                  <option value='50'>50</option>
                                  <option value='100'>100</option>
                                </select>{' '}
                                entries{' '}
                              </label>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6'>
                            <div id='example5_filter' className='dataTables_filter'>
                              <label> Search </label>
                              <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </div>
                          </div>
                        </div>
                          <div className='row'>
                            <div className='col-md-12'>
                              <table className='table mt-0 table-hover no-wrap table-striped dataTable no-footer'>
                                <thead className='thead-light'>
                                  <tr>
                                    <th scope='col'>Role Type</th>
                                    <th scope='col'>Name</th>
                                    <th scope='col'>Code</th>
                                    <th scope='col'>Sequence</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col' className='text-center'>Actions </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {loading ? 
                                    <tr>
                                      <td colSpan={6}>
                                        <div className='no-data'>
                                          <Loader/>
                                        </div>
                                      </td>
                                    </tr>
                                  : rolesList && rolesList.length > 0 ? rolesList.map((item, i) => {
                                    return (
                                      <tr key={i}>
                                        <td>{item.rType}</td>
                                        <td>{item.rName}</td>
                                        <td>{item.rCode}</td>
                                        <td>{item.rSeq}</td>
                                        <td>{item.rStatus === 'Active' ? <span className='badge badge-sm text-success'>{item.rStatus}</span> : <span className='badge badge-sm text-danger'>{item.rStatus}</span>}</td>
                                        <td className='text-center' data-bs-toggle="tooltip" title="Role Actions">
                                          <div className="dropdown" ref={(el) => rolsRef[item._id] = el}>
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleRolsMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{fontSize: 18}}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': rolsShow=== item._id })}>
                                              <a className='dropdown-item'  onClick={() => handleViewClick(item)} data-bs-toggle="tooltip" title="View Role Details"><i className="fa-regular fa-eye"></i>View Details</a>
                                              <a className='dropdown-item' onClick={() => hashHistory.push(`/admin-users/roles/edit/${item._id}`)} data-bs-toggle="tooltip" title="Edit Role"><i className="fa-regular fa-pen-to-square"></i> Edit</a>
                                              <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, roleData: item, iStatus: item.iStatus, rolsShow: '' })} data-bs-toggle="tooltip" title="Update Role Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>
                                              <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, roleData: item, rolsShow: '' })} data-bs-toggle="tooltip" title="Delete Role"><i className="fa-regular fa-trash-can"></i>Delete</a>
                                            </div>
                                          </div>
                                      </td> 
                                      </tr>
                                    );
                                  }) : (
                                    <tr>
                                      <td colSpan={6}>
                                        <div className='no-data'>
                                          <img src={NoData}></img>
                                          <p className='text-danger py-2'>No results found </p>
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-sm-12 col-md-5'>
                              <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>
                                Showing {leftCount} to {data} out of {rolesListCount} entries
                              </div>
                            </div>
                            {rolesListCount && rolesListCount > 0 ? ( <div className='col-sm-12 col-md-7'>
                              <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                                <Pagination className='mt-0' activePage={actPgNum} itemsCountPerPage={Number(rLimit)} totalItemsCount={rolesListCount} pageRangeDisplayed={5} onChange={handlePagination} />
                              </div>
                            </div>
                            ) : ('')}
                          </div>
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

      {(statusModal || viewModal || deleteModal) && (
        <RolesPopupsComponent
          handleStatusUpdate={handleStatusUpdate}
          setStateData={setStateData}
          statusModal={statusModal}
          errMsg={errMsg}
          disable={disable}
          viewModal={viewModal}
          roleData={roleData}
          deleteModal={deleteModal}
          handleRolesDelete={handleRolesDelete}
        />
      )}
      <FooterComponent />
    </div>
  );
}

export default RolesListComponent;
