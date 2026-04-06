/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import BranchesPopupsComponent from './BranchesPopupsComponent';
import hashHistory from '../../hashHistory';
import Loader from '../loader/loader';

const BranchesListComponent = (props) => {
  const { rolesObj, branchesList, branchesListCount, actPgNum, searchStr, pageLimit, viewModal, branchData, statusModal, deleteModal, brchShow, loading } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, setStateData, handleViewBranch, handleRouteHome, handleStatusUpdate, handleBranchDelete, handleBrchMenu, brchRef, handleClickOutside } = props;
  const leftCount = branchesListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= branchesListCount ? rightCount : branchesListCount;

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
      <div className="content-wrapper">
        <div className="container-full">
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="page-title">Branches</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-house"></i></a></li>
                      <li className="breadcrumb-item" aria-current="page">Branches</li>
                      <li className="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && 
              <a className='btn btn-primary' onClick={() => hashHistory.push('/organizations/branches/create')}><i className='fa fa-plus'></i> Add</a>}
            </div>
          </div>
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-body">
                    {/* <div className="table-responsive"> */}
                      <div className='dataTables_wrapper'>
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            <div className="dataTables_length">
                              <label>Show <select className="form-select form-control-sm" value={pageLimit} onChange={handleChangeLimit}>
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
                          <div className="col-sm-12 col-md-6">
                            <div id="example5_filter" className="dataTables_filter">
                              <label>Search:
                                <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example5" value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <table className="table mt-0 table-hover no-wrap table-striped dataTable no-footer">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">Organization</th>
                                  <th scope="col">Branch Name</th>
                                  <th scope="col">Branch Code</th>
                                  <th scope="col">Created At</th>
                                  <th scope="col">Status</th>
                                  <th scope="col" className='text-center'>Actions</th>
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
                                : branchesList && branchesList.length > 0 ? branchesList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{item.orgCode ? <span>{item.orgName} - <b>({item.orgCode.toUpperCase()})</b></span> : ''}</td>
                                      <td>{item.obName}</td>
                                      <td>{item.obCode}</td>
                                      <td>{moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm')}</td>
                                      <td>
                                        <span style={{ color: item.obStatus == 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>{item.obStatus}</span>
                                      </td>
                                      <td className='text-center' data-bs-toggle="tooltip" title="Branch Actions">
                                        {((rolesObj?.access?.length >= 3 && (rolesObj?.access[2]?.actions[1]?.isAlwd || rolesObj?.access[2]?.actions[3]?.isAlwd || rolesObj?.access[2]?.actions[4]?.isAlwd || rolesObj?.access[2]?.actions[5]?.isAlwd)) || rolesObj?.appAcc) &&
                                          <div className="dropdown" ref={(el) => brchRef[item._id] = el}>
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleBrchMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': brchShow === item._id })}>
                                              {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleViewBranch(item)} data-bs-toggle="tooltip" title="View Branch Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                              {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/organizations/branches/edit/${item._id}`)} data-bs-toggle="tooltip" title="Edit Branch"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                              {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, branchData: item, iStatus: item.iStatus, brchShow: '' })} data-bs-toggle="tooltip" title="Update Branch Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                              {((rolesObj?.access?.length >= 3 && rolesObj?.access[2]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, branchData: item })} data-bs-toggle="tooltip" title="Delete Branch"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                                            </div>
                                          </div>}
                                      </td>
                                    </tr>
                                  )
                                }) : <tr>
                                  <td colSpan={6}>
                                    <div className='no-data'>
                                      <img src={NoData}></img>
                                      <p className='text-danger py-2'>No results found </p>
                                    </div>
                                  </td>
                                </tr>}
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {branchesListCount} entries</div>
                          </div>
                          {branchesListCount && branchesListCount > 0 ? <div className="col-sm-12 col-md-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={branchesListCount}
                                  pageRangeDisplayed={5}
                                  onChange={handleChangePage}
                                />
                              </div>
                            </div>
                          </div> : ''}
                        </div>
                      </div>
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {(viewModal || statusModal || deleteModal) && (
        <BranchesPopupsComponent
          handleStatusUpdate={handleStatusUpdate}
          viewModal={viewModal}
          setStateData={setStateData}
          branchData={branchData}
          statusModal={statusModal}
          handleBranchDelete={handleBranchDelete}
          deleteModal={deleteModal}
          rolesObj={rolesObj}
        />)}

      <FooterComponent />
    </div>
  )
}

export default BranchesListComponent;