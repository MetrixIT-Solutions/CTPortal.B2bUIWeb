/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import hashHistory from '../../hashHistory';
import {HeaderComponent} from '../../components/header';
import {NavComponent} from '../../components/navbar';
import {FooterComponent} from '../../components/footer';

import {DashboardComponent} from '../../components/dashboard';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }

  handleLogin = () => {
    hashHistory.push('/');
  }

  render() {
    return (
      <div className="wrapper">
          <HeaderComponent />
          <NavComponent />
          <DashboardComponent handleLogin={this.handleLogin} />
          <FooterComponent />
      </div>
    )
  }

}

export default HomePage;
