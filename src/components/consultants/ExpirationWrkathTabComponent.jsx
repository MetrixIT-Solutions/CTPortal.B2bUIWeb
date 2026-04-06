/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";
import moment from "moment";

const ExpirationWrkathTabComponent = (props) => {
  const {exprActList, handleEditOpenModal, setStateData, rolesObj, handleShowMoreData} = props;
  const {smTypes} = props.state;

  return (
    <>
      <div className="row">
        {exprActList?.WrkAuth?.count > 10 && !smTypes.includes('WrkAuth') && (
          <div onClick={() => handleShowMoreData("WrkAuth")} className="d-flex justify-content-end">
            <a className="btn btn-xs btn-primary">
              More
            </a>
          </div>
        )}
        {exprActList?.WrkAuth?.data?.length > 0 && !smTypes.includes('Passport') &&
          exprActList?.WrkAuth?.data?.map((item, i) => {
            const newObj = item.newObj;
            const strDt = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
            const expDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";
            return (
              <div className="col-md-4" key={i}>
                <div className="card">
                  <div className="card-body p-3">
                    <div className="d-flex justify-content-between">
                      <h6>
                        <strong>Work Authorization </strong> {item.status == "Approved" ? <span className="badge badge-success">Valid</span> : ""}
                      </h6>
                      <div className="d-flex justify-content-center gap-3">
                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[13]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-success" onClick={() => setStateData({isVrfdModal: true, subObj: item, editmodal: false, recordId: item._id})}>
                            <i className="fa-solid fa-rotate"></i>
                          </a>
                        )}
                        {item.status !== "Approved" && ((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[14]?.isAlwd) || rolesObj?.appAcc) && (
                          <a className="btn btn-sm btn-primary" onClick={() => handleEditOpenModal(item)}>
                            <i className="fas fa-edit"></i>
                          </a>
                        )}
                      </div>
                    </div>
                    <dl>
                      <dt>Status: </dt>
                      <dd>{newObj?.status}</dd>
                      {newObj.status == "CPT" && (
                        <>
                          <dt>Position: </dt>
                          <dd>{newObj?.card?.position}</dd>
                        </>
                      )}
                      {(newObj.status == "OPT" || newObj.status == "Stem OPT") && (
                        <>
                          <dt>Card Number: </dt>
                          <dd>{newObj?.card?.num}</dd>
                        </>
                      )}
                      {(newObj.status == "CPT" || newObj.status == "OPT" || newObj.status == "Stem OPT") && (
                        <>
                          <dt>Sevis Number: </dt>
                          <dd>{newObj?.card?.sevisNum}</dd>
                        </>
                      )}
                      {newObj.status !== "H1B" && newObj.status !== "CPT" && (
                        <>
                          <dt>USCIS Number: </dt>
                          <dd>{newObj?.card?.uscisNum}</dd>
                        </>
                      )}
                      {newObj.status == "H1B" && (
                        <>
                          <dt>Receipt Number: </dt>
                          <dd>{newObj?.card?.receiptNum}</dd>
                        </>
                      )}
                      <dt>Work Authorization Start Date: </dt>
                      <dd>{strDt}</dd>
                      <dt>Work Authorization Expiry Date: </dt>
                      <dd>{expDt}</dd>
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

export default ExpirationWrkathTabComponent;
