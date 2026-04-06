/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import './i18n';

import { UserLogin } from './containers/login';
import { HomePage } from './containers/home';
import { InvitationsList, InvitationView } from './containers/invitations';
import { ConsultantCreate, ConsultantsList, ConsultantView } from './containers/consultants';
import { OrgsList, OrgCreate, OrgEdit } from './containers/organizations';
import { BranchesList, BranchesCreate, BranchesEdit } from './containers/branches';
import { AdminUserCreate, UsersList, AdminUserView, AdminUserUpdate} from './containers/adminUsers';
import { VendorsList, VendorsCreate, VendorEdit } from './containers/vendors';
import { RolesList, RolesCreate, RolesEdit } from './containers/roles';
import { ForgotPassword } from './containers/ForgotPassword';
import { MyProfile, ChangePassword, ProfileAddress, Meetinglink } from './containers/my-profile';
import { OrgPanelsCreate, OrgPanelsList, OrgPanelsEdit } from './containers/panels';
import { SubmisList, SubmisCreate, SubmisSubEdit, SubmissionView } from './containers/submissions';
import { CandidateInterviwsView, InterviewsList, InterviewSubCreate, InterviewSubEdit} from './containers/interviews';
import { RoleAccessCreate, RoleAccessEdit, RolesAccessList, RolesAccessView } from './containers/roles-access';
import { LeadsList, LeadsView } from './containers/leads';
import { InMarketing } from './containers/inmarketing';
import { PlacedCndtsList } from './containers/placedCndts';
import { TerminatedCndtsList } from './containers/terminatedCndts';
import { BgvCndtsList } from './containers/bgvCndtsList';
import { InJobList } from './containers/inJob';

import { UserRegister } from './containers/register';
import { SuccessPage } from './containers/success';

import localForage from './hooks/localForage';
import hashHistory from './hashHistory';
import NoInternetComponent from './components/no-internet/NoInternetComponent';
import PageNotFound from './components/common/PageNotFound';
import { TemplateCreate, TemplateEdit, TemplatesList, TemplateView } from './containers/templates';
import TemplateSubCheckList from './containers/templates/TemplateSubCheckList';
import { ExpirationTab } from './containers/expiration';
import { OfferLetterList } from './containers/immigration/offer-letters';
import { H1BPetitionList } from './containers/immigration/h1b-petitions';

const App = (props) => {
  const location = useLocation();

  useEffect(() => {
    setLoggedinUserObj();
  }, [location])

  const setLoggedinUserObj = async () => {
    const userObj = await localForage.getItem('userInfo');
    const userData = userObj.value || {};    
    const atObj = await localForage.getItem('accesstoken');
    const accesstoken = atObj?.value || '';
    if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/forgot-password' && !location.pathname.includes('register') && location.pathname !== '/success') {
      if (!userData || !userData.refUID || !accesstoken) {
        hashHistory.push('/');
      }
    }
    if(location.pathname == '/' || location.pathname == '/login' || location.pathname == '/forgot-password' || location.pathname.includes('register')) {
      if(userData && userData.refUID && accesstoken) {
        hashHistory.push('/home');
      }
    }
  }

  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLogin />} />
        <Route path='login' element={<UserLogin />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='home' element={<HomePage />} />
        <Route path='profile' element={<MyProfile />} />
        <Route path='meeting-links' element={<Meetinglink />} />
        <Route path='change-password' element={<ChangePassword />} />
        <Route path='address' element={<ProfileAddress />} />
        <Route path='consultants/invitations' element={<InvitationsList />} />
        <Route path='consultants/invitations/view/:id' element={<InvitationView />} />
        <Route path='consultants' element={<ConsultantsList />} />
        <Route path='invitation/create/:id' element={<ConsultantCreate />} />
        <Route path='consultant/view/:id' element={<ConsultantView />} />
        <Route path='organizations' element={<OrgsList />} />
        <Route path='organizations/create' element={<OrgCreate />} />
        <Route path='organizations/update/:id' element={<OrgEdit />} />
        <Route path='organizations/branches' element={<BranchesList />} />
        <Route path='organizations/branches/create' element={<BranchesCreate />} />
        <Route path='organizations/branches/edit/:id' element={<BranchesEdit />} />
        <Route path='vendors' element={<VendorsList />} />
        <Route path='vendors/create' element={<VendorsCreate />} />
        <Route path='vendors/edit/:id' element={<VendorEdit />} />
        <Route path='organizations/teams' element={<OrgPanelsList/>}/>
        <Route path='organizations/teams/create' element={<OrgPanelsCreate/>}/>
        <Route path='organizations/teams/edit/:id' element={<OrgPanelsEdit />} />
        <Route path='admin-users/create' element={<AdminUserCreate />} />
        <Route path='admin-users' element={<UsersList/>}/>
        <Route path='admin-users/view/:id' element={<AdminUserView />} />
        <Route path='admin-users/edit/:id' element={<AdminUserUpdate />} />
        <Route path='admin-users/roles' element={<RolesList />} />
        <Route path='admin-users/roles/create'  element={<RolesCreate />}/>
        <Route path='admin-users/roles/edit/:id'  element={<RolesEdit />} />
        <Route path='admin-users/roles-access' element={<RolesAccessList />} />
        <Route path='admin-users/roles-access/view/:id' element={<RolesAccessView />} />
        <Route path='admin-users/roles-access/create' element={<RoleAccessCreate />} />
        <Route path='admin-users/roles-access/update/:id' element={<RoleAccessEdit />} />
        <Route path='submissions' element={<SubmisList />} />
        <Route path='submission/create' element={<SubmisCreate />} />
        <Route path='submissions/view/:id' element={<SubmissionView />} />
        <Route path='submission/update/:id' element={<SubmisSubEdit />} />
        <Route path='interviews' element={<InterviewsList />} />
        <Route path='interview/create/:id' element={<InterviewSubCreate />} />
        <Route path='interview/update/:id' element={<InterviewSubEdit />} />
        <Route path='interview/view/:id' element={<CandidateInterviwsView/>}/>
        <Route path='consultants/onboarding' element={<LeadsList />} />
        <Route path='consultants/onboarding/view/:id' element={<LeadsView />}/>
        <Route path='consultants/inmarketing' element={<InMarketing />}/>
        <Route path='consultants/inmarketing/view/:id' element={<LeadsView />}/>
        <Route path='consultants/placed' element={<PlacedCndtsList />}/>
        <Route path='consultants/placed/view/:id' element={<LeadsView />}/>
        <Route path='consultants/terminated' element={<TerminatedCndtsList />}/>
        <Route path='consultants/terminated/view/:id' element={<LeadsView />}/>
        <Route path='consultants/background/verification' element={<BgvCndtsList />}/>
        <Route path='consultants/background/verification/view/:id' element={<LeadsView />}/>
        <Route path='consultants/in/job' element={<InJobList />}/>
        <Route path='consultants/in/job/view/:id' element={<LeadsView />}/>
        <Route path='templates' element={<TemplatesList />}/>
        <Route path='template/create' element={<TemplateCreate />}/>
        <Route path='template/edit/:id' element={<TemplateEdit />}/>
        <Route path='template/view/:id' element={<TemplateView />}/>
        <Route path='register/:id' element={<UserRegister/>}/>
        <Route path='checklist/:id/:name' element={<TemplateSubCheckList/>}/>
        <Route path='success' element={<SuccessPage/>}/>
        <Route path='expirations' element={<ExpirationTab/>}/>
        <Route path='offerletters' element={<OfferLetterList />}/>  
        <Route path='h1bpetitions' element={<H1BPetitionList />}/>
        <Route path='no-internet' element={<NoInternetComponent/>}/>
        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDistachToProps)(App);
