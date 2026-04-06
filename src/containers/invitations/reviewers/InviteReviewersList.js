/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { InviteReviewersListComponent } from '../../../components/invitations/reviewers';
import { getB2BConsInviteReviewersList, postB2BConsInviteReviewersCreate, postB2BConsInviteReviewerNotesCreate } from '../../../actions/invitations/ReviewersAction';
import { postB2BUsersList } from '../../../actions/users/UsersActions';

class InviteReviewersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewModal: false,
      inviteData: {},
      reviewList: [],
      usrsList: [],
      pgNum: 1,
      Notes: '',
      errMsg: '',
      disable: false,
      selectedUsers: [],
      rvNotes : '',
      rvNotesModal : false,
      reviewData: {},
      rvErrMsg: ''
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ reviewModal: false, Notes: '', pgNum: 1, inviteData: {}, disable: false, usrsList: [], selectedUsers: [], rvNotesModal: false });
    this.props.handleReviewers({ inviteData: {}, showReview: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.showReview !== this.props.showReview && this.props.showReview) {
      this.reviewsListData(1, this.props.inviteData);
      this.postB2BUsersData();
    }
  }

  // invite reviewers list
  reviewsListData = (pgNum, inviteData) => {
    const invId = inviteData._id;
    const reqBody = { pgNum };
    this.props.getB2BConsInviteReviewersList(invId, reqBody, (resObj) => {            
      if (resObj.status == '200') {
        this.setState({ reviewModal: true, reviewList: resObj.resData.result, pgNum, inviteData, Notes: '', errMsg: '', disable: false, selectedUsers: [] });
      } else {
        this.setState({ reviewModal: true, reviewList: [], pgNum, inviteData, Notes: '', errMsg: '', disable: false });
      }
    })
  }

  postB2BUsersData = () => {
    const reqBody = { actPgNum: 1, rLimit: 100, searchStr: '', status: 'Active' };
    this.props.postB2BUsersList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const usrsList = resObj.resData.result.usrsList.map((item) => {
          return { label: item.name, value: item._id, ...item };
        });
        this.setState({ usrsList });
      } else {
        this.setState({ usrsList: [] });
      }
    });
  }

  reviewCreate = () => {
    const { selectedUsers, Notes, inviteData } = this.state;
    const uid = inviteData._id
    const ids = selectedUsers && selectedUsers.length > 0 ? selectedUsers.map((item) => item._id) : [];
    const names = selectedUsers && selectedUsers.length > 0 ? selectedUsers.map((item) => item.name) : [];
    if (selectedUsers.length < 1) {
      this.setState({ errMsg: 'Select atleast one user requried' });
    } else if(!Notes) {
      this.setState({ errMsg: 'Notes is requeied'})
    } else {
      const reqBody = { uid, ids, names, notes: Notes };
      this.props.postB2BConsInviteReviewersCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.reviewsListData(1, inviteData);
        } else {
          this.setState({ errMsg: 'Review Create Failed', disable: false });
        }
      });
    }
  }

  handleAddReviewNotes = (data) => this.setState({rvNotesModal : true, reviewData: data, rvErrMsg: '', rvNotes: ''});
  toggleModal = () => this.setState({rvNotesModal: false, inviteData: {}, rvNotes: ''});

  handleReviewChange = (selectedUsers) => {
    this.setState({ selectedUsers, errMsg: '' });
  }

  handleWriteReview = () => {
    const { reviewData, inviteData, rvNotes } = this.state;
    const rvId = reviewData._id;
    if(!rvNotes){
     this.setState({rvErrMsg: 'Review Notes is requried'});
    }else {
      const reqBody = { rvId, review: rvNotes };
      this.props.postB2BConsInviteReviewerNotesCreate(reqBody, (resObj) => {
        if(resObj.status == '200'){
         this.setState({rvNotesModal: false, rvErrMsg: '', rvNotes: '' });
         this.reviewsListData(1, inviteData);
        }else {
          this.setState({rvErrMsg: 'Review Notes create failed'});
        }
      })
    }
  }

  render() {
    return (
      <div>
        <Offcanvas show={ this.state.reviewModal} onHide={this.handleClose} className='w-50'  >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Reviewer(s)</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <InviteReviewersListComponent state={this.state} setStateData={this.setStateData} handleReviewChange={this.handleReviewChange} handleClose={this.handleClose} reviewCreate={this.reviewCreate} handleAddReviewNotes={this.handleAddReviewNotes} handleWriteReview={this.handleWriteReview} rvNotes={this.rvNotes} toggleModal={this.toggleModal}/>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BConsInviteReviewersList: (invId, reqBody, callback) => dispatch(getB2BConsInviteReviewersList(invId, reqBody, callback)),
  postB2BConsInviteReviewersCreate: (reqBody, callback) => dispatch(postB2BConsInviteReviewersCreate(reqBody, callback)),
  postB2BUsersList: (reqBody, callback) => dispatch(postB2BUsersList(reqBody, callback)),
  postB2BConsInviteReviewerNotesCreate : (reqBody, callback) => dispatch(postB2BConsInviteReviewerNotesCreate(reqBody, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(InviteReviewersList);
