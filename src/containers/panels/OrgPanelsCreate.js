/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

import OrgPanelsCreateComponent from '../../components/panels/OrgPanelsCreateComponent';
import { postB2BOrgTeamsCreate, postB2BOrgTeamsList } from '../../actions/panels/PanelsActions';
import { PostB2BOrgsTotalList } from '../../actions/organizations/OrgActions';

class OrgPanelsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appAcc: false,
      name: '',
      code: '',
      seq: '',
      notes: '',
      status: 'Active',
      errMsg: '',
      orgId: '',
      orgsList: [],
      disable: false,
      potId: '',
      potList: []
    };
  }
  setStateData = (data) => this.setState({ ...data });
  
  componentDidMount = () => {
    this.getOrgsList();
  }
  getOrgsList = async () => {
    const UsrData = await localForage.getItem('userInfo');
    const userInfo = UsrData.value || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    if(appAcc) {
      const reqBody = { status: 'Active' };
      this.props.PostB2BOrgsTotalList(reqBody, (resObj) => {
        if (resObj.status === '200') {
          this.setState({ orgsList: resObj.resData.result, appAcc })
        } else {
          this.setState({ orgsList: [], appAcc });
        }
      });
    } else {
      const orgObj = {_id: userInfo.org, orgName: userInfo.orgName, orgCode: userInfo.orgCode};
      this.handlePrntTeam(orgObj._id, [orgObj]);
    }
  }
  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  handleChangeOrg = (e) => {
    const {orgsList} = this.state;
    this.handlePrntTeam(e.target.value, orgsList);
  }
  handlePrntTeam = (orgID, orgsList) => {
    if(orgID) {
      const reqBody = {orgID, pgNum: 1, limit: 100};
      this.props.postB2BOrgTeamsList(reqBody, (resObj) => {
        if(resObj.status === '200' ) {
          resObj.resData.result.orgTeamsList.sort((a, b) => a.oTeam - b.oTeam);
          const potList = resObj.resData.result.orgTeamsList.sort((a, b) => a.potlIds.length - b.potlIds.length);
          this.setState({ orgsList, orgId: orgID, errMsg: '', potList, potId: '' });  
        } else {
          this.setState({ orgsList, orgId: orgID, errMsg: '', potList: [], potId: '' });
        }
      });
    } else this.setState({ orgsList, orgId: orgID, errMsg: '', potList: [], potId: '' });
  }

  teamCreate = (event) => {
    const { orgId, name, code, seq, notes, status, orgsList, potList, potId } = this.state;
    if (!orgId) {
      this.setState({ errMsg: 'Organization is requried' });
    } else if (!name) {
      this.setState({ errMsg: 'Team Name is requried' });
    } else if (!code) {
      this.setState({ errMsg: 'Team Code is requried' });
    } else {
      this.setState({ disable: true });
      const orgData = orgsList && orgsList.length > 0 && orgsList.find(item => item._id == orgId);
      const potData = potList &&  potList.length > 0 && potList.find(item => item._id == potId)
      const reqBody = {
        oTeam: name,
        otCode: code,
        otSeq: seq,
        otNotes: notes,
        otStatus: status,
        org: orgId,
        orgName: orgData.orgName,
        orgCode: orgData.orgCode,
        potId,
        potName: potData?.oTeam || '',
        potCode: potData?.otCode || '',
        potLevel: potId ? potData?.potLevel ? potData.potLevel + '->' + potData.oTeam : potData.oTeam : '',
        potlIds: potId ? [...potData.potlIds, potId] : []
      };
      this.props.postB2BOrgTeamsCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          hashHistory.push('/organizations/teams');
          this.setState({ disable: false });
        } else if (resObj.status == '103') {
          this.setState({ errMsg: resObj.resData.message, disable: false });
        } else {
          this.setState({ errMsg: 'Teams Create Failed', disable: false });
        }
      });
    }
    event.preventDefault();
  }

  render() {
    return (
      <OrgPanelsCreateComponent
        state={this.state}
        handleRouteHome={this.handleRouteHome}
        setStateData={this.setStateData}
        teamCreate={this.teamCreate}
        handleChangeOrg={this.handleChangeOrg}
      />
    )
  }
}

const mapStateToProps = (state) => ({ PanelsReducer: state.PanelsReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BOrgsTotalList: (body, callback) => dispatch(PostB2BOrgsTotalList(body, callback)),
  postB2BOrgTeamsCreate: (body, callback) => dispatch(postB2BOrgTeamsCreate(body, callback)),
  postB2BOrgTeamsList: (body, callback) => dispatch(postB2BOrgTeamsList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(OrgPanelsCreate);
