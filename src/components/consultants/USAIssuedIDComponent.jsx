/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';

const USAIssuedIDComponent = (props) => {
  const { profile, uAddress } = props;
  const issuedDate = profile.unidIssDtStr ? moment(profile.unidIssDtStr).format('DD MMM, YYYY') : '';
  const Expiry = profile.unidExpDtStr ? moment(profile.unidExpDtStr).format('DD MMM, YYYY') : '';

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <div className='table-responsive'>
            <table className='table user-view'>
              <tbody>
                <tr>
                  <td width={200}><span>National ID Type:</span></td>
                  <td><p className='font-weight-500 mb-0'> {profile.unidType}</p></td>
                </tr>
                <tr>
                  <td><span>Issued Date:</span></td>
                  <td><p className='font-weight-500 mb-0'> {issuedDate}</p></td>
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
                  <td width={200}><span>ID Number:</span></td>
                  <td><p className='font-weight-500 mb-0'> {profile.usaNatID}</p></td>
                </tr>
                <tr>
                  <td><span>Expiry Date:</span></td>
                  <td><p className='font-weight-500 mb-0'> {Expiry}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        {profile.isRes ?
          <div className="pl-3">
            <input type='checkbox' disabled={true} checked={profile.isRes} />
            <label> Same as Residential address</label>
          </div>
          : <div className='row'>
            <div className='col-md-6'>
              <div className='table-rasponsive'>
                <table className='table user-view'>
                  <tbody>
                    <tr>
                      <td width={200}><span>Country:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.country} </p></td>
                    </tr>
                    <tr>
                      <td><span>Address:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.hNum}</p></td>
                    </tr>
                    <tr>
                      <td><span>City:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.city} </p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='table-rasponsive'>
                <table className='table user-view'>
                  <tbody>
                    <tr>
                      <td width={200}><span>State:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.state} </p></td>
                    </tr>
                    <tr>
                      <td><span>Apt/Suite:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.area}</p></td>
                    </tr>
                    <tr>
                      <td><span>ZIP Code:</span></td>
                      <td><p className='font-weight-500 mb-0'> {uAddress.zip} </p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default USAIssuedIDComponent;
