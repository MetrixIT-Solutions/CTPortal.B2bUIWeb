/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {PureComponent} from "react";
import {connect} from "react-redux";
import { Accordion } from 'react-bootstrap';
import {ExpirationI94PopupComponent, ExpirationPasptPopupComponent, ExpirationSSNPopupComponent, ExpirationUSidPopupComponent, ExpirationWrkAuthPopupComponent} from "../../components/consultants";
import ExpirationDatesComponent from "../../components/consultants/ExpirationDatesComponent";
import {putB2BExpirationUpdate, putB2BExpirationVrfctnUpdate} from "../../actions/expiration/ExpirationAction";
import {getTomorrowDate} from "../../hooks/common";
import localForage from '../../hooks/localForage';
import Countries from "../../../public/data/Countries.json";
import States from "../../../public/data/CountryStates.json";
import ExpirationVisaPopupComponent from "../../components/consultants/ExpirationVisaPopupComponent";

class ExpirationPopup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      exprActList: [],
      statesArr: [],

      editmodal: false,
      errMsg: "",
      subObj: {},
      num: "",
      strDt: "",
      expDt: "",
      status: "",
      issPlace: "",
      docNum: "",
      country: "",
      state: "",
      address: "",
      area: "",
      city: "",
      zip: "",
      cCode: "",
      sCode: "",
      card: {
        cardnum: "",
        position: "",
        uscisNum: "",
        receiptNum: "",
        sevisNum: "",
      },
      iDType: "",
      isCheck: false,
      isVrfdModal: false,
      disabled: false,
      eKey: '13',
      smTypes: [],
    };
  }

  componentDidUpdate = async (prevProps) => {
    if ((prevProps.state !== this.props.state || prevProps.eKey !== this.props.eKey)) {
      this.setState({ exprActList: this.props.state?.exprActList, subtabValue: this.props.type, smTypes: this.props.state?.smTypes});
    }
  };
  setStateData = (data) => this.setState({...data});

  handleCountryChange = (e) => {
    const {value} = e.target;
    const statesArr = value ? States[value] : [];
    const cntrData = Countries.find((item) => item.code == value);
    this.setState({cCode: value, statesArr, errMsg: "", country: cntrData?.value || "", sCode: "", state: ""});
  };
  handleStateChange = (e) => {
    const {statesArr} = this.state;
    const {value} = e.target;
    const stateData = statesArr.find((item) => item.stateCode == value);
    this.setState({sCode: value, errMsg: "", state: stateData?.value || ""});
  };

  handleEditOpenModal = (item) => {
    const newObj = item.newObj;
    const statesArr = newObj.cCode ? States[newObj.cCode] : [];
    const editCard =
      item.type == "WrkAuth"
        ? {
            card: {
              cardnum: newObj?.card?.num || "",
              position: newObj?.card?.position || "",
              uscisNum: newObj?.card?.uscisNum || "",
              receiptNum: newObj?.card?.receiptNum || "",
              sevisNum: newObj?.card?.sevisNum || "",
            },
          }
        : {card: {}};
    this.setState({
      editmodal: true,
      subObj: item,
      name: newObj.name || "",
      num: newObj.num || "",
      strDt: newObj.strDt || "",
      expDt: newObj.expDt || "",
      status: newObj.status || "",
      issPlace: newObj.issPlace || "",
      docNum: newObj.docNum || "",
      country: newObj.country || "",
      state: newObj.state || "",
      address: newObj.hNum || "",
      area: newObj.area || "",
      city: newObj.city || "",
      zip: newObj.zip || "",
      cCode: newObj.cCode || "",
      sCode: newObj.sCode || "",
      // isCheck: item.type == "SSN" ? (newObj.num ? false : true) : "",
      isCheck: item.type == "SSN" ? (newObj.num ? false : true) : "",
      ...editCard,
      isVrfdModal: false,
      statesArr
    });
  };

  expiratUpdate = () => {
    const {subObj, name, num, strDt, expDt, status, issPlace, docNum, card, isCheck, iDType, country, state, address, area, city, zip} = this.state;
    if (subObj.type === "i94") {
      if (!num) {
        this.setState({errMsg: "i-94 number is requried"});
      } else if (!strDt) {
        this.setState({errMsg: "i-94 start date is requried"});
      } else if (!expDt) {
        this.setState({errMsg: "i-94 expiry date is requried"});
      } else if (!expDt > strDt) {
        this.setState({errMsg: "Please provide the valid expiry date"});
      } else {
        this.handleUpdateApiCall();
      }
    } else if (subObj.type === "Visa") {
      if (!status) {
        this.setState({errMsg: "Status is requried"});
      } else if (!strDt) {
        this.setState({errMsg: "Visa start date is requried"});
      } else if (!expDt) {
        this.setState({errMsg: "Visa expiry date is requried"});
      } else if (expDt < strDt) {
        this.setState({errMsg: "Please provide the valid expiry date"});
      } else {
        this.handleUpdateApiCall();
      }
    } else if (subObj.type === "Passport") {
      if (!num) {
        this.setState({errMsg: "Passport number is requried"});
      } else if (!strDt) {
        this.setState({errMsg: "Passport issued date is requried"});
      } else if (!expDt) {
        this.setState({errMsg: "Passport expiry date is requried"});
      } else if (expDt < strDt) {
        this.setState({errMsg: "Please provide the valid expiry date"});
      } else if (!issPlace) {
        this.setState({errMsg: "Passport issude place is requried"});
      } else if (!docNum) {
        this.setState({errMsg: "Passport file number is requried"});
      } else {
        this.handleUpdateApiCall();
      }
    } else if (subObj.type === "USid") {
      if (!name) {
        this.setState({errMsg: "Nationa id type is requried"});
      } else if (name == "DL" && !num) {
        this.setState({errMsg: "Driving license number is requried"});
      } else if (name == "State ID" && !num && !num) {
        this.setState({errMsg: "State id number is requried"});
      } else if (name == "Other" && !iDType) {
        this.setState({errMsg: "ID type is requried"});
      } else if (!strDt) {
        this.setState({errMsg: "Issued date is requried"});
      } else if (!expDt) {
        this.setState({errMsg: "Expiry date is requried"});
      } else if (!expDt < strDt) {
        this.setState({errMsg: "Please provide the valid expiry date"});
      } else if (!country) {
        this.setState({errMsg: "Country is requried"});
      } else if (!state) {
        this.setState({errMsg: "State is requried"});
      } else if (!address) {
        this.setState({errMsg: "Address is requried"});
      } else if (!area) {
        this.setState({errMsg: "Area is requried"});
      } else if (!city) {
        this.setState({errMsg: "City is requried"});
      } else if (!zip) {
        this.setState({errMsg: "Zip is requried"});
      } else {
        this.handleUpdateApiCall();
      }
    } else if (subObj.type === "SSN") {
      if (!isCheck && !num) {
        this.setState({errMsg: "SSN number is required"});
      } else if (isCheck && !expDt) {
        this.setState({errMsg: "SSN expected date is requried"});
      } else if (isCheck && expDt < strDt) {
        this.setState({errMsg: "Please provide the valid expiry date"});
      } else {
        this.handleUpdateApiCall();
      }
    } else if (subObj.type === "WrkAuth") {
      if (!status) {
        this.setState({errMsg: "Status is requried"});
      } else if (status == "CPT" && card && !card.position) {
        this.setState({errMsg: "Position is requried"});
      } else if ((status == "OPT" || (status == "Stem OPT" && card)) && !card.cardnum) {
        this.setState({errMsg: "Card number is requried"});
      } else if (
        (status == "OPT" || status == "H4EAD" || status == "H4" || status == "Stem OPT" || status == "GCEAD" || status == "GC" || status == "L2" || status == "Citizen" || status == "Canadian" || (status == "Other" && card)) &&
        !card.uscisNum
      ) {
        this.setState({errMsg: "USCIS number is requried"});
      } else if (status == "H1B" && card && !card.receiptNum) {
        this.setState({errMsg: "Receipt number is requried"});
      } else if ((status == "CPT" || status == "OPT" || (status == "Stem OPT" && card)) && !card.sevisNum) {
        this.setState({errMsg: "Sevis number is requried"});
      } else if (!strDt) {
        this.setState({errMsg: "Work authorization start date is requried"});
      } else if (!expDt) {
        this.setState({errMsg: "Work authorization expiry date is requried"});
      } else {
        this.handleUpdateApiCall();
      }
    }
  };

  handleUpdateApiCall = () => {
    const {name, num, strDt, expDt, status, issPlace, docNum, subObj, card, iDType, country, state, address, area, city, zip, cCode, sCode, isCheck} = this.state;
    const sbexpD = expDt ? new Date(expDt).toISOString().split("T")[0] : "";
    const str = strDt ? new Date(strDt).toISOString().split("T")[0] : "";
    const card1 =
      subObj.type == "WrkAuth"
        ? {
            num: status == "OPT" || status == "Stem OPT" ? card.cardnum : "",
            position: status == "CPT" ? card.position : "",
            uscisNum: status == "OPT" || status == "Stem OPT" || status == "H4EAD" || status == "H4" || status == "GCEAD" || status == "GC" || status == "L2" || status == "Citizen" || status == "Canadian" || status == "Other" ? card.uscisNum : "",
            receiptNum: status == "H1B" ? card.receiptNum : "",
            sevisNum: status == "CPT" || status == "OPT" || status == "Stem OPT" ? card.sevisNum : "",
          }
        : {};
    const newObj = {
      name: name == "Other" ? iDType : name,
      num: subObj.type == "SSN" ? (!isCheck ? num : "") : num,
      strDt: str,
      expDt: subObj.type == "SSN" ? (isCheck ? sbexpD : "") : sbexpD,
      status: status,
      issPlace: issPlace,
      docNum: docNum,
      country,
      state,
      hNum: address,
      area,
      city,
      zip,
      cCode,
      sCode,
      isVrfd: subObj.type == "WrkAuth" ? false : subObj.type == "SSN" && subObj.newObj.expDt ? false : subObj.isVrfd,
      card: card1,
    };

    const card2 =
      subObj.type == "WrkAuth" ? { num: subObj.newObj?.num || "", position: subObj.newObj?.position || "", uscisNum: subObj.newObj?.uscisNum || "", receiptNum: subObj.newObj?.receiptNum || "", sevisNum: subObj.newObj?.sevisNum || ""} : {};
    const oldObj = {
      name: subObj.newObj.name,
      num: subObj.newObj.num,
      strDt: subObj.newObj.strDt,
      expDt: subObj.newObj.expDt,
      status: subObj.newObj.status,
      issPlace: subObj.newObj.issPlace,
      docNum: subObj.newObj.docNum,
      country: subObj.newObj.country,
      state: subObj.newObj.state,
      hNum: subObj.newObj.hNum,
      area: subObj.newObj.area,
      city: subObj.newObj.city,
      zip: subObj.newObj.zip,
      cCode: subObj.newObj.cCode,
      sCode: subObj.newObj.sCode,
      isVrfd: subObj.isVrfd,
      card: card2,
    };

    const searchStr = this.setSrchStr();
    const recordId = subObj._id;
    const reqBody = {
      newObj,
      oldObj,
      strDtStr: newObj?.strDt ? newObj.strDt : '',
      expDtStr: newObj?.expDt ? newObj?.expDt : '',
      searchStr
    };

    if (JSON.stringify(newObj) != JSON.stringify(oldObj)) {
      this.props.putB2BExpirationUpdate(recordId, reqBody, (resObj) => {
        if (resObj.status == "200") {
          this.setState({editmodal: false, errMsg: ""});
          this.props.getExprActList();
        } else {
          this.setState({errMsg: "Update Failed"});
        }
      });
    } else {
      this.setState({errMsg: "There are no changes"});
    }
  };

  setSrchStr = () => {
    const {name, num, status, issPlace, docNum, subObj, card, iDType} = this.state;
    if (subObj.type == "i94") {
      const i94Num = num ? num + "<#$>" : "";
      const i94SrchStr = subObj.type + "<#$>" + i94Num;
      return i94SrchStr;
    } else if (subObj.type == "Visa") {
      const visaStatus = status ? status + "<#$>" : "";
      const visaSrchStr = subObj.type + "<#$>" + visaStatus;
      return visaSrchStr;
    } else if (subObj.type == "Passport") {
      const psprtNum = num ? num + "<#$>" : "";
      const psprtIssPlace = issPlace ? issPlace + "<#$>" : "";
      const psprtDocNum = docNum ? docNum + "<#$>" : "";
      const psprtSrchStr = subObj.type + "<#$>" + psprtNum + psprtIssPlace + psprtDocNum;
      return psprtSrchStr;
    } else if (subObj.type == "USid") {
      const nm = name == "Other" ? iDType : name;
      const unidType = nm ? nm + "<#$>" : '';
      const usaNatID = num ? num + "<#$>" : "";
      const unidSrchStr = subObj.type + "<#$>" + unidType + usaNatID;
      return unidSrchStr;
    } else if (subObj.type == "WrkAuth") {
      const cardNum = card.num ? card.num + "<#$>" : "";
      const cardRcptNum = card.receiptNum ? card.receiptNum + "<#$>" : "";
      const uscisNum = card.uscisNum ? card.uscisNum + "<#$>" : "";
      const sevisNum = card.sevisNum ? card.sevisNum + "<#$>" : "";
      const position = card.position ? card.position + "<#$>" : "";
      const wrkAthSrcStr = subObj.type + "<#$>" + cardNum + cardRcptNum + uscisNum + sevisNum + position;
      return wrkAthSrcStr;
    } else {
      const number = num ? num : '';
      const ssnSrchStr = subObj.type + '<#$>' + number
      return ssnSrchStr;
    }
  };

  handleStatusUpdate = () => {
    const {subObj} = this.state;
    const recordId = subObj._id;
    const reqBody = {isVrfd: true};
    this.props.putB2BExpirationVrfctnUpdate(recordId, reqBody, (resObj) => {
      if (resObj.status == "200") {
        this.setState({isVrfdModal: false, errMsg: ""});
        this.props.getExprActList();
      } else {
        this.setState({errMsg: "Verification Update Failed"});
      }
    });
  };

  handlecloseModal = () => {
    this.setState({editmodal: false, errMsg: ""});
  };

  render() {
    return (
      <>
        <ExpirationDatesComponent
          state={this.state}
          rolesObj={this.props.rolesObj}
          exprActList={this.props.exprActList}
          setStateData={this.setStateData}
          handleShowMoreData={this.props.handleShowMoreData}
          handleEditOpenModal={this.handleEditOpenModal}
          eKey={this.props.eKey}
          handleExpChangeAcc={this.props.handleExpChangeAcc}
        />
        {this.state.subObj?.type == "i94" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationI94PopupComponent state={this.state} setStateData={this.setStateData} handleStatusUpdate={this.handleStatusUpdate} handlecloseModal={this.handlecloseModal} expiratUpdate={this.expiratUpdate} />
        )}
        {this.state.subObj?.type == "Visa" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationVisaPopupComponent state={this.state} rolesObj={this.props.rolesObj} setStateData={this.setStateData} handleStatusUpdate={this.handleStatusUpdate} handlecloseModal={this.handlecloseModal} expiratUpdate={this.expiratUpdate} />
        )}
        {this.state.subObj?.type == "Passport" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationPasptPopupComponent state={this.state} rolesObj={this.props.rolesObj} setStateData={this.setStateData} handleStatusUpdate={this.handleStatusUpdate} handlecloseModal={this.handlecloseModal} expiratUpdate={this.expiratUpdate} />
        )}
        {this.state.subObj?.type == "WrkAuth" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationWrkAuthPopupComponent state={this.state} rolesObj={this.props.rolesObj} setStateData={this.setStateData} handleStatusUpdate={this.handleStatusUpdate} handlecloseModal={this.handlecloseModal} expiratUpdate={this.expiratUpdate} />
        )}
        {this.state.subObj?.type == "USid" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationUSidPopupComponent
            state={this.state}
            rolesObj={this.props.rolesObj}
            setStateData={this.setStateData}
            handleStatusUpdate={this.handleStatusUpdate}
            handlecloseModal={this.handlecloseModal}
            expiratUpdate={this.expiratUpdate}
            handleCountryChange={this.handleCountryChange}
            handleStateChange={this.handleStateChange}
          />
        )}
        {this.state.subObj?.type == "SSN" && (this.state.editmodal || this.state.isVrfdModal) && (
          <ExpirationSSNPopupComponent state={this.state} rolesObj={this.props.rolesObj} setStateData={this.setStateData} handleStatusUpdate={this.handleStatusUpdate} handlecloseModal={this.handlecloseModal} expiratUpdate={this.expiratUpdate} />
        )}
      </>
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  putB2BExpirationVrfctnUpdate: (recordId, body, callback) => dispatch(putB2BExpirationVrfctnUpdate(recordId, body, callback)),
  putB2BExpirationUpdate: (recordId, body, callback) => dispatch(putB2BExpirationUpdate(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ExpirationPopup);
