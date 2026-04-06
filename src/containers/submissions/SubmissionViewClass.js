/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
import React, { Component } from 'react'
import { SubmissionViewComponent, SubmisInvtViewComponent } from '../../components/submissions';
import { GetB2BSubView } from '../../actions/submissions/SubmissionActions'
import { connect } from 'react-redux';
import localForage from '../../hooks/localForage';
import config from '../../../config/apis.json';
import axios from 'axios';
import { setHeadersToken } from '../../hooks/apihooks';
import hashHistory from '../../hashHistory';
import {getB2BInvitationView} from '../../actions/invitations/InvitationActions';
import {postB2BConsInviteMeetingsList} from '../../actions/invitations/MeetingsActions';
import { postB2BConsInviteNotesList } from '../../actions/invitations/NotesActions';

class SubmissionViewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submissiView: {},
      rolesObj:{},
      sStatus: '',
      statusModel: false,
      errMsg: '', 
      sucMsg: '',
      sNotes: '',
      file: '',
      imgUrl: '',
      iconPath: '',
      isVrfyNotes: '',
      sType: '',
      inviteData: {},
      iAddress: {},
      iEducation: [],
      iWorkAuths: {},
      iWrkExps: {},
      iUaddress: {},
      viewModal: false,
      showNotesPopup: false,
      showMetgsPopup: false,
      notesList: [],
      meetingsList: [],
      tabsArr: ['Scheduled', 'Completed', 'Cancelled'],
      actTab: '0',
      meeting: {},
      isprImage: false,
      showViewSsn: false,
      userData: {}
    }
    this.fileInput = React.createRef();
    this.sbmsnRef = {};
  }

  componentDidMount = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    this.setState({userData: userInfo})
    this.handleSubmiview();
  }

  setStateData = (data) => {
    this.setState({ ...data });
  } 

  handleStatus = (type) => {
    const {submissiView} = this.state;
    this.setState({statusModal: true,  errMsg: '',  sucMsg: '', sNotes: '', isVrfyNotes: '', sStatus: type == 'Rejected' ? 'Rejected' : '', sType: type, prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: ''})
  }

  handleOnchange = (event) => {
    const { files } = event.target;
    if (files[0]) {
      const imgUrl = URL.createObjectURL(files[0]);
      this.setState({ file: files[0], imgUrl, errMsg: '' });
    }
  }
  removeImage = () => {
    this.setState({ file: null, iconPath: '', errMsg: '', imgUrl: '' });
    if (this.fileInput.current) {
      this.fileInput.current.value = '';
    }
  }

  handleSubmiview = async () => {
    const usrData = await localForage.getItem('userInfo');
    const userInfo = usrData.value;
    const rolesObj = userInfo?.rolesObj || {};
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));
    const recordId = this.props.id
    this.props.GetB2BSubView(recordId, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, submissiView: resObj.resData.result })
      } else {
        this.setState({ rolesObj: { ...rolesObj, appAcc }, submissiView: {} })
      }
    })
  }

  handleStatusUpdate = async () => {
    const { file, sNotes, prHr, prNotes, imgUrl, sStatus, isVrfyNotes, sType, submissiView, rolesObj} = this.state;
    const payRateAcc = ((rolesObj?.access?.length >= 15 && rolesObj?.access[14]?.actions[10]?.isAlwd) || rolesObj?.appAcc) 
    // if (sStatus && !sNotes) {
    //   this.setState({ errMsg: 'Submission Notes is required' });
    if (!isVrfyNotes) {
      this.setState({ errMsg: 'Verify Notes is required' });
    } else if (!submissiView.prHr && sStatus !== 'Rejected' && !prHr) {
      this.setState({ errMsg: 'Payrate is required' });
    } else if (prHr && !imgUrl) {
      this.setState({ errMsg: 'RTR Confirmation image is required' });
    } else {
      const oldPr = {prHr: submissiView.prHr, prNotes: submissiView.prNotes, imgUrl: submissiView.prfPath};
      const newPr = {prHr, prNotes, imgUrl};
      const isPrChg = JSON.stringify(oldPr) !== JSON.stringify(newPr);
      const reqBody = {
        status: sStatus ? sStatus : submissiView.sStatus,
        prHr,
        prNotes,
        vrfyNts: isVrfyNotes,
        sNotes: sNotes ? sNotes : submissiView.sNotes,
        isVrfd: true,
        subAppr: 'Submission Approved',
        isPrChg
      }
      const data = new FormData();
      const img = imgUrl ? file : {};
      data.append('submsnData', JSON.stringify(reqBody));
      data.append('file', img);
      const accTkn = await localForage.getItem('accesstoken');
      const ctpb2bat = accTkn?.value || {};
      const ctpb2batoken = ctpb2bat.ctpb2batoken
      const headers = { headers: { ctpb2batoken } };
      this.handleApiCall(data, headers);
    }
  }

  handleApiCall = async (data, headers) => {
    const { submissiView } = this.state;
    axios.put(config.putB2BSubmissionStatusUpdateAPI + '/' + submissiView._id, data, headers)
      .then((res) => {
        setHeadersToken(res);
        if (res.status == '200') {
          this.setState({ errMsg: '', sucMsg: 'Submission Reviewed Successfully' });
          setTimeout(() => {
            hashHistory.push('/submissions');
            this.setState({ statusModal: false, sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
          }, 2000);
        } else {
          this.setState({ statusModal: true, errMsg: 'Submission Update Failed', sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
        }
      }).catch((err) => {
          this.setState({ statusModal: true, errMsg:'Submission Update Failed', sucMsg: '', prHr:'', prNotes:'', file: null, errMsg: '', imgUrl: '' });
      });
  }
  setStateData = (data) => this.setState({...data});
  handleInvView = () => {
    this.getInvData();
  };

  getInvData = async () => {
    const {submissiView} = this.state;
    this.props.getB2BInvitationView(submissiView.euUser, (resObj) => {
      if (resObj.status == '200') {
        const resAd = resObj.resData.result.address && resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA RES') : {};
        const uAd = resObj.resData.result.address.length ? resObj.resData.result.address.find((item) => item.adrsType == 'USA ID') : {};
        const iAddress = resAd && resAd._id ? resAd : {};
        const iUaddress = uAd && uAd._id ? uAd : {};
        const iEducation = resObj.resData.result.education.length ? resObj.resData.result.education : [];
        const iWorkAuths = resObj.resData.result.workAuths.length ? resObj.resData.result.workAuths[0] : {};
        const iWrkExps = resObj.resData.result.wrkExps.length ? resObj.resData.result.wrkExps[0] : {};
        this.setState({inviteData: resObj.resData.result, iAddress, iWorkAuths, iWrkExps, iEducation, iUaddress, viewModal: true, showMetgsPopup: false, showNotesPopup: false,});
      } else {
        this.setState({inviteData: {}, iAddress: {}, iWorkAuths: {}, iWrkExps: {}, iEducation: [], iUaddress: {}, viewModal: true, showMetgsPopup: false, showNotesPopup: false,});
      }
    });
  };
  handleOpenModels = (model) => {
    if(model == 'details'){
      this.getInvData();
    } else if (model == 'notes') {
      this.inviteNotesList(1, this.state.inviteData)
    } else{
      this.getInviteMeetingsList(1, this.state.inviteData, 0)
    }
  };

  inviteNotesList = (pgNum, inviteData) =>{
    const recordId = inviteData._id;
    const reqBody = { pgNum };
    this.props.postB2BConsInviteNotesList(recordId, reqBody, (response) => {
      if(response.status == '200') {
        this.setState({showNotesPopup: true, showMetgsPopup: false, notesList: response.resData.result.NotesList, pgNum});
      } else{
        this.setState({showNotesPopup: true, showMetgsPopup: false, notesList: [], pgNum});
      }
    });
  }
  getInviteMeetingsList = (pgNum, inviteData, actTab) => {
    const invId = inviteData._id;
    const reqBody = { pgNum, status: this.state.tabsArr[actTab]};
    this.props.postB2BConsInviteMeetingsList(invId, reqBody, (resObj) => {
      if(resObj.status == '200') {
        this.setState({showMetgsPopup: true, showNotesPopup: false, pgNum, meetingsList: resObj.resData.result.mtLIst, actTab});
      } else {
        this.setState({showMetgsPopup: true, showNotesPopup: false, pgNum, meetingsList: [], actTab,});
      }
    });
  }
 
  handleClosePopup = () => {
    this.setState({ showNotesPopup: false, showMetgsPopup: false });
  };
  payRateChange = (e) => {
    const { value } = e.target;
    if (value) {
      this.setState({ prHr: e.target.value, errMsg: '' })
    } else {
      this.setState({ prHr: '' }, () => this.removeImage())
    }
  }

  handleViewShowSsn = () => this.setState({showViewSsn: !this.state.showViewSsn});
  
  render() {
    return (
      <>
      <SubmissionViewComponent
        state={this.state}
        handleStatus={this.handleStatus}
        setStateData={this.setStateData}
        handleOnchange={this.handleOnchange}
        removeImage={this.removeImage}
        handleStatusUpdate={this.handleStatusUpdate}
        handleInvView={this.handleInvView}
        payRateChange={this.payRateChange}
      />
      {this.state.viewModal && (
        <SubmisInvtViewComponent handleOpenModels={this.handleOpenModels} setStateData={this.setStateData} state={this.state} id={this.props.id} handleViewShowSsn={this.handleViewShowSsn}/>
      )}
        </>
    )
  }
}
const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BSubView: (recordId, callback) => dispatch(GetB2BSubView(recordId, callback)),
  getB2BInvitationView: (recordId, callback) => dispatch(getB2BInvitationView(recordId, callback)),
  postB2BConsInviteNotesList: (invId, body, callback) => dispatch(postB2BConsInviteNotesList(invId, body, callback)),
  postB2BConsInviteMeetingsList: (invId, body, callback) => dispatch(postB2BConsInviteMeetingsList(invId, body, callback)),});

export default connect(mapStateToProps, mapDistachToProps)(SubmissionViewClass);
