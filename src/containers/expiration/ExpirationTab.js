/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import localForage from '../../hooks/localForage';

import {ExpirationTabsComponent} from '../../components/expiration';
import {getB2BExpirationList} from '../../actions/expiration/ExpirationAction';

class ExpirationTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actTab: '0',
      tabsArr: ['WrkAuth', 'SSN'],

      exprActList: [],
      userData: {},
      rolesObj: {}
    };
  }
  componentDidMount = () => {
    this.getExpirationData(this.state.actTab);
  }

  getExpirationData = async (actTab) => {
    const userObj = await localForage.getItem('userInfo');
    const userData = userObj.value || {};   
    const rolesObj = userData?.rolesObj || {};
    const appAcc = (userData?.userType == 'App' || userData?.userType == 'Tech' || (userData?.userType == 'Management' && userData?.userRole == 'Super Admin'));
    const reqBody = {pgNum: 1, limit: 100, type: this.state.tabsArr[actTab]};
    if((rolesObj?.access?.length >= 18 && rolesObj?.access[17]?.isAlwd) || appAcc) {
      this.props.getB2BExpirationList(reqBody, (resObj) => {
        if(resObj.status == '200') {
          const exprActList = resObj.resData.result.expirationList;
          this.setState({exprActList, userData, rolesObj: {...rolesObj, appAcc}, actTab});
        } else {
          this.setState({exprActList: [], userData, rolesObj: { ...rolesObj, appAcc}, actTab});
        }
      });
    } else {
      this.setState({exprActList: [], userData, rolesObj: { ...rolesObj, appAcc}, actTab});
    }
  }
  handleSelectTab = (actTab) => this.getExpirationData(actTab);

  render() {
    return <ExpirationTabsComponent state={this.state} handleSelectTab={this.handleSelectTab} getExpirationData={this.getExpirationData} />;
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BExpirationList: (body, callback) => dispatch(getB2BExpirationList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ExpirationTab);
