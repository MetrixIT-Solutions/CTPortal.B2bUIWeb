/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from "react";

import {HeaderComponent} from "../header";
import {NavComponent} from "../navbar";
import MeetingLinkPopUpComponent from "./MeetingLinkPopUpComponent";

import MyProfileSideComponent from "./MyProfileSideComponent";

import NoData from "../../assets/images/no-data.svg";

const MeetingLinkComponent = (props) => {
  const {mLinkList, createModal, deleteModal, showPswd, linkData, expandedItems, updateModal} = props.state;
  const {handleMeetingCreate, handleShowPassword, handleLogout, handleMeetingLink, handleMeetingDelete, handleDelete, handleClose, handleReadMore, handlemLinkView, handlemLinkUpdate} = props;
  const maxLength = 80;
  return (
    <div className="wrapper">
      <HeaderComponent />
      <NavComponent />
      <div className="content-wrapper">
        <div className="container-full">
          <div className="content-header">
            <div classDeleteApiCallName="align-items-center">
              <div className="mr-auto">
                <h3 className="page-title">Profile</h3>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="row">
              <div className="col-12 col-lg-7 col-xl-8">
                <div className="box">
                  <div className="box-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="box-title mb-0">Meeting Links</h5>
                      {mLinkList && mLinkList.length < 10 ? (
                        <a className="btn btn-primary" size="sm" onClick={handleMeetingCreate}>
                          <i className="fa fa-plus"></i> Add
                        </a>
                      ) : (
                        <h5 className="p-3 mb-2 bg-danger text-white">You have Reached the Limit of Creating Meeting Links</h5>
                      )}
                    </div>
                    <hr />
                    <div className="container mt-4">
                      <div className="row">
                        {mLinkList && mLinkList.length > 0 ? (
                          mLinkList.map((item, index) => {
                            const isExpanded = expandedItems[item._id];
                            const displayText = isExpanded ? item.mNotes : `${item.mNotes.substring(0, maxLength)}${item.mNotes.length > maxLength ? "..." : ""}`;
                            return (
                              <div className="col-md-12">
                                <div className="card mb-12">
                                  <div className=" d-flex justify-content-between m-2">
                                    <div className="card-body">
                                      <p className="card-text" key={index}>
                                        <strong>Provider:</strong> {item.mProvider} <br />
                                        <strong>Title:</strong> {item.mTitle} <br />
                                        <strong>Sequence:</strong> {item.mSeq} <br />
                                        <strong>Meeting Link:</strong> {item.mLink} <br />
                                        <strong>UserId:</strong> {item.mUserID} <br />
                                        <div className="input-group mb-2 ">
                                          <strong className="me-2">Password:</strong>
                                          <input type={`${showPswd && item._id == linkData._id ? "text" : "password"}`} className="form-control" value={item.mPassword} />
                                          <span className="input-group-text bg-transparent eye-icon p-3">
                                            {showPswd && item._id == linkData._id ? (
                                              <i onClick={() => handleShowPassword(item, "close")} className="fa fa-eye"></i>
                                            ) : (
                                              <i onClick={() => handleShowPassword(item, "open")} className="fa fa-eye-slash"></i>
                                            )}
                                          </span>
                                        </div>
                                        <br />
                                        <strong>Description:</strong>
                                        {displayText}
                                        {item.mNotes.length > 100 && (
                                          <button onClick={() => handleReadMore(item)} style={{marginLeft: "5px"}}>
                                            {isExpanded ? "Show less" : "Show more"}
                                          </button>
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <a className="me-2" onClick={() => handlemLinkView(item)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                      </a>
                                      <a className="me-2" onClick={() => handleMeetingDelete(item)}>
                                        <i className="fa-solid fa-trash"></i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="no-data">
                            <img src={NoData}></img>
                            <p className="text-danger py-2">No Data Found </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.col  */}
              <div className="col-12 col-lg-5 col-xl-4">
                <MyProfileSideComponent state={props.profileData} handleLogout={handleLogout} />
              </div>
            </div>
            {/* /.row  */}
          </section>
          {(createModal || deleteModal || updateModal) && (
            <MeetingLinkPopUpComponent
              state={props.state}
              setStateData={props.setStateData}
              handleDelete={handleDelete}
              handleMeetingLink={handleMeetingLink}
              handleShowPassword={handleShowPassword}
              handleClose={handleClose}
              handlemLinkUpdate={handlemLinkUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkComponent;
