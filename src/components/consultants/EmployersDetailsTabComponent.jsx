/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import NoData from '../../assets/images/no-data.svg';
import moment from 'moment';

const EmployersDetailsTabComponent = (props) => {
  const { wrkExps } = props;
  return (
    <div className='user-view'>
      {wrkExps.emps && wrkExps.emps.length > 0
        ? wrkExps.emps.map((item, i) => {
          const fDate = item.fDtStr ? moment(item.fDtStr).format('DD MMM, YYYY') : '';
          const tDate = item.tDtStr ? moment(item.tDtStr).format('DD MMM, YYYY') : '';
          return (
            <div className="row">
              <div className='col-md-6'>
                <div className='table-responsive'>
                  <table className='table user-view' key={i}>
                    <tbody>
                      <tr>
                        <td width={200}><span>Employement Type:</span></td>
                        <td><p className='font-weight-500 mb-0'>{item.empType} </p> </td>
                      </tr>
                      <tr>
                        <td><span>End Client:</span></td>
                        <td><p className='font-weight-500 mb-0'>{item.endClient}</p></td>
                      </tr>
                      <tr>
                        <td><span>State:</span></td>
                        <td><p className='font-weight-500 mb-0'> {item.state}</p></td>
                      </tr>
                      <tr>
                        <td><span>Designation:</span></td>
                        <td><p className='font-weight-500 mb-0'> {item.designation} </p></td>
                      </tr>
                      <tr>
                        <td><span>Start Date:</span></td>
                        <td><p className='font-weight-500 mb-0'> {fDate} </p></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='col-md-6'>
              <table className='table user-view' key={i}>
                <tbody>
                  <tr>
                    <td width={200}><span>Company:</span></td>
                    <td><p className='font-weight-500 mb-0'>{item.company}</p></td>
                  </tr>
                  <tr>
                    <td><span>Country:</span></td>
                    <td><p className='font-weight-500 mb-0'> {item.country} </p></td>
                  </tr>
                  <tr>
                    <td><span>City:</span></td>
                    <td><p className='font-weight-500 mb-0'> {item.city} </p></td>
                  </tr>
                  <tr>
                    <td><span>Present Employer:</span></td>
                    <td><p className='font-weight-500 mb-0'> {item.present ? 'Yes' : 'No'} </p></td>
                  </tr>
                  <tr>
                  {!item.present && (<>
                    <td><span>End Date:</span></td>
                    <td><p className='font-weight-500 mb-0'> {tDate} </p></td>
                    </>
                  )}
                  </tr>
                </tbody>
                </table>
              </div>
              <div className='col-md-12'>
                <table className='table user-view'>
                  <tbody> 
                    <tr>
                      <td width={200}><span>Skills:</span></td>
                      <td><p className='font-weight-500 mb-0'> {item.skills}</p></td>
                    </tr>
                    <tr>
                      <td><span>Description:</span></td>
                      <td><p className='font-weight-500 mb-0'> {item.desc} </p></td>
                    </tr>
                    <tr>
                      <td><span>Roles and Responsibilities:</span></td>
                      <td><p className='font-weight-500 mb-0'> {item.rolesRes} </p></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
        : <div className='text-center'>
          <img src={NoData}></img>
          <p>No Data Found</p>
        </div>}
    </div>
  )
}

export default EmployersDetailsTabComponent;
