/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import Pagination from 'react-js-pagination';
import moment from 'moment';
import classnames from 'classnames';
import NoData from '../../../assets/images/no-data.svg';

import { HeaderComponent } from '../../header';
import { NavComponent } from '../../navbar';
import { FooterComponent } from '../../footer';
import CommonTooltip from '../../common/CommonTooltip';
import { getPtnsPriority, setPtnsPriority } from '../../../hooks/common';
import H1BPetitionsPopUpComponent from './H1BPetitionsPopUpComponent';
import hashHistory from '../../../hashHistory';
import Loader from '../../loader/loader';

const H1BPetitionsListComponent = (props) => {
  const { rolesObj, ptnsList, ptnsListCount, actPgNum, searchStr, pageLimit, ptnsShow, loading, ptnsListCountObj, status, updateModal, ptnsData, errMsg, disable, infoModal, empData, type, euName, pcNum, pType, rprtName, tName, pStatus, viewModal, createdDt, euEmID, euMobCcNum, editModal, caseId, rprtPrimary, ptnStatus, psNotes, prModal, priority, psStatus, delModal } = props.state;
  const { handleChangeSearch, handleKeyInput, handleChangePage, handleChangeLimit, handleRouteHome, setStateData, handleH1BPtnsCreate, ptnsRef, handleClickOutside, handlePtnsMenu, statusClick, handleStatusUpdate, handleClose, handlePtnsViewClick, handlePtnsUpdate, handlePetitionsLifeCycle, handlePrClick, handlePetitionsFollowUpNotes, handleDelClick } = props;

  const leftCount = ptnsListCount == 0 ? '0' : ((actPgNum - 1) * Number(pageLimit)) + 1;
  const rightCount = actPgNum * pageLimit;
  const data = rightCount <= ptnsListCount ? rightCount : ptnsListCount;

  const { opnCount, rvwCount, sbmtdCount } = ptnsListCountObj;
  const tCount = opnCount + rvwCount + sbmtdCount;

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
                <h3 className='page-title'>H1B Petitions List</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={handleRouteHome}><i className='fa-solid fa-house'></i></a></li>
                      <li className='breadcrumb-item' aria-current='page'>H1B Petitions List</li>
                      <li className='breadcrumb-item active' aria-current='page'>List</li>
                    </ol>
                  </nav>
                </div>
              </div>
              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[2]?.isAlwd) || rolesObj?.appAcc) &&
                <a className='btn btn-primary me-2' onClick={handleH1BPtnsCreate}><i className='fa fa-plus'></i> Create</a>
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
                            <h5 className='font-weight-600'>{ptnsListCountObj.opnCount}</h5>
                            <p className={`${status.includes('Open') ? 'mb-0' : 'mb-0'}`}>Open</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Review')} className={`${status.includes('Review') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ptnsListCountObj.rvwCount}</h5>
                            <p className={`${status.includes('Review') ? 'mb-0' : 'mb-0'}`}>Review</p>
                          </div>
                        </a>
                      </li>
                      <li className='nav-item b-1'>
                        <a onClick={() => statusClick('Submitted')} className={`${status.includes('Submitted') ? 'nav-link active' : 'nav-link'}`}>
                          <div className='text-center'>
                            <h5 className='font-weight-600'>{ptnsListCountObj.sbmtdCount}</h5>
                            <p className={`${status.includes('Submitted') ? 'mb-0' : 'mb-0'}`}>Submitted</p>
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
                      : ptnsList && ptnsList.length > 0 ?
                        <div className='row'>
                          {ptnsList.map((item, i) => {
                            const refArr = item.euUID ? item.euUID.split(':') : [];
                            const refUID = refArr?.length > 1 ? refArr[1] : '';
                            const createdDt = moment(item.cDtStr, 'YYYY-MM-DD HH:mm:ss').format('DD MMM, YYYY');
                            const emMntr = item.rprtPrimary ? item.rprtPrimary.split(':') : [];
                            const mntrEmail = emMntr.length > 1 ? emMntr[1] : ''
                            const divcolor = item?.psStatus == 'Submitted' ? 'icon-dark' : (item?.psStatus == 'Approved' ? 'icon-green' : (item?.psStatus == 'Denied' ? 'icon-red' : (item?.psStatus == 'RFE' ? 'icon-orange' : 'icon-grey')));
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
                                                <CommonTooltip type='Icon' name='' className='fa-solid fa-circle-user' title={'Submitted: ' + (item.psStatus || 'NA')} display='right' />
                                              </div>
                                            </figure>
                                          </div>
                                          <div>
                                            <h5 className='padb5'>
                                              <div className='d-flex'>
                                                <span><a onClick={() => window.open(`/#/consultant/view/${item.euUser}`)}>{item.euName}</a></span>
                                                <a onClick={() => setStateData({ infoModal: true, type: 'empInfo', empData: { title: item.euName + ' ' + '(' + refUID + ')', email: item.euEmID, mobile: item.euMobCcNum, linkedin: item.wrkUrls } })}>
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
                                              <span className={item.ppApproved ? 'icon-green' : 'icon-red'}><CommonTooltip type='Icon' name='' className={item.ppApproved ? 'fas fa-user-check' : 'fas fa-user-xmark'} title={item.ppApproved ? 'Verified' : 'Not Verified'} display='top' /></span>
                                            </span>
                                            <span className='mx-2 text-muted' style={{ opacity: 0.5, fontSize: 18, lineHeight: 0.8 }}>|</span>
                                            <span>
                                              <CommonTooltip type='Icon' name='' className='fas fa-user-tie' title='Reviewer' display='top' /><a onClick={() => setStateData({ infoModal: true, type: 'mentor', empData: { title: item.euName + ' ' + '(' + refUID + ')', name: item.rprtName, email: mntrEmail } })}> {item.rprtName}</a>
                                            </span>
                                          </h5>
                                          <h6 className='mb-0'>
                                            <span className='ng-star-inserted'>
                                              <CommonTooltip type='Icon' name='' className='fa-regular fa-file-lines' title='Petition Type' display='top' /> {item.pType}</span>
                                            <span className='ng-star-inserted'>
                                              <CommonTooltip type='Icon' name='' className='fa-solid fa-clipboard-question' title='Case ID' display='top' /><a onClick={((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && item?.temp?.length > 0 ? () => hashHistory.push(`/checklist/${item._id}/Immigration H1B Petition`) : () => handlePtnsViewClick(item)}> {item.pcNum}</a>
                                            </span>
                                          </h6>
                                        </>
                                      </div>
                                      <div className='jobdetails-right'>
                                        <div className='rightside-btns'>
                                          <div className='dropdown' ref={(el) => ptnsRef[item._id] = el}>
                                            {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <button className='btn btn-sm btn-info me-2' onClick={() => handlePetitionsFollowUpNotes(item)} data-bs-toggle='tooltip' title='H1B Petition Notes'><i className='fa-solid fa-notes-medical'></i></button>}
                                            {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && item.pStatus == 'Review' && <button className='btn btn-sm btn-success me-2' onClick={() => setStateData({ updateModal: true, ptnsData: item, ptnsShow: '', psStatus: item.psStatus })} data-bs-toggle='tooltip' title='Petition Submitted'><i className='fa-solid fa-arrows-rotate'></i></button>}
                                            <a className='btn btn-xs btn-primary' onClick={() => handlePtnsMenu(item._id)} data-toggle='dropdown'><i className='fas fa-ellipsis'></i></a>
                                            <div className={classnames('dropdown-menu dropdown-menu-right', { 'show': ptnsShow === item._id })}>
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[5]?.isAlwd) || rolesObj?.appAcc) && item?.temp?.length > 0 && <a className='dropdown-item' onClick={() => hashHistory.push(`/checklist/${item._id}/Immigration H1B Petition`)} data-bs-toggle='tooltip' title='Petition Checklist'><i className="fa-solid fa-list-check"></i>Checklist</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[4]?.isAlwd) || rolesObj?.appAcc) && item.pStatus == 'Review' && <a className='dropdown-item' onClick={() => setStateData({ updateModal: true, ptnsData: item, ptnsShow: '', psStatus: item.psStatus })} data-bs-toggle='tooltip' title='Petition Submitted'><i className='fa-solid fa-arrows-rotate'></i>Petition Submitted</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[1]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handlePtnsViewClick(item)} data-bs-toggle='tooltip' title='View Petitions Details'><i className='fa-regular fa-eye'></i>View Details</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && (item.sStatus !== 'Interview Scheduled') && <a className='dropdown-item' onClick={() => setStateData({ editModal: true, ptnsData: item, errMsg: '', caseId: item.pcNum, })} data-bs-toggle='tooltip' title='Petition Case Id Update'><i className='fa-regular fa-pen-to-square'></i>Update Case-ID</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[6]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handlePetitionsLifeCycle(item)} data-bs-toggle='tooltip' title='Petition Lifecycle'><i className='fa-solid fa-rotate'></i>Lifecycle</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[7]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => handlePetitionsFollowUpNotes(item)} data-bs-toggle='tooltip' title='H1B Petition Notes'><i className='fa-solid fa-notes-medical'></i>Notes</a>}
                                              {((rolesObj?.access?.length >= 20 && rolesObj?.access[19]?.actions[9]?.isAlwd) || rolesObj?.appAcc) && <a className='dropdown-item' onClick={() => setStateData({delModal: true, ptnsData: item})} data-bs-toggle='tooltip' title='H1B Petition Delete'><i className='fa-regular fa-trash-can'></i>Delete</a>}
                                            </div>
                                          </div>
                                          <div className={`${(item.pStatus == 'Open') ? 'badge badge-primary' : item.pStatus == 'Review' ? 'badge badge-warning' : (item.pStatus == 'Submitted') ? 'badge badge-success' : 'badge badge-dark'}`}><i className='fas fa-tasks'></i>  {item.pStatus}</div>
                                          <div className={prtColor} onClick={() => setStateData({ prModal: true, ptnsData: item, priority: setPtnsPriority(item?.priority) || '' })}>
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

                      {ptnsListCount && ptnsListCount > 0 ?
                        <div className='row'>
                          <div className='col-sm-12 col-md-5'>
                            <div className='dataTables_info' id='example5_info' role='status' aria-live='polite'>Showing {leftCount} to {data} of {ptnsListCount} entries</div>
                          </div>
                          <div className='col-sm-12 col-md-7'>
                            <div className='dataTables_paginate paging_simple_numbers' id='example5_paginate'>
                              <div className='paginate_button page-item active'>
                                <Pagination
                                  className='mt-0'
                                  activePage={actPgNum}
                                  itemsCountPerPage={Number(pageLimit)}
                                  totalItemsCount={ptnsListCount}
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
      {(updateModal || infoModal || viewModal || editModal || prModal || delModal) &&
        (<H1BPetitionsPopUpComponent
          updateModal={updateModal}
          infoModal={infoModal}
          viewModal={viewModal}
          setStateData={setStateData}
          errMsg={errMsg}
          ptnsData={ptnsData}
          disable={disable}
          empData={empData}
          type={type}
          euName={euName}
          pcNum={pcNum}
          pType={pType}
          rprtName={rprtName}
          tName={tName}
          pStatus={pStatus}
          createdDt={createdDt}
          handleStatusUpdate={handleStatusUpdate}
          handleClose={handleClose}
          euEmID={euEmID}
          euMobCcNum={euMobCcNum}
          editModal={editModal}
          caseId={caseId}
          handlePtnsUpdate={handlePtnsUpdate}
          rprtPrimary={rprtPrimary}
          ptnStatus={ptnStatus}
          psNotes={psNotes}
          prModal={prModal}
          handlePrClick={handlePrClick}
          priority={priority}
          psStatus={psStatus}
          delModal={delModal}
          handleDelClick={handleDelClick}
        />)
      }
      <FooterComponent />
    </div>
  )
}

export default H1BPetitionsListComponent;
