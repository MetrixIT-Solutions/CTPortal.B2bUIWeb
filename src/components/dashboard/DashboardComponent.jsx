/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import avatar1 from '../../assets/images/avatar/1.jpg';
import avatar10 from '../../assets/images/avatar/avatar-1.png';

const DashboardComponent = (props) => {

  return (
    <div className="content-wrapper">
      <div className="container-full">
        {/* Main content  */}
        <section className="content">
          <div className="row">
            <div className="col-xl-9 col-12">
              <div className="row">
                <div className="col-lg-4 col-12">
                  <div className="box">
                    <div className="box-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-fade">Applications</h5>
                          <h2 className="font-weight-500 mb-0">132.0K</h2>
                        </div>
                        <div>
                          <div id="revenue1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="box">
                    <div className="box-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-fade">Shortlisted</h5>
                          <h2 className="font-weight-500 mb-0">10.9k</h2>
                        </div>
                        <div>
                          <div id="revenue2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-12">
                  <div className="box">
                    <div className="box-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="text-fade">On Hold</h5>
                          <h2 className="font-weight-500 mb-0">03.1k</h2>
                        </div>
                        <div>
                          <div id="revenue3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxxl-8 col-xl-7 col-12">
                  <div className="box">
                    <div className="box-header">
                      <h4 className="box-title">Active Jobs</h4>
                      <ul className="box-controls pull-right d-md-flex d-none">
                        <li className="dropdown">
                          <button className="btn btn-primary px-10 " data-toggle="dropdown" >View List</button>
                        </li>
                      </ul>
                    </div>
                    {/* <div className="box-body">
                      <div id="active_jobs"></div>
                    </div> */}
                    <div className="box-body">
                      <div className="bb-1 d-flex justify-content-between">
                        <h5>Job title</h5>
                        <h5>Applications</h5>
                      </div>
                      <div className="d-flex justify-content-between my-15">
                        <p>Project Manager</p>
                        <p>
                          <strong>325</strong>
                          <button type="button" className="waves-effect waves-light btn btn-xs btn-outline btn-primary-light">
                            <i className="fa fa-line-chart"></i>
                          </button>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between my-15">
                        <p>Sales Manager</p>
                        <p>
                          <strong>154</strong>
                          <button type="button" className="waves-effect waves-light btn btn-xs btn-outline btn-primary-light">
                            <i className="fa fa-line-chart"></i>
                          </button>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between my-15">
                        <p>Machine Instrument</p>
                        <p>
                          <strong>412</strong>
                          <button type="button" className="waves-effect waves-light btn btn-xs btn-outline btn-primary-light">
                            <i className="fa fa-line-chart"></i>
                          </button>
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mt-15">
                        <p>Operation Manager</p>
                        <p>
                          <strong>412</strong>
                          <button type="button" className="waves-effect waves-light btn btn-xs btn-outline btn-primary-light">
                            <i className="fa fa-line-chart"></i>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxxl-4 col-xl-5 col-12">
                  <div className="box">
                    <div className="box-header">
                      <h4 className="box-title">Total Applications</h4>
                    </div>
                    {/* <div className="box-body">
                      <div className="d-flex w-p100 rounded100 overflow-hidden">
                        <div className="bg-danger h-10"></div>
                        <div className="bg-warning h-10"></div>
                        <div className="bg-success h-10"></div>
                        <div className="bg-info h-10"></div>
                      </div>
                    </div> */}
                    <div className="box-body p-0">
                      <div className="media-list media-list-hover media-list-divided">
                        <a className="media media-single rounded-0" >
                          <span className="badge badge-xl badge-dot badge-info"></span>
                          <span className="title">Applications </span>
                          <span className="badge badge-pill badge-info-light">58%</span>
                        </a>

                        <a className="media media-single rounded-0" >
                          <span className="badge badge-xl badge-dot badge-success"></span>
                          <span className="title">Shortlisted</span>
                          <span className="badge badge-pill badge-success-light">22%</span>
                        </a>

                        <a className="media media-single rounded-0" >
                          <span className="badge badge-xl badge-dot badge-warning"></span>
                          <span className="title">On-Hold</span>
                          <span className="badge badge-pill badge-warning-light">12%</span>
                        </a>

                        <a className="media media-single rounded-0" >
                          <span className="badge badge-xl badge-dot badge-danger"></span>
                          <span className="title">Rejected</span>
                          <span className="badge badge-pill badge-danger-light">08%</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="box">
                    <div className="box-header with-border">
                      <h4 className="box-title">New Applications</h4>
                    </div>
                    <div className="box-body">
                      <div className="d-flex align-items-center mb-30">
                        <div className="mr-15">
                          <img src={avatar1} className="avatar avatar-lg rounded100 bg-primary-light" alt="" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500">
                          <a className="text-dark hover-primary mb-1 font-size-16">Sophia Doe</a>
                          <span className="font-size-12"><span className="text-fade">Applied for</span> Advertising Intern</span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item flexbox" >
                              <span>Inbox</span>
                              <span className="badge badge-pill badge-info">5</span>
                            </a>
                            <a className="dropdown-item" >Sent</a>
                            <a className="dropdown-item" >Spam</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item flexbox" >
                              <span>Draft</span>
                              <span className="badge badge-pill badge-default">1</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-30">
                        <div className="mr-15">
                          <img src={avatar10} className="avatar avatar-lg rounded100 bg-primary-light" alt="" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500">
                          <a className="text-dark hover-danger mb-1 font-size-16">Mason Clark</a>
                          <span className="font-size-12"><span className="text-fade">Applied for</span> Project Coordinator</span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item flexbox" >
                              <span>Inbox</span>
                              <span className="badge badge-pill badge-info">5</span>
                            </a>
                            <a className="dropdown-item" >Sent</a>
                            <a className="dropdown-item" >Spam</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item flexbox" >
                              <span>Draft</span>
                              <span className="badge badge-pill badge-default">1</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-30">
                        <div className="mr-15">
                          <img src={avatar10} className="avatar avatar-lg rounded100 bg-primary-light" alt="" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500">
                          <a className="text-dark hover-success mb-1 font-size-16">Emily Paton</a>
                          <span className="font-size-12"><span className="text-fade">Applied for</span> Layout Expert</span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item flexbox" >
                              <span>Inbox</span>
                              <span className="badge badge-pill badge-info">5</span>
                            </a>
                            <a className="dropdown-item" >Sent</a>
                            <a className="dropdown-item" >Spam</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item flexbox" >
                              <span>Draft</span>
                              <span className="badge badge-pill badge-default">1</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="mr-15">
                          <img src={avatar10} className="avatar avatar-lg rounded100 bg-primary-light" alt="" />
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500">
                          <a className="text-dark hover-info mb-1 font-size-16">Daniel Breth</a>
                          <span className="font-size-12"><span className="text-fade">Applied for</span> Interior Architect</span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item flexbox" >
                              <span>Inbox</span>
                              <span className="badge badge-pill badge-info">5</span>
                            </a>
                            <a className="dropdown-item" >Sent</a>
                            <a className="dropdown-item" >Spam</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item flexbox" >
                              <span>Draft</span>
                              <span className="badge badge-pill badge-default">1</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-12">
              <div className="box">
                <div className="box-body">
                  <div>
                    <h4 className="box-title mb-30">Scheduled Meeting</h4>
                    <div>
                      <div className="d-flex align-items-center mb-30 justify-content-between">
                        <div className="mr-15 text-center rounded15 box-shadowed h-50 w-50 d-table">
                          <p className="mb-0 text-warning">Thu</p>
                          <p className="mb-0">8</p>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500 min-w-p60">
                          <a className="text-dark hover-primary mb-1 font-size-16 overflow-hidden text-nowrap text-overflow">Interview</a>
                          <span className="font-size-10 text-fade"><i className="fa fa-clock-o"></i> 9:00am - 11:30am </span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" >Action</a>
                            <a className="dropdown-item" >Delete</a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-30 justify-content-between">
                        <div className="mr-15 text-center rounded15 box-shadowed h-50 w-50 d-table">
                          <p className="mb-0 text-warning">Fri</p>
                          <p className="mb-0">10</p>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500 min-w-p60">
                          <a className="text-dark hover-primary mb-1 font-size-16 overflow-hidden text-nowrap text-overflow">Organizational meeting</a>
                          <span className="font-size-10 text-fade"><i className="fa fa-clock-o"></i> 10:00am - 10:30am </span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" >Action</a>
                            <a className="dropdown-item" >Delete</a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-30 justify-content-between">
                        <div className="mr-15 text-center rounded15 box-shadowed h-50 w-50 d-table">
                          <p className="mb-0 text-warning">Mon</p>
                          <p className="mb-0">17</p>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500 min-w-p60">
                          <a className="text-dark hover-primary mb-1 font-size-16 overflow-hidden text-nowrap text-overflow">Meeting with the manager</a>
                          <span className="font-size-10 text-fade"><i className="fa fa-clock-o"></i> 9:00am - 11:30am </span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" >Action</a>
                            <a className="dropdown-item" >Delete</a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-30 justify-content-between">
                        <div className="mr-15 text-center rounded15 box-shadowed h-50 w-50 d-table">
                          <p className="mb-0 text-warning">Set</p>
                          <p className="mb-0">18</p>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500 min-w-p60">
                          <a className="text-dark hover-primary mb-1 font-size-16 overflow-hidden text-nowrap text-overflow">Interview</a>
                          <span className="font-size-10 text-fade"><i className="fa fa-clock-o"></i> 9:00am - 11:30am </span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" >Action</a>
                            <a className="dropdown-item" >Delete</a>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-20 justify-content-between">
                        <div className="mr-15 text-center rounded15 box-shadowed h-50 w-50 d-table">
                          <p className="mb-0 text-warning">Fri</p>
                          <p className="mb-0">22</p>
                        </div>
                        <div className="d-flex flex-column flex-grow-1 font-weight-500 min-w-p60">
                          <a className="text-dark hover-primary mb-1 font-size-16 overflow-hidden text-nowrap text-overflow">Organizational meeting</a>
                          <span className="font-size-10 text-fade"><i className="fa fa-clock-o"></i> 10:00am - 10:30am </span>
                        </div>
                        <div className="dropdown">
                          <a className="px-10 pt-5" data-toggle="dropdown"><i className="ti-more-alt"></i></a>
                          <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" >Action</a>
                            <a className="dropdown-item" >Delete</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content  */}
      </div>
    </div>
  )
}

export default DashboardComponent;