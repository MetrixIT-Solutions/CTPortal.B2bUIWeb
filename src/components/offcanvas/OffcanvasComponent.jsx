/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const OffcanvasComponent = (props) => {
  const { offCanvasModal, setStateData } = props;

  return (
    <div>
      <Offcanvas 
        show={offCanvasModal} 
        onHide={() => setStateData({offCanvasModal: false})}
        className='w-50'
      >
       <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form>
            <div className='row'>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Email</label>
                  <span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Email' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Mobile Number</label>
                  <div className='d-flex'>
                    <select className='form-select form-control' style={{width: '70px', height: '38px'}}>
                      <option value='+1'>+1</option>
                      <option value='+91'>+91</option>
                    </select>
                    <input type='text' className='form-control' placeholder='Mobile Number' maxLength={10} />
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>First Name</label>
                  <input type='text' className='form-control' placeholder='First Name' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Last Name</label>
                  <input type='text' className='form-control' placeholder='Last Name' />
                </div>
              </div>
              <div className='col-md-4'>
                <div className='form-group'>
                  <label>Employement Type</label>
                  <span className='text-danger'>*</span>
                  <select className='form-select form-control'>
                    <option value=''>Select</option>
                    <option value='Full Time'>Full Time</option>
                    <option value='Contract'>Contract</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default OffcanvasComponent;
