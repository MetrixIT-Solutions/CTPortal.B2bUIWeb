/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { memo } from 'react';
import { numebersOnly } from '../../hooks/common';

const ChecklistExpandComponent = (props) => {
  const { checklistObj, tableChange, errors, tdDataType, addTable, deleteTable, tdtgData, errMsgs, handleHorTableChange, subArrAddBtnCLick, subArrDltBtnCLick, handleVerTableChange, handleAddVertTable, handleDltVertTable, editClick, actions, rolesObj, i } = props;
  
  return (
    <div>
      {checklistObj.tdDataType === 'Table' ?
        <div className='table-responsive'>
          <table className='table mt-0 table-hover no-wrap table-striped dataTable no-footer'>
            <thead className='thead-light'>
              <tr>
                {checklistObj?.tdData?.length > 0 && checklistObj.tdData.map((item, i) => (<th key={i} scope='col'>{item}{item.tdMandatory && <span className='text-danger'>*</span>}</th>))}
              </tr>
            </thead>
            <tbody>
              {checklistObj.tdtgData?.length > 0 && checklistObj.tdtgData.map((row, rowIndex, arr) => (
                <tr key={rowIndex}>
                  {checklistObj?.tdData?.map((col, colIndex) => {
                    return (
                      <td key={colIndex}>
                        <input
                          className='form-control'
                          type='text'
                          name={`${rowIndex}-${col}`}
                          placeholder={col}
                          value={row[col] || ""}
                          onChange={(e) => tableChange(e, rowIndex, col, checklistObj)}
                        />
                        {errors[rowIndex]?.[col] && (
                          <div className='text-danger'>{errors[rowIndex][col]}</div>
                        )}
                      </td>
                    )
                  })}
                  {checklistObj.tdLimit <= 20 && rowIndex == arr.length - 1 &&
                    <>
                      <div colSpan={arr.length || 1}>
                        <div className='text-center d-flex'>
                          <button className='btn btn-success me-2' onClick={() => addTable(checklistObj)}><i class="fas fa-plus"></i></button>
                          {arr?.length > 1 ? <button className='btn btn-danger me-2' onClick={() => deleteTable(checklistObj)}><i class="fas fa-trash"></i></button> : ''}
                          {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary' title='Update' onClick={() => editClick(checklistObj, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
                        </div>
                      </div>
                    </>}
                </tr>
              ))}
            </tbody>
          </table>
        </div> :
        <div className='table-responsive'>
          {checklistObj.tdtgData?.length > 0 ? checklistObj.tdtgData.map((item, mainIndex) => {
            return (
              <div key={mainIndex}> {/** handleAddVertTable */}
                {item?.length > 0 && item.map((tbItem, tbIndex, tbArr) => {
                  return (
                    <>
                      {<div className='d-flex justify-content-between'>
                        <p className='mb-1'><strong>{tbItem.subHeading}</strong></p>
                        {tbItem?.tableStructure == 'Vertical' && tbIndex === tbArr.length - 1 &&
                          <div className='d-flex'>
                            {tbArr.length < parseInt(tbItem.limit) && <button className='btn btn-success me-2' onClick={() => handleAddVertTable(tbItem, tbIndex, mainIndex, checklistObj, i)}><i className="fa-solid fa-plus"></i></button>}
                            {tbIndex != 0 && <button className='btn btn-danger me-2' onClick={() => handleDltVertTable(tbIndex, mainIndex, checklistObj)}><i className="fa-solid fa-trash"></i></button>}
                            {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary' title='Update' onClick={() => editClick(checklistObj, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
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
                                            <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} />
                                          ) : cell.valueType === 'Number' ? (
                                            <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onKeyPress={numebersOnly} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} />
                                          ) : cell.valueType === 'Date' ? (
                                            <input className="form-control" type="date" value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} />
                                          ) : cell.valueType === 'Dropdown' ? (
                                            <select className="form-select" value={cell.value} onChange={(e) => handleHorTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)}>
                                              <option value="">Select</option>
                                              {cell?.ddData?.map((sItem, sIndex) => (
                                                <option key={sIndex} value={sItem}>{sItem}</option>
                                              ))}
                                            </select>
                                          ) : null}
                                          {errMsgs[`${i}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] && (
                                            <small className="text-danger">
                                              {errMsgs[`${i}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`]}
                                            </small>
                                          )}
                                        </td>
                                      )
                                    })}
                                    {rowArr.length - 1 == rowIndex &&
                                      <div className='d-flex'>
                                        {rowArr.length <= 19 && <button className="btn btn-sm btn-success me-2" onClick={() => subArrAddBtnCLick(mainIndex, rowIndex, tbIndex, checklistObj, i)}><i className="fa-solid fa-plus"></i></button>}
                                        {rowIndex !== 0 && <button className="btn btn-sm btn-danger me-2" onClick={() => subArrDltBtnCLick(mainIndex, tbIndex, rowIndex, checklistObj)}><i className="fa-solid fa-trash"></i></button>}
                                        {(actions?.actions?.length > 0 && actions.actions[1]?.isAlwd || rolesObj?.appAcc) && <a className='btn btn-primary' title='Update' onClick={() => editClick(checklistObj, i)}><i className="fa-solid fa-floppy-disk"></i></a>}
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
                                      {cell.valueType === 'Text' ? <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} /> :
                                        cell.valueType === 'Number' ? <input className="form-control" type="text" placeholder={cell.label} value={cell.value} onKeyPress={numebersOnly} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} /> :
                                          cell.valueType === 'Date' ? <input className="form-control" type="date" value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)} /> :
                                            cell.valueType === 'Dropdown' ?
                                              <select className='form-select' value={cell.value} onChange={(e) => handleVerTableChange(e, mainIndex, tbIndex, rowIndex, cellIndex, checklistObj, i)}>
                                                <option value=''>Select</option>
                                                {cell?.ddData?.length > 0 && cell.ddData.map((sItem, sIndex) => <option key={sIndex} value={sItem}>{sItem}</option>)}
                                              </select> : ''}
                                      {errMsgs[`${i}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`] && (
                                        <small className="text-danger">
                                          {errMsgs[`${i}-${mainIndex}-${tbIndex}-${rowIndex}-${cellIndex}`]}
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
        </div>}
    </div>
  );
}

export default memo(ChecklistExpandComponent);
