/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import localForage from '../../hooks/localForage';

import { ExprtnsIdsListCmpnt } from '../../components/expiration/ids';
import { getB2BCnsltntExpirationIdsList } from '../../actions/expiration/ExpirationAction';

class ExprtnsIdsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pgNum: 1,
      limit: 10,
      searchStr: '',
      exprActList: [],
      exprActListCnt: 0,
      rolesObj: {},
      loading: true
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.eKey !== this.props.eKey && this.props.eKey > '18') {
      this.getExpirationIdsData(1, 10, '', this.props.type)
    }
  }

  getExpirationIdsData = async (pgNum, limit, srchStr, type) => {
    const userObj = await localForage.getItem('userInfo');
    const userData = userObj.value || {};
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const searchStr = srchStr == "Work Authorization" ? "WrkAuth" : srchStr ==  "US National ID" ? "USid" : srchStr;
    const reqBody = { pgNum, limit, uid: this.props.uid, searchStr, type };
      this.props.getB2BCnsltntExpirationIdsList(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const exprActList = resObj.resData.result.expirationList;
          const exprActListCnt = resObj.resData.result.expirationListCount;
          this.setState({ exprActList, rolesObj: { ...rolesObj, appAcc }, exprActListCnt, pgNum, limit, searchStr: srchStr });
          setTimeout(()=> {
            this.setState({loading: false});
          }, 1000)
        } else {
          this.setState({ exprActList: [], rolesObj: { ...rolesObj, appAcc }, exprActListCnt: 0, pgNum, limit, searchStr: srchStr, loading: false});
        }
      });
  }

  handlePagination = (actPgNum) => {
    const { limit, searchStr } = this.state;
    window.scroll(0, 0);
    this.getExpirationIdsData(actPgNum, limit, searchStr, '');
  }

  handleChangeLimit = (e) => {
    let limit = e.target.value;
    this.getExpirationIdsData(1, limit, '', '');
  }

  handleChangeSearch = (e) => {
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getExpirationIdsData(1, 10, '', '');
  }

  handleKeyInput = (e) => e.key === 'Enter' && this.getExpirationIdsData(1,  10, this.state.searchStr, '');

  render() {
        return <ExprtnsIdsListCmpnt state={this.state} handlePagination={this.handlePagination} handleChangeLimit={this.handleChangeLimit} handleChangeSearch={this.handleChangeSearch} handleKeyInput={this.handleKeyInput} />;
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BCnsltntExpirationIdsList: (body, callback) => dispatch(getB2BCnsltntExpirationIdsList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ExprtnsIdsList);
