/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import { numebersOnly } from '../../hooks/common';
import InvitationSelectOffcanvasComponent from './InvitationSelectOffcanvasComponent';

const InvitationOffcanvasComponent = (props) => {
  const { setStateData, errMsg, disable, meetingOffcanvasModal, meetingCreateOffcanvasModal, date, time, mTz, attendeeObj, isChecked, mType, msub, mLink, mDesc, inviteMeetingsCreate, handleAttendeeCheck, mpCc, mpNum, mpExt, mOffc, handleAttendees, usrsList, meetingListData } = props;

  return (
    <div>
      {/* meeting */}
      <Offcanvas show={meetingOffcanvasModal} onHide={() => setStateData({meetingOffcanvasModal: false})} className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Meeting</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* <strong className='mb-2'>Candidate Info: </strong> {meetingListData.name} | {meetingListData.emID} | {meetingListData.mobNum} <br /> <hr /> */}
          <div className="alert alert-info alert-dismissible">
            <h4><i className="icon fa fa-info"></i> Candidate Info:</h4>
            <p className='mb-0'>
              <span className="me-3"><i className="fas fa-user"></i> {meetingListData.name} </span>
              <span className="me-3"><i className="fas fa-envelope"></i> {meetingListData.emID} </span>
              <span className="me-3"><i className="fas fa-phone"></i> {meetingListData.mobNum} </span>
            </p>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <table className='table table-bordered table-hover display nowrap margin-top-10 w-p100'>
                <thead>
                  <tr>
                    <th>Date and Time</th>
                    <th>Meeting Type</th>
                    <th>Attendee(s)</th>
                    <th>Discuss About</th>
                    <th>Phone Number</th>
                    <th>Comment</th>
                    <th>Setup By</th>
                    <th>Setup On</th>
                  </tr>
                </thead>
                {meetingListData && meetingListData.length > 0 ? (
                  <tbody>
                    {meetingListData.map((item, i) => {
                      const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm');
                      return (
                        <tr key={i}>
                          <td>{item.msTm}</td>
                          <td>{item.mType}</td>
                          <td>{item.attendeeObj}</td>
                          <td>{item.msub}</td>
                          <td>{item.mpNum}</td>
                          <td>{item.mDesc}</td>
                          <td>{item.cuName}</td>
                          <td>{createdDt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className='text-center py-3'>
                        <strong>No data</strong>
                      </div>
                    </td>
                  </tr>
                )}
              </table>
            </div>
          </div>
          <Button variant='success' disabled={disable} onClick={() => setStateData({meetingCreateOffcanvasModal: true})}>Create</Button>
        </Offcanvas.Body>
      </Offcanvas>
      {/* meeting create offcanvas modal */}
      <Offcanvas show={meetingCreateOffcanvasModal} onHide={() => setStateData({meetingCreateOffcanvasModal: false})} className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Schedule Meeting</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='container'>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Date*</label>
                  <input type='date' className='form-control' placeholder='' value={date} onChange={(e) => setStateData({date: e.target.value, errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Time*</label>
                  <input type='time' min='00:00' max='23:59' className='form-control' placeholder='' value={time} onChange={(e) => setStateData({time: e.target.value, errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>TimeZone*</label>
                  <select className='form-select' value={mTz} onChange={(e) => setStateData({mTz: e.target.value, errMsg: ''})}>
                    <option  value=''>Select</option>
                    <option value='est'>EST</option>
                    <option value='cst'>CST</option>
                    <option value='mst'>MST</option>
                    <option value='pst'>PST</option>
                    <option value='akst'>AKST</option>
                  </select>
                </div>
              </div>
              <InvitationSelectOffcanvasComponent attendeeObj={attendeeObj} isChecked={isChecked} handleAttendeeCheck={handleAttendeeCheck}  handleAttendees={handleAttendees} usrsList={usrsList} />
              <div className='form-check mb-3'>
                <input type='checkbox' className='form-check-input' id='inputAttendeeCheck' checked={isChecked} onChange={handleAttendeeCheck} />
                <label className='form-check-label' for='inputAttendeeCheck'>
                  I am also attending
                </label>
              </div> 
              <div className='col-md-6'>
                <div className='form-group'>
                  <label for='exampleInputEmail1'>Discussion About*</label>
                  <input type='text' className='form-control' placeholder='Resume Preparation' value={msub} onChange={(e) => setStateData({msub: e.target.value, errMsg: ''})} />
                </div>
              </div>
              <div className='col-md-8'>
                <div className='form-group '>
                  <label className='me-3'>Meeting Type:</label>
                  <input className='form-check-input' type='radio' name='exampleRadios' id='telephone' value={'telephone'} checked={mType === 'telephone' ? true : false} onChange={(e) => setStateData({mType: e.target.value})} />
                  <label className='form-check-label me-3' for='telephone'>
                    Telephone
                  </label>
                  <input className='form-check-input' type='radio' name='exampleRadios' id='videoCall' value={'videoCall'} checked={mType === 'videoCall' ? true : false} onChange={(e) => setStateData({mType: e.target.value})} />
                  <label className='form-check-label me-3' for='videoCall'>
                    Video Call
                  </label>
                  <input className='form-check-input' type='radio' name='exampleRadios' id='faceToFace' value={'faceToFace'} checked={mType === 'faceToFace' ? true : false} onChange={(e) => setStateData({mType: e.target.value})} />
                  <label className='form-check-label' for='faceToFace'>
                    Face to Face
                  </label>
                </div>
              </div>
              { mType === 'telephone' && 
                <div>                 
                  <div className='d-flex'>
                    <select className='form-select form-control' style={{ width: '70px', height: '38px' }} value={mpCc} onChange={(e) => setStateData({ mpCc: e.target.value })}>
                      <option value='+1'>+1</option>
                      <option value='+91'>+91</option>
                    </select> 
                  <div>
                    <input type='text' className='form-control' placeholder='Phone' maxLength={10} value={mpNum} onKeyPress={numebersOnly} onChange={(e) => setStateData({ mpNum: e.target.value })} />
                  </div>
                  </div> 
                  <div className='col-md-6'>
                    <input type='text' className='form-control' placeholder='Ext' value={mpExt} onChange={(e) => setStateData({ mpExt: e.target.value })} />
                  </div>
                  <div className='form-group col-md-12'>
                    <input type='text' className='form-control' placeholder='Meeting Link' value={mLink} onChange={(e) => setStateData({mLink: e.target.value})} />
                  </div>
                </div>
              }
              { mType === 'videoCall' &&  
                <div className='form-group col-md-12'>
                  <input type='text' className='form-control' placeholder='Meeting Link*' value={mLink} onChange={(e) => setStateData({mLink: e.target.value, errMsg: ''})} />
                </div>
              }
              { mType === 'faceToFace' && 
                 <div>
                  <select className='form-select' value={mOffc} onChange={(e) => setStateData({mOffc: e.target.value })}>
                    <option>Select</option>
                  </select>
                  <div className='col-md-8'>
                    <div className='form-group '>
                      <textarea placeholder='Office Address' rows='4' cols='107' value={''} onChange={(e) => setStateData({comments: e.target.value, errMsg: ''})}></textarea>
                    </div>
                  </div>
                </div>
              }
              <div className='col-md-8'>
                <div className='form-group '>
                  <textarea placeholder='Comments*' rows='4' cols='107' value={mDesc} onChange={(e) => setStateData({mDesc: e.target.value, errMsg: ''})}></textarea>
                </div>
              </div>
            </div>
            <div className='text-center text-danger'>{errMsg}</div>
          </div>
          <div className='d-flex justify-content-end'>
            <button type='submit' variant='success' className='btn btn-primary' disabled={disable} onClick={inviteMeetingsCreate}>
              Submit
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default InvitationOffcanvasComponent;
