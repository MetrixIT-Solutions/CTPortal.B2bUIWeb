/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { Modal, Button } from 'react-bootstrap';
import classnames from 'classnames';
import moment from 'moment';
import NoData from '../../assets/images/no-data.svg';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import { firstCharCaps, numebersOnly, getPriority, setPriority } from '../../hooks/common';
import CommonTooltip from '../common/CommonTooltip';
import './css/table.css';
import CommonImageViewComponent from '../common/CommonImageViewComponent';

const SubmisListComponent = (props) => {
  const { rolesObj, actPgNum, pageLimit, status, submsnsListCountObj, submsnsList, submsnsListCount, searchStr, sNotes, sStatus, prHr, prNotes, statusModal, payrateModal, errMsg, sucMsg, submsnsView, file, imgUrl, sbmsnShow, isprImage, ipath, isprHImage, infoModal, type, empData, prModal, priority, disabled, userData, filters } = props.state;
  const { statusClick, handleChangeLimit, handleKeyInput, handleChangeSearch, handleChangePage, handleSubFollowups, setStateData, handleClose, handleStatusUpdate, handleOnchange, removeImage, fileInput, handleSubLifecycle, handlePayrateStatusUpdate, handleSbmsnMenu, sbmsnRef, handleClickOutside, handleInvMeetings, handleInterview, handlePayRatehistory, payRateChange, handlePrClick, handleCloseFilters } = props;
  const leftCount = submsnsListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= submsnsListCount ? rightCount : submsnsListCount;
  const { subCount, shortCount, invSchCount, noRespCount, ntSubCount, rejCount } = submsnsListCountObj;
  const tCount = subCount + shortCount + invSchCount + noRespCount + ntSubCount + rejCount;
  const payRateAcc = ((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc);

  const onSlD = empData?.usrsData?.length ? empData.usrsData.filter(item1 => item1.role == 'Onsite Lead') : [];
  const ofSlD = empData?.usrsData?.length ? empData.usrsData.filter(item1 => item1.role == 'Offshore Lead') : [];
  const onSmD = empData?.usrsData?.length ? empData.usrsData.filter(item1 => item1.role == 'Onsite Manager') : [];
  const ofSmD = empData?.usrsData?.length ? empData.usrsData.filter(item1 => item1.role == 'Offshore Manager') : [];

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
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Submissions</h3>
                <div className='d-inline-block align-items-center'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a><i className='fa-solid fa-house'></i></a></li>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/submissions')}>Submissions </a></li>
                    <li className='breadcrumb-item active' aria-current='page'>List</li>
                  </ol>
                </div>
              </div>
              {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && 
              <a className='btn btn-primary' onClick={() => hashHistory.push('/submission/create')}><i className='fa fa-plus'></i> Add</a>}
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && 
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Submitted')} className={`${status.includes('Submitted') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.subCount}</h5>
                            <p className={`${status.includes('Submitted') ? 'mb-0' : 'mb-0'}`}>Submitted</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Shortlisted')} className={`${status.includes('Shortlisted') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.shortCount}</h5>
                            <p className={`${status.includes('Shortlisted') ? 'mb-0' : 'mb-0'}`}>Shortlisted</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Interview Scheduled')} className={`${status.includes('Interview Scheduled') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.invSchCount}</h5>
                            <p className={`${status.includes('Interview Scheduled') ? 'mb-0' : 'mb-0'}`}>Interview Scheduled</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('No Response')} className={`${status.includes('No Response') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.noRespCount}</h5>
                            <p className={`${status.includes('No Response') ? 'mb-0' : 'mb-0'}`}>No Response</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Not Submitted')} className={`${status.includes('Not Submitted') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.ntSubCount}</h5>
                            <p className={`${status.includes('Not Submitted') ? 'mb-0' : 'mb-0'}`}>Not Submitted</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Rejected')} className={`${status.includes('Rejected') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{submsnsListCountObj.rejCount}</h5>
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
                  </div>}
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <div className='box interview-box'>
                  <div className='box-body'>
                    <div className='dataTables_wrapper'>
                      <div className='row mb-2'>
                        <div className='col-sm-12 col-md-6 d-flex'>
                          <div className='dataTables_length'>
                            <label className='form-label'>Show <select className='form-select form-control-sm' value={pageLimit} onChange={handleChangeLimit}>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='5'>5</option>
                              <option value='10'>10</option>
                              <option value='25'>25</option>
                              <option value='50'>50</option>
                              <option value='100'>100</option>
                            </select> entries </label>
                          </div>
                          {(userData?.userType !== 'Employee' || userData?.userRole === 'Onsite Manager' || userData?.userRole === 'Onsite Lead' || userData?.userRole === 'Offshore Manager' || userData?.userRole === 'Offshore Lead') &&
                            <div className='filters mt-1 ml-3'>
                              <a onClick={() => setStateData({ showFilters: true })} className='btn btn-sm btn-primary'> <i className='fa-solid fa-filter'> </i></a>
                            </div>}
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div id='example5_filter' className='dataTables_filter'>
                            <label className='form-label'>Search:
                              <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
                          {/* <div className='table-responsive'> */}

                            <div className="d-flex flex-wrap mb-2">
                              {filters.tName ? <div className="d-flex flex-wrap mb-2">
                                <div className="each-selected-filter">
                                  <p className="mb-0">{filters?.tName}
                                    <i className="fa fa-times-circle text-danger" onClick={() => handleCloseFilters('tName')}></i></p>
                                </div>
                              </div> : ''}
                              {filters.onsName ? <div className="d-flex flex-wrap mb-2">
                                <div className="each-selected-filter">
                                  <p className="mb-0">{filters?.onsName}
                                    <i className="fa fa-times-circle text-danger" onClick={() => handleCloseFilters('onsName')}></i></p>
                                </div>
                              </div> : ''}
                              {filters.ofsName ? <div className="d-flex flex-wrap mb-2">
                                <div className="each-selected-filter">
                                  <p className="mb-0">{filters?.ofsName}
                                    <i className="fa fa-times-circle text-danger" onClick={() => handleCloseFilters('ofsName')}></i></p>
                                </div>
                              </div> : ''}
                              {filters.mntrName ? <div className="d-flex flex-wrap mb-2">
                                <div className="each-selected-filter">
                                  <p className="mb-0">{filters?.mntrName}
                                    <i className="fa fa-times-circle text-danger" onClick={() => handleCloseFilters('mntrName')}></i></p>
                                </div>
                              </div> : ''}
                              {filters.rctrName ? <div className="d-flex flex-wrap mb-2">
                                <div className="each-selected-filter">
                                  <p className="mb-0">{filters?.rctrName}
                                    <i className="fa fa-times-circle text-danger" onClick={() => handleCloseFilters('rctrName')}></i></p>
                                </div>
                              </div> : ''}
                            </div>

                              {submsnsList && submsnsList.length > 0 ?
                                <div>
                                  {submsnsList.map((item, i) => {
                                    const refArr = item.euRefID ? item.euRefID.split(':') : [];
                                    const refUID = refArr?.length > 1 ? refArr[1] : '';
                                    const date = item.sDtStr ? moment(item.sDtStr).format('Do MMM, YYYY') : 'N/A';
                                    const matData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Mentor') : [];
                                    const recData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Recruiter') : [];

                                    const today = moment(moment(), 'YYYY-MM-DD');
                                    const wrkAuthExpDtStr = item?.wrkAuthExpDtStr ? moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : 'N/A';
                                    const date1 = item?.wrkAuthExpDtStr && moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD');
                                    const diffInDays = item?.wrkAuthExpDtStr ? date1.diff(today, 'days') : 0;
                                    const divcolor = (item?.wrkAuthExpDtStr && diffInDays < 1) ? 'icon-red' : (diffInDays > 0 && diffInDays <= 30 ? 'icon-yellow' : (diffInDays > 0 && diffInDays > 30 ? 'icon-green' : 'icon-grey'));
                                    const prtColor = item?.priority === '031' ? 'icon-dark' : (item?.priority === '051' ? 'icon-orange' : (item?.priority === '071' ? 'icon-blue' : 'icon-grey'));

                                    return (
                                      <div className='job-list_wrap' key={i}>
                                        <div className='media-content ng-star-inserted'>
                                          <div className='media ng-star-inserted'>
                                            <div className='media-body'>
                                              <div className='jobdetails-left'>
                                                <div className='consultent-card'>
                                                  <div className='profile_image'>
                                                    <figure className='profile_image_wrap'>
                                                      <div className={divcolor}>
                                                        <CommonTooltip type='Icon' name='' className='fa-solid fa-circle-user' title='Work Auth:' boldTitle={wrkAuthExpDtStr} display='right' />
                                                      </div>
                                                    </figure>
                                                  </div>
                                                  <div>
                                                    <h5 className='padb5'>
                                                      <div className='d-flex'>
                                                        <span className='ng-star-inserted'><a onClick={() => window.open(`/#/consultant/view/${item.euUser}`)}>{item.canName}</a></span>
                                                        <a onClick={() => setStateData({ infoModal: true, type: 'empInfo', empData: {title: item.canName + ' ' + '(' + refUID + ')', email: item.canEmail, mobile: item.canPhNum}})}>
                                                          <CommonTooltip type='Icon' name='' className='fas fa-info-circle ml-2' title='Info' display='top' />
                                                        </a>
                                                      </div>
                                                    </h5>
                                                    <h6 className='ng-star-inserted'>
                                                      <span className='ng-star-inserted'>
                                                        <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Team: ' + item.tName} display='top' /> <strong>{item.tName}</strong>
                                                      </span>
                                                      <span className='consultant-list-location-date ng-star-inserted' title='Job Title'>
                                                        <CommonTooltip type='Icon' name='' className='fas fa-chalkboard-teacher' title='Job Title' display='top' /> <b>{item.jobTitle}</b></span>
                                                      <span className='ng-star-inserted'>
                                                        <CommonTooltip type='Icon' name='' className='fa-solid fa-location-dot' title='Job Location' display='top' /> {item.jobLoc}, {item.sCode}</span>
                                                    </h6>
                                                    <h6 className='ng-star-inserted'>
                                                      <span className='ng-star-inserted'>
                                                        <CommonTooltip type='Icon' name='' className='far fa-calendar-days' title='Submission Date' display='top' /> {date} 
                                                      </span>
                                                      <span className='ng-star-inserted'>
                                                        <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title={item.vType} display='top' /> {item.vType === 'Prime Vendor' ? 'Prime' : (item.vType === 'Implementation Partner' ? 'Imp' : item.vType)}: <b>{item.vName}</b> {item?.vClient ? '('+item.vClient+')' : ''}
                                                      </span>
                                                    </h6>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className='jobdetails-center'>
                                                <>
                                                  <h5 className='mb-2 d-flex'>
                                                    <span className='info-btn'>
                                                      <span className={item.isVrfd ? 'icon-green' : 'icon-red'}><CommonTooltip type='Icon' name='' className={item.isVrfd ? 'fas fa-user-check' : 'fas fa-user-xmark'} title={item.isVrfd ? 'Verified' : 'Not Verified'} display='top' /></span>
                                                    </span>
                                                    {/* {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&  */}
                                                    <span className='mx-2 text-muted' style={{opacity: 0.5, fontSize: 18, lineHeight: 0.8}}>|</span>
                                                    {item?.prfPath && item?.prHr ? <span title='Payrate/Hr'>
                                                      <a onClick={() => setStateData({ isprHImage: true, empData: {title: item.euName + ' ' + '(' + refUID + ')', prHr: item.prHr}, ipath: item.prfPath})}><i className='fa-solid fa-dollar-sign' /> {item?.prHr + ' / Hr' || 'N/A'}</a>
                                                    </span> :
                                                    <span className='text-muted' title='Payrate/Hr' >$ N/A</span>}
                                                    {/* } */}
                                                  </h5>
                                                  <h6 className='ng-star-inserted'>
                                                    {recData && recData.length ? <span>
                                                      <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Recruiter' display='top' /> {recData.map((item1, index, arr) => <a title='Recruiter' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>)}
                                                    </span> : ''}
                                                    <span>
                                                      <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Mentor' display='top' /> {matData?.length ? matData.map((item1, index, arr) => <a title='Mentor' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>) : ''}
                                                    </span>
                                                    <span className='ng-star-inserted'>
                                                      <a onClick={() => setStateData({ infoModal: true, type: 'users', empData: { title: item.euName + ' ' + '(' + refUID + ')', usrsData: item.ua } })} > <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Leads'} display='right' /></a>
                                                    </span>
                                                  </h6>
                                                  <h6 className='mb-0'>
                                                    <span className='ng-star-inserted'>
                                                      <CommonTooltip type='Icon' name='' className='fa-regular fa-file-lines' title='Submission ID' display='top' /> Sub ID: <a onClick={() => hashHistory.push(`/submissions/view/${item._id}`)}>{item.subId}</a></span>
                                                    <span className='ng-star-inserted'>
                                                      <CommonTooltip type='Icon' name='' className='fa-solid fa-clipboard-question' title='Interview ID' display='top' /> Int ID: {item.intrw ? <span><a onClick={() => handleInterview('view', item)}>{item.intrwId}</a></span> : <span>N/A</span>}
                                                    </span>
                                                  </h6>
                                                </>
                                              </div>
                                              <div className='jobdetails-right'>
                                                <div className='rightside-btns'>
                                                  <div className='dropdown' ref={(el) => sbmsnRef[item._id] = el}>
                                                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus == 'Submitted' || item.sStatus == 'Not Submitted') && !item.isVrfd && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title='Review Submission'><i className="fa-solid fa-rotate-left"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus == 'Shortlisted') && !item.isVrfd && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title='Review Submission'><i className="fa-solid fa-rotate-left"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && (rolesObj?.access[14]?.actions[8]?.isAlwd || rolesObj?.access[14]?.actions[9]?.isAlwd)) || rolesObj?.appAcc) && (item.sStatus == 'Rejected' || item.sStatus == 'No Response') && !item.isVrfd && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title='Review Submission'><i className="fa-solid fa-rotate-left"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus !== 'Submitted' && item.sStatus !== 'Shortlisted') && item.isVrfd && <button className='btn btn-sm btn-warning me-2' onClick={() => setStateData({ statusModal: true, submsnsView: item, sNotes: '', sStatus: '', sbmsnShow: '' })} data-bs-toggle="tooltip" title='Status Update'><i className="fa-solid fa-check"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus == 'Submitted' || item.sStatus == 'Shortlisted') && item.isVrfd && <button className='btn btn-sm btn-primary me-2' onClick={() => handleInterview('create', item)} data-bs-toggle="tooltip" title="Schedule Interview"><i className="fa-regular fa-calendar-check"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-info me-2' onClick={() => handleSubFollowups(item)} data-bs-toggle="tooltip" title="Submission Followups"><i className="fa-solid fa-notes-medical"></i></button>}
                                                    {((rolesObj?.access?.length >= 15 && (rolesObj?.access[14]?.actions[1]?.isAlwd || rolesObj?.access[14]?.actions[3]?.isAlwd || rolesObj?.access[14]?.actions[4]?.isAlwd || rolesObj?.access[14]?.actions[6]?.isAlwd || rolesObj?.access[14]?.actions[7]?.isAlwd || rolesObj?.access[14]?.actions[8]?.isAlwd || rolesObj?.access[14]?.actions[9]?.isAlwd || rolesObj?.access[14]?.actions[10]?.isAlwd || rolesObj?.access[14]?.actions[11]?.isAlwd || rolesObj?.access[14]?.actions[15]?.isAlwd || rolesObj?.access[14]?.actions[18]?.isAlwd)) || rolesObj?.appAcc) &&
                                                      <>
                                                        <a className='btn btn-xs btn-primary' onClick={() => handleSbmsnMenu(item._id)} data-toggle='dropdown'><i className='fas fa-ellipsis'></i></a>
                                                        <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': sbmsnShow === item._id })}>
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus == 'Submitted' || item.sStatus == 'Shortlisted' || item.sStatus == 'Not Submitted') && !item.isVrfd && <a className='dropdown-item' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title="Review Submission"><i className="fa-solid fa-rotate-left"></i>Review Submission</a>}
                                                          {((rolesObj?.access?.length >= 15 && (rolesObj?.access[14]?.actions[8]?.isAlwd || rolesObj?.access[14]?.actions[9]?.isAlwd)) || rolesObj?.appAcc) && (item.sStatus == 'Rejected' || item.sStatus == 'No Response') && !item.isVrfd && <a className='dropdown-item' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title="Review Submission"><i className="fa-solid fa-rotate-left"></i>Review Submission</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus == 'Submitted' || item.sStatus == 'Shortlisted') && item.sStatus != 'Interview Scheduled' && item.isVrfd && <a className='dropdown-item' onClick={() => handleInterview('create', item)} data-bs-toggle="tooltip" title="Schedule Interview"><i className="fa-regular fa-calendar-check"></i> Schedule Interview</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && item.isVrfd && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, submsnsView: item, sNotes: '', sStatus: '', sbmsnShow: '' })} data-bs-toggle="tooltip" title="Status Update"><i className='fa-solid fa-check'></i> Status Update</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && item.isVrfd && <a className='dropdown-item' onClick={() => setStateData({ payrateModal: true, submsnsView: item, sbmsnShow: '' })} data-bs-toggle="tooltip" title="Payrate"><i className='fa-solid fa-dollar-sign'></i> Payrate</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/submissions/view/${item._id}`)} data-bs-toggle="tooltip" title="View Submission Details"><i className='fa-regular fa-eye'></i>View Details</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus !== 'Interview Scheduled') && <a className='dropdown-item' onClick={() => hashHistory.push(`/submission/update/${item._id}`)} data-bs-toggle="tooltip" title="Edit Submission"><i className='fa-regular fa-pen-to-square'></i> Edit</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleSubLifecycle(item)} data-bs-toggle="tooltip" title="Submission Lifecycle"><i className='fa-solid fa-rotate'></i>Lifecycle</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[18]?.isAlwd) || rolesObj?.appAcc) && item.isVrfd && <a className='dropdown-item' onClick={() => handlePayRatehistory(item)} data-bs-toggle="tooltip" title="PayRate History"><i className='fa-solid fa-rotate'></i>PayRate History</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleSubFollowups(item)} data-bs-toggle="tooltip" title="Submission Followups"><i className="fa-solid fa-notes-medical"></i>Followups</a>}
                                                          {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleInvMeetings(item)} data-bs-toggle="tooltip" title="Invitation Meeting"><i className="fa-regular fa-handshake"></i>Meeting</a>}
                                                        </div>
                                                      </>}
                                                  </div>
                                                </div>
                                                <div className={`${item.sStatus == 'Submitted' ? 'badge badge-primary' : item.sStatus == 'Shortlisted' ? 'badge badge-success' : item.sStatus == 'Rejected' ? 'badge badge-danger' : item.sStatus == 'No Response' ? 'badge badge-primary' : item.sStatus == 'Interview Scheduled' ? 'badge badge-warning' : 'badge badge-warning'}`}><i className='fas fa-tasks'></i> {item.sStatus}</div>
                                                <div className={prtColor} onClick={() => setStateData({ prModal: true, submsnsView: item, priority: setPriority(item?.priority) || '' })}>
                                                  <CommonTooltip type='Icon' name='' className='fa-solid fa-star mt-2' title={'Priority: ' + (item?.priority ? getPriority(item.priority) : 'N/A')} display='left' />
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div> :
                                <div className='no-data'>
                                  <img src={NoData}></img>
                                  <p className='text-danger py-2'>No results found </p>
                                </div>
                              }
                          {/* </div> */}
                        </div>
                      </div>
                      {submsnsListCount && submsnsListCount > 0 ?
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {data} of {submsnsListCount} entries</div>
                          </div>
                          <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={submsnsListCount}
                                  pageRangeDisplayed={5}
                                  onChange={handleChangePage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content*/}
        </div>
      </div>
      {/* Submission Status Update Modal */}

      <Modal show={infoModal} onHide={handleClose} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>{empData.title}</h6>
        </Modal.Header>
        <Modal.Body>
          {type == 'empInfo' && 
          <div className='jobdetails-left'>
            <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='fa-solid fa-phone'></i> {empData.mobile}
              </span>
            </h6>
            <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a>
              </span>
            </h6>
            {/* <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='fa-brands fa-linkedin'></i> {empData?.linkedin?.length ? <a href={empData.linkedin[0]} target='_blank'>{empData.linkedin[0]}</a> : 'N/A'}
              </span>
            </h6> */}
          </div>}

          {type == 'mentor' && 
          <div className='jobdetails-left'>
            <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='fa-solid fa-user'></i> {empData.name} </span>
            </h6>
            <h6>
              <span className='ng-star-inserted'>
                <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a>
              </span>
            </h6>
            {empData.mobile && <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='fa-solid fa-phone'></i> {empData.mobile} {empData.extn}</span>
            </h6>}
          </div>}

          {type == 'client' && 
          <div className='jobdetails-left'>
            <h6>
              <span className='ng-star-inserted'>
                <i className='far fa-building'></i> Current Client : <b>{empData.mCurrClient || 'N/A'} </b>
              </span>
            </h6>
            <h6 className='ng-star-inserted'>
              <span className='ng-star-inserted'>
                <i className='far fa-building'></i> Previous.Client : <b>{empData.mPrevClient || 'N/A'}</b>
              </span>
            </h6>
          </div>}

          {type == 'users' &&
            <div>
              <div className='jobdetails-left'>
                {onSmD && onSmD.length ? onSmD.map((item1, i) => {
                  const extn = item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '';
                  return (
                    <div>
                      {i == 0 && <div className='user-role'>
                        <h6>{onSmD[0].role} </h6>
                        <hr className='my-2' />
                      </div>}
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-user'></i> {item1.name} </span>
                      </h6>
                      <h6 className='mb-2'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + item1.emID}>{item1.emID}</a>
                        </span>
                      </h6>
                      {onSmD && onSmD.length > 1 ? <hr className='my-2' /> : ''}
                      {item1.deskCcNum && <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-phone'></i> {item1.deskCcNum} {extn}</span>
                      </h6>}
                    </div>)
                }) : ''}

                {onSlD && onSlD.length ? onSlD.map((item1, i) => {
                  const extn = item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '';
                  return (
                    <div>
                      {i == 0 && <div className='user-role'>
                        <h6>{onSlD[0].role} </h6>
                        <hr className='my-2' />
                      </div>}
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-user'></i> {item1.name} </span>
                      </h6>
                      <h6 className='mb-2'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + item1.emID}>{item1.emID}</a>
                        </span>
                      </h6>
                      {onSlD && onSlD.length > 1 ? <hr className='my-2' /> : ''}
                      {item1.deskCcNum && <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-phone'></i> {item1.deskCcNum} {extn}</span>
                      </h6>}
                    </div>)
                }) : ''}

                {ofSmD && ofSmD.length ? ofSmD.map((item1, i) => {
                  const extn = item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '';
                  return (
                    <div>
                      {i == 0 && <div className='user-role'>
                        <h6>{ofSmD[0].role} </h6>
                        <hr className='my-2' />
                      </div>}
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-user'></i> {item1.name} </span>
                      </h6>
                      <h6 className='mb-2'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + item1.emID}>{item1.emID}</a>
                        </span>
                      </h6>
                      {ofSmD && ofSmD.length > 1 ? <hr className='my-2' /> : ''}
                      {item1.deskCcNum && <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-phone'></i> {item1.deskCcNum} {extn}</span>
                      </h6>}
                    </div>)
                }) : ''}

                {ofSlD && ofSlD.length ? ofSlD.map((item1, i) => {
                  const extn = item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '';
                  return (
                    <div>
                      {i == 0 && <div className='user-role'>
                        <h6>{ofSlD[0].role} </h6>
                        <hr className='my-2' />
                      </div>}
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-user'></i> {item1.name} </span>
                      </h6>
                      <h6 className='mb-2'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + item1.emID}>{item1.emID}</a>
                        </span>
                      </h6>
                      {ofSlD && ofSlD.length > 1 ? <hr className='my-2' /> : ''}
                      {item1.deskCcNum && <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <i className='fa-solid fa-phone'></i> {item1.deskCcNum} {extn}</span>
                      </h6>}
                    </div>)
                }) : ''}
              </div>
            </div>
          }
        </Modal.Body>
      </Modal>

      <Modal show={statusModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>Status Update </strong></h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view mb-3'>
          <strong className='mb-2'>Submission Info:</strong> <span>(Submission ID - {submsnsView.subId})</span> <span>(Date - {submsnsView.sDtStr ? moment(submsnsView.sDtStr).format('Do MMM, YYYY') : ''})</span> {submsnsView.intrwId && <span>(Interview ID - {submsnsView.intrwId})</span>} <br />
          Candidate - {submsnsView.euName} | Job Title: {submsnsView.jobTitle} | Location: {submsnsView.jobLoc} | Vendor: {submsnsView.vName}<br /> <hr />
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Skills</label>
                <p className='font-weight-500 mb-0'>{submsnsView.skills}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Current Status</label>
                <p className='font-weight-500 mb-0'><div className='badge badge-success'> {submsnsView.sStatus} </div></p>
              </li>
              <li className='w-md-p100 float-left'>
                <label className='form-label'>Submission Notes</label>
                <p className='font-weight-500 mb-0'>{submsnsView.sNotes}</p>
              </li>
            </ul>
          </div>
          <form>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>New Status</label><span className='text-danger'>*</span>
                  <select className='form-select form-control' name='orgCode' value={sStatus} onChange={(e) => setStateData({ sStatus: e.target.value, errMsg: '' })}>
                    <option value=''>Choose Status </option>
                    {submsnsView.sStatus !== 'Submitted' && <option value='Submitted'>Submitted</option>}
                    {submsnsView.sStatus !== 'Shortlisted' && <option value='Shortlisted'>Shortlisted</option>}
                    {submsnsView.sStatus !== 'No Response' && <option value='No Response'>No Response</option>}
                    {submsnsView.sStatus !== 'Not Submitted' && <option value='Not Submitted'>Not Submitted</option>}
                    {submsnsView.sStatus !== 'Rejected' && <option value='Rejected'>Rejected</option>}
                  </select>
                </div>
              </div>
              <div className='col-md-8'>
                <div className='form-group'>
                  <label className='form-label'>Submission Notes<span className='text-danger'>*</span></label>
                  <textarea name='decisions' id='decisions3' value={sNotes} onChange={(e) => setStateData({ sNotes: e.target.value, errMsg: '' })} rows='3' className='form-control'></textarea>
                </div>
              </div>
            </div>
            <div className='row mb-2 mt-2'>
            {payRateAcc && 
              <div className='col-md-12'>
                <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Payrate:</h5>
                <hr className='my-15' />
              </div> }
          </div>
          {payRateAcc &&
            <div className='user-view mb-3'>
              <ul className='list-unstyled clearfix bg-grey'>
                <li className='w-md-p30 float-left'>
                  <label className='form-label'>Pay Rate/Hr</label>
                  <p className='font-weight-500 mb-0'>{submsnsView.prHr}</p>
                </li>
                <li className='w-md-p30 float-left'>
                  <label className='form-label'>Pay Rate Notes</label>
                  <p className='font-weight-500 mb-0'>{submsnsView.prNotes}</p>
                </li>
                <li className='w-md-p30 float-left'>
                  {submsnsView.prfPath ? <div className='d-inline-flex mt-1 position-relative'>
                    <div className='add-img'>
                      <img onClick={() => setStateData({isprImage: true})} src={submsnsView.prfPath} style={{ width: 100 }} className='img-fluid me-2' />
                    </div>
                  </div> : ''}
                </li>
              </ul>
            </div>
          }
          {payRateAcc && 
          <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-label'>Pay Rate/Hr {(sStatus != 'Shortlisted' && !submsnsView.prHr) ? <span className='text-danger'>*</span> : null}</label>
                  <input type='text' className='form-control' placeholder='Pay Rate/Hr' onKeyPress={numebersOnly} maxLength={3} value={prHr} onChange={payRateChange} />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group mt-1'>
                    <label className='mb-0'>RTR Confirmation </label>{((sStatus != 'Shortlisted' && !submsnsView.prHr) || (sStatus != 'Shortlisted' && prHr)) ? <span className='text-danger'>*</span> : null}
                  <p className='mb-0 text-mute'>
                    <p className='mb-1'>(If Payrate Ensure RTR)</p>
                    <label className='custom-upload btn btn-info px-5'>
                      <input type='file' accept='image/*' name='file' onChange={handleOnchange} ref={fileInput} />
                      <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                    </label>
                    <small>(File Type: image only)</small></p>
                </div>
              </div>
              <div className='col-md-4'>
                {imgUrl ? <div className='d-inline-flex mt-1 position-relative'>
                  <div className='add-img'>
                    <img src={imgUrl} alt={file && file.name ? file.name : ''} style={{ width: 100 }} className='img-fluid me-2' />
                  </div>
                  {/* <div className='close-bth'>
                    <a onClick={removeImage}><i className='fa-solid fa-xmark'></i></a>
                  </div> */}
                </div> : ''}
              </div>
              <div className='col-md-12'>
                <div className='form-group'>
                  <label className='form-label'>Pay Rate Notes</label>
                  <textarea type='text' className='form-control' rows='3' value={prNotes} onChange={(e) => setStateData({ prNotes: e.target.value, errMsg: '' })} />
                </div>
              </div>
              </div>}
              <div className='text-center text-danger'>{errMsg}</div>
              <div className='text-center text-success'>{sucMsg}</div>
            <div className='text-end'>
              <button type='button' className='btn btn-danger me-2' onClick={handleClose}>No</button>
              <button type='button' className='btn btn-success' onClick={handleStatusUpdate}>Status Update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/*========== Payrate Modal ================*/}
      <Modal show={payrateModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>Payrate Update </strong></h5>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='row'>
            <div className='user-view mb-3'>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Date</label>
                <p className='font-weight-500 mb-0'>{submsnsView.sDtStr ? moment(submsnsView.sDtStr).format('Do MMM, YYYY') : ''}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Candidate	</label>
                <p className='font-weight-500 mb-0'>{submsnsView.euName}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Interview ID</label>
                <p className='font-weight-500 mb-0'>{submsnsView.intrwId}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Submission ID</label>
                <p className='font-weight-500 mb-0'>{submsnsView.subId}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Job Title</label>
                <p className='font-weight-500 mb-0'>{submsnsView.jobTitle}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='form-label'>Location</label>
                <p className='font-weight-500 mb-0'>{submsnsView.jobLoc}</p>
              </li>
            </ul>
            </div>
            </div>
            {payRateAcc &&
              <div className='user-view mb-3'>
                <ul className='list-unstyled clearfix bg-grey'>
                  <li className='w-md-p30 float-left'>
                    <label className='form-label'>Pay Rate/Hr</label>
                    <p className='font-weight-500 mb-0'>{submsnsView.prHr}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    <label className='form-label'>Pay Rate Notes</label>
                    <p className='font-weight-500 mb-0'>{submsnsView.prNotes}</p>
                  </li>
                  <li className='w-md-p30 float-left'>
                    {submsnsView.prfPath ? <div className='d-inline-flex mt-1 position-relative'>
                      <div className='add-img'>
                        <img onClick={() => setStateData({isprImage: true})} src={submsnsView.prfPath} style={{ width: 100 }} className='img-fluid me-2' />
                      </div>
                    </div> : ''}
                  </li>
                </ul>
              </div>
            }
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label className='form-label'>Pay Rate/Hr  <span className='text-danger'>*</span></label>
                  <input type='text' className='form-control' placeholder='Pay Rate/Hr' onKeyPress={numebersOnly} maxLength={3} value={prHr} onChange={payRateChange} />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group mt-1'>
                  <label className='mb-0'>RTR Confirmation <span className='text-danger'>*</span></label>
                  <p className='mb-0 text-mute'>
                    <p className='mb-1'>(If Payrate Ensure RTR)</p>
                    <label className='custom-upload btn btn-info px-5'>
                      <input type='file' accept='image/*' name='file' onChange={handleOnchange} ref={fileInput} />
                      <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                    </label>
                    <small>(File Type: image only)</small></p>
                </div>
              </div>
              <div className='col-md-4'>
                {imgUrl ? <div className='d-inline-flex mt-1 position-relative'>
                  <div className='add-img'>
                    <img src={imgUrl} alt={file && file.name ? file.name : ''} style={{ width: 100 }} className='img-fluid me-2' />
                  </div>
                  {/* <div className='close-bth'>
                    <a onClick={removeImage}><i className='fa-solid fa-xmark'></i></a>
                  </div> */}
                </div> : ''}
              </div>
              <div className='col-md-8'>
                <div className='form-group'>
                  <label className='form-label'>Pay Rate Notes</label>
                  <textarea type='text' className='form-control' rows='3' value={prNotes} onChange={(e) => setStateData({ prNotes: firstCharCaps(e.target.value), errMsg: '' })} />
                </div>
              </div>
            </div>
            <div className='text-center text-danger'>{errMsg}</div>
            <div className='text-center text-success'>{sucMsg}</div>
            <div className='text-end'>
              <button type='button' className='btn btn-danger me-2' onClick={handleClose}>No</button>
              <button type='button' className='btn btn-success' onClick={handlePayrateStatusUpdate}>Payrate Update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={isprHImage} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>Payrate Image </strong></h5>
        </Modal.Header>
        <Modal.Body>
          {empData?.title && <><h6>{empData.title} | <strong className='text-primary'>$ {empData.prHr} / Hr</strong></h6><hr /></>}
          <div>
            <div className='popup_img'>
              <img src={ipath}></img>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-end'>
            <button type='button' className='btn btn-danger' onClick={handleClose}>Close</button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* priority modal */}
      <Modal show={prModal} onHide={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false, submsnsView: {} })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>Priority Update</h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <div className="d-flex align-items-center">
                  <p className="mb-0">Candidate:</p>
                  <span className="ms-2">{submsnsView.canName + '(' + (submsnsView.euRefID ? submsnsView.euRefID.split(':')[1] : '') + ')'}</span>
                </div>
                <label className='form-lable'>Priority</label><span className='text-danger'>*</span>
                <select className='form-select form-control' name='orgCode' value={priority} onChange={(e) => setStateData({ priority: e.target.value, errMsg: '' })}>
                  <option value=''>Select</option>
                  <option value='031'>Low</option>
                  <option value='051'>Medium</option>
                  <option value='071'>High</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <div className='text-end'>
            <Button type='button' className='btn btn-danger me-2' disabled={disabled} onClick={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false, submsnsView: {} })}>Close</Button>
            <Button type='button' className='btn btn-success' disabled={disabled} onClick={handlePrClick}>Update</Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* <CommonImageViewComponent title='Payrate Image' show={isprImage} onHide={handleClose} imgPath={ipath}/> */}
      <CommonImageViewComponent title='Payrate Image' show={isprImage} onHide={() => setStateData({isprImage: false})} imgPath={submsnsView.prfPath}/>
      <FooterComponent />
    </div>
  )
}

export default SubmisListComponent;
