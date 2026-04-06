/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

const PersonalInfoTabComponent = (props) => {  
  const { userData, cnsltantView, profile, showSsn, handleShowSsn } = props;
  const dob = profile.dobStr ? moment(profile.dobStr).format('DD MMM, YYYY') : '';
  const ssnStatus = showSsn ? (profile.ssn) : (profile.ssn ? (profile.ssn?.length > 4 ? `${'x'.repeat(profile.ssn.length - 4)}${profile.ssn.slice(-4)}` : profile.ssn) : 'SSN Expected');

  return (  
    <div className="row">
      <div className='col-md-6'>
        <div className='table-responsive'>
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={200}><span>First Name:</span></td>
                <td><p className='font-weight-500 mb-0'> {cnsltantView.fName} </p> </td>
              </tr>
              <tr>
                <td><span>Email:</span></td>
                <td><p className='font-weight-500 mb-0'> {cnsltantView.emID}</p></td>
              </tr>
              <tr>
                <td><span>DoB:</span></td>
                <td><p className='font-weight-500 mb-0'> {dob} </p></td>
              </tr>
              <tr>
                <td><span>Alternate Email:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.altEmID} </p></td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <span>SSN Number:</span>
                    {userData.userType !== "Employee" && <span className="eye-icon" style={{ marginLeft: '10px', color: '#2196f3' }} onClick={handleShowSsn}>
                      {showSsn ? (<i className="fa fa-eye" />) : (<i className="fa fa-eye-slash" />)}
                    </span>}
                  </div>
                </td>
                <td>
                  <p className='font-weight-500 mb-0'> {ssnStatus}</p>
                </td>
              </tr>
              <tr>
                <td><span>Marital Status:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.mStatus} </p></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className='col-md-6'>
        <div className='table-responsive'>
          <table className='table user-view'>
            <tbody>
              <tr>
                <td width={200}><span>Last Name:</span></td>
                <td><p className='font-weight-500 mb-0'> {cnsltantView.lName} </p> </td>
              </tr>
              <tr>
                <td><span>Mobile Number:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.mobCcNum} </p></td>
              </tr>
              <tr>
                <td><span>Gender:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.gender}</p></td>
              </tr>
              <tr>
                <td><span>Alternate Mobile Number:</span></td>
                <td><p className='font-weight-500 mb-0'> {profile.altMobCcNum} </p></td>
              </tr>
              <tr>
                <td> <span>Linkedin URL:</span></td>
                <td>{profile.wrkUrls && profile.wrkUrls.length ? <a href={profile.wrkUrls[0].startsWith("https://") || profile.wrkUrls[0].startsWith("http://") ? profile.wrkUrls[0] : `https://${profile.wrkUrls[0]}`} target="_blank"> {profile.wrkUrls[0]} </a> : <p>{'N/A'} </p>}</td>
              </tr>
              <tr>
                <td><span>Status:</span></td>
                <td><p className='font-weight-500 mb-0'> {cnsltantView.uStatus} </p> </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoTabComponent;