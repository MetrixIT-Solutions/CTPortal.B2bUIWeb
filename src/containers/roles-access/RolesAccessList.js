/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import hashHistory from '../../hashHistory';

import { RolesAccessListComponent } from '../../components/roles-access';
import { PostB2BRolesAccessList } from '../../actions/rolesAccess/RolesAccessActions';
import localForage from '../../hooks/localForage';

class RolesAccessList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actPgNum: 1,
      searchStr: '',
      rLimit: 10,
      isSearch: false,
      rolesAcsList: [],
      rolesAcsCount: 0,
      rlAcssShow: '',
      loading: true
    };
    this.rlAcssRef = {};
  }
  componentDidMount = () => {
    const { actPgNum, searchStr, rLimit, isSearch } = this.state;
    this.getRolesAccList(actPgNum, searchStr, rLimit, isSearch);
  }
  getRolesAccList = async (actPgNum, searchStr, rLimit, isSearch) => {
    const reqBody = { actPgNum, searchStr, rLimit }
    this.props.PostB2BRolesAccessList(reqBody, async (resObj) => {
      if (resObj.status == '200') {
        const rData = resObj.resData.result;
        this.setState({ rolesAcsList: rData.rolesAcsList, rolesAcsCount: rData.rolesAcsCount, actPgNum, searchStr, rLimit, loading: false });
        await localForage.setItem('rAccCount', rData.rolesAcsCount);
      } else if (isSearch) {
        this.setState({ rolesAcsList: [], rolesAcsCount: 0, actPgNum: 1, searchStr, rLimit, loading: false });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }
  handleChangeSearch = (e) => {
    const { rLimit } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getRolesAccList(1, '', rLimit, false);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getRolesAccList(1, this.state.searchStr, this.state.rLimit, true);

  handleChangePage = (activePage) => {
    const { searchStr, rLimit } = this.state;
    this.getRolesAccList(activePage, searchStr, rLimit, false);
  }
  handleChangeLimit = (e) => {    
    const { searchStr } = this.state;
    let rLimit = e.target.value;    
    this.getRolesAccList(1, searchStr, rLimit, false);
  }

  handleRlAcssMenu = (rlAcssId) => {
    const { rlAcssShow } = this.state;
    this.setState({rlAcssShow: rlAcssShow ? '' : rlAcssId});
  }

  handleClickOutside = (event) => {
    const { rlAcssShow } = this.state;
    if (this.rlAcssRef[rlAcssShow] && !this.rlAcssRef[rlAcssShow].contains(event.target)) {
      this.setState({ rlAcssShow: '',  });
    }
  }

  render() {
    return <RolesAccessListComponent
      state={this.state}
      handleRouteHome={this.handleRouteHome}
      handleChangeSearch={this.handleChangeSearch}
      handleKeyInput={this.handleKeyInput}
      handleChangePage={this.handleChangePage}
      handleChangeLimit={this.handleChangeLimit} 
      handleRlAcssMenu={this.handleRlAcssMenu} 
      rlAcssRef={this.rlAcssRef}
      handleClickOutside={this.handleClickOutside} />
      
  }
}

const mapStateToProps = (state) => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BRolesAccessList: (body, callback) => dispatch(PostB2BRolesAccessList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(RolesAccessList);