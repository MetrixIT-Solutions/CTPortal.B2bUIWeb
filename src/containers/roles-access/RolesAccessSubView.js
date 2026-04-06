/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RolesAccessViewComponent } from '../../components/roles-access';
import { GetB2BRoleAccessView } from '../../actions/rolesAccess/RolesAccessActions';

class RolesAccessSubView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rType: {}, loading: true
    }
  }
  componentDidMount = () => {
    this.getRlAcData(this.props.id);
  }
  getRlAcData = (id) => {
    this.props.GetB2BRoleAccessView(id, (resObj) => {
      if (resObj.status == '200') {
        this.setState({ rType: resObj.resData.result, loading: false });
      } else {
        this.setState({ rType: {}, loading: false });
      }
    })
  }
  render() {
    return <RolesAccessViewComponent state={this.state} />
  }
}

const mapStateToProps = (state) => ({});
const mapDistachToProps = (dispatch) => ({
  GetB2BRoleAccessView: (id, callback) => dispatch(GetB2BRoleAccessView(id, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(RolesAccessSubView);