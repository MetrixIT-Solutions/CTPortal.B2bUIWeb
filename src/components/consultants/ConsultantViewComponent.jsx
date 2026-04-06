/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useState, useEffect } from 'react';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import { Accordion } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Loader from '../loader/loader';
import CommonTooltip from '../common/CommonTooltip';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, Element  } from "react-scroll";
import classnames from 'classnames';
import moment from 'moment';
import NoData from "../../assets/images/no-data.svg";

import ConsutantPopupsComponent from './ConsultantPopupsComponent';
import PersonalInfoTabComponent from './PersonalInfoTabComponent';
import PassportDetailsComponent from './PassportDetailsComponent';
import EmergencyContactTabComponent from './EmergencyContactTabComponent';
import USAIssuedIDComponent from './USAIssuedIDComponent';
import WorkAuthorizationTabComponent from './WorkAuthorizationTabComponent';
import EducationTabComponent from './EducationTabComponent';
import CertificationsTabComponent from './CertificationsTabComponent';
import ExperienceTabComponent from './ExperienceTabComponent';
import ResidentialAddressTabComponent from './ResidentialAddressTabComponent';
import EmployersDetailsTabComponent from './EmployersDetailsTabComponent';
// import ExpirationDatesComponent from './ExpirationDatesComponent';
import { FooterComponent } from '../footer';
import ExpirationPopup from '../../containers/consultants/ExpirationPopup';
import ExprtnsIdsList from '../../containers/expiration/ExprtnsIdsList';
// import JobDetailsComponent from './JobDetailsComponent';
// import InsuranceTabComponent from './InsuranceTabComponent';
// import IdsTabComponent from './IdsTabComponent';
// import DocumentsTabComponent from './DocumentsTabComponent';
import GoalsTab from '../../containers/consultants/GoalsTab';
// import CasesTabComponent from './CasesTabComponent';

const ConsultantViewComponent = (props) => {  
  const { rolesObj, userData, cnsltantView, address, profile, workAuths, wrkExps, education, certifications, uAddress, loading, leadView, showSsn, actTab, cnsltntsShow, deleteModal, goalModal, statusModal, passwordModal, resetPasswordModal, consultantData, password, showPassword, confirmPassword, showConfirmPassword, sucMsg, errMsg, exprActList, count} = props.state;
  const { handleInvView, handleStatus, handleShowSsn, setStateData, handleCnsltntsMenu, handleConsultantDelete, handleStatusUpdate, handleResetPassword, handleChangePassword, changePaswword, sendPwdLink, changeConfirmPassWord, handlePasswordShowHide, handleConfirmPasswordShowHide, handleClickOutside, cnsltntsRef, handleShowMoreData, getExprActList, handleGoalsModal, handleChangeLimit } = props;
  const [eKey, setEKey] = useState('1');
  const [type, setType] = useState('');
  const [gStatus, setGStatus] = useState('All');
  // const dob = profile.dobStr ? moment(profile.dobStr).format('DD MMM, YYYY') : '';
  // const issuedDate = profile.unidIssDt ? moment(profile.unidIssDt).format('DD MMM, YYYY') : '';
  // const Expiry = profile.unidExpDt ? moment(profile.unidExpDt).format('DD MMM, YYYY') : '';
  // const visaStDt = workAuths.visaStDtStr ? moment(workAuths.visaStDtStr).format('DD MMM, YYYY') : '';
  // const visaExpDt = workAuths.visaExpDtStr ? moment(workAuths.visaExpDtStr).format('DD MMM, YYYY') : '';
  // const cardExpDt = workAuths.cardExpDtStr ? moment(workAuths.cardExpDtStr).format('DD MMM, YYYY') : '';
  // const li94Num = workAuths.li94Num ? workAuths.li94Num : '';
  // const i94ExpDt = workAuths.i94ExpDtStr ? moment(workAuths.i94ExpDtStr).format('DD MMM, YYYY') : '';
  // const wrkAuthExpDt = workAuths.wrkAuthExpDt ? moment(workAuths.wrkAuthExpDt).format('DD MMM, YYYY') : '';
  // const psprtIssDt = workAuths.psprtIssDt ? moment(workAuths.psprtIssDt).format('DD MMM, YYYY') : '';
  // const psprtExpDt = workAuths.psprtExpDt ? moment(workAuths.psprtExpDt).format('DD MMM, YYYY') : '';
  // const ssnStatus = showSsn ? (profile.ssn) : (profile.ssn ? (profile.ssn?.length > 4 ? `${'x'.repeat(profile.ssn.length - 4)}${profile.ssn.slice(-4)}` : profile.ssn) : 'SSN Expected');
  const location = useLocation();
  const refArr = cnsltantView.refUID ? cnsltantView.refUID.split(':') : [];
  const refUID = refArr && refArr.length > 0 ? refArr[1] : '';
    (wrkExps.expYears == 0 && wrkExps.expMonths == 0) || (!wrkExps.expYears && !wrkExps.expMonths)
      ? 'No Experience'
      : wrkExps.expYears == 0
        ? `${wrkExps.expMonths} Months`
        : wrkExps.expMonths == 0
          ? `${wrkExps.expYears} Years`
          : `${wrkExps.expYears} Years ${wrkExps.expMonths} Months`;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // const offset = new Date().getTimezoneOffset();
  // const cDate = cnsltantView.cDtStr ? moment(cnsltantView.cDtStr , 'YYYY-MM-DD HH:mm:ss').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm') : '';

  const handleChangeTab = (actTab) =>{
    setStateData({actTab});
    actTab == 'expiration' ? setEKey('13') : actTab == 'personal' ? setEKey('1') : actTab == 'goals' ? (setEKey('20'), setGStatus('All')) : setEKey('19');
  }
  const handleExpChangeAcc = (key) => setEKey(key);

  const handleExpratinType = (key, type) => {
    setEKey(key)
    setType(type)
  }

  const handleGoalChange = (key, type) => {
    setEKey(key)
    setGStatus(type)
  }
  const expK = ((rolesObj?.access?.length >= 18 && ((rolesObj?.access[17]?.actions[3]?.isAlwd || rolesObj?.access[17]?.actions[6]?.isAlwd) || rolesObj?.access[17]?.actions[9]?.isAlwd || rolesObj?.access[17]?.actions[12]?.isAlwd || rolesObj?.access[17]?.actions[15]?.isAlwd || rolesObj?.access[17]?.actions[18]?.isAlwd)) || rolesObj?.appAcc);
  const expIds = (rolesObj?.access?.length >= 18 && ((rolesObj?.access[17]?.actions[21]?.isAlwd)) || rolesObj?.appAcc);
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='consultant-main'>
            {/* <div className='content-header'>
              <div className='d-flex align-items-center'>
                {location.pathname.includes('placed') ? <h3 className='page-title'>Placed</h3> : location.pathname.includes('terminated') ?
                  <h3 className='page-title'>Terminated</h3> : location.pathname.includes('inmarketing') ? <h3 className='page-title'>In Marketing View</h3> : location.pathname.includes('onboarding') ? <h3 className='page-title'>On Boarding View</h3> : <h3 className='page-title'>Consultants View</h3>}
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'>
                        <a>
                          <i className='fa-solid fa-home'></i>
                        </a>
                      </li>
                      {location.pathname.includes('placed') ?
                        (<li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants/terminated')} aria-current='page'>
                          Placed
                        </li>) :
                        location.pathname.includes('terminated') ?
                          (<li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants/terminated')} aria-current='page'>
                            Terminated
                          </li>) :
                          location.pathname.includes('inmarketing') ?
                            (<li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants/inmarketing')} aria-current='page'>
                              In Marketing
                            </li>) :
                            location.pathname.includes('onboarding') ? (
                              <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants/onboarding')} aria-current='page'>
                                On Boarding
                              </li>
                            ) : (
                              <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants')} aria-current='page'>
                                Consultants
                              </li>
                            )}
                      <li className='breadcrumb-item active' aria-current='page'>
                        View
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div> */}
            <div className='box mb-1'>
              <div className='box-body'>
                <div className='d-flex justify-content-between'>
                  <div className='back'>
                    <a onClick={() => (location.pathname.includes('placed') ? hashHistory.push('/consultants/placed') : location.pathname.includes('terminated') ?
                      hashHistory.push('/consultants/terminated') : location.pathname.includes('inmarketing') ? hashHistory.push('/consultants/inmarketing') : location.pathname.includes('onboarding') ? hashHistory.push('/consultants/onboarding') : hashHistory.push('/consultants'))}>
                      <i className="fa-solid fa-arrow-left"></i>
                    </a>
                    {location.pathname.includes('placed') ? <h5 className='box-title'>Placed</h5> : location.pathname.includes('terminated') ?
                      <h5 className='box-title'>Terminated</h5> : location.pathname.includes('inmarketing') ? <h5 className='box-title'>In Marketing View</h5> : location.pathname.includes('onboarding') ? <h5 className='box-title'> On Boarding Details </h5> : <h5 className='box-title'> Consultant Details </h5>}
                  </div>
                  {location.pathname.includes('onboarding') &&
                    <div>
                      {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[7]?.isAlwd && !leadView.ofsVrfy) || (rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[8]?.isAlwd && leadView.ofsVrfy) || rolesObj?.appAcc) && leadView && leadView._id && <button className='btn btn-sm btn-success me-2' title='Trainy' onClick={() => handleStatus('Trainy')}>
                        Send To Training
                      </button>}
                      {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && leadView && leadView._id && !leadView.ofsVrfy && <button className='btn btn-sm btn-success me-2' title='Approve Marketing' onClick={() => handleStatus('Send To Marketing')}>
                        Approve Marketing
                      </button>}
                      {((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && leadView && leadView._id && leadView.ofsVrfy && <button className='btn btn-sm btn-success me-2' title='In Marketing' onClick={() => handleStatus('In Marketing')}>
                        In Marketing
                      </button>}
                    </div>}

                  {location.pathname.includes('onboarding') && ((rolesObj?.access?.length >= 9 && rolesObj?.access[8]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && cnsltantView.wStatus == 'Job Ended Send To Marketing' &&
                    <div>
                      <button className='btn btn-sm btn-success me-2' title='Job Ended Trainy' onClick={() => handleStatus('Job Ended Trainy')}>
                        Job Ended Trainy
                      </button>
                      <button className='btn btn-sm btn-success me-2' title='Job Ended Marketing' onClick={() => handleStatus('Job Ended Marketing')}>
                        Job Ended Send To Marketing
                      </button>
                    </div>}

                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[19]?.isAlwd) || rolesObj?.appAcc) &&
                    <div>
                      <button className='btn btn-sm btn-success me-2' title='Invitation View' onClick={handleInvView}>
                        Invitation View
                      </button>
                    </div>}
                </div>
              </div>
            </div>
            <div className='job-list_wrap'>
              <div className='media-content'>
                <div className='media'>
                  <div className='media-body'>
                    <div className='jobdetails-left'>
                      <div className='consultent-card'>
                        <div className='profile_image'>
                          <figure className='profile_image_wrap'>
                            <div className='icon-grey'>
                              <CommonTooltip type='Icon' name='' className='fa-solid fa-circle-user' title='Work Auth:' boldTitle='dflksdnf' display='right' />
                            </div>
                          </figure>
                        </div>
                        <div>
                          <h5 className='padb5'>
                            <div className='d-flex'>
                              <span className='ng-star-inserted'>{cnsltantView.name} ({refUID})</span>
                            </div>
                          </h5>
                          <h6 className='ng-star-inserted'>
                            <span className='consultant-list-location-date' title='Email'>
                              <CommonTooltip type='Icon' name='' className='fa-solid fa-envelope' title='Email' display='top' /> {cnsltantView.emID} </span>
                            <span className='ng-star-inserted'>
                              <CommonTooltip type='Icon' name='' className='fa-solid fa-phone' title='Phone Number' display='top' /> {cnsltantView.mobCcNum}</span>
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className='jobdetails-center'>
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <CommonTooltip type='Icon' name='' className='fas fa-passport' title='Visa Status' display='right' /> <b>{workAuths.visaStatus || 'N/A'}</b>
                        </span>
                      </h6>
                      <h6 className='ng-star-inserted'>
                        <span className='ng-star-inserted'>
                          <CommonTooltip type='Icon' name='' className='fa-solid fa-bullhorn' title='Hired On' display='right' /> <b>{'N/A'}</b>
                        </span>
                      </h6>
                    </div>
                    <div className='jobdetails-right'>
                      <div className={`${(cnsltantView.wStatus == 'Approved' || cnsltantView.wStatus == 'Job Ended') ? 'badge badge-primary' : cnsltantView.wStatus == 'Placed' ? 'badge badge-success' : (cnsltantView.wStatus == 'Terminated' || cnsltantView.wStatus == 'Job Ended Terminated') ? 'badge badge-danger' : (cnsltantView.wStatus == 'Trainy' || cnsltantView.wStatus == 'Job Ended Trainy') ? 'badge badge-warning' : (cnsltantView.wStatus == 'In Marketing' || cnsltantView.wStatus == 'Job Ended Marketing') ? 'badge badge-secondary' : 'badge badge-dark'}`}><i className='fas fa-tasks'></i>  {cnsltantView.wStatus}</div>
                        {((rolesObj?.access?.length >= 7 && (rolesObj?.access[6]?.actions[1]?.isAlwd || rolesObj?.access[6]?.actions[3]?.isAlwd || rolesObj?.access[6]?.actions[4]?.isAlwd || rolesObj?.access[6]?.actions[5]?.isAlwd || rolesObj?.access[6]?.actions[6]?.isAlwd || rolesObj?.access[6]?.actions[7]?.isAlwd)) || rolesObj?.appAcc) && 
                          <div className='dropdown mt-2' ref={(el) => cnsltntsRef[cnsltantView._id] = el} data-bs-toggle="tooltip"  title="Consultant Actions">
                          <a className='btn btn-xs btn-primary btn-circle' onClick={() => handleCnsltntsMenu(cnsltantView?._id)} data-toggle='dropdown'><i className='fas fa-ellipsis' ></i></a>
                          <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': cnsltntsShow === cnsltantView?._id })}>
                            {/* {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => hashHistory.push(`/consultant/view/${cnsltantView._id}`)} data-bs-toggle="tooltip" title="View Consultant Details"><i className='fa-regular fa-eye'></i>View Details</a>}   */}
                            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[0]?.isAlwd) || rolesObj?.appAcc) && (location.pathname.includes('/consultant/view/')) && <a className='dropdown-item' onClick={() =>  hashHistory.push('/consultants')} data-bs-toggle="tooltip" title="Update Consultant Status"><i className='fa-solid fa-list'></i>List</a>}
                            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ statusModal: true, consultantData: cnsltantView, cnsltntsShow: '' })} data-bs-toggle="tooltip" title="Update Consultant Status"><i className='fa-solid fa-arrows-rotate'></i>Status Update</a>}
                            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ deleteModal: true, consultantData: cnsltantView, cnsltntsShow: '' })} data-bs-toggle="tooltip" title="Delete Consultant"><i className="fa-regular fa-trash-can"></i>Delete</a>}
                            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ passwordModal: true, consultantData: cnsltantView, password: '', confirmPassword: '', cnsltntsShow: '', sucMsg: '' })} data-bs-toggle="tooltip" title="Change Consultant Password if Necessary"><i className='fa-solid fa-key'></i>Change Password</a>}
                            {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => sendPwdLink(cnsltantView)} data-bs-toggle="tooltip" title="Send Reset Password Link on Request"><i className='fa-solid fa-key'></i>Reset Password</a>}
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
                <div className='profile-details-sec-bottom'>
                  <div className='profile-subdetails'>
                    <ul className="row">
                      <li className="col ng-star-inserted">
                        <label>
                          <span className="marr15">Referred By</span>{cnsltantView.refByName}
                          <div className="pad0 d-inline-block ng-star-inserted dropdown">
                          </div>
                        </label>
                      </li>
                      <li className="col ng-star-inserted">
                        <label className="profile_content marb0 no-box-shadow ng-star-inserted"><span>Lead Name</span>
                          {cnsltantView.rprtName}
                        </label>
                      </li>
                      {/* <li className="col ng-star-inserted">
                        <label><span>Registered On</span>{cDate}</label>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-2 col-md-2 col-12'>
              <div className='box side-box'>
                {actTab == 'personal' && <ul>
                  <li>
                    <Link to="section1" smooth={true} duration={500} className={eKey == '1' ? "active" : ''} offset={-295} onClick={() => setEKey('1')}>
                      Personal Info
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="section2" smooth={true} duration={500} className={eKey == '2' ? "active" : ''} offset={-470} onClick={() => setEKey('2')}>
                      Job details
                    </Link>
                  </li> */}
                  <li>
                    <Link to="section3" smooth={true} duration={500} className={eKey == '3' ? "active" : ''} offset={-470} onClick={() => setEKey('3')}>
                      Passport details
                    </Link>
                  </li>
                  <li>
                    <Link to="section4" smooth={true} duration={500} className={eKey == '4' ? "active" : ''} offset={-470} onClick={() => setEKey('4')}>
                      Emergency Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="section5" smooth={true} duration={500} className={eKey == '5' ? "active" : ''} offset={-470} onClick={() => setEKey('5')}>
                      USA Issued ID
                    </Link>
                  </li>
                  <li>
                    <Link to="section6" smooth={true} duration={500} className={eKey == '6' ? "active" : ''} offset={-470} onClick={() => setEKey('6')}>
                      Work Authorization
                    </Link>
                  </li>
                  <li>
                    <Link to="section7" smooth={true} duration={500} className={eKey == '7' ? "active" : ''} offset={-470} onClick={() => setEKey('7')}>
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link to="section8" smooth={true} duration={500} className={eKey == '8' ? "active" : ''} offset={-470} onClick={() => setEKey('8')}>
                      Certifications
                    </Link>
                  </li>
                  <li>
                    <Link to="section9" smooth={true} duration={500} className={eKey == '9' ? "active" : ''} offset={-470} onClick={() => setEKey('9')}>
                      Experience
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="section10" smooth={true} duration={500} className={eKey == '10' ? "active" : ''} offset={-470} onClick={() => setEKey('10')}>
                      Insurance
                    </Link>
                  </li> */}
                  <li>
                    <Link to="section11" smooth={true} duration={500} className={eKey == '11' ? "active" : ''} offset={-470} onClick={() => setEKey('11')}>
                      Residential Address
                    </Link>
                  </li>
                  <li>
                    <Link to="section12" smooth={true} duration={500} className={eKey == '12' ? "active" : ''} offset={-470} onClick={() => setEKey('12')}>
                      Employers Details
                    </Link>
                  </li>
                </ul>}

                {/* =================== */}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section13' smooth={true} duration={500} className={eKey == '13' ? 'active' : ''} offset={-470} onClick={() => setEKey('13')}>
                      i-94s
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section14' smooth={true} duration={500} className={eKey == '14' ? 'active' : ''} offset={-470} onClick={() => setEKey('14')}>
                      USA Visa Documents
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section15' smooth={true} duration={500} className={eKey == '15' ? 'active' : ''} offset={-470} onClick={() => setEKey('15')}>
                      Passports
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[12]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section16' smooth={true} duration={500} className={eKey == '16' ? 'active' : ''} offset={-470} onClick={() => setEKey('16')}>
                      Work Authorizations
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section17' smooth={true} duration={500} className={eKey == '17' ? 'active' : ''} offset={-470} onClick={() => setEKey('17')}>
                      USA Issued National IDs
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'expiration' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[18]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section18' smooth={true} duration={500} className={eKey == '18' ? 'active' : ''} offset={-470} onClick={() => setEKey('18')}>
                      SSN
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section19' smooth={true} duration={500} className={eKey == '19' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('19', '')}>
                      All
                    </Link>
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section13' smooth={true} duration={500} className={eKey == '20' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('20', 'i94')}>
                      i-94s
                    </Link>
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section14' smooth={true} duration={500} className={eKey == '21' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('21', 'Visa')}>
                      USA Visa Documents
                    </Link>
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section15' smooth={true} duration={500} className={eKey == '22' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('22', 'Passport')}>
                      Passports
                    </Link>
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section16' smooth={true} duration={500} className={eKey == '23' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('23', 'WrkAuth')}>
                      Work Authorizations
                    </Link>
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                  {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && (
                    <Link to='section17' smooth={true} duration={500} className={eKey == '24' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('24', 'USid')}>
                      USA Issued National IDs
                    </Link>
                  )}
                    </li>
                  </ul>
                )}
                {actTab == 'ids' && (
                  <ul>
                    <li>
                    <Link to='section18' smooth={true} duration={500} className={eKey == '25' ? 'active' : ''} offset={-470} onClick={() => handleExpratinType('25', 'SSN')}>
                      SSN
                    </Link>
                    </li>
                  </ul>
                )}

                {/* =========================== */}

                {actTab == 'goals' && (
                  <ul>
                    <li>
                      <Link to='section24' smooth={true} duration={500} className={eKey == '20' ? 'active' : ''} offset={-470} onClick={() => handleGoalChange('20', 'All')}>
                        All
                      </Link>
                    </li>
                    <li>
                      <Link to='section19' smooth={true} duration={500} className={eKey == '21' ? 'active' : ''} offset={-470} onClick={() => handleGoalChange('21', 'In Progress')}>
                        In Progress
                      </Link>
                    </li>
                    <li>
                      <Link to='section21' smooth={true} duration={500} className={eKey == '22' ? 'active' : ''} offset={-470} onClick={() => handleGoalChange('22', 'Not Started')}>
                        Not Started
                      </Link>
                    </li>
                    <li>
                      <Link to='section22' smooth={true} duration={500} className={eKey == '23' ? 'active' : ''} offset={-470} onClick={() => handleGoalChange('23', 'Completed')}>
                      Completed
                      </Link>
                    </li>
                    <li>
                      <Link to='section23' smooth={true} duration={500} className={eKey == '24' ? 'active' : ''} offset={-470} onClick={() => handleGoalChange('24', 'Reviewed')}>
                        Reviewed
                      </Link>
                    </li>
                  </ul>
                )}
              {/* =========================== */}
              
              </div>
            </div>
            <div className='col-xl-10 col-md-10 col-12'>
              <section className='content'>
                <div className='row'>
                  <div className='col-12 col-lg-7 col-xl-12'>
                    <div className='mt-2'>
                      <div>
                        <Tabs
                          activeKey={actTab}
                          id="uncontrolled-tab-example"
                          className="mb-2"
                          onSelect={handleChangeTab}
                        >
                          <Tab eventKey="personal" title="Personal Info">
                            {loading ? <div aria-colspan={6}><Loader /></div> :
                              <Accordion defaultActiveKey={['1']} activeKey={[eKey]} onSelect={(eventKey) => setEKey(eventKey)}>
                                {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[8]?.isAlwd) || rolesObj?.appAcc) &&
                                  <Element name="section1" className="section">
                                    <Accordion.Item eventKey='1'>
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Personal Info</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <PersonalInfoTabComponent userData={userData} cnsltantView = {cnsltantView} profile={profile} handleShowSsn={handleShowSsn} showSsn= {showSsn} />
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Element>}

                                {/* <Element name="section2" className="section">
                                  <Accordion.Item eventKey='2'>
                                    <Accordion.Header>
                                      <h6 className='mb-0'>Job details</h6>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                      <JobDetailsComponent />
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Element> */}

                                <Element name="section3" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[13]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="3">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Passport details</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <PassportDetailsComponent workAuths={workAuths} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section4" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[9]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="4">
                                      <Accordion.Header>
                                        <h6 className='mb-0'> Emergency Contact</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <EmergencyContactTabComponent profile={profile} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section5" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[11]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="5">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>USA Issued ID</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <USAIssuedIDComponent profile={profile} uAddress={uAddress} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section6" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[12]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="6">
                                      <Accordion.Header>
                                        <h6 className='mb-0'> Work Authorization</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <WorkAuthorizationTabComponent workAuths={workAuths} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section7" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[14]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="7">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Education</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <EducationTabComponent education={education} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section8" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[14]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="8">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Certifications</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <CertificationsTabComponent certifications={certifications} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section9" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[15]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="9">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Experience</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <ExperienceTabComponent wrkExps={wrkExps} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                {/* <Element name="section10" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="10">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Insurance</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <InsuranceTabComponent />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element> */}

                                <Element name="section11" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[10]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="11">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Residential Address</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <ResidentialAddressTabComponent address={address} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>

                                <Element name="section12" className="element">
                                  {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[16]?.isAlwd) || rolesObj?.appAcc) &&
                                    <Accordion.Item eventKey="12">
                                      <Accordion.Header>
                                        <h6 className='mb-0'>Employers Details</h6>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <EmployersDetailsTabComponent wrkExps={wrkExps} />
                                      </Accordion.Body>
                                    </Accordion.Item>}
                                </Element>
                              </Accordion>}
                          </Tab>
                          
                          {/* <Tab eventKey="ids" title="ID's">
                            <IdsTabComponent />
                          </Tab> */}

                          <Tab eventKey='expiration' title='Expiration Dates'  >
                          {expK ? (
                            <ExpirationPopup state={props.state} rolesObj={rolesObj} exprActList={exprActList} handleShowMoreData={handleShowMoreData} getExprActList={getExprActList} eKey={eKey} handleExpChangeAcc={handleExpChangeAcc}/>
                            ) : (
                              <div className="no-data">
                                <img src={NoData}></img>
                                <p className="text-danger py-2">No results found </p>
                              </div>
                          )}
                          </Tab>

                          <Tab eventKey='ids' title='IDs'>
                          {expIds ? (
                            <ExprtnsIdsList eKey={eKey} type ={type} uid={cnsltantView?._id} handleExpratinType={handleExpratinType} />
                          ) : (
                              <div className="no-data">
                                <img src={NoData}></img>
                                <p className="text-danger py-2">No results found </p>
                              </div>
                          )}
                        </Tab>

                          {/* <Tab eventKey="documents" title="Documents">
                            <DocumentsTabComponent />
                          </Tab> */}

                          {/* <Tab eventKey="cases" title="Cases">
                            <CasesTabComponent />
                          </Tab> */}

                          <Tab eventKey="goals" title="Goals">
                          {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[22]?.isAlwd) || rolesObj?.appAcc) &&
                            <GoalsTab state={props.state} setStateData={setStateData} goalModal={goalModal} cnsltantView = {cnsltantView} gStatus={gStatus} rolesObj={rolesObj}/>
                          }
                          </Tab>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                  {/* /.col  */}
                </div>
                {/* /.row  */}
              </section>
            </div>
          </div>
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
  );
};

export default ConsultantViewComponent;
