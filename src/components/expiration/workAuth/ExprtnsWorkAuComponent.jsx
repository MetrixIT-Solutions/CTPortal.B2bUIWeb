/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import NoData from '../../../assets/images/no-data.svg';

const ExprtnsWorkAuComponent = (props) => {
  const {exprActList, rolesObj} = props.state;
  const {setStateData, onClickWorkAthEdit, handleCunslview} = props;
  return (
    <div className='row'>
      {/* {subtabValue && subtabValue == 'WrkAuth' && ( */}
      {exprActList && exprActList.length > 0 ? (
        exprActList.map((item, i) => {
          const newObj = item.newObj;
          const strtDt = newObj.strDt ? moment(newObj.strDt).format('DD MMM, YYYY') : '';
          const expDt = newObj.expDt ? moment(newObj.expDt).format('DD MMM, YYYY') : '';
          return (
            <div className='col-md-4' key={i}>
              <div className='col-md-15'>
                <strong className='mb-2'>Candidate Info: </strong> 
                <span className='ng-star-inserted'>
                <a style={{ color: 'blue' }} onClick={() => handleCunslview(item)} > {item.cuName} </a></span> <br /> {item.emID} | {item.mobCcNum}
              </div>
              <div className='card bg-grey'>
                <div className='card-body p-3'>
                  <div className='d-flex justify-content-between'>
                    <h6>
                      <strong>Work Authorization </strong>
                    </h6>
                    <div className='d-flex justify-content-center gap-3'>
                      {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && (
                      <a className='btn btn-sm btn-success' onClick={() => setStateData({isVrfdModal: true, expObj: item, recordId: item._id})}>
                        <i className='fa-solid fa-rotate'></i>
                      </a>
                      )}
                      {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && (
                      <a className='btn btn-sm btn-primary' onClick={() => onClickWorkAthEdit(item)}>
                        <i className='fas fa-edit'></i>
                      </a>
                      )}
                    </div>
                  </div>
                  <dl>
                    <dt>Status: </dt>
                    <dd>{newObj?.status}</dd>
                    {newObj.status == 'CPT' && (
                      <>
                        <dt>Position: </dt>
                        <dd>{newObj?.card?.position}</dd>
                      </>
                    )}
                    {(newObj.status == 'OPT' || newObj.status == 'Stem OPT') && (
                      <>
                        <dt>Card Number: </dt>
                        <dd>{newObj?.card?.num}</dd>
                      </>
                    )}
                    {(newObj.status == 'CPT' || newObj.status == 'OPT' || newObj.status == 'Stem OPT') && (
                      <>
                        <dt>Sevis Number: </dt>
                        <dd>{newObj?.card?.sevisNum}</dd>
                      </>
                    )}
                    {newObj.status !== 'H1B' && newObj.status !== 'CPT' && (
                      <>
                        <dt>USCIS Number: </dt>
                        <dd>{newObj?.card?.uscisNum}</dd>
                      </>
                    )}
                    {newObj.status == 'H1B' && (
                      <>
                        <dt>Receipt Number: </dt>
                        <dd>{newObj?.card?.receiptNum}</dd>
                      </>
                    )}
                    <dt>Work Authorization Start Date: </dt>
                    <dd>{strtDt}</dd>
                    <dt>Work Authorization Expiry Date: </dt>
                    <dd>{expDt}</dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className='no-data'>
          <img src={NoData}></img>
          <p className='text-danger py-2'>No results found </p>
        </div>
      )}
      {/* )} */}
    </div>
  );
};

export default ExprtnsWorkAuComponent;
