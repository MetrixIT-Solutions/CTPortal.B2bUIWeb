/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from 'react';
import {Button} from 'react-bootstrap';
import moment from 'moment';
import { firstCharCaps } from '../../../hooks/common';
import Loader from '../../loader/loader';

const InviteNotesListComponent = (props) => {

  const { notes, errMsg, disable, notesList, inviteData, loading, rolesObj } = props.state;
  const { setStateData, notesCreate, cnsFlag } = props;

  return (
    <div>
      {/* notes */}
          <strong className='mb-2'>Candidate Info: </strong> {inviteData.name} | {inviteData.emID} | {inviteData.mobCcNum} <br /> 
          {cnsFlag ? '' : (inviteData?.iStatus && inviteData.iStatus !== 'Approved' && inviteData.iStatus !== 'Rejected') && ((rolesObj?.access?.length >= 8 && rolesObj?.access[7]?.actions[22]?.isAlwd) || rolesObj?.appAcc) &&<>
          <hr />
          <strong>Add Note</strong> <br />
          <form>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <textarea value={notes} rows='4' cols='65' placeholder='Notes *' onChange={(e) => setStateData({ notes: firstCharCaps(e.target.value), errMsg: '' })}></textarea>
                </div>
              </div>
            </div>
            <div>
              <div className='text-center text-danger'>{errMsg}</div>
              <Button variant='success' disabled={disable} onClick={notesCreate}>Create</Button>
            </div>
          </form>
          </>}
          <hr />
          <strong>View Notes</strong> <br />
          <div className='row'>
            <div className='col-md-12'>
              <table className='table table-bordered table-hover display nowrap margin-top-10 w-p100'>
                <thead>
                  <tr>
                    <th>Notes</th>
                    <th>Created By</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                {loading ? 
                  <tbody><tr>
                    <td colSpan={6}>
                      <div className='text-center py-3'>
                        <Loader/>
                      </div>
                    </td>
                  </tr></tbody>
                : notesList && notesList.length > 0 ? (
                  <tbody>
                    {notesList.map((item, i) => {
                      const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY HH:mm');
                      return (
                        <tr key={i}>
                          <td>{item.notes}</td>
                          <td>{item.uuName}</td>
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
    </div>
  );
}

export default InviteNotesListComponent;
