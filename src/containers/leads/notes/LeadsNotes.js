/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { LeadNotesComponent } from '../../../components/leads/notes';
import {postB2BOnBoardingNotesCreateAPI, getB2BOnBoardingNotesList, putB2BOnBoardingNotesUpdate } from '../../../actions/leads/LeadsAction';
import localForage from '../../../hooks/localForage';

class LeadsNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeMpdal: false,
      leadData: {},
      disable: false,
      type: '',
      Notes: '',
      notesList: [],
      errMsg: '',
      updtNotes: '',
      notesModal: false,
      notesData: {},
      ntsErrMsg: '',
      ncAccess: false,
      userData: {}
    }
  }

  setStateData = (data) => this.setState({ ...data });
  handleClose = () => {
    this.setState({ closeMpdal: false, leadData: {}, disable: false, type: '' });
    this.props.setStateData({ leadView: {}, showNotes: false });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.showNotes !== this.props.showNotes && this.props.showNotes) {
      this.onBoardingNotesListData(this.props.leadData);
    }
  }
  onBoardingNotesListData = async (leadData) => {
    const userObj = await localForage.getItem('userInfo');
    const userData = userObj.value || {};
    const {ncAccess, type} = this.props;
    const lead = leadData._id, invite = leadData.euUser;
    const reqBody = {lead, type, invite};
    this.props.getB2BOnBoardingNotesList(reqBody, (resObj) => {             
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ userData, ncAccess, closeMpdal: true, type, notesList: data, leadData, Notes: '', errMsg: '', disable: false, updtNotes: '', notesModal: false, notesData: {}, ntsErrMsg: ''});
      } else {
        this.setState({ userData, ncAccess, closeMpdal: true, type, notesList: [], leadData, Notes: '', errMsg: '', disable: false, updtNotes: '', notesModal: false, notesData: {}, ntsErrMsg: '' });
      }
    });
  }

  handleNotesCreate = () => {
    const { Notes, leadData, type, notesList } = this.state;
    if (!Notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({disable: true});
      const reqBody = {
        notes: Notes, type, invite: leadData.euUser,
        invUserId: leadData.euUID, invUser: leadData.euName,
        invUserPrimary: leadData.euPrimary,
        lead: leadData._id, leadId: leadData.leadId,
        org: leadData.org, orgCode: leadData.orgCode, orgName: leadData.orgName
      };
      this.props.postB2BOnBoardingNotesCreateAPI(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const data = resObj.resData.result; // Object.assign({}, resObj.resData.result.toObject());
          const newNotesList = [data, ...notesList];
          this.setState({disable: false, notesList: newNotesList});
        } else {
          this.setState({ errMsg: 'Notes creation failed', disable: false });
        }
      });
    }
  }

  updtNotesModal = () => this.setState({ notesModal: false, notesData: {}, updtNotes: '', ntsErrMsg: '', disable: false });
  handleNtsUpdate = () => {
    let { notesData, type, updtNotes, leadData, notesList } = this.state;    
    if (!updtNotes) {
      this.setState({ ntsErrMsg: 'Notes is requried' });
    } else {
      if (updtNotes === notesData.notes) {
        this.setState({ ntsErrMsg: 'There are no changes' });
      } else {
        this.setState({ disable: true });
        const reqBody = { notes: updtNotes, type, lead: leadData._id, invite: leadData.euUser };      
        this.props.putB2BOnBoardingNotesUpdate(notesData._id, reqBody, (resObj) => {          
          if (resObj.status == '200') {
            const data = resObj.resData.result; // Object.assign({}, resObj.resData.result.toObject());
            const index = notesList.findIndex((record) => record._id === data._id);
            if(index > -1) notesList[index] = data;
            this.setState({ notesList, notesModal: false, notesData: {}, updtNotes: '', ntsErrMsg: '', disable: false });
            // this.onBoardingNotesListData(this.props.leadData);
          } else {
            this.setState({ ntsErrMsg: 'Notes updation failed', disable: false });
          }
        });
      }
    }
  }

  render() {    
    return (
      <LeadNotesComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
        handleNotesCreate={this.handleNotesCreate}
        updtNotesModal={this.updtNotesModal}
        handleNtsUpdate={this.handleNtsUpdate} />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BOnBoardingNotesList: (reqBody, callback) => dispatch(getB2BOnBoardingNotesList(reqBody, callback)),
  postB2BOnBoardingNotesCreateAPI: (reqBody, callback) => dispatch(postB2BOnBoardingNotesCreateAPI(reqBody, callback)),
  putB2BOnBoardingNotesUpdate: (recordId, reqBody, callback) => dispatch(putB2BOnBoardingNotesUpdate(recordId, reqBody, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(LeadsNotes);
