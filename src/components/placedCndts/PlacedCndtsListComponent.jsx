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
import Select from 'react-select';

import hashHistory from '../../hashHistory';
import NoData from '../../assets/images/no-data.svg';
import Loader from '../loader/loader';
import TooltipComponent from '../tootltip/TooltipComponent';
import { Modal, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import CommonTooltip from '../common/CommonTooltip';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { getPriority, setPriority, firstCharCaps, initCaps, numebersOnly } from '../../hooks/common';
import data from '../../../public/data/Lookups.json';
import CommonDropdownComponent from '../common/CommonDropdownComponent';

const years = data.years;
const months = data.months;

const PlacedCndtsListComponent = (props) => {
  const { rolesObj, leadsList, leadsListCount, errMsg, actPgNum, searchStr, pageLimit, leadsListCountObj, status, cndtShow, loading, empShowModal, empData, infoModal, disabled, type, usrsData, priority, prModal, isModal, leadView, statusModal, wStatus, notes, succMsg, email, mobCc, mobNum, visaStatus, cmnJbTitleArr, jobTitle, expYrs, expMonths, linkedIn, currentClient, previousClient, recruiter, recruitersList, cmnModal, cmnValue, cmnErrMsg, cmnType, userData, sType, filters } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleRouteHome, statusClick, handleRouteCons, handleCndtMenu, cndtRef, handleClickOutside, handleClose, setStateData, handlePrClick, handleSendtobgv, handlePlcdInMarketing, handleStatus, handleStatusUpdate, handleCreateSkill, handleCloseFilters } = props;
  const leftCount = leadsListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= leadsListCount ? rightCount : leadsListCount;
  const { placedCnt } = leadsListCountObj;
  const tCount = placedCnt;
  const handleInviteCons = () => props.handleInviteCons(true, false);

  const onSlD = usrsData && usrsData.length ? usrsData.filter(item1 => item1.role == 'Onsite Lead') : [];
  const ofSlD = usrsData && usrsData.length ? usrsData.filter(item1 => item1.role == 'Offshore Lead') : [];
  const onSmD = usrsData && usrsData.length ? usrsData.filter(item1 => item1.role == 'Onsite Manager') : [];
  const ofSmD = usrsData && usrsData.length ? usrsData.filter(item1 => item1.role == 'Offshore Manager') : [];

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
                <h3 className="page-title">Placed</h3>
                <div className="d-inline-block align-items-center">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a onClick={handleRouteHome}><i className="fa-solid fa-house"></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={handleRouteCons}>Consultants</a></li>
                      <li className="breadcrumb-item" aria-current="page">Placed</li>
                      <li className="breadcrumb-item active" aria-current="page">List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
                <div className='float-right'>
                  <a className='btn btn-primary me-2' onClick={handleInviteCons}><i className='fa fa-plus'></i> Invite</a>
                </div>}
            </div>
          </div>
          <section className="content">
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Placed')} className={`${status.includes('Placed') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-500'>{leadsListCountObj.placedCnt}</h5>
                            <p className={`${status.includes('Placed') ? 'mb-0' : 'mb-0'}`}>Placed</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a className='nav-link'>
                          <div className='text-center'>
                            <h5 className='font-weight-500'>{tCount}</h5>
                            <p className='mb-0'>All</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="box">
                  <div className="box-body">
                    <div className='dataTables_wrapper'>
                      <div className="row mb-3">
                        <div className="col-sm-12 col-md-6 d-flex">
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
                        <div className="col-sm-12 col-md-6">
                          <div id="example5_filter" className="dataTables_filter">
                            <label>Search:
                              <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle />
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => setStateData({sType: 'Regular'})} active={sType == 'Regular'}>Regular</Dropdown.Item>
                                  <Dropdown.Item onClick={() => setStateData({sType: 'Marketing'})} active={sType == 'Marketing'}>Marketing</Dropdown.Item>
                                  <Dropdown.Item onClick={() => setStateData({sType: 'All'})} active={sType == 'All'}>Both</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                              <input type="search" className="form-control form-control-sm" placeholder={'By ' + sType} value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div>

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
                      
                        {loading ? <Loader /> : leadsList && leadsList.length > 0 ?
                          <div>
                            {leadsList && leadsList.length > 0 && leadsList.map((item, i) => {
                              const refArr = item.euUID ? item.euUID.split(':') : [];
                              const refUID = refArr && refArr?.length > 1 ? refArr[1] : '';
                              const offset = new Date().getTimezoneOffset();
                              const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                              const today = moment(moment(), 'YYYY-MM-DD');

                              const expDate = item.unidExpDtStr ? moment(item.unidExpDtStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : '';
                              const usanDt = item?.unidExpDtStr && moment(item.unidExpDtStr, 'YYYY-MM-DD');
                              const usanDiffInDays = item?.unidExpDtStr ? usanDt.diff(today, 'days') : 0;
                              const usanColor = (item?.unidExpDtStr && usanDiffInDays < 1) ? 'icon-red' : (usanDiffInDays > 0 && usanDiffInDays <= 30 ? 'icon-orange' : (usanDiffInDays > 0 && usanDiffInDays > 30 ? 'icon-green' : 'icon-grey'));

                              const wrkAuthExpDtStr = item?.wrkAuthExpDtStr ? moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : 'N/A';
                              const date1 = item?.wrkAuthExpDtStr && moment(item.wrkAuthExpDtStr, 'YYYY-MM-DD');
                              const diffInDays = item?.wrkAuthExpDtStr ? date1.diff(today, 'days') : 0;
                              const divcolor = (item?.wrkAuthExpDtStr && diffInDays < 1) ? 'icon-red' : (diffInDays > 0 && diffInDays <= 30 ? 'icon-orange' : (diffInDays > 0 && diffInDays > 30 ? 'icon-green' : 'icon-grey'));

                              const prtColor = item?.priority === '031' ? 'icon-dark' : (item?.priority === '051' ? 'icon-orange' : (item?.priority === '071' ? 'icon-blue' : 'icon-grey'));
                              const years = item.tExp ? Math.floor(item.tExp / 12) : 0; const months = item.tExp ? item.tExp % 12 : 0;
                              const mYears = item.mTexp ? Math.floor(item.mTexp / 12) : 0; const mMonths = item.mTexp ? item.mTexp % 12 : 0;
                              const matData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Mentor') : [];
                              const recData = item.ua && item.ua.length ? item.ua.filter(item => item.role == 'Recruiter') : [];

                              return (
                                <div className='job-list_wrap' key={item._id}>
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
                                                {item.certificates && item.certificates.length ? <TooltipComponent position={"top"} isTemplate={false} certificates={item.certificates} /> : <div className='info-btn'>
                                                  <div className='icon-grey'><CommonTooltip type='Icon' name='' className='fas fa-medal' title={'Certificates: N/A'} display='right' /></div>
                                                </div>}
                                              </h6>
                                            </div>
                                            <div>
                                              <h5 className='padb5'>
                                                <span className='ng-star-inserted'>
                                                <a onClick={() => window.open(`/#/consultant/view/${item.euUser}`)}>{item.euName}</a>
                                                  <a onClick={() => setStateData({ infoModal: true, type: 'empInfo', empData: { title: item.euName + ' ' + '(' + refUID + ')', email: item.euEmID, mobile: item.euMobCcNum, linkedin: item.wrkUrls } })}>
                                                    <CommonTooltip type='Icon' name='' className='fas fa-info-circle ml-2' title='Info' display='top' />
                                                  </a>
                                                </span>
                                                <label className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fa-solid fa-briefcase' title='Experience' display='top' /> {(years || months) ? years + '.' + months + ' Years' : 'Fresher'}</label>
                                              </h5>
                                              <h6 className='ng-star-inserted'>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Team: ' + item.tName} display='top' /> <strong>{item.tName}</strong>
                                                </span>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fas fa-chalkboard-teacher' title='Job Title' display='right' /> {item.jobTitle || 'N/A'}
                                                </span>
                                              </h6>
                                              <h6 className='ng-star-inserted'>
                                                <span className='consultant-list-location-date ng-star-inserted'>
                                                  <div className={usanColor}>
                                                    <CommonTooltip type='Icon' name='' className='fa-regular fa-id-card' title={'USID: ' + expDate} display='right' />
                                                    <b> USID:</b> {item.unidType} / {item?.city}, {item.sCode}
                                                  </div>
                                                </span>
                                                <span className='ng-star-inserted'>
                                                  <i className='fa-solid fa-location-dot'></i> <b>Residence:</b> {item?.resCity}, {item.resScode} </span>
                                              </h6>
                                              <h6 className='ng-star-inserted'>
                                                {item.tempName && <span className='ng-star-inserted'>
                                                  <i className='fas fa-th-large'></i> <b>{item.tempName}</b> </span>}
                                              </h6>
                                              {/* <h6 className='ng-star-inserted'>
                                                <span className='ng-star-inserted'>
                                                  <CommonTooltip type='Icon' name='' className='fas fa-passport' title='Visa Status' display='right' /> <b>{item.visaStatus || 'N/A'}</b>
                                                </span>
                                                <span className='ng-star-inserted'>
                                                  <i className='fas fa-history'></i> On Boarded At: {createdDt}
                                                </span>
                                              </h6> */}
                                            </div>
                                          </div>
                                        </div>
                                        {/* <div className='jobdetails-center'>
                                          {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && <>
                                            <h5 className='ng-star-inserted'>
                                              <span className='ng-star-inserted'> Marketing Info: </span>
                                              <span className='ng-star-inserted'>
                                                <a onClick={() => setStateData({ infoModal: true, type: 'client', empData: { title: item.euName + ' ' + '(' + refUID + ')', mCurrClient: item.mCurrClient, mPrevClient: item.mPrevClient } })}>
                                                  <CommonTooltip type='Icon' name='' className='fas fa-building' title='Clients' display='right' />
                                                </a>
                                              </span>
                                              <label className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='fa-solid fa-briefcase' title='Experience' display='top' /> {(mYears || mMonths) ? mYears + '.' + mMonths + ' Years' : 'Fresher'}</label>
                                            </h5>
                                            <h6 className='ng-star-inserted'>
                                              <span className='job-title'>
                                                <CommonTooltip type='Icon' name='' className='fas fa-chalkboard-teacher' title='Job Title' display='right' /> <b>{item.mJobTitle || 'N/A'}</b>
                                              </span>
                                              <span className='ng-star-inserted'>
                                                {item.mEmail ? <a href={'mailto:' + item.mEmail} target='_blank'><CommonTooltip type='Icon' name='' className='fa-solid fa-envelope' title={'Email: ' + item.mEmail} display='right' /> </a> : <CommonTooltip type='Icon' name='' className='fa-solid fa-envelope' title={'Email: N/A'} display='right' />}
                                              </span>
                                              <span className='ng-star-inserted'>
                                                {item.mMobNum ? <a href={'tel:' + item.mMobCc + ' ' + item.mMobNum}> <CommonTooltip type='Icon' name='' className='fa-solid fa-phone' title={'Phone #: ' + item.mMobCc + ' ' + item.mMobNum} display='right' /> </a> : <CommonTooltip type='Icon' name='' className='fa-solid fa-phone' title={'Phone #: N/A'} display='right' />}
                                              </span>
                                              <span className='ng-star-inserted'>
                                                {item.mWrkUrls && item.mWrkUrls.length ? <a href={item.mWrkUrls[0].startsWith("https://") || item.mWrkUrls[0].startsWith("http://") ? item.mWrkUrls[0] : `https://${item.mWrkUrls[0]}`} target='_blank'><CommonTooltip type='Icon' name='' className='fa-brands fa-linkedin' title={'LinkedIn: ' + item.mWrkUrls[0]} display='right' /> </a> : <CommonTooltip type='Icon' name='' className='fa-brands fa-linkedin' title={'LinkedIn: N/A'} display='right' />}
                                              </span>
                                              <span className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='fas fa-passport' title={'Visa Status'} display='right' /> <b>{item.mVisaStatus || 'N/A'}</b>
                                              </span>
                                            </h6>
                                          </>}
                                          <h6 className='ng-star-inserted'>
                                            <span className='ng-star-inserted'>
                                              <span>
                                                <CommonTooltip type='Icon' name='' className='fas fa-user-tie me-2' title={'Team'} display='right' />
                                                {matData && matData.length ? matData.map((item1, index, arr) => <a title='Mentor' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>) : ''}
                                              </span>
                                              {recData && recData.length ? <span>
                                                {recData.map((item1, index, arr) => <a title='Recruiter' key={index} onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item1.name, email: item1.emID, mobile: item1.deskCcNum, extn: item1.deskNumExtn ? `Extn: ${item1.deskNumExtn} ` : '' } })}>{(index < arr.length - 1) ? item1.name + ', ' : item1.name} </a>)}
                                              </span> : ''}
                                              <span className='ng-star-inserted'>
                                                <a onClick={() => setStateData({ infoModal: true, type: 'users', empData: { title: item.euName + ' ' + '(' + refUID + ')' }, usrsData: item.ua })} > <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Leads'} display='right' /></a>
                                              </span>
                                            </span>
                                          </h6>
                                        </div> */}
                                        <div className='jobdetails-right'>
                                          <div className='rightside-btns'>
                                            {((rolesObj?.access?.length >= 11 && (rolesObj?.access[10]?.actions[11]?.isAlwd)) || rolesObj?.appAcc) &&
                                              <button className='btn btn-sm btn-primary me-1' onClick={() => handleStatus(item, 'Background Verification')} data-bs-toggle='tooltip'
                                              title='Send To Bgv'><i className='fa-solid fa-bullhorn'></i></button>}
                                            {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[1]?.isAlwd) || rolesObj?.appAcc)
                                              && <button className='btn btn-sm btn-info me-1' onClick={() => setStateData({showNotes: true, leadView: item})} data-bs-toggle='tooltip'
                                                title='Notes'><i className='fa-solid fa-notes-medical'></i></button>}
                                            {((rolesObj?.access?.length >= 11 && (rolesObj?.access[10]?.actions[1]?.isAlwd)) || rolesObj?.appAcc) &&
                                              <div className="dropdown" ref={(el) => cndtRef[item._id] = el}>
                                                <a className="btn btn-xs btn-danger me-1" onClick={() => handleCndtMenu(item._id)} data-toggle="dropdown"><i className="fas fa-ellipsis" ></i></a>
                                                <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': cndtShow === item._id })}>
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleStatus(item, 'Background Verification')} data-bs-toggle="tooltip" title="Send to Bgv"><i className="fa-solid fa-bullhorn"></i>Send to Bgv</a>}
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/consultants/placed/view/${item.euUser}`)} data-bs-toggle="tooltip" title="View Candidate Details"><i className="fa-regular fa-eye"></i>View Details</a>}
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleStatus(item, 'Terminated')} data-bs-toggle="tooltip" title="Terminated"><i className="fa-solid fa-user-xmark"></i>Terminated</a>}
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ leadLfcModal: true, leadView: item })} data-bs-toggle="tooltip"
                                                    title="Lifecycle"><i className='fa-solid fa-rotate'></i>Lifecycle</a>}
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' data-bs-toggle="tooltip" onClick={() => setStateData({showNotes: true, leadView: item})} title="Notes"><i className='fa-solid fa-notes-medical'></i>Notes</a>}
                                                  {((rolesObj?.access?.length >= 11 && rolesObj?.access[10]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' data-bs-toggle="tooltip" onClick={() => handlePlcdInMarketing(item)} title="Placed Meeting"><i className='fa-regular fa-handshake'></i>Meetings</a>}
                                                </div>
                                              </div>}
                                          </div>
                                          <div className={`${(item.wStatus == 'Approved' || item.wStatus == 'Job Ended') ? 'badge badge-primary' : item.wStatus == 'Placed' ? 'badge badge-success' : (item.wStatus == 'Terminated' || item.wStatus == 'Job Ended Terminated') ? 'badge badge-danger' : (item.wStatus == 'Trainy' || item.wStatus == 'Job Ended Trainy') ? 'badge badge-warning' : (item.wStatus == 'In Marketing' || item.wStatus == 'Job Ended Marketing') ? 'badge badge-secondary' : 'badge badge-dark'}`}><i className='fas fa-tasks'></i>  {item.wStatus}</div>
                                            <div className={prtColor} onClick={() => setStateData({ prModal: true, leadView: item, priority: setPriority(item?.priority) || '' })}>
                                              <CommonTooltip type='Icon' name='' className='fa-solid fa-star mt-2' title={'Priority: ' + (item?.priority ? getPriority(item.priority) : 'N/A')} display='top' />
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
                          </div>}
                      </div>
                      {leadsListCount && leadsListCount > 0 ?
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div className="dataTables_info" id="example5_info" role="status" aria-live="polite">Showing {leftCount} to {data} of {leadsListCount} entries</div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={leadsListCount}
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
        </div>
      </div>
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
                  <i className='fa-solid fa-envelope'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a> </span>
              </h6>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-brands fa-linkedin'></i> {empData?.linkedin?.length ? <a href={empData.linkedin[0]} target='_blank'>{empData.linkedin[0]}</a> : 'N/A'}
                </span>
              </h6>
            </div>}

          {type == 'mentor' &&
            <div className='jobdetails-left'>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-envelope'></i> {empData.name} </span>
              </h6>
              <h6>
                <span className='ng-star-inserted'>
                  <i className='fa-solid fa-phone'></i> <a href={'mailto: ' + empData.email}>{empData.email}</a>
                </span>
              </h6>
              {empData.mobile && <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <i className='fa-brands fa-linkedin'></i> {empData.mobile} {empData.extn}</span>
              </h6>}
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
        </Modal.Body>
      </Modal>

      <Modal show={prModal} onHide={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false })} size='md' centered>
        <Modal.Header closeButton>
          <h6 className='mb-0'>Priority Update</h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='form-group'>
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
            <Button type='button' className='btn btn-danger me-2' disabled={disabled} onClick={() => setStateData({ prModal: false, errMsg: '', priority: '', disabled: false })}>Close</Button>
            <Button type='button' className='btn btn-success' disabled={disabled} onClick={handlePrClick}>Update</Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={statusModal} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <h5 className='mb-0'>Placed Status Update </h5>
        </Modal.Header>
        <Modal.Body>
          <div className='user-view'>
            <ul className='list-unstyled clearfix'>
              <li className='w-md-p30 float-left'>
                <label>Name</label>
                <p className='font-weight-500 mb-0'>{leadView.euName}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label>Phone Number</label>
                <p className='font-weight-500 mb-0'>{leadView.euMobCcNum}</p>
              </li>
            </ul>
            <ul className='list-unstyled clearfix bg-grey'>
              <li className='w-md-p30 float-left'>
                <label>Email</label>
                <p className='font-weight-500 mb-0'>{leadView.euEmID}</p>
              </li>
              <li className='w-md-p30 float-left'>
                <label>Current Status</label>
                <p className='font-weight-500 mb-0'><div className={`${(leadView.wStatus == 'Approved' || leadView.wStatus == 'Job Ended') ? 'badge badge-primary-light' : leadView.wStatus == 'Placed' ? 'badge badge-success-light' : (leadView.wStatus == 'Terminated' || leadView.wStatus == 'Job Ended Terminated') ? 'badge badge-danger-light' : (leadView.wStatus == 'Trainy' || leadView.wStatus == 'Job Ended Trainy') ? 'badge badge-warning-light' : (leadView.wStatus == 'In Marketing' || leadView.wStatus == 'Job Ended Marketing') ? 'badge badge-secondary-light' : 'badge badge-dark'}`}> {leadView.wStatus} </div></p>
              </li>
            </ul>
          </div>
          {/* <form> */}
          <div className='row'>
            {<div className='col-md-5'>
              <div className='form-group'>
                <label className='form-lable'>New Status</label><span className='text-danger'>*</span>
                <select className='form-select form-control' name='orgCode' value={wStatus} onChange={(e) => setStateData({ wStatus: e.target.value, errMsg: '' })}>
                  <option value={wStatus}>{wStatus}</option>
                </select>
              </div>
            </div>}
            {<div className='col-md-7'>
              <div className='form-group'>
                <label className='form-lable'>Notes</label><span className='text-danger'>*</span>
                <textarea className='form-control form-control-sm' placeholder='Notes' aria-controls='example5' value={notes} onKeyPress={handleKeyInput} onChange={(e) => setStateData({ notes: e.target.value, errMsg: '' })} />
              </div>
            </div>}
            {/* {wStatus == 'In Marketing' &&
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='form-lable'>Assing to Recruiter</label><span className='text-danger'>*</span>
                  <select className='form-select' value={recruiter} onChange={(e) => setStateData({ recruiter: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    {recruitersList && recruitersList.length > 0 && recruitersList.map((item, i) => <option key={i} value={item._id}>{item.name + '(' + item.refUID.split(':')[1] + ')'}</option>)}
                  </select>
                </div>
              </div>} */}
            {/* {leadView.wStatus == 'Job Ended' && (wStatus == 'Job Ended Trainy' || wStatus == 'Send To Marketing') &&
              <div className='col-md-6'>
                <div className='form-group'>
                  <label className='form-lable'>Assing to Mentor</label><span className='text-danger'>*</span>
                  <select className='form-select' value={mentor} onChange={(e) => setStateData({ mentor: e.target.value, errMsg: '' })}>
                    <option value=''>Select</option>
                    {mentorsList && mentorsList.length > 0 && mentorsList.map((item, i) => <option key={i} value={item._id}>{item.name}</option>)}
                  </select>
                </div>
              </div>} */}
            {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && <>
              <div><strong>Marketing Info: </strong></div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Email:</label>{(wStatus == 'Send To Marketing') && <span className='text-danger'>*</span>}
                    <input type='text' disabled={wStatus=='Background Verification'} className='form-control' placeholder='Email' value={email} onChange={(e) => setStateData({ email: e.target.value.toLowerCase().trim(), errMsg: '' })} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Mob Number:</label>{(wStatus == 'Send To Marketing') && <span className='text-danger'>*</span>}
                    <div className='d-flex'>
                      <select className='form-select form-control' disabled={wStatus=='Background Verification'} name='mobCc' value={mobCc} onChange={(e) => setStateData({ mobCc: e.target.value })} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                        <option value='+1'>+1</option>
                        <option value='+91'>+91</option>
                      </select>
                      <input type='text' disabled={wStatus=='Background Verification'} className='form-control' placeholder='Mob Number' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={(e) => setStateData({ mobNum: e.target.value, errMsg: '' })} style={{ borderBottomLeftRadius: 0, borderTopLeftRadius: 0 }} />
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Visa Status:</label>{(wStatus == 'Send To Marketing') && <span className='text-danger'>*</span>}
                    <select className='form-select' id='participants6' disabled={wStatus=='Background Verification'} value={visaStatus} onChange={(e) => setStateData({ visaStatus: e.target.value, errMsg: '' })}>
                      <option value=''>Select Visa Status</option>
                      <option value='CPT'>CPT</option>
                      <option value='OPT'>OPT</option>
                      <option value='Stem OPT'>Stem OPT</option>
                      <option value='H1B'>H1B</option>
                      <option value='H4EAD'>H4 EAD</option>
                      <option value='H4'>H4</option>
                      <option value='GCEAD'>GC EAD</option>
                      <option value='GC'>GC</option>
                      <option value='L2'>L2</option>
                      <option value='Citizen'>Citizen</option>
                      <option value='Canadian'>Canadian</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Job Title:</label>{(wStatus == 'Send To Marketing') && <span className='text-danger'>*</span>}
                    <div className='d-flex'>
                      <Select
                        isClearable
                        placeholder="Select an option"
                        options={cmnJbTitleArr}
                        isDisabled={wStatus=='Background Verification'}
                        value={jobTitle || null}
                        onChange={(data) => setStateData({ jobTitle: data, errMsg: '' })}
                        className='w-100'
                      />
                      <button  disabled={wStatus=='Background Verification'} onClick={() => setStateData({ cmnModal: true, cmnType: 'Job Title' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Experience:</label>{wStatus == 'Send To Marketing' && <span className='text-danger'>*</span>}
                    <div className='row'>
                      <div className='col-md-6'>
                        {/* <label>Years</label> */}
                        <Select options={years} value={expYrs} isDisabled={wStatus=='Background Verification'}
                          onChange={(data) => setStateData({ expYrs: data, errMsg: '' })} />
                      </div>
                      <div className='col-md-6'>
                        {/* <label>Months</label> */}
                        <Select defaultValue={months && months[1]} options={months} value={expMonths} isDisabled={wStatus=='Background Verification'}
                          onChange={(data) => setStateData({ expMonths: data, errMsg: '' })} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>LinkedIn URL:</label>{(wStatus == 'Send To Marketing') && <span className='text-danger'>*</span>}
                    <input type='url' className='form-control'disabled={wStatus=='Background Verification'} value={linkedIn} placeholder='https://www.linkedin.com/' onChange={(e) => setStateData({ linkedIn: e.target.value, errMsg: '' })} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Current Client:</label>
                    <input type='text' className='form-control' disabled={wStatus=='Background Verification'} value={currentClient} placeholder='Current Client' onChange={(e) => setStateData({ currentClient: firstCharCaps(e.target.value), errMsg: '' })} />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label className='form-lable'>Previous Client:</label>
                    <input type='text' className='form-control' disabled={wStatus=='Background Verification'} value={previousClient} placeholder='Previous Client' onChange={(e) => setStateData({ previousClient: firstCharCaps(e.target.value), errMsg: '' })} />
                  </div>
                </div>
              </div></>}
            <div className='text-center text-danger'>{errMsg}</div>
            <div className='text-center text-success'>{succMsg}</div>
          </div>
          <div className='text-end'>
            <button type='button' className='btn btn-danger me-2' disabled={disabled} onClick={handleClose}>Close</button>
            {<button type='button' className='btn btn-success' disabled={disabled} onClick={handleStatusUpdate}>Update</button>}
          </div>
          {/* </form> */}
        </Modal.Body>
      </Modal>
      <CommonDropdownComponent
        title={`${cmnType === 'Skill' ? 'Skill' : 'Job Title'}`}
        show={cmnModal} name={cmnValue} errMsg={cmnErrMsg}
        onChange={(e) => setStateData({ cmnValue: initCaps(e.target.value), cmnErrMsg: '' })}
        onHide={() => setStateData({ cmnModal: false, cmnValue: '', cmnErrMsg: '' })}
        onClick={() => handleCreateSkill(cmnType === 'Skill' ? 'Skill' : 'Job Title')}
      />
      <FooterComponent />
    </div>
  )
}

export default PlacedCndtsListComponent;
