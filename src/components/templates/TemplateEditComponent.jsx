/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { HeaderComponent } from '../header';
import { NavComponent } from '../navbar';
import { FooterComponent } from '../footer';
import { firstCharCaps, initCaps, numebersOnly } from '../../hooks/common';
import hashHistory from '../../hashHistory';
import dTypes from '../../../public/data/Lookups.json';
import { Modal } from 'react-bootstrap';

const TemplateEditComponent = (props) => {
  const { orgId, teamId, roleId, tempName, tempSeq, tempCat, tempNotes, uName, tStatus, tempData, disable, errIndex, tempErrMsg, errMsg, rolesObj, userInfo, showCases, sectionData, dataChangeModal } = props.state;
  const { setStateData, tempOnChange, handleEdit, handleAddField, handleDeleteField, isManClick, handleSelection, tableInptChange, handleAddCase, addRow, deleteRow, handleCloseCase, addSubHeading, dltSubHeading, tableChange, isTableManClick, handleBack } = props;
  return (
    <div className='wrapper'>
      <HeaderComponent />
      <div className='content-wrapper'>
        <div className='container-full'>
          <div className='content-header'>
            <div className='d-flex align-items-center'>
              <div className='mr-auto'>
                <h3 className='page-title'>Edit Template</h3>
                <div className='d-inline-block align-items-center'>
                  <ol className='breadcrumb'>
                    <li className='breadcrumb-item'><a onClick={() => hashHistory.push('/home')}><i className='fa-solid fa-home'></i></a></li>
                    <li className='breadcrumb-item' aria-current='page'><a onClick={() => hashHistory.push('/templates')}>Templates</a></li>
                    <li className='breadcrumb-item active' aria-current='page'>Edit</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Main content */}
          <section className='content'>
            <div className='row'>
              <div className='col-md-12 col-12'>
                <div className='box'>
                  <div className='bs-stepper mt-3'>
                    <div className='bs-stepper-content'>
                      <div className='row'>
                        {rolesObj?.appAcc && <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Organization</label>
                            <input type='text' className='form-control' value={orgId} disabled />
                          </div>
                        </div>}
                        {(rolesObj?.appAcc || userInfo?.userType === 'Management') && <>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Roles</label>
                              <Select isMulti value={roleId} isDisabled/>
                            </div>
                          </div>
                          <div className='col-md-3'>
                            <div className='form-group'>
                              <label>Teams</label>
                              <input type='text' className='form-control' value={teamId} disabled />
                            </div>
                          </div>
                        </>}
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Status</label>
                            <select className='form-select form-control' value={tStatus} onChange={(e) => setStateData({ tStatus: e.target.value, errMsg: '', isUpdate: true })}>
                              <option value=''>Select</option>
                              <option value='Active'>Active</option>
                              <option value='Inactive'>Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Category</label>
                            <input type='text' className='form-control' value={tempCat} disabled />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Template Name</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Template Name' value={tempName} onChange={(e) => setStateData({ tempName: initCaps(e.target.value), errMsg: '', tempErrMsg: [], errIndex: null, isUpdate: true })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>Sequence</label><span className='text-danger'>*</span>
                            <input type='text' className='form-control' placeholder='Sequence' maxLength={3} value={tempSeq} onKeyPress={numebersOnly} onChange={(e) => setStateData({ tempSeq: e.target.value, errMsg: '', tempErrMsg: [], errIndex: null, isUpdate: true })} />
                          </div>
                        </div>
                        <div className='col-md-3'>
                          <div className='form-group'>
                            <label>User</label>
                            <input type='text' className='form-control' value={uName || ''} disabled />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='form-group'>
                            <label>Notes</label>
                            <textarea name='decisions' id='decisions3' rows='4' className='form-control' value={tempNotes} onChange={(e) => setStateData({ tempNotes: firstCharCaps(e.target.value), errMsg: '', tempErrMsg: [], errIndex: null, isUpdate: true })}></textarea>
                          </div>
                        </div>
                      </div>
                      <div className='row mt-4'>
                        <div className='col-md-12'>
                          <h5 className='box-title text-info'><i className='fa-regular fa-address-book'></i> Template Data:</h5>
                          <hr className='my-15' />
                          {tempData && tempData.length > 0 && tempData.map((item, index, arr) => {
                            return (
                              <div className='row' key={index}>
                                <div className='col-md-2'>
                                  <div className='d-flex justify-content-between'>
                                    <div className='d-flex mt-4 me-3'>{item?.mandatory ? <a title='Mandatory' onClick={() => isManClick(false, item?._id)}><i className="fa-solid fa-star fa-lg text-danger"></i></a> : <a title='Not Mandatory' onClick={() => isManClick(true, item?._id)}><i className="fa-regular fa-star fa-lg text-danger"></i></a>}</div>
                                    <div className='form-group'>
                                      <label>Name</label><span className='text-danger'>*</span>
                                      <input type='text' className='form-control' placeholder='Name' name='_id' value={item?._id} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)} />
                                      {errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index]._id && <div className='text-danger'>{errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index]._id}</div>}
                                    </div>
                                  </div>
                                </div>
                                <div className='col-md-1'>
                                  <div className='form-group'>
                                    <label>Sequence</label><span className='text-danger'>*</span>
                                    <input type='text' className='form-control' placeholder='Sequence' name='seq' onKeyPress={numebersOnly} maxLength={3} value={item?.seq} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)} />
                                    {errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].seq && <div className='text-danger'>{errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].seq}</div>}
                                  </div>
                                </div>
                                <div className='col-md-2'>
                                  <div className='form-group'>
                                    <label>Level</label>
                                    <select className='form-select' name='level' value={item?.level} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)}>
                                      <option value='Organization'>Organization</option>
                                      <option value='Consultant'>Consultant</option>
                                    </select>
                                  </div>
                                </div>
                                <div className='col-md-2'>
                                  <div className='form-group'>
                                    <label>Display</label>
                                    <select className='form-select' name='display' value={item?.display} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)}>
                                      <option value='Hide'>Hide</option>
                                      <option value='Show'>Show</option>
                                      <option value='Show Always'>Show Always</option>
                                    </select>
                                  </div>
                                </div>
                                <div className='col-md-2'>
                                  <div className='form-group'>
                                    <div className='d-flex justify-content-between'>
                                      <div>
                                        <label>Datatype</label><span className='text-danger'>*</span>
                                        <div className='d-flex'>
                                          <select className='form-select me-2' name='dataType' value={item.dataType} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)}>
                                            <option value=''>Select</option>
                                            <option value='Text'>Text</option>
                                            <option value='Boolean'>Yes/No</option>
                                            <option value='Number'>Number</option>
                                            <option value='Dropdown'>Dropdown</option>
                                            <option value='Date'>Date</option>
                                            <option value='Table'>Table</option>
                                            <option value='Image'>Image</option>
                                            <option value='File'>File</option>
                                            <option value='Image/File'>Image/File</option>
                                            <option value='Section'>Section</option>
                                          </select>
                                          <div>
                                            {item?.dataType === 'Section' && <span><a className='dropdown-item' onClick={() => setStateData({ showCases: true, sectionData: item, tempIndex: index, errMsg:'' })} data-bs-toggle="tooltip" title="Edit Template Details"><i className="fa-regular fa-pen-to-square"></i></a></span>}
                                          </div>
                                        </div>
                                      </div>
                                    {(item?.dataType == 'Number' || item?.dataType == 'Image' || item?.dataType == 'File' || item?.dataType == 'Image/File') ?
                                    <div className='col-md-6'>
                                    <label>Limit</label><span className='text-danger'>*</span>
                                      <select className='form-select' value={item?.limit} name='limit' onChange={(e) => tempOnChange(e, 'tempData', index, '', item)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                      </select>
                                    </div> :
                                    (item?.dataType == 'Text' || item?.dataType == 'Table') ? <div className='col-md-6'>
                                      <label>Limit</label><span className='text-danger'>*</span>
                                      <select className='form-select' value={item?.limit} name='limit' onChange={(e) => tempOnChange(e, 'tempData', index, '', item)}>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value={250}>250</option>
                                        <option value={500}>500</option>
                                        <option value={1000}>1000</option>
                                      </select>
                                    </div>:''}
                                    </div>
                                    {errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].dataType && <div className='text-danger'>{errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].dataType}</div>}
                                  </div>
                                </div>
                                {(item?.dataType == 'Text' || item?.dataType == 'Dropdown' || item?.dataType == 'Table') &&
                                  <div className='col-md-2'>
                                    <div className='form-group'>
                                      <label>{(item?.dataType == 'Dropdown') ? 'Dropdown Data' : item?.dataType == 'Table' ? 'Table Data' : 'Default Data'}</label>{(item?.dataType == 'Dropdown' || item?.dataType == 'Table') ? <span className='text-danger'>*</span> : ''}
                                      {(item?.dataType == 'Dropdown' || item?.dataType == 'Table') ?
                                        <>
                                          <CreatableSelect value={item?.defData} isMulti onChange={(e) => tempOnChange(e, 'tempData', index, 'defData', item)} />
                                          {errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].defData && <div className='text-danger'>{errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].defData}</div>}
                                        </>
                                        :
                                        <input type='text' className='form-control' placeholder='Default Data' name='defData' value={item?.defData} onChange={(e) => tempOnChange(e, 'tempData', index, '', item)} />
                                      }
                                    </div>
                                  </div>}
                                {(item?.dataType == 'Image' || item?.dataType == 'File' || item?.dataType == 'Image/File') &&
                                  <div className='col-md-2'>
                                    <div className='form-group'>
                                      <label>Accepted Data</label><span className='text-danger'>*</span>
                                      {item?.dataType == 'Image' ? 
                                      (<Select
                                        style={{zIndex: 999}}
                                        options={dTypes.imgTypes || []}
                                        value={item?.accData ? item?.accData : []}
                                        onChange={(data) => tempOnChange(data, 'tempData', index, 'accData', item)}
                                        isMulti
                                      />) : item?.dataType == 'File' ?
                                        (<Select
                                          style={{zIndex: 999}}
                                          options={dTypes.fileTypes || []}
                                          value={item?.accData ? item?.accData : []}
                                          onChange={(data) => tempOnChange(data, 'tempData', index, 'accData', item)}
                                          isMulti
                                        />) :
                                        (<Select
                                          style={{zIndex: 999}}
                                          options={[...dTypes.imgTypes, ...dTypes.fileTypes]}
                                          value={item?.accData ? item?.accData : []}
                                          onChange={(data) => tempOnChange(data, 'tempData', index, 'accData', item)}
                                          isMulti
                                        />)}
                                      {errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].accData && <div className='text-danger'>{errIndex == index && tempErrMsg.length > 0 && tempErrMsg[index].accData}</div>}
                                    </div>
                                  </div>}
                                
                                {index == arr.length - 1 && <div className='col-md-1'>
                                  <div className='d-flex' style={{ marginTop: 22 }}>
                                    {tempData.length <= 60 && < button type='button' className='waves-effect waves-light btn btn-success me-2' onClick={handleAddField}><i className='fa-solid fa-plus'></i> </button>}
                                    {index !== 0 && <a onClick={() => handleDeleteField(index)} className='d-flex justify-content-center'><i className="fa-solid fa-trash text-danger d-flex align-items-center" style={{ fontSize: 25, cursor: 'pointer' }}></i></a>}
                                  </div>
                                </div>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className='text-center text-danger'>{errMsg}</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <button className='btn btn-danger mr-2' onClick={handleBack}>Cancel</button>
                        <button className='btn btn-primary' disabled={disable} onClick={handleEdit}>Update</button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /.box*/}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Modal show={showCases} onHide={handleCloseCase} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>Sections</strong></h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group'>
                  <label>Heading</label><span className='text-danger'>*</span>
                  <input type='text' className='form-control' placeholder='Heading' name='heading' value={sectionData?.dataObj?.heading} onChange={(e) => tableChange(e, 'heading')} />
                </div>
              </div>
              {/* <div className='col-md-3'>
                <div className='form-group'>
                  <label>Limit</label>
                  <select className='form-select' value={sectionData?.dataObj?.caseLimit} onChange={(e) => tableChange(e, 'caseLimit')}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </div>
              </div> */}
            </div>
            {sectionData?.dataObj?.tableArr?.length > 0 && sectionData?.dataObj?.tableArr.map((tItem, subIndex, sArr) => {
              const subArr = tItem?.data;
              return (
                <div className='row tablerow' style={{ border: 1 }} key={subIndex}>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <label>Sub Heading</label>
                      <input type='text' className='form-control me-2' placeholder='Sub Heading' name='subHeading' value={tItem.subHeading} onChange={(e) => handleSelection(e, 'subHeading', subIndex)} />
                    </div>
                  </div>
                  <div className='col-md-4'>
                    <label>Table Structure</label>
                    <div className='form-group'>
                      <select className='form-select me-2' value={tItem.tableStructure} onChange={(e) => handleSelection(e, 'tableStructure', subIndex)} >
                        <option value=''>Select</option>
                        <option value='Horizontal'>Horizontal</option>
                        <option value='Vertical'>Vertical</option>
                      </select>
                    </div>
                  </div>
                  {tItem.tableStructure === 'Vertical' && <div className='col-md-2'>
                    <div className='form-group'>
                      <label>Limit</label>
                      <select className='form-select' value={tItem.limit} onChange={(e) => handleSelection(e, 'limit', subIndex)}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                      </select>
                    </div>
                  </div>}
                  <table className="table mt-0 table-hover no-wrap table-striped dataTable no-footer">
                    <tbody>
                      {subArr?.length > 0 && subArr.map((row, rowIndex, rowArr) => (
                        <tr key={rowIndex}>
                          <td className='col-md-4'>
                            <div className='d-flex justify-content-between'>
                              <div className='d-flex mt-4 me-3'>{row?.mandatory ? <a title='Mandatory' onClick={() => isTableManClick(false, row.label, rowIndex, subIndex)}><i className="fa-solid fa-star fa-lg text-danger"></i></a> : <a title='Not Mandatory' onClick={() => isTableManClick(true, row.label, rowIndex, subIndex)}><i className="fa-regular fa-star fa-lg text-danger"></i></a>}</div>
                              <input
                                type="text"
                                className="form-control"
                                value={row.label}
                                onChange={(e) => tableInptChange(e, 'label', subIndex, rowIndex)}
                              />
                            </div>
                          </td>
                          <td className='col-md-4'>
                            <select className="form-select" value={row.valueType} onChange={(e) => tableInptChange(e, 'valueType', subIndex, rowIndex)}>
                              <option value="">Select</option>
                              <option value="Text">Text</option>
                              <option value="Number">Number</option>
                              <option value="Date">Date</option>
                              <option value='Dropdown'>Dropdown</option>
                            </select>
                          </td>
                          {row.valueType === 'Dropdown' && <td className='col-md-4'>
                            <CreatableSelect isMulti value={row.ddData} onChange={(e) => tableInptChange(e, 'ddData', subIndex, rowIndex)} />
                          </td>}
                          <td>
                            {rowIndex == rowArr.length - 1 && <div className='d-flex'>
                              {rowIndex < 19 && <button className='btn btn-success me-2' onClick={() => addRow(subIndex)}>Add</button>}
                              {rowIndex !== 0 && <a className='d-flex justify-content-center' onClick={() => deleteRow(subIndex, rowIndex)}> <i className="fa-solid fa-trash text-danger d-flex align-items-center" style={{ fontSize: 25, cursor: 'pointer' }}></i></a>}
                            </div>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {subIndex == sArr.length - 1 && <div className='d-flex justify-content-center mb-3'>
                    {subIndex < 4 && <button className='btn btn-primary me-2' onClick={addSubHeading}>Add</button>}
                    {subIndex !== 0 && <a className='d-flex justify-content-center' onClick={() => dltSubHeading(subIndex)}> <i className="fa-solid fa-trash text-danger d-flex align-items-center" style={{ fontSize: 25, cursor: 'pointer' }}></i></a>}
                  </div>}
                </div>
              )
            })}
          </div>
          {/* )
          })} */}
        </Modal.Body>
        <div className='text-danger text-center'>{errMsg}</div>
        <Modal.Footer>
          <button className='btn btn-danger me-2' onClick={handleCloseCase}>Back</button>
          <button className='btn btn-primary' onClick={handleAddCase}>Save</button>
        </Modal.Footer>
      </Modal>
      <Modal show={dataChangeModal} onHide={() => setStateData({ dataChangeModal: false })} size='md-down'>
        <Modal.Body>
          <div className='row'>
            <div className='d-flex justify-content-center'>
              <div>
                <i className="fa-solid fa-triangle-exclamation fa-8x text-warning d-flex justify-content-center m-3"></i>
                <div className='d-flex justify-content-center m-3'>
                  <div className='text-center'>
                    <h5>Your changes have not been saved. </h5>
                    <h6>Are you sure you want to go back?</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger me-2' onClick={() => setStateData({ dataChangeModal: false })}>No</button>
          <button className='btn btn-success' onClick={() => { setStateData({ isUpdate: false, dataChangeModal: false }), hashHistory.push('/templates') }}>Yes</button>
        </Modal.Footer>
      </Modal>
      <NavComponent />
      <FooterComponent />
    </div>
  )
}

export default TemplateEditComponent;