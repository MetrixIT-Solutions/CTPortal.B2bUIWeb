/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import MyProfileSideComponent from './MyProfileSideComponent';
import MyProfileEditComponent from './MyProfileEditComponent';

const MyProfileComponent = (props) => {

  const { profileData, profileModal } = props.state;

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Profile</h3>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-7 col-xl-8'>
                <div className='box'>
                  <div className='box-body'>
                    <div className='d-flex justify-content-between'>
                      <h5 className='box-title mb-0'>
                        Personal Details
                      </h5>
                      <div>
                        <Button variant="primary" size='sm' onClick={props.setProfileData}>
                          <i className='fas fa-edit' /> Edit
                        </Button>
                      </div>
                    </div>
                    <hr />
                    <div className='user-view'>
                      <ul className='list-unstyled clearfix'>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>First Name:</span>
                          <p className='font-weight-500 mb-0'> {profileData.fName} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Last Name:</span>
                          <p className='font-weight-500 mb-0'> {profileData.lName} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Alias Name:</span>
                          <p className='font-weight-500 mb-0'> {profileData.sName} </p>
                        </li>
                      </ul>
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Role:</span>
                          <p className='font-weight-500 mb-0'> {profileData.userRole} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Team(s):</span>
                          <p className='font-weight-500 mb-0'> {profileData?.teams?.length ? profileData?.teams.map(tm => tm.tName+'; ') : ''} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Report To:</span>
                          <p className='font-weight-500 mb-0'>{profileData?.reports?.length ? profileData?.reports.map(rpt => rpt.rprtName+'; ') : ''}</p>
                        </li>
                      </ul>
                      <ul className='list-unstyled clearfix'>
                      <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Branch:</span>
                          <p className='font-weight-500 mb-0'> {profileData.obName}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Email:</span>
                          <p className='font-weight-500 mb-0'> {profileData.emID}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Alternate Email:</span>
                          <p className='font-weight-500 mb-0'> {profileData.altEmID}</p>
                        </li>
                      </ul>
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Mobile No:</span>
                          <p className='font-weight-500 mb-0'> {profileData.mobCcNum}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Alternate Mobile No:</span>
                          <p className='font-weight-500 mb-0'>{profileData.altMobCcNum}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>DOB:</span>
                          <p className='font-weight-500 mb-0'> {profileData.dobStr ? moment(profileData.dobStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : ''}</p>
                        </li>
                      </ul>
                      <ul className='list-unstyled clearfix'>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Gender:</span>
                          <p className='font-weight-500 mb-0'> {profileData.gender}</p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Linkedin:</span>
                          {profileData.wrkUrls && profileData.wrkUrls.length ?
                            <a href={profileData.wrkUrls[0].startsWith("https://") || profileData.wrkUrls[0].startsWith("http://") ? profileData.wrkUrls[0] : `https://${profileData.wrkUrls[0]}`} target="_blank"><p className='font-weight-500 mb-0'>{profileData.wrkUrls}</p></a>: <p>'N/A'</p>}
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Office Number:</span>
                          <p className='font-weight-500 mb-0'> {profileData?.descNum ? profileData.descCcNum + (profileData?.descExtnsn ? ' Extn: ' + profileData.descExtnsn : '') : ''}</p>
                        </li>
                      </ul>
                      <ul className='list-unstyled clearfix bg-grey'>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Desk Location:</span>
                          <p className='font-weight-500 mb-0'> {profileData.descLoc} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Experience:</span>
                          <p className='font-weight-500 mb-0'> {profileData?.expYear >= 0 ? profileData.expYear + ' Year(s)' : ''} {profileData?.expMonth >= 0 ? profileData.expMonth + ' Month(s)' : ''} </p>
                        </li>
                        <li className='w-md-p30 float-left'>
                          <span className='text-muted'>Joining Date:</span>
                          <p className='font-weight-500 mb-0'>{profileData.joinDtStr ? moment(profileData.joinDtStr, 'YYYY-MM-DD').format('DD MMM, YYYY') : ''} </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.col  */}
              <div className='col-12 col-lg-5 col-xl-4'>
                <MyProfileSideComponent profileData={profileData} state={profileData} handleLogout={props.handleLogout} />
              </div>
            </div>
            {/* /.row  */}
          </section>
          <Modal show={profileModal} onHide={() => props.setStateData({ profileModal: false })} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MyProfileEditComponent state={props.state} setStateData={props.setStateData} editProfileClick={props.editProfileClick} />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default MyProfileComponent;
