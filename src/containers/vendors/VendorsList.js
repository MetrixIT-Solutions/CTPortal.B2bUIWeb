/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { VendorsListComponent } from '../../components/vendors';
import { PostB2BVendorsList, GetB2BVendorsView, putB2BVendorsStatusUpdate , PutB2BVendorsDelete } from '../../actions/vendors/VendorActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';

class VendorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vndrsList: [],
      vndrsListCount: 0,
      actPgNum: 1,
      rLimit: 10,
      searchStr: '',
      status: 'Active',
      vndrData: {},
      statusModal: false,
      errMsg: '',
      disable: false,
      viewModal: false,
      deleteModal: false,
      vndrShow: '',
      rolesObj:{},
      loading: true,
      vType: [],
      vendorListCountObj: { venCount: 0, primeVeCount:0, implimtCount:   0},
    };
    this.vndrRef = {};
  }

  setStateData = (data) => this.setState({ ...data });
  componentDidMount = () => {
    const { actPgNum, rLimit, searchStr, vType } = this.state;
    this.getVendorListData(actPgNum, rLimit, searchStr, vType);
  }
  getVendorListData = async (actPgNum, rLimit, searchStr, vType) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const { vendorListCountObj } = this.state;
    const reqBody = { actPgNum, rLimit, searchStr, vType };
    this.props.PostB2BVendorsList(reqBody, (response) => {
      if (response.status == '200') {
        const respData = response.resData.result.bovListByType;
        const countsObj = respData.length > 0 ? this.setStatus(respData) : vendorListCountObj;
        this.setState({ rolesObj: {...rolesObj, appAcc}, vndrsList: response.resData.result.bovList, vndrsListCount: response.resData.result.bovCount, vendorListCountObj: countsObj, actPgNum, rLimit, searchStr, loading: false });
      } else {
        this.setState({ rolesObj: {...rolesObj, appAcc}, vendorListCountObj: {}, vndrsList: [], vndrsListCount: 0, loading: false});
      }
    });
  }
  setStatus = (resData) => {
    let venCount = 0, primeVeCount = 0, implimtCount = 0;
    const Vendor = resData.find(item => item._id == "Vendor");
    const PrimeVendr = resData.find(item => item._id == "Prime Vendor");
    const Implemetn = resData.find(item => item._id == "Implementation Partner");
    venCount = Vendor ? Vendor.count : 0,
    primeVeCount = PrimeVendr ? PrimeVendr.count : 0,
    implimtCount = Implemetn ? Implemetn.count : 0
    return { venCount, primeVeCount, implimtCount}
  }
  statusClick = (key) => {
    const { vType, actPgNum, searchStr, rLimit } = this.state;
    if (vType.includes(key)) {
      const vTyp = vType.filter(vType => vType !== key)
      this.setState({ vType: vTyp });
      this.getVendorListData(actPgNum, rLimit, searchStr, vTyp);
    } else {
      this.setState({ vType: [...vType, key] });
      this.getVendorListData(actPgNum, rLimit, searchStr, [...vType, key]);
    }
  }

  handleRouteHome = async() => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  handleChangeSearch = (event) => {
    const { rLimit, vType } = this.state;
    this.setState({ searchStr: event.target.value });
    event.target.value === '' && this.getVendorListData(1, rLimit, '', vType);
  }
  handleKeyInput = (e) => e.key === "Enter" && this.getVendorListData(1, this.state.rLimit, this.state.searchStr, this.state.vType);
  handlePagination = (actPgNum) => {
    const { rLimit, searchStr, vType } = this.state;
    this.getVendorListData(actPgNum, rLimit, searchStr, vType);
  }
  handleChangerLimit = (event) => {
    const { searchStr, vType } = this.state;
    const pgLimit = Number(event.target.value);
    this.getVendorListData(1, pgLimit, searchStr, vType);
  }

  handleStatusUpdate = () => {
    const { vndrData, actPgNum, rLimit, searchStr, vType } = this.state;
    this.setState({ disable: true });
    const status = vndrData.vStatus == 'Active' ? 'Inactive' : 'Active';
    this.props.putB2BVendorsStatusUpdate(vndrData._id, status, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ statusModal: false, errMsg: '', vndrData: {}, disable: false });
        this.getVendorListData(actPgNum, rLimit, searchStr), vType;
      } else {
        this.setState({ errMsg: 'Vendor Status update failed', disable: false });
      }
    });
  }

  handleViewClick = (data) => {
    this.setState({ viewModal: true, vndrShow: '' });
    this.handleViewData(data);
  }
  handleViewData = (list) => {
    this.props.GetB2BVendorsView(list._id, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ vndrData: resObj.resData.result });
      } else {
        this.setState({ vndrData: {} });
      }
    });
  }

  handlevndrsDelete = () => {
    const { vndrData, vType } = this.state;
    const recordId = vndrData._id;
    const vEmail = vndrData.vcEmail;
    const reqBody = {vEmail};
    this.props.PutB2BVendorsDelete(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ deleteModal: false });
        this.getVendorListData(1, 10, '', vType);
      } else {
        this.setState({ errMsg: 'Delete failed' });
      }
    });
  }

  handleIntrwMenu = (vndrId) => {
    const {vndrShow} = this.state;
    this.setState({vndrShow: vndrShow ? '' : vndrId});
  }

  handleClickOutside = (event) => {
    const { vndrShow } = this.state;
    if (this.vndrRef[vndrShow] && !this.vndrRef[vndrShow].contains(event.target)) {
      this.setState({ vndrShow: '' });
    }
  }

  render() {
    return (
      <VendorsListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleRouteHome={this.handleRouteHome}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handlePagination={this.handlePagination}
        handleChangerLimit={this.handleChangerLimit}
        handleViewClick={this.handleViewClick}
        handleStatusUpdate={this.handleStatusUpdate}
        handlevndrsDelete={this.handlevndrsDelete}
        handleIntrwMenu={this.handleIntrwMenu}
        vndrRef={this.vndrRef}
        handleClickOutside={this.handleClickOutside}
        statusClick={this.statusClick}
      />
    );
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BVendorsList: (body, callback) => dispatch(PostB2BVendorsList(body, callback)),
  GetB2BVendorsView: (recordId, callback) => dispatch(GetB2BVendorsView(recordId, callback)),
  putB2BVendorsStatusUpdate: (recordId, status, callback) => dispatch(putB2BVendorsStatusUpdate(recordId, status, callback)),
  PutB2BVendorsDelete: (recordId, body, callback) => dispatch(PutB2BVendorsDelete(recordId, body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(VendorsList);
