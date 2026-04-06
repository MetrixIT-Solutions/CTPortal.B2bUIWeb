/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import { all, fork } from 'redux-saga/effects';

import WatchUserLoginSaga from './login';
import WatchOrganizationsSaga from './organizations';
import WatchVendorSaga from './vendors';
import WatchUserRolesSaga from './roles';
import WatchPanelsSaga from './panels';
import WatchBranchesSaga from './branches';
import WatchUserProfileSaga from './profile';
import WatchUserSaga from './users';
import WatchConsultantsSaga from './consultants';
import WatchInvitationsSaga from './invitations';
import WatchInviteNotesSaga from './invitations/notes';
import WatchInviteMeetingsSaga from './invitations/meetings';
import WatchInvitationsReviewerSaga from './invitations/Reviewers'
import WatchSubmissionsSaga from './submissions';
import WatchInterviewsSaga from './interviews';
import WatchSubmissionFollSaga from './submissionFollow';
import WatchInterviewFollSaga from './interviewFoll';
import WatchInterviewsFeedbackSaga from './interviewFdbk';
import WatchLeadsSaga from './leads';
import WatchUserRolesAccessSaga from './rolesAccess';
import WatchTemplatesSaga from './templates';
import WatchUserMeetingLinkSaga from './meetingLink';
import WatchDropdownsSaga from './dropdowns';
import WatchExpirationsSaga from './expiration';
import WatchNotificationsSaga from './notifications'
import WatchH1BPtnsSaga from './h1b-Petitions';
import WatchOfferLetterSaga from './offer-letter';
import WatchGoalsSaga from './goals';
import WatchOpenAiSearchSaga from './aiSearch';

function* RootSaga() {
  yield all([
    fork(WatchUserLoginSaga),
    fork(WatchOrganizationsSaga),
    fork(WatchVendorSaga),
    fork(WatchUserRolesSaga),
    fork(WatchPanelsSaga),
    fork(WatchBranchesSaga),
    fork(WatchUserProfileSaga),
    fork(WatchUserSaga),
    fork(WatchConsultantsSaga),
    fork(WatchInvitationsSaga),
    fork(WatchInviteNotesSaga),
    fork(WatchInviteMeetingsSaga),
    fork(WatchInvitationsReviewerSaga),
    fork(WatchSubmissionsSaga),
    fork(WatchInterviewsSaga),
    fork(WatchSubmissionFollSaga),
    fork(WatchInterviewFollSaga),
    fork(WatchInterviewsFeedbackSaga),
    fork(WatchLeadsSaga),
    fork(WatchUserRolesAccessSaga),
    fork(WatchTemplatesSaga),
    fork(WatchUserMeetingLinkSaga),
    fork(WatchDropdownsSaga),
    fork(WatchExpirationsSaga),
    fork(WatchNotificationsSaga),
    fork(WatchH1BPtnsSaga),
    fork(WatchOfferLetterSaga),
    fork(WatchGoalsSaga),
    fork(WatchOpenAiSearchSaga)
  ]);
}

export default RootSaga;
