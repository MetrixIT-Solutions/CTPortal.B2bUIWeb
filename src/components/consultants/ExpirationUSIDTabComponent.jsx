/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";
import moment from "moment";

const ExpirationUSIDTabComponent = (props) => {
  const {setStateData, exprActList, handleEditOpenModal, rolesObj, handleShowMoreData} = props;
  const {smTypes} = props.state;

  return (
    <>
      <div className="row">
        {exprActList?.USid?.count > 10 && !smTypes.includes('USid') &&  (
          <div onClick={() => handleShowMoreData("USid")} className="d-flex justify-content-end">
            <a className="btn btn-xs btn-primary">
              More
            </a>
          </div>
        )}
        {exprActList?.USid?.data?.length > 0 &&
          exprActList?.USid?.data?.map((item, i) => {
            const newObj = item.newObj;
            const strDt = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
            const expDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";
            return (
              <div className="col-md-4" key={i}>
                <div className="card">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between">
                      <h6>
                        <strong>USA Issued National ID </strong> {item.status == "Approved" ? <span className="badge badge-success">Valid</span> : ""}
                      </h6>
                      <div className="d-flex justify-content-center gap-3">
                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[16]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-success" onClick={() => setStateData({isVrfdModal: true, subObj: item, editmodal: false, recordId: item._id})}>
                            <i className="fa-solid fa-rotate"></i>
                          </a>
                        )}
                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[17]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-primary" onClick={() => handleEditOpenModal(item)}>
                            <i className="fas fa-edit"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <dl>
                      <dt>National ID Type: </dt>
                      <dd>{newObj.name}</dd>
                      {newObj.name == "DL" && (
                        <>
                          <dt>Driving License Number: </dt>
                          <dd>{newObj.num}</dd>
                        </>
                      )}
                      {newObj.name == "State ID" && (
                        <>
                          <dt>State ID Number: </dt>
                          <dd>{newObj.num}</dd>
                        </>
                      )}
                      {newObj.name == "Other" && (
                        <>
                          <dt>ID Type: </dt>
                          <dd>{newObj.iDType}</dd>
                          <dt>ID Number: </dt>
                          <dd>{newObj.num}</dd>
                        </>
                      )}
                      <dt>Issued Date: </dt>
                      <dd>{strDt}</dd>
                      <dt>Expiry Date: </dt>
                      <dd>{expDt}</dd>
                      <dt>Country: </dt>
                      <dd>{newObj.country}</dd>
                      <dt>State: </dt>
                      <dd>{newObj.state}</dd>
                      <dt>Address: </dt>
                      <dd>{newObj.hNum}</dd>
                      <dt>Apt/Suite: </dt>
                      <dd>{newObj.area}</dd>
                      <dt>City: </dt>
                      <dd>{newObj.city}</dd>
                      <dt>ZIP Code: </dt>
                      <dd>{newObj.zip}</dd>
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

export default ExpirationUSIDTabComponent;
