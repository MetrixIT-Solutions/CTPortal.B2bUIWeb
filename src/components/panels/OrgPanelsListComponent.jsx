/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 *
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import hashHistory from '../../hashHistory';
import Loader from '../loader/loader';
import OrgPanelsPopUpComponent from './OrgPanelsPopUpComponent';

const OrgPanelsListComponent = (props) => {
  const { rolesObj, orgTeamsList, orgTeamsListCount, pgNum, limit, searchStr, panelsData, deleteModal, viewModal, statusModal, errMsg, pnlsShow, loading } = props.state;
  const { handleChangeSearch, handleKeyInput, handlePagination, handleChangelimit, handleRouteHome, handleViewData, handlePanelsDelete, setStateData, handleStatusUpdate, handlePnlsMenu, pnlsRef, handleClickOutside } = props;
  const leftCount = orgTeamsListCount == 0 ? '0' : ((pgNum - 1) * Number(limit)) + 1;
  const rightCount = pgNum * Number(limit);
  const count = rightCount <= orgTeamsListCount ? rightCount : orgTeamsListCount;

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
                <h3 className='page-title'>Teams</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'>Teams </li>
                      <li className='breadcrumb-item active' aria-current='page'>Teams List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 4 && rolesObj?.access[3]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && 
              <a className='btn btn-primary' onClick={() => hashHistory.push('/organizations/teams/create')}><i className='fa fa-plus'></i> Add</a>}
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
                            <div className='dataTables_length'>
                              <label>Show <select className='form-select form-control-sm' value={limit} onChange={handleChangelimit}>
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
                              <label>Search: <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onChange={handleChangeSearch} onKeyPress={handleKeyInput} /></label>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <table className='table mt-0 table-hover no-wrap table-striped dataTable no-footer'>
                              <thead className='thead-light'>
                                <tr>
                                  <th scope='col'>Organization</th>
                                  <th scope='col'>Parent Team</th>
                                  <th scope='col'>Name</th>
                                  <th scope='col'>Code</th>
                                  <th scope='col'>Created At</th>
                                  <th scope='col'>Status</th>
                                  <th scope='col' className='text-center'>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loading ? 
                                  <tr>
                                    <td colSpan={7}>
                                      <div className='no-data'>
                                        <Loader/>
                                      </div>
                                    </td>
                                  </tr> 
                                : orgTeamsList && orgTeamsList.length ? orgTeamsList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{item.orgName + '(' + item.orgCode.toUpperCase() + ')'}</td>
                                      <td>{item.potLevel ? item.potName + '(' + item.potLevel + ')' :  item.potName}</td>
                                      <td>{item.oTeam}</td>
                                      <td>{item.otCode}</td>
                                      <td>{moment(item.cDtStr).format('DD MMM, YYYY HH:mm')}</td>
                                      <td>{item.otStatus === 'Active' ? <span className='badge badge-sm text-success'>{item.otStatus}</span> : <span className='badge badge-sm text-danger'>{item.otStatus}</span>}</td>
                                      <td className='text-center' data-bs-toggle="tooltip" title="Team Actions">
                                        {((rolesObj?.access?.length >= 3 && (rolesObj?.access[3]?.actions[1]?.isAlwd || rolesObj?.access[3]?.actions[3]?.isAlwd || rolesObj?.access[3]?.actions[4]?.isAlwd || rolesObj?.access[3]?.actions[5]?.isAlwd)) || rolesObj?.appAcc) &&
                                          <div className="dropdown" ref={(el) => pnlsRef[item._id] = el}>
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handlePnlsMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': pnlsShow === item._id })}>
                                              {((rolesObj?.access?.length >= 4 && rolesObj?.access[3]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleViewData(item)} data-bs-toggle="tooltip" title="View Team Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                              {((rolesObj?.access?.length >= 4 && rolesObj?.access[3]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/organizations/teams/edit/${item._id}`)} data-bs-toggle="tooltip" title="Edit Team"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                              {((rolesObj?.access?.length >= 4 && rolesObj?.access[3]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, panelsData: item, pnlsShow: '' })} data-bs-toggle="tooltip" title="Update Team Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                              {((rolesObj?.access?.length >= 4 && rolesObj?.access[3]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, panelsData: item })} data-bs-toggle="tooltip" title="Delete Team"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                                              {/* <a className='dropdown-item' onClick={() => handleIntrvwLfc(item)}><i className="fa-solid fa-rotate"></i>Lifecycle</a>
                                            <a className='dropdown-item' onClick={() => handleIntrvwFollowups(item)} data-bs-toggle="tooltip"><i className="fa-regular fa-hand-point-up"></i>Followups</a>   */}
                                            </div>
                                          </div>}
                                      </td> 
                                    </tr>
                                  )
                                }) : <tr>
                                  <td colSpan={7}>
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
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {count} of {orgTeamsListCount} entries</div>
                          </div>
                          {orgTeamsListCount > 0 ? <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={pgNum}
                                  itemsCountPerPage={Number(limit)}
                                  totalItemsCount={orgTeamsListCount}
                                  pageRangeDisplayed={5}
                                  onChange={handlePagination}
                                />
                              </div>
                            </div>
                          </div> : ''}
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
      {(deleteModal || viewModal || statusModal) && ( <OrgPanelsPopUpComponent panelsData={panelsData} setStateData={setStateData} viewModal={viewModal} deleteModal={deleteModal} handlePanelsDelete={handlePanelsDelete} statusModal={statusModal} handleStatusUpdate={handleStatusUpdate} errMsg={errMsg}/> )}
      <FooterComponent />
    </div>
  )
}

export default OrgPanelsListComponent;