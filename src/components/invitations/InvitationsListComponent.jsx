/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
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

const InvitationsListComponent = (props) => {

  const handleInviteCons = () => props.handleInviteCons(true, false);
  const { rolesObj, invitationsList, invitationsListCount, actPgNum, searchStr, pageLimit, invtnsShow, invtsListCountObj, status, invCuntShow, startDate, endDate, loading } = props.state;
  const { setStateData, handleRouteHome, handleRouteCons, handleInvNotes, handleInvMeetings, handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleReview, handleInvtnsMenu, invtnsRef, handleClickOutside, statusClick, handleClearInvFltr } = props;
  const leftCount = invitationsListCount == 0 ? '0' : ((actPgNum - 1) * pageLimit) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= invitationsListCount ? rightCount : invitationsListCount;
  const { opnCount, sbmtdCount, apprvdCount, rjctdCount, reopenCount } = invtsListCountObj;
  const tCount = opnCount + sbmtdCount + apprvdCount + rjctdCount + reopenCount;
  const sDate = startDate ? moment(startDate, 'YYYY-MM-DD').format('DD MMM, YYYY') : '';
  const eDate = endDate ? moment(endDate, 'YYYY-MM-DD').format('DD MMM, YYYY ') : '';

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
                <h3 className='page-title'>Invitations</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={handleRouteCons}>Consultants</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Invitations</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && 
              <a className='btn btn-primary me-2' onClick={handleInviteCons}><i className='fa fa-plus'></i> Invite</a>}
            </div>
          </div>
          {/* Main content */}
          <section className='content'>
            {invCuntShow ? 
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Open')} className={`${status.includes('Open') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{invtsListCountObj.opnCount}</h5>
                            <p className={`${status.includes('Open') ? 'mb-0' : 'mb-0'}`}>Open</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Reopen')} className={`${status.includes('Reopen') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{invtsListCountObj.reopenCount}</h5>
                            <p className={`${status.includes('Reopen') ? 'mb-0' : 'mb-0'}`}>Reopen</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Submitted')} className={`${status.includes('Submitted') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{invtsListCountObj.sbmtdCount}</h5>
                            <p className={`${status.includes('Submitted') ? 'mb-0' : 'mb-0'}`}>Submitted</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Approved')} className={`${status.includes('Approved') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{invtsListCountObj.apprvdCount}</h5>
                            <p className={`${status.includes('Approved') ? 'mb-0' : 'mb-0'}`}>Approved</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Rejected')} className={`${status.includes('Rejected') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{invtsListCountObj.rjctdCount}</h5>
                            <p className={`${status.includes('Rejected') ? 'mb-0' : 'mb-0'}`}>Rejected</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a className='nav-link'>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{tCount}</h5>
                            <p className='mb-0'>All</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>  
            :   
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1 p-2'>
                      Start Date: {sDate}
                      </li>
                      <li className='nav-item b-1 p-2'>
                        End Date: {eDate}
                      </li>
                      <li className='nav-item b-1 p-2'>
                      <a className="btn btn-sm btn-info mr-2" onClick={handleClearInvFltr}>Clear</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>}

            <div className='row'>
              <div className='col-12'>
                <div className='box'>
                  <div className='box-body'>
                    {/* <div className='table-responsive'> */}
                      <div className='dataTables_wrapper'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-6'>
                            <div className='dataTables_length'>
                              <label>Show{' '}<select className='form-control form-control-sm' value={pageLimit} onChange={handleChangeLimit}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='5'>5</option>
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                              </select>{' '}entries{' '}</label>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6'>
                            <div className='d-flex justify-content-end'>
                              <div id='example5_filter' className='dataTables_filter pt-0'>
                                <label>Search: <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                                </label>
                              </div>
                            {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[20]?.isAlwd) || rolesObj?.appAcc) && <a className="btn btn-sm btn-info ms-2" onClick={() => setStateData({closedModal: true, errMsg: '' , startDate: invCuntShow ? "": startDate,  endDate: invCuntShow ? "" : endDate, iStatus: 'All' })}>Closed Invitations</a> }
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                          <div className='col-md-12'>
                            <table className='table mt-0 table-hover no-wrap table-borderless dataTable no-footer'>
                              <thead className='thead-light'>
                                <tr>
                                  <th>Email</th>
                                  <th>Mobile Number</th>
                                  <th>Name</th>
                                  <th>Reviewer</th>
                                  <th>Referred By</th>
                                  <th>{invCuntShow ? 'Created At' : 'Closed At'}</th>
                                  <th>Status</th>
                                  <th className='text-right'>Actions</th>
                                </tr>
                              </thead>

                              <tbody>
                                {loading ? 
                                  <tr>
                                    <td colSpan={8}>
                                      <div className='no-data'>
                                        <Loader/>
                                      </div>
                                    </td>
                                  </tr>
                                : invitationsList && invitationsList.length > 0 ? invitationsList.map((item, i) => {
                                  const createdCDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm'); 
                                  const createdUDt = moment(item.uDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm'); 
                                  const fdbkStatus = item.iStatus;
                                  const intrFdbkStatus = setInviteStatus(fdbkStatus);
                                  return (
                                    <tr key={i}>
                                      <td>{item.emID}</td>
                                      <td>{item.mobCcNum}</td>
                                      <td>{item.fName + ' ' + item.lName}</td>
                                      <td>{item.rprtName}</td>
                                      <td>{item.refByName}</td>
                                      <td>{invCuntShow ? createdCDt : createdUDt}</td>
                                      <td>{intrFdbkStatus}</td>
                                      <td className='text-right' data-bs-toggle="tooltip" title="Invitation Actions">
                                        {(fdbkStatus === "Approved" || fdbkStatus === "Rejected") ?
                                          <div className="dropdown" ref={(el) => invtnsRef[item._id] = el}>
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleInvtnsMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': invtnsShow === item._id })}>
                                              <a className='dropdown-item' onClick={() => hashHistory.push(`/consultants/invitations/view/${item._id}`)} data-bs-toggle="tooltip" title="View Invitation Details"><i className="fa-regular fa-eye"></i>View Details</a>
                                            </div>
                                          </div> :
                                          <div className="dropdown" ref={(el) => invtnsRef[item._id] = el}>
                                            {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && item.iStatus == 'Submitted' && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push(`/consultants/invitations/view/${item._id}`)} data-bs-toggle="tooltip" title= 'Review Candidate Profile'><i className="fa-solid fa-user-check"></i></button> }
                                            {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && item.iStatus == 'Open' && <button className='btn btn-sm btn-success me-2' onClick={() => setStateData({inviteData: item, isReInvite: true})} data-bs-toggle="tooltip" title= 'Re-Invite Candidate'><i className="fa-regular fa-envelope"></i></button>}
                                            {((rolesObj?.access?.length >= 8 && (rolesObj?.access[7]?.actions[1]?.isAlwd || rolesObj?.access[7]?.actions[2]?.isAlwd || rolesObj?.access[7]?.actions[3]?.isAlwd || rolesObj?.access[7]?.actions[4]?.isAlwd || rolesObj?.access[7]?.actions[5]?.isAlwd || rolesObj?.access[7]?.actions[8]?.isAlwd || rolesObj?.access[7]?.actions[9]?.isAlwd)) || rolesObj?.appAcc) &&
                                              <>
                                                <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleInvtnsMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                                <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': invtnsShow === item._id })}>
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && (item.iStatus == 'Submitted') && <a className='dropdown-item' onClick={() => hashHistory.push(`/consultants/invitations/view/${item._id}`)} data-bs-toggle="tooltip" title='Review Candidate Profile'><i className="fa-solid fa-user-check"></i>Review Profile</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && (item.iStatus != 'Approved' || item.iStatus != 'Rejected') && <a className='dropdown-item' onClick={() => hashHistory.push(`/invitation/create/${item._id}`)} data-bs-toggle="tooltip" title="Complete Invitation Profile"><i className="fa-solid fa-user"></i>Complete Profile</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && item.iStatus == 'Open' && <a className='dropdown-item' onClick={() => setStateData({ inviteData: item, isReInvite: true })} data-bs-toggle="tooltip" title="Re-Invite Candidate"><i className="fa-regular fa-envelope"></i>Re-Invite</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/consultants/invitations/view/${item._id}`)} data-bs-toggle="tooltip" title="View Invitation Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, inviteData: item, invtnsShow: '' })} data-bs-toggle="tooltip" title="Delete Invitation"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleInvNotes(item)} data-bs-toggle="tooltip" title="Followup Invitation Notes"><i className='fa-solid fa-notes-medical'></i>Notes</a>}
                                                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleInvMeetings(item)} data-bs-toggle="tooltip" title="Invitation Meeting"><i className="fa-regular fa-handshake"></i>Meeting</a>}
                                                  {/* {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleReview(item)} data-bs-toggle="tooltip" title="Invitation Reviewer(s)"><i className="fa-solid fa-comment"></i>Reviewer(s)</a>} */}
                                                </div>
                                              </>}
                                          </div>
                                        }
                                      </td>
                                    </tr>
                                  )
                                }) :
                                  <tr>
                                    <td colSpan={8}>
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
                        {invitationsListCount && invitationsListCount > 0 ?
                          <div className='row'>
                            <div className='col-sm-12 col-md-5'>
                              <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {data} of {invitationsListCount} entries</div>
                            </div>
                            <div className='col-sm-12 col-md-7'>
                              <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                                <div className='paginate_button page-item active'>
                                  <Pagination
                                    className='mt-0'
                                    activePage={actPgNum}
                                    itemsCountPerPage={pageLimit}
                                    totalItemsCount={invitationsListCount}
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

      <FooterComponent />
    </div>
  );
}

export default InvitationsListComponent;

const setInviteStatus = (fdbkStatus) => {
  let intrFdbkStatus = <span className='badge badge-sm text-primary fs-6'>{fdbkStatus}</span>;
  switch (fdbkStatus) {
    case 'Open':
      intrFdbkStatus = <span className='badge badge-sm text-primary fs-6'>{fdbkStatus}</span>;
      break;
    case 'Submitted':
      intrFdbkStatus = <span className='badge badge-sm text-warning fs-6'>{fdbkStatus}</span>;
      break;
    case 'Approved':
      intrFdbkStatus = <span className='badge badge-sm text-success fs-6'>{fdbkStatus}</span>;
      break;
    case 'Rejected':
      intrFdbkStatus = <span className='badge badge-sm text-danger fs-6'>{fdbkStatus}</span>;
      break;
  }
  return intrFdbkStatus;
}
