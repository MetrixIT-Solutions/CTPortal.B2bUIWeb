/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import classnames from 'classnames';
import NoData from '../../assets/images/no-data.svg';

import { FooterComponent } from '../footer';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';

import CommonTooltip from '../common/CommonTooltip';
import './css/table.css';
import hashHistory from '../../hashHistory';
import { numebersOnly, initCaps, getPriority, setPriority } from '../../hooks/common';

import InterviewExpandComponent from './InterviewExpandComponent';

const InterviewsListComponent = (props) => {
  const { rolesObj, actPgNum, pageLimit, status, ivListCountObj, ivList, ivListCount, searchStr, statusModal, errMsg, sucMsg, sNotes, file, iStatus, imgUrl, interviewView, intrwShow, scrType, invDate, invTime, timeZone, hrs, mins, invWith, round, empData, infoModal, type, ipath, isprHImage, prModal, priority, disable, userData, schId, filters  } = props.state;
  const { statusClick, handleChangeLimit, handleKeyInput, handleChangeSearch, handleChangePage, handleIntrvwFollowups, setStateData, handleClose, removeImage, handleStatusUpdate, handleOnchange, fileInput, handleIntrvwLfc, handleIntrvwFdbk, handleIntrwMenu,  handleClickOutside,  intrwRef, handleInvMeetings, handleSubview, handlePrClick, handleClickExpand, handleCloseFilters } = props;
  const leftCount = ivListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= ivListCount ? rightCount : ivListCount;
  const { scheCount, complCount, nxtRndCount, slctdCount, holdCound, ntSlctdCount, rjctdCount, otherCount } = ivListCountObj;
  const tCount = scheCount + complCount + nxtRndCount + slctdCount + holdCound + ntSlctdCount + rjctdCount;

  const idate = interviewView.isDtStr ? moment(interviewView.isDtStr).format('Do MMM, YYYY') : '';
  const dateStr = interviewView.isDtStr ? interviewView.isDtStr.split(' ') : '';
  const idateStr = dateStr && dateStr.length > 1 ? dateStr[1] : '';
  const hours = Math.floor(interviewView.duration / 60);
  const minutes = interviewView.duration % 60;
  const time = hours == 0 ? '' : hours == 1 ? `${hours} hr` : `${hours} hrs :`
  const imTime = `${time} ${minutes} mins`;

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
          {/* <Content Header (Page header) -- */}
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Interviews</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/interviews')}>Interviews </a></li>
                      <li className='breadcrumb-item active' aria-current='page'>List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {/* <a className='btn btn-primary' onClick={() => hashHistory.push('/interviews/create')}><i className='fa fa-plus'></i> Add</a> */}
            </div>
          </div>
          {/* Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[5]?.isAlwd) || rolesObj?.appAcc) &&
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Scheduled')} className={`${status.includes('Scheduled') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ivListCountObj.scheCount}</h5>
                            <p className={`${status.includes('Scheduled') ? 'mb-0' : 'mb-0'}`}>Scheduled</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Completed')} className={`${status.includes('Completed') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ivListCountObj.complCount}</h5>
                            <p className={`${status.includes('Completed') ? 'mb-0' : 'mb-0'}`}>Completed</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Next Round')} className={`${status.includes('Next Round') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ivListCountObj.nxtRndCount}</h5>
                            <p className={`${status.includes('Next Round') ? 'mb-0' : 'mb-0'}`}>Next Round</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Placed')} className={`${status.includes('Placed') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ivListCountObj.slctdCount}</h5>
                            <p className={`${status.includes('Placed') ? 'mb-0' : 'mb-0'}`}>Placed</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('On Hold')} className={`${status.includes('On Hold') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-500'>{ivListCountObj.holdCound}</h5>
                            <p className={`${status.includes('On Hold') ? 'mb-0' : 'mb-0'}`}>On Hold</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Not Selected')} className={`${status.includes('Not Selected') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ivListCountObj.ntSlctdCount}</h5>
                            <p className={`${status.includes('Not Selected') ? 'mb-0' : 'mb-0'}`}>Not Selected</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Rejected')} className={`${status.includes('Rejected') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                          <h5 className='font-weight-600'>{ivListCountObj.rjctdCount}</h5>
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
                          {(userData?.userType !== 'Employee' || userData?.userRole === 'Onsite Manager' || userData?.userRole === 'Onsite Lead' || userData?.userRole === 'Offshore Manager' || userData?.userRole === 'Offshore Lead') &&
                            <div className='filters mt-1 ml-3'>
                              <a onClick={() => setStateData({showFilters: true})} className='btn btn-sm btn-primary'> <i className='fa-solid fa-filter'> </i></a>
                            </div>}
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div id='example5_filter' className='dataTables_filter'>
                            <label>Search:
                              <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example5" value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-12'>
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

                          {ivList && ivList.length > 0 ?
                            <div>
                              {ivList.map((item, i) => {
                                const refArr = item?.euRefID ? item.euRefID.split(':') : [];
                                const refUID = refArr?.length > 1 ? ' ('+ refArr[1] + ')' : '';
                                const date = item.isDtStr ? moment(item.isDtStr).format('Do MMM, YYYY') : '';
                                const iTime = item.isDtStr ? moment(item.isDtStr).format('HH:mm') : '';
                                const hours = Math.floor(item.duration / 60);
                                const minutes = item.duration % 60;
                                const time = hours == 0 ? '' : (hours == 1 ? `${hours} hr` : `${hours} hrs`)
                                const mTime = `${time} ${minutes} mins`;
                                const matData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Mentor') : [];
                                const recData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Recruiter') : [];

                                const today = moment(moment(), 'YYYY-MM-DD');
                                const wrkAuthExpDtStr = item?.wrkAuthExpDtStr ? moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : 'N/A';
                                const date1 = item?.wrkAuthExpDtStr && moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD');
                                const diffInDays = item?.wrkAuthExpDtStr ? date1.diff(today, 'days') : 0;
                                const divcolor = (item?.wrkAuthExpDtStr && diffInDays < 1) ? 'icon-red' : (diffInDays > 0 && diffInDays <= 30 ? 'icon-yellow' : (diffInDays > 0 && diffInDays > 30 ? 'icon-green' : 'icon-grey'));
                                const prtColor = item?.priority === '031' ? 'icon-dark' : (item?.priority === '051' ? 'icon-orange' : (item?.priority === '071' ? 'icon-blue' : 'icon-grey'));
                                const sD = schId.find(item1 => item1 == item._id);
                                const iSchedules = item?.iSchedules?.length && item.iSchedules.filter(item1 => item1._id !== item.round);

                                return (
                                  <>
                                  <div className='job-list_wrap'>
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
                                              <h6 className='ng-star-inserted text-center'>
                                                {item?.feedback?.length ? <CommonTooltip type='Info' name='' className='fa-solid fa-comment-dots' title='Feedback' display='right' data={item.feedback} /> : <div className='info-btn'>
                                                  <div className='icon-grey'><CommonTooltip type='Icon' name='' className='fa-solid fa-comment-dots' title={'Feedback: N/A'} display='right' /></div>
                                                </div>}
                                              </h6>
                                            </div>
                                            <div>
                                              <h5 className='padb5'>
                                                <div className='d-flex'>
                                                  <span className='ng-star-inserted'><a onClick={() => window.open(`/#/consultant/view/${item.euUser}`)}>{item.canName}</a></span>
                                                  <a onClick={() => setStateData({ infoModal: true, type: 'empInfo', empData: { title: item.canName + refUID, email: item.canEmail, mobile: item.canPhNum } })}>
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
                                                  <CommonTooltip type='Icon' name='' className='fa-solid fa-arrow-up-wide-short' title='Screening Process, Interview With / Round' display='top' /> <strong>{item.process}, {item.invWith}</strong> / <span className='text-success'>({item.round})</span></span>
                                              </h6>
                                              <h6 className='ng-star-inserted mb-0'>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='far fa-calendar-days' title={`Interview Scheduled Date / Round ${item.iSchedules?.length}`} display='top' /> <b>{date}</b>
                                                </span>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fa-regular fa-clock' title='Interview Time / Duration' display='top' /> <b>{iTime} {item.iTz || 'EST'} / {mTime}</b>
                                                </span>
                                                {iSchedules?.length ? <span className='pr-0'>
                                                  <div>
                                                    <a onClick={()=> handleClickExpand(item)} className='btn btn-sm btn-primary py-0 px-1' style={{fontSize: '10px'}}>
                                                    <i className={`fas ${!sD ? 'fa-minus' : 'fa-plus'} text-white`}></i>
                                                    </a>
                                                  </div>
                                                </span> : ''}
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='jobdetails-center'>
                                          <>
                                            <h5 className='mb-2 d-flex'>
                                              <span className='info-btn'>
                                              <span className={item.isVrfd ? 'icon-green' : 'icon-red'}><CommonTooltip type='Icon' name='' className={item.isVrfd ? 'fas fa-user-check' : 'fas fa-user-xmark'} title={item.isVrfd ? 'Verified:' : 'Not Verified'} boldTitle={item.isVrfd ? `${item.vrfdByName}` : ''} display='top' /></span>
                                              </span>
                                              {/* {((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&  */}
                                              <span className='mx-2 text-muted' style={{opacity: 0.5, fontSize: 18, lineHeight: 0.8}}>|</span>
                                              {item?.prfPath && item?.prHr ? <span title='Payrate/Hr'>
                                                <a onClick={() => setStateData({ isprHImage: true, empData: {title: item.euName + refUID, prHr: item.prHr}, ipath: item.prfPath})}><i className='fa-solid fa-dollar-sign' /> {item?.prHr + ' / Hr' || 'N/A'}</a>
                                              </span> :
                                              <span className='text-muted' title='Payrate/Hr' >$ N/A</span>}
                                              {/* } */}
                                              {item.isVrfd && item.iStatus !== 'Rejected'&& <span className='mx-2 text-muted' style={{opacity: 0.5, fontSize: 18, lineHeight: 0.8}}>|</span>}
                                              <h6 className='ng-star-inserted'>
                                                {item.isVrfd && item.iStatus !== 'Rejected'&&<span>
                                                  <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Invigilator' display='top' /> {<a title='Invigilator' onClick={() => setStateData({ infoModal: true, type: 'Invigilator', empData: { title: item.euName + refUID, name: item.invsgtrName, email: item.invsgtrEmID, mobile: item.invsgtrMobNum } })}>{item.invsgtrName} </a>}
                                                </span>}
                                               </h6>{/*  */}
                                            </h5>
                                            <h6 className='ng-star-inserted'>
                                              <span className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title={item.vType} display='top' /> {item.vType === 'Prime Vendor' ? 'Prime' : (item.vType === 'Implementation Partner' ? 'Imp' : item.vType)}: <b>{item.vName}</b> {item?.vClient ? '('+item.vClient+')' : ''}
                                              </span>
                                            </h6>
                                            <h6 className='ng-star-inserted'>
                                              {recData && recData.length ? <span>
                                                <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Recruiter' display='top' /> {recData.map((item1, index, arr) => <a title='Recruiter' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + refUID, name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>)}
                                              </span> : ''}
                                              <span>
                                                <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Mentor' display='top' /> {matData?.length ? matData.map((item1, index, arr) => <a title='Mentor' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + refUID, name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>) : ''}
                                              </span>
                                              <span className='ng-star-inserted'>
                                                <a onClick={() => setStateData({ infoModal: true, type: 'users', empData: { title: item.euName + refUID, usrsData: item.ua } })} > <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Leads'} display='right' /></a>
                                              </span>
                                            </h6>
                                            <h6 className='mb-0'>
                                              <span className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='fa-solid fa-clipboard-question' title='Interview ID' display='top' /> Int ID: <span><a onClick={() => hashHistory.push(`/interview/view/${item._id}`)}>{item.intrwId}</a></span>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fa-regular fa-file-lines' title='Submission ID' display='top' /> Sub ID: <a onClick={() => handleSubview(item)}>{item.subId}</a></span>
                                              </span>
                                            </h6>
                                          </>
                                        </div>
                                        <div className='jobdetails-right'>
                                          <div className='rightside-btns'>
                                            {((rolesObj?.access?.length >= 16 && (rolesObj?.access[15]?.actions[1]?.isAlwd || rolesObj?.access[15]?.actions[4]?.isAlwd || rolesObj?.access[15]?.actions[6]?.isAlwd || rolesObj?.access[15]?.actions[7]?.isAlwd || rolesObj?.access[15]?.actions[8]?.isAlwd || rolesObj?.access[15]?.actions[14]?.isAlwd ||  rolesObj?.access[15]?.actions[17]?.isAlwd)) || rolesObj?.appAcc) && 
                                            <div className="dropdown" ref={(el) => intrwRef[item._id] = el}>
                                              {!item.isVrfd && ((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-warning me-2' onClick={() => hashHistory.push(`/interview/view/${item._id}`)} data-bs-toggle="tooltip" title='Review Interview'><i className="fa-solid fa-rotate-left"></i></button>}
                                              {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-info me-2' onClick={() => handleIntrvwFollowups(item)} data-bs-toggle="tooltip" title="Interview Followups"><i className="fa-solid fa-notes-medical"></i></button>}
                                              <a className="btn btn-xs btn-primary" onClick={() => handleIntrwMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis"></i></a>
                                              <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': intrwShow === item._id })}>
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && !item.isVrfd && <a className='dropdown-item' onClick={() => hashHistory.push(`/interview/view/${item._id}`)} data-bs-toggle="tooltip" title="Review Interview"><i className="fa-solid fa-rotate-left"></i>Review Interview</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/interview/view/${item._id}`)} data-bs-toggle="tooltip" title="View Interview Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[17]?.isAlwd) || rolesObj?.appAcc) && item.iStatus == 'Scheduled' && <a className='dropdown-item' onClick={() => hashHistory.push(`/interview/update/${item._id}`)} data-bs-toggle="tooltip" title="Reschedule"><i className="fa-solid fa-calendar-days"></i>Reschedule</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && (((item.iStatus !== 'Placed' || item.iStatus !== 'Not Selected' || item.iStatus !== 'Rejected') && userData.userType !== 'Employee') && item.isVrfd) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, interviewView: item, iStatus: '', date: item.date, dateStr: item.dateStr, sNotes: item.sNotes, intrwShow: '',  scrType: '', invDate: '', invTime: '', timeZone: 'EST', hrs: '', mins: '', invWith: '', round: '', file: null, imgUrl: '' })} data-bs-toggle="tooltip" title="Status Update"><i className="fa-solid fa-arrows-rotate"></i>Status Update</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleIntrvwFdbk(item)} data-bs-toggle="tooltip" title="Interview Feedback"><i className="fa-regular fa-message"></i>Feedback</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleIntrvwLfc(item)} data-bs-toggle="tooltip" title="Interview Lifecycle"><i className="fa-solid fa-rotate"></i>Lifecycle</a>}
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleIntrvwFollowups(item)} data-bs-toggle="tooltip" title="Interview Followups"><i className="fa-solid fa-notes-medical"></i>Followups</a>}  
                                                {((rolesObj?.access?.length >= 16 && rolesObj?.access[15]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleInvMeetings(item)} data-bs-toggle="tooltip" title="Invitation Meeting"><i className="fa-regular fa-handshake"></i>Meeting</a>}
                                              </div>
                                            </div>}
                                          </div>
                                          <div className={`${item.iStatus == 'Scheduled' ? 'badge badge-primary-light' : item.iStatus == 'Completed' ? 'badge badge-success-light' : item.iStatus == 'Next Round' ? 'badge badge-warning-light' : item.iStatus == 'Placed' ? 'badge badge-success-light' : item.iStatus == 'On Hold' ? 'badge badge-danger-light' : (item.iStatus == 'Not Selected' || item.iStatus == 'Rejected') ? 'badge badge-danger-light' : ''}`}><i className='fas fa-tasks'></i> {item.iStatus}</div>
                                          <div className={prtColor} onClick={() => setStateData({ prModal: true, interviewView: item, priority: setPriority(item?.priority) || '' })}>
                                            <CommonTooltip type='Icon' name='' className='fa-solid fa-star mt-2' title={'Priority: ' + (item?.priority ? getPriority(item.priority) : 'N/A')} display='left' />
                                          </div>
                                        </div>
                                      </div>
                                      {iSchedules?.length && !sD ? <div className='media-footer'>
                                        <InterviewExpandComponent iSchedules={iSchedules} />
                                      </div> : ''}
                                    </div>
                                  </div>
                                  </div>
                                </>
                                )
                              })}
                            </div> :
                            <div className='no-data'>
                              <img src={NoData}></img>
                              <p className='text-danger py-2'>No results found </p>
                            </div>
                          }
                        </div>
                      </div>
                      {ivListCount && ivListCount > 0 ?
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {ivListCount} entries</div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={ivListCount}
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
      {/* Submission Status Modal Popup */}
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

          {type == 'Invigilator' && 
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

      <Modal show={statusModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <h5 className='mb-0'><strong>Status Update </strong></h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Screening Type</label>
                <p>{interviewView.process}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Interview WIth</span>
                <p className='font-weight-500'> {interviewView.invWith} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <span>Interview Round</span>
                <p className='font-weight-500'> {interviewView.round} </p>
              </li>
              <div className='clearfix'></div>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Scheduled On	</label>
                <p className='mb-1'>{idate}, {idateStr}, {interviewView.iTz}</p>
                <p className='text-muted'>Duration: {imTime}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Interview ID</label>
                <p>{interviewView.intrwId}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Submission ID</label>
                <p>{interviewView.subId}</p>
              </li>
              <div className='clearfix'></div>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Candidate</label>
                <p>{interviewView.canName} <br /> <span className='text-mute'>{interviewView.vcMobCcNum}</span></p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Job Title</label>
                <p>{interviewView.jobTitle} </p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Location</label>
                <p>{interviewView.jobLoc} </p>
              </li>
              <div className='clearfix'></div>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Vendor</label>
                <p>{interviewView.vName} <br /> <span className='text-mute'>({interviewView.vType})</span></p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Client</label>
                <p>{interviewView.vClient}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Skills</label>
                <p>{interviewView.skills} </p>
              </li>
              <div className='clearfix'></div>
              <li className='w-md-p30 float-left'>
                <label className='font-weight-500'>Current Status </label>
                <p><div className='badge badge-warning'>{interviewView.iStatus} </div></p>
              </li>
              <li className='w-md-p70 float-left'>
                <label className='font-weight-500'>Job description</label>
                <p>{interviewView.jobDesc}</p>
              </li>
            </ul>
          </div>
          <form>
            <div className='row mb-2 mt-2'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>New Status</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" name='orgCode' value={iStatus} onChange={(e) => setStateData({ iStatus: e.target.value, errMsg: '', scrType: '', errMsg: '', invDate: '', invTime: '', timeZone: 'EST', hrs: '', mins: '', invWith: '', round: '', file: null, imgUrl: '' })}>
                    <option value=''>Choose Status</option>
                    {interviewView.iStatus !== 'Scheduled' && <option value='Scheduled'>Scheduled</option>}
                    {interviewView.iStatus !== 'Completed' && <option value='Completed'>Completed</option>}
                    {interviewView.iStatus !== 'Next Round' && <option value='Next Round'>Next Round</option>}
                    {interviewView.iStatus !== 'Placed' && <option value='Placed'>Placed</option>}
                    {interviewView.iStatus !== 'On Hold' && <option value='On Hold'>On Hold</option>}
                    {interviewView.iStatus !== 'Not Selected' && <option value='Not Selected'>Not Selected</option>}
                    {interviewView.iStatus !== 'Rejected' && <option value='Rejected'>Rejected</option>}            
                  </select>
                </div>
              </div>
              {(iStatus == 'Next Round' || iStatus == 'Scheduled') &&
              <div className='row'>
               <div className='col-md-4'>
                <div className='form-group'>
                  <label>Screening Type	</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <select className='for4m-select form-control' id='participants6' value={scrType} onChange={(e) => setStateData({ scrType: e.target.value, errMsg: ''})}>
                    <option value=''>Select</option>
                    <option value='Video Interview'>Video Interview</option>
                    <option value='Audio Interview'>Audio Interview</option>
                    <option value='Face to Face'>Face to Face</option>
                    <option value='Online Test'>Online Test</option>
                    <option value='Written Test'>Written Test</option>
                  </select>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Interview With</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <select className='for4m-select form-control' id='participants6' value={invWith} onChange={(e) => setStateData({ invWith: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    <option value='Client'>Client</option>
                    <option value='Prime Vendor'>Prime Vendor</option>
                    <option value='Vendor'>Vendor</option>
                    <option value="Implementation Partner">Implementation Partner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Interview Round</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                      <input type='text' className='form-control' placeholder='Round' value={round} onChange={(e) => setStateData({ round: initCaps(e.target.value), errMsg: '' })} />
                    </div>
                  </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Scheduled Date</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <input type='date' className='form-control' placeholder='Scheduled Date' value={invDate} onChange={(e) => setStateData({ invDate: e.target.value, errMsg: '' })} />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Scheduled time</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <input type='time' className='form-control' placeholder='Scheduled Time' value={invTime} onChange={(e) => setStateData({ invTime: e.target.value, errMsg: '' })} />
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Time Zone</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <select className='form-select form-control' id='participants6' value={timeZone} onChange={(e) => setStateData({ timeZone: e.target.value, errMsg: '' })}>
                    {/* <option value=''>Select</option> */}
                    <option value='EST'>EST</option>
                    {/* <option value='CST'>CST</option>
                    <option value='MST'>MST</option>
                    <option value='PST'>PST</option>
                    <option value='AKST'>AKST</option>
                    <option value='IST'>IST</option> */}
                  </select>
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Duration</label>{(iStatus == 'Scheduled' || scrType || invDate) && <span className='text-danger'>*</span>}
                  <div className='d-flex'>
                    <input type='text' className='form-control me-2' placeholder='Hours' maxLength={1} onKeyPress={numebersOnly} value={hrs} onChange={(e) => setStateData({ hrs: e.target.value, errMsg: '' })} />
                    <input type='text' className='form-control' placeholder='Minutes' maxLength={2} onKeyPress={numebersOnly} value={mins} onChange={(e) => setStateData({ mins: e.target.value, errMsg: '' })} />
                  </div>
                </div>
              </div> 
              {(iStatus == 'Scheduled' || scrType || invDate) && <div className='col-md-8'>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group mt-1'>
                      <label>Interview Invite <span className='text-danger'>*</span></label>
                      <label className='custom-upload btn btn-info px-5 mb-0'>
                        <input type='file' accept="image/*" name='file' onChange={handleOnchange} ref={fileInput} />
                        <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
                      </label>
                      <small>(File Type: image only)</small>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    {imgUrl ? <div className='d-inline-flex mt-1 position-relative'>
                      <div className='add-img'>
                        <img src={imgUrl} alt={file && file.name ? file.name : ''} style={{ width: 100 }} className="img-fluid me-2" />
                      </div>
                      <div className='close-bth'>
                        <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
                      </div>
                    </div> : ''}
                  </div>
                </div>
              </div>}
              </div>
              }
              <div className='col-md-8'>
                <div className='form-group'>
                  <label>Interview Notes<span className='text-danger'>*</span></label>
                  <textarea name='decisions' id='decisions3' value={sNotes} onChange={(e) => setStateData({ sNotes: e.target.value, errMsg: '' })} rows='3' className='form-control'></textarea>
                </div>
              </div>
              <div className='text-center text-danger'>{errMsg}</div>
              <div className='text-center text-success'>{sucMsg}</div>
            </div>
            <div className='text-end'>
              <button type='button' className='btn btn-danger me-2' onClick={handleClose}>No</button>
              <button type='button' className='btn btn-success' onClick={handleStatusUpdate}>Status Update</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      {/* priority modal */}
      <Modal show={prModal} onHide={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false, interviewView: {} })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>Priority Update</h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
                <div className="d-flex align-items-center">
                  <p className="mb-0">Candidate:</p>
                  <span className="ms-2">{interviewView.canName}</span>
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
            <button type='button' className='btn btn-danger me-2' disabled={disable} onClick={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false, interviewView: {} })}>Close</button>
            <button type='button' className='btn btn-success' disabled={disable} onClick={handlePrClick}>Update</button>
          </div>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </div>
  )
}

export default InterviewsListComponent;
