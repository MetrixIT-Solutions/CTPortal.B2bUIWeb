/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PostB2BRoleAccessCreate, GetB2BRoleAccessView, PutB2BRoleAccessUpdate } from '../../actions/rolesAccess/RolesAccessActions';
import { postB2BRolesList } from '../../actions/roles/RolesActions';
import { postB2BUsersList } from '../../actions/users/UsersActions';

import { RoleAccessEditComponent } from '../../components/roles-access'
import localForage from '../../hooks/localForage';
import hashHistory from '../../hashHistory';
import data from '../../../public/data/RoleAccessNew.json'

class RoleAccessSubEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rType: '',
      rOrg:'',
      rName: '',
      uName: '',
      raSeq: 0,
      errMsg: '',
      disable: false,
      selectedItems: [],
      rAccObj: {}
    }
  }
  componentDidMount = async () => {
    const rc = await localForage.getItem('rAccCount');
    const raSeq = rc.value || '';
    this.setState({ raSeq: raSeq + 1 });
    this.getRolesAccDate(this.props.id);
  }
  setStateData = (data) => this.setState({ ...data });
  getRolesAccDate = (id) => {
    this.props.GetB2BRoleAccessView(id, (resObj) => {
      if (resObj.status == '200') {
        const data = resObj.resData.result;
        const rAccObj = this.setData(data);
        this.setState({ ...rAccObj, rAccObj })
      }
    })
  }
  setData = (resData) => {
    const selectedItems = data.map(item => ({
      ...item,
      ...(resData.access.find(el => el._id === item._id) || {}),
      actions: item.actions.map(action => ({
        ...action,
        ...(resData.access.find(el => el._id === item._id)?.actions.find(a => a._id === action._id) || {})
      }))
    }));    
    return {
      rType: resData.rType,
      rOrg: resData.orgName,
      rName: resData.rName,
      uName: resData.uName,
      raSeq: resData.raSeq,
      selectedItems,
    }
  }
  handleCheckBoxChange = (product, action) => {
    this.setState((prevState) => {
      const { selectedItems } = prevState;
      const productIndex = selectedItems.findIndex(item => item._id === product._id);
      if (productIndex === -1) {
        const listAction = updatedActions.find(a => a.aName === 'List');
        return {
          selectedItems: [
            ...selectedItems,
            { ...product, isAlwd: listAction ? listAction.isAlwd : false, actions: product.actions.map(a => ({ ...a, isAlwd: a._id === action._id ? !a.isAlwd : a.isAlwd })) }
          ], errMsg: ''
        };
      } else {
        const updatedProduct = { ...selectedItems[productIndex] };
        const updatedActions = updatedProduct.actions.map(a => a._id === action._id ? { ...a, isAlwd: !a.isAlwd } : a);
        // updatedProduct.isAlwd = updatedActions.some(a => a.isAlwd);
        const listAction = updatedActions.find(a => a.aName === 'List');
        updatedProduct.isAlwd = listAction ? listAction.isAlwd : false;        
        updatedProduct.actions = updatedActions;
        let updatedItems = [...selectedItems];
        // if (!updatedProduct.isAlwd) {
        //   updatedItems = updatedItems.filter(item => item._id !== product._id);
        // } else {
        updatedItems[productIndex] = updatedProduct;
        // }
        return { selectedItems: updatedItems, errMsg: '' };
      }
    });
  };
  roleAccessEdit = () => {
    const { raSeq, selectedItems, rAccObj } = this.state;
    const reqBody = { raSeq, access: selectedItems }
    const prevData = { raSeq: rAccObj.raSeq ? rAccObj.raSeq : '', access: rAccObj.selectedItems }
    this.setState({ disable: true });
    if (JSON.stringify(reqBody) !== JSON.stringify(prevData)) {
      this.props.PutB2BRoleAccessUpdate(this.props.id, reqBody, (resObj) => {
        if (resObj.status == '200') {
          hashHistory.push('/admin-users/roles-access');
          this.setState({ disable: false });
        } else {
          this.setState({ errMsg: 'Role Access Update Failed', disable: false });
        }
      })
    } else {
      this.setState({ errMsg: 'There are no changes', disable: false });
    }
  }
  render() {
    return <RoleAccessEditComponent
      state={this.state}
      setStateData={this.setStateData}
      handleCheckBoxChange={this.handleCheckBoxChange}
      roleAccessEdit={this.roleAccessEdit}
    />
  }
}

const mapStateToProps = (state) => ({});
const mapDistachToProps = (dispatch) => ({
  PostB2BRoleAccessCreate: (body, callback) => dispatch(PostB2BRoleAccessCreate(body, callback)),
  postB2BRolesList: (body, callback) => dispatch(postB2BRolesList(body, callback)),
  postB2BUsersList: (body, callback) => dispatch(postB2BUsersList(body, callback)),
  GetB2BRoleAccessView: (id, callback) => dispatch(GetB2BRoleAccessView(id, callback)),
  PutB2BRoleAccessUpdate: (id, body, callback) => dispatch(PutB2BRoleAccessUpdate(id, body, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(RoleAccessSubEdit);