/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import moment from 'moment';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Loader from '../../loader/loader';

import InviteMeetingsPopupComponent from './InviteMeetingsPopupComponent';

const InviteMeetingsListComponent = (props) => {

  const { meetingsList, handleSelectTab, handleReSchedule, handleStatusUpdt, setStateData, submitStatusUpdate, cnsFlag, loading, isAction } = props;
  const { actTab, tabsArr, inviteData } = props.state;

  return (
    <div>
      {cnsFlag && <div className="col-md-10">
        <strong className="mb-2">Candidate Info: </strong> {inviteData.name} | {inviteData.emID} | {inviteData.mobCcNum}
      </div>}
      <div className='row mt-3'>
        <div className='col-md-12'>
          <Tabs activeKey={actTab} onSelect={handleSelectTab} id='justify-tab-example' className='mb-3'>
            <Tab eventKey='0' title={tabsArr[0]}>
              <ListTable meetingsList={meetingsList} handleReSchedule={handleReSchedule} handleStatusUpdt={handleStatusUpdt} showActions={true} iStatus={inviteData.iStatus} loading={loading} isAction={isAction} />
            </Tab>
            <Tab eventKey='1' title={tabsArr[1]}>
              <ListTable meetingsList={meetingsList} handleReSchedule={handleReSchedule} handleStatusUpdt={handleStatusUpdt} showActions={false} iStatus={inviteData.iStatus} loading={loading} isAction={isAction} />
            </Tab>
            <Tab eventKey='2' title={tabsArr[2]}>
              <ListTable meetingsList={meetingsList} handleReSchedule={handleReSchedule} handleStatusUpdt={handleStatusUpdt} showActions={false} iStatus={inviteData.iStatus} loading={loading} isAction={isAction} />
            </Tab>
          </Tabs>
        </div>
      </div>
      <InviteMeetingsPopupComponent state={props.state} setStateData={setStateData} submitStatusUpdate={submitStatusUpdate} />
    </div>
  );
}

export default InviteMeetingsListComponent;


export const ListTable = (props) => {
  const { meetingsList, showActions, handleReSchedule, handleStatusUpdt, iStatus, loading, isAction} = props;
  return <div className='dataTables_wrapper'>
    <div className='row'>
      <div className='col-md-12'>
        <div className='table-responsive'>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Meeting</th>
                {isAction && showActions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {loading ? 
                <tr>
                  <td colSpan={6}>
                    <div className='text-center py-3'>
                      <Loader />
                    </div>
                  </td>
                </tr>
              : meetingsList && meetingsList.length > 0 ?
                meetingsList.map((item, i) => {
                  const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm');
                  const meetingAt = moment(item.msDtTmStr, 'YYYY-MM-DD HH:mm').format('DD MMM, YYYY HH:mm');
                  const mpExt = item.mpExt ? ' / Extn: '+item.mpExt : '';
                  return (
                    <tr key={i}>
                      <td>Type: <strong>{item.mType}</strong> | At: <strong>{meetingAt}</strong> | Attendee(s): <strong>{item.mbrNames}</strong><br /><br />
                        <strong>Discuss About:</strong> {item.msub}<br />
                        {item.mNotes && <><strong>Meeting Notes:</strong> {item.mNotes}<br /></>}<br />
                        <strong>Contact Info:</strong><br />{item.mpCcNum && 'Phone #: '+item.mpCcNum+mpExt + ' | '}{(item.mpCcNum || item.mLink) && <>Meeting Link: </>}{item.mLink && <a href={item.mLink.startsWith('https://') || item.mLink.startsWith('http://') ? item.mLink : `https://${item.mLink}`} target='_blank'>{item.mLink}</a>}{item.mobAdrs ? 'Office: '+item.mobAdrs : ''}<br /><br />
                        Setup By: {item.cuName} | Setup On: {createdDt}
                      </td>
                      {isAction && showActions && <td width='17%'>
                        <div className='mb-1'>
                          <a onClick={() => handleReSchedule(item)} title='Re Schedule Meeting' className='btn btn-primary'><i className='fa-regular fa-calendar-days'></i> Re Schedule </a>
                        </div>
                        <div className='mb-1'>
                          <a onClick={() => handleStatusUpdt(item, 'Completed')} title='Re Schedule Meeting' className='btn btn-success'><i className='fa-solid fa-check'></i> Completed </a>
                        </div>
                        <div className='mb-1'>
                          <a onClick={() => handleStatusUpdt(item, 'Cancelled')} title='Cancel Meeting' className='btn btn-danger'><i className='fa-solid fa-close'></i> Cancel </a>
                        </div>
                      </td>}
                    </tr>
                  )
                })
              :
                <tr>
                  <td colSpan={6}>
                    <div className='text-center py-3'>
                      <strong>No data</strong>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
}
