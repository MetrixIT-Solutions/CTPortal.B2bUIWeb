/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import { H1BPetitionsCreateComponent } from '../../../components/immigration/h1b-petitions';
import { postB2bUsersTotalList } from '../../../actions/users/UsersActions';
import { postB2BCnsltantsList } from '../../../actions/consultants/ConsultantActions';
import { PostB2BOrgsList } from '../../../actions/organizations/OrgActions';
import { postB2BOrgTeamsList } from '../../../actions/panels/PanelsActions';
import { postB2BH1BPtnsCreate } from '../../../actions/immigration/H1BPetitionsActions';
import { getB2BTemplateAssignListAPI } from '../../../actions/templates/TemplatesActions';
import localForage from '../../../hooks/localForage';

class H1BPetitionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgsList: [],
      usrsList: [],
      teams: [],
      cnsltantsList: [],
      initialClts: [],
      userInfo: {},
      orgTeamsList: [],
      teamIds: [],

      orgId: '',
      rprtId: '',
      teamId: '',
      pType: '',
      benType: '',
      fName: '',
      lName: '',
      emID: '',
      mobCC: '+1',
      mobNum: '',
      referredBy: 'Other',
      otherRefer: '',
      refUser: '',
      isSearch: false,
      isdisable: false,
      cnsltUsr: '',
      tempList: [],
      template: ''
    };
    this.timer = null;
  }

  componentWillUnmount = () => {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }

  setStateData = (data) => this.setState({ ...data });
  componentDidMount = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value || {};
    if(userInfo?.userType === 'Employee') {
      const teams = userInfo.teams && userInfo.teams.length ? userInfo.teams : [];
      const teamId = teams.length === 1 ? teams[0]._id : '';
      // teamId && this.getCnsltantsList('', teamId);
      this.setState({ teams, teamId, userInfo });

      const reqBody = { userRole: userInfo.userRole, user: '', team: teamId, org: '', tempCat: 'Immigration H1B Petition' };
      teamId && this.tempApiCall(reqBody);
      this.getOrgTeamsList(userInfo.org, teamId);
    } else this.setState({ userInfo });
    userInfo?.userType === 'App' && this.getOrganisationsList();
    if(userInfo?.userType === 'Management') {
      this.postB2BUsersData(userInfo.org);
      this.getOrgTeamsList(userInfo.org, '');
    }
  }
  componentDidUpdate = async (prevProps) => {
    if (prevProps.createModal !== this.props.createModal) {
      if (this.props.createModal) {
        const usrData = await localForage.getItem('userInfo');
        const userInfo = usrData.value || {};
        const teams = userInfo?.userType == 'Employee' ? (userInfo.teams && userInfo.teams.length ? userInfo.teams : []) : [];
        const teamId = teams.length === 1 ? teams[0]._id : '';
        this.setState({ teams, teamId, orgId: '', rprtId: '', cnsltUsr: '', cnsltantsList: teamId ? this.state.cnsltantsList : [], userInfo, createModal: true, isdisable: false, errMsg: '', emID: '', mobCC: '+1', mobNum: '', fName: '', lName: '', referredBy: 'Other', otherRefer: '', refUser: '' });
      }
    }
  }
  getOrganisationsList = () => {
    const reqBody = { pgNum: 1, limit: 100, searchStr: '' };
    this.props.PostB2BOrgsList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ orgsList: resObj.resData.result.orgsList });
      } else this.setState({ orgsList: [] });
    });
  }
  postB2BUsersData = async (orgId) => {
    const reqBody = { orgId, userRole: ['HR Manager', 'HR Executive']};
    this.props.postB2bUsersTotalList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ usrsList: resObj.resData.result, orgId, errMsg: '' });
      } else {
        this.setState({ usrsList: [], orgId, errMsg: '', rprtId: '' });
      }
    });
  }
  getCnsltantsList = async (rprtId, teamIds, searchStr) => {
    const { usrsList } = this.state;
    const usrRl = usrsList.find(usr => usr._id === rprtId);
    const reqBody = { pgNum: 1, limit: 100, searchStr, report: rprtId, team: teamIds, status: 'Active', ur: usrRl?.userRole || '' };
    this.props.postB2BCnsltantsList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const cnsltantsList = resObj.resData.result.consultantsList.map((item) => ({label: item.name,value: item._id, ...item}));
        const icObj = !searchStr ? {initialClts: cnsltantsList} : {};
        this.setState({cnsltantsList, ...icObj, rprtId, errMsg: '', cnsltUsr: ''});
      } else {
        const icObj = !searchStr ? {initialClts: []} : {};
        this.setState({cnsltantsList: [], ...icObj, rprtId, errMsg: '', cnsltUsr: ''});
      }
    });
  }

  handleChangeOrg = (e) => {
    const orgId = e.target.value;
    if(orgId) { this.postB2BUsersData(orgId); this.getOrgTeamsList(orgId, ''); }
    this.setState({ usrsList: [], orgId, errMsg: '', rprtId: '', teams: [], teamId: '', cnsltantsList: [], cnsltUsr: '', template:'', tempList:[], orgTeamsList: [], teamIds: [] });
  }
  handleChangeReporter = (e) => {
    const rprtId = e.target.value;
    const { usrsList, userInfo, orgId, orgTeamsList } = this.state;
    const user = rprtId ? usrsList.find(item => item._id === rprtId) : {};
    const teamId = user?.teams?.length === 1 ? user.teams[0]._id : '';
    if(teamId) {
      const teamIds = this.setTeamIds(teamId, orgTeamsList);
      this.setState({teams: user?.teams || [] , teamId, teamIds, org: orgId });
      this.getCnsltantsList(rprtId, teamId, '');
      if (userInfo.userType === 'Employee') {
        const reqBody = { userRole: userInfo.userRole, user: '', team: teamId, teamIds, org: orgId, tempCat: 'Immigration H1B Petition' };
        teamId && this.tempApiCall(reqBody);
      } else {
        const reqBody = { userRole: user.userRole, user: rprtId, team: teamId, teamIds, org: orgId, tempCat: 'Immigration H1B Petition' };
        teamId && this.tempApiCall(reqBody);
      }
    } else this.setState({ rprtId, errMsg: '', teams: user?.teams || [], teamId, teamIds: [], cnsltantsList: [], cnsltUsr: '', template:'', tempList:[] });
  }
  handleChangeTeams = (e) => {
    const { userInfo, rprtId, orgId, usrsList, orgTeamsList } = this.state;
    const teamId = e.target.value;

    const teamIds = this.setTeamIds(teamId, orgTeamsList);
    teamId ? this.setState({teamIds, teamId}) : this.setState({ errMsg: '', teamId, cnsltantsList: [], cnsltUsr: '', template:'', tempList:[] });
    const userObj = usrsList?.length > 0 ? usrsList.find(item => item._id == rprtId) : {};
    teamIds.length && this.getCnsltantsList(rprtId, teamIds, '');
    if (userInfo.userType === 'Employee') {
      const reqBody = { userRole: userInfo.userRole, user: '', team: teamId, teamIds, org: orgId, tempCat: 'Immigration H1B Petition' };
      teamId && this.tempApiCall(reqBody);
    } else {
      const reqBody = { userRole: userObj.userRole, user: rprtId, team: teamId, teamIds, org: orgId, tempCat: 'Immigration H1B Petition' };
      teamId && this.tempApiCall(reqBody)
    }
  }
  tempApiCall = (reqBody) => {
    this.props.getB2BTemplateAssignListAPI(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result;
        const tempList = resData?.length > 0 ? resData.map(item => ({ ...item, value: item.tempName, label: item.tempName })) : [];
        this.setState({ tempList });
      } else {
        this.setState({ tempList: [] });
      }
    })
  }
  H1BPetitionsCreate = (event) => {
    const { userInfo, pType, benType, fName, lName, emID, mobNum, refUser, cnsltUsr, referredBy, otherRefer, cnsltantsList, usrsList, orgsList, rprtId, orgId, mobCC, teams, teamId, template, tempList } = this.state;
    const mobValid = /^[0-9]{10}$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const euData = cnsltUsr?._id ? cnsltUsr : {};
    const utcMoment = moment.utc();
    const pDate = utcMoment.format('YYYY-MM-DD HH:mm:ss');

    if (userInfo?.userType === 'App' && !orgId) {
      this.setState({ errMsg: 'Orgnization is required' });
    } else if (userInfo?.userType !== 'Employee' && !rprtId) {
      this.setState({ errMsg: 'Reviewer is required' });
    } else if (!teamId) {
      this.setState({ errMsg: 'Teams is required' });
    } else if (!pType) {
      this.setState({ errMsg: 'Petition Type is required' });
    } else if (!template) {
      this.setState({ errMsg: 'Apply Template is required' });
    } else if (!benType) {
      this.setState({ errMsg: 'Select New Beneficiary or Existing Beneficiary' });
    } else if (benType === 'newBenfcry' && !fName) {
      this.setState({ errMsg: 'First Name is required' });
    } else if (benType === 'newBenfcry' && !lName) {
      this.setState({ errMsg: 'Last Name is required' });
    } else if (benType === 'newBenfcry' && !emID) {
      this.setState({ errMsg: 'Email address is required' });
    } else if (benType === 'newBenfcry' && emID && !regex.test(emID)) {
      this.setState({ errMsg: 'Please enter a valid Email address' });
    } else if (benType === 'newBenfcry' && !mobNum) {
      this.setState({ errMsg: 'Mobile Number is required' });
    } else if (benType === 'newBenfcry' && mobNum && !mobValid.test(mobNum)) {
      this.setState({ errMsg: 'Please enter a valid mobile number' });
    } else if (benType === 'newBenfcry' && referredBy == 'Other' && !otherRefer) {
      this.setState({ errMsg: 'Referred By is required' });
    } else if (benType === 'newBenfcry' && referredBy == 'Internal' && !refUser) {
      this.setState({ errMsg: 'Referred By is required' });
    } else if (benType === 'exsBenfcry' && !euData?._id) {
      this.setState({ errMsg: 'Consultant is required' });
    } else {
      this.setState({ isdisable: true });
      const orgData = userInfo?.userType === 'App' ? orgsList.find(item => item._id == orgId) : {_id: userInfo.org, orgName: userInfo.orgName, orgCode: userInfo.orgCode};
      const uData = usrsList.length ? usrsList.find(item => item._id == refUser) : {};
      const tmData = teams?.length ? teams.find(item => item._id === teamId) : {};
      const rptData = userInfo?.userType === 'Employee' ? {_id: '', fName: userInfo.fName, lName: userInfo.lName, myPrimary: userInfo.myPrimary, pReports: userInfo.pReports} : usrsList.find(item => item._id == rprtId);
      const tempObj = tempList && tempList.length > 0 ? tempList.find(item => item._id == template) :{};
      const reqBody = {
        org: orgData?._id || '',
        orgName: orgData?.orgName || '',
        orgCode: orgData?.orgCode || '',
        refType: euData?._id ? euData.refType : referredBy,
        refByUser: euData?._id ? euData.refByUser : (referredBy == 'Internal' ? refUser : ''),
        refByUID: euData?._id ? euData.refByUID : (referredBy == 'Internal' ? uData?.refUID : ''),
        refByName: euData?._id ? euData.refByName : (referredBy == 'Internal' ? uData?.name : otherRefer),
        team: teamId ? teamId : '',
        tName: tmData?.tName ? tmData.tName : '',
        tCode: tmData?.tCode ? tmData.tCode : '',
        report: rptData?._id ? rptData?._id : '',
        rprtName: rptData?._id ? rptData?.fName + ' ' + rptData?.lName : '',
        rprtPrimary: rptData?._id ? rptData?.myPrimary : '',
        pReports: rptData?._id ? [...rptData.pReports, rptData?._id] : rptData.pReports,
        euUser: euData?._id || '',
        euName: euData?.name || '',
        euMobCcNum: euData?.mobCcNum || '',
        euEmID: euData?.emID || '',
        euUID: euData?.refUID || '',
        euPrimary: euData?.myPrimary || '',

        pType, pDate, emID, mobNum, mobCc: mobNum ? mobCC : '',
        mobCcNum: mobNum ? mobCC + ' ' + mobNum : '',
        name: (fName && lName) ? fName + ' ' + lName : (fName ? fName : lName),
        fName, lName,
        wrkUrls: euData?.wrkUrls?.length ? euData.wrkUrls : [],
        lType: 'H1B Petitions',
        temp:[{
          _id: template,
          tempCat: 'Immigration H1B Petition',
          tempName: tempObj._id ? tempObj.tempName :'',
          urID: tempObj.urID ? tempObj.urID :'',
          userRole: tempObj.userRole ? tempObj.userRole: '',
          urSeq: tempObj.urSeq ? tempObj.urSeq :'',
          tdCount: tempObj._id && tempObj.tempData && tempObj.tempData.length,
        }]
      };
      this.props.postB2BH1BPtnsCreate(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const tms = userInfo?.userType == 'Employee' ? (userInfo?.teams?.length ? userInfo.teams : []) : [];
          const tId = tms.length === 1 ? tms[0]._id : '';
          this.props.handleClose();
          this.props.getH1BPtnsList(1, '', 10, false);
          this.setState({teams: tms, teamId: tId, orgId: '', rprtId: '', cnsltUsr: '', cnsltantsList: tId ? cnsltantsList : [], pType: '', benType: '', fName: '', lName: '', emID: '', mobCC: '', mobNum: '', referredBy: 'Other', otherRefer: '', refUser: ''});
        } else if (resObj.status == '103') {
          this.setState({ errMsg: resObj.resData.message, isdisable: false  });
        } else {
          this.setState({ errMsg: 'H1B Petition Create Failed', isdisable: false });
        }
      });
    }
    event.preventDefault();
  }

  handleClose = () => {
    const {userInfo, cnsltantsList} = this.state;
    const teams = userInfo?.userType == 'Employee' ? (userInfo?.teams?.length ? userInfo.teams : []) : [];
    const teamId = teams.length === 1 ? teams[0]._id : '';
    this.setState({ teams, teamId, orgId: '', rprtId: '', cnsltUsr: '', cnsltantsList: teamId ? cnsltantsList : [], pType: '', benType: '', fName: '', lName: '', emID: '', mobCC: '', mobNum: '', referredBy: 'Other', otherRefer: '', refUser: ''});
    this.props.handleClose();
  }

  getOrgTeamsList = (orgID, teamId) => {
    const reqBody = { orgID, pgNum: 1, limit: 10 };
    this.props.postB2BOrgTeamsList(reqBody, (response) => {
      if(response.status == '200') {
        const orgTeamsList = response.resData.result.orgTeamsList;
        const teamIds = this.setTeamIds(teamId, orgTeamsList);
        this.setState({ orgTeamsList, teamIds });
        teamId && this.getCnsltantsList(this.state.rprtId, teamIds, '');
      } else this.setState({ orgTeamsList: [] });
    });
  }
  setTeamIds = (teamId, orgTeamsList) => {
    let teamIds = [];
    if(teamId) {
      teamIds = orgTeamsList.reduce(getResult, [teamId]);
      function getResult(result, tm) {
        if(tm.potlIds.includes(teamId)) result.push(tm._id);
        else result;
        return result;
      }
    }
    return teamIds;
  }

  handleInputChange = (inputValue) => {
    const { rprtId, teamId, initialClts, cnsltantsList } = this.state;
    const teamIds = teamId;
    if(inputValue.length >= 3) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getCnsltantsList(rprtId, teamIds, inputValue);
      }, 700);
    } else if(JSON.stringify(cnsltantsList) !== JSON.stringify(initialClts) && !inputValue.length) {
      this.timer && clearTimeout(this.timer);
      this.setState({ cnsltantsList: initialClts, errMsg: '', cnsltUsr: '' });
    }
  }

  render() {
    return (
      <H1BPetitionsCreateComponent
        state={this.state}
        setStateData={this.setStateData}
        createModal={this.props.createModal}
        handleClose={this.handleClose}
        H1BPetitionsCreate={this.H1BPetitionsCreate}
        handleChangeReporter={this.handleChangeReporter}
        handleChangeOrg={this.handleChangeOrg}
        handleChangeTeams={this.handleChangeTeams}
        handleInputChange={this.handleInputChange}
      />
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDistachToProps = (dispatch) => ({
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
  postB2BCnsltantsList: (body, callback) => dispatch(postB2BCnsltantsList(body, callback)),
  postB2BH1BPtnsCreate: (body, callback) => dispatch(postB2BH1BPtnsCreate(body, callback)),
  PostB2BOrgsList: (body, callback) => dispatch(PostB2BOrgsList(body, callback)),
  getB2BTemplateAssignListAPI: (body, callback) => dispatch(getB2BTemplateAssignListAPI(body, callback)),
  postB2BOrgTeamsList: (body, callback) => dispatch(postB2BOrgTeamsList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(H1BPetitionCreate);
