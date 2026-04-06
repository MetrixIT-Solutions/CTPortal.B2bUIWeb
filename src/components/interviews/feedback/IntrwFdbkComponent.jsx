/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';

import { IntrvwFdbckCreate, IntrvwFdbckEdit } from '../../../containers/interviews/feedback';
import IntrvwFdbckListComponent from './IntrwFdbkListComponent';

const IntrvwFdbckComponent = (props) => {
  const { action, listModal, intrvwData, intrvwFdbkList, fdbkData } = props.state;
  const { setStateData, handleClose, getIntrvwFdbkListData } = props;

  const isd = intrvwData.isDtStr ? moment(intrvwData.isDtStr).format('DD MMM, YYYY HH:mm') + ' ' + intrvwData.iTz : '';
  const minutes = intrvwData.duration % 60;
  const hours = Math.floor(intrvwData.duration / 60);
  const time = hours == 0 ? '' : (hours == 1 ? `${hours}hr` : `${hours}hrs`);
  const mTime = `${time} ${minutes}mins`;

  return (
    <div>
      <Offcanvas show={listModal} onHide={handleClose} className='w-50'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Interview Feedbacks</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p><strong>Interview Info:</strong> {intrvwData.process} (ID - {intrvwData.intrwId})</p>
          <p>Scheduled @{isd} | Duration - {mTime} | Submission ID - {intrvwData.subId}</p>
          <p>Candidate: {intrvwData.canName} | Job: {intrvwData.jobTitle} | Vendor: {intrvwData.vName}</p>
          <hr/>
          <div className='d-flex justify-content-between'>
            <p><strong>Interview Feedback {action}</strong></p>
            <div>
              {action === 'List' && <button className='btn btn-sm btn-primary' onClick={() => setStateData({ action: 'Create' })}   data-bs-toggle="tooltip" title='Create'>Create</button>}
              {action !== 'List' && <button className='btn btn-sm btn-secondary' type='button' onClick={() => setStateData({ action: 'List' })} data-bs-toggle="tooltip" title='Back to List'>Back to List</button>}
            </div>
          </div>

          {action === 'List' && <IntrvwFdbckListComponent intrvwData={intrvwData} intrvwFdbkList={intrvwFdbkList} handleEditData={setStateData} />}
          {action === 'Create' && <IntrvwFdbckCreate intrvwData={intrvwData} handleBackToList={setStateData} getIntrvwFdbkListData={getIntrvwFdbkListData} />}
          {action === 'Edit' && <IntrvwFdbckEdit intrvwData={intrvwData} fdbkData={fdbkData} handleBackToList={setStateData} getIntrvwFdbkListData={getIntrvwFdbkListData} />}

        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default IntrvwFdbckComponent;