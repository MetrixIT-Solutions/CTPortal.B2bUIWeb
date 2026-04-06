/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import {HeaderComponent} from '../header';
import hashHistory from '../../hashHistory';

import background from '../../assets/images/bg-4.jpg';
import errImg from '../../assets/images/404.jpg';

const PageNotFound = () => {
  return (
    <div className='hold-transition theme-primary bg-img' style={{backgroundImage: `url(${background})`}}>
      <HeaderComponent />
      <section className='error-page h-p100'>
        <div className='container h-p100'>
          <div className='row h-p100 align-items-center justify-content-center text-center'>
            <div className='col-lg-12 col-md-10 col-12'>
              <div className='rounded30 p-50'>
                <img src={errImg} className='max-w-150 pb-4' alt='' />
                <h4>Page Not Found !</h4>
                <p>looks like, page doesn't exist</p>
                <div className='my-30'>
                  <button className='btn btn-danger' onClick={() => hashHistory.push('/home')}>
                    Back to dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className='main-footer pl-20' style={{marginLeft: 0}}>
        &copy; 2024 <a>CT Portal</a>. All Rights Reserved.
      </footer>
    </div>
  );
};

export default PageNotFound;
