/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import hashHistory from '../../hashHistory';
import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import ChecklistCreateComponent from './ChecklistCreateComponent';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ToastContainer } from 'react-toastify';

const TemplateCheckListComponent = (props) => {
  const { checkListArr, errMsg, actTab, updateModal, docObj, openIndex, isprImage, tableModal, tdtgData, errors, isDisable, userInfo, sectionModal, errMsgs, isApprModal, rolesObj, tCat, schId, pdfShow, pdfUrl, pdfMessage } = props.state;
  const { tempChange, editClick, removeImage, handleSelectTab, setStateData, handleOpenEdit, handleClosePopup, handleDownloadFiles, tableChange, addTable, deleteTable, handleAddVertTable, handleDltVertTable, handleHorTableChange, handleVerTableChange, subArrAddBtnCLick, subArrDltBtnCLick, handleApprove, handleOnChange, handleClickExpand, handleKeyDown, handleOfrLtrPdfView } = props;
  const navigate = tCat === 'Consultant On Boarding' ? () => hashHistory.push('/consultants/onboarding')
    : tCat === 'Consultant In Marketing' ? () => hashHistory.push('/consultants/inmarketing')
      : tCat === 'Consultant BGV' ? () => hashHistory.push('/consultants/background/verification')
        : tCat === 'Immigration Offer Letter' ? () => hashHistory.push('/offerletters')
          : () => hashHistory.push('/h1bpetitions');
  
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Update Checklist</h3>
                <div className='d-inline-block align-items-center'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                    <li className='breadcrumb-item' aria-current='page'><a onClick={navigate}>Checklist</a></li>
                    <li className='breadcrumb-item active' aria-current='page'>Update</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            {checkListArr?.length > 0 && checkListArr[0]._id && <div>
              <div className='consultent-card'>
                <div className="alert alert-info alert-dismissible">
                  <h4><i className="icon fa fa-info"></i> Candidate Info</h4>
                  <p className='mb-0'>
                    <span className="me-3"><i className="fas fa-user"></i> {checkListArr[0]?.euName} </span>
                    <span className="me-3"><i className="fas fa-envelope"></i> {checkListArr[0]?.euEmID} </span>
                    <span className="me-3"><i className="fas fa-phone"></i> {checkListArr[0]?.euMobCcNum} </span>
                  </p>
                  <hr />
                  <p className='mb-0'>
                    <span className='ng-star-inserted'>Template Name: <strong>{checkListArr[0].tempName}</strong></span>
                  </p>
                </div>
              </div>
            </div>}
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <Tabs activeKey={actTab} onSelect={handleSelectTab} id='justify-tab-example' className='mb-3'>
                    <Tab eventKey='0' title='Documents'>
                      {actTab == '0' && <ChecklistCreateComponent userInfo={userInfo} checkListArr={checkListArr} actTab={actTab} updateModal={updateModal} docObj={docObj} openIndex={openIndex} errMsg={errMsg} setStateData={setStateData} isprImage={isprImage} handleOpenEdit={handleOpenEdit} editClick={editClick} tempChange={tempChange} removeImage={removeImage} handleClosePopup={handleClosePopup} handleDownloadFiles={handleDownloadFiles} isDisable={isDisable} isApprModal={isApprModal} handleApprove={handleApprove} rolesObj={rolesObj} tCat={tCat} handleOnChange={handleOnChange} handleClickExpand={handleClickExpand} 
                      handleOfrLtrPdfView={handleOfrLtrPdfView} pdfShow={pdfShow} pdfUrl={pdfUrl} pdfMessage={pdfMessage}/>}
                    </Tab>
                    <Tab eventKey='1' title='Details'>
                      {actTab == '1' && <ChecklistCreateComponent userInfo={userInfo} checkListArr={checkListArr} actTab={actTab} updateModal={updateModal} docObj={docObj} openIndex={openIndex} errMsg={errMsg} setStateData={setStateData} handleOpenEdit={handleOpenEdit} editClick={editClick} tableModal={tableModal} tdtgData={tdtgData} tableChange={tableChange} addTable={addTable} errors={errors} deleteTable={deleteTable} sectionModal={sectionModal} handleAddVertTable={handleAddVertTable} handleDltVertTable={handleDltVertTable} handleHorTableChange={handleHorTableChange}
                        handleVerTableChange={handleVerTableChange} subArrAddBtnCLick={subArrAddBtnCLick} subArrDltBtnCLick={subArrDltBtnCLick} errMsgs={errMsgs} isApprModal={isApprModal} handleApprove={handleApprove} rolesObj={rolesObj} tCat={tCat} handleOnChange={handleOnChange} handleClickExpand={handleClickExpand} schId={schId} handleKeyDown={handleKeyDown} />}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
            {/* <ToastContainer/> */}
            <ToastContainer
              position="top-center"      // Position of the toast
              autoClose={1000}           // Auto close after 5s
              hideProgressBar={false}    // Show/hide progress bar
              newestOnTop={false}        // Newest toast on top
              closeOnClick               // Close on click
              rtl={false}                // Right-to-left support
              pauseOnFocusLoss           // Pause when tab is not active
              draggable                  // Allow dragging to dismiss
              theme="colored"            // Theme: light | dark | colored
            />
          </section>
        </div>
      </div>
      <NavComponent />
      <FooterComponent />
    </div>
  )
}

export default TemplateCheckListComponent