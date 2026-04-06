/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import OrgSmtpComponent from './OrgSmtpComponent';
import Loader from '../loader/loader';

const OrgsListComponent = (props) => {
  const { rolesObj, orgsList, orgsListCount, actPgNum, searchStr, pageLimit, statusModal, errMsg, orglistObj, disable, orgShow, smpDetailsModal, senderMail, senderMailPswd, smtp, smtpPort, service, fromMail, sucMsg, showPswd, loading } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, setStateData, handleStatusUpdate, handleRouteHome, handleOrgMenu, orgRef, handleClickOutside, handleSmtpDetails, smtpDetailsClick } = props;
  const leftCount = orgsListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= orgsListCount ? rightCount : orgsListCount;

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
          {/* <Content Header (Page header) -- */}
          <div className="content-header">
            <div className="d-flex align-items-center">
              <div className="mr-auto">
                <h3 className="page-title">Organizations</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-house"></i></a></li>
                      <li className="breadcrumb-item" aria-current="page">Organizations</li>
                      <li className="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 2 && rolesObj?.access[1]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
              <a className="btn btn-primary" onClick={() => hashHistory.push('/organizations/create')}><i className="fa fa-plus"></i> Add</a>}
            </div>
          </div>
          {/* Main content */}
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
                              <label>Show <select name="example5_length" aria-controls="example5" className="form-select form-select-sm" value={pageLimit} onChange={handleChangeLimit}>
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
                                <thead className='thead-light'>
                                  <tr>
                                    <th scope="col">Code</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className='text-center'>Actions</th>
                                  </tr>
                              </thead>
                              {loading ? 
                                <tr>
                                  <td colSpan={6}>
                                    <div className='no-data'>
                                      <Loader/>
                                    </div>
                                  </td>
                                </tr>
                              : orgsList && orgsList.length > 0 ? <tbody>
                                {orgsList.map((item, i) => {
                                  return (
                                    <tr key={i}>
                                      <td>{(item.orgCode).toUpperCase()}</td>
                                      <td>{item.orgName}</td>
                                      <td>{item.orgMobCcNum}</td>
                                      <td>{item.orgEmID}</td>
                                      <td>
                                        <span style={{ color: item.orgStatus == 'Active' ? 'green' : 'red', fontWeight: 'bold' }}>{item.orgStatus}</span>
                                      </td>
                                      <td className='text-center' data-bs-toggle="tooltip" title="Organization Actions">
                                        {((rolesObj?.access?.length >= 2 && (rolesObj?.access[1]?.actions[3]?.isAlwd || rolesObj?.access[1]?.actions[4]?.isAlwd)) || rolesObj?.appAcc) &&
                                        <div className="dropdown" ref={(el) => orgRef[item._id] = el}>
                                          <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleOrgMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{fontSize: 18}}></i></a>
                                          <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': orgShow === item._id })}> 
                                            {((rolesObj?.access?.length >= 2 && rolesObj?.access[1]?.actions[3]?.isAlwd) || rolesObj?.appAcc) &&
                                            <a className='dropdown-item' onClick={() => hashHistory.push(`/organizations/update/${item._id}`)} data-bs-toggle="tooltip" title="Edit Organization Details"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                            {((rolesObj?.access?.length >= 2 && rolesObj?.access[1]?.actions[4]?.isAlwd) || rolesObj?.appAcc) &&
                                            <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, orglistObj: item, orgShow: '' })} data-bs-toggle="tooltip" title="Update Organization Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                            {rolesObj?.appAcc && <a className='dropdown-item' onClick={() => smtpDetailsClick(item)} data-bs-toggle="tooltip" title="SMTP Organization Details"><i className="fa-solid fa-circle-info"></i>SMTP Details</a>}
                                          </div>
                                        </div>}
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody> : 
                                <tr>
                                  <td colSpan={6}>
                                    <div className='no-data'>
                                      <img src={NoData}></img>
                                      <p className='text-danger py-2'>No results found </p>
                                    </div>
                                  </td>
                                </tr>}
                              </table>
                            </div>
                          </div>
                        {orgsListCount && orgsListCount > 0 ?
                          <div className="row">
                            <div className="col-sm-12 col-md-5">
                              <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {orgsListCount} entries</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                              <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                                <div className='paginate_button page-item active'>
                                  <Pagination
                                    className='mt-0'
                                    activePage={actPgNum}
                                    itemsCountPerPage={Number(pageLimit)}
                                    totalItemsCount={orgsListCount}
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
      <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, errMsg: '' })} className='modal-s'>
        <Modal.Header closeButton>
          <h5>Status Update</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>Are you sure want to {orglistObj.orgStatus == 'Active' ? 'Inactivate' : 'Activate'} <span style={{ fontWeight: 700 }}>{orglistObj.orgName}?</span></h6>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <Button variant='danger' onClick={() => setStateData({ statusModal: false, errMsg: '' })}>No</Button>
          <Button variant='success' disabled={disable} onClick={handleStatusUpdate}>Yes</Button>
        </Modal.Footer>
      </Modal>
      {/* ------------SMTP Details Modal ------------*/}
      <OrgSmtpComponent orglistObj={orglistObj} smpDetailsModal={smpDetailsModal} errMsg={errMsg} disable={disable} senderMail={senderMail} senderMailPswd={senderMailPswd} smtp={smtp} smtpPort={smtpPort} service={service} fromMail={fromMail} sucMsg={sucMsg} showPswd={showPswd} handleSmtpDetails={handleSmtpDetails} setStateData={setStateData}/>
      <FooterComponent />
    </div>
  );
}

export default OrgsListComponent;
