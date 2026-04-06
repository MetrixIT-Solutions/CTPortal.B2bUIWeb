
/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';

import { numebersOnly } from '../../hooks/common';
import moment from 'moment';
import { Modal } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import TooltipComponent from '../tootltip/TooltipComponent';
import ChecklistExpandComponent from './ChecklistExpandComponent';
import Offcanvas from 'react-bootstrap/Offcanvas';


const ChecklistCreateComponent = (props) => {
  const { userInfo, checkListArr, tempChange, editClick, removeImage, actTab, updateModal, setStateData, docObj, openIndex, errMsg, handleOpenEdit, isprImage, handleClosePopup, handleDownloadFiles, tableModal, tdtgData, tableChange, addTable, deleteTable, errors, isDisable, sectionModal, handleAddVertTable, handleDltVertTable,
    handleHorTableChange, handleVerTableChange, subArrAddBtnCLick, subArrDltBtnCLick, errMsgs, isApprModal, handleApprove, rolesObj, tCat, handleOnChange, handleClickExpand, schId, handleKeyDown, isLoading, handleOfrLtrPdfView, pdfShow, pdfUrl, pdfMessage } = props;
  const onBoardActions = (rolesObj?.access?.length >= 21 && rolesObj?.access[20]);
  const petitionActions = (rolesObj?.access?.length >= 22 && rolesObj?.access[21]);
  const inmarketActions = (rolesObj?.access?.length >= 23 && rolesObj?.access[22]);
  const bgvActions = (rolesObj?.access?.length >= 24 && rolesObj?.access[23]);
  const offerletterActions = (rolesObj?.access?.length >= 25 && rolesObj?.access[24]);
  const actions = tCat === 'Consultant On Boarding' ? onBoardActions : tCat === 'Consultant In Marketing' ? inmarketActions : tCat === 'Consultant BGV' ? bgvActions : tCat === 'Immigration Offer Letter' ? offerletterActions : petitionActions;
  const imgPath = docObj?.displayImgs;

  return (
    <div className='dataTables_wrapper'>
      <div className='row'>
        <div className="row">
          <div className="col-12">
            <div className='col-md-12'>
              {actTab == '0' ?
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th scope='col'>File Name</th>
                      <th scope='col'>Record Type</th>
                      <th scope='col'>Date Modified</th>
                      <th scope='col'>Modified By</th>
                      <th scope='col'>Verified/Not Verified</th>
                      <th scope='col' className='text-center'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkListArr && checkListArr.length > 0 ? checkListArr.map((item, i) => {
                      const offset = new Date().getTimezoneOffset();
                      const date = moment(item.uDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                      const status = item.tdFlag ? (item.tdStatus ? 'Verified' : 'Not Verified') : '';
                      return (
                        <>
                          {(userInfo.userRole == 'Employee' && item.tdDisplay == 'Hide' && item.tdLevel == 'Consultant') ? '' :
                            <tr key={i}>
                              <td>{item.tdId}{" "}{item.displayImgs?.length > 0 && <span className='text-success fw-bold'> - ({item.displayImgs?.length})</span>}</td>
                              <td className={item.tdLevel == 'Organization' ? 'text-primary fw-bold' : 'text-warning fw-bold'}>{item.tdLevel}</td>
                              <td>{date}</td>
                              <td>{item.uuName}</td>
                              {<td className={`${status == 'Verified' ? 'text-success fw-bold' : 'text-danger fw-bold'}`}>{status}</td>}
                              <td className='justify-content-center d-flex'>
                                {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && (item.tdFlag && !item.tdStatus)) && <div className='me-2'><a className='dropdown-item' title='Approve' data-bs-toggle="tooltip" onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="far fa-check-circle  text-success"></i></a></div>}
                                {((actions?.actions?.length > 0 && actions.actions[3]?.isAlwd || rolesObj?.appAcc) && item.displayImgs?.length > 0) && <div className='me-2'><a className='dropdown-item' title='Zoom' data-bs-toggle="tooltip" onClick={() => setStateData({ isprImage: true, docObj: item })}><i className="fa-solid fa-magnifying-glass-plus  text-primary"></i></a></div>}
                                {((actions?.actions?.length > 0 && actions.actions[2]?.isAlwd || rolesObj?.appAcc) && item.displayImgs?.length > 0) && <div className='me-2'><a className='dropdown-item' title='Download' data-bs-toggle="tooltip" onClick={() => handleDownloadFiles(item.displayImgs)}><i className="fa-solid fa-download  text-success"></i></a></div>}
                                {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <div className='me-2'><a className='dropdown-item' title='Update' data-bs-toggle="tooltip" onClick={() => setStateData({ updateModal: true, docObj: item })}><i className="fa-solid fa-pen-to-square  text-primary"></i></a></div>}
                              </td>
                            </tr>
                          }
                        </>
                      )
                    }) : <tr>
                      <td colSpan={6}>
                        <div className='text-center py-3'>
                          <strong>No data</strong>
                        </div>
                      </td>
                    </tr>}
                  </tbody>
                </table> :
                <table className="table table-bordered">
                  <thead className="thead-light">
                    <tr>
                      <th></th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Name Data</th>
                      <th scope='col'>Record Type	</th>
                      <th scope='col'>Date Modified</th>
                      <th scope='col'>Modified By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkListArr && checkListArr.length > 0 ? checkListArr.map((item, i) => {
                      const offset = new Date().getTimezoneOffset();
                      const date = moment(item.uDtStr, 'YYYY-MM-DD HH:mm').subtract(offset, 'minutes').format('DD MMM, YYYY HH:mm');
                      const status = item.tdFlag ? (item.tdStatus ? 'Verified' : 'Not Verified') : '';
                      const dt = item.value && item.tdDataType === 'Date' ? moment(item.value).format('DD MMM, YYYY') : '';
                      const sD = schId.find(item1 => item1 == item._id);
                      return (
                        <>
                          {(userInfo.userRole == 'Employee' && item.tdDisplay == 'Hide' && item.tdLevel == 'Consultant') ? '' :
                            <>
                              <tr key={i}>
                                <td>{((item.tdDataType == 'Table' && item.tdtgData?.length > 0) || (item.tdDataType == 'Section' && item.tdtgData?.length > 0)) ? <a onClick={() => handleClickExpand(item)} className='btn btn-sm btn-primary py-0 px-1' style={{ fontSize: '10px' }}>
                                  <i className={`fas ${!sD ? 'fa-minus' : 'fa-plus'} text-white`}></i>
                                </a> : ''}</td>
                                <td>{item.tdId}</td>
                                <td>
                                  {(item.tdDataType == 'Text') ?
                                    <>
                                      <div className='d-flex password-container'>
                                        <input type="text" className='form-control me-2' placeholder={`${item.tdId}${item.tdMandatory ? '*' : ''}`} value={item.value || ''} maxLength={item.tdLimit} onChange={(e) => handleOnChange(e, i)} onKeyDown={(e) => handleKeyDown(e, item, i)} />
                                        <div id="togglePassword">
                                          {status == 'Verified' ?
                                            <a title='Verified'><i className="fa-solid fa-circle-check text-success"></i></a> : status == 'Not Verified' ?
                                              <a title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger"></i></a> : ''}
                                        </div>
                                        <div className='d-flex'>
                                          {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                          {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary btn-sm' title='Update' onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                                        </div>
                                      </div>
                                      {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                    </>
                                    : item.tdDataType == 'Number' ?
                                      <>
                                        <div className='d-flex password-container'>
                                          <input type='text' className='form-control me-2' placeholder={`${item.tdId}${item.tdMandatory ? '*' : ''}`} maxLength={item.tdLimit} value={item.value || ''} onKeyPress={numebersOnly} onChange={(e) => handleOnChange(e, i)} onKeyDown={(e) => handleKeyDown(e, item, i)} />
                                          <div className='d-flex' id="togglePassword">
                                            {status == 'Verified' ?
                                              <a className='me-5' title='Verified'><i className="fa-solid fa-circle-check text-success"></i></a> : status == 'Not Verified' ? <a className='me-5' title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger"></i></a> : ''}
                                          </div>
                                          <div className='d-flex'>
                                            {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                            {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary btn-sm' title='Update' onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                                          </div>
                                        </div>
                                        {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                      </>
                                      :
                                      (item.tdDataType == 'Boolean' || item.tdDataType == 'Dropdown') ?
                                        <>
                                          <div className='d-flex  password-container'>
                                            <select className='form-select me-2' value={item.value || ''} onChange={(e) => handleOnChange(e, i)} onKeyDown={(e) => handleKeyDown(e, item, i)}>
                                              {item.tdDataType == 'Boolean' ? <>
                                                <option value=''>Select</option>
                                                <option value='Yes'>Yes</option>
                                                <option value='No'>No</option>
                                              </> : item.tdDataType == 'Dropdown' ? <>
                                                <option value=''>Select</option>
                                                {item.tdData && item.tdData.length > 0 && item.tdData.map((b, bi) => <option value={b} key={bi}>{b}</option>)}
                                              </> : ''}
                                            </select>
                                            <div className='d-flex' id="togglePassword">
                                              {status == 'Verified' ?
                                                <a className='me-5' title='Verified'><i className="fa-solid fa-circle-check text-success"></i></a> : status == 'Not Verified' ? <a className='me-5' title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger"></i></a> : ''}
                                            </div>
                                            <div className='d-flex'>
                                              {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                              {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary btn-sm' title='Update' onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                                            </div>
                                          </div>
                                          {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                        </>
                                        : (item.tdDataType == 'Table') ?
                                          <div>
                                            <div className='d-flex justify-content-end'>
                                              {status == 'Verified' ?
                                                  <a className='me-5' title='Verified'><i className="fa-solid fa-circle-check text-success"></i></a> : status == 'Not Verified' ? <a className='me-5' title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger"></i></a> : ''}
                                                <div className='d-flex'>
                                                  {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                                  {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && 
                                                <a className='btn btn-primary btn-sm' title='Update' onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                                              </div>
                                            </div>
                                            {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                          </div>
                                          : item.tdDataType == 'Section' ?
                                            <div>
                                              <div className='d-flex justify-content-end'>
                                                <div className='d-flex'>
                                                  {status == 'Verified' ?
                                                    <a className="d-flex justify-content-center align-items-center me-2 " title='Verified'><i className="fa-solid fa-circle-check text-success me-5"></i></a> : status == 'Not Verified' ? <a className='d-flex justify-content-center align-items-center me-2' title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger me-5"></i></a> : ''}
                                                  <div className='d-flex'>
                                                    {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                                    {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) &&
                                                    <div><a className='btn btn-primary btn-sm' title='Update' data-bs-toggle="tooltip" onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a></div>
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                              {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                            </div>
                                            : item.tdDataType == 'Date' &&
                                            <>
                                              <div className='d-flex password-container'>
                                                <input type='date' className='form-control me-2' placeholder={`${item.tdId}${item.tdMandatory ? '*' : ''}`} value={item.value || ''} onKeyPress={numebersOnly} onChange={(e) => handleOnChange(e, i)} onKeyDown={(e) => handleKeyDown(e, item, i)} />
                                                <div className='d-flex' id="togglePassword">
                                                  {status == 'Verified' ?
                                                    <a>
                                                      <i className="fa-solid fa-circle-check text-success" title='Verified'></i></a> :
                                                    status == 'Not Verified' ? <a title='Not Verified'><i className="fa-solid fa-circle-xmark text-danger"></i></a> : ''}
                                                </div>
                                                <div className='d-flex'>
                                                  {((actions?.actions?.length > 0 && actions.actions[4]?.isAlwd || rolesObj?.appAcc) && item.tdFlag && !item.tdStatus) && <a className='btn btn-success me-1' title='Approve' onClick={() => setStateData({ isApprModal: true, docObj: item, disabled: false })}><i className="fa-solid fa-square-check"></i></a>}
                                                  {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary btn-sm' title='Update' onClick={() => editClick(item, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                                                </div>
                                              </div>
                                              {openIndex === i && <div className='text-danger'>{errMsg}</div>}
                                            </>}
                                </td>
                                <td className={item.tdLevel == 'Organization' ? 'text-primary fw-bold' : 'text-warning fw-bold'}>{item.tdLevel}</td>
                                <td>{date}</td>
                                <td>{item.uuName}</td>
                              </tr>
                              {(item.tdDataType == 'Table' && item.tdtgData?.length && !sD) ?
                                <tr>
                                  <td></td>
                                  <td colSpan={6}>
                                    {item.tdtgData?.length && !sD ? <ChecklistExpandComponent checklistObj={item} i={i} errors={errors} errMsgs={errMsgs} tdDataType = 'Table' tableChange={tableChange} addTable={addTable} deleteTable={deleteTable} editClick={editClick} actions={actions} rolesObj={rolesObj}/> : ''}
                                  </td>
                                </tr> : (item.tdDataType == 'Section' && item.tdtgData?.length && !sD) ?
                                  <tr>
                                    <td></td>
                                    <td colSpan={6}>
                                      {item.tdtgData?.length && !sD ? <ChecklistExpandComponent checklistObj={item} i={i} errors={errors} errMsgs={errMsgs} tdDataType = 'Section' handleHorTableChange={handleHorTableChange} subArrAddBtnCLick={subArrAddBtnCLick} subArrDltBtnCLick={subArrDltBtnCLick} handleVerTableChange={handleVerTableChange} handleAddVertTable={handleAddVertTable} handleDltVertTable={handleDltVertTable} editClick={editClick} actions={actions} rolesObj={rolesObj}/> : ''}
                                    </td>
                                  </tr> : ''}
                            </>
                          }
                        </>
                      )
                    }) : <tr>
                      <td colSpan={6}>
                        <div className='text-center py-3'>
                          <strong>No data</strong>
                        </div>
                      </td>
                    </tr>}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
      <Modal show={updateModal} onHide={() => setStateData({ updateModal: false, errMsg: '', docObj: {}, isDisable: false })} size='lg' aria-labelledby='example-modal-sizes-title-lg' >
        <Modal.Header closeButton>
          <h5 className='mb-0'> Update Checklist </h5>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-12'>
              <div className='d-flex'>
                <label>{docObj.tdId}</label>{docObj.tdMandatory && <span className='text-danger'>*</span>}
                {docObj.tdLimit && <span><TooltipComponent position={"top"} isCheckList={true} tempData={docObj} /></span>}</div>
              <div>
                <label className='custom-upload btn btn-info mt-3'>
                  <input
                    type='file'
                    accept={docObj.tdData?.map(type => `.${type.toLowerCase()}`).join(",")}
                    name={docObj.name}
                    multiple
                    onChange={tempChange}
                  />
                  <i className='fa-solid fa-arrow-up-from-bracket'></i> Upload your photos
                </label>
                <p>(File Type: {docObj.tdData?.map(type => type.toLowerCase()).join(",")})</p>
                <div>
                  {docObj.displayImgs?.length > 0 && (
                    <div className="image-preview">
                      {docObj.displayImgs.map((file, index) => {
                        const imageUrl = URL.createObjectURL(file);
                        const fileType = file.type;
                        return (
                          <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                            <div className='d-flex'>
                              {fileType.startsWith('image') ? (
                                file?.name.startsWith('http') || file?.name.startsWith('https') ?
                                  <img src={file.name} alt='Image' width="100" height="100" /> :
                                  <img src={imageUrl} alt='Image' width="100" height="100" />
                              ) : (
                                <div>
                                  <i className="fas fa-file-alt fa-3x"></i>
                                  <p>{file.name.split('/').pop()}</p>
                                </div>
                              )}
                              <div>
                                <a onClick={() => removeImage(index)}><i className="fa-solid fa-xmark  text-danger"></i></a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='text-center text-danger'>{errMsg}</div>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary btn-sm' onClick={() => editClick(docObj)} disabled={isDisable}>Update</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal show={isprImage} onHide={handleClosePopup} size='lg'>
        <Modal.Header closeButton>
          <h5><strong>Documents</strong></h5>
        </Modal.Header>
        <Modal.Body>
          {imgPath && imgPath.length == 1 ?
            <div className='popup_img'>
              {imgPath && imgPath.length > 0 && imgPath.map((img, i) => {
                const imageUrl = URL.createObjectURL(img);
                const fileType = img.type;
                const fType = fileType.split('/');
                return (
                  <div key={i}>
                    {fileType.startsWith('image') ? (
                      img?.name.startsWith('http') || img?.name.startsWith('https') ?
                        <img src={img.name} alt='Image' /> : <img src={imageUrl} alt='Image' />
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                          {fType?.length > 0 && fType[1] === 'pdf' ? <a onClick={() => handleOfrLtrPdfView(img.name)}>
                          <i className="fas fa-file-alt fa-3x"></i>
                        </a> : <a style={{cursor:'inherit'}}>
                          <i className="fas fa-file-alt fa-3x"></i>
                        </a>}
                        <p>{img.name.split('/').pop()}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div> :
            <Carousel className='popup_img'>
              {imgPath && imgPath.length > 0 && imgPath.map((img, i) => {
                const imageUrl = URL.createObjectURL(img);
                const fileType = img.type;
                const fType = fileType.split('/');
                return (
                  <Carousel.Item key={i}>
                    {fileType.startsWith('image') ? (
                      img?.name.startsWith('http') || img?.name.startsWith('https') ?
                        <img src={img.name} alt='Image' /> : <img src={imageUrl} alt='Image' />
                    ) : (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        {fType?.length > 0 && fType[1] === 'pdf' ? <a onClick={() => handleOfrLtrPdfView(img.name)}>
                          <i className="fas fa-file-alt fa-3x"></i>
                        </a> : <a style={{cursor:'inherit'}}>
                          <i className="fas fa-file-alt fa-3x"></i>
                        </a>}
                        <p>{img.name.split('/').pop()}</p>
                      </div>
                    )}
                  </Carousel.Item>
                )
              })}
            </Carousel>}
        </Modal.Body>
        <Modal.Footer>
          <div className='text-end'>
            <button type='button' className='btn btn-danger' onClick={handleClosePopup}>Close</button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* =====================Table Modal===================== */}
      <Modal show={tableModal} onHide={() => setStateData({ tableModal: false, docObj: {} })} size='lg'>
        <Modal.Header closeButton>
          <h6 className='mb-0'><strong>{docObj.tdId}</strong></h6>
        </Modal.Header>
        <Modal.Body>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead className='thead-light'>
                <tr>
                  {docObj?.tdData?.length > 0 && docObj.tdData.map((item, i) => (<th key={i} scope='col'>{item}{docObj.tdMandatory && <span className='text-danger'>*</span>}</th>))}
                </tr>
              </thead>
              <tbody>
                {tdtgData?.length > 0 && tdtgData.map((row, rowIndex, arr) => (
                  <tr key={rowIndex}>
                    {docObj?.tdData?.map((col, colIndex) => {
                      return (
                        <td key={colIndex}>
                          <input
                            className='form-control'
                            type='text'
                            name={`${rowIndex}-${col}`}
                            placeholder={col}
                            value={row[col] || ""}
                            onChange={(e) => tableChange(e, rowIndex, col)}
                          />
                          {errors[rowIndex]?.[col] && (
                            <div className='text-danger'>{errors[rowIndex][col]}</div>
                          )}
                        </td>
                      )
                    })}
                    {docObj.tdLimit <= 20 && rowIndex == arr.length - 1 &&
                      <>
                        <div colSpan={arr.length || 1}>
                          <div className='text-center d-flex'>
                            <a className='btn btn-primary btn-sm me-2' onClick={addTable}><i className="fas fa-plus"></i></a>
                            {arr?.length > 1 ? <a className='btn btn-sm btn-danger' onClick={() => deleteTable(rowIndex)}><i className="fas fa-trash"></i></a> : ''}
                          </div>
                        </div>
                      </>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-end'>
            <button type='button' className='btn btn-sm btn-danger me-2' onClick={() => setStateData({ tableModal: false, docObj: {} })}>Close</button>
            <button onClick={() => editClick(docObj)} className='btn btn-primary btn-sm'>Save</button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* =====================Section Modal=================== */}
      <Modal show={sectionModal} onHide={() => setStateData({ sectionModal: false, docObj: {}, errMsgs: {}, tdtgData: [] })} size='lg'>
        <Modal.Header closeButton>
          <h6 className='mb-0'><strong>{docObj?.tdDataObj?.heading}</strong></h6>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            {tdtgData?.length > 0 ? tdtgData.map((item, mainIndex) => {
              // tdtgData.push([{item[i]}]);
              // tdtgData: [[{item[i]}, {dynamic1}], [{item[2]}, {dynamic1}]]
              return (
                <div key={mainIndex}> {/** handleAddVertTable */}
                  {item?.length > 0 && item.map((tbItem, tbIndex, tbArr) => {
                    return (
                      <>
                        {<div className='d-flex justify-content-between'>
                          <p className='mb-1'><strong>{tbItem.subHeading}</strong></p>
                          {tbItem?.tableStructure == 'Vertical' && tbIndex === tbArr.length - 1 &&
                            <div className='d-flex'>
                              {tbArr.length < parseInt(tbItem.limit) && <button className='btn btn-success me-2' onClick={() => handleAddVertTable(tbItem, tbIndex, mainIndex)}><i className="fa-solid fa-plus"></i></button>}
                              {tbIndex != 0 && <button className='btn btn-danger' onClick={() => handleDltVertTable(tbIndex, mainIndex)}><i className="fa-solid fa-trash"></i></button>}
                            </div>
                          }
                        </div>}
                        <table className="table table-bordered table-hover">
                          {tbItem?.tableStructure === 'Horizontal' ? (
                            <>
                              <thead className="thead-light">
                                <tr >
                                  {tbItem?.data[0].map((row, rowIndex) => (
                                    <th key={rowIndex}>{row.label}{row.mandatory && <span className='text-danger'>*</span>}</th>
                                  ))}
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {tbItem?.data?.map((row, rowIndex, rowArr) => {
                                  return (
                                    <tr key={rowIndex}>
                                      {row.map((cell, cellIndex) => {
                                        return (
                                          <td key={cellIndex}>
                                            {cell.valueType === 'Text' ? (
                                              <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} />
                                            ) : cell.valueType === 'Number' ? (
                                              <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onKeyPress={numebersOnly} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} />
                                            ) : cell.valueType === 'Date' ? (
                                              <input className="form-control" type="date" value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} />
                                            ) : cell.valueType === 'Dropdown' ? (
                                              <select className="form-select" value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)}>
                                                <option value="">Select</option>
                                                {cell?.ddData?.map((sItem, sIndex) => (
                                                  <option key={sIndex} value={sItem}>{sItem}</option>
                                                ))}
                                              </select>
                                            ) : null}
                                            {errMsgs[`${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] && (
                                              <small className="text-danger">
                                                {errMsgs[`${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`]}
                                              </small>
                                            )}
                                          </td>
                                        )
                                      })}
                                      {rowArr.length - 1 == rowIndex &&
                                        <div className='d-flex'>
                                          {rowArr.length <= 19 && <button className="btn btn-sm btn-success me-2" onClick={() => subArrAddBtnCLick(mainIndex, rowIndex, tbIndex)}><i className="fa-solid fa-plus"></i></button>}
                                          {rowIndex !== 0 && <button className="btn btn-sm btn-danger" onClick={() => subArrDltBtnCLick(mainIndex, tbIndex, rowIndex)}><i className="fa-solid fa-trash"></i></button>}
                                        </div>
                                      }
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </>
                          ) : (
                            <tbody>
                              {tbItem?.data?.map((row, rowIndex) => (
                                row.map((cell, cellIndex) => {
                                  return (
                                    <tr key={cellIndex}>
                                      <th scope="row">{cell.label}{cell.mandatory && <span className='text-danger'>*</span>}</th>
                                      <td>
                                        {cell.valueType === 'Text' ? <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} /> :
                                          cell.valueType === 'Number' ? <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onKeyPress={numebersOnly} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} /> :
                                            cell.valueType === 'Date' ? <input className="form-control" type="date" value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)} /> :
                                              cell.valueType === 'Dropdown' ?
                                                <select className='form-select' value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex)}>
                                                  <option value=''>Select</option>
                                                  {cell?.ddData?.length > 0 && cell.ddData.map((sItem, sIndex) => <option key={sIndex} value={sItem}>{sItem}</option>)}
                                                </select> : ''}
                                        {errMsgs[`${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] && (
                                          <small className="text-danger">
                                            {errMsgs[`${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`]}
                                          </small>
                                        )}
                                      </td>

                                    </tr>
                                  )
                                })
                              ))}
                            </tbody>
                          )}
                        </table>
                        <div>
                        </div>
                      </>
                    )
                  })}
                </div>
              )
            }) : ''}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='text-end'>
            <button type='button' className='btn btn-sm btn-danger me-2' onClick={() => setStateData({ sectionModal: false, docObj: {}, errMsgs: {}, tdtgData: [] })}>Close</button>
            <button onClick={() => editClick(docObj)} className='btn btn-primary btn-sm'>Save</button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal show={isApprModal} onHide={() => setStateData({ isApprModal: false, errMsg: '', isDisable: false })} className='modal-s mt-3'>
        <Modal.Header closeButton>
          <p className='mb-0'>
            <strong>Status Update</strong>
          </p>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex mb-2'>
            <div><strong>{docObj.displayImgs?.length ? 'File Name:' : 'Name:'} </strong>{docObj?.tdId}</div>
          </div>
          <div>
            {docObj.displayImgs?.length > 0 ? (
              <div className="image-preview">
                {docObj.displayImgs.map((file, index) => {
                  const imageUrl = URL.createObjectURL(file);
                  const fileType = file.type;
                  return (
                    <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
                      <div className='d-flex'>
                        {fileType.startsWith('image') ? (
                          file?.name.startsWith('http') || file?.name.startsWith('https') ?
                            <img src={file.name} alt='Image' width="100" height="100" /> :
                            <img src={imageUrl} alt='Image' width="100" height="100" />
                        ) : (
                          <div>
                            <i className="fas fa-file-alt fa-3x"></i>
                            <p>{file.name.split('/').pop()}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : <div><strong>Name Data: </strong>{docObj?.tdgData}</div>}
          </div>
        </Modal.Body>
        {/* <div className='text-center text-success'>{succMsg}</div> */}
        <div className='text-center text-danger'>{errMsg}</div>
        <Modal.Footer>
          <h6 >Are you sure want to approve checklist?</h6>
          <button type='button' className='btn btn-danger btn-sm' onClick={() => setStateData({ isApprModal: false, errMsg: '', isDisable: false })}> No </button>
          <button type='button' className='btn btn-success btn-sm' disabled={isDisable} onClick={handleApprove}> Yes </button>
        </Modal.Footer>
      </Modal>
      <Offcanvas show={pdfShow} onHide={() => setStateData({ pdfShow: false, pdfUrl: '', pdfMessage: '' })} placement='end' style={{ width: '70%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offer Letter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {pdfUrl ? (
            <object data={pdfUrl} type="application/pdf" width="100%" height="900px">
              <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a> instead.</p>
            </object>
          ) : (
            <p style={{ textAlign: 'center', color: 'red', fontSize: '20px', paddingTop: '365px' }}>{pdfMessage}</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
export default ChecklistCreateComponent;