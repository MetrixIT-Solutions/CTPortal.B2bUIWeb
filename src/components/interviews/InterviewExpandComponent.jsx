/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, {memo} from 'react';
import CommonTooltip from '../common/CommonTooltip';
import moment from 'moment';

const InterviewExpandComponent = (props) => {
  const { iSchedules } = props;  

  return (
    <div>
      {iSchedules && iSchedules.length > 0 && iSchedules.map((item, i) => {
        const iDate = item.isDtStr ? moment(item.isDtStr).format('Do MMM, YYYY') : '';
        const iTime = item.isDtStr ? moment(item.isDtStr).format('HH:mm') : '';
        const hours = Math.floor(item.duration / 60);
        const minutes = item.duration % 60;
        const time = hours == 0 ? '' : (hours == 1 ? `${hours} hr` : `${hours} hrs`)
        const mTime = `${time} ${minutes} mins`;

        return (
          <div className='jobdetails-left' key={i}>
            <hr className='text-muted my-2' />
            <div className='consultent-card p-1'>
              <h6 className='ng-star-inserted'>
                <span className='ng-star-inserted'>
                  <CommonTooltip type='Icon' name='' className='far fa-calendar-days' title='Interview Scheduled Date' display='top' /> <strong>{iDate}</strong>
                </span>
                <span className='ng-star-inserted'>
                  <CommonTooltip type='Icon' name='' className='fa-regular fa-clock' title='Interview Time / Duration' display='top' /> <strong>{iTime + ' ' + item.iTz || 'EST'} / {mTime}</strong>
                </span>
                <span className='ng-star-inserted'>
                  <CommonTooltip type='Icon' name='' className='fa-solid fa-arrow-up-wide-short' title='Screening Process, Interview With / Round' display='top' /> <strong>{item.process}, {item.invWith}</strong> / <span className='text-success'>({item.round})</span>
                </span>
                <span className='ng-star-inserted'>
                  <CommonTooltip type='Icon' name='' className='fa-solid fa-user' title='Invisilator' display='top' /> <strong>{item.invsgtrName ? item.invsgtrName  : ''} </strong> <span className='text-grey'>{item.invsgtrMobNum ? '| ' + item.invsgtrMobNum : ''} {item.invsgtrEmID ? '| ' + item.invsgtrEmID : ''}</span>
                </span>
              </h6>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default memo(InterviewExpandComponent);
