/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import NoData from "../../assets/images/no-data.svg";
import {Element} from "react-scroll";
import ExpirationI94TabComponent from "./ExpirationI94TabComponent";
import ExpirationPasspTabComponent from "./ExpirationPasspTabComponent";
import ExpirationSSnTabComponent from "./ExpirationSSnTabComponent";
import ExpirationUSIDTabComponent from "./ExpirationUSIDTabComponent";
import ExpirationVisaTabComponent from "./ExpirationVisaTabComponent";
import ExpirationWrkathTabComponent from "./ExpirationWrkathTabComponent";

const ExpirationDatesComponent = (props) => {
  const {exprActList, handleEditOpenModal, setStateData, eKey, handleExpChangeAcc, rolesObj, handleShowMoreData} = props;

  return (
    <div>
      <Accordion defaultActiveKey={["13"]} activeKey={[eKey]} onSelect={(eKey) => handleExpChangeAcc(eKey)}>
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && (
          <Element name="section13" className="section">
            <Accordion.Item eventKey="13">
              <Accordion.Header>
                <div className="d-flex justify-content-between">
                  <h6>
                    <i className="fa-solid fa-file-waveform"></i> i-94s
                  </h6>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <>
                  {exprActList?.i94?.data?.length ? (
                    <ExpirationI94TabComponent state={props.state} rolesObj={rolesObj} setStateData={setStateData} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                  ) : (
                    <div className="no-data">
                      <img src={NoData}></img>
                      <p className="text-danger py-2">No results found </p>
                    </div>
                  )}
                </>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && (
          <Element name="section14" className="section">
            <Accordion.Item eventKey="14">
              <Accordion.Header>
                <h6>
                  <i className="fa-solid fa-file-waveform"></i> USA Visa Documents
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                <>
                  {exprActList?.Visa?.data?.length ? (
                    <ExpirationVisaTabComponent state={props.state} setStateData={setStateData} rolesObj={rolesObj} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                  ) : (
                    <div className="no-data">
                      <img src={NoData}></img>
                      <p className="text-danger py-2">No results found </p>
                    </div>
                  )}
                </>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && (
          <Element name="section15" className="section">
            <Accordion.Item eventKey="15">
              <Accordion.Header>
                <h6>
                  <i className="fa-solid fa-passport"></i> Passports
                </h6>
              </Accordion.Header>
              <Accordion.Body>
                <>
                  {exprActList?.Passport?.data?.length ? (
                    <ExpirationPasspTabComponent state={props.state} setStateData={setStateData} rolesObj={rolesObj} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                  ) : (
                    <div className="no-data">
                      <img src={NoData}></img>
                      <p className="text-danger py-2">No results found </p>
                    </div>
                  )}
                </>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[12]?.isAlwd) || rolesObj?.appAcc) && (
            <Element name="section16" className="section">
              <Accordion.Item eventKey="16">
                <Accordion.Header>
                  <div className="d-flex justify-content-between">
                    <h6>
                      <i className="fa-solid fa-file-waveform"></i> Work Authorizations
                    </h6>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <>
                    {exprActList?.WrkAuth?.data?.length ? (
                      <ExpirationWrkathTabComponent state={props.state} setStateData={setStateData} rolesObj={rolesObj} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                    ) : (
                      <div className="no-data">
                        <img src={NoData}></img>
                        <p className="text-danger py-2">No results found </p>
                      </div>
                    )}
                  </>
                </Accordion.Body>
              </Accordion.Item>
            </Element>
          )}
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[15]?.isAlwd) || rolesObj?.appAcc) && (
          <Element name="section17" className="section">
            <Accordion.Item eventKey="17">
              <Accordion.Header>
                <div className="d-flex justify-content-between">
                  <h6>
                    <i className="fa-solid fa-file-waveform"></i> USA Issued National IDs
                  </h6>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <>
                  {exprActList?.USid?.data?.length ? (
                    <ExpirationUSIDTabComponent state={props.state} setStateData={setStateData} rolesObj={rolesObj} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                  ) : (
                    <div className="no-data">
                      <img src={NoData}></img>
                      <p className="text-danger py-2">No results found </p>
                    </div>
                  )}
                </>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
        {((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.actions[18]?.isAlwd) || rolesObj?.appAcc) && (
          <Element name="section18" className="section">
            <Accordion.Item eventKey="18">
              <Accordion.Header>
                <div className="d-flex justify-content-between">
                  <h6>
                    <i className="fa-solid fa-file-waveform"></i> SSN
                  </h6>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <>
                  {exprActList?.SSN?.data?.length ? (
                    <ExpirationSSnTabComponent state={props.state} setStateData={setStateData} rolesObj={rolesObj} exprActList={exprActList} handleEditOpenModal={handleEditOpenModal} handleShowMoreData={handleShowMoreData} />
                  ) : (
                    <div className="no-data">
                      <img src={NoData}></img>
                      <p className="text-danger py-2">No results found </p>
                    </div>
                  )}
                </>
              </Accordion.Body>
            </Accordion.Item>
          </Element>
        )}
      </Accordion>
    </div>
  );
};

export default ExpirationDatesComponent;
