/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import Loader from '../loader/loader';

const AdminUserViewComponent = (props) => {
  const { userViewObj, statusModal, rejectModal, rolesObj, errMsg, succMsg, loading, disabled } = props.state;
  const {handleApproved, handleRejected, handleStatusUpdate, setStateData} = props;
  const d1 = userViewObj?.reports?.length &&  userViewObj.reports.map(item => item.rprtName);
  const rptName =  d1 ? d1.join(", ") : '';

  const refArr = userViewObj.refUID ? userViewObj.refUID.split(':') : [];
  const refUID = refArr && refArr.length > 0 ? refArr[1] : '';
  const { } = props;
  const dob = moment(userViewObj.dobStr).format("DD MMM, YYYY");
  const experince = userViewObj.expYear + ' Years ' + userViewObj.expMonth + ' Months ';
  const deskNum = userViewObj.descCcNum + ' | Extn: ' + userViewObj.descExtnsn;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Admin User View</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/admin-users')} aria-current='page'>Admin Users</li>
                      <li className='breadcrumb-item active' aria-current='page'>View</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-12 col-xl-12'>
                <div className='box'>
                  <div className='box-body'>
                    <div className='d-flex justify-content-between'>
                      <div className='d-flex'>
                        <div className='back'>
                          <a onClick={() => hashHistory.push('/admin-users')}>
                            <i className="fa-solid fa-arrow-left"></i>
                          </a>
                        </div>
                        <h5 className='box-title mb-0'>User Details </h5>
                      </div>
                      {userViewObj.uStatus =='Submitted' && ((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[8]?.isAlwd) || rolesObj?.appAcc) &&
                        <div className='container d-flex justify-content-end'>
                          <button className='btn btn-primary mr-2' onClick={handleApproved}>Approve</button>
                          <button className='btn btn-danger' onClick={handleRejected}>Reject</button>
                      </div>}
                      {((rolesObj?.access?.length >= 6 && rolesObj?.access[5]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <div>
                        <a className='btn btn-sm btn-primary me-2' onClick={() => hashHistory.push('/admin-users/edit/' + userViewObj._id)}><i className="fa-solid fa-pen-to-square"></i></a>
                      </div>}
                    </div>
                    <hr className='my-2' />
                    {loading ? <div colspan={6}><Loader/></div> : <div className='user-view'>
                      <ul className='list-unstyled bg-grey'>
                        <li className='w-md-p25 float-left'>
                            <span>Organization:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.orgName} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Branch:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.obName} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Team:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj?.teams?.length ? userViewObj?.teams.map(tm => tm.tName+'; ') : ''} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>User Type:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.userType} </p>
                        </li>
                      </ul>
                      <div className='clearfix'></div>
                      <ul className='list-unstyled'>
                        <li className='w-md-p25 float-left'>
                            <span>User Role:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.userRole} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>First Name:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.fName} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>Last Name:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.lName} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>Report To:</span>
                            <p className='font-weight-500 mb-0'> {rptName} </p>
                        </li>
                      </ul>
                      <div className='clearfix'></div>
                      <ul className='list-unstyled bg-grey'>
                      <li className='w-md-p25 float-left'>
                            <span>Alias Name:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.sName} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>User ID:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.uStatus !== 'Open' ? refUID : ''}</p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>Email:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.emID}</p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Alternate Email:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.altEmID}</p>
                        </li>
                      </ul>
                      <div className='clearfix'></div>
                      <ul className='list-unstyled'>
                        <li className='w-md-p25 float-left'>
                          <span>Office Number:</span>
                          <p className='font-weight-500 mb-0'> {deskNum} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Desk Location:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.descLoc} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Personal Mobile Number:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.mobCcNum}</p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Alt Mobile Number:</span>
                          <p className='font-weight-500 mb-0'> {userViewObj.altMobCcNum}</p>
                        </li>
                      </ul>
                      <div className='clearfix'></div>
                      <ul className='list-unstyled bg-grey'>
                        <li className='w-md-p25 float-left'>
                          <span>Experience:</span>
                          <p className='font-weight-500 mb-0'> {experince}</p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Joining Date:</span>
                          <p className='font-weight-500 mb-0'> {moment(userViewObj.joinDtStr).format("DD MMM, YYYY")} </p>
                        </li>
                      <li className='w-md-p25 float-left'>
                            <span>User Status:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.uStatus} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>DoB:</span>
                            <p className='font-weight-500 mb-0'> {dob} </p>
                        </li>
                      </ul>
                      <div className='clearfix'></div>
                      <ul className='list-unstyled'>
                        <li className='w-md-p25 float-left'>
                            <span>Gender:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.gender} </p>
                        </li>
                        <li className='w-md-p25 float-left'>
                            <span>Linkedin ID:</span>
                            <p className='font-weight-500 mb-0'> {userViewObj.wrkUrls && userViewObj.wrkUrls.length ?
                            <a href={userViewObj.wrkUrls[0].startsWith("https://") || userViewObj.wrkUrls[0].startsWith("http://") ? userViewObj.wrkUrls[0] : `https://${userViewObj.wrkUrls[0]}`} target="_blank"> {userViewObj.wrkUrls[0]}</a> : <p>{'N/A'}</p>}</p>
                        </li>
                        <li className='w-md-p25 float-left'>
                          <span>Icon:</span>
                          <div>{userViewObj.piPath ? <span className='text-muted'> <img style={{ width: "150px" }} src={userViewObj.piPath}></img></span> : ''}
                          </div>
                        </li>
                      </ul>
                    </div>}
                  </div>
                   <div className='text-center mb-3'>
                      <button className='btn btn-secondary' onClick={() => hashHistory.push('/admin-users')} >Back</button>
                  </div>
                </div>
              </div>
              {/* /.col  */}
            </div>
            {/* /.row  */}
          </section>
          <div>
              {/* Approve status update */}
            <Modal show={statusModal} onHide={() => setStateData({ statusModal: false, errMsg: '' })} className='modal-s mt-3'>
              <Modal.Header closeButton>
                <p className='mb-0'>
                  <strong>Status Update</strong>
                </p>
              </Modal.Header>
              <Modal.Body>
                <div className='d-flex mb-2'>
                  <div><strong>User Info: </strong>{userViewObj?.fName} | {userViewObj?.mobNum}</div>
                </div>
                <h6>
                  Are you sure want to approve this User?
                </h6>
              </Modal.Body>
              <div className='text-center text-success'>{succMsg}</div>
              <div className='text-center text-danger'>{errMsg}</div>
              <Modal.Footer>
                <Button variant='danger' size='sm' disabled={disabled} onClick={() => setStateData({ statusModal: false, errMsg: '' })}> No </Button>
                <Button variant='success' size='sm' disabled={disabled} onClick={handleStatusUpdate}> Yes </Button>
              </Modal.Footer>
            </Modal>


             {/* Reject status update */}
              <Modal show={rejectModal} onHide={() => setStateData({ rejectModal: false, errMsg: '' })} className='modal-s mt-3'>
              <Modal.Header closeButton>
                <p className='mb-0'>
                  <strong>Status Update</strong>
                </p>
              </Modal.Header>
              <Modal.Body>
                <div className='d-flex mb-2'>
                  <div><strong>User Info: </strong>{userViewObj?.fName} | {userViewObj?.mobNum}</div>
                </div>
                <h6> Are you sure want to reject this User? </h6>
              </Modal.Body>
              <div className='text-center text-success'>{succMsg}</div>
              <div className='text-center text-danger'>{errMsg}</div>
              <Modal.Footer>
                <Button variant='danger' size='sm' onClick={() => setStateData({ rejectModal: false, errMsg: '' })}> No </Button>
                <Button variant='success' size='sm' onClick={handleStatusUpdate}> Yes </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUserViewComponent;