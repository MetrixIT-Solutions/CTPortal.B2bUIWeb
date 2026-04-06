/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { Modal } from "react-bootstrap";
import {InvitationViewListComponent} from "../invitations";
import {InviteNotesListComponent} from '../invitations/notes';
import { InviteMeetingsListComponent } from "../invitations/meetings";


const SubmisInvtViewComponent = (props) => {
  const {viewModal, rolesObj,  inviteData, showNotesPopup, showMetgsPopup, iAddress, iWorkAuths, iWrkExps, iEducation, iUaddress, notesList, meetingsList, tabsArr, actTab, meeting, showViewSsn, userData} =props.state;
  const {setStateData, handleOpenModels, handleViewShowSsn} = props;
  const invState = {invtaView:inviteData, rolesObj, address: iAddress, workAuths: iWorkAuths, wrkExps: iWrkExps, education: iEducation, uAddress: iUaddress};
  const notesState = {notes: '',  inviteData, notesList};
  const meetingsState= {meetingsList, inviteData, actTab, tabsArr, meeting};
  return (
    <div>
      {/* Invitation View  Pop-up */}
      <Modal show={viewModal} size="xl" onHide={() => setStateData({viewModal: false, errMsg: ""})}>
        <Modal.Header closeButton>
        <div className="box-body">
          <div className="d-flex justify-content-between">
            <h4 className="modal-title mx-3">Consultant View</h4>
            <div>
              {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && (
                <button
                  className={!showNotesPopup && !showMetgsPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"}
                  title="Invitation Details"
                  onClick={() => handleOpenModels("details")}
                >
                  Invitation Details
                </button>
              )}
              {((rolesObj?.access?.length >= 7 && rolesObj?.access[6]?.actions[20]?.isAlwd) || rolesObj?.appAcc) && (
                <button className={showNotesPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"} title="Notes" onClick={() => handleOpenModels("notes")}>
                  <i className="fa-solid fa-notes-medical"></i> Notes
                </button>
              )}
              {((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && (
                <button className={showMetgsPopup ? "btn btn-smbtn-primary btn btn-sm btn-primary me-2" : "btn btn-smbtn-primary btn btn-sm btn-secondary me-2"} title="Meetings" onClick={() => handleOpenModels("meetings")}>
                  <i className="fa-regular fa-handshake"></i> Meeting
                </button>
              )}
              </div>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body>
        {showNotesPopup ? (
            <InviteNotesListComponent showNotes={true} cnsFlag={true} state={notesState}  />
          ) : showMetgsPopup ? (
            <InviteMeetingsListComponent meetingsList={meetingsList} state={meetingsState} cnsFlag={true} showActions={true}/>
          ) : (
            <InvitationViewListComponent state={invState} setStateData={setStateData} cnsFlag={true} showViewSsn={showViewSsn} handleViewShowSsn={handleViewShowSsn} userData={userData}/>
          )}       
          </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubmisInvtViewComponent;