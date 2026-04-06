/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import MyProfileComponent from '../../components/my-profile/MyProfileComponent';
import { getB2BUserProfileView, postB2BUserProfileUpdate } from '../../actions/profile/ProfileActions';
import { PostB2BUserLogout } from '../../actions/login/LoginActions';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      initialData: {},
      sName: '',
      fName: '',
      lName: '',
      mobCc: '+1',
      mobNum: '',
      emID: '',
      altMobCc: '+1',
      altMobNum: '',
      altEmID: '',
      dob: '',
      gender: '',
      linUrl: '',
      userRole: '',
      errorMsg: '',
      profileModal: false,
      years: 0,
      months: 0,
      descNum: '',
      extnsn: '',
      joinDte: '',
      descLoc: '',
      descNumCode: '+1',
      disable: false
    };
  }

  componentDidMount = () => {
    this.getB2BProfileView();
  }

  getB2BProfileView = () => {
    this.props.getB2BUserProfileView( async resObj => {
      if(resObj.status == '200') {
        const initialData = this.setData(resObj.resData.result);
        const linUrl = resObj.resData.result.wrkUrls && resObj.resData.result.wrkUrls.length ? resObj.resData.result.wrkUrls[0] : '';
        const nextData = {years: resObj.resData.result?.expYear || 0, months: resObj.resData.result?.expMonth || 0, joinDte: resObj.resData.result?.joinDtStr || '', descNumCode: resObj.resData.result?.descCc || '+1', descNum: resObj.resData.result?.descNum || '', extnsn: resObj.resData.result?.descExtnsn || '', descLoc: resObj.resData.result?.descLoc || ''};
        this.setState({ profileData: resObj.resData.result, ...initialData, initialData, linUrl, emID: resObj.resData.result.emID, userRole: resObj.resData.result.userRole, ...nextData });
      } else {
        this.setState({ profileData: this.props.LoginReducer.userObj });
      }
    });
  }

  setData = (resObj) => {
    return {
      sName: resObj.sName || '',
      fName: resObj.fName,
      lName: resObj.lName,
      mobCc: resObj.mobCc || '+1',
      mobNum: resObj.mobNum || '',
      altMobCc: resObj.altMobCc || '',
      altMobNum: resObj.altMobNum || '',
      altEmID: resObj.altEmID || '',
      dob: resObj.dobStr ? resObj.dobStr : '',
      gender: resObj.gender,
      wrkUrls: resObj.wrkUrls,
      joinDte: resObj.joinDtStr,
      years: resObj.expYear,
      months: resObj.expMonth,
      descNum: resObj.descNum,
      extnsn: resObj.descExtnsn,
      descLoc: resObj.descLoc,
      descNumCode: resObj.descCc,
      descCcNum: resObj.descCcNum ? resObj.descCcNum  : ''
    };
  }

  setStateData = (data) => this.setState({ ...data });

  editProfileClick = async (event) => {
    event.preventDefault();
    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.]{1}[a-zA-Z]{2,6}$/;
    // const linkedinValid = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    const { sName, initialData, fName, lName, mobCc, mobNum, altMobCc, altMobNum, altEmID, dob, gender, linUrl, years, months, descNum, extnsn, joinDte, descLoc, descNumCode } = this.state;
    const oldName = initialData.fName + ' ' + initialData.lName;
    const newName = fName + ' ' + lName;
    const isName = (oldName === newName);

    const oldData = {
      oldName: initialData.fName + ' ' + initialData.lName,
      chngNumber: initialData.mobCc + ' ' + initialData.mobNum,
      officeNum: initialData.descCcNum,
      extnsn: initialData.extnsn
    };
    const newData = {
      oldName: fName + ' ' + lName,
      chngNumber: mobCc + ' ' + mobNum,
      officeNum: descNum ? descNumCode + ' ' + descNum : '',
      extnsn
    };
    const checkData = JSON.stringify(oldData) === JSON.stringify(newData);

    if (!fName) {
      this.setState({ errorMsg: 'First Name is required' });
    } else if (!lName) {
      this.setState({ errorMsg: 'Last Name is required' });
    } else if ((altEmID && !emailValid.test(altEmID))) {
      this.setState({ errorMsg: 'Invalid Alternate Email' });
    } else if (mobNum.length < 10) {
      this.setState({ errorMsg: 'Mobile Number requires 10 digits' });
    } else if (altMobNum && !altMobCc) {
      this.setState({ errorMsg: 'Alternate Mobile country code is required' });
    } else if (altMobNum && altMobNum.length < 10) {
      this.setState({ errorMsg: 'Alternate Mobile Number requires 10 digits' });
    } else if (!dob) {
      this.setState({ errorMsg: 'Date of Birth is required' });
    } else if (!gender) {
      this.setState({ errorMsg: 'Gender is required' });
    } else if (!linUrl) {
      this.setState({ errorMsg: 'Linkedin Profile is required' });
    // } else if (linUrl && !linkedinValid.test(linUrl)) {
    //   this.setState({ errorMsg: 'Linkedin Profile, Starting "https://www.linkedin.com/" is required' });  
    // } else if(linUrl && (linUrl.split('/').length < 5 || linUrl.split('/')[4].length < 1)) {
    //   this.setState({ errorMsg: 'Provide a valid Linkedin Profile' });
    } else if (!descNum) {
      this.setState({ errorMsg: 'Office Number is required' });
    } else {
      const reqBody = {
        sName, fName, lName,
        mobCc, mobNum,
        altMobCc: altMobNum ? altMobCc : '', altMobNum,
        descLoc, descNum, 
        altEmID, dob, gender,
        wrkUrls: linUrl ? [linUrl] : [],
        years: Number(years), months: Number(months), extnsn,
        descNumCode: descNum ? descNumCode : '',
        descCcNum: descNum ? descNumCode + ' ' + descNum : '', 
        isName, checkData
      };

      const data = {
        sName: initialData.sName, fName: initialData.fName, lName: initialData.lName,
        mobCc: initialData.mobCc, mobNum: initialData.mobNum,
        altMobCc: initialData.altMobNum ? initialData.altMobCc : '', altMobNum: initialData.altMobNum,
        descLoc: initialData.descLoc, descNum: initialData.descNum, 
        altEmID: initialData.altEmID, dob: initialData.dob, gender: initialData.gender,
        wrkUrls: initialData.wrkUrls,
        years: Number(initialData.years), months: Number(initialData.months), extnsn: initialData.extnsn,
        descNumCode: initialData.descNumCode, 
        descCcNum: initialData.descCcNum
      }

      if(JSON.stringify(data) === JSON.stringify(reqBody)) {
        this.setState({ errorMsg: 'There are no changes to update' });
      }else{
        this.setState({disable: true});
        this.props.postB2BUserProfileUpdate(reqBody, async (resObj) => {
          if (resObj.status == '200') {
            await localForage.setItem('userInfo', resObj.resData.result);
            const initialData = this.setData(resObj.resData.result);
            const linUrl = resObj.resData.result.wrkUrls && resObj.resData.result.wrkUrls.length ? resObj.resData.result.wrkUrls[0] : '';
            this.setState({profileModal: false, errorMsg: '', profileData: resObj.resData.result, ...initialData, initialData, linUrl, emID: resObj.resData.result.emID, userRole: resObj.resData.result.userRole, disable: false});
          } else {
            this.setState({ errorMsg: 'Profile Edit Failed', disable: false });
          }
        });
      }
    }
  }

  setProfileData = () => {
    const {profileData} = this.state;
    const data = this.setData(profileData);
    const linUrl = profileData.wrkUrls && profileData.wrkUrls.length ? profileData.wrkUrls[0] : '';
    const nextData = {years: data?.years || 0, months: data?.months || 0, joinDte: data?.joinDte || '', descNumCode: data?.descNumCode || '+1', descNum: data?.descNum || '', extnsn: data?.extnsn || '', descLoc: data?.descLoc || ''};
    this.setState({...data, profileModal: true, errorMsg: '', linUrl, disable: false, ...nextData});
  }

  handleLogout = async () => {
    this.props.PostB2BUserLogout(resObj => {})
    hashHistory.push('/login');
    await localForage.clearItems()
  }

  render() {
    return (
      <div>
        <MyProfileComponent 
          state={this.state}
          setStateData={this.setStateData}
          editProfileClick={this.editProfileClick}
          setProfileData={this.setProfileData}
          handleLogout={this.handleLogout}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  getB2BUserProfileView: ( callback ) => dispatch(getB2BUserProfileView(callback)),
  postB2BUserProfileUpdate: (reqBody, callback ) => dispatch(postB2BUserProfileUpdate(reqBody, callback)),
  PostB2BUserLogout: (callback) => dispatch(PostB2BUserLogout(callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(MyProfile);
