/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getB2BOfrLtrStLfcLst } from '../../../actions/immigration/OfferLetterActions';
import OfferLetterLfcListComponent  from '../../../components/immigration/offer-letters/OfferLetterLfcListComponent';

class OfferLetterLfCylList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lfcModal: false,
      ofrLtrData: {},
      ofrLtrLfcList: [],
      disable: false,
    }
  }

  setStateData = (data) => this.setState({ ...data });

  handleClose = () => {
    this.setState({ lfcModal: false, ofrLtrData: {}, disable: false });
    this.props.setStateData({ ofrLtrData: {}, ofrLtrLfcModal: false });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ofrLtrLfcModal !== this.props.ofrLtrLfcModal && this.props.ofrLtrLfcModal) {
      this.ofrLtrLfcListData(this.props.ofrLtrData);
    }
  }
  ofrLtrLfcListData = (ofrLtrData) => {
    const recordId = ofrLtrData._id;
    this.props.getB2BOfrLtrStLfcLst(recordId, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        this.setState({ lfcModal: true, ofrLtrLfcList: data, ofrLtrData });
      } else {
        this.setState({ lfcModal: true, ofrLtrLfcList: [], ofrLtrData});
      }
    });
  }

  render() {
    return (
      <OfferLetterLfcListComponent
        state={this.state}
        setStateData={this.setStateData}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  getB2BOfrLtrStLfcLst: (recordId, callback) => dispatch(getB2BOfrLtrStLfcLst(recordId, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(OfferLetterLfCylList);
