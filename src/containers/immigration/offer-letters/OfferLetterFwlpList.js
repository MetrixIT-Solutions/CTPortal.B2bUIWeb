/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { OfferLetterFlwpListComponent } from '../../../components/immigration/offer-letters';
import { postB2BOfrLtrFwlpCreate, getB2BOfrLtrfllwUpNtsList, putB2BOfrLtrfllwUpNtsUpdate } from '../../../actions/immigration/OfferLetterActions';
import localForage from '../../../hooks/localForage';

class OfferLetterFwlpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FwlpsModal: false,
      ofrLtrData: {},
      ofrLtrFlwpsList: [],
      Notes: '',
      fwNotes: '',
      errMsg: '',
      disable: false,
      fwlpsNotesModal: false,
      followupData: {},
      FwlerrMsg: '',
      refId: '',
      rolesObj: {},
      userData: {},
    }
  }
  setStateData = (data) => this.setState({ ...data });
  handleClose = () => {
    this.setState({ FwlpsModal: false, ofrLtrData: {}, disable: false });
    this.props.setStateData({ ofrLtrData: {}, ofrLtrFwlpModal: false });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.ofrLtrFwlpModal !== this.props.ofrLtrFwlpModal && this.props.ofrLtrFwlpModal) {
      this.ofrLtrFollowupsListData(this.props.ofrLtrData);
    }
  }

  ofrLtrFollowupsListData = async (ofrLtrData) => {
    const getData = await localForage.getItem('userInfo');
    const userData = getData ? getData.value : {};
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const recordId = ofrLtrData._id;
    this.props.getB2BOfrLtrfllwUpNtsList(recordId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ FwlpsModal: true, ofrLtrFlwpsList: data, ofrLtrData, Notes: '', errMsg: '', disable: false, refId: userData.refUID, rolesObj: {...rolesObj, appAcc} });
      } else {
        this.setState({ FwlpsModal: true, ofrLtrFlwpsList: [], ofrLtrData, Notes: '', errMsg: '', disable: false, refId: '', rolesObj: {...rolesObj, appAcc} });
      }
    });
  }

  ofrLtrFollowupsCreate = () => {
    let { Notes, ofrLtrData, ofrLtrFlwpsList } = this.state;
    if (!Notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({disable: true});
      const reqBody = {
        euUser: ofrLtrData.euUser,
        euName: ofrLtrData.euName,
        euUID: ofrLtrData.euUID,
        ol: ofrLtrData._id,
        oId: ofrLtrData.oId,
        olcNum: ofrLtrData.olcNum,
        b2b: ofrLtrData.b2b,
        b2bName: ofrLtrData.b2bName,
        b2bCode: ofrLtrData.b2bCode,
        org: ofrLtrData.org,
        orgName: ofrLtrData.orgName,
        orgCode: ofrLtrData.orgCode,
        obId: ofrLtrData.obId,
        obName: ofrLtrData.obName,
        obCode: ofrLtrData.obCode,
        team: ofrLtrData.team,
        tName: ofrLtrData.tName,
        tCode: ofrLtrData.tCode,
        notes: Notes,
      };
      this.props.postB2BOfrLtrFwlpCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          ofrLtrFlwpsList = [resObj.resData.result, ...ofrLtrFlwpsList];
          this.setState({ofrLtrFlwpsList, Notes: '', errMsg: '', disable: false});
        } else {
          this.setState({ errMsg: 'Note creation failed', disable: false });
        }
      });
    }
  }

  handleFollowupsEdit = (followupData) => {
    this.setState({ fwlpsNotesModal: true, followupData, fwNotes: followupData.notes, errMsg: '' });
  }

  handleFwlpsNtsUpdate = () => {
    const { followupData, fwNotes } = this.state;
    if (!fwNotes) {
      this.setState({ FwlerrMsg: 'Notes is requried' });
    } else {
      const recordId = followupData._id;
      const reqBody = { notes: fwNotes };
      if (reqBody.notes === followupData.notes) {
        this.setState({ FwlerrMsg: 'There are no changes' })
      } else {
        this.props.putB2BOfrLtrfllwUpNtsUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ fwlpsNotesModal: false });
            this.ofrLtrFollowupsListData(this.props.ofrLtrData);
          } else {
            this.setState({ FwlerrMsg: 'Notes updation failed' });
          }
        });
      }
    }
  }

  toggleModal = () => this.setState({ fwlpsNotesModal: false, ofrLtrData: {}, fwNotes: '', FwlerrMsg: '' });

  render() {
    return (
      <OfferLetterFlwpListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
        ofrLtrFollowupsCreate={this.ofrLtrFollowupsCreate}
        toggleModal={this.toggleModal}
        handleFollowupsEdit={this.handleFollowupsEdit}
        handleFwlpsNtsUpdate={this.handleFwlpsNtsUpdate} />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BOfrLtrfllwUpNtsList: (recordId, callback) => dispatch(getB2BOfrLtrfllwUpNtsList(recordId, callback)),
  postB2BOfrLtrFwlpCreate: (reqBody, callback) => dispatch(postB2BOfrLtrFwlpCreate(reqBody, callback)),
  putB2BOfrLtrfllwUpNtsUpdate: (recordId, body, callback) => dispatch(putB2BOfrLtrfllwUpNtsUpdate(recordId, body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(OfferLetterFwlpList);
