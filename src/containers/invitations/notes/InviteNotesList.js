/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {InviteNotesListComponent} from '../../../components/invitations/notes';
import { postB2BConsInviteNotesList, postB2BConsInviteNotesCreate } from '../../../actions/invitations/NotesActions';
import localForage from '../../../hooks/localForage';

class InviteNotesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      notesModal: false,
      pgNum: 1,
      notesList: [],
      inviteData: {},
      rolesObj: {},
      notes: '', errMsg: '', disable: false, loading: true
    };
  }
  setStateData = (data) => this.setState({ ...data });
  handleClose = () => {
    this.setState({notesModal: false, pgNum: 1, inviteData: {}, notes: '', errMsg: '', disable: false});
    this.props.handleNotes({inviteData: {}, showNotes: false});
  }

  componentDidUpdate (prevProps) {
    if(prevProps.showNotes !== this.props.showNotes && this.props.showNotes) {
      this.inviteNotesList(1, this.props.inviteData);
    }
  }
  // invite notes list
  inviteNotesList = async (pgNum, inviteData) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    this.setState({ loading: true, notesModal: true, rolesObj: { ...rolesObj, appAcc } });
    const recordId = inviteData._id;
    const reqBody = { pgNum };
    this.props.postB2BConsInviteNotesList(recordId, reqBody, (response) => {
      if (response.status == '200') {
        this.setState({ notesList: response.resData.result.NotesList, pgNum, inviteData, notes: '', errMsg: '', disable: false, loading: false });
      } else {
        this.setState({ notesList: [], pgNum, inviteData, notes: '', errMsg: '', disable: false, loading: false });
      }
    });
  }

  // invite notes create
  notesCreate = (event) => {
    const { notes, inviteData } = this.state;
    if (!notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({ disable: true });
      const reqBody = {
        invite: inviteData._id, userId: inviteData.refUID, email: inviteData.emID, notes, invUser: inviteData.name
      };
      this.props.postB2BConsInviteNotesCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.inviteNotesList(1, inviteData);
        } else {
          this.setState({ errMsg: 'Notes Create Failed', disable: false });
        }
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Offcanvas show={this.state.notesModal} onHide={this.handleClose} className='w-50'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notes</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <InviteNotesListComponent state={this.state} setStateData={this.setStateData} handleClose={this.handleClose} notesCreate={this.notesCreate} />
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BConsInviteNotesList: (invId, body, callback) => dispatch(postB2BConsInviteNotesList(invId, body, callback)),
  postB2BConsInviteNotesCreate: (body, callback) => dispatch(postB2BConsInviteNotesCreate(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(InviteNotesList);
