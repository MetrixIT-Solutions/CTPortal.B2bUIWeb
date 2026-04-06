/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import data from '../../../public/data/Lookups.json';
import Countries from '../../../public/data/Countries.json';
import { getTomorrowDate, getYesterdayDate } from '../../hooks/common';

const years = data.years;
const months = data.months;

const ExperienceComponent = (props) => {
  const { expYrs, expMonths, skills, jobTitle, skillOptions, summary, insurence } = props.expData;
  const { handleExpchange, handleYearChange, handleOnchange, editorChange, empDetails, handleAddField, expErrors, errors, fourthErrorIndex, handleDeleteField, isShowEmpDetails, handleFieldChange, setStateData, cmnSkillArr, cmnJbTitleArr } = props;
  return (
    <div><h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Total Experience:</h5>
      <hr className='my-15' />
      <div className='row' >
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Years</label><span className='text-danger'>*</span>
            <Select
              options={years}
              value={expYrs}
              onChange={(data) => handleYearChange('expYrs', data)} />
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Months</label><span className='text-danger'>*</span>
            <Select
              defaultValue={months[1]}
              options={months}
              value={expMonths}
              onChange={(data) => handleYearChange('expMonths', data)} />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='form-group'>
            <label>Job Title </label>{(expMonths.value != 0 || expYrs.value != 0) && <span className='text-danger'>*</span>}
            {/* <input type='text' className={`form-control ${errors.jobTitle && errors.jobTitle ? 'border border-danger' : ''}`} placeholder='Job Title' name='jobTitle' value={jobTitle} onChange={handleOnchange} /> */}
            <div className='d-flex justify-content-between'>
            <CreatableSelect
              isClearable={() => handleYearChange('jobTitle', {label: '', value: ''})}
              value={jobTitle}
              options={cmnJbTitleArr}
              className={`${(errors.skill && (expMonths.value != 0 || expYrs.value != 0)) ? 'border border-danger w-100' : 'w-100'}`}
              onChange={(data) => handleYearChange('jobTitle', data)}/>
            <button onClick={() => setStateData({ cmnModal: true, cmnType: 'Job Title' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
          </div>
            {errors.jobTitle && <div className='text-danger'>{errors.jobTitle}</div>}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group '>
            <label>Primary Skills </label><span className='text-danger'>*</span>
            <div className='d-flex justify-content-between'>
            <CreatableSelect
              isMulti
              value={skills}
              // options={skillOptions}
              options={cmnSkillArr}
              className={`${errors.skill ? 'border border-danger w-100' : 'w-100'}`}
              onChange={(data) => handleYearChange('skills', data)}
            />
            <button onClick={() => setStateData({ cmnModal: true, cmnType: 'Skill' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
          </div>
            {errors.skill && <div className='text-danger'>{errors.skill}</div>}
          </div>
        </div>
      </div>
      {/* <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <label>Professional Summary</label>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              style={{ height: 400 }}
              editorStyle={{ height: 250, borderBlockStyle: 'solid', borderWidth: 1 }}
              onEditorStateChange={(data) => editorChange('summary', data)}
              editorState={summary}
            />
          </div>
        </div>
      </div> */}
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-group'>
            <label>Professional Summary</label><span className='text-danger'>*</span>
            <textarea id='summary1' rows='4' className={`${errors.summary ? 'form-control border border-danger' : 'form-control'}`} name='summary' value={summary} onChange={handleOnchange}></textarea>
            {errors.summary && <div className='text-danger'>{errors.summary}</div>}
          </div>
        </div>
      </div>
      {isShowEmpDetails ? <div className='bg-sec'>
        {empDetails && empDetails.length > 0 ? empDetails.map((item, index) => {            
          return (
            <div key={index}>
              <div className='row mt-4' style={{ background: '#f2f3f5' }}>
                <div className='col-md-3 mt-3'>
                  {/* <div className='form-group'>
                    <label><input type="radio" id={`presentEmployer-${index}`} name='presentEmployer' checked={item.presentEmployer} onChange={(e) => handleFieldChange(index, 'presentEmployer', e, 'empDetails')} />Present Employer</label>
                  </div> */}
                  <div className="demo-radio-button">
                    <input name="presentEmployer" type="radio" id={`presentEmployer-${index}`} value='Yes' className="with-gap radio-col-primary" checked={item.presentEmployer} onClick={(e) => handleFieldChange(index, 'presentEmployer', e, 'empDetails')} />
                    <label for={`presentEmployer-${index}`}>Present Employer</label>
                  </div>
                </div>
              </div>
              <div className='row' style={{ background: '#f2f3f5' }}>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Employment Type</label><span className='text-danger'>*</span>
                    <select className={`form-select form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].empType ? 'border border-danger' : ''}`} name='empType' value={item.empType} onChange={(e) => handleFieldChange(index, 'empType', e, 'empDetails')} >
                      <option value=''>Select</option>
                      <option value='Full Time'>Full Time</option>
                      <option value='Contract'>Contract</option>
                    </select>
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].empType && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].empType}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Employer</label><span className='text-danger'>*</span>
                    <input type='text' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].company ? 'border border-danger' : ''}`} placeholder='Employer' name='company' value={item.company} onChange={(e) => handleFieldChange(index, 'company', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].company && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].company}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Client</label>{item.empType == 'Contract' && <span className='text-danger'>*</span>}
                    <input type='text' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].endClient ? 'border border-danger' : ''}`} placeholder='Client' name='endClient' value={item.endClient} onChange={(e) => handleFieldChange(index, 'endClient', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].endClient && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].endClient}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Country</label><span className='text-danger'>*</span>
                    <Select
                      options={Countries}
                      value={item.expCcode}
                      onChange={(data) => handleExpchange('expCcode', data, index)} />
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>State</label><span className='text-danger'>*</span>
                    <Select
                      className={`${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expStCode ? 'border border-danger' : ''}`}
                      defaultValue={{ label: 'Select', value: '' }}
                      options={item.expStateArr || [{ label: 'Select', value: '' }]}
                      value={item.expStCode || [{ label: 'Select', value: '' }]}
                      onChange={(data) => handleExpchange('expStCode', data, index)} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expStCode && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].expStCode}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>City</label>{item.expStCode?.value ? <span className='text-danger'>*</span> : ''}
                    <input type='text' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expLoc ? 'border border-danger' : ''}`} placeholder='City' name='expLoc' value={item.expLoc} onChange={(e) => handleFieldChange(index, 'expLoc', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expLoc && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].expLoc}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Designation</label><span className='text-danger'>*</span>
                    <input type='text' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].designation ? 'border border-danger' : ''}`} placeholder='Designation' name='designation' value={item.designation} onChange={(e) => handleFieldChange(index, 'designation', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].designation && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].designation}</div>}
                  </div>
                </div>
                <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>Start Date</label><span className='text-danger'>*</span>
                    <input type='date' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expStartDate ? 'border border-danger' : ''}`} placeholder='Start Date' name='expStartDate' max={getYesterdayDate()} value={item.expStartDate} onChange={(e) => handleFieldChange(index, 'expStartDate', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expStartDate && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].expStartDate}</div>}
                  </div>
                </div>
                {(item.presentEmployer == true) ? '' : <div className='col-md-3 mt-3'>
                  <div className='form-group'>
                    <label>End Date</label><span className='text-danger'>*</span>
                    <input type='date' className='form-control' placeholder='End Date' name='expEndDate' value={item.expEndDate} onChange={(e) => handleFieldChange(index, 'expEndDate', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].expEndDate && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].expEndDate}</div>}
                  </div>
                </div>}
              </div>
              <div className='row'>
                <div className='col-md-12 mt-3'>
                  <div className='form-group'>
                    <label>Roles and Responsibilities</label><span className='text-danger'>*</span>
                    <textarea type='text' rows='4' className={`form-control ${fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].rolesRes ? 'border border-danger' : ''}`} placeholder='Roles and Responsibilities' name='rolesRes' value={item.rolesRes} onChange={(e) => handleFieldChange(index, 'rolesRes', e, 'empDetails')} />
                    {fourthErrorIndex == index && expErrors.length > 0 && expErrors[index].rolesRes && <div className='text-danger'>{expErrors.length > 0 && expErrors[index].rolesRes}</div>}
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group '>
                    <label>Skills </label>
                    <div className='d-flex justify-content-between'>
                    <Select
                      isMulti
                      value={item.pSkills}
                      // options={item.pSkills}
                      options={cmnSkillArr}
                      className={`${errors.pSkill ? 'border border-danger w-100' : 'w-100'}`}
                      onChange={(data) => handleYearChange('pSkills', data, index)}
                      // onCreateOption={(inputValue) => handleCreateSkill(inputValue, index)} 
                      />
                      <button onClick={() => setStateData({ cmnModal: true, cmnType: 'Skill' })} className='btn btn-success btn-plus ml-2'><i className='fa fa-plus'></i></button>
                    </div>
                    {errors.pSkill && <div className='text-danger'>{errors.pSkill}</div>}
                  </div>
                </div>
              </div>
              <div className='row' style={{ background: '#f2f3f5' }}>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <label>Description</label>
                    {/* <Editor
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      style={{ height: 400 }}
                      editorStyle={{ height: 250 }}
                      onEditorStateChange={(editorState) => editorChange('description', editorState, index)}
                      editorState={item.description}
                    /> */}
                    <textarea id='description' rows='4' className='form-control' name='description' value={item.description} onChange={(e) => handleFieldChange(index, 'description', e, 'empDetails')}></textarea>
                  </div>
                </div>
              </div>
              {index > 0 && <div className='row'>
                <a onClick={() => handleDeleteField(index, item.id, 'empDetails')}><i className="fa-solid fa-trash text-danger" style={{ fontSize: 25, cursor: 'pointer' }}></i></a>
              </div>}
            </div>
          )
        }):''
        }
      </div> : ''}
      {isShowEmpDetails ? <button className='btn btn-primary mt-2' onClick={() => handleAddField('empDetails')}>+ Add More</button> : ''}
      <div className='row mt-3'>
        <div className='col-md-4'>
          <div className='form-group'>
            <label>Do you need health Insurance through our company?</label>
            <div className="demo-radio-button">
              <input name="insurence" type="radio" id="radio_40" value={true} className="with-gap radio-col-primary" checked={insurence == 'true'} onChange={handleOnchange} />
              <label for="radio_40">Yes</label>
              <input name="insurence" type="radio" id="radio_42" value={false} className="with-gap radio-col-success" checked={insurence == 'false'} onChange={handleOnchange} />
              <label for="radio_42">No</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceComponent;