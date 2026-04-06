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
import AdminUsersPopUpComponent from './AdminUsersPopUpComponent';
import Loader from '../loader/loader';

const UsersListComponent = (props) => {
  const { handleChangeSearch, handleKeyInput, handleChangerLimit, handlePagination, handleInvite, setStateData, handleCreate, handleClose, handleStatusUpdate, handleUserDelete, handleChangePassword, changePaswword, changeConfirmPassWord, handlePasswordShowHide, handleConfirmPasswordShowHide,handleUsrsMenu, usrsRef, handleClickOutside, handleOnChange, handleRolesChange, handleUserType, handleReportChange, statusClick, handleRenvite, handleResendInvtLink, handleTeamChange, handleView } = props;
  const { searchStr, actPgNum, rLimit, usersList, usersListCount, createModal, lgShow, rolesLists, firstname, lastname, email, mobCc, mobNum, role, errMsg, statusModal, userData, deleteModal, passwordModal, password, showPassword, showConfirmPassword, confirmPassword, sucMsg, disable, StatusCuntShow, resendInvtn, usrsShow, rolesObj, userInfo, orgsList, branchesList, team, teamsList, rolesList, userList, userType, userRole, org, orgObj, obId, report, usrsListStatusCountObj, statusData, showHide, reVtnModel, loading } = props.state;
  const leftCount = usersListCount == 0 ? '0' : (actPgNum - 1) * Number(rLimit) + 1;
  const rightCount = actPgNum * Number(rLimit);
  const data = rightCount <= usersListCount ? rightCount : usersListCount;
  const { openCount, submittedCount, activeCount, InactiveCount } = usrsListStatusCountObj;
  const tCount = openCount + submittedCount + activeCount + InactiveCount;

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
                <h3 className='page-title'>Admin Users</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'>
                        <a onClick={() => hashHistory.push('/home')}>
                          <i className='fa-solid fa-house'></i>
                        </a>
                      </li>
                      <li className='breadcrumb-item' aria-current='page'>
                        Admin Users
                      </li>
                      <li className='breadcrumb-item active' aria-current='page'>
                        List
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[3]?.isAlwd) || rolesObj?.appAcc) &&
              <a className='btn btn-primary me-3' onClick = {handleInvite}> +Invite</a>}
              {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
              <a className='btn btn-primary' onClick={() => hashHistory.push('/admin-users/create')}> +Add </a>}
            </div>
          </div>
          {/* Main content */}
          <section className='content'>
            {StatusCuntShow && 
              <div className='row'>
                <div className='col-md-12'>
                  <div className='box'>
                    <div className='box-body'>
                      <ul className='nav nav-pills nav-fill'>
                        <li className='nav-item b-1'>
                          <a onClick={() => statusClick('Open')} className={`${statusData.includes('Open') ? 'nav-link active' : 'nav-link'}`}>
                            <div className='text-center'>
                              <h5 className='font-weight-600'>{usrsListStatusCountObj.openCount}</h5>
                              <p className={`${statusData.includes('Open') ? 'mb-0' : 'mb-0'}`}>Open</p>
                            </div>
                          </a>
                        </li>
                        <li className='nav-item b-1'>
                          <a onClick={() => statusClick('Submitted')} className={`${statusData.includes('Submitted') ? 'nav-link active' : 'nav-link'}`}>
                            <div className='text-center'>
                              <h5 className='font-weight-600'>{usrsListStatusCountObj.submittedCount}</h5>
                              <p className={`${statusData.includes('Submitted') ? 'mb-0' : 'mb-0'}`}>Submitted</p>
                            </div>
                          </a>
                        </li>
                        <li className='nav-item b-1'>
                          <a onClick={() => statusClick('Active')} className={`${statusData.includes('Active') ? 'nav-link active' : 'nav-link'}`}>
                            <div className='text-center'>
                              <h5 className='font-weight-600'>{usrsListStatusCountObj.activeCount}</h5>
                              <p className={`${statusData.includes('Active') ? 'mb-0' : 'mb-0'}`}>Active</p>
                            </div>
                          </a>
                        </li>
                        <li className='nav-item b-1'>
                          <a onClick={() => statusClick('Inactive')} className={`${statusData.includes('Inactive') ? 'nav-link active' : 'nav-link'}`}>
                            <div className='text-center'>
                              <h5 className='font-weight-600'>{usrsListStatusCountObj.InactiveCount}</h5>
                              <p className={`${statusData.includes('Inactive') ? 'mb-0' : 'mb-0'}`}>Inactive</p>
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
            }
            <div className='row'>
              <div className='col-12'>
                <div className='box'>
                  <div className='box-body'>
                    {/* <div className='table-responsive'> */}
                      <div className='dataTables_wrapper'>
                        <div className='row'>
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
                                Entries{' '}
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
                                  <th scope='col'>Name</th>
                                  <th scope='col'>User ID</th>
                                  <th scope='col'>Mobile #</th>
                                  <th scope='col'>Email ID</th>
                                  <th scope='col'>Role</th>
                                  <th scope='col'>Report To</th>
                                  <th scope='col'>Team(s)</th>
                                  <th scope='col'>Status</th>
                                  <th scope='col' className='text-right'>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {loading ?
                                  <tr>
                                    <td colSpan={9}>
                                      <div className='no-data'>
                                        <Loader/>
                                      </div>
                                    </td>
                                  </tr>
                                : usersList && usersList.length > 0 ? usersList.map((item, i) => {                          
                                  // const createedDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');
                                  const refuId = item.refUID.split(':');
                                  const stcls = item.uStatus === 'Active' ? 'text-success' : (item.uStatus === 'Open' ? 'text-primary' : (item.uStatus === 'Submitted' ? 'text-warning' : 'text-danger'));
                                  const status = item.uStatus;
                                  return (
                                    <tr key={i}>
                                      <td onClick={() => handleView(item)}>{item.name}</td>
                                      <td onClick={() => handleView(item)}>{status !== 'Open' && refuId && refuId.length > 1 ? refuId[1].toUpperCase() : ''}</td>
                                      <td onClick={() => handleView(item)}>{item.mobCcNum}</td>
                                      <td onClick={() => handleView(item)}>{item.emID}</td>
                                      <td onClick={() => handleView(item)}>{item.userRole}</td>
                                      <td onClick={() => handleView(item)}>{item?.reports?.length ? item?.reports.map(rpt => rpt.rprtName+'; ') : ''}</td>
                                      <td onClick={() => handleView(item)}>{item?.teams?.length ? item?.teams.map(tm => tm.tName+'; ') : ''}</td>
                                      <td>{<span className={'badge badge-sm ' + stcls}>{item.uStatus}</span>}</td>
                                      <td className='text-right' data-bs-toggle="tooltip" title="User Actions">
                                        {((rolesObj?.access?.length >= 6 && (rolesObj?.access[5]?.actions[1]?.isAlwd || rolesObj?.access[5]?.actions[3]?.isAlwd || rolesObj?.access[5]?.actions[4]?.isAlwd || rolesObj?.access[5]?.actions[5]?.isAlwd || rolesObj?.access[5]?.actions[7]?.isAlwd)) || rolesObj?.appAcc) &&
                                          <div className="dropdown" ref={(el) => usrsRef[item._id] = el}> 
                                            {status == 'Submitted' && ((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push('/admin-users/view/' + item._id)}><i className="fa-solid fa-user-check" title= 'Review User'></i></button> }
                                            {(status == 'Open') && ((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-success me-2' onClick={() =>handleRenvite(item)}><i className="fa-regular fa-envelope" title='Re-Invite'></i></button>}
                                            <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleUsrsMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': usrsShow === item._id })}>
                                              {status == 'Submitted'&&((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push('/admin-users/view/' + item._id)} data-bs-toggle="tooltip" title="Review User Details"><i className="fa-solid fa-user-check" title='Review User'></i>Review</a>}
                                              {status == 'Open'&&((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() =>handleRenvite(item)} data-bs-toggle="tooltip" title="Re-Invite User"><i className="fa-regular fa-envelope" title='Re-Invite'></i>Re-Invite</a>}
                                              {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push('/admin-users/view/' + item._id)} data-bs-toggle="tooltip" title="View User Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                              {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push('/admin-users/edit/' + item._id)} data-bs-toggle="tooltip" title="Edit User"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                              {(status !== 'Open' && status !== 'Submitted') && ((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, userData: item, iStatus: item.iStatus, usrsShow: '' })} data-bs-toggle="tooltip" title="Update User Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                              {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, userData: item, usrsShow: '' })} data-bs-toggle="tooltip" title="Delete User"> <i className="fa-regular fa-trash-can"></i>Delete</a>}
                                              {status == 'Active' && ((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ passwordModal: true, userData: item, usrsShow: '' })} data-bs-toggle="tooltip" title="Set New Password If Required"><i className='fa-solid fa-key'></i>Change Password</a>}
                                            </div>
                                          </div>}
                                      </td> 
                                    </tr>
                                  );
                                }) : (
                                  <tr>
                                    <td colSpan={9}>
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
                        {usersListCount && usersListCount > 0 ? (
                          <div className='row'>
                            <div className='col-sm-12 col-md-5'>
                              <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>
                                Showing {leftCount} to {data} out of {usersListCount} entries
                              </div>
                            </div>
                            <div className='col-sm-12 col-md-7'>
                              <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                                <Pagination className='mt-0' activePage={actPgNum} itemsCountPerPage={Number(rLimit)} totalItemsCount={usersListCount} pageRangeDisplayed={5} onChange={handlePagination} />
                              </div>
                            </div>
                          </div>
                        ) : ('')}
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
      {(createModal || statusModal || deleteModal || passwordModal || reVtnModel) &&
      <AdminUsersPopUpComponent
        createModal = {createModal}
        handleClose = {handleClose}
        handleCreate = {handleCreate}
        lgShow = {lgShow}
        rolesObj = {rolesObj}
        setStateData = {setStateData}
        rolesLists = {rolesLists}
        firstname = {firstname}
        lastname = {lastname}
        email = {email}
        mobCc = {mobCc}
        mobNum = {mobNum}
        disable = {disable}
        resendInvtn = {resendInvtn}
        role = {role}
        userType = {userType}
        userRole = {userRole}
        userList = {userList}
        orgsList = {orgsList}
        org = {org}
        orgObj = {orgObj}
        obId = {obId}
        team = {team}
        reVtnModel = {reVtnModel}
        handleResendInvtLink = {handleResendInvtLink}
        report = {report}
        branchesList = {branchesList}
        teamsList = {teamsList}
        userInfo = {userInfo}
        handleRolesChange = {handleRolesChange}
        handleUserType = {handleUserType}
        rolesList = {rolesList}
        handleReportChange = {handleReportChange}
        errMsg = {errMsg}
        showHide = {showHide}
        sucMsg = {sucMsg}
        statusModal = {statusModal}
        userData = {userData}
        handleStatusUpdate = {handleStatusUpdate}
        deleteModal = {deleteModal}
        handleUserDelete = {handleUserDelete}
        passwordModal = {passwordModal}
        password = {password}
        showPassword = {showPassword}
        showConfirmPassword = {showConfirmPassword}
        confirmPassword = {confirmPassword}
        handleChangePassword = {handleChangePassword}
        changePaswword = {changePaswword}
        changeConfirmPassWord = {changeConfirmPassWord}
        handlePasswordShowHide = {handlePasswordShowHide}
        handleConfirmPasswordShowHide = {handleConfirmPasswordShowHide}
        handleOnChange = {handleOnChange}
        handleTeamChange= {handleTeamChange}
      />}

      <FooterComponent />
    </div>
  );
}

export default UsersListComponent;
