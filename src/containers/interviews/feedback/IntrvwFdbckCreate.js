/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { IntrvwFdbckFormComponent } from '../../../components/interviews/feedback';
import { postB2BIntrvwFdBkCreate } from '../../../actions/interviews/InterviewFeedbackActions';

class IntrvwFdbckCreate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      intrvwData: props.intrvwData || {},
      qus: '', ifNotes: '',
      intrwTyEmail: '', intrwdBy: '', intrwStatus: '', intrwNotes: '',
      testNotify: '', testScore: '', testStatus: '', testNotes: '',
      errMsg: '', disable: false,
    };
  }
  setStateData = (data) => this.setState({ ...data });

  handleFdbkCreate = (event) => {
    event.preventDefault();
    const { qus, intrwStatus, ifNotes, intrwTyEmail, intrwNotes, intrwdBy, testNotify, testStatus, testNotes, intrvwData } = this.state;
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
      this.setState({disabled: true});
      const scrObj = this.setScreeningObj();
      const reqBody = {
        b2b: intrvwData.b2b, b2bCode: intrvwData.b2bCode, b2bName: intrvwData.b2bName,
        intrw: intrvwData._id, intrwId: intrvwData.intrwId,
        euUser: intrvwData.euUser, euName: intrvwData.euName,
        submission: intrvwData.submission, subId: intrvwData.subId,
        process: intrvwData.process, duration: intrvwData.duration,
        canName: intrvwData.canName, canPhNum: intrvwData.canPhNum,
        jobTitle: intrvwData.jobTitle, jobId: intrvwData.jobId, jobDesc: intrvwData.jobDesc,
        skills: intrvwData.skills, ifPath: intrvwData.ifPath,
        panelMembers: intrvwData.panelMembers,
        testCompany: intrvwData.testCompany,
        qus, ifNotes,
        ...scrObj,
      };
      this.props.postB2BIntrvwFdBkCreate(reqBody, (resObj) => {
        this.setState({disabled: false});
        if (resObj.status == '200') {
          this.props.getIntrvwFdbkListData(intrvwData);
          this.props.handleBackToList({action: 'List'});
        } else {
          this.setState({ errMsg: 'Interview Feedback Creation Failed' });
        }
      });
    }
  }
  setScreeningObj = () => {
    const { intrwStatus, intrwTyEmail, intrwdBy, intrwNotes, testNotify, testScore, testStatus, testNotes, intrvwData } = this.state;
    if(intrvwData.process === 'Video Interview'  || intrvwData.process === 'Audio Interview' || intrvwData.process === 'Face to Face') {
      return {
        intrwStatus: intrwStatus,
        intrwTyEmail: intrwTyEmail == 'true' ? true : false,
        intrwNotes: intrwNotes,
        intrwdBy: intrwdBy,
      }
    } else {
      return {
        testScore: testScore,
        testStatus: testStatus,
        testNotify: testNotify == 'true' ? true : false,
        testNotes: testNotes,
      }
    }
  }

  render() {
    return <IntrvwFdbckFormComponent state={this.state} setStateData={this.setStateData} handleFdbkSubmit={this.handleFdbkCreate} />
  }
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BIntrvwFdBkCreate: (body, callback) => dispatch(postB2BIntrvwFdBkCreate(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(IntrvwFdbckCreate);