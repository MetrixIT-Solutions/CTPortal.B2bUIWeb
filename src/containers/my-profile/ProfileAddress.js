/**
 * Copyright (C) Skill Works IT - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Skill Works IT <contact@skillworksit.com>, Jan 2023
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import ProfileAddressComponent from '../../components/my-profile/ProfileAddressComponent';
import { getB2BUserProfileView, postB2BUserProfileAdrsUpdate } from '../../actions/profile/ProfileActions';
import Countries from '../../../public/data/Countries.json';
import CountryStates from '../../../public/data/CountryStates.json';
import { PostB2BUserLogout } from '../../actions/login/LoginActions';
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';

class ProfileAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: {},
      statesList: [],
      initialData: {},
      hNum: '',
      area: '',
      zip: '',
      city: '',
      state: '',
      sCode: '',
      country: '',
      cCode: '',
      errorMsg: '',
      successMessage: '',
    }
  }

  componentDidMount = () => {
    this.getB2BProfileView();
  }

  getB2BProfileView = () => {
    this.props.getB2BUserProfileView( async resObj => {
      if(resObj.status == '200') {
        const initialData = this.setData(resObj.resData.result);
        this.setState({profileData: resObj.resData.result, ...initialData });
      } else {
        this.setState({profileData: this.props.LoginReducer.userObj});
      }
    });
  }

  setData = (data) => {
    const statesList = data.cCode ? CountryStates[data.cCode] : CountryStates['IND'];
    const initialData =  {
      hNum: data.hNum,
      area: data.area,
      zip: data.zip,
      city: data.city,
      state: data.state,
      sCode: data.sCode,
      country: data.country,
      cCode: data.cCode,
    };

    return {...initialData, statesList, initialData};
  }

  setStateData = (data) => this.setState({ ...data });

  editProfileAddress = async (event) => {
    event.preventDefault();
    const { hNum, area, zip, city, state, sCode, country, cCode, initialData } = this.state;
    if (!hNum) {
      this.setState({ errorMsg: 'Address is required' });
    } else if (!area) { 
      this.setState({ errorMsg: 'Street / Area is required' });
    } else if (!city) {
      this.setState({ errorMsg: 'City is required' });
    } else if ((!country)) {
      this.setState({ errorMsg: 'Country is required' });
    } else if ((!sCode)) {
      this.setState({ errorMsg: 'State is required' });
    } else if (!zip) {
      this.setState({ errorMsg: 'Zip Code is required' });
    } else {
      const reqBody = {
        hNum, area, zip, city,  
        state, sCode, country, cCode,
      };

      if (JSON.stringify(initialData) == JSON.stringify(reqBody)) {
        this.setState({ errorMsg: 'There are no changes', successMessage: '' });
      } else {
        this.props.postB2BUserProfileAdrsUpdate(reqBody, async (resObj) => {
          if (resObj.status == '200') {
            await localForage.setItem('userInfo', resObj.resData.result);
            const newInitialData = this.setData(resObj.resData.result);
            this.setState({profileData: resObj.resData.result, ...newInitialData, successMessage: 'Address updated successfully' });
          } else {
            this.setState({ errorMsg: 'Address Edit Failed' });
          }
        });
      }
    }
  }

  handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const countryData = countryCode ? Countries.find(data => data.code == countryCode) : {};
    if(countryCode){
      const statesList =  CountryStates ? CountryStates[countryCode]: [];
      this.setState({statesList, country: countryData.value, cCode: countryCode, sCode: '', state: '', errorMsg: ''});
    } else {
      this.setState({statesList: [], country: '', cCode: '', sCode: '', state: ''});
    }
  }

  handleStateChange = (event) => {
    const stateCode = event.target.value;
    if (stateCode) {
      const stateData = this.state.statesList.find(data => data.stateCode == stateCode);
      this.setState({ sCode: stateCode, state: stateData.label, errorMsg: '' });
    } else {
      this.setState({ sCode: '', state: '' });
    }
  }

  handleLogout = async () => {
    this.props.PostB2BUserLogout(resObj => {})
    hashHistory.push('/login');
    await localForage.clearItems()
  }

  render() {
    return (
      <div>
        <ProfileAddressComponent 
          state={this.state} 
          setStateData={this.setStateData}
          editProfileAddress={this.editProfileAddress}
          handleCountryChange = {this.handleCountryChange}
          handleStateChange = {this.handleStateChange}
          handleLogout={this.handleLogout}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ LoginReducer: state.LoginReducer });
const mapDistachToProps = (dispatch) => ({
  getB2BUserProfileView: ( callback ) => dispatch(getB2BUserProfileView(callback)),
  postB2BUserProfileAdrsUpdate: (reqBody, callback) => dispatch(postB2BUserProfileAdrsUpdate(reqBody, callback)),
  PostB2BUserLogout: (callback) => dispatch(PostB2BUserLogout(callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(ProfileAddress);
