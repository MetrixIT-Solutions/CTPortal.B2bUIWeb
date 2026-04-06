/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import StepperCheckout from '../stepper/stepper';

const checkout_steps = [
  {
    name: "Initiation",
    Component: () => 
    <div>
        {/* Task List */}
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Initiate case</span>
                <small className="text-muted">Completed Dec 16, 2024</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> All beneficiary information provided</span>
                <small className="text-muted">Completed Dec 30, 2024</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> File LCA</span>
                <small className="text-muted">Completed Dec 30, 2024</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Documents uploaded</span>
                <small className="text-muted">Completed Dec 20, 2024</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Questionnaire received</span>
                <small className="text-muted">Completed Dec 20, 2024</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Questionnaire reviewed</span>
                <small className="text-muted">Completed Dec 26, 2024</small>
            </li>
        </ul>
    </div>
  },
  {
    name: "Drafting",
    Component: () => 
    <div>
        {/* Task List */}
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> LCA certified</span>
                <small className="text-muted">Completed Jan 23, 2025</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Prepare draft</span>
                <small className="text-muted">Completed Jan 23, 2025</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Review draft</span>
                <small className="text-muted">Completed Jan 23, 2025</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Send signature documents</span>
                <small className="text-muted">Completed Jan 23, 2025</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <span><i className="fa-regular fa-circle-check text-success"></i> Signature documents received</span>
                <small className="text-muted">Completed Jan 28, 2025</small>
            </li>
        </ul>
    </div>
  },
  {
    name: "Filing",
    Component: () => 
    <div>
      {/* Task List */}
      <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
              <span><i className="fa-regular fa-circle-check text-success"></i> File case with USCIS</span>
              <small className="text-muted">Completed Jan 29, 2025</small>
          </li>
      </ul>
    </div>
  },
  {
    name: "Decision",
    Component: () => 
    <div>
        {/* Task List */}
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span><i className="fa-regular fa-circle-check text-success"></i> Complete/send PAF</span>
              <small className="text-muted">Completed Jan 30, 2025</small>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span><i className="fa-regular fa-circle text-danger"></i> Receipt Notice received</span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span><i className="fa-regular fa-circle text-danger"></i> Approval received</span>
            </li>
        </ul>
    </div>
  }
]


const CasesTabComponent = () => {
  return (
    <div className='box'>
      <div className='box-header'>
        <h6>Cases</h6>
      </div>
      <div className='box-body'>
        <div className='cases-tab'>
          <Tabs
            defaultActiveKey="open"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="open" title={<span><i className="fa-solid fa-calendar-check"></i> Open</span>}>
              <StepperCheckout steps={checkout_steps} />
            </Tab>
            <Tab eventKey="closed" title={<span><i className="fas fa-plus" /> Closed</span>}>
              Closed
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default CasesTabComponent;
