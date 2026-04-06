/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';

import HeaderComponent from '../header/HeaderComponent';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import { Accordion } from 'react-bootstrap';
import Loader from '../loader/loader';
import NoData from '../../assets/images/no-data.svg';

const InvitationViewComponent = (props) => {
  const { rolesObj, invtaView, address, workAuths, wrkExps, education, certifications, isprvBtn, isrejBtn, isReopenBtn, uAddress, loading, showSsn, userData } = props.state;
  const { setStateData, approveClick, handleOpenModels, cnsFlag, handleShowSsn } = props;
  const dob = invtaView.dobStr ? moment(invtaView.dobStr).format('DD MMM, YYYY') : '';
  const issuedDate = invtaView.unidIssDtStr ? moment(invtaView.unidIssDtStr).format('DD MMM, YYYY') : '';
  const Expiry = invtaView.unidExpDtStr ? moment(invtaView.unidExpDtStr).format('DD MMM, YYYY') : '';
  const visaStDt = workAuths.visaStDtStr ? moment(workAuths.visaStDtStr).format('DD MMM, YYYY') : '';
  const visaExpDt = workAuths.visaExpDtStr ? moment(workAuths.visaExpDtStr).format('DD MMM, YYYY') : '';
  const cardExpDt = workAuths.cardExpDtStr ? moment(workAuths.cardExpDtStr).format('DD MMM, YYYY') : '';
  const li94Num = workAuths.li94Num ? workAuths.li94Num : '';
  const i94ExpDt = workAuths.i94ExpDtStr ? moment(workAuths.i94ExpDtStr).format('DD MMM, YYYY') : '';
  const wrkAuthStartDt = workAuths.wrkAuthStrtDtStr ? moment(workAuths.wrkAuthStrtDtStr).format('DD MMM, YYYY') : '';
  const wrkAuthExpDt = workAuths.wrkAuthExpDtStr ? moment(workAuths.wrkAuthExpDtStr).format('DD MMM, YYYY') : '';
  const psprtIssDt = workAuths.psprtIssDtStr ? moment(workAuths.psprtIssDtStr).format('DD MMM, YYYY') : '';
  const psprtExpDt = workAuths.psprtExpDtStr ? moment(workAuths.psprtExpDtStr).format('DD MMM, YYYY') : '';
  const ssnExpDt = invtaView.ssnExpDtStr ? moment(invtaView.ssnExpDtStr).format('DD MMM, YYYY') : '';
  const Exprss =
    (wrkExps.expYears == 0 && wrkExps.expMonths == 0) || (!wrkExps.expYears && !wrkExps.expMonths)
      ? 'No Experience'
      : wrkExps.expYears == 0
        ? `${wrkExps.expMonths}  Months`
        : wrkExps.expMonths == 0
          ? `${wrkExps.expYears}  Years`
          : `${wrkExps.expYears}  Years  ${wrkExps.expMonths}  Months`;
  const ssnStatus = showSsn ? (invtaView.ssn) : (invtaView.ssn && invtaView.ssn.length > 4 ? `${'x'.repeat(invtaView.ssn.length - 4)}${invtaView.ssn.slice(-4)}` : invtaView.ssn);

  return (
    <div className='wrapper'>
      {!cnsFlag && <HeaderComponent />}
      {!cnsFlag && <NavComponent />}
      <div className={!cnsFlag ? 'content-wrapper' : ''}>
        <div className={!cnsFlag ? 'container-full' : ''}>
          {!cnsFlag && (
            <div className='content-header'>
              <div className='align-items-center'>
                <div className='mr-auto'>
                  <h3 className='page-title'>Invitations View</h3>
                  <div className='d-inline-block align-items-center'>
                    <nav>
                      <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                          <a href='#'>
                            <i className='fa-solid fa-home'></i>
                          </a>
                        </li>
                        <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/consultants/invitations')} aria-current='page'>
                          Invitations
                        </li>
                        <li className='breadcrumb-item active' aria-current='page'>
                          View
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-7 col-xl-12'>
                <div className='box mb-2'>
                  <div className='box-body'>
                    <div className='d-flex justify-content-between'>
                      <div className='back'>
                        <a onClick={() => hashHistory.push('/consultants/invitations')}>
                          <i className='fa-solid fa-arrow-left'></i>
                        </a>
                        <h5 className='box-title me-2'>Invitation Details </h5>
                      </div>
                      <div>
                        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isprvBtn && (
                          <button className='btn btn-sm btn-success me-2' title='Approve' onClick={() => setStateData({ statusModal: true })}>Approve</button>
                        )}
                        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isrejBtn && (
                          <button className='btn btn-sm btn-danger me-2' title='Reject' onClick={() => setStateData({ rejectModal: true })}>Reject</button>
                        )}
                        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isReopenBtn && (
                          <button className='btn btn-sm  btn-primary me-2' title='Reopen' onClick={() => setStateData({ reOpenModal: true })}>Reopen</button>
                        )}
                        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && (
                          <button className='btn btn-sm btn-secondary me-2' title='Notes' onClick={() => handleOpenModels('notes')}><i className='fa-solid fa-notes-medical'></i> Notes</button>
                        )}
                        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (
                          <button className='btn btn-sm btn-info me-2' title='Meetings' onClick={() => handleOpenModels('meetings')}><i className='fa-regular fa-handshake'></i> Meeting</button>
                        )}
                        {/* {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && (
                          <button className='btn btn-sm btn-warning me-2' onClick={() => handleOpenModels('reviewers')}><i className='fa-solid fa-comment'></i> Reviewer(s)</button>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {loading ?
                  <div className='box'>
                    <div className='box-body'>
                      <div colspan={6}>
                        <Loader />
                      </div>
                    </div>
                  </div>
                  : <Accordion defaultActiveKey='0'>
                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Personal Info</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='user-view'>
                            <ul className='list-unstyled clearfix mb-2'>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>First Name:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.fName} </p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Last Name:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.lName} </p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Email:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.emID}</p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Mobile Number:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.mobCcNum} </p>
                              </li>
                            </ul>
                            <ul className='list-unstyled clearfix mb-2 bg-grey'>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>DoB:</span>
                                <p className='font-weight-500 mb-0'> {dob} </p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Gender:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.gender}</p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Alternate Email:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.altEmID} </p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Alternate Mobile Number:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.altMobCcNum} </p>
                              </li>
                            </ul>
                            <ul className='list-unstyled clearfix mb-2'>
                              {invtaView.ssn ? <li className='w-md-p25 float-left pb-10'>
                                <span>SSN Number:</span>
                                <div className='d-flex align-items-center'>
                                  <p className='font-weight-500 mb-0'> {ssnStatus}</p>
                                  {userData.userType !== 'Employee' && <span className='eye-icon' style={{ position: 'absolute', right: 20 }} onClick={handleShowSsn}>
                                    {showSsn ? (<i className='fa fa-eye' />) : (<i className='fa fa-eye-slash' />)}
                                  </span>}
                                </div>
                              </li> : <li className='w-md-p25 float-left pb-10'>
                                <span>SSN Expected Date:</span>
                                <p className='font-weight-500 mb-0'> {ssnExpDt}</p>
                              </li>}
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Linkedin URL:</span>
                                {invtaView.wrkUrls && invtaView.wrkUrls.length ?
                                  <a href={invtaView.wrkUrls[0].startsWith('https://') || invtaView.wrkUrls[0].startsWith('http://') ? invtaView.wrkUrls[0] : `https://${invtaView.wrkUrls[0]}`} target='_blank'> <p className='font-weight-500 mb-0'>{invtaView.wrkUrls[0]} </p></a> : <p>{'N/A'} </p>}
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Marital Status:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.mStatus} </p>
                              </li>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Status:</span>
                                <p className='font-weight-500 mb-0'> {invtaView.iStatus} </p>
                              </li>
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[12]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='1'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Emergency Contact</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className='list-unstyled clearfix mb-2'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Contact Person</span>
                              <p className='font-weight-500 mb-0'> {invtaView.ecPer}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Relation</span>
                              <p className='font-weight-500 mb-0'> {invtaView.ecRelt}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Contact Number:</span>
                              <p className='font-weight-500 mb-0'> {invtaView.ecNum} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Contact Email:</span>
                              <p className='font-weight-500 mb-0'> {invtaView.ecEml} </p>
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='2'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Residential Address</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className='list-unstyled clearfix mb-2'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Country:</span>
                              <p className='font-weight-500 mb-0'> {address.country} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>State:</span>
                              <p className='font-weight-500 mb-0'> {address.state} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Address:</span>
                              <p className='font-weight-500 mb-0'> {address.hNum}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Apt/Suite:</span>
                              <p className='font-weight-500 mb-0'> {address.area}</p>
                            </li>
                          </ul>
                          <ul className='list-unstyled clearfix mb-2 bg-grey'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>City:</span>
                              <p className='font-weight-500 mb-0'> {address.city} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>ZIP Code:</span>
                              <p className='font-weight-500 mb-0'> {address.zip} </p>
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='3'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>USA Issued National ID State</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className='list-unstyled clearfix mb-2'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>National ID Type:</span>
                              <p className='font-weight-500 mb-0'> {invtaView.unidType}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>ID Number:</span>
                              <p className='font-weight-500 mb-0'> {invtaView.usaNatID}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Issued Date:</span>
                              <p className='font-weight-500 mb-0'> {issuedDate}</p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Expiry Date:</span>
                              <p className='font-weight-500 mb-0'> {Expiry}</p>
                            </li>
                          </ul>
                          {invtaView.isRes ?
                            <div className='pl-3'>
                              <input type='checkbox' disabled={true} checked={invtaView.isRes} />
                              <label> Same as Residential address</label>
                            </div>
                            : <div>
                              <ul className='list-unstyled clearfix mb-2 bg-grey'>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>Country:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.country} </p>
                                </li>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>State:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.state} </p>
                                </li>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>Address:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.hNum}</p>
                                </li>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>Apt/Suite:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.area}</p>
                                </li>
                              </ul>
                              <ul className='list-unstyled clearfix mb-2'>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>City:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.city} </p>
                                </li>
                                <li className='w-md-p25 float-left pb-10'>
                                  <span>ZIP Code:</span>
                                  <p className='font-weight-500 mb-0'> {uAddress.zip} </p>
                                </li>
                              </ul>
                            </div>}
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='4'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'> Work Authorization</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='user-view'>
                            <ul className='list-unstyled '>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Nationality:</span>
                                <p className='font-weight-500 mb-0'> {workAuths.nationality} </p>
                              </li>
                            </ul>
                            <>
                              <ul className='list-unstyled clearfix'>
                                {workAuths.nationality != 'American' && <li className='w-md-p25 float-left pb-10'>
                                  <span>Visa Status:</span>
                                  <p className='font-weight-500 mb-0'> {workAuths.visaStatus} </p>
                                </li>}
                                {workAuths.nationality != 'American' && <li className='w-md-p25 float-left pb-10'>
                                  <span>Visa Start Date:</span>
                                  <p className='font-weight-500 mb-0'> {visaStDt}</p>
                                </li>}
                                {workAuths.nationality != 'American' && <li className='w-md-p25 float-left pb-10'>
                                  <span>Visa Expiry Date:</span>
                                  <p className='font-weight-500 mb-0'> {visaExpDt} </p>
                                </li>}
                                {(workAuths.visaStatus == 'CPT' || workAuths.visaStatus == 'OPT' || workAuths.visaStatus == 'Stem OPT') && (
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Sevis Number:</span>
                                    <p className='font-weight-500 mb-0'> {workAuths.sevisNum} </p>
                                  </li>
                                )}
                                {workAuths.visaStatus == 'CPT' && (
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Position:</span>
                                    {workAuths.position && <p className='font-weight-500 mb-0'>{workAuths.position}</p>}
                                  </li>
                                )}
                                {workAuths.visaStatus == 'H1B' && workAuths.receiptNum && (
                                  <li className='w-md-p25 float-left pb-10'>
                                    <label>Receipt Number</label>
                                    {workAuths.receiptNum && <p className='font-weight-500 mb-0'>{workAuths.receiptNum}</p>}
                                  </li>
                                )}
                                {(workAuths.visaStatus == 'OPT' || workAuths.visaStatus == 'Stem OPT') && (
                                  <>
                                    {workAuths.cardNum && (
                                      <li className='w-md-p25 float-left pb-10'>
                                        <label>Card Number</label>
                                        {workAuths.cardNum && <p className='font-weight-500 mb-0'>{workAuths.cardNum}</p>}
                                      </li>
                                    )}
                                    {workAuths.cardRcptNum && (
                                      <li className='w-md-p25 float-left pb-10'>
                                        <span>Receipt Number:</span>
                                        {workAuths.cardRcptNum && <p className='font-weight-500 mb-0'> {workAuths.cardRcptNum} </p>}
                                      </li>
                                    )}
                                    {cardExpDt && (
                                      <li className='w-md-p25 float-left pb-10'>
                                        <span>Expected Date:</span>
                                        <p className='font-weight-500 mb-0'> {cardExpDt}</p>
                                      </li>
                                    )}
                                  </>
                                )}
                                {(workAuths.visaStatus == 'OPT' && workAuths.cardRcptNum) || workAuths.visaStatus == 'CPT' || workAuths.visaStatus == 'H1B' ? '' :
                                  <>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>USCIS Number:</span>
                                      <p className='font-weight-500 mb-0'> {workAuths.uscisNum} </p>
                                    </li>
                                  </>
                                }
                                {workAuths.nationality != 'American' && <li className='w-md-p25 float-left pb-10'>
                                  <span>Latest i-94:</span>
                                  <p className='font-weight-500 mb-0'> {li94Num} </p>
                                </li>}
                                {workAuths.nationality != 'American' && workAuths.visaStatus != 'OPT' && workAuths.visaStatus != 'CPT' && workAuths.visaStatus != 'Stem OPT' && workAuths.visaStatus != 'GCEAD' && workAuths.visaStatus != 'L2' && workAuths.visaStatus != 'GC' && (
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>i-94 Expiry Date:</span>
                                    <p className='font-weight-500 mb-0'> {i94ExpDt}</p>
                                  </li>
                                )}
                                {workAuths.nationality != 'American' && !workAuths.cardRcptNum && (
                                  <>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <label>{workAuths.visaStatus == 'CPT' ? 'CPT Start Date' : 'Work Authorization Start Date'}</label>
                                      {wrkAuthStartDt && <p className='font-weight-500 mb-0'>{wrkAuthStartDt}</p>}
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <label>{workAuths.visaStatus == 'CPT' ? 'CPT Expiry Date' : 'Work Authorization Expiry Date'}</label>
                                      <p className='font-weight-500 mb-0'>{wrkAuthExpDt}</p>
                                    </li>
                                  </>
                                )}
                              </ul>
                            </>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[16]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='5'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'> Passport details</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul className='list-unstyled clearfix'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Passport Number:</span>
                              <p className='font-weight-500 mb-0'> {workAuths.psprtNum} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Passport Issued Date:</span>
                              <p className='font-weight-500 mb-0'> {psprtIssDt} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Passport Expiry Date:</span>
                              <p className='font-weight-500 mb-0'> {psprtExpDt} </p>
                            </li>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Passport Issued Place:</span>
                              <p className='font-weight-500 mb-0'> {workAuths.psprtIssPlace}</p>
                            </li>
                          </ul>
                          <ul className='list-unstyled clearfix bg-grey'>
                            <li className='w-md-p25 float-left pb-10'>
                              <span>Passport File Number:</span>
                              <p className='font-weight-500 mb-0'> {workAuths.psprtDocNum} </p>
                            </li>
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[17]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='6'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Education</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          {education && education.length
                            ? education.map((item, i) => {
                              const bgg = i % 2;
                              const apply = bgg ? 'bg-grey' : '';
                              return (
                                <ul key={i} className={'list-unstyled clearfix ' + apply}>
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Degree:</span>
                                    <p className='font-weight-500 mb-0'> {item.degree} </p>
                                  </li>
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Specialization:</span>
                                    <p className='font-weight-500 mb-0'> {item.dSpcl} </p>
                                  </li>
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Degree Passout:</span>
                                    <p className='font-weight-500 mb-0'> {item.dYear}</p>
                                  </li>
                                  <li className='w-md-p25 float-left pb-10'>
                                    <span>Name of the institution:</span>
                                    <p className='font-weight-500 mb-0'> {item.noi} </p>
                                  </li>
                                </ul>
                              );
                            })
                            : ''}
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[17]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='7'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Certification</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          {certifications && certifications.length
                            ?
                            <>
                              <div className='text-info mt-3'>
                                <h6>Certification Details</h6>
                                <hr className='my-2' />
                              </div>
                              {certifications.map((item, i) => {
                                const cDt = item.cDtStr ? moment(item.cDtStr).format('DD MMM, YYYY') : '';
                                const bgg = i % 2;
                                const apply = bgg ? 'bg-grey' : '';
                                return (
                                  <ul key={i} className={'list-unstyled clearfix ' + apply}>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Certification Name:</span>
                                      <p className='font-weight-500 mb-0'> {item.cName} </p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Specialization:</span>
                                      <p className='font-weight-500 mb-0'> {item.cSpec} </p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Certificate Received Date:</span>
                                      <p className='font-weight-500 mb-0'> {cDt}</p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Certified By:</span>
                                      <p className='font-weight-500 mb-0'> {item.cBy} </p>
                                    </li>
                                  </ul>
                                );
                              })}
                            </>
                            : <div className='text-center'>
                              <img src={NoData}></img>
                              <p className='text-danger'>No Data Found</p>
                            </div>}
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[18]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='8'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Experience</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='user-view'>
                            <ul className='list-unstyled clearfix'>
                              <li className='w-md-p25 float-left pb-10'>
                                <a className='text-dark float-left pr-50'>
                                  <span>Experience:</span>
                                  <p className='font-weight-500 mb-0'> {Exprss} </p>
                                </a>
                              </li>
                              <li className='w-md-p25 float-left pb-10 col-3'>
                                <span>Job Title:</span>
                                <p className='font-weight-500 mb-0'> {wrkExps.jobTitle}</p>
                              </li>
                              <li className='w-md-p50 float-left pb-10 col-6'>
                                <span>Primary Skills:</span>
                                <p className='font-weight-500 mb-0'> {wrkExps.primSkills} </p>
                              </li>
                            </ul>
                            <ul className='list-unstyled clearfix bg-grey'>
                              <li className='w-md-p25 float-left pb-10'>
                                <span>Do you need health Insurance through our company?:</span>
                                <p className='font-weight-500 mb-0'> {wrkExps.healthIns ? 'Yes' : 'No'} </p>
                              </li>
                              <li className='w-md-p75 float-left pb-10 col-12'>
                                <span>Professional Summary:</span>
                                <p className='font-weight-500 mb-0'> {wrkExps.prfsSrm} </p>
                              </li>
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                    {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[19]?.isAlwd) || rolesObj?.appAcc) && (
                      <Accordion.Item eventKey='9'>
                        <Accordion.Header>
                          <h6 className='text-info mb-0'>Employers Details</h6>
                        </Accordion.Header>
                        <Accordion.Body>
                          {wrkExps.emps && wrkExps.emps.length > 0
                            ? wrkExps.emps.map((item, i) => {
                              const fDate = item.fDtStr ? moment(item.fDtStr).format('DD MMM, YYYY') : '';
                              const tDate = item.tDtStr ? moment(item.tDtStr).format('DD MMM, YYYY') : '';
                              return (
                                <div className='user-view' key={i}>
                                  <hr className='my-2' />
                                  <ul className='list-unstyled clearfix'>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Employement Type:</span>
                                      <p className='font-weight-500 mb-0'> {item.empType}</p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Company:</span>
                                      <p className='font-weight-500 mb-0'> {item.company}</p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>End Client:</span>
                                      <p className='font-weight-500 mb-0'> {item.endClient} </p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Country:</span>
                                      <p className='font-weight-500 mb-0'> {item.country} </p>
                                    </li>
                                  </ul>
                                  <ul className='list-unstyled clearfix bg-grey'>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>State:</span>
                                      <p className='font-weight-500 mb-0'> {item.state}</p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>City:</span>
                                      <p className='font-weight-500 mb-0'> {item.city} </p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Designation:</span>
                                      <p className='font-weight-500 mb-0'> {item.designation} </p>
                                    </li>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Present Employer:</span>
                                      <p className='font-weight-500 mb-0'> {item.present ? 'Yes' : 'No'} </p>
                                    </li>
                                  </ul>
                                  <ul className='list-unstyled clearfix'>
                                    <li className='w-md-p25 float-left pb-10'>
                                      <span>Start Date:</span>
                                      <p className='font-weight-500 mb-0'> {fDate} </p>
                                    </li>
                                    {!item.present && (
                                      <li className='w-md-p25 float-left pb-10'>
                                        <span>End Date:</span>
                                        <p className='font-weight-500 mb-0'> {tDate} </p>
                                      </li>
                                    )}
                                    <li className='w-md-p50 float-left pb-10 col-6'>
                                      <span>Skills:</span>
                                      <p className='font-weight-500 mb-0'> {item.skills}</p>
                                    </li>
                                  </ul>
                                  <ul className='list-unstyled clearfix bg-grey'>
                                    <li className='w-md-p50 float-left pb-10 col-6'>
                                      <span>Roles and Responsibilities:</span>
                                      <p className='font-weight-500 mb-0'> {item.rolesRes} </p>
                                    </li>
                                    <li className='w-md-p50 float-left pb-10 col-6'>
                                      <span>Description:</span>
                                      <p className='font-weight-500 mb-0'> {item.desc} </p>
                                    </li>
                                  </ul>
                                </div>
                              );
                            })
                            : ''}
                        </Accordion.Body>
                      </Accordion.Item>
                    )}

                  </Accordion>}

                <div className='d-flex justify-content-center'>
                  <button className='btn btn-secondary text-center mx-3' onClick={() => hashHistory.push('/consultants/invitations')}>
                    Back
                  </button>
                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isprvBtn && (
                    <button className='btn btn-sm btn-success me-2' title='Approve' onClick={() => setStateData({ statusModal: true })}>
                      Approve
                    </button>
                  )}
                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isrejBtn && (
                    <button className='btn btn-sm btn-danger me-2' title='Reject' onClick={() => setStateData({ rejectModal: true })}>
                      Reject
                    </button>
                  )}
                  {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && invtaView.iStatus == 'Submitted' && isReopenBtn && (
                    <button className='btn btn-sm btn-primary me-2' title='Reopen' onClick={() => setStateData({ reOpenModal: true })}>
                      Reopen
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InvitationViewComponent;