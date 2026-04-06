/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";
import moment from "moment";

const ExpirationI94TabComponent = (props) => {
  const {exprActList, setStateData, handleEditOpenModal, rolesObj, handleShowMoreData} = props;
  const {smTypes} = props.state;

  return (
    <>
      <div className="row">
        {exprActList?.i94?.count > 10 && !smTypes.includes('i94') && (
          <div className="d-flex justify-content-end">
            <a onClick={() => handleShowMoreData('i94')} className="btn btn-xs btn-primary">
              More
            </a>
          </div>
        )}
        {exprActList?.i94?.data?.length > 0 &&
           exprActList.i94?.data?.map((item, i) => {
            const newObj = item.newObj;
            const strDt = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
            const expDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";
            return (
              <>
                <div className="col-md-4" key={i}>
                  <div className="card">
                    <div className="card-body p-3">
                      <div className="d-flex justify-content-between">
                        <h6>
                          <strong>i-94 </strong> {item.status == "Approved" ? <span className="badge badge-success">Valid</span> : ""}
                        </h6>
                        <div className="d-flex justify-content-center gap-3">
                          {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && (
                            <a className="btn btn-sm btn-success" onClick={() => setStateData({isVrfdModal: true, subObj: item, editModal: false, recordId: item._id})}>
                              <i className="fa-solid fa-rotate"></i>
                            </a>
                          )}
                          {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && (
                            <a className="btn btn-sm btn-primary" onClick={() => handleEditOpenModal(item)}>
                              <i className="fas fa-edit"></i>
                            </a>
                          )}
                        </div>
                      </div>
                      <dl>
                        <dt>i-94 Number: </dt>
                        <dd>{newObj?.num || ""} </dd>
                        <dt>i-94 Start Date: </dt>
                        <dd>{strDt}</dd>
                        <dt>i-94 Expiry Date: </dt>
                        <dd>{expDt}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default ExpirationI94TabComponent;
