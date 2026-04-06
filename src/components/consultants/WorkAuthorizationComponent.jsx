/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { getTodayDate, getTomorrowDate, getYesterdayDate, selctedDatePlusOneday } from '../../hooks/common';

const WorkAuthorizationComponent = (props) => {
  const { nationality, visaStatus, visaStartDate, visaExpDate, sevisNum, position, cardRecieptNum, USCISNum, receiptNum, uscisCheck, i94Num, i94ExpDate, passportNum, passportIsdDate, passportExpDate, passportIsdPlace, passDocNum, workAuthStartDate, workAuthExpDate, cardNum, cardCheck, cardExpDate } = props.workData;
  const { errors, handleOnchange } = props;
  return (
    <div>
      <div className='row mb-2'>
        <div className='col-md-3'>
          <div className='form-group'>
            <label>Nationality</label><span className='text-danger'>*</span>
            <select className='form-select form-control' id='participants6' name='nationality' value={nationality} onChange={handleOnchange}>
              <option value=''>Select Nationality</option>
              <option value='Indian'>Indian</option>
              <option value='American'>American</option>
              <option value='Bangladeshi'>Bangladeshi</option>
              <option value='Nepali'>Nepali</option>
              <option value='Bhutanese'>Bhutanese</option>
              <option value='Others'>Others</option>
            </select>
            {errors.nationality && <div className='text-danger'>{errors.nationality}</div>}
          </div>
        </div>
      </div>
      <div className='row'>
        {nationality != 'American' ? <div className='col-md-3'>
          <div className='form-group'>
            <label>Visa Status</label><span className='text-danger'>*</span>
            <select className='form-select form-control' id='participants6' name='visaStatus' value={visaStatus} onChange={handleOnchange}>
              <option value=''>Select Visa Status</option>
              <option value='CPT'>CPT</option>
              <option value='OPT'>OPT</option>
              <option value='Stem OPT'>Stem OPT</option>
              <option value='H1B'>H1B</option>
              <option value='H4EAD'>H4 EAD</option>
              <option value='H4'>H4</option>
              <option value='GCEAD'>GC EAD</option>
              <option value='GC'>GC</option>
              <option value='L2'>L2</option>
              <option value='Citizen'>Citizen</option>
              <option value='Canadian'>Canadian</option>
              <option value='Other'>Other</option>
            </select>
            {errors.visaStatus && <div className='text-danger'>{errors.visaStatus}</div>}
          </div>
        </div> : ''}
        {nationality != 'American' ? <div className='col-md-3'>
          <div className='form-group'>
            <label>Visa Start Date</label><span className='text-danger'>*</span>
            <input type='date' className='form-control' name='visaStartDate' value={visaStartDate} onChange={handleOnchange}  />
            {errors.visaStartDate && <div className='text-danger'>{errors.visaStartDate}</div>}
          </div>
        </div> : ''}
        {nationality != 'American' ? <div className='col-md-3'>
          <div className='form-group'>
            <label>Visa Expiry Date</label><span className='text-danger'>*</span>
            <input type='date' className='form-control' name='visaExpDate' value={visaExpDate} onChange={handleOnchange}  />
            {errors.visaExpDate && <div className='text-danger'>{errors.visaExpDate}</div>}
          </div>
        </div> : ''}
      </div>
      {nationality != 'American' &&
        <div className='row'>
          {(visaStatus == 'CPT' || visaStatus == 'OPT' || visaStatus == 'Stem OPT') && <div className='col-md-3'>
            <div className='form-group'>
              <label>Sevis Number</label><span className='text-danger'>*</span>
              <input type='text' className='form-control' placeholder='Sevis Number' name='sevisNum' value={sevisNum} onChange={handleOnchange} />
              {errors.sevisNum && <div className='text-danger'>{errors.sevisNum}</div>}
            </div>
          </div>}
          {visaStatus == 'CPT' && <div className='col-md-3'>
            <div className='form-group'>
              <label>Position</label><span className='text-danger'>*</span>
              <select className='form-select form-control' id='position' name='position' value={position} onChange={handleOnchange}>
                <option value=''>Select Position</option>
                <option value='Part Time'>Part Time</option>
                <option value='Full Time'>Full Time</option>
              </select>
              {errors.position && <div className='text-danger'>{errors.position}</div>}
            </div>
          </div>}
          {/* {visaStatus == 'Stem OPT' &&
            <div className='col-md-3'>
              <div className='form-group'>
                <label>USCIS Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Enter USCIS Number' maxLength={20} name='USCISNum' value={USCISNum} onChange={handleOnchange} />
                {errors.USCISNum && <div className='text-danger'>{errors.USCISNum}</div>}
              </div>
            </div>} */}
          {visaStatus == 'H1B' &&
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Receipt Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Enter Receipt Number' name='receiptNum' value={receiptNum} onChange={handleOnchange} />
                {errors.receiptNum && <div className='text-danger'>{errors.receiptNum}</div>}
              </div>
            </div>}
          {/* ====================================== */}
          {(visaStatus == 'OPT' || visaStatus == 'Stem OPT') &&
            <>
              {cardCheck ? <div className={`${visaStatus == 'Stem OPT' ? 'col-md-2' :'col-md-3'}`}>
                <div className='form-group'>
                  <label>Card Receipt Number</label><span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Card Receipt Number' name='cardRecieptNum' value={cardRecieptNum} onChange={handleOnchange} />
                  {errors.cardRecieptNum && <div className='text-danger'>{errors.cardRecieptNum}</div>}
                </div>
              </div> :
                <div className={`${visaStatus == 'Stem OPT' ? 'col-md-2' :'col-md-3'}`}>
                  <div className='form-group'>
                    <label>Card Number</label><span className='text-danger'>*</span>
                    <input type='text' className='form-control' placeholder='Enter Card Number' name='cardNum' value={cardNum} onChange={handleOnchange} />
                    {errors.cardNum && <div className='text-danger'>{errors.cardNum}</div>}
                  </div>
                </div>}
              <div className={`${visaStatus == 'Stem OPT' ? 'col-md-2' :'col-md-3'}`}>
                <div className='form-group' style={{ marginTop: 33 }}>
                  <input type="checkbox" id="cardCheck" name="cardCheck" value={cardCheck} checked={cardCheck} onChange={handleOnchange} />
                  <label for="cardCheck"> Yet to recieve</label><br></br>
                </div>
              </div>
              {cardCheck ?
                <div className={`${visaStatus == 'Stem OPT' ? 'col-md-2' :'col-md-3'}`}>
                  <div className='form-group'>
                    <label>Card Expected Date</label><span className='text-danger'>*</span>
                    <input type='date' className='form-control' placeholder='Card Expected Date' min={getTodayDate()} maxLength={20} name='cardExpDate' value={cardExpDate} onChange={handleOnchange}  />
                    {errors.cardExpDate && <div className='text-danger'>{errors.cardExpDate}</div>}
                  </div>
                </div> : ''}
            </>}
          {((visaStatus == 'OPT' && cardCheck) || visaStatus == 'CPT' || visaStatus == 'H1B') ? '' :
            <div className='col-md-3'>
              <div className='form-group'>
                <label>USCIS Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Enter USCIS Number' maxLength={20} name='USCISNum' value={USCISNum} onChange={handleOnchange} />
                {errors.USCISNum && <div className='text-danger'>{errors.USCISNum}</div>}
              </div>
            </div>}
          {/* ===================================== */}
          <div className='row'>
            {nationality != 'American' ?
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>Latest i-94</label><span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Enter Latest i-94' maxLength={20} name='i94Num' value={i94Num} onChange={handleOnchange} />
                  {errors.i94Num && <div className='text-danger'>{errors.i94Num}</div>}
                </div>
              </div> : ''}
            {nationality != 'American' && visaStatus != 'OPT' && visaStatus != 'CPT' && visaStatus != 'Stem OPT' && visaStatus != 'GCEAD' && visaStatus != 'L2' && visaStatus != 'GC' ?
              <div className='col-md-3'>
                <div className='form-group'>
                  <label>i-94 Expiry Date</label>{visaStatus == 'H4' ? '' : <span className='text-danger'>*</span>}
                  <input type='date' className='form-control' placeholder='i-94 Expiry Date' name='i94ExpDate' min={getTomorrowDate()} value={i94ExpDate} onChange={handleOnchange}  />
                  {errors.i94ExpDate && <div className='text-danger'>{errors.i94ExpDate}</div>}
                </div>
              </div> : ''}
            {nationality != 'American' && !cardCheck ? <div className='col-md-3'>
              <div className='form-group'>
                <label>{visaStatus == 'CPT' ? 'CPT Start Date' : 'Work Authorization Start Date'}</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder={`${visaStatus == 'CPT' ? 'CPT Start Date' : 'Work Authorization Start Date'}`} name='workAuthStartDate' value={workAuthStartDate} onChange={handleOnchange}  />
                {errors.workAuthStartDate && <div className='text-danger'>{errors.workAuthStartDate}</div>}
              </div>
            </div> : ''}
            {nationality != 'American' && !cardCheck ? <div className='col-md-3'>
              <div className='form-group'>
                <label>{visaStatus == 'CPT' ? 'CPT Expiry Date' : 'Work Authorization Expiry Date'}</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder={`${visaStatus == 'CPT' ? 'CPT Expiry Date' : 'Work Authorization Expiry Date'}`} name='workAuthExpDate' min={selctedDatePlusOneday(workAuthStartDate)} value={workAuthExpDate} onChange={handleOnchange}  />
                {errors.workAuthExpDate && <div className='text-danger'>{errors.workAuthExpDate}</div>}
              </div>
            </div> : ''}
          </div>
        </div>
      }
      <div className='row mt-4'>
        <div className='col-md-12'>
          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Passport Details:</h5>
          <hr className='my-15' />
          <div className='row'>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Passport Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Enter Passport Number' name='passportNum' maxLength={12} value={passportNum} onChange={handleOnchange} />
                {errors.passportNum && <div className='text-danger'>{errors.passportNum}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Passport Issued Date</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder='Passport Issued Date' name='passportIsdDate' max={getYesterdayDate()} value={passportIsdDate} onChange={handleOnchange}  />
                {errors.passportIsdDate && <div className='text-danger'>{errors.passportIsdDate}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Passport Expiry Date</label><span className='text-danger'>*</span>
                <input type='date' className='form-control' placeholder='Passport Expiry Date' name='passportExpDate' min={getTomorrowDate()} value={passportExpDate} onChange={handleOnchange}  />
                {errors.passportExpDate && <div className='text-danger'>{errors.passportExpDate}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Passport Issued Place</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Passport Issued Place' name='passportIsdPlace' value={passportIsdPlace} onChange={handleOnchange} />
                {errors.passportIsdPlace && <div className='text-danger'>{errors.passportIsdPlace}</div>}
              </div>
            </div>
            <div className='col-md-3'>
              <div className='form-group'>
                <label>Passport File Number</label><span className='text-danger'>*</span>
                <input type='text' className='form-control' placeholder='Passport File Number' name='passDocNum' value={passDocNum} onChange={handleOnchange} />
                {errors.passDocNum && <div className='text-danger'>{errors.passDocNum}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkAuthorizationComponent