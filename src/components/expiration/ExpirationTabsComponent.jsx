/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import {HeaderComponent} from '../header';
import {ExpirationList} from '../../containers/expiration';
import NavComponent from '../navbar/NavComponent';

const tabsArr = ['Work Auth', 'SSN'];

const ExpirationTabsComponent = (props) => {
  const {actTab} = props.state;
  const {handleSelectTab, getExpirationData} = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Expirations List</h3>
              </div>
            </div>
          </div>
          <div className='content'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='box'>
                  <div className='box-body'>
                    <Tabs activeKey={actTab} onSelect={handleSelectTab} >
                      <Tab eventKey='0' title={tabsArr[0]}>
                        <ExpirationList state={props.state} actvTab={tabsArr[actTab]} getExpirationData={getExpirationData} />
                      </Tab>
                      <Tab eventKey='1' title={tabsArr[1]}>
                        <ExpirationList state={props.state} actvTab={tabsArr[actTab]} getExpirationData={getExpirationData} />
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpirationTabsComponent;
