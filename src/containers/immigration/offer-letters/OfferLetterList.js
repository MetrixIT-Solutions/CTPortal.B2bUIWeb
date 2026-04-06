/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { OfferLetterListComponent } from '../../../components/immigration/offer-letters';
import { postB2BOfrLtrList, putB2BOfrLtrCaseIdUpdt, putB2BOfrLtrPrtyUpdt, putB2BOfrLtrDelete } from '../../../actions/immigration/OfferLetterActions';
import { postGetSignedPdfPaths } from '../../../actions/templates/TemplatesActions';
import OfferLetterCreate from '../offer-letters/OfferLetterCreate';
import OfferLetterLfCylList from './OfferLetterLfCylList';
import OfferLetterFwlpList from '../offer-letters/OfferLetterFwlpList';

import localForage from '../../../hooks/localForage';
import hashHistory from '../../../hashHistory';
import config from '../../../../config/apis.json';
import { setHeadersToken } from '../../../hooks/apihooks';
import axios from 'axios';
import configJson from '../../../../config/config.json';

class OfferLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ofrLtrList: [],
      ofrLtrListCount: 0,
      actPgNum: 1,
      searchStr: '',
      pageLimit: 10,
      isSearch: false,
      errMsg: '',
      disable: false,
      rolesObj: {},
      loading: true,
      createModal: false,
      ofrLtrShow: '',

      infoModal: false,
      empData: {},
      type: '',
      status: [],
      ofrLtrListCountObj: { opnCount: 0, rvwCount: 0, isdCount: 0 },
      viewModal: false,
      ofrLtrData: {},
      updateModal: false,
      olStatus: '',
      olNotes: '',
      editModal: false, 
      olcNum: '',
      ofrLtrLfcModal: false,
      ofrLtrFwlpModal: false,
      priority: '',
      prModal: false,
      pdfShow: false,
      pdfUrl: '',
      pdfMessage: '',

      file: '',
      iconPath: '',
      imgUrl: '',
      delModal: false
    };
    this.ofrLtrRef = {};
    this.fileInput = React.createRef();
    // this.handleOfrLtrPdfView = this.handleOfrLtrPdfView.bind(this);
  }

  componentDidMount = () => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    this.getOfrLtrListData(actPgNum, searchStr, pageLimit, isSearch, status);
  }
  getOfrLtrListData = async (actPgNum, searchStr, pageLimit, isSearch, status) => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const reqBody = { pgNum: actPgNum, limit: pageLimit, searchStr, status };
    this.props.postB2BOfrLtrList(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const respData = resObj.resData.result.ofrLtrsCountByStatus;
          const countsObj = respData.length > 0 ? this.setStatus(respData) : ofrLtrListCountObj;
        this.setState({ rolesObj: { ...rolesObj, appAcc }, ofrLtrList: resObj.resData.result.ofrLtrsList, ofrLtrListCount: resObj.resData.result.ofrLtrsListCount, actPgNum, searchStr, pageLimit, loading: false, ofrLtrListCountObj: countsObj });
      } else if (isSearch) {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, ofrLtrList: [], ofrLtrListCount: 0, actPgNum, searchStr, pageLimit, loading: false, ofrLtrListCountObj: 0 });
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, loading: false });
      }
    });
  }

  handleRouteHome = async () => {
    await localForage.setItem('tabValue', 'dashboard');
    hashHistory.push('/home');
  }

  setStateData = (data) => this.setState({ ...data });

  handleChangeSearch = (e) => {
    const { pageLimit, status } = this.state;
    this.setState({ searchStr: e.target.value });
    e.target.value == '' && this.getOfrLtrListData(1, '', pageLimit, false, status);
  }
  handleKeyInput = (e) => e.key === 'Enter' && this.getOfrLtrListData(1, this.state.searchStr, this.state.pageLimit, true, this.state.status);
  handleChangePage = (activePage) => {
    const { searchStr, pageLimit, status } = this.state;
    this.getOfrLtrListData(activePage, searchStr, pageLimit, false, status);
  }
  handleChangeLimit = (e) => {
    const { searchStr, actPgNum, isSearch, status } = this.state;
    let pageLimit = e.target.value;
    this.getOfrLtrListData(actPgNum, searchStr, pageLimit, isSearch, status);
  }

  handleOfrLtrMenu = (ofrLtrId) => {
    const { ofrLtrShow } = this.state;
    this.setState({ofrLtrShow: ofrLtrShow ? '' : ofrLtrId});
  }
  handleClickOutside = (event) => {
    const { ofrLtrShow } = this.state;
    if (this.ofrLtrRef[ofrLtrShow] && !this.ofrLtrRef[ofrLtrShow].contains(event.target)) {
      this.setState({ ofrLtrShow: '',  });
    }
  }

  handleOfrLtrCreate = () => {
    this.setState({ createModal: true, errMsg: '', ofrLtrShow: '' })
  }

  handleClose = () => this.setState({ createModal: false, errMsg: '', infoModal: false, pdfShow: false })

  setStatus = (resData) => {
    let opnCount = 0, isdCount = 0, rvwCount = 0;
    const opnObj = resData.find(item => item._id == 'Open');
    const sbmtdObj = resData.find(item => item._id == 'Issued');
    const rvwObj = resData.find(item => item._id == 'Review');
    opnCount = opnObj ? opnObj.count : 0,
    isdCount = sbmtdObj ? sbmtdObj.count : 0,
    rvwCount = rvwObj ? rvwObj.count : 0
    return { opnCount, isdCount, rvwCount };
  }
  statusClick = (key) => {
    const { actPgNum, searchStr, pageLimit, isSearch, status } = this.state;
    if (status.includes(key)) {
      const st = status.filter(status => status !== key)
      this.setState({ status: st });
      this.getOfrLtrListData(actPgNum, searchStr, pageLimit, isSearch, st);
    } else {
      this.setState({ status: [...status, key] });
      this.getOfrLtrListData(actPgNum, searchStr, pageLimit, isSearch, [...status, key]);
    }
  }

  handleOfrLtrViewClick = (item) => {
    this.setState({ viewModal: true, ofrLtrData: item })
  }

  handleOfrLtrUpdate = () => {
    const { olcNum, ofrLtrData } = this.state;
    if (!olcNum) {
      this.setState({ errMsg: 'Case Id Required' });
    } else {
      this.setStateData({ disable: true });
      const recordId =  ofrLtrData._id;
      const reqBody = { olcNum };
      if (ofrLtrData.olcNum === reqBody.olcNum) {
        this.setState({ errMsg: 'There are no Changes' })
      } else {
        this.props.putB2BOfrLtrCaseIdUpdt(recordId, reqBody, (resObj) => {
          if (resObj.status == '200') {
            this.setState({ editModal: false, errMsg: '', ofrLtrData: {}, disable: false });
            this.getOfrLtrListData(1, '', 10, false, []);
          } else {
            this.setState({ errMsg: 'Offer Letter Case-ID Updation Failed', disable: false });
          }
        });
      }
    }
  }

  handleOfrLtrLifeCycleClick = (item) => {
    this.setState({ofrLtrLfcModal: true, ofrLtrData: item})
  }

  handleOfrLtrFwlpClick = (item) => {
    this.setState({ofrLtrFwlpModal: true, ofrLtrData: item})
  }

  handlePrClick = () => {
    let { priority, ofrLtrData, ofrLtrList } = this.state;
    if (priority === ofrLtrData.priority) {
      this.setState({ errMsg: 'There is no change in Priority' });
    } else {
      this.setState({ disable: true });
      const reqBody = { priority };
      this.props.putB2BOfrLtrPrtyUpdt(ofrLtrData._id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          const index = ofrLtrList.findIndex(ptns => ptns._id === ofrLtrData._id);
          if (index > -1) ofrLtrList[index]['priority'] = priority;
          this.setState({ prModal: false, ofrLtrList, ofrLtrData: {}, errMsg: '', priority: '', disable: false });
        } else {
          this.setState({ prModal: false, errMsg: '', priority: '', disable: false });
        }
      })
    }
  }

  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], errMsg: '' });
    }
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleStatusUpdate = async () => {
    const { ofrLtrData, olNotes, file  } = this.state;
    if (!file) {
      this.setState({ errMsg: 'Upload Offer Letter is required' });
    } else if (!olNotes) {
      this.setState({ errMsg: 'Issue Notes is required' });
    } else {
      const reqBody = { olStatus: 'Issued', olsNotes: olNotes, olfPath:  ofrLtrData?.olfPath ? ofrLtrData.olfPath : ''};
      const data = new FormData();
      const img = file;
      data.append('offLtrData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }
  handleApiCall = async (data, headers) => {
    const { ofrLtrData } = this.state;
    const recordId = ofrLtrData._id;
    this.setState({ disable: true });
    axios.put(config.putB2BOfrLtrStsUpdtAPI + recordId, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          this.getOfrLtrListData(1, '', 10, false, []);
          this.setState({ updateModal: false, errMsg: '', ofrLtrData: {}, disable: false, olNotes: '', file: '' });
        } else {
          this.setState({ disable: false, errMsg: 'Offer Letter Issued Failed' });
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.status == '103') {
          this.setState({ errMsg: err.response.data.resData.message, disable: false });
        } else {
          this.setState({ disable: false });
        }
      });
  }

  handleDownloadFiles = async (files) => {
    const link = document.createElement('a');
    link.href = files.olfPath;
    link.target = '_blank'
    link.setAttribute('download', files.olfPath || 'download.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  handleOfrLtrPdfView = async (item) => {
    const pArr = item.split(configJson.fileBk);
    if(pArr.length > 1) {
      const reqBody = {filepaths: [pArr[1]]};
      this.props.postGetSignedPdfPaths(reqBody, resObj => {
        if(resObj.status == '200') {
          const signedUrl = resObj.resData.result.urls[0];
          if(signedUrl !== 'null'){
            this.setState({ pdfShow: true, pdfUrl: signedUrl, pdfMessage: '', viewModal: false });
          } else {
            this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found', viewModal: false});
          }
        } else {
          this.setState({ pdfShow: true, pdfUrl: '', pdfMessage: 'File not Found', viewModal: false });
        }
      });
    } else this.setState({ pdfShow: true, pdfUrl: item, pdfMessage: '', viewModal: false });
  }

  handleDelClick = () => {
    const { ofrLtrData, ofrLtrList, ofrLtrListCount } = this.state;
    const recordId = ofrLtrData._id;
    const reqBody = { oId: ofrLtrData.oId, olcNum : ofrLtrData.olcNum };
    this.props.putB2BOfrLtrDelete(recordId, reqBody, (resObj) => {
      if (resObj.status == '200') {
        const index = ofrLtrList.findIndex(olObj => olObj._id === recordId);
        if (index > -1) ofrLtrList.splice(index, 1);
        this.setState({ delModal: false, ofrLtrList, ofrLtrListCount: (ofrLtrListCount - 1), ofrLtrData: {}, errMsg: '', disable: false });
      } else {
        this.setState({ errMsg: 'Offer Letter Deletion Failed' });
      }
    });
  }

  render() {
    return <>
      <OfferLetterListComponent
        state={this.state}
        handleRouteHome={this.handleRouteHome}
        setStateData={this.setStateData}
        handleChangeSearch={this.handleChangeSearch}
        handleKeyInput={this.handleKeyInput}
        handleChangePage={this.handleChangePage}
        handleChangeLimit={this.handleChangeLimit}
        handleOfrLtrMenu={this.handleOfrLtrMenu}
        handleClickOutside={this.handleClickOutside}
        ofrLtrRef={this.ofrLtrRef}
        handleOfrLtrCreate={this.handleOfrLtrCreate}
        handleClose={this.handleClose}
        statusClick={this.statusClick}
        handleOfrLtrViewClick={this.handleOfrLtrViewClick}
        handleOfrLtrUpdate={this.handleOfrLtrUpdate}
        handleOfrLtrLifeCycleClick={this.handleOfrLtrLifeCycleClick}
        handleOfrLtrFwlpClick={this.handleOfrLtrFwlpClick}
        handlePrClick={this.handlePrClick}
        handleOnchange={this.handleOnchange}
        removeImage={this.removeImage}
        fileInput = {this.fileInput}
        handleStatusUpdate={this.handleStatusUpdate}
        handleDownloadFiles={this.handleDownloadFiles}
        handleOfrLtrPdfView={this.handleOfrLtrPdfView}
        handleDelClick={this.handleDelClick}
      />
      {this.state.createModal && <OfferLetterCreate createModal={this.state.createModal} handleClose={this.handleClose} getOfrLtrListData={this.getOfrLtrListData} />}
      <OfferLetterLfCylList ofrLtrLfcModal={this.state.ofrLtrLfcModal} ofrLtrData={this.state.ofrLtrData} setStateData={this.setStateData}/>
      <OfferLetterFwlpList ofrLtrFwlpModal={this.state.ofrLtrFwlpModal} ofrLtrData={this.state.ofrLtrData} setStateData={this.setStateData}/>
    </>
  };
};

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BOfrLtrList: (body, callback) => dispatch( postB2BOfrLtrList(body, callback)),
  putB2BOfrLtrCaseIdUpdt: (recordId, body, callback) => dispatch( putB2BOfrLtrCaseIdUpdt(recordId, body, callback)),
  putB2BOfrLtrPrtyUpdt: (recordId, body, callback) => dispatch( putB2BOfrLtrPrtyUpdt(recordId, body, callback)),
  postGetSignedPdfPaths: (body, callback) => dispatch( postGetSignedPdfPaths(body, callback)),
  putB2BOfrLtrDelete: (recordId, body, callback) => dispatch(putB2BOfrLtrDelete(recordId, body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(OfferLetter);