/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { HeaderComponent } from '../header';
import hashHistory from '../../hashHistory';

import noInternet from '../../../src/assets/images/no-internet.png';
import background from '../../../src/assets/images/bg-5.jpg';

const NoInternetComponent = () => {
  return (
    <div className="hold-transition theme-primary bg-img"  style={{backgroundImage: `url(${background})`}}>
      <HeaderComponent />
      <section className="error-page h-p100">
        <div className="container h-p100">
          <div className="row h-p100 align-items-center justify-content-center text-center">
            <div className="col-lg-12 col-md-10 col-12">
              <div className="rounded30 p-50">
                <img src={noInternet} className="max-w-150" alt="" />
                <h4>No internet connection found </h4>
                <p>Check your connection or try again</p>
                <div className="my-30"><a className="btn btn-info" onClick={() => hashHistory.push('/home')}>Try Again</a></div>
                </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="main-footer" style={{marginLeft: 0}}>
        &copy; 2024 <a>CT Portal</a>. All Rights Reserved.
      </footer>
    </div>
  )
}

export default NoInternetComponent;