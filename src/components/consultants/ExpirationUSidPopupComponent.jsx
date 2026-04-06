/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import moment from "moment";
import React from "react";
import {Button, Modal} from "react-bootstrap";
import {getTomorrowDate, numebersOnly} from "../../hooks/common";
import Countries from '../../../public/data/Countries.json';

const ExpirationUSidPopupComponent = (props) => {
  const {editmodal, isVrfdModal, name, num, strDt, expDt, cCode, sCode, address, area, city, zip, statesArr, iDType, errMsg, disabled, subObj} = props.state;
  const {setStateData, handlecloseModal, handleStatusUpdate, expiratUpdate, handleCountryChange, handleStateChange } = props;

  const newObj = subObj.newObj;
  const stDate = newObj?.strDt ? moment(newObj.strDt).format("DD MMM, YYYY") : "";
  const exptDt = newObj?.expDt ? moment(newObj.expDt).format("DD MMM, YYYY") : "";

  return (
    <>
      <Modal show={editmodal} onHide={() => setStateData({editmodal: false, recordId: "", errMsg: "", name: "", num: "", strDt: "", expDt: "", country: "", state: "", address: "", area: "", city: "", zip: "", cCode: "", sCode: ""})} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>USA Issud National ID </h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>National ID Type</label>
                  <span className="text-danger">*</span>
                  <select className="form-select form-control" id="participants6" name="nationalId" value={name} onChange={(e) => setStateData({name: e.target.value, iDType: "", num: "", errMsg: ""})}>
                    <option value="">Select</option>
                    <option value="DL">DL</option>
                    <option value="State ID">State ID</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              {name == "DL" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Driving License Number</label>
                    <span className="text-danger">*</span>
                    <input type="text" className="form-control" placeholder="Driving License Number" value={num} onChange={(e) => setStateData({num: e.target.value, errMsg: ""})} />
                  </div>
                </div>
              )}
              {name == "State ID" && (
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State ID Number</label>
                    <span className="text-danger">*</span>
                    <input type="text" className="form-control" placeholder="State ID Number" value={num} onChange={(e) => setStateData({num: e.target.value, errMsg: ""})} />
                  </div>
                </div>
              )}
              {name == "Other" && (
                <>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>ID Type</label>
                      <span className="text-danger">*</span>
                      <input type="text" className="form-control" placeholder="Enter National ID type" name="otherNationalId" value={iDType} onChange={(e) => setStateData({iDType: e.target.value, errMsg: ""})} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>ID Number</label>
                      <span className="text-danger">*</span>
                      <input type="text" className="form-control" placeholder="ID Number" name="idNum" value={num} onChange={(e) => setStateData({num: e.target.value, errMsg: ""})} />
                    </div>
                  </div>
                </>
              )}
              <div className="col-md-6">
                <div className="form-group">
                  <label>Issued Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Issued Date" value={strDt} onChange={(e) => setStateData({strDt: e.target.value, expDt: '', errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <span className="text-danger">*</span>
                  <input type="date" className="form-control" placeholder="Expiry Date" value={expDt} min={strDt} onChange={(e) => setStateData({expDt: e.target.value, errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Country</label>
                  <span className="text-danger">*</span>
                  <select className="form-select form-control" id="participants6" name="cCode" value={cCode} onChange={handleCountryChange}>
                    <option value="">Select</option>
                    {Countries.length > 0 &&
                      Countries.map((item, i) => (
                        <option key={i} value={item.code}>
                          {item.value}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <span className="text-danger">*</span>
                  <select className="form-select form-control" id="participants6" name="stCode" value={sCode} onChange={handleStateChange}>
                    <option value="">Select</option>
                    {statesArr &&
                      statesArr.length > 0 &&
                      statesArr.map((item, i) => (
                        <option key={i} value={item.stateCode}>
                          {item.stateName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Address </label>
                  <span className="text-danger">*</span>
                  <input type="text" className="form-control" placeholder="Address" name="adrs" value={address} onChange={(e) => setStateData({address: e.target.value, errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Apt / Suite </label>
                  <span className="text-danger">*</span>
                  <input type="text" className="form-control" placeholder="Street / Area" name="area" value={area} onChange={(e) => setStateData({area: e.target.value, errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>City </label>
                  <span className="text-danger">*</span>
                  <input type="text" className="form-control" placeholder="City" name="city" value={city} onChange={(e) => setStateData({city: e.target.value, errMsg: ""})} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>ZIP Code</label>
                  <span className="text-danger">*</span>
                  <input type="text" className="form-control" placeholder="ZIP Code" maxLength={10} name="pincode" value={zip} onKeyPress={numebersOnly} onChange={(e) => setStateData({zip: e.target.value, errMsg: ""})} />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-center text-danger">{errMsg}</div>
                {/* <div className='text-center text-success'>{successMsg}</div> */}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    type="button"
                    disabled={disabled}
                    className="btn btn-danger mr-3"
                    onClick={handlecloseModal}
                  >
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
                  <dd>{stDate}</dd>
                  <dt>Expiry Date: </dt>
                  <dd>{exptDt}</dd>
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

export default ExpirationUSidPopupComponent;
