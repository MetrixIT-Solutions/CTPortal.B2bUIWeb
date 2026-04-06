/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import hashHistory from '../../hashHistory';
import Loader from '../loader/loader';
import VendorsPopupsComponent from '../../components/vendors/VendorsPopupsComponent';

const VendorsListComponent = (props) => {
  const { rolesObj, vndrsList, vndrsListCount, actPgNum, rLimit, searchStr, statusModal, viewModal, errMsg, disable, vndrData, deleteModal, vndrShow, loading, vType, vendorListCountObj } = props.state;
  const { handleChangeSearch, handleKeyInput, handlePagination, handleChangerLimit, handleRouteHome, setStateData, handleStatusUpdate, handleViewClick, handlevndrsDelete, handleIntrwMenu, vndrRef, handleClickOutside,statusClick } = props;
  const leftCount = vndrsListCount == 0 ? '0' : ((actPgNum - 1) * Number(rLimit)) + 1;
  const rightCount = actPgNum * Number(rLimit);
  const count = rightCount <= vndrsListCount ? rightCount : vndrsListCount;
  const { venCount, primeVeCount, implimtCount } = vendorListCountObj;
  const tCount = venCount + primeVeCount + implimtCount;

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
                <h3 className='page-title'>Vendors List</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'>Vendors </li>
                      <li className='breadcrumb-item active' aria-current='page'>List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
              <a className='btn btn-primary' onClick={() => hashHistory.push('/vendors/create')}><i className='fa fa-plus'></i> Add</a>}
            </div>
          </div>
          {/* Main content */}
          <section className='content'>
          <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && 
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Vendor')} className={`${vType.includes('Vendor') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{vendorListCountObj.venCount}</h5>
                            <p className={`${vType.includes('Vendor') ? 'mb-0' : 'mb-0'}`}>Vendor</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Prime Vendor')} className={`${vType.includes('Prime Vendor') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{vendorListCountObj.primeVeCount}</h5>
                            <p className={`${vType.includes('Prime Vendor') ? 'mb-0' : 'mb-0'}`}> Prime Vendor</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Implementation Partner')} className={`${vType.includes('Implementation Partner') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{vendorListCountObj.implimtCount}</h5>
                            <p className={`${vType.includes('Implementation Partner') ? 'mb-0' : 'mb-0'}`}>Implementation Partner</p>
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
                  </div>}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <div className='box'>
                  <div className='box-body'>
                    {/* <div className='table-responsive'> */}
                      <div className='dataTables_wrapper'>
                        <div className='row'>
                          <div className='col-sm-12 col-md-6'>
                            <div className='dataTables_length'>
                              <label>Show <select className='form-select form-control-sm' value={rLimit} onChange={handleChangerLimit}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                              </select> entries </label>
                            </div>
                          </div>
                          <div className='col-sm-12 col-md-6'>
                            <div id='example5_filter' className='dataTables_filter'>
                              <label>Search: <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onChange={handleChangeSearch} onKeyPress={handleKeyInput} />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-md-12'>
                            <table className='table mt-0 table-hover no-wrap table-striped dataTable no-footer'>
                              <thead className='thead-light'>
                                <tr>
                                  {rolesObj?.appAcc && <th scope="col">Organization</th>}
                                  <th scope='col'>Type</th>
                                  <th scope='col'>Vendor Company</th>
                                  <th scope='col'>End Client</th>
                                  <th scope='col'>Vendor Name</th>
                                  <th scope='col'>Vendor Email</th>
                                  <th scope='col'>Mobile Number</th>
                                  {/* <th scope='col'>Created At</th> */}
                                  <th scope='col'>Status</th>
                                  <th scope='col' className='text-center'>Actions</th>
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
                                  : vndrsList.length > 0 ? vndrsList.map((item, i) => {                                  
                                  return (
                                    <tr key={i}>
                                      {rolesObj?.appAcc && <td>{item.orgName}</td>}
                                      <td>{item.vType}</td>
                                      <td>{item.vName}</td>
                                      <td>{item.vClient}</td>
                                      <td>{item.vcPerson}</td>
                                      <td>{item.vcEmail}</td>
                                      <td>{item.vcMobCcNum}</td>
                                      <td>{item.vStatus === 'Active' ? <span className='badge badge-sm text-success'>{item.vStatus}</span> : <span className='badge badge-sm text-danger'>{item.vStatus}</span>}</td>
                                      <td className='text-center' data-bs-toggle="tooltip" title="Vendor Actions">
                                        {((rolesObj?.access?.length >= 5 && (rolesObj?.access[4]?.actions[1]?.isAlwd || rolesObj?.access[4]?.actions[3]?.isAlwd || rolesObj?.access[4]?.actions[4]?.isAlwd || rolesObj?.access[4]?.actions[5]?.isAlwd)) || rolesObj?.appAcc) && <div className="dropdown" ref={(el) => vndrRef[item._id] = el}>
                                          <a className="btn btn-xs btn-primary btn-circle" onClick={() => handleIntrwMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" style={{ fontSize: 18 }}></i></a>
                                          <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': vndrShow === item._id })}>
                                            {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleViewClick(item)} data-bs-toggle="tooltip" title="View Vendor Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                            {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/vendors/edit/${item._id}`)} data-bs-toggle="tooltip" title="Edit Vendor"><i className="fa-regular fa-pen-to-square"></i> Edit</a>}
                                            {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, vndrData: item, vndrShow: '' })} data-bs-toggle="tooltip" title="Update Vendor Status"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                            {((rolesObj?.access?.length >= 5 && rolesObj?.access[4]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, vndrData: item, vndrShow: '' })} data-bs-toggle="tooltip" title="Delete Vendor"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                                          </div>
                                        </div>}
                                      </td> 
                                    </tr>
                                  )
                                }) :
                                  <tr>
                                    <td colSpan={9}>
                                      <div className='no-data'>
                                        <img src={NoData}></img>
                                        <p className='text-danger py-2'>No results found </p>
                                      </div>
                                    </td>
                                  </tr>
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' role='status' aria-live='polite'>Showing {leftCount} to {count} of {vndrsListCount} entries</div>
                          </div>
                          {vndrsListCount && vndrsListCount > 0 ? <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(rLimit)}
                                  totalItemsCount={vndrsListCount}
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
          {/* /.content */}
        </div>
      </div>

      {(statusModal || viewModal || deleteModal) && (
        <VendorsPopupsComponent
          handleStatusUpdate={handleStatusUpdate}
          setStateData={setStateData}
          statusModal={statusModal}
          errMsg={errMsg}
          disable={disable}
          viewModal={viewModal}
          vndrData={vndrData}
          deleteModal={deleteModal}
          handlevndrsDelete={handlevndrsDelete}
          rolesObj={rolesObj}
        />
      )}

      <FooterComponent />
    </div>
  )
}

export default VendorsListComponent