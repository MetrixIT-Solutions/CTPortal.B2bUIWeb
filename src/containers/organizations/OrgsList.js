/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OrgsListComponent } from '../../components/organizations';
import { PostB2BOrgsList, PutB2BOrgStatusUpdate, PutB2BOrgsSmtpDetails } from '../../actions/organizations/OrgActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

class OrgsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orgsList: [],
      orgsListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      statusModal: false,
      smpDetailsModal: false,
      orglistObj: {},
      disable: false,
      errMsg: '',
      isSearch: false,
      orgShow: '',
      rolesObj: {},
      senderMail: '',
      senderMailPswd: '',
      smtp: '',
      smtpPort: '',
      service: '',
      fromMail: '',
      showPswd: false,
      sucMsg: false,
      loading: true
    };
    this.orgRef = {};
  }
  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch } = this.state;
    this.getOrgList(actPgNum, searchStr, pageLimit, isSearch);
  }
  getOrgList = async (actPgNum, searchStr, pageLimit, isSearch) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = { pgNum: actPgNum, limit: pageLimit, searchStr: searchStr };
    this.props.PostB2BOrgsList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, orgsList: resObj.resData.result.orgsList, orgsListCount: resObj.resData.result.orgsListCount, actPgNum, searchStr, pageLimit, loading : false });
      } else if (isSearch) {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, orgsList: [], orgsListCount: 0, actPgNum: 1, searchStr, pageLimit, loading : false });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc, loading : false } });
      }
    });
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  setStateData = (data) => this.setState({ ...data });
  handleChangeSearch = (e) => {
    const { pageLimit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getOrgList(1, '', pageLimit, false);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getOrgList(1, this.state.searchStr, this.state.pageLimit, true);

  handleChangePage = (activePage) => {
    const { searchStr, pageLimit } = this.state;
    this.getOrgList(activePage, searchStr, pageLimit, false);
  }
  handleChangeLimit = (e) => {
    const { searchStr } = this.state;
    let pageLimit = e.target.value;
    this.getOrgList(1, searchStr, pageLimit, false);
  }
  handleStatusUpdate = () => {
    const { orglistObj } = this.state;
    this.setState({ disable: true });
    const reqBody = {
      orgStatus: orglistObj.orgStatus == 'Active' ? 'Inactive' : 'Active',
      id: orglistObj._id
    }
    this.props.PutB2BOrgStatusUpdate(reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', disable: false });
        this.getOrgList(1, '', 10, false);
      } else {
        this.setState({ errMsg: 'Organization Status update failed', statusModal: false, errMsg: '', disable: false });
      }
    })
  }

  handleOrgMenu = (orgId) => {
    const { orgShow } = this.state;
    this.setState({ orgShow: orgShow ? '' : orgId });
  }

  handleClickOutside = (event) => {
    const { orgShow } = this.state;
    if (this.orgRef[orgShow] && !this.orgRef[orgShow].contains(event.target)) {
      this.setState({ orgShow: '' });
    }
  }
  smtpDetailsClick = (item) => { 
    const orglistObj = {...item, fromMail: item.from, orgCode: item.orgCode.toUpperCase()};    
    this.setState({ smpDetailsModal: true, orgShow: '', showPswd: false, ...orglistObj, orglistObj });
  }
  handleSmtpDetails = () => {
    const { senderMail, senderMailPswd, smtp, smtpPort, service, fromMail, orglistObj } = this.state;
    if (!senderMail) {
      this.setState({ errMsg: 'Sender Mail is required', sucMsg: false });
    } else if (!senderMailPswd) {
      this.setState({ errMsg: 'Sender Mail Password is required', sucMsg: false });
    } else if (!smtp) {
      this.setState({ errMsg: 'SMTP Domain is required', sucMsg: false });
    } else if (!smtpPort) {
      this.setState({ errMsg: 'SMTP Port is required', sucMsg: false });
    } else if (!fromMail) {
      this.setState({ errMsg: 'From Mail is required', sucMsg: false });
    } else {
      this.setState({ disable: true });
      const reqBody = { senderMail, senderMailPswd, smtp, smtpPort, service, fromMail };
      this.props.PutB2BOrgsSmtpDetails(orglistObj._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          this.setState({ errMsg: 'SMTP Details Successfully Updated', sucMsg: true });
          setTimeout(() => {
            this.setState({ disable: false, smpDetailsModal: false, errMsg: '', senderMail:'', senderMailPswd:'', smtp:'', smtpPort:'', service:'',fromMail:'', showPswd: false });
            this.getOrgList(1, '', 10, false);
          }, 3000);
        } else {
          this.setState({ errMsg: 'SMTP Details Update Failed', sucMsg: false });
          setTimeout(() => {
            this.setState({ disable: false, smpDetailsModal: false, errMsg: '', senderMail:'', senderMailPswd:'', smtp:'', smtpPort:'', service:'',fromMail:'', showPswd: false });
          }, 3000);
        }
      })
    }
  }
  render() {
    return (
      <OrgsListComponent
        state={this.state}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        setStateData={this.setStateData}
        handleStatusUpdate={this.handleStatusUpdate}
        handleRouteHome={this.handleRouteHome}
        handleOrgMenu={this.handleOrgMenu}
        orgRef={this.orgRef}
        handleClickOutside={this.handleClickOutside}
        smtpDetailsClick={this.smtpDetailsClick}
        handleSmtpDetails={this.handleSmtpDetails}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BOrgsList: (body, callback) => dispatch(PostB2BOrgsList(body, callback)),
  PutB2BOrgStatusUpdate: (body, callback) => dispatch(PutB2BOrgStatusUpdate(body, callback)),
  PutB2BOrgsSmtpDetails: (id, body, callback) => dispatch(PutB2BOrgsSmtpDetails(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(OrgsList);
