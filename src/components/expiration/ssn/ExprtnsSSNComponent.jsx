/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

import NoData from '../../../assets/images/no-data.svg';

const ExprtnsSSNComponent = (props) => {
  const {exprActList, rolesObj} = props.state;
  const {setStateData, onClickSSNEdit, handleCunslview} = props;

  return (
    <div className='row'>
      {exprActList && exprActList.length > 0 ? (
        exprActList.map((item, i) => {
          const newObj = item.newObj;
          const expDte = newObj.expDt ? moment(newObj.expDt).format('DD MMM, YYYY') : '';
          return (
            <div className='col-md-4' key={i}>
              <div className='col-md-15'>
                <strong className='mb-2'>Candidate Info: </strong>
                <a style={{ color: 'blue' }} onClick={() => handleCunslview (item)} > {item.cuName} </a> <br /> {item.emID} | {item.mobCcNum}
              </div>
              <div className='card bg-grey'>
                <div className='card-body p-3'>
                  <div className='d-flex justify-content-between'>
                    <h6>
                      <strong>SSN Number </strong>
                    </h6>
                    <div className='d-flex justify-content-center gap-3'>
                      {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && (
                        <a className='btn btn-sm btn-success' onClick={() => setStateData({isVrfdModal: true, expObj: item, recordId: item._id})}>
                          <i className='fa-solid fa-rotate'></i>
                        </a>
                      )}
                      {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[2]?.isAlwd) || rolesObj?.appAcc) && (
                        <a className='btn btn-sm btn-primary' onClick={() => onClickSSNEdit(item)}>
                          <i className='fas fa-edit'></i>
                        </a>
                      )}
                    </div>
                  </div>
                  <dl>
                    {newObj.num ? (
                      <>
                        <dt>SSN Number: </dt>
                        <dd>{newObj.num}</dd>
                      </>
                    ) : (
                      <>
                        <dt>SSN Expected Date: </dt>
                        <dd>{expDte}</dd>
                      </>
                    )}
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
    </div>
  );
};

export default ExprtnsSSNComponent;
