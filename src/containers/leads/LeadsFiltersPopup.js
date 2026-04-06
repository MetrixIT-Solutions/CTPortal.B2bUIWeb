/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { postB2BOrgTeamsTotalList } from '../../actions/panels/PanelsActions';
import { postB2BUsersList, postB2bUsersTotalList } from '../../actions/users/UsersActions';
import { LeadsFiltersPopupCompnt } from '../../components/leads';

const LeadsFiltersPopup = (props) => {
  const {showFilters, userData, filters} = props.state;
  const {setStateData} = props;
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState({rctrs: [], mntrs: [], onss: [], ofss: [], rctrsOrg: [], mntrsOrg: [], onssOrg: [], ofssOrg: []});
  const [data, setData] = useState({disabled: false, team: '', rctr: '', mntr: '', ons: '', ofs: '', tName: '', onsName: '', ofsName: '', mntrName: '', rctrName: ''});

  useEffect(() => {
    if(showFilters) {
      setData({disabled: false, team: filters?.team ? filters.team : '', rctr: filters?.rctr ? filters.rctr : '', mntr: filters?.mntr ? filters.mntr : '', ons: filters?.ons ? filters.ons : '', ofs: filters?.ofs ? filters.ofs : '', tName: filters?.tName ? filters?.tName : '', onsName: filters?.onsName ? filters?.onsName : '', mntrName: filters?.mntrName ? filters?.mntrName : '', ofsName: filters?.ofsName ? filters.ofsName : '', rctrName: filters?.rctrName ? filters.rctrName : ''});
    }
  }, [showFilters]);
  useEffect(() => {
    if(userData?.org) {
      setTeamsData();
      getUsersData();
    }
  }, [userData?.org]);

  const setTeamsData = () => {
    if(userData?.userType === 'Employee') {
      const teams = userData.teams.map(team => {
        return {value: team._id, label: team.tName, ...team};
      });
      setTeams(teams);
    } else if(userData?.userType !== 'Employee') {
      const reqBody = { status: 'Active', orgID: userData.org};
      props.postB2BOrgTeamsTotalList(reqBody, (resObj) => {
        if (resObj.status === '200') {
          const teams = resObj.resData.result.map(item => ({value: item._id, label: item.oTeam, tName: item.oTeam, tCode: item.otCode, ...item}));
          setTeams(teams);
        }
      });
    }
  }
  const getUsersData = () => {
    const userType = userData?.userType !== 'Employee' ? {userType: 'Employee'} : {};
    const reqBody = { orgId: userData?.org, org: userData?.org, status: 'Active', ...userType, actPgNum: 1, rLimit: 100 };
    if(userData?.userType === 'Employee') {
      props.postB2BUsersList(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const uData = resObj.resData.result.usersList;
          setUsersData(uData);
        }
      });
    } else if(userData?.userType !== 'Employee') {
      props.postB2bUsersTotalList(reqBody, (resObj) => {
        if (resObj.status == '200') {
          const uData = resObj.resData.result;
          setUsersData(uData);
        }
      });
    }
  }
  const setUsersData = (uData) => {
    const rctrs = [], mntrs = [], onss = [], ofss = [], rctrsOrg = [], mntrsOrg = [], onssOrg = [], ofssOrg = [];
    uData.forEach(usr => {
      switch(usr.userRole) {
        case 'Onsite Manager':
        case 'Onsite Lead':
          // onss.push(usr);
          onssOrg.push(usr);
          break;
        case 'Offshore Manager':
        case 'Offshore Lead':
          // ofss.push(usr);
          ofssOrg.push(usr);
          break;
        case 'Recruiter':
          // rctrs.push(usr);
          rctrsOrg.push(usr);
          break;
        case 'Mentor':
          // mntrs.push(usr);
          mntrsOrg.push(usr);
          break;
      }
    });
    setUsers({rctrs, mntrs, onss, ofss, rctrsOrg, mntrsOrg, onssOrg, ofssOrg});
  }

  const handleOnChange = (e, value) => {
    const sv = e.target.value;
    if(value == 'team'){
      const tData = sv ? teams.find(item => item._id == sv) : {label: ''};
      const onss = sv ? users.onssOrg.filter(item => item.pTeamIDs.includes(sv)) : users.onss;
      const ofss = sv ? users.ofssOrg.filter(item => item.pTeamIDs.includes(sv)) : users.ofss;
      const mntrs = sv ? users.mntrsOrg.filter(item => item.pTeamIDs.includes(sv)) : users.mntrs;
      const rctrs = sv ? users.rctrsOrg.filter(item => item.pTeamIDs.includes(sv)) : users.rctrs;
      setData(ps => ({...ps, team: e.target.value, tName: tData?.label || '', ons: '', onsName: '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''}));
      setUsers(usrs => ({...usrs, onss, ofss, mntrs, rctrs}));
    } else if(value === 'ons') {
      const onsData = sv ? users.onss.find(item => item._id == sv) : {name: ''};
      const ofss = sv ? users.ofssOrg.filter(item => item.pReports.includes(sv) && item.pTeamIDs.includes(data.team)) : users.ofss;
      const mntrs = sv ? users.mntrsOrg.filter(item => item.pReports.includes(sv) && item.pTeamIDs.includes(data.team)) : users.mntrs;
      const rctrs = sv ? users.rctrsOrg.filter(item => item.pReports.includes(sv) && item.pTeamIDs.includes(data.team)) : users.rctrs;
      setData(ps => ({...ps, ons: e.target.value, onsName: onsData?.name || '', ofs: '', ofsName: '', mntr: '', mntrName: '', rctr: '', rctrName: ''}));
      setUsers(usrs => ({...usrs, ofss, mntrs, rctrs}));
    } else if(value === 'ofs'){
      const ofsData = sv ? users.ofss.find(item => item._id == sv) : {name: ''};
      const mntrs = sv ? users.mntrsOrg.filter(item => item.pReports.includes(sv) && item.pTeamIDs.includes(data.team)) : users.mntrs;
      const rctrs = sv ? users.rctrsOrg.filter(item => item.pReports.includes(sv) && item.pTeamIDs.includes(data.team)) : users.rctrs;
      setData(ps => ({...ps, ofs: e.target.value, ofsName: ofsData?.name || '', mntr: '', mntrName: '', rctr: '', rctrName: '' }));
      setUsers(usrs => ({...usrs, mntrs, rctrs}));
    } else if(value === 'mntr'){
      const mntrData = sv ? users.mntrs.find(item => item._id == sv) : {name: ''};
      setData(ps => ({...ps, mntr: e.target.value, mntrName: mntrData?.name || ''}));
    } else {
      const rctrData = sv ? users.rctrs.find(item => item._id == sv) : {name: ''};
      setData(ps => ({...ps, rctr: e.target.value, rctrName: rctrData?.name || ''}));
    }
  }

  const handleFiltersApply = () => {
    const rctr = data.rctr ? [{pReports: data.rctr}] : [];
    const mntr = data.mntr ? [{pReports: data.mntr}] : [];
    const ons = data.ons ? [{pReports: data.ons}] : [];
    const ofs = data.ofs ? [{pReports: data.ofs}] : [];
    const tm = data.team ? [{team: data.team}] : [];
    const pReports = [...tm, ...rctr, ...mntr, ...ons, ...ofs];

    setStateData({showFilters: false, filters: {team: data.team, rctr: data.rctr, mntr: data.mntr, ons: data.ons, ofs: data.ofs, tName: data.tName, onsName: data.onsName, ofsName: data.ofsName, mntrName: data.mntrName, rctrName: data.rctrName, pReports}});
  }
  const handleClearFilters = () => {
    setData({disabled: false, team: '', rctr: '', mntr: '', ons: '', ofs: '', tName :'', onsName:'', ofsName:'', mntrName: '', rctrName: ''});
    setStateData({showFilters: false, filters: {team: '', rctr: '', mntr: '', ons: '', ofs: '', tName: '', onsName:'', ofsName:'', mntrName: '', rctrName: '', pReports: []}});
  }

  return <LeadsFiltersPopupCompnt state={{showFilters, teams, users, data, userData}} setStateData={setStateData} setData={setData} handleFiltersApply={handleFiltersApply} handleClearFilters={handleClearFilters} handleOnChange={handleOnChange}/>
}

const mapStateToProps = () => ({});
const mapDistachToProps = (dispatch) => ({
  postB2BOrgTeamsTotalList: (body, callback) => dispatch(postB2BOrgTeamsTotalList(body, callback)),
  postB2BUsersList: (body, callback) => dispatch(postB2BUsersList(body, callback)),
  postB2bUsersTotalList: (body, callback) => dispatch(postB2bUsersTotalList(body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(LeadsFiltersPopup);
