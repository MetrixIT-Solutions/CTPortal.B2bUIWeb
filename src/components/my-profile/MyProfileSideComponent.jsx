/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

import React from 'react';

import hashHistory from '../../hashHistory';
import avatar1 from '../../assets/images/avatar/1.jpg';

const MyProfileSideComponent = (props) => {
  const profileData = props.state;
  return (
    <div>
      <div className='box box-widget widget-user-2'>
        <div className='widget-user-header bg-primary'>
          <div className='widget-user-image'>
            <img className='rounded-circle bg-success-light' src={avatar1} alt='User Avatar' />
          </div>
          {/* /.widget-user-image */}
          <h3 className='widget-user-username'>{profileData.fName + ' ' + profileData.lName} </h3>
          <h6 className='widget-user-desc'>{profileData.userRole}</h6>
        </div>
        <div className='box-footer no-padding'>
          <ul className='nav d-block nav-stacked'>
            <li className='nav-item'><a className='nav-link' onClick={() => hashHistory.push('/profile')}>My Profile <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a></li>
            <li className='nav-item'><a className='nav-link' onClick={() => hashHistory.push('/address')}>Address <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a></li>
            <li className='nav-item'><a className='nav-link' onClick={() => hashHistory.push('/change-password')}>Change Password <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a></li>
            <li className='nav-item'><a className='nav-link' onClick={() => hashHistory.push('/meeting-links')}>Meeting Links <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a></li>
            <li className='nav-item'><a className='nav-link' onClick={props.handleLogout}>Logout <span className='pull-right'><i className='fa fa-arrow-right'></i></span></a></li>
          </ul>
        </div>
      </div>
      {/* /.box end */}
    </div>
  );
}

export default MyProfileSideComponent;
