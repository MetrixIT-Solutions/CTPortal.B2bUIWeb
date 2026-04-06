/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {ExprtnsWorkAuComponent, ExprtnsWorkAuPopupComponent} from '../../components/expiration/workAuth';
import {putB2BExpirationVrfctnUpdate} from '../../actions/expiration/ExpirationAction';
import { getTomorrowDate } from '../../hooks/common';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';

class ExpirationsWorkAuth extends PureComponent {
  constructor(props) {
    super(props);
    const {exprActList, userData, rolesObj} = props.state;
    this.state = {
      exprActList, userData, rolesObj,

      modal: false,
      recordId: '',
      oldObj: {},
      type: '',
      errMsg: '',
      status: '',
      num: '',
      strDt: '',
      expDt: '',
      receiptNum: '',
      position: '',
      uscisNum: '',
      sevisNum: '',
      disabled: false,
      isVrfdModal: false,
      expObj: {}
    };
  }

  componentDidUpdate(prevProps) {
    const {exprActList, userData, rolesObj} = this.props.state;
    if ((prevProps.state !== this.props.state)) {
      this.setState({exprActList, userData, rolesObj, modal: false, isVrfdModal: false, errMsg: '', status: '', num: '', strDt: '', expDt: '', receiptNum: '', position: '', uscisNum: '', sevisNum: ''});
    }
  }
  setStateData = (data) => this.setState({...data});
  
  worAthValidations = () => {
    const {status, num, strDt, expDt, receiptNum, position, uscisNum, sevisNum} = this.state;
    const tomorrow = getTomorrowDate()
    if (!status) {
      this.setState({errMsg: 'Status is requried'});
      return false;
    } else if (status == 'CPT' && !position) {
      this.setState({errMsg: 'Position is requried'});
      return false;
    } else if ((status == 'OPT' || status == 'Stem OPT') && !num) {
      this.setState({errMsg: 'Card number is requried'});
      return false;
    } else if (status !== 'CPT' && status !== 'H1B' && !uscisNum) {
      this.setState({errMsg: 'USCIS number is requried'});
      return false;
    } else if (status == 'H1B' && !receiptNum) {
      this.setState({errMsg: 'Receipt number is requried'});
      return false;
    } else if ((status == 'CPT' || status == 'OPT' ||  status == 'Stem OPT') && !sevisNum) {
      this.setState({errMsg: 'Sevis number is requried'});
      return false;
    } else if (!strDt) {
      this.setState({errMsg: 'Work authorization start date is requried'});
      return false;
    } else if (!expDt) {
      this.setState({errMsg: 'Work authorization expiry date is requried'});
      return false;
    } else if (!expDt < tomorrow) {
      this.setState({errMsg: 'Please provide the valid expiry date'});
      return false;
    } else return true;
  }

  onClickWorkAthEdit = (workObj) => {
    const oldObj = {
      status: workObj.newObj.status, strDt: workObj.newObj.strDt, expDt: workObj.newObj.expDt, card:{num: workObj.newObj.card.num,receiptNum: workObj.newObj.card.receiptNum,
      position: workObj.newObj.card.position, uscisNum: workObj.newObj.card.uscisNum, sevisNum: workObj.newObj.card.sevisNum}
    };
    this.setState({
      recordId: workObj._id,
      oldObj,
      modal: true,
      errMsg: '',
      status: workObj.newObj.status,
      num: workObj.newObj.card.num,
      strDt: workObj.newObj.strDt,
      expDt: workObj.newObj.expDt,
      receiptNum: workObj.newObj.card.receiptNum,
      position: workObj.newObj.card.position,
      uscisNum: workObj.newObj.card.uscisNum,
      sevisNum: workObj.newObj.card.sevisNum,
    });
  }
  handleWorkAthUpdate = () => {
    if (this.worAthValidations()) {
      const {recordId, oldObj, status, num, strDt, expDt, receiptNum, position, uscisNum, sevisNum, exprActList} = this.state;
      const newObj = {status, strDt, expDt,
        card: {
        num: (status == 'OPT' || status == 'Stem OPT') ? num : '', 
        receiptNum: status == 'H1B' ? receiptNum : '', 
        position: status == 'CPT' ? position : '', 
        uscisNum: (status !== 'CPT' && status !== 'H1B') ? uscisNum : '', 
        sevisNum: (status == 'CPT' || status == 'Stem OPT' || status == 'OPT') ? sevisNum : ''
        }
      };
      const statu = status ? status + '<#$>' : '';
      const number = num ? num + '<#$>' : '';
      const recptNum = receiptNum ? receiptNum + '<#$>' : '';
      const positn = position ? position + '<#$>' : '';
      const uscisNo = uscisNum ? uscisNum + '<#$>' : '';
      const sevisNo = sevisNum ? sevisNum + '<#$>' : '';
      const searchStr = 'WrkAuth' + '<#$>' + statu + number + recptNum + positn + uscisNo + sevisNo
      const strDtStr = newObj?.strDt ? newObj.strDt : '';
      const expDtStr = newObj?.expDt ? newObj?.expDt : '';
      if (JSON.stringify(newObj) !== JSON.stringify(oldObj)) {
        this.setState({disabled: true});
        this.props.handleUpdateExprtn(recordId, {newObj, oldObj, searchStr, strDtStr, expDtStr}, (resObj) => {
          if (resObj.status === '200') {
            const index = exprActList.findIndex((exprtn) => exprtn._id === recordId);
            if (index > -1) exprActList[index] = resObj.resData.result;
            this.setState({exprActList, modal: false, recordId: '', oldObj: {}, errMsg: '', status: '', num: '', strDt: '', expDt: '', receiptNum: '', position: '', uscisNum: '', sevisNum: '', disabled: false});
          } else {
            this.setState({errMsg: 'Work Authorization Update failed', disabled: false});
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
        <ExprtnsWorkAuComponent state={this.state} setStateData={this.setStateData} onClickWorkAthEdit={this.onClickWorkAthEdit} handleCunslview={this.handleCunslview} />
        <ExprtnsWorkAuPopupComponent state={this.state} setStateData={this.setStateData} handleVrfyUpdate={this.handleVrfyUpdate} handleWorkAthUpdate={this.handleWorkAthUpdate} />
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDistachToProps)(ExpirationsWorkAuth);
