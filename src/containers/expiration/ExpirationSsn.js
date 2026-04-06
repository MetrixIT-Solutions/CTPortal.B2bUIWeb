/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {getTomorrowDate} from '../../hooks/common';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import { ExprtnsSSNComponent, ExprtnsSSNPopupComponent} from '../../components/expiration/ssn';

class ExpirationsSsn extends PureComponent {
  constructor(props) {
    super(props);
    const {exprActList, userData, rolesObj} = props.state;
    this.state = {
      exprActList, userData, rolesObj,
      modal: false,
      recordId: '',
      oldObj: {},
      expObj: {},
      type: props.eType,
      errMsg: '',
      num: '',
      expDt: '',
      isCheck: false,
      disabled: false,
      isVrfdModal: false
    };
  }

  componentDidUpdate(prevProps) {
    const {exprActList, userData, rolesObj} = this.props.state;
    if ((prevProps.state !== this.props.state)) {
      this.setState({exprActList, userData, rolesObj, type: this.props.eType, modal: false, errMsg: '', num: '', expDt: ''});
    }
  }
  setStateData = (data) => this.setState({...data});

  sSNValidations = () => {
    const {num, expDt, isCheck } = this.state;
    const tomorrow = getTomorrowDate();
    if (!isCheck && !num) {
      this.setState({errMsg: 'SSN number is required'});
      return false;
    } else if (isCheck && !expDt) {
      this.setState({errMsg: 'SSN expected date is requried'});
      return false;
    } else if (isCheck && expDt < tomorrow) {
      this.setState({errMsg: 'Please provide the valid expiry date'});
      return false;
    } else return true;
  }

  onClickSSNEdit = (sSNObj) => {
    const oldObj = {num: sSNObj.newObj.num, expDt: sSNObj.newObj.expDt};
    this.setState({ recordId: sSNObj._id, oldObj, modal: true, errMsg: '', num: sSNObj.newObj.num, isCheck: sSNObj.newObj.num ? false : true, expDt: sSNObj.newObj.expDt});
  }
  handleSSNUpdate = () => {
    if (this.sSNValidations()) {
      const {recordId, oldObj, num, expDt, exprActList} = this.state;
      const newObj = {num, expDt};
      const number = num ? num + '<#$>' : '';
      const searchStr = 'SSN' + '<#$>' + number
      if (JSON.stringify(newObj) !== JSON.stringify(oldObj)) {
        this.setState({disabled: true});
        const strDtStr = newObj?.strDt ? newObj.strDt : '';
        const expDtStr = newObj?.expDt ? newObj?.expDt : '';
        this.props.handleUpdateExprtn(recordId, {newObj, oldObj, searchStr, strDtStr, expDtStr}, (resObj) => {
          if (resObj.status === '200') {
            const index = exprActList.findIndex((exprtn) => exprtn._id === recordId);
            if (index > -1) exprActList[index] = resObj.resData.result;
            this.setState({exprActList, modal: false, recordId: '', oldObj: {}, errMsg: '', num: '', expDt: '', disabled: false});
          } else {
            this.setState({errMsg: 'SSN update failed', disabled: false});
          }
        });
      } else this.setState({errMsg: 'There are no changes'});
    }
  }

  handleVrfyUpdate = () => {
    const {recordId, exprActList} = this.state;
    const reqBody = {isVrfd: true};
    this.props.handleVryfyUpdateExprtn(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        const index = exprActList.findIndex((exprtn) => exprtn._id === recordId);
        if (index > -1) exprActList.splice(index, 1);
        this.setState({exprActList, isVrfdModal: false, errMsg: ''});
      } else {
        this.setState({errMsg: 'Verification Update Failed'});
      }
    });
  }
  handleCunslview = async (item) => {
    await localForage.setItem('tabValue','consultants')
    hashHistory.push(`/consultant/view/${item.uid}`);
  }

  render() {
    return (
      <>
        <ExprtnsSSNComponent state={this.state} setStateData={this.setStateData} onClickSSNEdit={this.onClickSSNEdit} handleCunslview={this.handleCunslview}/>
        <ExprtnsSSNPopupComponent state={this.state} setStateData={this.setStateData}  handleVrfyUpdate={this.handleVrfyUpdate} handleSSNUpdate={this.handleSSNUpdate} />
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDistachToProps)(ExpirationsSsn);
