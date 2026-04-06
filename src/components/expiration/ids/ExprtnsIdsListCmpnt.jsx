/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React from "react";
import moment from "moment";
import Pagination from "react-js-pagination";

import NoData from "../../../assets/images/no-data.svg";
import Loader from "../../loader/loader";

const ExprtnsIdsListCmpnt = (props) => {
  const { exprActList, exprActListCnt, pgNum, limit, rolesObj, searchStr, loading } = props.state;
  const { handlePagination, handleChangeLimit, handleKeyInput, handleChangeSearch } = props;

  return (
    <div className="box">
      <div className='box-header'>
        <h6>ID's</h6>
      </div>
      <div className="box-body">
        <div className="dataTables_wrapper">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="dataTables_length">
                <label>
                  Show{" "}
                  <select className="form-select form-control-sm" value={limit} onChange={handleChangeLimit}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>{" "}
                  entries{" "}
                </label>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div id="example5_filter" className="dataTables_filter">
                <label>
                  Search:
                  <input type="search" className="form-control form-control-sm" placeholder="" aria-controls="example5" value={searchStr} onKeyPress={handleKeyInput} onChange={handleChangeSearch} />
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="table mt-0 table-hover no-wrap table-striped dataTable no-footer">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID Type</th>
                    <th scope="col">ID Number</th>
                    <th scope="col">Issued Date</th>
                    <th scope="col">Expiration Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Is Verified</th>
                  </tr>
                </thead>
                {loading ? (
                  <tr>
                    <td colSpan={12}>
                      <Loader />
                    </td>
                  </tr>
                ) : exprActList && exprActList.length > 0 ? (
                  <tbody>
                    {exprActList.map((item, i) => {
                      const newObj = item.newObj;
                      const cDtstr = item.expDtStr ? moment.utc().format("YYYY-MM-DD HH:mm:ss") < item.expDtStr : false;
                      const strtDt = item.strDtStr ? moment(item.strDtStr).format("DD MMM, YYYY") : "";
                      const expDt = item.expDtStr ? moment(item.expDtStr).format("DD MMM, YYYY") : "";
                      const wrkAthSts = newObj.status ? `Status: ${newObj.status}` : "";
                      const wrkAthNum = newObj.num ? `, Card No: ${newObj.num}` : "";
                      const wrkAthUsc = newObj.uscisNum ? `, USCIS No: ${newObj.uscisNum}` : "";
                      const wrkAthSvs = newObj.sevisNum ? `, Sevis No: ${newObj.sevisNum}` : "";
                      const wrkAthRcpt = newObj.receiptNum ? `, Receipt No: ${newObj.receiptNum}` : "";
                      const wrkIdNum = wrkAthSts + wrkAthNum + wrkAthUsc + wrkAthSvs + wrkAthRcpt;
                      return (
                        <tr key={i}>
                          <td>{item.type == "WrkAuth" ? "Work Authorization" : item.type == "USid" ? "US National ID" : item.type}</td>
                          <td>{item.type == "Visa" ? `Status : ${newObj.status}` : item.type == "WrkAuth" ? wrkIdNum : newObj.num}</td>
                          <td>{strtDt}</td>
                          <td>{expDt}</td>
                          <td style={{ color: cDtstr ? "green" : "red", fontWeight: "bold"}}>{item.expDtStr ? cDtstr ? "Valid" : "Expired" : ''}</td>
                          {item.isVrfd ? (
                            <td className="text-success">
                              <b>Yes</b>
                            </td>
                          ) : (
                            <td className="text-danger">
                              <b>No</b>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="no-data">
                        <img src={NoData}></img>
                        <p className="text-danger py-2">No results found </p>
                      </div>
                    </td>
                  </tr>
                )}
              </table>
            </div>
            {!loading && exprActListCnt > 0 ? (
              <div className="col-sm-12 col-md-7">
                <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                  <div className="paginate_button page-item active">
                    <Pagination className="mt-0" activePage={pgNum} itemsCountPerPage={Number(limit)} totalItemsCount={exprActListCnt} pageRangeDisplayed={5} onChange={handlePagination} />
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExprtnsIdsListCmpnt;
