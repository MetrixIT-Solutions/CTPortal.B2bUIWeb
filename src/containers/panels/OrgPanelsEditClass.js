/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';

import { OrgPanelsEditComponent } from '../../components/panels';
import { postB2BOrgTeamsUpdate, getB2BOrgTeamsView, postB2BOrgTeamsList } from '../../actions/panels/PanelsActions';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';

class OrgPanelsEditClass extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recordId: props.id,
      org: '', orgName: '', orgCode: '',
      oTeam: '', otCode: '',
      otStatus: 'Active', otNotes: '',
      potId: '', potName: '', potCode: '',
      potLevel: '', potlIds: [],
      oldData: {}, errMsg: '', disable: false,

      potList: [], iamParent: []
    };
  }
  setStateData = (data) => this.setState({ ...data });
  componentDidMount = () => {
    this.getB2BOrgTeamsViewData();
  }
  getB2BOrgTeamsViewData = () => {
    const { recordId } = this.state;
    this.props.getB2BOrgTeamsView(recordId, (resObj) => {
      if (resObj.status == '200') {
        const pnlsData = resObj.resData.result;
        this.setPanelsList(pnlsData);
      } else {
        const { orgTeamsList } = this.props.PanelsReducer;
        const pnlsData = orgTeamsList?.length && orgTeamsList.find(item => item._id === recordId) || {};
        pnlsData?._id && this.setPanelsList(pnlsData);
      }
    });
  }
  setPanelsData = (data) => {
    const panelsData = {
      recordId: data._id,
      org: data.org,
      orgName: data.orgName,
      orgCode: data.orgCode,
      oTeam: data.oTeam,
      otCode: data.otCode,
      otStatus: data.otStatus,
      otNotes: data.otNotes,
      potId: data._id !== data.potId ? data.potId : '',
      potName: data._id !== data.potId ? data.potName : '',
      potCode: data._id !== data.potId ? data.potCode : '',
      potLevel: data.potLevel,
      potlIds: data.potlIds
    };
    return { ...panelsData, oldData: panelsData };
  }

  // panels List Data
  setPanelsList = (pnlsData) => {
    if(pnlsData?._id) {
      const data = this.setPanelsData(pnlsData);
      const reqBody = {orgID: pnlsData.org, pgNum: 1, limit: 100 };
      this.props.postB2BOrgTeamsList(reqBody, (resObj) => {
        if(resObj.status === '200') {
          const {recordId} = this.state;
          resObj.resData.result.orgTeamsList.sort((a, b) => a.oTeam - b.oTeam);
          resObj.resData.result.orgTeamsList.sort((a, b) => a.potlIds.length - b.potlIds.length);
          const potList = resObj.resData.result.orgTeamsList.filter(el => !el?.potlIds?.includes(recordId) && el._id != recordId);
          const iamParent = resObj.resData.result.orgTeamsList.filter(el => el?.potlIds?.includes(recordId) && el._id != recordId);
          this.setState({ potList, iamParent, errMsg: iamParent.length ? 'Can not be editable, This team is used as a parent team in other team(s)' : '', ...data });
        } else {
          this.setState({ ...data });
        }
      });
    }
  }
  orgPanelsUpdate = (event) => {
    const { org, oTeam, otCode, otStatus, otNotes, oldData, recordId, potId, iamParent, orgName, orgCode } = this.state;
    if(iamParent.length) {
      this.setState({ errMsg: 'Can not be editable, This team is used as a parent team in other team(s)' });
    } else if (!oTeam) {
      this.setState({ errMsg: 'Name is required' });
    } else if (!otCode) {
      this.setState({ errMsg: 'Code is required' });
    } else {
      const potIdData = this.state.potList && this.state.potList.length > 0 && this.state.potList.find(item => item._id == potId);
      const reqBody = {
        recordId,
        org, orgName, orgCode,
        oTeam, otCode,
        otStatus, otNotes,
        potId,
        potName: potIdData?.oTeam || '',
        potCode: potIdData?.otCode || '',
        potLevel: potId ? (potIdData?.potLevel ? potIdData.potLevel + '->' + potIdData.oTeam : potIdData.oTeam) : '',
        potlIds: potId ? [...(potIdData?.potlIds || []), potId] : []
      };

      if (JSON.stringify(oldData) != JSON.stringify(reqBody)) {
        this.setState({ disabled: true });
        this.props.postB2BOrgTeamsUpdate(reqBody, (resObj) => {
          if (resObj.status == '200') {
            hashHistory.push('/organizations/teams');
          } else if (resObj.status == '195'){
            this.setState({ errMsg: resObj.resData?.result || 'Team Updation Failed', disabled: false });
          } else {
            this.setState({ errMsg: 'Team Updation Failed', disabled: false });
          }
        });
      } else {
        this.setState({ errMsg: 'There are no changes' });
      }
    }
    event.preventDefault();
  }

  render() {
    return <OrgPanelsEditComponent state={this.state} setStateData={this.setStateData} orgPanelsUpdate={this.orgPanelsUpdate} />
  }
}

const mapStateToProps = (state) => ({
  PanelsReducer: state.PanelsReducer
});
const mapDistachToProps = (dispatch) => ({
  postB2BOrgTeamsUpdate: (body, callback) => dispatch(postB2BOrgTeamsUpdate(body, callback)),
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  getB2BOrgTeamsView: (body, callback) => dispatch(getB2BOrgTeamsView(body, callback)),
  postB2BOrgTeamsList: (body, callback) => dispatch(postB2BOrgTeamsList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(OrgPanelsEditClass);