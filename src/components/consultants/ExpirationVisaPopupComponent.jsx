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

const ExpirationVisaPopupComponent = (props) => {
  const {editmodal, isVrfdModal, status, strDt, expDt, errMsg, disabled, subObj} = props.state;
  const {setStateData, handlecloseModal, handleStatusUpdate, expiratUpdate} = props;

  const newObj = subObj.newObj;
  const strtDate = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
  const expDate = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";

  return (
    <>
      <Modal show={editmodal} onHide={() => setStateData({editmodal: false, errMsg: ""})} size="l">
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Visa</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Status</label>
                  <span className="text-danger">*</span>
                  <select className="form-control form-select " value={status} onChange={(e) => setStateData({status: initCaps(e.target.value), errMsg: ""})}>
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
              <div className="col-md-6">
                <div className="form-group">
                  <label>Viasa Start Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Viasa Start Date" value={strDt} onChange={(e) => setStateData({strDt: e.target.value, expDt: '', errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Visa Expiry Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Visa Expiry Date" value={expDt} min={strDt} onChange={(e) => setStateData({expDt: e.target.value, errMsg: ""})} />
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
                  <dt>Is Verified: </dt>
                  <dd>{newObj?.isVrfd ? "Yes" : "No"}</dd>
                  <dt>Status</dt>
                  <dd>{newObj?.status}</dd>
                  <dt>Visa Start Date: </dt>
                  <dd>{strtDate}</dd>
                  <dt>Visa Expiry Date: </dt>
                  <dd>{expDate}</dd>
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

export default ExpirationVisaPopupComponent;
