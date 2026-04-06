/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from "moment";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import {getTomorrowDate, initCaps} from "../../hooks/common";

const ExpirationWrkAuthPopupComponent = (props) => {
  const {editmodal, isVrfdModal, status, card, expDt, strDt, errMsg, disabled, subObj} = props.state;
  const {setStateData, handlecloseModal, handleStatusUpdate, expiratUpdate} = props;

  const newObj = subObj.newObj;
  const stDate = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
  const exptDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";

  return (
    <>
      <Modal show={editmodal} onHide={() => setStateData({editmodal: false, status: "", num: "", strDt: "", expDt: "", receiptNum: "", position: "", uscisNum: "", sevisNum: "", errMsg: ""})} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Work Authorization </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Status</label>
                  <span className="text-danger">*</span>
                  <select className="form-control form-select " id="Status" name="Status" value={status} onChange={(e) => setStateData({status: initCaps(e.target.value), errMsg: ""})}>
                    <option value="">Select Visa Status</option>
                    <option value="CPT">CPT</option>
                    <option value="OPT">OPT</option>
                    <option value="Stem OPT">Stem OPT</option>
                    <option value="H1B">H1B</option>
                    <option value="H4EAD">H4 EAD</option>
                    <option value="H4">H4</option>
                    <option value="GCEAD">GC EAD</option>
                    <option value="GC">GC</option>
                    <option value="L2">L2</option>
                    <option value="Citizen">Citizen</option>
                    <option value="Canadian">Canadian</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {status == "CPT" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Position</label>
                    <span className="text-danger">*</span>
                    <select className="form-select form-control" id="position" name="position" value={card.position} onChange={(e) => setStateData({card: {...card, position: e.target.value}, errMsg: ""})}>
                      <option value="">Select Position</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Full Time">Full Time</option>
                    </select>
                  </div>
                </div>
              )}
              {(status == "OPT" || status == "Stem OPT" || status == "H4" || status == "GCEAD" || status == "GC" || status == "L2" || status == "H4EAD" || status == "Citizen" || status == "Canadian" || status == "Other") && (
                <>
                  {status !== "H4" && status !== "GCEAD" && status !== "GC" && status !== "L2" && status !== "H4EAD" && status !== "Citizen" && status !== "Canadian" && status !== "Other" ? (
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Card Number</label>
                        <span className="text-danger">*</span>
                        <input type="text" className="form-control" placeholder="Enter Card Number" name="cardNum" value={card.cardnum} onChange={(e) => setStateData({card: {...card, cardnum: e.target.value}, errMsg: ""})} />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>USCIS Number</label>
                      <span className="text-danger">*</span>
                      <input type="text" className="form-control" placeholder="Enter USCIS Number" maxLength={20} name="USCISNum" value={card.uscisNum} onChange={(e) => setStateData({card: {...card, uscisNum: e.target.value}, errMsg: ""})} />
                    </div>
                  </div>
                </>
              )}
              {(status == "CPT" || status == "OPT" || status == "Stem OPT") && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Sevis Number</label>
                    <span className="text-danger">*</span>
                    <input type="text" className="form-control" placeholder="Sevis Number" name="sevisNum" value={card.sevisNum} onChange={(e) => setStateData({card: {...card, sevisNum: e.target.value}, errMsg: ""})} />
                  </div>
                </div>
              )}
              {status == "H1B" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Receipt Number</label>
                    <span className="text-danger">*</span>
                    <input type="text" className="form-control" placeholder="Enter Receipt Number" name="receiptNum" value={card.receiptNum} onChange={(e) => setStateData({card: {...card, receiptNum: e.target.value}, errMsg: ""})} />
                  </div>
                </div>
              )}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Work Authorization Start Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Work Authorization Start Date" value={strDt} onChange={(e) => setStateData({strDt: e.target.value, expDt: "", errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Work Authorization Expiry Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Work Authorization Expiry Date" value={expDt} min={strDt} onChange={(e) => setStateData({expDt: e.target.value, errMsg: ""})} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-center text-danger">{errMsg}</div>
                {/* <div className='text-center text-success'>{successMsg}</div> */}
                <div className="d-flex justify-content-center mt-3">
                  <button type="button" disabled={disabled} className="btn btn-danger mr-3" onClick={handlecloseModal}>
                    Back
                  </button>
                  <button onClick={expiratUpdate} disabled={disabled} type="button" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Verified update */}
      <Modal show={isVrfdModal} onHide={() => setStateData({isVrfdModal: false, leadData: {}, errMsg: ""})} size="md" className="update-modal">
        <Modal.Header closeButton>
          <h4 className="modal-title">Verified Update</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-10">
              <div className="card-body p-3">
                <dl>
                  <dt>Status: </dt>
                  <dd>{newObj.status}</dd>
                  {newObj.status == "CPT" && (
                    <>
                      <dt>Position: </dt>
                      <dd>{newObj?.position}</dd>
                    </>
                  )}
                  {newObj.status == "OPT" ||
                    (newObj.status == "Stem OPT" && (
                      <>
                        <dt>Card Number: </dt>
                        <dd>{newObj?.num}</dd>
                      </>
                    ))}
                  {(newObj.status == "CPT" || newObj.status == "OPT" || newObj.status == "Stem OPT") && (
                    <>
                      <dt>Sevis Number: </dt>
                      <dd>{newObj?.sevisNum}</dd>
                    </>
                  )}
                  {newObj.status !== "H1B" && newObj.status !== "CPT" && (
                    <>
                      <dt>USCIS Number: </dt>
                      <dd>{newObj?.uscisNum}</dd>
                    </>
                  )}
                  {newObj.status == "H1B" && (
                    <>
                      <dt>Receipt Number: </dt>
                      <dd>{newObj?.receiptNum}</dd>
                    </>
                  )}
                  <dt>Work Authorization Start Date: </dt>
                  <dd>{stDate}</dd>
                  <dt>Work Authorization Expiry Date: </dt>
                  <dd>{exptDt}</dd>
                </dl>
              </div>
            </div>
          </div>
          <h6 className="text-danger">
            Are you sure, want to <strong>Approved ? </strong>
          </h6>
        </Modal.Body>
        <div className="text-center text-danger">{errMsg}</div>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={() => setStateData({isVrfdModal: false, leadData: {}, errMsg: ""})}>
            No
          </Button>
          <Button variant="success" size="sm" disabled={disabled} onClick={handleStatusUpdate}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpirationWrkAuthPopupComponent;
