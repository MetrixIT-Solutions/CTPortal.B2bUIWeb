/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { IntrvwFdbckFormComponent } from '../../../components/interviews/feedback';
import { putB2BIntrvwFdBkUpdate } from '../../../actions/interviews/InterviewFeedbackActions';

class IntrvwFdbckEdit extends PureComponent {
  constructor(props) {
    super(props);
    const fdbkData = props?.fdbkData?._id ? props.fdbkData : {};
    const intrvwData = props?.intrvwData?._id ? props.intrvwData : {};
    const isData = this.setInitialStateData(fdbkData, intrvwData);

    this.state = {
      intrvwData, fdbkData,
      qus: fdbkData?.qus || '', ifNotes: fdbkData?.ifNotes || '',
      ...isData.intrvwFdbkObj, ...isData.testFdbkObj,
      intrwTyEmail: isData.intrwTyEmail, testNotify: isData.testNotify,
      oldifData: {
        qus: fdbkData?.qus || '', ifNotes: fdbkData?.ifNotes || '',
        ...isData.intrvwFdbkObj, ...isData.testFdbkObj,
      },
      errMsg: '', disable: false,
      };
  }

  setInitialStateData = (fdbkData, intrvwData) => {
    let intrwTyEmail = '', testNotify = '', intrvwFdbkObj = {}, testFdbkObj = {};

    if(intrvwData?._id) {
      if(intrvwData.process === 'Video Interview'  || intrvwData.process === 'Audio Interview' || intrvwData.process === 'Face to Face') {
        intrvwFdbkObj = fdbkData?._id && {
          intrwTyEmail: fdbkData.intrwTyEmail, intrwdBy: fdbkData.intrwdBy,
          intrwStatus: fdbkData.intrwStatus, intrwNotes: fdbkData.intrwNotes
        }
        intrwTyEmail = fdbkData.intrwTyEmail ? fdbkData.intrwTyEmail + '' : 'false';
      } else {
        testFdbkObj = fdbkData?._id && {
          testNotify: fdbkData.testNotify, testScore: fdbkData.testScore,
          testStatus: fdbkData.testStatus, testNotes: fdbkData.testNotes
        }
        testNotify = fdbkData.testNotify ? fdbkData.testNotify + '' : 'false';
      }
    }

    return {intrwTyEmail, testNotify, intrvwFdbkObj, testFdbkObj};
  }
  setStateData = (data) => this.setState({ ...data });

  handleFdbkUpdate = (event) => {
    event.preventDefault();
    const { qus, intrwStatus, ifNotes, intrwTyEmail, intrwNotes, intrwdBy, testNotify, testStatus, testNotes, intrvwData, fdbkData, oldifData } = this.state;
    const isIntrvw = (intrvwData.process === 'Video Interview'  || intrvwData.process === 'Audio Interview' || intrvwData.process === 'Face to Face');
    if(!qus) {
      this.setState({ errMsg: 'Questions Asked is required' });
    } else if(!ifNotes) {
      this.setState({ errMsg: 'Feedback is required' });
    } else if(isIntrvw && !intrwTyEmail) {
      this.setState({ errMsg: 'Select Yes or No for, Sent Thank you Email to Interviewer?' });
    } else if(isIntrvw && !intrwdBy) {
      this.setState({ errMsg: 'Interviewer Names is required' });
    }  else if(isIntrvw && (intrwStatus === 'Rejected' || intrwStatus === 'On Hold') && !intrwNotes){
      this.setState({ errMsg: 'Interview Notes is required' });
    } else if(!isIntrvw && !testNotify) {
      this.setState({ errMsg: 'Select Yes or No for, Informed Test being Completed?' });
    } else if(!isIntrvw && testStatus === 'Failed' && !testNotes) {
      this.setState({ errMsg: 'Test Notes is required' });
    } else {
      const scrObj = this.setScreeningObj();
      const reqBody = {
        qus, ifNotes: ifNotes,
        ...scrObj,
      };

      if(JSON.stringify(oldifData) != JSON.stringify(reqBody)) {
        this.setState({disabled: true});
        this.props.putB2BIntrvwFdBkUpdate(fdbkData?._id, {...reqBody, intrw: intrvwData._id, oldIfNotes: oldifData.ifNotes}, (resObj) => {
          this.setState({disabled: false});
          if (resObj.status == '200') {
            this.props.getIntrvwFdbkListData(intrvwData);
            this.props.handleBackToList({action: 'List'});
          } else {
            this.setState({ errMsg: 'Interview Feedback Creation Failed' });
          }
        });
      } else this.setState({ errMsg: 'There are no changes in the Interview Feedback' });
    }
  }
  setScreeningObj = () => {
    const { intrwStatus, intrwTyEmail, intrwdBy, intrwNotes, testNotify, testScore, testStatus, testNotes, intrvwData } = this.state;
    if(intrvwData.process === 'Video Interview'  || intrvwData.process === 'Audio Interview' || intrvwData.process === 'Face to Face') {
      return {
        intrwTyEmail: intrwTyEmail == 'true', intrwdBy,
        intrwStatus, intrwNotes
      };
    } else {
      return {
        testNotify: testNotify == 'true', testScore,
        testStatus, testNotes
      };
    }
  }

  render() {
    return <IntrvwFdbckFormComponent state={this.state} setStateData={this.setStateData} handleFdbkSubmit={this.handleFdbkUpdate} />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  putB2BIntrvwFdBkUpdate: (recordId, body, callback) => dispatch(putB2BIntrvwFdBkUpdate(recordId, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(IntrvwFdbckEdit);
