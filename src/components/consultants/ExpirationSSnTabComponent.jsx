/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";
import moment from "moment";

const ExpirationSSnTabComponent = (props) => {
  const {exprActList, handleEditOpenModal, setStateData, rolesObj, handleShowMoreData} = props;
  const {smTypes} = props.state;

  return (
    <>
      <div className="row">
        {exprActList?.SSN?.count > 10 && !smTypes.includes('SSN') && (
          <div onClick={() => handleShowMoreData("SSN")} className="d-flex justify-content-end">
            <a className="btn btn-xs btn-primary">
              More
            </a>
          </div>
        )}
        {exprActList?.SSN?.data?.length > 0 &&
          exprActList?.SSN?.data?.map((item, i) => {
            const newObj = item.newObj;
            const strDt = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
            const expDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";
            return (
              <div className="col-md-4" key={i}>
                <div className="card">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between">
                      <h6>
                        <strong>SSN Number </strong> {item.status == "Approved" ? <span className="badge badge-success">Valid</span> : ""}
                      </h6>
                      <div className="d-flex justify-content-center gap-3">
                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[19]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-success" onClick={() => setStateData({isVrfdModal: true, subObj: item, recordId: item._id})}>
                            <i className="fa-solid fa-rotate"></i>
                          </a>
                        )}

                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[20]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-primary" onClick={() => handleEditOpenModal(item)}>
                            <i className="fas fa-edit"></i>
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
                          <dd>{expDt}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ExpirationSSnTabComponent;
