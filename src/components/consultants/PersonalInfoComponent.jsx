/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';

import Countries from '../../../public/data/Countries.json';
import { getTomorrowDate, getYesterdayDate, numebersOnly } from '../../hooks/common';

const PersonalInfoComponent = (props) => {
  const { fName, lName, email, altEmail, dob, mobCc, mobNum, altMobCc, altMobNum, emrPerson, emrRel, emrMobCc, emrMobNum, emrEmail, linkdInUrl, ssnNum, ssnExpDate, isCheck, file, imgUrl, gender, mrgStatus, aCountryCode, aStatesArr, aStateCode, aAddress, aArea, aCity, aZip, iconPath, userData, nationalId, dlNum, stateIdNum, otherNationalId, idNum, adrsCheck, cCode, statesArr, stCode, adrs, area, city, pincode, nationalIdIsdDate, nationalIdExpDate } = props.adUserData;
  const { errors, handleOnchange } = props;
  const maxDate = moment().subtract(18, 'years').format('YYYY-MM-DD');

  return (
    <div>
      <div className='row'>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>First Name</label><span className='text-danger'> *</span>
            <input type='text' className='form-control' placeholder='First Name' name='fName' value={fName} onChange={handleOnchange} />
            {errors.fName && <div className='text-danger'>{errors.fName}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Last Name</label><span className='text-danger'> *</span>
            <input type='text' className='form-control' placeholder='Last Name' name='lName' value={lName} onChange={handleOnchange} />
            {errors.lName && <div className='text-danger'>{errors.lName}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Email</label><span className='text-danger'> *</span>
            <input type='text' className='form-control' placeholder='Email' name='email' value={email} onChange={handleOnchange} disabled={email ? true : false}/>
            {errors.email && <div className='text-danger'>{errors.email}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Mobile Number</label><span className='text-danger'>*</span>
            <div className='d-flex'>
              <select className="form-select form-control" name='mobCc' value={mobCc} onChange={handleOnchange} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                <option value='+1'>+1</option>
                <option value='+91'>+91</option>
              </select>
              <input type='text' className='form-control' placeholder='Mobile Number' name='mobNum' maxLength={10} onKeyPress={numebersOnly} value={mobNum} onChange={handleOnchange}/>
            </div>
            {errors.mobNum && <div className='text-danger'>{errors.mobNum}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>DOB</label><span className='text-danger'> *</span>
            <input type='date' className='form-control' placeholder='DOB' name='dob' max={maxDate} value={dob} onChange={handleOnchange} />
            {errors.dob && <div className='text-danger'>{errors.dob}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Gender</label><span className='text-danger'>*</span>
             <div className="demo-radio-button">
                <input name="gender" type="radio" id="radio_30" value='Male' className="with-gap radio-col-primary" checked={gender === 'Male'} onChange={handleOnchange} />
                <label for="radio_30">Male</label>
                <input name="gender" type="radio" id="radio_32" value='Female' className="with-gap radio-col-success" checked={gender === 'Female'} onChange={handleOnchange} />
                <label for="radio_32">Female</label>
              </div>
            {errors.gender && <div className='text-danger'>{errors.gender}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Alternate Email</label>
            <input type='text' className='form-control' placeholder='Alternate Email' name='altEmail' value={altEmail} onChange={handleOnchange} />
            {errors.altEmail && <div className='text-danger'>{errors.altEmail}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Alternate Mobile Number</label>
            <div className='d-flex'>
              <select className="form-select form-control" name='altMobCc' value={altMobCc} onChange={handleOnchange} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                <option value='+1'>+1</option>
                <option value='+91'>+91</option>
              </select>
              <input type='text' className='form-control' placeholder='Alternate Mobile Number' name='altMobNum' maxLength={10} onKeyPress={numebersOnly} value={altMobNum} onChange={handleOnchange} />
              {errors.altMobNum && <div className='text-danger'>{errors.altMobNum}</div>}
            </div>
          </div>
        </div>
        {!isCheck ? <div className='col-md-3'>
          <div className='form-group'>
            <label>SSN Number</label><span className='text-danger'>*</span>
            <input type='text' className='form-control' placeholder='SSN Number' name='ssnNum' value={ssnNum} onChange={handleOnchange} />
            {errors.ssnNum && <div className='text-danger'>{errors.ssnNum}</div>}
          </div>
        </div> : <div className='col-md-3'>
          <div className='form-group'>
            <label>SSN Expected Date</label><span className='text-danger'>*</span>
            <input type='date' className='form-control' placeholder='SSN Expected Date' name='ssnExpDate' min={getTomorrowDate()} value={ssnExpDate} onChange={handleOnchange} />
            {errors.ssnExpDate && <div className='text-danger'>{errors.ssnExpDate}</div>}
          </div>
        </div>}
        <div className='col-md-3'>
          <div className='form-group' style={{ marginTop: 33 }}>
            <input type="checkbox" id="isCheck" name="isCheck" value={isCheck} checked={isCheck} onChange={handleOnchange} />
            <label for="isCheck"> Yet to recieve</label><br></br>
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>LinkedIn URL</label>
            <input type='url' className='form-control' placeholder='https://www.linkedin.com/...' name='linkdInUrl' value={linkdInUrl} onChange={handleOnchange} />
            {errors.linkdInUrl && <div className='text-danger'>{errors.linkdInUrl}</div>}
          </div>
        </div>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Marital Status</label><span className='text-danger'>*</span>
            <select className="form-select form-control" name='mrgStatus' value={mrgStatus} onChange={handleOnchange}>
              <option value=''>Select</option>
              <option value='Single'>Single</option>
              <option value='Married'>Married</option>
              <option value='Widowed'>Widowed</option>
              <option value='Divorced'>Divorced</option>
              <option value='Separated'>Separated</option>
              <option value='Registered Partnership'>Registered Partnership</option>
            </select>
            {errors.mrgStatus && <div className='text-danger'>{errors.mrgStatus}</div>}
          </div>
        </div>
        {/* <div className='col-md-3'>
          <p className='mb-0 text-mute'><small>(File Type: pdf,doc,docx,jpeg,jpg. Max file size: 3MB)</small></p>
          <div className='form-group mt-1'>
            <label className='custom-upload btn btn-info px-5'>
              <input type='file' accept="image" name='file' onChange={handleOnchange} ref={fileInput} />
              <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photo
            </label>
          </div>
        </div>
        {file &&
          <div className='col-md-3'>
            <div className='d-flex mt-1'>
              {iconPath ?
                (
                  <img src={userData.piPath} alt={userData.piActualName} style={{ width: 75, height: 75 }} className="img-fluid me-2" />
                ) : (
                  <img src={imgUrl} alt={file.name} style={{ width: 75, height: 75 }} className="img-fluid me-2" />
                )}
              <a onClick={removeImage}><i className="fa-solid fa-xmark"></i></a>
            </div>
          </div>} */}
      </div>
      <div className='row mt-4'>
        <div className='col-md-12'>
          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Emergency Contact:</h5>
          <hr className='my-15' />
          <div className='row'>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Contact Person</label><span className='text-danger'>*</span>
                <div className='d-flex'>
                  <input type='text' className='form-control' placeholder='Emergency Contact Person' name='emrPerson' value={emrPerson} onChange={handleOnchange} />
                </div>
                {errors.emrPerson && <div className='text-danger'>{errors.emrPerson}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Relation</label><span className='text-danger'>*</span>
                <div className='d-flex'>
                  <input type='text' className='form-control' placeholder='Emergency Contact Relation' name='emrRel' value={emrRel} onChange={handleOnchange} />
                </div>
                {errors.emrRel && <div className='text-danger'>{errors.emrRel}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Contact Number</label><span className='text-danger'>*</span>
                <div className='d-flex'>
                  <select className="form-select form-control" name='emrMobCc' value={emrMobCc} onChange={handleOnchange} style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0, borderRight: 'none', width: 90 }}>
                    <option value='+1'>+1</option>
                    <option value='+91'>+91</option>
                  </select>
                  <input type='text' className='form-control' placeholder='Emergency Contact Number' name='emrMobNum' maxLength={10} onKeyPress={numebersOnly} value={emrMobNum} onChange={handleOnchange} />
                </div>
                {errors.emrMobNum && <div className='text-danger'>{errors.emrMobNum}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Contact Email</label>
                <div className='d-flex'>
                  <input type='text' className='form-control' placeholder='Emergency Contact Email' name='emrEmail' value={emrEmail} onChange={handleOnchange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================USA address================ */}
      <div className='row mt-4'>
        <div className='col-md-12'>
          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Residential Address:</h5>
          <hr className='my-15' />
          <div className='row'>
            <div className="col-md-3">
              <div className="form-group">
                <label>Country</label><span className='text-danger'>*</span>
                <select className="form-select form-control" id="participants6" name="aCountryCode" value={aCountryCode} onChange={handleOnchange}>
                  {/* <option value={Countries[2].code}>{Countries[2].label}</option> */}
                  {Countries.length > 0 && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                </select>
                {errors.aCountryCode && <div className='text-danger'>{errors.aCountryCode}</div>}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label>State</label><span className='text-danger'>*</span>
                <select className="form-select form-control" id="participants6" name="aStateCode" value={aStateCode} onChange={handleOnchange}>
                  <option value="">Select</option>
                  {aStatesArr && aStatesArr.length > 0 && aStatesArr.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                </select>
                {errors.aStateCode && <div className='text-danger'>{errors.aStateCode}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Address </label><span className='text-danger'>*</span>
                <input type="text" className="form-control" placeholder="Address" name='aAddress' value={aAddress} onChange={handleOnchange} />
                {errors.aAddress && <div className='text-danger'>{errors.aAddress}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Apt / Suite </label>
                <input type="text" className="form-control" placeholder="Street / Area" name='aArea' value={aArea} onChange={handleOnchange} />
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>City </label><span className='text-danger'>*</span>
                <input type="text" className="form-control" placeholder="City" name='aCity' value={aCity} onChange={handleOnchange} />
                {errors.aCity && <div className='text-danger'>{errors.aCity}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>ZIP Code</label><span className='text-danger'>*</span>
                <input type="text" className="form-control" placeholder="ZIP Code" maxLength={10} name='aZip' value={aZip} onKeyPress={numebersOnly} onChange={handleOnchange} />
                {errors.aZip && <div className='text-danger'>{errors.aZip}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-12'>
          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> USA issued national ID state:</h5>
          <hr className='my-15' />
          <div className='row'>
            <div className="col-md-3">
              <div className="form-group">
                <label>National ID Type</label><span className='text-danger'>*</span>
                <select className="form-select form-control" id="participants6" name="nationalId" value={nationalId} onChange={handleOnchange}>
                  <option value=''>Select</option>
                  <option value='DL'>DL</option>
                  <option value='State ID'>State ID</option>
                  <option value='Other'>Other</option>
                </select>
                {errors.nationalId && <div className='text-danger'>{errors.nationalId}</div>}
              </div>
            </div>
            {nationalId == 'DL' && <div className='col-md-3'>
              <div className='form-group'>
                <label>Driving License Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Driving License Number' name='dlNum' value={dlNum} onChange={handleOnchange} />
                {errors.dlNum && <div className='text-danger'>{errors.dlNum}</div>}
              </div>
            </div>}
            {nationalId == 'State ID' && <div className='col-md-3'>
              <div className='form-group'>
                <label>State ID Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='State ID Number' name='stateIdNum' value={stateIdNum} onChange={handleOnchange} />
                {errors.stateIdNum && <div className='text-danger'>{errors.stateIdNum}</div>}
              </div>
            </div>}
            {nationalId == 'Other' && <div className='col-md-3'>
              <div className='form-group'>
                <label>ID Type</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Enter National ID type' name='otherNationalId' value={otherNationalId} onChange={handleOnchange} />
                {errors.otherNationalId && <div className='text-danger'>{errors.otherNationalId}</div>}
              </div>
            </div>}
            {nationalId == 'Other' && <div className='col-md-3'>
              <div className='form-group'>
                <label>ID Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='ID Number' name='idNum' value={idNum} onChange={handleOnchange} />
                {errors.idNum && <div className='text-danger'>{errors.idNum}</div>}
              </div>
            </div>}
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Address</label>
                <div>
                  <input type="checkbox" id="adrsCheck" name="adrsCheck" value={adrsCheck} checked={adrsCheck} onChange={handleOnchange} />
                  <label for="adrsCheck"> Same as Residential address</label><br></br>
                </div>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Issued Date</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder='Visa Expiry Date' name='nationalIdIsdDate' max={getYesterdayDate()} value={nationalIdIsdDate} onChange={handleOnchange} />
                {errors.nationalIdIsdDate && <div className='text-danger'>{errors.nationalIdIsdDate}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Expiry Date</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder='Visa Expiry Date' name='nationalIdExpDate' min={getTomorrowDate()} value={nationalIdExpDate} onChange={handleOnchange} />
                {errors.nationalIdExpDate && <div className='text-danger'>{errors.nationalIdExpDate}</div>}
              </div>
            </div>
            {!adrsCheck ? <div className='row'>
              <div className="col-md-3">
                <div className="form-group">
                  <label>Country</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" id="participants6" name="cCode" value={cCode} onChange={handleOnchange}>
                    {/* <option value={Countries[2].code}>{Countries[2].label}</option> */}
                    {Countries.length > 0 && Countries.map((item, i) => <option key={i} value={item.code}>{item.value}</option>)}
                  </select>
                  {errors.cCode && <div className='text-danger'>{errors.cCode}</div>}
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <label>State</label><span className='text-danger'>*</span>
                  <select className="form-select form-control" id="participants6" name="stCode" value={stCode} onChange={handleOnchange}>
                    <option value="">Select</option>
                    {statesArr && statesArr.length > 0 && statesArr.map((item, i) => <option key={i} value={item.stateCode}>{item.stateName}</option>)}
                  </select>
                  {errors.stCode && <div className='text-danger'>{errors.stCode}</div>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Address </label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="Address" name='adrs' value={adrs} onChange={handleOnchange} />
                  {errors.adrs && <div className='text-danger'>{errors.adrs}</div>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Apt / Suite </label>
                  <input type="text" className="form-control" placeholder="Street / Area" name='area' value={area} onChange={handleOnchange} />
                  {errors.area && <div className='text-danger'>{errors.area}</div>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>City </label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="City" name='city' value={city} onChange={handleOnchange} />
                  {errors.city && <div className='text-danger'>{errors.city}</div>}
                </div>
              </div>
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>ZIP Code</label><span className='text-danger'>*</span>
                  <input type="text" className="form-control" placeholder="ZIP Code" maxLength={10} name='pincode' value={pincode} onKeyPress={numebersOnly} onChange={handleOnchange} />
                  {errors.pincode && <div className='text-danger'>{errors.pincode}</div>}
                </div>
              </div>
            </div> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalInfoComponent