/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AISearchComponent } from '../../components/aiSearch';
import { PostB2BOpenAiSearch } from '../../actions/aiSearch/AISearchActions';

class AISearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aiSearchShow: props.state.aisShow,
      aiSearch: '',
      isLoading: false,
      query: '',
      content: ''
    };
  };
  componentDidUpdate(prevProps) {
    if (prevProps.state.aisShow !== this.props.state.aisShow) {
      this.setState({ aiSearchShow: this.props.state.aisShow });
    }
  }
  componentWillUnmount() {
    this.setState({query: '', content: ''});
  }
  setStateData = (data) => this.setState({ ...data });
  handleKeySearch = () => {
    const { aiSearch } = this.state;
    const reqBody = { query: aiSearch };
    this.setState({ isLoading: true, query: aiSearch, aiSearch: ''});
    this.props.PostB2BOpenAiSearch(reqBody, (resObj) => {
      if (resObj.status == '200') {
        const resData = resObj.resData.result;
        // const newEntry = {
        //   id: Date.now().toString(),
        //   query: reqBody.query,
        //   content: resData.content,
        // };
        this.setState({ isLoading: false, content: resData.content });
        // this.handleAiSearch(resData.content);
      } else {
        this.setState({ content: '', isLoading: false });
      }
    });
  }
  handleAiSearch = (content) => {
    let i = -1;
    const interval = setInterval(() => {
      this.setState(prev => ({content: prev.content + content[i]}));
      i++;
      if ((i + 1) >= content.length) clearInterval(interval);
    }, 8);
    return () => clearInterval(interval);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleKeySearch();
    }
  }
  handleClose = () => this.props.handleAiSearchClose(false);

  render() {
    return <AISearchComponent
      state={this.state}
      setStateData={this.setStateData}
      handleKeySearch={this.handleKeySearch}
      handleKeyDown={this.handleKeyDown}
      handleClose={this.handleClose}
    />
  };
};

const mapStateToProps = (state) => ({ AISearchReducer: state.AISearchReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BOpenAiSearch: (body, callback) => dispatch(PostB2BOpenAiSearch(body, callback))
});

export default connect(mapStateToProps, mapDistachToProps)(AISearchPage);