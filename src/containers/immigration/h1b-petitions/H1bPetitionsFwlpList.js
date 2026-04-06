/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import H1BPetitionsFlwpListComponent from '../../../components/immigration/h1b-petitions/H1BPetitionsFlwpListComponent';
import { postB2BH1BPtnsfllwUpNtsCreate, getB2BH1BPtnsfllwUpNtsList, putB2BH1BPtnsfllwUpNtsUpdate } from '../../../actions/immigration/H1BPetitionsActions';
import localForage from '../../../hooks/localForage';

class H1bPetitionsFwlpList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FwlpsModal: false,
      ptnsData: {},
      ptnsFlwpsList: [],
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
    this.setState({ FwlpsModal: false, ptnsData: {}, disable: false });
    this.props.setStateData({ ptnsData: {}, ptnFwlpModal: false });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.ptnFwlpModal !== this.props.ptnFwlpModal && this.props.ptnFwlpModal) {
      this.ptnsFollowupsListData(this.props.ptnsData);
    }
  }

  ptnsFollowupsListData = async (ptnsData) => {
    const getData = await localForage.getItem('userInfo');
    const userData = getData ? getData.value : {};
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const recordId = ptnsData._id;
    this.props.getB2BH1BPtnsfllwUpNtsList(recordId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ FwlpsModal: true, ptnsFlwpsList: data, ptnsData, Notes: '', errMsg: '', disable: false, refId: userData.refUID, rolesObj: {...rolesObj, appAcc} });
      } else {
        this.setState({ FwlpsModal: true, ptnsFlwpsList: [], ptnsData, Notes: '', errMsg: '', disable: false, refId: '', rolesObj: {...rolesObj, appAcc} });
      }
    });
  }

  ptnsFollowupsCreate = () => {
    let { Notes, ptnsData, ptnsFlwpsList } = this.state;
    if (!Notes) {
      this.setState({ errMsg: 'Notes is requried' });
    } else {
      this.setState({disable: true});
      const reqBody = {
        euUser: ptnsData.euUser,
        euName: ptnsData.euName,
        euUID: ptnsData.euUID,
        petition: ptnsData._id,
        pId: ptnsData.pId,
        pcNum: ptnsData.pcNum,
        pType: ptnsData.pType,
        b2b: ptnsData.b2b,
        b2bName: ptnsData.b2bName,
        b2bCode: ptnsData.b2bCode,
        org: ptnsData.org,
        orgName: ptnsData.orgName,
        orgCode: ptnsData.orgCode,
        obId: ptnsData.obId,
        obName: ptnsData.obName,
        obCode: ptnsData.obCode,
        team: ptnsData.team,
        tName: ptnsData.tName,
        tCode: ptnsData.tCode,
        notes: Notes
      };
      this.props.postB2BH1BPtnsfllwUpNtsCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          ptnsFlwpsList = [resObj.resData.result, ...ptnsFlwpsList];
          this.setState({ptnsFlwpsList, Notes: '', errMsg: '', disable: false});
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
        this.setState({ FwlerrMsg: "There are no changes" })
      } else {
        this.props.putB2BH1BPtnsfllwUpNtsUpdate(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ fwlpsNotesModal: false });
            this.ptnsFollowupsListData(this.props.ptnsData);
          } else {
            this.setState({ FwlerrMsg: 'Notes updation failed' });
          }
        });
      }
    }
  }

  toggleModal = () => this.setState({ fwlpsNotesModal: false, ptnsData: {}, fwNotes: '', FwlerrMsg: '' });

  render() {
    return (
      <H1BPetitionsFlwpListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
        ptnsFollowupsCreate={this.ptnsFollowupsCreate}
        toggleModal={this.toggleModal}
        handleFollowupsEdit={this.handleFollowupsEdit}
        handleFwlpsNtsUpdate={this.handleFwlpsNtsUpdate} />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BH1BPtnsfllwUpNtsList: (recordId, callback) => dispatch(getB2BH1BPtnsfllwUpNtsList(recordId, callback)),
  postB2BH1BPtnsfllwUpNtsCreate: (reqBody, callback) => dispatch(postB2BH1BPtnsfllwUpNtsCreate(reqBody, callback)),
  putB2BH1BPtnsfllwUpNtsUpdate: (recordId, reqBody, callback) => dispatch(putB2BH1BPtnsfllwUpNtsUpdate(recordId, reqBody, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(H1bPetitionsFwlpList);
