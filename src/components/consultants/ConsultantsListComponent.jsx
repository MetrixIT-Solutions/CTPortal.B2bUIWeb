/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
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
import ConsutantPopupsComponent from './ConsultantPopupsComponent';
import Loader from '../loader/loader';

const ConsultantsListComponent = (props) => {
  const { rolesObj, cnsltantsList, cnsltantsListCount, actPgNum, searchStr, pageLimit, deleteModal, statusModal, consultantData, passwordModal, password, showPassword, confirmPassword, showConfirmPassword,sucMsg, errMsg, resetPasswordModal, cnsltntsShow, loading } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleRouteHome, setStateData, handleConsultantDelete, handleStatusUpdate, handleChangePassword, changePaswword, changeConfirmPassWord, handlePasswordShowHide, handleConfirmPasswordShowHide, sendPwdLink, handleResetPassword, handleCnsltntsMenu, cnsltntsRef, handleClickOutside } = props;
  const leftCount = cnsltantsListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= cnsltantsListCount ? rightCount : cnsltantsListCount;
  const handleInviteCons = () => props.handleInviteCons(true, false);

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
                <h3 className="page-title">Consultants</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-house"></i></a></li>
                      <li className="breadcrumb-item" aria-current="page">Consultants</li>
                      <li className="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[18]?.isAlwd) || rolesObj?.appAcc) &&
              <a className='btn btn-primary me-2' onClick={handleInviteCons}><i className='fa fa-plus'></i> Invite</a>}
              {/* <a className="btn btn-primary" onClick={() => hashHistory.push('/consultant/create')}><i className="fa fa-plus"></i> Add</a> */}
            </div>
          </div>
          <section className="content">
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-body">
                    {/* <div className="table-responsive"> */}
                      <div className='dataTables_wrapper container-fluid'>
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
                            <table className="table mt-0 table-hover no-wrap table-borderless dataTable no-footer">
                              <thead className="thead-light">
                                <tr>
                                  <th scope='col'>Name</th>
                                  <th scope='col'>User ID</th>
                                  <th scope='col'>Mobile #</th>
                                  <th scope='col'>Email ID</th>
                                  {/* <th scope='col'>Created At</th> */}
                                  <th scope='col'>Work Status</th>
                                  <th scope='col'>Status</th>
                                  <th scope="col" className='text-right'>Actions</th>
                                </tr>
                              </thead>
                              {loading ? 
                                <tbody><tr>
                                  <td colSpan={8}>
                                    <div className='no-data'>
                                      <Loader/>
                                    </div>
                                  </td>
                                </tr></tbody>
                              : cnsltantsList && cnsltantsList.length > 0 ?
                                <tbody>
                                  {cnsltantsList && cnsltantsList.length > 0 && cnsltantsList.map((item, i) => {
                                    const refArr = item.refUID ? item.refUID.split(':') : [];
                                    const refUID = refArr && refArr.length > 0 ? refArr[1] : '';
                                    // const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');
                                    return (
                                      <tr key={i}>
                                        <td>{item.name}</td>
                                        <td>{refUID}</td>
                                        <td>{item.mobCcNum}</td>
                                        <td>{item.emID}</td>
                                        {/* <td>{createdDt}</td> */}
                                        <td>{item.wStatus}</td>
                                        <td style={{ color: item.uStatus == 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>{item.uStatus}</td><td className='text-center'>
                                          {((rolesObj?.access?.length >= 7 && (rolesObj?.access[6]?.actions[1]?.isAlwd || rolesObj?.access[6]?.actions[3]?.isAlwd || rolesObj?.access[6]?.actions[4]?.isAlwd || rolesObj?.access[6]?.actions[5]?.isAlwd || rolesObj?.access[6]?.actions[6]?.isAlwd || rolesObj?.access[6]?.actions[7]?.isAlwd)) || rolesObj?.appAcc) && 
                                          <div className='dropdown' ref={(el) => cnsltntsRef[item._id] = el} data-bs-toggle="tooltip" title="Consultant Actions">
                                            <a className='btn btn-xs btn-primary btn-circle' onClick={() => handleCnsltntsMenu(item._id)} data-toggle='dropdown'><i className='fas fa-ellipsis' style={{ fontSize: 18 }}></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': cnsltntsShow === item._id })}>
                                              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/consultant/view/${item._id}`)} data-bs-toggle="tooltip" title="View Consultant Details"><i className='fa-regular fa-eye'></i>View Details</a>}
                                              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, consultantData: item, cnsltntsShow: '' })} data-bs-toggle="tooltip" title="Update Consultant Status"><i className='fa-solid fa-arrows-rotate'></i>Status Update</a>}
                                              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, consultantData: item, cnsltntsShow: '' })} data-bs-toggle="tooltip" title="Delete Consultant"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                                              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ passwordModal: true, consultantData: item, password: '', confirmPassword: '', cnsltntsShow: '', sucMsg: '' })} data-bs-toggle="tooltip" title="Change Consultant Password if Necessary"><i className='fa-solid fa-key'></i>Change Password</a>}
                                              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => sendPwdLink(item)} data-bs-toggle="tooltip" title="Send Reset Password Link on Request"><i className='fa-solid fa-key'></i>Reset Password</a>}
                                            </div>
                                          </div>}
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
                        {cnsltantsListCount && cnsltantsListCount > 0 ?
                          <div className="row">
                            <div className="col-sm-12 col-md-5">
                              <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {cnsltantsListCount} entries</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                                <div className='paginate_button page-item active'>
                                  <Pagination
                                    className='mt-0'
                                    activePage={actPgNum}
                                    itemsCountPerPage={Number(pageLimit)}
                                    totalItemsCount={cnsltantsListCount}
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
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {(deleteModal || statusModal || passwordModal || resetPasswordModal) && (
        <ConsutantPopupsComponent
          handleConsultantDelete={handleConsultantDelete}
          setStateData={setStateData}
          deleteModal={deleteModal}
          consultantData={consultantData}
          handleStatusUpdate={handleStatusUpdate}
          statusModal={statusModal}
          passwordModal={passwordModal}
          resetPasswordModal = {resetPasswordModal}
          handleResetPassword = {handleResetPassword}
          handleChangePassword={handleChangePassword}
          changePaswword={changePaswword}
          changeConfirmPassWord={changeConfirmPassWord}
          handlePasswordShowHide={handlePasswordShowHide}
          handleConfirmPasswordShowHide={handleConfirmPasswordShowHide}
          sucMsg ={sucMsg}
          errMsg = {errMsg}
          password={password}
          showPassword={showPassword}
          confirmPassword={confirmPassword}
          showConfirmPassword={showConfirmPassword}
          state={props.state}
        />
      )};
      <FooterComponent />
    </div>
  )
}

export default ConsultantsListComponent;
