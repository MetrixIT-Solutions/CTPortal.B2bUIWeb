/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {useEffect} from 'react';
import classnames from 'classnames';
import Pagination from 'react-js-pagination';
import moment from 'moment';
// import { PDFDownloadLink } from '@react-pdf/renderer';

import GoalsModalComponent from '../consultants/GoalsModalComponent';
import NoData from '../../assets/images/no-data.svg';
import Loader from '../loader/loader';
// import {exportPdf} from '../common/ExportPdf';
import Dropdown from 'react-bootstrap/Dropdown';
import ExportPdfComponent from '../common/ExportPdfComponent';

const GoalsTabComponent = (props) => {
  const { setStateData, handleSearch, handleKeyInput, handleClickOutside, handleEdit, gRef, rolesObj, handleChangeLimit, handleChangePage, exportPdfAll, exportCurPage, dropdownRef} = props;
  const {goalsList, goalListCount, searchStr, gShow, pgNum, limit, loading, curLoading, allLoading} = props.state;
  const leftCount = goalListCount == 0 ? '0' : ((pgNum - 1) * Number(limit)) + 1;
  const rightCount = pgNum * limit;
  const data = rightCount <= goalListCount ? rightCount : goalListCount;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const currentDateTime = moment().format('YYYYMMDD-HHmm');
  const fileName =  goalsList?.length > 0 &&`${goalsList[0]?.euName}-${currentDateTime}.pdf`;
  return (
    <div className='box'>
      <div className='box-header'>
        <div className='d-flex justify-content-between'>
          <h6>Goals & Accomplishments</h6>
          <div className='d-flex gap-3'>
            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[29]?.isAlwd) || rolesObj?.appAcc) && goalsList.length > 0 ?
              <Dropdown autoClose={false}>
                <Dropdown.Toggle className='btn btn-primary' id="dropdown-basic" ref={dropdownRef}>
                  <i className="fa-solid fa-file-export"></i> Export
                </Dropdown.Toggle>

                {/* <Dropdown.Menu>
                  <Dropdown.Item onClick={() => exportPdf(goalsList)}><i class="fa-solid fa-file"></i>Current Page</Dropdown.Item>
                  <Dropdown.Item onClick={exportPdfAll}><i class="fa-solid fa-list"></i>All</Dropdown.Item>
                </Dropdown.Menu> */}
                <Dropdown.Menu>
                  <Dropdown.Item as="div" onClick={exportCurPage}>
                    {curLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generating...
                      </>) :
                      (<>
                        <i className="fa-solid fa-file"></i> Current Page
                      </>)}
                  </Dropdown.Item>
                  <Dropdown.Item as="div" onClick={exportPdfAll}>
                    {allLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generating...
                      </>) :
                      (<><i className="fa-solid fa-download"></i> All
                      </>)}
                    { }
                  </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> : ''}
            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[23]?.isAlwd) || rolesObj?.appAcc) && <a className='btn btn-success' onClick={() => setStateData({ goalModal: true, errMsg: '' })}><i className='fas fa-add'></i> Set Goal</a>}
          </div>  
        </div>
      </div>
      <div className='box-body'>
        <div className='dataTables_wrapper'>
        <div className="col-sm-12 col-md-6">
          <div className="dataTables_length">
            <label>Show <select className="form-select form-control-sm" value={limit} onChange={handleChangeLimit}>
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
          <div className="row d-flex justify-content-end">
            <div className="col-sm-12 col-md-6 ">
              <div id="example5_filter" className="dataTables_filter">
                <label>Search:
                  <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example5" value={searchStr} onChange={handleSearch} onKeyPress={handleKeyInput}/>
                </label>
              </div>
            </div>
          </div>
          <table className='table mt-0 table-hover no-wrap dataTable no-footer'>
            <thead className='thead-light'>
              <tr>
                {/* <th>Goal Title</th> */}
                <th>Category</th>
                <th width={200}>Goal & Accomplishments</th>
                <th>Goal Status</th>
                <th>Start Date</th>
                <th>Completed On </th>
                <th>Goal Type</th>
                <th>Review Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            {loading ? 
              <tbody><tr>
                <td colSpan={8}>
                  <div className='no-data'>
                    <Loader/>
                  </div>
                </td>
              </tr></tbody> :
              <tbody>
                {goalsList?.length > 0 ? goalsList.map((item, i) => {
                  return (
                    <tr key={i}>
                      {/* <td>{item.gTitle}</td> */}
                      <td>{item.gCategory}</td>
                      {/* {item.gAccmnts.includes('http' || 'https') ? <td style={{ wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "normal" }}><a href={item.gAccmnts}>{item.gAccmnts}</a></td> : <td>{item.gAccmnts}</td>} */}
                      {item.gAccmnts && (item.gAccmnts.includes("http://") || item.gAccmnts.includes("https://")) ? (
                        <td style={{ wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "normal" }}>
                          <a href={item.gAccmnts} target="_blank" rel="noopener noreferrer">
                            {item.gAccmnts}
                          </a>
                        </td>
                      ) : (
                        <td>{item.gAccmnts}</td>
                      )}
                      <td>{item.gStatus}</td>
                      <td>{moment(item.gsDtStr[0]).format('DD MMM, YYYY')}</td>
                      <td>{item.gsDtStr.length > 1 ? moment(item.gsDtStr[1]).format('DD MMM, YYYY') : ''}</td>
                      <td><p>{item.gType}</p></td>
                      <td>
                        {item?.gRvrName &&
                          <dl>
                            <dt>Reviewer :</dt>
                            <dd>{item?.gRvrName}</dd>
                            <dt>Reviewed On :</dt>
                            <dd>{moment(item?.grDtStr).format('DD MMM, YYYY')}</dd>
                            <dt>Rating :</dt>
                            <dd><span className='badge badge-success'>{item?.grRating} <i className='fas fa-star'></i> </span></dd>
                            <dt>Review :</dt>
                            <dd>{item?.gReview }</dd>
                          </dl>}
                      </td>
                      {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[24]?.isAlwd) || rolesObj?.appAcc) &&
                      <div className='dropdown' data-bs-toggle="tooltip" title="Goals Actions" ref={(el) => gRef[item._id] = el}>
                        <a className='btn btn-xs btn-primary btn-circle' onClick={() => setStateData({gShow: item._id})} data-toggle='dropdown'><i className='fas fa-ellipsis' style={{ fontSize: 18 }}></i></a>
                        <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': gShow === item._id })}>
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[24]?.isAlwd) || rolesObj?.appAcc) &&
                          <a className='dropdown-item' onClick={() => setStateData({ viewModal: true, goalData: item, gShow: ''})} data-bs-toggle="tooltip" title="Review"><i className='fa-solid fa-eye'></i>View Details</a>}
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[25]?.isAlwd) || rolesObj?.appAcc) && item.gStatus !== 'Reviewed' && 
                          <a className='dropdown-item' onClick={() => setStateData({ gStsModal: true, goalData: item, gStatus: item.gStatus, gShow: '', sDate: item.gsDtStr[0], cDate:item.gsDtStr[1], gsNotes: '', gCategory: item.gCategory, gAccmnts: item.gAccmnts, gType: item.gType})} data-bs-toggle="tooltip" title="Update Goal Status"><i className='fa-solid fa-arrows-rotate'></i>Status Update</a>}
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[26]?.isAlwd) || rolesObj?.appAcc) &&  item.gStatus !== 'Reviewed' && 
                          <a className='dropdown-item' onClick={() => handleEdit(item)} data-bs-toggle="tooltip" title="Edit Goal"><i className="fa-regular fa-pen-to-square"></i>Edit</a>}
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[27]?.isAlwd) || rolesObj?.appAcc) && item.gStatus == 'Completed' && item.gStatus !== 'Reviewed' && 
                          <a className='dropdown-item' onClick={() => setStateData({ rvwModal: true, goalData: item, gShow: ''})} data-bs-toggle="tooltip" title="Review"><i className='fa-solid fa-star'></i>Review</a>}
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[28]?.isAlwd) || rolesObj?.appAcc) &&
                          <a className='dropdown-item' onClick={() => setStateData({ delModal: true, goalData: item, gShow: ''})} data-bs-toggle="tooltip" title="Delete"><i className='fa-solid fa-trash'></i>Delete</a>}
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[30]?.isAlwd) || rolesObj?.appAcc) &&
                          <a className='dropdown-item' onClick={() => setStateData({ lifeCycleModal: true, goalData: item, gShow: ''})} data-bs-toggle="tooltip" title="Lifecycle"><i className='fa-solid fa-arrows-spin'></i>Lifecycle</a>}
                        </div>
                      </div>}
                    </tr>
                  )
                }): 
                (<tr>
                  <td colSpan={9}>
                    <div className='no-data'>
                      <img src={NoData}></img>
                      <p className='text-danger py-2'>No results found </p>
                    </div>
                  </td>
                </tr>)}
             </tbody>}
          </table>
          {goalListCount && goalListCount > 0 ?
            <div className="row">
              <div className="col-sm-12 col-md-5">
                <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {goalListCount} entries</div>
              </div>
              <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                  <div className='paginate_button page-item active'>
                    <Pagination
                      className='mt-0'
                      activePage={pgNum}
                      itemsCountPerPage={Number(limit)}
                      totalItemsCount={goalListCount}
                      pageRangeDisplayed={5}
                      onChange={handleChangePage}
                    />
                  </div>
                </div>
              </div>
            </div>
            : ''}
        </div>
        <GoalsModalComponent state={props.state} handleCreateGoal={props.handleCreateGoal} setStateData={setStateData} handleGoalStatusUpdate={props.handleGoalStatusUpdate} handleUpdate={props.handleUpdate} handleReview={props.handleReview} handleDelete={props.handleDelete} numbersOnly={props.numbersOnly}
        handleCloseModal={props.handleCloseModal}/>
      </div>
    </div>
  )
}


export default GoalsTabComponent
