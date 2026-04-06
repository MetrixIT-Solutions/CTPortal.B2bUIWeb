/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Offcanvas from 'react-bootstrap/Offcanvas';
import moment from 'moment';
import classnames from 'classnames';
import NoData from '../../../assets/images/no-data.svg';

import { HeaderComponent } from '../../header';
import { NavComponent } from '../../navbar';
import { FooterComponent } from '../../footer';
import OfferLetterPopUpComponent from './OfferLetterPopUpComponent';
import CommonTooltip from '../../common/CommonTooltip';
import { getPtnsPriority, setPtnsPriority } from '../../../hooks/common';
import Loader from '../../loader/loader';
import hashHistory from '../../../hashHistory';

const OfferLetterListComponent = (props) => {
  const { rolesObj, ofrLtrList, ofrLtrListCount, actPgNum, searchStr, pageLimit, ofrLtrShow, loading, infoModal, empData, type, ofrLtrListCountObj, status, viewModal, ofrLtrData, olStatus, olNotes, updateModal, errMsg, disable, editModal, olcNum, priority, prModal, file, imgUrl, pdfShow, pdfUrl, pdfMessage, delModal } = props.state;
  const { handleRouteHome, setStateData, handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleOfrLtrMenu, handleClickOutside, ofrLtrRef, handleOfrLtrCreate, handleClose, statusClick, handleStatusUpdate, handleOfrLtrViewClick, handleOfrLtrUpdate, handleOfrLtrLifeCycleClick, handleOfrLtrFwlpClick, handlePrClick, handleOnchange, removeImage, fileInput, handleDownloadFiles, handleOfrLtrPdfView, handleDelClick } = props;

  const leftCount = ofrLtrListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= ofrLtrListCount ? rightCount : ofrLtrListCount;

  const { opnCount, rvwCount, isdCount } = ofrLtrListCountObj;
  const tCount = opnCount + rvwCount + isdCount;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Offer Letters List</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'>Offer Letters List</li>
                      <li className='breadcrumb-item active' aria-current='page'>List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
                <a className='btn btn-primary me-2' onClick={handleOfrLtrCreate}><i className='fa fa-plus'></i> Create</a>
              }
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12'>
                <div className='box'>
                  <div className='box-body'>
                    <ul className='nav nav-pills nav-fill'>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Open')} className={`${status.includes('Open') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ofrLtrListCountObj.opnCount}</h5>
                            <p className={`${status.includes('Open') ? 'mb-0' : 'mb-0'}`}>Open</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Review')} className={`${status.includes('Review') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ofrLtrListCountObj.rvwCount}</h5>
                            <p className={`${status.includes('Review') ? 'mb-0' : 'mb-0'}`}>Review</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Issued')} className={`${status.includes('Issued') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ofrLtrListCountObj.isdCount}</h5>
                            <p className={`${status.includes('Issued') ? 'mb-0' : 'mb-0'}`}>Issued</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a className='nav-link'>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{tCount}</h5>
                            <p className='mb-0'>All</p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-12'>
                <div className='box interview-box'>
                  <div className='box-body'>
                    <div className='dataTables_wrapper container-fluid'>
                      <div className='row mb-2'>
                        <div className='col-sm-12 col-md-6'>
                          <div className='dataTables_length'>
                            <label>Show <select className='form-select form-control-sm' value={pageLimit} onChange={handleChangeLimit}>
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='5'>5</option>
                              <option value='10'>10</option>
                              <option value='25'>25</option>
                              <option value='50'>50</option>
                              <option value='100'>100</option>
                            </select> entries </label>
                          </div>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                          <div id='example5_filter' className='dataTables_filter'>
                            <label>Search:
                              <input type='search' className='form-control form-control-sm' placeholder='' aria-controls='example5' value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                            </label>
                          </div>
                        </div>
                      </div>
                      {loading ? 
                        <div className='no-data text-center'>
                          <Loader/>
                        </div>   
                      : 
                      ofrLtrList && ofrLtrList.length > 0 ?
                        <div className='row'>
                          {ofrLtrList.map((item, i) => {
                            const refArr = item.euUID ? item.euUID.split(':') : [];
                            const refUID = refArr?.length > 1 ? refArr[1] : '';
                            const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');
                            const emMntr = item.rprtPrimary ? item.rprtPrimary.split(':') : [];
                            const mntrEmail = emMntr.length > 1 ? emMntr[1] : '';
                            const divcolor = item?.olStatus == 'Open' ? 'icon-grey' : (item?.olStatus == 'Review' ? 'icon-orange' : (item?.olStatus == 'Issued' ? 'icon-green' : 'icon-dark'));
                            const prtColor = item?.priority == '071' ? 'icon-dark' : (item?.priority == '051' ? 'icon-orange' : (item?.priority == '031' ? 'icon-blue' : 'icon-grey'));
                            return (
                              <div className='job-list_wrap' key={i}>
                                <div className='media-content ng-star-inserted'>
                                  <div className='media ng-star-inserted'>
                                    <div className='media-body'>
                                      <div className='jobdetails-left'>
                                        <div className='consultent-card'>
                                          <div className='profile_image'>
                                            <figure className='profile_image_wrap'>
                                              <div className={divcolor}>
                                                <CommonTooltip type='Icon' name='' className='fa-solid fa-circle-user' title={item?.olStatus || 'NA'} display='right' />
                                              </div>
                                            </figure>
                                          </div>
                                          <div>
                                            <h5 className='padb5'>
                                              <div className='d-flex'>
                                                <span><a onClick={() => window.open(`/#/consultant/view/${item.euUser}`)}>{item.euName}</a></span>
                                                <a onClick={() => setStateData({ infoModal: true, type: 'empInfo', empData: {title: item.euName + ' ' + '(' + refUID + ')', email: item.euEmID, mobile: item.euMobCcNum, linkedin: item.wrkUrls} })}>
                                                  <CommonTooltip type='Icon' name='' className='fas fa-info-circle ml-2' title='Info' display='top' />
                                                </a>
                                              </div>
                                            </h5>
                                            <h6 className='ng-star-inserted'>
                                              <span className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='fa-solid fa-users' title={'Team: ' + item.tName} display='top' /> <strong>{item.tName}</strong>
                                              </span>
                                              <span className='ng-star-inserted'>
                                                <CommonTooltip type='Icon' name='' className='far fa-calendar-days' title='Applied Date' display='top' /> {createdDt}
                                              </span>
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='jobdetails-center'>
                                        <>
                                          <h5 className='mb-2 d-flex'>
                                            <span className='info-btn'>
                                              <span className={item.olpApproved ? 'icon-green' : 'icon-red'}><CommonTooltip type='Icon' name='' className={item.olpApproved ? 'fas fa-user-check' : 'fas fa-user-xmark'} title={item.olpApproved ? 'Verified' : 'Not Verified'} display='top' /></span>
                                            </span>
                                            <span className='mx-2 text-muted' style={{ opacity: 0.5, fontSize: 18, lineHeight: 0.8 }}>|</span>
                                            <span>
                                              <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Reviewer' display='top' /><a onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item.rprtName, email: mntrEmail } })}> {item.rprtName}</a>
                                            </span>
                                          </h5>
                                          <h6 className='mb-0'>
                                            <span className='ng-star-inserted'>
                                              <CommonTooltip type='Icon' name='' className='fa-solid fa-clipboard-question' title='Case ID' display='top' /><a onClick={((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && item?.temp?.length > 0 ? () => hashHistory.push(`/checklist/${item._id}/Immigration Offer Letter`) :() => handleOfrLtrViewClick(item)}> {item.olcNum}</a>
                                            </span>
                                          </h6>
                                        </>
                                      </div>
                                      <div className='jobdetails-right'>
                                        <div className='rightside-btns'>
                                          <div className='dropdown' ref={(el) => ofrLtrRef[item._id] = el}>
                                            {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-info me-2' onClick={() => handleOfrLtrFwlpClick(item)} data-bs-toggle='tooltip' title='Offer Letter Notes'><i className='fa-solid fa-notes-medical'></i></button>}
                                            <a className='btn btn-xs btn-primary' onClick={() => handleOfrLtrMenu(item._id)} data-toggle='dropdown'><i className='fas fa-ellipsis'></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': ofrLtrShow === item._id })}>
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[10]?.isAlwd) || rolesObj?.appAcc) && item?.temp?.length > 0 && <a className='dropdown-item' onClick={() => hashHistory.push(`/checklist/${item._id}/Immigration Offer Letter`)} data-bs-toggle='tooltip' title='Petition Checklist'><i className="fa-solid fa-list-check"></i>Checklist</a>}
                                              {item.olStatus === 'Review' &&((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ updateModal: true, ofrLtrData: item, ofrLtrShow: '', olStatus: 'Issued' })} data-bs-toggle='tooltip' title='Issue Offer Letter'><i className='fa-solid fa-arrows-rotate'></i>Issue Offer Letter</a>}
                                              {item.olStatus === 'Issued' && ((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({ updateModal: true, ofrLtrData: item, ofrLtrShow: '', olStatus: 'Issued' })} data-bs-toggle='tooltip' title='Re-Issue Offer Letter'><i className="fa-solid fa-share-square"></i>Re-issue Offer Letter</a>}
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleOfrLtrViewClick(item)} data-bs-toggle='tooltip' title='View Details'><i className='fa-regular fa-eye'></i>View Details</a>}
                                              {item.olStatus === 'Issued' && ((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleOfrLtrPdfView(item.olfPath)} data-bs-toggle='tooltip' title='View Offer Letter'><i className="fa-solid fa-file-pdf"></i>View Offer Letter</a>}
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus !== 'Interview Scheduled') && <a className='dropdown-item' onClick={() => setStateData({ editModal: true, ofrLtrData: item, errMsg: '', olcNum: item.olcNum, })} data-bs-toggle='tooltip' title='Offer Letter Case Id Update'><i className='fa-regular fa-pen-to-square'></i>Update Case-ID</a>}
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleOfrLtrLifeCycleClick(item)} data-bs-toggle='tooltip' title='Offer Letter Lifecycle'><i className='fa-solid fa-rotate'></i>Lifecycle</a>}
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleOfrLtrFwlpClick(item)} data-bs-toggle='tooltip' title='Offer Letter Notes'><i className='fa-solid fa-notes-medical'></i>Notes</a>}
                                              {((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[11]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({delModal: true, ofrLtrData: item})} data-bs-toggle='tooltip' title='Offer Letter Delete'><i className='fa-regular fa-trash-can'></i>Delete</a>}
                                              {item.olStatus === 'Issued' && ((rolesObj?.access?.length >= 19 && rolesObj?.access[18]?.actions[8]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handleDownloadFiles(item)} data-bs-toggle='tooltip' title='DownLoad Offer Letter'><i className='fa-solid fa-download fa-lg text-dark'></i>Download</a>}
                                            </div>
                                          </div>
                                          <div className={`${(item.olStatus == 'Open') ? 'badge badge-primary' : item.olStatus == 'Review' ? 'badge badge-warning' : (item.olStatus == 'Issued') ? 'badge badge-success' : 'badge badge-dark'}`}><i className='fas fa-tasks'></i> {item.olStatus}</div>
                                          <div className={prtColor} onClick={() => setStateData({ prModal: true, ofrLtrData: item, priority: setPtnsPriority(item?.priority) || '' })}>
                                            <CommonTooltip type='Icon' name='' className='fa-solid fa-star' title={'Priority: ' + (item?.priority ? getPtnsPriority(item.priority) : 'N/A')} display='left' />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div> :
                        <div className='no-data'>
                          <img src={NoData}></img>
                          <p className='text-danger py-2'>No results found </p>
                        </div>
                      }

                      {ofrLtrListCount && ofrLtrListCount > 0 ?
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {data} of {ofrLtrListCount} entries</div>
                          </div>
                          <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={ofrLtrListCount}
                                  pageRangeDisplayed={5}
                                  onChange={handleChangePage}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {(infoModal || viewModal || updateModal || editModal || prModal || delModal) && (
        <OfferLetterPopUpComponent 
         infoModal={infoModal}
         empData={empData}
         type={type}
         setStateData={setStateData}
         handleClose={handleClose}
         viewModal={viewModal}
         ofrLtrData={ofrLtrData}
         updateModal={updateModal}
         handleStatusUpdate={handleStatusUpdate}
         olStatus={olStatus}
         olNotes={olNotes}
         errMsg={errMsg}
         disable={disable}
         editModal={editModal} 
         olcNum={olcNum}
         handleOfrLtrUpdate={handleOfrLtrUpdate}
         priority={priority} 
         prModal={prModal}
         handlePrClick={handlePrClick}
         file={file} 
         imgUrl={imgUrl}
         handleOnchange={handleOnchange} 
         removeImage={removeImage}
         fileInput={fileInput}
         handleDownloadFiles={handleDownloadFiles}
         rolesObj={rolesObj}
         handleOfrLtrPdfView={handleOfrLtrPdfView}
         delModal={delModal}
         handleDelClick={handleDelClick}
        />
      )}

      <Offcanvas show={pdfShow} onHide={handleClose} placement='end' style={{width: '70%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offer Letter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        {pdfUrl ? (
            <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
              <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a> instead.</p>
            </object>
          ) : (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '20px', paddingTop: '365px' }}>{pdfMessage}</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>

     <FooterComponent />
    </div>
  )
}

export default OfferLetterListComponent;
