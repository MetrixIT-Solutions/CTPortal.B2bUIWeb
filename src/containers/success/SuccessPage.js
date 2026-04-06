/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import hashHistory from '../../hashHistory';

class SuccessPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card text-center shadow" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title">Success</h5>
            <p className="card-text">Your registration has been completed successfully.</p>
            <p className="card-text">Your will get approval mail shortly.</p>
            <p className="card-text">Thank you.</p>
            <button className="btn btn-primary" onClick={() => hashHistory.push('/')}> OK </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessPage;