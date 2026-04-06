/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {Component} from "react";
import {connect} from "react-redux";

import MeetingLinkComponent from "../../components/my-profile/MeetingLinkComponent";
import {getB2BMeetingLinkList, postB2BMeetingLinkCreate, putB2BMeetingLinkDelete, getB2BMeetingLinkView, putB2BMeetingLinkUpdate} from "../../actions/meetingLink/meetingLinkActions";
import {PostB2BUserLogout} from "../../actions/login/LoginActions";
import localForage from "../../hooks/localForage";
import hashHistory from "../../hashHistory";

class MeetingLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mLinkList: [],
      mProvider: "",
      pName: "",
      mLink: "",
      mUserID: "",
      mPassword: "",
      mNotes: "",
      errorMsg: "",
      showPswd: false,
      createModal: false,
      deleteModal: false,
      id: props._id,
      userObj: {},
      mStatus: "Active",
      mTitle: "",
      linkData: {},
      expandedItems: {},
      mSeq: 0,
      updateModal: false,
      oldData: {},
      disable: false
    };
    this.handleReadMore = this.handleReadMore.bind(this);
  }

  componentDidMount = async () => {
    const userObj = await localForage.getItem("userInfo");
    const userData = userObj.value || {};
    this.setState({userObj: userData});
    this.getB2BMeetingData();
  };
  getB2BMeetingData = () => {
    this.props.getB2BMeetingLinkList((resObj) => {
      if (resObj.status === "200") {
        const rData = resObj.resData.result;
        this.setState({mLinkList: rData.usrsMetLinkList, errorMsg: "", mSeq: rData.usrsMetLinkCount + 1});
      } else {
        this.setState({mLinkList: [], errorMsg: "", mSeq: 1});
      }
    });
  };

  setStateData = (data) => this.setState({...data});

  handleShowPassword = (linkData, value) => {
    if (value == "open") this.setState({showPswd: true, linkData});
    else this.setState({showPswd: false, linkData: {}});
  };

  handleLogout = async () => {
    this.props.PostB2BUserLogout((resObj) => {});
    hashHistory.push("/login");
    await localForage.clearItems();
  };
  handleClose = () => this.setState({mProvider: "", mLink: "", mTitle: "", mUserID: "", mPassword: "", mNotes: "", pName: "", createModal: false, errorMsg: "", updateModal: false, linkData: {}});
  handleMeetingCreate = () => {
    this.setState({createModal: true});
    this.getB2BMeetingData();
  };
  handleMeetingLink = () => {
    const {mProvider, mLink, mUserID, mPassword, mNotes, pName, mStatus, userObj, mTitle, mSeq} = this.state;
    const teamIds = userObj?.teams?.length > 0 && userObj.teams.filter((item) => item._id);
    const othersData = mProvider != "Others" ? mProvider : pName;
    if (!mProvider) {
      this.setState({errorMsg: "Provider is required"});
    } else if (mProvider === "Others" && !pName) {
      this.setState({errorMsg: "Provider Name is required"});
    } else if (!mTitle) {
      this.setState({errorMsg: "Title is required"});
    } else if (!mLink) {
      this.setState({errorMsg: "Meeting Link is required"});
    } else {
      const reqBody = {
        obId: userObj.obId || '',
        obName: userObj.obName || '',
        obCode: userObj.obCode || '',
        obIds: userObj.obIds || [],
        teams: teamIds || [],
        pTeamIDs: userObj.pTeamIDs || [],

        mProvider: othersData,
        mLink,
        mTitle,
        mSeq,
        mUserID,
        mPassword,
        mNotes,
        pName,
        mStatus,
      };
      this.props.postB2BMeetingLinkCreate(reqBody, (resObj) => {
        this.setState({ disable: true });
        if (resObj.status == "200") {
          hashHistory.push("/meeting-links");
          this.handleClose();
          this.getB2BMeetingData();
          this.setState({ disable: false });
        } else {
          this.setState({errorMsg: "Meeting Link Creation Failed", disable: false});
        }
      });
    }
  };

  handleMeetingDelete = (linkData) => {
    this.setState({deleteModal: true, linkData: linkData});
  };
  handleDelete = () => {
    const {linkData} = this.state;
    const recordid = linkData._id;
    this.setState({disable: true});
    this.props.putB2BMeetingLinkDelete(recordid, (resObj) => {
      if (resObj.status == "200") {
        this.setState({deleteModal: false, disable: false});
        this.getB2BMeetingData();
      } else {
        this.setState({errorMsg: "Delete failed", disable: false});
      }
    });
  };

  handleReadMore = (item) => {
    this.setState((prevState) => ({
      expandedItems: {
        ...prevState.expandedItems,
        [item._id]: !prevState.expandedItems[item._id],
      },
    }));
  };

  handlemLinkView = (linkData) => {
    this.setState({updateModal: true, linkData: linkData});
    this.handleMeetingLinkViewData(linkData);
  };
  handleMeetingLinkViewData = (linkData) => {
    const recordid = linkData._id;
    this.props.getB2BMeetingLinkView(recordid, (resObj) => {
      if (resObj.status == "200") {
        this.setData(resObj.resData.result);
      } else {
        this.setState({});
      }
    });
  };
  setData = (data) => {
    const othersView = data.mProvider == "Microsoft Teams" || data.mProvider == "Zoom" || data.mProvider == "Google Meet" ? data.mProvider : "Others";
    const setMetData = {
      mProvider: othersView,
      mLink: data.mLink,
      mTitle: data.mTitle,
      mSeq: data.mSeq,
      mUserID: data.mUserID,
      mPassword: data.mPassword,
      mNotes: data.mNotes,
      pName: data.mProvider,
    };
    this.setState({...setMetData, oldData: setMetData});
  };

  handlemLinkUpdate = () => {
    const {mProvider, mLink, mUserID, mPassword, mNotes, pName, mStatus, userObj, mTitle, mSeq, linkData, oldData} = this.state;
    const othersView = mProvider == "Microsoft Teams" || mProvider == "Zoom" || mProvider == "Google Meet" ? mProvider : pName;
    const recordid = linkData._id;
    if (!mProvider) {
      this.setState({errorMsg: "mProvider is required"});
    } else if (mProvider === "Others" && !pName) {
      this.setState({errorMsg: "mProvider Name is required"});
    } else if (!mTitle) {
      this.setState({errorMsg: "Title is required"});
    } else if (!mLink) {
      this.setState({errorMsg: "Meeting Link is required"});
    } else {
      const reqBody = {
        mProvider: othersView,
        mLink: mLink,
        mTitle: mTitle,
        mSeq: mSeq,
        mUserID: mUserID,
        mPassword: mPassword,
        mNotes: mNotes,
        pName: mProvider == "Others" ? pName : mProvider,
      };
      if (JSON.stringify(oldData) != JSON.stringify(reqBody)) {
        this.setState({ disable: true });
        this.props.putB2BMeetingLinkUpdate(recordid, reqBody, (resObj) => {
          if (resObj.status == "200") {
            hashHistory.push("/meeting-links");
            this.handleClose();
            this.getB2BMeetingData();
            this.setState({ disable: false });
          } else {
            this.setState({errorMsg: "Profile Update Failed", disable: false});
          }
        });
      } else {
        this.setStateData({errorMsg: "There are no Changes", disable: false});
      }
    }
  };

  render() {
    return (
      <div>
        <MeetingLinkComponent
          state={this.state}
          profileData={this.props.LoginReducer.userObj}
          setStateData={this.setStateData}
          handleShowPassword={this.handleShowPassword}
          handleMeetingCreate={this.handleMeetingCreate}
          handleMeetingLink={this.handleMeetingLink}
          handleLogout={this.handleLogout}
          handleMeetingDelete={this.handleMeetingDelete}
          handleDelete={this.handleDelete}
          handleClose={this.handleClose}
          handleReadMore={this.handleReadMore}
          handlemLinkView={this.handlemLinkView}
          handlemLinkUpdate={this.handlemLinkUpdate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({LoginReducer: state.LoginReducer});
const mapDistachToProps = (dispatch) => ({
  getB2BMeetingLinkList: (callback) => dispatch(getB2BMeetingLinkList(callback)),
  postB2BMeetingLinkCreate: (reqBody, callback) => dispatch(postB2BMeetingLinkCreate(reqBody, callback)),
  putB2BMeetingLinkDelete: (recordid, callback) => dispatch(putB2BMeetingLinkDelete(recordid, callback)),
  getB2BMeetingLinkView: (recordid, callback) => dispatch(getB2BMeetingLinkView(recordid, callback)),
  putB2BMeetingLinkUpdate: (recordid, reqBody, callback) => dispatch(putB2BMeetingLinkUpdate(recordid, reqBody, callback)),
  PostB2BUserLogout: (callback) => dispatch(PostB2BUserLogout(callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(MeetingLink);
