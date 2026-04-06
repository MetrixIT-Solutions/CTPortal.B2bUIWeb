/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react';
import hashHistory from '../../hashHistory';

import exprtnIcon from '../../assets/images/icons/expiration.png';
import InterIcon from '../../assets/images/icons/interview.png';
import ImgrIcon from '../../assets/images/icons/immigration.png';
import Submission from '../../assets/images/icons/submission.png';
import consultant from '../../assets/images/icons/consultant.png';
import adminUsers from '../../assets/images/icons/admin-users.png';
import orgnization from '../../assets/images/icons/organisation.png';
import dashboard from '../../assets/images/icons/dashboard.png';
import template from '../../assets/images/icons/layout.png';
import vendrIcon from '../../assets/images/icons/vendor.png';
import rolsIcon from '../../assets/images/icons/roles.png'
import localForage from '../../hooks/localForage';

export class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isOpen: false,
      sType: '',
      smType: '',
      activeTab: '',
      activeSubTab: '',
      userInfo: {}
    }
  }
  componentDidMount = async () => {
    const tabData = await localForage.getItem('tabValue');
    const subTabData = await localForage.getItem('subTabValue');
    const UsrData = await localForage.getItem('userInfo');
    const tabValue = tabData.value || '';
    const subTabValue = subTabData.value || '';
    const userInfo = UsrData.value || {};
    this.setState({ loading: false, activeTab: tabValue, activeSubTab: subTabValue, isOpen: tabValue && subTabValue ? true : false, sType: tabValue, userInfo });
  }

  handleChange = async (value) => {
    this.setState({ activeTab: value, subTabValue: ''});
    await localForage.setItem('tabValue', value);
    await localForage.setItem('subTabValue', '');
    switch (value) {
      case 'dashboard':
        hashHistory.push('/home');
        break;
      case 'roles':
      case 'org':
      case 'consultants':
      case 'immigration':
        const { isOpen } = this.state;
        this.setState((prevState) => ({
          isOpen: prevState.sType !== value ? true : !isOpen,
          sType: value
        }));
        break;
      case 'users':
        hashHistory.push('/admin-users')
        break;
      case 'temp':
        hashHistory.push('/templates');
        break;
      case 'sub':
        hashHistory.push('/submissions');
        break;
      case 'inter':
        hashHistory.push('/interviews');
        break;
      case 'vendors':
        hashHistory.push('/vendors');
        break;
      case 'expiration':
        hashHistory.push('/expirations')
        break
      default:
        hashHistory.push('/home');
        break;
    }
  }


  handleSubChange = async (value) => {
    await localForage.setItem('subTabValue', value);
    switch(value){
      case 'organizations':
        hashHistory.push('/organizations');
        break;
      case 'branches':
        hashHistory.push('/organizations/branches')
        break;
      case 'teams':
        hashHistory.push('/organizations/teams')
        break;
      case 'users':
        hashHistory.push('/admin-users')
        break;
      case 'roles': 
        hashHistory.push('/admin-users/roles')
        break;
      case 'consultant':
        hashHistory.push('/consultants')
        break;
      case 'invitations':
        hashHistory.push('/consultants/invitations')
        break;
      case 'roles-access':
          hashHistory.push('/admin-users/roles-access')
          break;
      case 'leads':
        hashHistory.push('/consultants/onboarding')
        break;
      case 'inmarketing':
        hashHistory.push('/consultants/inmarketing')
        break;
      case 'placed':
        hashHistory.push('/consultants/placed')
        break;
      case 'terminated':
        hashHistory.push('/consultants/terminated')
        break;
      case 'bgv':
        hashHistory.push('/consultants/background/verification')
        break;
      case 'injob':
        hashHistory.push('/consultants/in/job')
        break;
      case 'offerletters':
        hashHistory.push('/offerletters')
        break;
      case 'h1bpetitions': 
        hashHistory.push('/h1bpetitions') 
        break;
      default:
        hashHistory.push('/');
        break; 
    } 
  }

  render() {
    const { loading, isOpen, sType, link, activeTab, activeSubTab, userInfo} = this.state;
    const appAcc = (userInfo?.userType == 'App' || userInfo?.userType == 'Tech' || (userInfo?.userType == 'Management' && userInfo?.userRole == 'Super Admin'));

    return (
      <aside className='main-sidebar'>
        {loading ? <></> :
        <section className='sidebar'>
          {/* sidebar menu */}
          <ul className='sidebar-menu' data-widget='tree'>
            <li>
              <a className={activeTab == 'dashboard' ? 'active' : ''} onClick={() => this.handleChange('dashboard')}>
                <img src={dashboard} alt='dashboard' width={20} />
                <span>Dashboard</span>
              </a>
            </li>
            {((userInfo?.rolesObj?.access?.length >= 4 && (userInfo?.rolesObj?.access[1]?.isAlwd || userInfo?.rolesObj?.access[2]?.isAlwd || 
            userInfo?.rolesObj?.access[3]?.isAlwd)) || appAcc) &&
            <li>
              <a className={activeTab == 'org' ? 'active' : ''} onClick={() => this.handleChange('org')}>
                <img src={orgnization} alt='orgnizations' width={20} />
                <span>Organizations </span>
                <span className='pull-right-container'>
                  {(sType === 'org' && isOpen) ? <i className='fa-solid fa-angle-down'></i> : <i className='fa fa-angle-right pull-right'></i>}
                </span>
              </a>
              {(sType === 'org' && isOpen) && (
                <ul className='treeview-menu'>
                  {((userInfo?.rolesObj?.access?.length >= 2 && userInfo?.rolesObj?.access[1]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'organizations' ? 'active' : ''} onClick={() => this.handleSubChange('organizations')}><i className='fa-solid fa-code-commit'></i>Organizations</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 3 && userInfo?.rolesObj?.access[2]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'branches' ? 'active' : ''} onClick={() => this.handleSubChange('branches')}><i className='fa-solid fa-code-commit'></i>Branches</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 4 && userInfo?.rolesObj?.access[3]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'teams' ? 'active' : ''} onClick={() => this.handleSubChange('teams')}><i className='fa-solid fa-code-commit'></i>Teams</a></li>}
                </ul>
              )}
            </li>}

            {appAcc && <li>
              <a className={activeTab == 'roles' ? 'active' : ''} onClick={() => this.handleChange('roles')}>
                <img src={rolsIcon} alt='Admin users' width={20} />
                <span>Roles</span>
                <span className='pull-right-container'>
                  {(sType === 'roles' && isOpen) ? <i className='fa-solid fa-angle-down'></i> : <i className='fa fa-angle-right pull-right'></i>}
                </span>
              </a>
              {(sType == 'roles' && isOpen) && (
                <ul className='treeview-menu'>
                  <li><a className={activeSubTab == 'roles' ? 'active' : ''} onClick={() => this.handleSubChange('roles')}><i className='fa-solid fa-code-commit'></i>Roles</a></li>
                  <li><a className={activeSubTab == 'roles-access' ? 'active' : ''} onClick={() => this.handleSubChange('roles-access')}><i className='fa-solid fa-code-commit'></i>Roles Access</a></li>
                </ul>
              )}
            </li>}
            {((userInfo?.rolesObj?.access?.length >= 6 && userInfo?.rolesObj?.access[5]?.isAlwd) || appAcc) &&
              <li><a className={activeTab == 'users' ? 'active' : ''} onClick={() => this.handleChange('users')}>
                <img src={adminUsers} alt='Admin users' width={20} />
                <span>Admin Users</span>
              </a></li>}
            {((userInfo?.rolesObj?.access?.length >= 5 && userInfo?.rolesObj?.access[4]?.isAlwd) || appAcc) &&
              <li><a className={activeTab == 'vendors' ? 'active' : ''} onClick={() => this.handleChange('vendors')}>
                  <img src={vendrIcon} alt='orgnizations' width={20} />
                  <span>Vendors</span>
              </a></li>}
            {((userInfo?.rolesObj?.access?.length >= 17 && userInfo?.rolesObj?.access[16]?.isAlwd) || appAcc) &&<li>
              <a className={activeTab == 'temp' ? 'active' : ''} onClick={() => this.handleChange('temp')}>
                <img src={template} alt='templates' width={20} />
                <span>Templates</span>
              </a>
            </li>}
            {((userInfo?.rolesObj?.access?.length >= 20 && (userInfo?.rolesObj?.access[18]?.isAlwd || userInfo?.rolesObj?.access[19]?.isAlwd)) || appAcc) &&
            <li>
              <a className={activeTab == 'immigration' ? 'active' : ''} onClick={() => this.handleChange('immigration')}>
                <img src={ImgrIcon} alt='immigration' width={20} />
                <span>Immigration</span>
                <span className='pull-right-container'>
                  {(sType === 'immigration' && isOpen) ? <i className='fa-solid fa-angle-down'></i> : <i className='fa fa-angle-right pull-right'></i>}
                </span>
              </a>
              {(isOpen && sType == 'immigration') && (
                <ul className='treeview-menu'>
                  {((userInfo?.rolesObj?.access?.length >= 20 && userInfo?.rolesObj?.access[18]?.isAlwd) || appAcc) && <li><a className={activeSubTab == 'offerletters' ? 'active' : ''} onClick={() => this.handleSubChange('offerletters')}><i className='fa-solid fa-code-commit'></i>Offer Letters</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 20 && userInfo?.rolesObj?.access[19]?.isAlwd) || appAcc) && <li><a className={activeSubTab == 'h1bpetitions' ? 'active' : ''} onClick={() => this.handleSubChange('h1bpetitions')}><i className='fa-solid fa-code-commit'></i>H1B Petitions</a></li>}
                </ul>
              )}
            </li>}
            {((userInfo?.rolesObj?.access?.length >= 14 && (userInfo?.rolesObj?.access[6]?.isAlwd || userInfo?.rolesObj?.access[7]?.isAlwd || userInfo?.rolesObj?.access[8]?.isAlwd
              || userInfo?.rolesObj?.access[9]?.isAlwd || userInfo?.rolesObj?.access[10]?.isAlwd // || userInfo?.rolesObj?.access[11]?.isAlwd || userInfo?.rolesObj?.access[12]?.isAlwd
              || userInfo?.rolesObj?.access[13]?.isAlwd)) || appAcc) &&
            <li>
              <a className={activeTab == 'consultants' ? 'active' : ''} onClick={() => this.handleChange('consultants')}>
                <img src={consultant} alt='consultants' width={20} />
                <span>Consultants</span>
                <span className='pull-right-container'>
                  {(sType === 'consultants' && isOpen) ? <i className='fa-solid fa-angle-down'></i> : <i className='fa fa-angle-right pull-right'></i>}
                </span>
              </a>
              {(isOpen && sType == 'consultants') &&  (
                <ul className='treeview-menu'>
                  {((userInfo?.rolesObj?.access?.length >= 7 && userInfo?.rolesObj?.access[6]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'consultant' ? 'active' : ''} onClick={() => this.handleSubChange('consultant')}><i className='fa-solid fa-code-commit'></i>Consultants</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 8 && userInfo?.rolesObj?.access[7]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'invitations' ? 'active' : ''} onClick={() => this.handleSubChange('invitations')}><i className='fa-solid fa-code-commit'></i>Invitations</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 9 && userInfo?.rolesObj?.access[8]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'leads' ? 'active' : ''} onClick={() => this.handleSubChange('leads')}><i className='fa-solid fa-code-commit'></i>On Boarding</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 10 && userInfo?.rolesObj?.access[9]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'inmarketing' ? 'active' : ''} onClick={() => this.handleSubChange('inmarketing')}><i className='fa-solid fa-code-commit'></i>In Marketing</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 11 && userInfo?.rolesObj?.access[10]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'placed' ? 'active' : ''} onClick={() => this.handleSubChange('placed')}><i className='fa-solid fa-code-commit'></i>Placed</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 12 && userInfo?.rolesObj?.access[11]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'bgv' ? 'active' : ''} onClick={() => this.handleSubChange('bgv')}><i className='fa-solid fa-code-commit'></i>BGV</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 13 && userInfo?.rolesObj?.access[12]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'injob' ? 'active' : ''} onClick={() => this.handleSubChange('injob')}><i className='fa-solid fa-code-commit'></i>In Job</a></li>}
                  {((userInfo?.rolesObj?.access?.length >= 14 && userInfo?.rolesObj?.access[13]?.isAlwd) || appAcc) &&
                  <li><a className={activeSubTab == 'terminated' ? 'active' : ''} onClick={() => this.handleSubChange('terminated')}><i className='fa-solid fa-code-commit'></i>Terminated</a></li>}
                </ul>
              )}
            </li>}

            {((userInfo?.rolesObj?.access?.length >= 15 && userInfo?.rolesObj?.access[14]?.isAlwd) || appAcc) &&
            <li>
              <a className={activeTab == 'sub' ? 'active' : ''} onClick={() => this.handleChange('sub')}>
                <img src={Submission} alt='submissions' width={20} />
                <span>Submissions</span>
              </a>
            </li>}
            {((userInfo?.rolesObj?.access?.length >= 16 && userInfo?.rolesObj?.access[15]?.isAlwd) || appAcc) &&
            <li>
              <a className={activeTab == 'inter' ? 'active' : ''} onClick={() => this.handleChange('inter')}>
                <img src={InterIcon} alt='Interviews' width={20} />
                <span>Interviews</span>
              </a>
            </li>}
            {((userInfo?.rolesObj?.access?.length >= 18 && userInfo?.rolesObj?.access[17]?.isAlwd) || appAcc) &&
            <li>
              <a className={activeTab == 'expiration' ? 'active' : ''} onClick={() => this.handleChange('expiration')}>
                <img src={exprtnIcon} alt='expiration' width={20} />
                <span>Expirations</span>
              </a>
            </li>}
          </ul>
        </section>}
      </aside>
    )
  }
}

export default NavComponent;
