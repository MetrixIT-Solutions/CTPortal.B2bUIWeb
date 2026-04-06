/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bs-stepper/dist/css/bs-stepper.min.css';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { initCaps } from '../../hooks/common';
import PersonalInfoComponent from './PersonalInfoComponent';
import WorkAuthorizationComponent from './WorkAuthorizationComponent';
import EducationDetailsComponent from './EducationDetailsComponent';
import ExperienceComponent from './ExperienceComponent';
import hashHistory from '../../hashHistory';
import ReviewComponent from './ReviewComponent';
import CommonDropdownComponent from '../common/CommonDropdownComponent';

const ConsultantCreateComponent = (props) => {
  const { errors, errMsg, adUserData, workData, eduData, thirdErrorIndex, expData, eduErrors, expErrors, empDetails, fourthErrorIndex, isShowEmpDetails, totalConsultData, currentStep, viewData, rolesObj, editBtn, submitBtn, sucMsg, crtfcData, crtfcErrors, isChecked, cmnType, cmnModal, cmnValue, cmnErrMsg, cmnSkillArr, cmnJbTitleArr, showSsn, userData } = props.state;
  const { stepperRef, fileInput, handleOnchange, handleCreateSkill, handleNext, handlePrevious, removeImage, handleAddField, handleDeleteField, handleExpchange, editorChange, handleYearChange, handleSubmit, handleFieldChange, reviewEditClick, handleCheckboxChange, setStateData, handleShowSsn } = props;
  // const heading = currentStep == 1 ? 'Personal Info' : currentStep == 2 ? 'Work Authorization' : currentStep == 3 ? 'Education' : currentStep == 4 ? 'Experience' : 'Consultant Profile has been submitted successfully';
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Complete Profile</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/consultants')}>Consultants</a></li>
                      <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/consultants/invitations')}>Invitations</a></li>
                      <li className='breadcrumb-item active' aria-current='page'>Create Consultant</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='box-header with-border'>
                    {/* <h4 className={`box-title ${currentStep == 5 ? 'text-success fw-bold' : ''}`}>{heading}</h4> */}
                   {currentStep != 5 ? <div className='d-flex'>
                      {viewData.refByName && <h5 className='mr-1'>Referred By: <span className='mr-1' style={{ color: '#673ab7' }}>{viewData.refByName}</span>|</h5>}
                      {viewData.cuName && <h5>Invited By: <span style={{ color: '#673ab7' }}>{viewData.cuName}</span></h5>}
                    </div> : sucMsg ? <div className='alert alert-success alert-dismissible'><h5 className={`${currentStep == 5}`}><i className="icon fa fa-check"></i>Consultant Profile has been submitted successfully</h5></div> :''}
                  </div>
                  {/* /.box-header */}
                  <div id='stepper1' className='bs-stepper' ref={stepperRef}>
                    <div className='bs-stepper-header'>
                      <div className='step' data-target='#test-l-1'>
                        <button className='step-trigger'>
                          <span className='bs-stepper-circle'>1</span>
                          <span className='bs-stepper-label'>Personal Info</span>
                        </button>
                      </div>
                      <div className='line'></div>
                      <div className='step' data-target='#test-l-2'>
                        <button className='step-trigger'>
                          <span className='bs-stepper-circle'>2</span>
                          <span className='bs-stepper-label'>Work Authorization</span>
                        </button>
                      </div>
                      <div className='line'></div>
                      <div className='step' data-target='#test-l-3'>
                        <button className='step-trigger'>
                          <span className='bs-stepper-circle'>3</span>
                          <span className='bs-stepper-label'>Education</span>
                        </button>
                      </div>
                      <div className='line'></div>
                      <div className='step' data-target='#test-l-4'>
                        <button className='step-trigger'>
                          <span className='bs-stepper-circle'>4</span>
                          <span className='bs-stepper-label'>Experience</span>
                        </button>
                      </div>
                      <div className='line'></div>
                      <div className='step' data-target='#test-l-5'>
                        <button className='step-trigger'>
                          <span className='bs-stepper-circle'>5</span>
                          <span className='bs-stepper-label'>Final Step</span>
                        </button>
                      </div>
                    </div>
                    <div className='bs-stepper-content'>
                      {/* <form onSubmit={this.onSubmit}> */}
                      <div id='test-l-1' className='content'>
                        <PersonalInfoComponent adUserData={adUserData} handleOnchange={handleOnchange} errors={errors} fileInput={fileInput} removeImage={removeImage}  />
                        {errMsg ? <div className='text-danger'>{errMsg}</div> : ''}
                        <button className='btn btn-primary' onClick={handleNext}>Save and Continue</button>
                      </div>
                      <div id='test-l-2' className='content'>
                        <WorkAuthorizationComponent workData={workData} handleOnchange={handleOnchange} errors={errors} />
                        <button className='btn btn-warning me-2' onClick={handlePrevious}>Previous</button>
                        <button className='btn btn-primary' onClick={handleNext}>Save and Continue</button>
                      </div>
                      <div id='test-l-3' className='content'>
                        <EducationDetailsComponent eduData={eduData} handleOnchange={handleOnchange} eduErrors={eduErrors} handleAddField={handleAddField} handleFieldChange={handleFieldChange} thirdErrorIndex={thirdErrorIndex} handleDeleteField={handleDeleteField} crtfcData={crtfcData} crtfcErrors={crtfcErrors} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange} />
                        <button className='btn btn-warning me-2' onClick={handlePrevious}>Previous</button>
                        <button className='btn btn-primary' onClick={handleNext}>Save and Continue</button>
                      </div>
                      <div id='test-l-4' className='content'>
                        <ExperienceComponent expData={expData} handleOnchange={handleOnchange} errors={errors} expErrors={expErrors} handleAddField={handleAddField}  handleFieldChange={handleFieldChange} fourthErrorIndex={fourthErrorIndex} handleDeleteField={handleDeleteField} handleExpchange={handleExpchange} editorChange={editorChange} empDetails={empDetails}  handleYearChange={handleYearChange} isShowEmpDetails={isShowEmpDetails} setStateData={setStateData} cmnSkillArr={cmnSkillArr} cmnJbTitleArr={cmnJbTitleArr}/>
                        <button className='btn btn-warning me-2 mt-2' onClick={handlePrevious}>Previous</button>
                        <button className='btn btn-primary mt-2' onClick={handleNext}>Save and Continue</button>
                      </div>
                      <div id='test-l-5' className='content'>
                        <ReviewComponent totalConsultData={totalConsultData} rolesObj={rolesObj} editBtn={editBtn} reviewEditClick={reviewEditClick} handleShowSsn={handleShowSsn} showSsn={showSsn} userData={userData}/>
                        <div className='d-flex justify-content-center'>
                        <button className='btn btn-warning me-2 mt-2' onClick={handlePrevious}>Previous</button>
                          {submitBtn ? <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>
                          :<button className='btn btn-danger me-2 mt-2' onClick={() => hashHistory.push('/consultants/invitations')}>Close</button>}
                        </div>
                      </div>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <CommonDropdownComponent
        title={`${cmnType === 'Skill' ? 'Skill' : 'Job Title'}`}
        show={cmnModal}
        name={cmnValue}
        errMsg={cmnErrMsg}
        onChange={(e) => setStateData({ cmnValue: initCaps(e.target.value), cmnErrMsg: '' })}
        onHide={() => setStateData({ cmnModal: false, cmnValue: '', cmnErrMsg:'' })}
        onClick={() => handleCreateSkill(cmnType === 'Skill' ? 'Skill' : 'Job Title')}
      />
      <FooterComponent />
    </div>
  )
}

export default ConsultantCreateComponent;
