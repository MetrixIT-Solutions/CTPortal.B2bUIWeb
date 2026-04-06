/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {Component} from 'react';
import moment from 'moment';

import {connect} from 'react-redux';
import {pdf} from '@react-pdf/renderer';
import {saveAs} from 'file-saver';
import {postB2BGoalsList, postB2BGoalsCreate, putB2BGoalsStatusUpdate, putB2BGoalsUpdate, putB2BGoalsReview, putB2BGoalsDelete} from '../../actions/goals/GoalsActions';
import GoalsTabComponent from '../../components/consultants/GoalsTabComponent';
// import {exportPdf} from '../../components/common/ExportPdf';
import GoalsLfyList from './GoalsLfyList';
import ExportPdfComponent from '../../components/common/ExportPdfComponent';

class GoalsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actvTab: '', searchStr: '', gType: '', gCategory: '', gTitle: '', gAccmnts: '', gStatus: '', gsNotes: '', gShow: '', gsNotes: '', key: '',
      gReview: '', grNotes: '', grRating: '', sDate: '', cDate: '', grDtStr: '',
      goalListCount: 0, pgNum: 1, limit: 25, exportAllList: [],
      goalsList: [], goalsLfLList: [], gsDtStr: [], userData: {}, rolesObj: {}, goalData: {},
      goalModal: false, gStsModal: false, rvwModal: false, viewModal: false, delModal: false, loading: true, lifeCycleModal: false,
      allLoading: false,
      curLoading: false
    };
    this.gRef = {};
    this.dropdownRef = React.createRef();
  }

  componentDidUpdate = (prevProps) => {
    const {searchStr} = this.state;
    if (prevProps.state.actTab !== this.props.state.actTab || prevProps.gStatus !== this.props.gStatus) {
      this.getGoalsList(searchStr, 1, 25);
    }
  }

  setStateData = (data) => this.setState({...data});

  getGoalsList = (searchStr, pgNum, limit) => {
    const userData = this.props.cnsltantView;
    const reqBody = {pgNum, limit, gStatus: this.props.gStatus, euUser: userData._id, searchStr};
    this.props.postB2BGoalsList(reqBody, resObj => {
      if (resObj.status == '200') {
        const gList = resObj.resData.result.gList;
        const goalsList = gList?.length > 0 ? gList.sort((a, b) => new Date(b.gsDtStr[0]) - new Date(a.gsDtStr[0])) : [];        
        const goalListCount = resObj.resData.result.gListCount;
        this.setState({actvTab: this.props.actvTab, rolesObj: this.props.state.rolesObj, goalsList, goalListCount, searchStr, pgNum, limit: Number(limit), errMsg: '', gsDtStr: [] ,gType: '', sDate: '', cDate: '', gCategory: '', gTitle: '', gAccmnts: '', gStatus: '', gsNotes: '', key: '', gReview: '', grNotes: '', grRating: '', grDtStr: moment().format('YYYY-MM-DD'), goalModal: false, gStsModal: false, rvwModal: false, delModal: false, loading: false});
      } else this.setState({actvTab: this.props.actvTab, userData: this.props.state.userData, rolesObj: this.props.state.rolesObj, goalsList: [], goalListCount: 0, pgNum, limit, searchStr, errMsg: '', gType: '', sDate: '', cDate: '', gsDtStr: [], gCategory: '',gTitle: '',gAccmnts: '',gStatus: '',gsNotes: '', key: '', gReview: '', grNotes: '', grDtStr: moment().format('YYYY-MM-DD'), grRating: '', goalModal: false, gStsModal: false, rvwModal: false, delModal: false, loading: false});
    });
  }

  handleCreateGoal = () => {
    const userData = this.props.cnsltantView;
    const {sDate, gType, gCategory, gTitle, gAccmnts, gStatus, gsNotes} = this.state;
    const reqBody = {org: userData.org, orgName: userData.orgName, orgCode: userData.orgCode, team: userData.team,
      tName: userData.tName, tCode: userData.tCode, euUser: userData._id, euName: userData.name, euMobCcNum: userData.mobCcNum, euEmID: userData.emID, euUID: userData.refUID, euPrimary: userData.myPrimary, gsDtStr: sDate, gType, gCategory, gTitle, gAccmnts, gStatus, gsNotes};
    if (!gType) this.setState({errMsg: 'Goal Type is required'});
    else if (!gCategory) this.setState({errMsg: 'Goal Category is required'});
    else if (!gCategory) this.setState({errMsg: 'Goal Type is required'});
    // else if (!gTitle) this.setState({errMsg: 'Goal Title is required'});
    else if (!sDate) this.setState({errMsg: 'Start date is required'});
    else if (!gStatus) this.setState({errMsg: 'Goal Status is required'});
    else if (!gAccmnts) this.setState({errMsg: 'Goal & Accomplishments  is required'});
    else {
      this.props.postB2BGoalsCreate(reqBody, resObj => {
        if (resObj.status == '200') {
          this.getGoalsList('', 1, 25);
        } else {
          this.setState({errMsg: resObj.resData?.message || 'Goal create failed'});
        }
      });
    }
  }

  handleSearch = (e) => {
    const searchStr = e.target.value;
    this.setState({searchStr});
    searchStr == '' && this.getGoalsList('', 1, 25);
  }

  handleKeyInput = (e) => e.key === 'Enter' && this.getGoalsList(this.state.searchStr, this.state.pgNum, this.state.limit);

  handleClickOutside = (event) => {
    const { gShow } = this.state;
    if (this.gRef[gShow] && !this.gRef[gShow].contains(event.target)) {
      this.setState({gShow: ''});
    }
  }

  handleGoalStatusUpdate = () => {
    const {gStatus, gsNotes, goalData, sDate, cDate,} = this.state;
    if (!gStatus) this.setState({errMsg: 'Goal Status is required'});
    else if (gStatus !== 'Completed' && !sDate) this.setState({errMsg: 'Start date is required'});
    else if (gStatus == 'Completed' && !cDate) this.setState({errMsg: 'Completed  date is required'});
    else if (!gsNotes) this.setState({errMsg: 'Goal Status Notes is required'});
    else {
      const gsDtStr = (cDate && gStatus == 'Completed') ? [sDate, cDate] : [sDate];
      const reqBody = {gStatus, gsNotes, gsDtStr};
      const oldObj = {gStatus: goalData.gStatus, gsNotes: goalData.gsNotes, gsDtStr: goalData.gsDtStr};
      if (JSON.stringify(oldObj) !== JSON.stringify(reqBody)) {
        this.props.putB2BGoalsStatusUpdate(goalData._id, reqBody, resObj => {
          if (resObj.status == '200') {
            this.getGoalsList('', this.state.pgNum, this.state.limit);
          } else {
            this.setState({errMsg: 'Goal status update failed'});
          }
        });
      }  else this.setState({errMsg: 'There is no change in status'});
    }
  }

  handleEdit = (goalData) => {
    this.setState({
      gType: goalData.gType, sDate: goalData?.gsDtStr[0], cDate: goalData?.gsDtStr[1] || '', gCategory: goalData.gCategory, gTitle: goalData.gTitle, gAccmnts: goalData.gAccmnts, gStatus: goalData.gStatus, gsNotes: goalData.gsNotes, goalModal: true, goalData, key: 'update',  gShow: ''
    });
  }

  handleUpdate = () => {
    const {sDate, cDate, gType, gCategory, gTitle, gAccmnts, gStatus, gsNotes, goalData} = this.state;
    const gsDtStr = cDate ? [sDate, cDate] : [sDate];
    if (!gType) this.setState({errMsg: 'Goal Type is required'});
    else if (!gCategory) this.setState({errMsg: 'Goal Category is required'});
    else if (!gCategory) this.setState({errMsg: 'Goal Type is required'});
    // else if (!gTitle) this.setState({errMsg: 'Goal Title is required'});
    else if (!sDate) this.setState({errMsg: 'Start date is required'});
    else if (gStatus == 'Completed' && !cDate) this.setState({errMsg: 'Completed  date is required'});
    else if (!gAccmnts) this.setState({errMsg: 'Goal & Accomplishments  is required'});
    else {
      const reqBody = {gsDtStr, gType, gCategory, gTitle, gAccmnts, gStatus, gsNotes};
      const oldObj = {gsDtStr: goalData.gsDtStr, gType: goalData.gType, gCategory: goalData.gCategory, gTitle: goalData.gTitle, gAccmnts: goalData.gAccmnts, gStatus: goalData.gStatus, gsNotes: goalData.gsNotes};
      if (JSON.stringify(oldObj) !== JSON.stringify(reqBody)) {
        this.props.putB2BGoalsUpdate(goalData._id, reqBody, resObj => {
          if (resObj.status == '200') {
            this.getGoalsList('', this.state.pgNum, this.state.limit);
          } else this.setState({errMsg: 'Goal update  failed'});
        });
      } else this.setState({errMsg: 'There are no changes to update'});
    }
  }

  handleReview = () => {
    const {gReview, grNotes, grRating, goalData, grDtStr} = this.state;
    if (!grRating) this.setState({errMsg: 'Goal Rating is required'});
    else if (grRating && grRating > 10) this.setState({errMsg: 'Rating should not exceed 10'});
    else if (!grDtStr) this.setState({errMsg: 'Goal Review Date is required'});
    else if (!gReview) this.setState({errMsg: 'Goal Review is required'});
    else {
      const reqBody = {gReview, grNotes, grRating: Number(grRating), grDtStr};
      this.props.putB2BGoalsReview(goalData._id, reqBody, resObj => {
        if (resObj.status == '200') {
          this.getGoalsList('', this.state.pgNum, this.state.limit);
        } else this.setState({errMsg: 'Goal review create failed'});
      });
    }
  }

  handleChangeLimit = (e) => {
    const { searchStr, pgNum } = this.state;
    let limit = e.target.value;
    this.getGoalsList(searchStr, pgNum , limit);
  }

  handleChangePage = (pgNum) => {
    const { searchStr, limit } = this.state;
    this.getGoalsList(searchStr, pgNum , limit);
  }

  handleDelete = () => {
    const {goalData, pgNum, limit} = this.state;
    this.props.putB2BGoalsDelete(goalData._id, resObj => {
      if (resObj.status == '200') {
        this.getGoalsList('', pgNum, limit);
      } else this.setState({errMsg: 'Goal delete failed'});
    });
  }

  numbersOnly = (event) => {
    const charCode = event.charCode || event.keyCode;
    const char = String.fromCharCode(charCode);
  
    // Allow digits (0–9) and one dot (.)
    if (!/[\d.]/.test(char)) {
      event.preventDefault();
      return;
    }
  
    // Prevent more than one dot
    if (char === '.' && event.target.value.includes('.')) {
      event.preventDefault();
    }
  };

  handleCloseModal = (key) => {
    const {goalData} = this.state;
    if (key == 'update') {
    this.setState({goalModal: false, gType: goalData.gType, gsDtStr: goalData.gsDtStr, gCategory: goalData.gCategory, gTitle: goalData.gTitle, gAccmnts: goalData.gAccmnts, gStatus: goalData.gStatus, gsNotes: goalData.gsNotes, key: '', errMsg: '', cDate: goalData.gsDtStr.length > 1 ? goalData.gsDtStr[1] : '', sDate: goalData.gsDtStr[0]});
    } else this.setState({goalModal: false, gType: '', gsDtStr: '', gCategory: '',gTitle: '',gAccmnts: '',gStatus: '',gsNotes: '',gsDtStr: '', gShow: '', gsNotes: '', key: '', errMsg: '', cDate: '', sDate: ''});
  }

  exportPdfAll = () => {
    const userData = this.props.cnsltantView;
    if (!userData || !userData._id) {
      this.setState({ errMsg: 'Invalid user data', errMsg: '' });
      return;
    }
    this.setState({ allLoading: true })
    const reqBody = {pgNum: 1, limit: 100, gStatus: 'All', euUser: userData._id, searchStr: this.state.searchStr, lKey: 'expAll'};
    this.props.postB2BGoalsList(reqBody, resObj => {
      if (resObj.status == '200') {
        const gList = resObj.resData.result;
        const exportAllList = gList?.length > 0 ? gList.sort((a, b) => new Date(b.gsDtStr[0]) - new Date(a.gsDtStr[0])) : [];
        // exportPdf(goalsList)
        this.commonFunc(exportAllList);
      } else {
        this.setState({ allLoading: false, errMsg: 'Failed to generate PDF' });
      }
    });
  }
  exportCurPage = () => {
    this.setState({ curLoading: true });
    const { goalsList } = this.state;
    if (!goalsList || goalsList.length === 0) return;
    this.commonFunc(goalsList)
  }
  commonFunc = async (goalsList) => {
    try {
      const element = <ExportPdfComponent data={goalsList} />;
      const blob = await pdf(element).toBlob();
      if (!blob || blob.size === 0) {
        console.error('Empty blob - PDF failed.');
        this.setState({ allLoading: false, curLoading: false, errMsg: 'PDF is empty.' });
        return;
      }
      const currentDateTime = moment().format('YYYYMMDD-HHmm');
      const fileName = `${goalsList[0]?.euName}-${currentDateTime}.pdf`;
      saveAs(blob, fileName);
      const dropdownToggle = this.dropdownRef?.current;
      if (dropdownToggle) dropdownToggle.click();
      this.setState({ allLoading: false, curLoading: false });
    } catch (err) {
      console.error('PDF generation failed:', err);
      this.setState({ allLoading: false, curLoading: false, errMsg: 'Failed to generate PDF' });
    }
  }

  render() {
    return <>
      <GoalsTabComponent state={this.state} handleCreateGoal={this.handleCreateGoal} setStateData={this.setStateData}
        handleSearch={this.handleSearch} handleKeyInput={this.handleKeyInput} handleClickOutside={this.handleClickOutside}
        handleGoalStatusUpdate={this.handleGoalStatusUpdate} handleEdit={this.handleEdit} handleUpdate={this.handleUpdate}
        gRef={this.gRef} handleReview={this.handleReview} rolesObj={this.props.rolesObj} handleChangeLimit={this.handleChangeLimit}
        handleChangePage={this.handleChangePage} handleDelete={this.handleDelete} numbersOnly={this.numbersOnly} handleCloseModal={this.handleCloseModal} exportPdfAll={this.exportPdfAll} exportCurPage={this.exportCurPage} dropdownRef={this.dropdownRef}
      /> 
      {this.state.lifeCycleModal && <GoalsLfyList lifeCycleModal={this.state.lifeCycleModal} goalView={this.state.goalData} goalsLfLList={this.state.goalsLfLList} setStateData={this.setStateData}/>}
    </>
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BGoalsList: (body, callback) => dispatch(postB2BGoalsList(body, callback)),
  postB2BGoalsCreate: (body, callback) => dispatch(postB2BGoalsCreate(body, callback)),
  putB2BGoalsStatusUpdate: (id, body, callback) => dispatch(putB2BGoalsStatusUpdate(id, body, callback)),
  putB2BGoalsUpdate: (id, body, callback) => dispatch(putB2BGoalsUpdate(id, body, callback)),
  putB2BGoalsReview: (id, body, callback) => dispatch(putB2BGoalsReview(id, body, callback)),
  putB2BGoalsDelete: (id, callback) => dispatch(putB2BGoalsDelete(id, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(GoalsTab);
