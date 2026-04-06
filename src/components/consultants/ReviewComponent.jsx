/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';

import {Accordion} from 'react-bootstrap';

const ReviewComponent = (props) => {
  const {totalConsultData, rolesObj, editBtn, reviewEditClick, showSsn, handleShowSsn, userData} = props;
  const resAd = totalConsultData.address && totalConsultData.address.length > 0 ? totalConsultData.address.find((item) => item.adrsType == 'USA RES') : {};
  const uAd = totalConsultData.address && totalConsultData.address.length ? totalConsultData.address.find((item) => item.adrsType == 'USA ID') : {};
  const address = resAd && resAd._id ? resAd : {};
  const uAddress = uAd && uAd._id ? uAd : {};
  const workAuths = totalConsultData.workAuths && totalConsultData.workAuths.length > 0 ? totalConsultData.workAuths[0] : {};
  const education = totalConsultData.education && totalConsultData.education.length > 0 ? totalConsultData.education : [];
  const certifications = totalConsultData.certs && totalConsultData.certs.length > 0 ? totalConsultData.certs : [];
  const wrkExps = totalConsultData.wrkExps && totalConsultData.wrkExps.length > 0 ? totalConsultData.wrkExps[0] : {};

  const dob = totalConsultData.dobStr ? moment(totalConsultData.dobStr).format('DD MMM, YYYY') : '';
  const ssnExpDt = totalConsultData.ssnExpDtStr ? moment(totalConsultData.ssnExpDtStr).format('DD MMM, YYYY') : '';
  const issuedDate = totalConsultData.unidIssDtStr ? moment(totalConsultData.unidIssDtStr).format('DD MMM, YYYY') : '';
  const Expiry = totalConsultData.unidExpDtStr ? moment(totalConsultData.unidExpDtStr).format('DD MMM, YYYY') : '';

  const visaStDt = workAuths.visaStDtStr ? moment(workAuths.visaStDtStr).format('DD MMM, YYYY') : '';
  const visaExpDt = workAuths.visaExpDtStr ? moment(workAuths.visaExpDtStr).format('DD MMM, YYYY') : '';
  const cardExpDt = workAuths.cardExpDtStr ? moment(workAuths.cardExpDtStr).format('DD MMM, YYYY') : '';
  const i94ExpDt = workAuths.i94ExpDtStr ? moment(workAuths.i94ExpDtStr).format('DD MMM, YYYY') : '';
  const wrkAuthStrtDtStr = workAuths.wrkAuthStrtDtStr ? moment(workAuths.wrkAuthStrtDtStr).format('DD MMM, YYYY') : '';
  const wrkAuthExpDt = workAuths.wrkAuthExpDtStr ? moment(workAuths.wrkAuthExpDtStr).format('DD MMM, YYYY') : '';
  const psprtIssDt = workAuths.psprtIssDtStr ? moment(workAuths.psprtIssDtStr).format('DD MMM, YYYY') : '';
  const psprtExpDt = workAuths.psprtExpDtStr ? moment(workAuths.psprtExpDtStr).format('DD MMM, YYYY') : '';

  const Exprss =
    (wrkExps.expYears == 0 && wrkExps.expMonths == 0) || (!wrkExps.expYears && !wrkExps.expMonths)
      ? 'No Experience'
      : wrkExps.expYears == 0
      ? `${wrkExps.expMonths}  Months`
      : wrkExps.expMonths == 0
      ? `${wrkExps.expYears}  Years`
      : `${wrkExps.expYears}  Years  ${wrkExps.expMonths}  Months`;
  const ssnStatus = showSsn ? totalConsultData.ssn : totalConsultData.ssn && totalConsultData.ssn.length > 4 ? `${'x'.repeat(totalConsultData.ssn.length - 4)} ${totalConsultData.ssn.slice(-4)}` : totalConsultData.ssn;

  return (
    <div className='wrapper'>
      <Accordion defaultActiveKey='0'>
        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && (
          <Accordion.Item eventKey='0'>
            <Accordion.Header>
              <h6 className='text-info mb-0'>Personal Info</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className='user-view'>
              {editBtn && <div className='text-end'><button onClick={() => reviewEditClick(1)} className='btn btn-primary'><i className='fa-solid fa-pen-to-square'></i></button></div>}
                <ul className='list-unstyled clearfix mb-2'>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>First Name:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.fName} </p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Last Name:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.lName} </p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Email:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.emID}</p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Mobile Number:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.mobCcNum} </p>
                  </li>
                </ul>
                <ul className='list-unstyled clearfix mb-2 bg-grey'>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>DoB:</span>
                    <p className='font-weight-500 mb-0'> {dob} </p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Gender:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.gender}</p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Alternate Email:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.altEmID} </p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Alternate Mobile Number:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.altMobCcNum} </p>
                  </li>
                </ul>
                <ul className='list-unstyled clearfix mb-2'>
                  {totalConsultData.ssn ? <li className='w-md-p25 float-left pb-10'>
                    <span>SSN Number:</span>
                    <div className='d-flex align-items-center'>
                      <p className='font-weight-500 mb-0'> {ssnStatus}</p>
                      {userData.userType !== 'Employee' && <span className='eye-icon' style={{position: 'absolute', right: 20}} onClick={handleShowSsn}>
                        {showSsn ? (<i className='fa fa-eye' />) : (<i className='fa fa-eye-slash' />)}
                      </span>}
                    </div>
                  </li> : <li className='w-md-p25 float-left pb-10'>
                    <span>SSN Expected Date:</span>
                    <p className='font-weight-500 mb-0'> {ssnExpDt}</p>
                  </li>}
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Linkedin URL:</span>
                    {totalConsultData.wrkUrls && totalConsultData.wrkUrls.length ?
                    <a href={totalConsultData.wrkUrls[0].startsWith('https://') || totalConsultData.wrkUrls[0].startsWith('http://') ? totalConsultData.wrkUrls[0] : `https://${totalConsultData.wrkUrls[0]}`} target='_blank'><p className='font-weight-500 mb-0'>{totalConsultData.wrkUrls[0]}</p></a> : <p>{'N/A'}</p>}
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Marital Status:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.mStatus} </p>
                  </li>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Status:</span>
                    <p className='font-weight-500 mb-0'> {totalConsultData.iStatus} </p>
                  </li>
                </ul>
                {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && (
                  <>
                    <div className='text-info mt-3'>
                      <h6>Emergency Contact</h6>
                      <hr className='my-2' />
                    </div>
                    <ul className='list-unstyled clearfix mb-2'>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Contact Person</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.ecPer}</p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Relation</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.ecRelt}</p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Contact Number:</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.ecNum} </p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Contact Email:</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.ecEml} </p>
                      </li>
                    </ul>
                  </>
                )}
                {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && (
                  <>
                    <div className='text-info mt-3'>
                      <h6>Residential Address:</h6>
                      <hr className='my-2' />
                    </div>
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
                  </>
                )}
                {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[12]?.isAlwd) || rolesObj?.appAcc) && (
                  <>
                    <div className='text-info mt-3'>
                      <h6>USA Issued National ID State:</h6>
                      <hr className='my-2' />
                    </div>
                    <ul className='list-unstyled clearfix mb-2'>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>National ID Type:</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.unidType}</p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>ID Number:</span>
                        <p className='font-weight-500 mb-0'> {totalConsultData.usaNatID}</p>
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
                    {totalConsultData.isRes ? (
                      <div className='pl-3'>
                        <input type='checkbox' disabled={true} checked={totalConsultData.isRes} />
                        <label> Same as Residential address</label>
                      </div>
                    ) : (
                      <div>
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
                      </div>
                    )}
                  </>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )}
        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && (
          <Accordion.Item eventKey='1'>
            <Accordion.Header>
              <h6 className='text-info mb-0'> Work Authorization</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className='user-view'>
              {editBtn && <div className='text-end'><button onClick={() => reviewEditClick(2)} className='btn btn-primary'><i className='fa-solid fa-pen-to-square'></i></button></div>}
                <ul className='list-unstyled '>
                  <li className='w-md-p25 float-left pb-10'>
                    <span>Nationality:</span>
                    <p className='font-weight-500 mb-0'> {workAuths.nationality} </p>
                  </li>
                </ul>
                {workAuths.nationality !== 'American' && (
                  <>
                    <ul className='list-unstyled clearfix'>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Visa Status:</span>
                        <p className='font-weight-500 mb-0'> {workAuths.visaStatus} </p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Visa Start Date:</span>
                        <p className='font-weight-500 mb-0'> {visaStDt}</p>
                      </li>
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Visa Expiry Date:</span>
                        <p className='font-weight-500 mb-0'> {visaExpDt} </p>
                      </li>
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
                      {/* ====================================== */}
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
                      {(workAuths.visaStatus == 'OPT' && workAuths.cardRcptNum) || workAuths.visaStatus == 'CPT' || workAuths.visaStatus == 'H1B' ?'':
                        <>
                          <li className='w-md-p25 float-left pb-10'>
                            <span>USCIS Number:</span>
                            <p className='font-weight-500 mb-0'> {workAuths.uscisNum} </p>
                          </li>
                        </>
                      }
                      <li className='w-md-p25 float-left pb-10'>
                        <span>Latest i-94:</span>
                        <p className='font-weight-500 mb-0'> {workAuths.li94Num} </p>
                      </li>
                      {/* ===================================== */}
                      {workAuths.visaStatus != 'OPT' && workAuths.visaStatus != 'CPT' && workAuths.visaStatus != 'Stem OPT' && workAuths.visaStatus != 'GCEAD' && workAuths.visaStatus != 'L2' && workAuths.visaStatus != 'GC' && (
                        <li className='w-md-p25 float-left pb-10'>
                          <span>i-94 Expiry Date:</span>
                          <p className='font-weight-500 mb-0'> {i94ExpDt}</p>
                        </li>
                      )}
                      {workAuths.nationality != 'American' && !workAuths.cardRcptNum && (
                        <>
                          <li className='w-md-p25 float-left pb-10'>
                            <label>{workAuths.visaStatus == 'CPT' ? 'CPT Start Date' : 'Work Authorization Start Date'}</label>
                            {wrkAuthStrtDtStr && <p className='font-weight-500 mb-0'>{wrkAuthStrtDtStr}</p>}
                          </li>
                          <li className='w-md-p25 float-left pb-10'>
                            <label>{workAuths.visaStatus == 'CPT' ? 'CPT Expiry Date' : 'Work Authorization Expiry Date'}</label>
                            <p className='font-weight-500 mb-0'>{wrkAuthExpDt}</p>
                          </li>
                        </>
                      )}
                    </ul>
                  </>
                )}
                {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && (
                  <>
                    <div className='clearfix'></div>
                    <div className='text-info mt-3'>
                      <h6>Passport Details:</h6>
                      <hr className='my-2' />
                    </div>
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
                  </>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )}
        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && (
          <Accordion.Item eventKey='2'>
            <Accordion.Header>
              <h6 className='text-info mb-0'>Education</h6>
            </Accordion.Header>
            <Accordion.Body>
              {editBtn && <div className='text-end'><button onClick={() => reviewEditClick(3)} className='btn btn-primary'><i className='fa-solid fa-pen-to-square'></i></button></div>}
              <div className='text-info mt-3'>
                <h6>Education Details</h6>
                <hr className='my-2' />
              </div>
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
                : ''}
            </Accordion.Body>
          </Accordion.Item>
        )}
        {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[16]?.isAlwd) || rolesObj?.appAcc) && (
          <Accordion.Item eventKey='3'>
            <Accordion.Header>
              <h6 className='text-info mb-0'>Experience</h6>
            </Accordion.Header>
            <Accordion.Body>
              <div className='user-view'>
              {editBtn && <div className='text-end'><button onClick={() => reviewEditClick(4)} className='btn btn-primary'><i className='fa-solid fa-pen-to-square'></i></button></div>}
                <div className='text-info'>
                  <h6 className='text-info'>Total Experience</h6>
                  <hr className='my-2' />
                </div>
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
                {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[17]?.isAlwd) || rolesObj?.appAcc) && (
                  <>
                    <div className='text-info mt-3'>
                      <h6>Employers Details</h6>
                      {/* <hr className='my-2' /> */}
                    </div>
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
                  </>
                )}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        )}
      </Accordion>
    </div>
  );
};

export default ReviewComponent;
