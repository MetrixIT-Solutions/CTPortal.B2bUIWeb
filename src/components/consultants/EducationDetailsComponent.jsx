/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
import React from 'react';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EducationDetailsComponent = (props) => {
  const { handleAddField, handleDeleteField, eduData, eduErrors, thirdErrorIndex, handleFieldChange, crtfcData, crtfcErrors, isChecked, handleCheckboxChange } = props;
  const check = crtfcData && crtfcData.length > 0 && crtfcData[0].cName && crtfcData[0].cSpec && crtfcData[0].cBy ? true : false;
  return (
    <div>
    <div><h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Education Details:</h5>
      <hr className='my-15' />
      {eduData && eduData.length > 0 && eduData.map((field, index, arr) => {
        return (
          <div className='row' key={index}>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Degree</label><span className='text-danger'>*</span>
                {field.isDropdown == true ?
                  (<select className='form-select form-control' id='degree' name='degree' value={field.degree} onChange={(e) => handleFieldChange(index, 'degree', e, 'eduData')}>
                    <option value=''>Select</option>
                    <option value='Doctoral'>Doctoral</option>
                    <option value='Masters'>Masters</option>
                    <option value='Bachelors'>Bachelors</option>
                    <option value='Other'>Other</option>
                  </select>) : <input type='text' className='form-control' placeholder='Degree' value={field.degree} onChange={(e) => handleFieldChange(index, 'degree', e, 'eduData')} disabled />}
                {thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].degree && <div className='text-danger'>{thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].degree}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Specialization </label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Specialization' name='specialization' value={field.specialization} onChange={(e) => handleFieldChange(index, 'specialization', e, 'eduData')} />
                {thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].specialization && <div className='text-danger'>{thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].specialization}</div>}
              </div>
            </div>
            <div className='col-md-2'>
              <div className='form-group'>
                <label>Graduation Date</label><span className='text-danger'>*</span>
                <DatePicker className='form-control' selected={field.passoutYear ? field.passoutYear : null} placeholderText="MM/YYYY" dateFormat="MM/yyyy" showMonthYearPicker onChange={(date) => handleFieldChange(index, 'passoutYear', date, 'eduData')} />
                {thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].passoutYear && <div className='text-danger'>{thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].passoutYear}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Name of the Institution</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Ex: Boston University' name='institution' value={field.institution} onChange={(e) => handleFieldChange(index, 'institution', e, 'eduData')} />
                {thirdErrorIndex == index && eduErrors.length > 0 && eduErrors[index].institution && <div className='text-danger'>{eduErrors.length > 0 && eduErrors[index].institution}</div>}
              </div>
            </div>
            {index == arr.length - 1 && <div className='col-md-1'>
              <div className='d-flex'>
                <div><button type='button' className='waves-effect waves-light btn btn-danger me-2' style={{ marginTop: 30 }} onClick={() => handleAddField('eduData')}><i className='fa-solid fa-plus'></i> Add </button></div>
                {index !== 0 && <a onClick={() => handleDeleteField(index, field.id, 'eduData')} className='d-flex justify-content-center' style={{ marginTop: 30 }}><i className="fa-solid fa-trash text-danger d-flex align-items-center" style={{ fontSize: 25, cursor: 'pointer' }}></i></a>}
              </div>
            </div>}
          </div>
        )
      })}
    </div>
      {/* certificates */}
      <div className='row mb-3 mt-3'>
        <div className='form-check'>
          <input className='form-check-input' type='checkbox' value='certificateChecked' id='certificateChecked' checked={isChecked ? isChecked : check ? true : false} disabled={check ? true : false} onChange={handleCheckboxChange} />
          <label className='form-check-label' for='certificateChecked'>Do you have Certification ?</label>
        </div>
      </div>
      {(check || isChecked) && (
        <div>
          <h5 className='box-title text-info'>
            <i className='fa-solid fa-award'></i> Certification Details:{' '}
          </h5>
          <hr className='my-15' />
          {crtfcData &&
            crtfcData.length > 0 &&
            crtfcData.map((field, i, arr) => {
              return (
                <div className='row' key={i}>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Name</label>
                      <span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='Name' name='cName' value={field.cName} onChange={(e) => handleFieldChange(i, 'cName', e, 'crtfcData')} />
                      {thirdErrorIndex == i && crtfcErrors.length > 0 && crtfcErrors[i].cName && <div className='text-danger'>{thirdErrorIndex == i && crtfcErrors.length > 0 && crtfcErrors[i].cName}</div>}
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Specialization</label>
                      <span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='Specialization' name='cSpec' value={field.cSpec} onChange={(e) => handleFieldChange(i, 'cSpec', e, 'crtfcData')} />
                      {thirdErrorIndex == i && crtfcErrors.length > 0 && crtfcErrors[i].cSpec && <div className='text-danger'>{thirdErrorIndex == i && crtfcErrors.length > 0 && crtfcErrors[i].cSpec}</div>}
                    </div>
                  </div>
                  <div className='col-md-2'>
                    <div className='form-group'>
                      <label>Certificate Received Date</label>
                      <DatePicker className='form-control' selected={field.cDt ? field.cDt : null} placeholderText='MM/YYYY' dateFormat='MM/yyyy' showMonthYearPicker onChange={(date) => handleFieldChange(i, 'cDt', date, 'crtfcData')} />
                    </div>
                  </div>
                  <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Certified By</label>
                      <span className='text-danger'>*</span>
                      <input type='text' className='form-control' placeholder='Institution/Organization Name' name='cBy' value={field.cBy} onChange={(e) => handleFieldChange(i, 'cBy', e, 'crtfcData')} />
                      {thirdErrorIndex == i && crtfcErrors.length > 0 && crtfcErrors[i].cBy && <div className='text-danger'>{crtfcErrors.length > 0 && crtfcErrors[i].cBy}</div>}
                    </div>
                  </div>
                  {i == arr.length - 1 && (
                    <div className='col-md-1'>
                      <div className='d-flex'>
                        <div>
                          <button type='button' className='waves-effect waves-light btn btn-primary me-3' style={{ marginTop: 22 }} onClick={() => handleAddField('crtfcData')}>
                            <i className='fa-solid fa-plus'></i> Add{' '}
                          </button>
                        </div>
                        {check && (
                          <a onClick={() => handleDeleteField(i, field.id, 'crtfcData')} className='d-flex justify-content-center' style={{ marginTop: 22 }}>
                            <i className='fa-solid fa-trash text-danger d-flex align-items-center' style={{ fontSize: 25, cursor: 'pointer' }}></i>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default EducationDetailsComponent