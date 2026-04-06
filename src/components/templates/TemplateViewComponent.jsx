/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { Modal } from 'react-bootstrap';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import hashHistory from '../../hashHistory';
import Loader from '../loader/loader';
import Select from 'react-select/base';

const TemplateViewComponent = (props) => {
  const { loading, tempViewObj, rolesObj, tempData, userInfo, sectionData, showCases } = props.state;
  const { setStateData } = props;  
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <NavComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Template View</h3>
                <div className='d-inline-block align-items-center'>
                  <nav>
                    <ol className='breadcrumb'>
                      <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                      <li className='breadcrumb-item sub-path' onClick={() => hashHistory.push('/templates')} aria-current='page'>Templates</li>
                      <li className='breadcrumb-item active' aria-current='page'>View</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          <section className='content'>
            <div className='row'>
              <div className='col-12 col-lg-12 col-xl-12'>
                <div className='box'>
                  <div className='box-body'>
                    <div className='d-flex justify-content-between'>
                      <div>
                        <div className='d-flex'>
                          <div className='back'>
                            <a onClick={() => hashHistory.push('/templates')}>
                              <i className="fa-solid fa-arrow-left"></i>
                            </a>
                          </div>
                          <h5 className='box-title mb-0'>Template Details </h5>
                        </div>
                      </div>
                      {((rolesObj?.access?.length >= 17 && rolesObj?.access[16]?.actions[6]?.isAlwd) || rolesObj?.appAcc || userInfo?.refUID === tempViewObj.uRefID) &&
                        <div><a className='btn btn-sm btn-primary me-2' onClick={() => hashHistory.push(`/template/edit/${tempViewObj._id}`)}><i className="fa-solid fa-pen-to-square"></i></a></div>}
                    </div>
                    <hr className='my-2' />
                    {loading ? <div colspan={6}><Loader /></div> :
                      <div className='user-view'>
                        <div className='clearfix'></div>
                        <div className='row'>
                          {rolesObj?.appAcc && <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Organization</label>
                              <input type='text' className='form-control' value={tempViewObj?.orgName} disabled />
                            </div>
                          </div>}
                          {(rolesObj?.appAcc || userInfo?.userType === 'Management') && <>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Roles</label>
                                <Select isMulti value={tempViewObj?.urData} isDisabled />
                              </div>
                            </div>
                            <div className='col-md-3'>
                              <div className='form-group'>
                                <label>Teams</label>
                                <input type='text' className='form-control' value={tempViewObj?.tName} disabled />
                              </div>
                            </div>
                          </>}
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Status</label>
                              <input type='text' className='form-control' value={tempViewObj?.tStatus} disabled />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Category</label>
                              <input type='text' className='form-control' value={tempViewObj?.tempCat} disabled />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Template Name</label>
                              <input type='text' className='form-control' value={tempViewObj?.tempName} disabled />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Sequence</label>
                              <input type='text' className='form-control' value={tempViewObj?.tempSeq} disabled />
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>User</label>
                              <input type='text' className='form-control' value={tempViewObj?.uName} disabled />
                            </div>
                          </div>
                          <div className='col-md-6'>
                            <div className='form-group'>
                              <label>Notes</label>
                              <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={tempViewObj?.tempNotes} disabled></textarea>
                            </div>
                          </div>
                        </div>
                        {((rolesObj?.access?.length >= 17 && rolesObj?.access[16]?.actions[3]?.isAlwd) || rolesObj?.appAcc) && 
                        <div className='row mt-4'>
                          <div className='col-md-12'>
                            <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Template Data:</h5>
                            <hr className='my-15' />
                            {tempData && tempData.length > 0 && tempData.map((item, index) => {
                              return (
                                <div className='row' key={index}>
                                  <div className='col-md-2'>
                                    <div className='d-flex justify-content-between'>
                                      <div className='d-flex mt-4 me-3'>{item?.mandatory ? <p title='Mandatory'><i className="fa-solid fa-star fa-lg text-danger"></i></p> : <p title='Not Mandatory'><i className="fa-regular fa-star fa-lg text-danger"></i></p>}</div>
                                      <div className='form-group'>
                                        <label>Name</label>
                                        <input type='text' className='form-control' placeholder='Name' value={item._id} disabled />
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-md-1'>
                                    <div className='form-group'>
                                      <label>Sequence</label>
                                      <input type='text' className='form-control' placeholder='Sequence' value={item.seq} disabled />
                                    </div>
                                  </div>
                                  <div className='col-md-2'>
                                    <div className='form-group'>
                                      <label>Level</label>
                                      <input type='text' className='form-control' value={item.level} disabled />
                                    </div>
                                  </div>
                                  <div className='col-md-2'>
                                    <div className='form-group'>
                                      <label>Display</label>
                                      <input type='text' className='form-control' value={item.display} disabled />
                                    </div>
                                  </div>
                                  <div className='col-md-2'>
                                    <div className='form-group'>
                                      <label>Datatype</label>
                                      <div className='d-flex justify-content-between'>
                                        <input type='text' className='form-control me-2' value={item.dataType} disabled />
                                        <div>
                                          {item?.dataType === 'Section' && <span><a className='dropdown-item' onClick={() => setStateData({ showCases: true, sectionData: item })} data-bs-toggle="tooltip" title="Edit Template Details"><i className="fa-solid fa-eye"></i></a></span>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {(item.dataType !== '' && item.dataType !== 'Boolean' && item.dataType !== 'Dropdown' && item.dataType !== 'Date' && item.dataType !== 'Section') && 
                                  <div className='col-md-1'>
                                    <div className='form-group'>
                                      <label>Limit</label>
                                      <input type='text' className='form-control' value={item.limit} disabled />
                                    </div>
                                  </div>}
                                  {(item.dataType == 'Text' || item.dataType == 'Dropdown' || item.dataType == 'Table') &&
                                    <div className='col-md-2'>
                                      <div className='form-group'>
                                        <label>{item.dataType == 'Dropdown' ? 'Dropdown Data' : item.dataType == 'Table' ? 'Table Data' : 'Default Data'}</label>
                                        {(item.dataType == 'Dropdown' || item.dataType == 'Table') ?
                                          <>
                                            <Select value={item.defData} isDisabled isMulti />
                                          </>
                                          :
                                          <input type='text' className='form-control' placeholder='Default Data' value={item.defData} disabled />
                                        }
                                      </div>
                                    </div>}
                                  {(item.dataType == 'Image' || item.dataType == 'File' || item.dataType == 'Image/File') &&
                                    <div className='col-md-2'>
                                      <div className='form-group'>
                                        <label>Accepted Data</label>
                                        {item.dataType == 'Image' ? <Select value={item.accData ? item.accData : []} isMulti isDisabled /> :
                                          item.dataType == 'File' ? <Select value={item.accData ? item.accData : []} isMulti isDisabled /> : <Select value={item.accData ? item.accData : []} isMulti isDisabled />}
                                      </div>
                                    </div>}
                                </div>
                              )
                            })}
                          </div>
                        </div>}
                      </div>}
                  </div>
                  <div className='text-center mb-2'>
                    <button className='btn btn-secondary' onClick={() => hashHistory.push('/templates')} >Back</button>
                  </div>
                </div>
              </div>
              {/* /.col  */}
            </div>
            {/* /.row  */}
          </section>
          <Modal show={showCases} onHide={() => setStateData({ showCases: false, sectionData: {} })} size='lg'>
            <Modal.Header closeButton>
              <h5><strong>Sections</strong></h5>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Heading</label>
                      <input type='text' className='form-control' value={sectionData?.dataObj?.heading} disabled/>
                    </div>
                  </div>
                  {/* <div className='col-md-3'>
                    <div className='form-group'>
                      <label>Limit</label>
                      <input type='text' className='form-control' value={sectionData?.dataObj?.caseLimit} disabled/>
                    </div>
                  </div> */}
                </div>
                {sectionData?.dataObj?.tableArr?.length > 0 && sectionData?.dataObj?.tableArr.map((tItem, subIndex) => {
                  const subArr = tItem?.data;
                  return (
                    <div className='row tablerow' style={{ border: 1 }} key={subIndex}>
                      <div className='col-md-6'>
                        <div className='form-group'>
                          <label>Sub Heading</label>
                          <input type='text' className='form-control' value={tItem.subHeading} disabled />
                        </div>
                      </div>
                      <div className='col-md-4'>
                        <label>Table Structure</label>
                        <div className='form-group'>
                          <input type='text' className='form-control' value={tItem.tableStructure} disabled />
                        </div>
                      </div>
                      {tItem.tableStructure === 'Vertical' && <div className='col-md-2'>
                        <div className='form-group'>
                          <label>Limit</label>
                          <input type='text' className='form-control' value={tItem.limit} disabled />
                        </div>
                      </div>}
                      <table className="table mt-0 table-hover no-wrap table-striped dataTable no-footer">
                        <tbody>
                          {subArr?.length > 0 && subArr.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <td className='col-md-4'>
                                <div className='d-flex justify-content-between'>
                                  <div className='d-flex mt-4 me-3'>{row?.mandatory ? <p title='Mandatory'><i className="fa-solid fa-star fa-lg text-danger"></i></p> : <p title='Not Mandatory'><i className="fa-regular fa-star fa-lg text-danger"></i></p>}</div>
                                  <input type="text" className="form-control" value={row.label} disabled />
                                </div>
                              </td>
                              <td className='col-md-4'>
                                <input type="text" className="form-control" value={row.valueType} disabled />
                              </td>
                              {row.valueType === 'Dropdown' && <td className='col-md-4'>
                                <Select value={row.ddData} isDisabled isMulti />
                              </td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )
                })}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='btn btn-danger me-2' onClick={() => setStateData({ showCases: false, sectionData: {} })}>Back</button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default TemplateViewComponent