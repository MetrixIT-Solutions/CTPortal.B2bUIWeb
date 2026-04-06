/**
 * Copyright (C) KagVij Private Limited - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Ashok Shetty <kagvij.com@gmail.com>, Aug 2024
 */

import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import interIcon from '../../assets/images/icons/interview.png';
import submissIcon from '../../assets/images/icons/submission.png';
import expiraIcon from '../../assets/images/icons/expiration.png';
import invIcon from '../../assets/images/icons/male-user.svg';
import chatGPTIcon from '../../assets/images/icons/chat-gpt.png';

import { getB2BNotificationsList, putNotificationsCountRead } from '../../actions/notifications/NotificationActions';

import { PostB2BUserLogout } from '../../actions/login/LoginActions';
import hashHistory from '../../hashHistory';
import localForage from '../../hooks/localForage';
import moment from 'moment';

import '../../assets/css/ChatMessage.css'; // Optional for styling
import AISearchPage from '../../containers/aiSearch/AISearchPage';


export class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      register: props.register || '',
      pmShow: false,
      ntfShow: false,
      today: new Date(),
      showAll: false,
      aisShow: false
    };
    this.profileRef = React.createRef();
    this.notifyRef = React.createRef();
  }
  handleProfileMenu = (pmShow) => this.setState({ pmShow });

  handleClickOutside = (event) => {
    const { pmShow, ntfShow } = this.state;
    if (this.profileRef.current && !this.profileRef.current.contains(event.target) && pmShow) {
      this.setState({ pmShow: false });
    }
    if (this.notifyRef.current && !this.notifyRef.current.contains(event.target) && ntfShow) {
      this.setState({ ntfShow: false });
    }
  }
  notificationList = () => this.props.getB2BNotificationsList((resObj) => { });
  componentDidMount = () => {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { ncDt } = this.props.NtfcReducer;
    const ncDtV = (ncDt === null || (120 < (new Date() - ncDt) / 1000));
    ncDtV && this.notificationList();
  }
  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleLogoutClick = async () => {
    this.props.PostB2BUserLogout(resObj => { });
    hashHistory.push('/login');
    await localForage.clearItems()
  }

  handleNotificatiions = () => {
    this.setState({ ntfShow: !this.state.ntfShow, showAll: false });
    const { nuCount } = this.props.NtfcReducer;
    const ntfc = 'Read';
    const reqBody = { ntfc };
    !this.state.ntfShow && nuCount && this.props.putNotificationsCountRead(reqBody, (resObj) => {
      this.notificationList();
    });
    !this.state.ntfShow && !nuCount && this.notificationList();
  }
  handleViewAllNotices = () => this.setState({ showAll: true });

  handleMyprofile = () => hashHistory.push('/profile');
  handleAddress = () => hashHistory.push('/address');
  handleChangePassword = () => hashHistory.push('/change-password');
  handleMeetingLinks = () => hashHistory.push('/meeting-links');

  handleView = (data) => {
    switch (data.nFrom) {
      case 'Invitations':
        hashHistory.push('/consultants/invitations/view/' + data.recordId);
        break;
      case 'Submissions':
        hashHistory.push('/submissions/view/' + data.recordId);
        break;
      case 'Interviews':
        hashHistory.push('/interview/view/' + data.recordId);
        break;
      case 'Expirations':
        hashHistory.push('/expirations');
        break;
    }
  }
  setImages = (nFrom) => {
    switch (nFrom) {
      case 'Invitations': return { icon: invIcon };
      case 'Submissions': return { icon: submissIcon };
      case 'Interviews': return { icon: interIcon };
      case 'Expirations': return { icon: expiraIcon };
      default: return { icon: '' };
    }
  }


  handleAiSearchClose = (type) => this.setState({ aisShow: type });
  handleAiSearchShow = () => this.setState({ aisShow: true });

  render() {
    const { showAll } = this.state;
    const fDate = moment().format('dddd - MMM Do, YYYY');
    const { ntfcList, nuCount } = this.props.NtfcReducer;
    const notices = ((showAll || ntfcList.length < 9) ? ntfcList : ntfcList.slice(0, 2));

    const { aisShow } = this.state;

    // const htmlContent = marked.parse(content);
    return (
      <header className='main-header'>
        <div className='d-flex align-items-center logo-box justify-content-start'>
          {/* <a className='waves-effect waves-light nav-link d-none d-md-inline-block mx-10 push-btn bg-transparent' data-toggle='push-menu' role='button'>
            <i className='fa-solid fa-bars'></i>
          </a> */}
          {/* Logo  */}
          <a onClick={() => hashHistory.push('/home')} className='logo'>
            {/* logo */}
            <div className='logo-lg'>
              <h2 className='mb-0'>CT Portal</h2>
              {/* <span className='light-logo'><img src='../images/logo-dark-text.png' alt='logo' /></span> */}
            </div>
          </a>
        </div>
        {/* Header Navbar  */}
        <nav className='navbar navbar-static-top'>
          {/* Sidebar toggle button */}
          <div className='app-menu'>
            <ul className='header-megamenu nav'>
              <li className='btn-group nav-item d-md-none'>
                <a className='waves-effect waves-light nav-link push-btn' data-toggle='push-menu' role='button'>
                  <i className='fa-solid fa-bars'></i>
                </a>
              </li>
            </ul>
          </div>

          <div className='navbar-custom-menu r-side'>
            <ul className='nav navbar-nav'>
              <li className='btn-group nav-item d-lg-flex d-none align-items-center'>
                <p className='mb-0 text-fade pr-10'>{fDate}</p>
              </li>

              <li className='dropdown notifications-menu'>
                <a className='waves-effect waves-light dropdown-toggle' data-toggle='dropdown' title='AI Search' onClick={this.handleAiSearchShow}>
                  <img src={chatGPTIcon} width={20} />
                </a>
              </li>

              {this.state?.register !== 'register' && <>
                {/* Notifications  */}
                <li className='dropdown notifications-menu' ref={this.notifyRef}>
                  <a onClick={this.handleNotificatiions} className='waves-effect waves-light dropdown-toggle' data-toggle='dropdown' title='Notifications'>
                    <i className='fa-regular fa-bell'></i>{nuCount ? <div style={{ position: 'absolute', top: 0, right: 0 }}><span className='badge badge-pill badge-danger'>{nuCount}</span></div> : ''}
                  </a>
                  <ul className={classnames('dropdown-menu animated bounceIn', { 'show': this.state.ntfShow })}>
                    <li className='header'>
                      <div className='p-10'>
                        <div className='flexbox'>
                          <div>
                            <h5 className='mb-0 mt-0'>Notifications</h5>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      {/* inner menu: contains the actual data */}
                      <PerfectScrollbar>
                        <ul className='menu sm-scrol p-10' style={{ maxHeight: '600px', onScrollX: 'hidden' }}>
                          {notices.map((item) => {
                            const { icon } = this.setImages(item.nFrom);
                            return (
                              <li key={item._id} className='d-flex align-items-center'>
                                {icon ? <img src={icon} title={item.nTitle} style={{ width: '20px', height: '20px', marginRight: '10px' }} /> : <i className='fa-regular fa-message'></i>}
                                <a onClick={() => this.handleView(item)}>{item.nMessage}</a>
                              </li>
                            )
                          })}
                        </ul>
                      </PerfectScrollbar>
                    </li>
                    {ntfcList.length > 8 && !showAll && <li className='footer'>
                      <a onClick={this.handleViewAllNotices}>View all</a>
                    </li>}
                  </ul>
                </li>
                {/* User Account */}
                <li className='dropdown user user-menu' ref={this.profileRef}>
                  <a onClick={() => this.handleProfileMenu(true)} className='waves-effect waves-light dropdown-toggle' data-toggle='dropdown' title='User'>
                    <i className='fa-regular fa-user'><span className='path1'></span><span className='path2'></span></i>
                  </a>
                  <ul className={classnames('dropdown-menu animated flipInX', { 'show': this.state.pmShow })} >
                    <li className='user-body'>
                      <a className='dropdown-item' onClick={this.handleMyprofile}><i className='fa-regular fa-user text-muted mr-2'></i> Profile</a>
                      <a className='dropdown-item' onClick={this.handleAddress}><i className='fa-regular fa-address-card text-muted mr-2'></i> Address</a>
                      <a className='dropdown-item' onClick={this.handleChangePassword}><i className='fa-solid fa-unlock text-muted mr-2'></i> Change Password</a>
                      <a className='dropdown-item' onClick={this.handleMeetingLinks}><i className='fa-solid fa-link'></i> Meeting Links</a>
                      <div className='dropdown-divider'></div>
                      <a className='dropdown-item' onClick={this.handleLogoutClick}><i className='fa-solid fa-arrow-right-from-bracket text-muted mr-2'></i> Logout</a>
                    </li>
                  </ul>
                </li>
              </>}
            </ul>
          </div>
        </nav>
        {aisShow && <AISearchPage state={this.state} handleAiSearchClose={this.handleAiSearchClose}/>}
      </header>
    )
  }
}

const mapStateToProps = (state) => ({ NtfcReducer: state.NtfcReducer });
const mapDistachToProps = (dispatch) => ({
  PostB2BUserLogout: (callback) => dispatch(PostB2BUserLogout(callback)),
  getB2BNotificationsList: (callback) => dispatch(getB2BNotificationsList(callback)),
  putNotificationsCountRead: (reqBody, callback) => dispatch(putNotificationsCountRead(reqBody, callback)),
});

export default connect(mapStateToProps, mapDistachToProps)(HeaderComponent);
