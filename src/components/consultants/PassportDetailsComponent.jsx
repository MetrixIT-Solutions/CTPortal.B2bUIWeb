/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from 'moment';

const PassportDetailsComponent = (props) => {
  const { workAuths } = props;
  const psprtIssDt = workAuths.psprtIssDtStr ? moment(workAuths.psprtIssDtStr).format('DD MMM, YYYY') : '';
  const psprtExpDt = workAuths.psprtExpDtStr ? moment(workAuths.psprtExpDtStr).format('DD MMM, YYYY') : '';
  
  return (
    <div>
      <div className="row">
        <div className='col-md-6'>
          <div className='table-responsive'>
            <table className='table user-view'>
              <tbody>
                <tr>
                  <td width={200}><span>Passport Number:</span> </td>
                  <td><p className='font-weight-500 mb-0'> {workAuths.psprtNum} </p> </td>
                </tr>
                <tr>
                  <td><span>Passport Expiry Date:</span> </td>
                  <td><p className='font-weight-500 mb-0'> {psprtExpDt} </p></td>
                </tr>
                <tr>
                  <td><span>Passport File Number:</span> </td>
                  <td><p className='font-weight-500 mb-0'> {workAuths.psprtDocNum} </p> </td>
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
                  <td width={200}><span>Passport Issued Date:</span></td>
                  <td><p className='font-weight-500 mb-0'> {psprtIssDt} </p> </td>
                </tr>
                <tr>
                  <td><span>Passport Issued Place:</span></td>
                  <td><p className='font-weight-500 mb-0'> {workAuths.psprtIssPlace}</p></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassportDetailsComponent;