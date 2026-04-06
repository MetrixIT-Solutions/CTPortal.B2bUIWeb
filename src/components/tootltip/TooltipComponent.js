import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './css/tooltip.css';

const TooltipComponent = (props) => {
  const { position, isTemplate, notes, isTempData, tempData, certificates, password, isCheckList } = props;
  return (
    <div>
      {isTemplate ?
        <OverlayTrigger
          trigger={"hover"}
          key={position}
          placement={position}
          overlay={
            <Popover id={`popover-positioned-${position}`}>
              <Popover.Header as="h3">Template Notes</Popover.Header>
              <Popover.Body>
                <div className='password-rules'>
                  <p><small>{notes}</small></p>
                </div>
              </Popover.Body>
            </Popover>
          } >
          <div className='info-btn ms-2'>
            <a className="btn btn-primary btn-circle btn-xs">
              <i className="fa-solid fa-info"></i>
            </a>
          </div>
        </OverlayTrigger>
        : isTempData ?
          <OverlayTrigger
            trigger="hover"
            key={position}
            placement={position}
            overlay={
              <Popover id={`popover-positioned-${position}`}>
                <Popover.Header as="h3">Template Data</Popover.Header>
                <Popover.Body>
                  <div className='password-rules'>
                    <ul>
                      {tempData && tempData.length > 0 && tempData.map((item, i) => <li key={i}><small>{item._id}</small></li>)}
                    </ul>
                  </div>
                </Popover.Body>
              </Popover>
            } >
            <div className='info-btn ms-2'>
              <a className="btn btn-primary btn-circle btn-xs">
                <i className="fa-solid fa-info"></i>
              </a>
            </div>
          </OverlayTrigger> : isCheckList ?
          <OverlayTrigger
          trigger="hover"
          key={position}
          placement={position}
          overlay={
            <Popover id={`popover-positioned-${position}`}>
              <Popover.Header as="h3">Limit</Popover.Header>
              <Popover.Body>
                <div className='password-rules'>
                  <ul>
                    <li>{tempData.tdLimit}</li>
                  </ul>
                  </div>
                </Popover.Body>
              </Popover>
            } >
            <div className='info-btn ms-2'>
              <a className="btn btn-primary btn-circle btn-xs">
                <i className="fa-solid fa-info"></i>
              </a>
            </div>
          </OverlayTrigger> :
          password ?
          <OverlayTrigger
            trigger="hover"
            key={position}
            placement={position}
            overlay={
              <Popover id={`popover-positioned-${position}`}>
                <Popover.Header as="h3">Password Rules</Popover.Header>
                <Popover.Body>
                  <div className='password-rules'>
                    <ul>
                      <li><small>Contains at least eight characters.</small></li>
                      <li><small>Including at least one number.</small></li>
                      <li><small>Includes both lower and uppercase letters.</small></li>
                      <li><small>Include at least one special characters.</small></li>
                      <li><small>Cannot be your current password.</small></li>
                      <li><small>Cannot contain your 'password'</small></li>
                    </ul>
                  </div>
                </Popover.Body>
              </Popover>
            } >
            <div className='info-btn ms-2'>
              <a className="btn btn-primary btn-circle btn-xs">
                <i className="fa-solid fa-info"></i>
              </a>
            </div>
          </OverlayTrigger> : certificates && certificates.length ? <OverlayTrigger
            trigger={"hover"}
            key={position}
            placement={position}
            overlay={
              <Popover id={`popover-positioned-${position}`}>
                <Popover.Header as="h3">Certificates</Popover.Header>
                <Popover.Body>
                  <div className='password-rules'>
                    <ul>
                      {certificates.map((item, i) => (<li key={i}>{item}</li>))}
                    </ul>
                  </div>
                </Popover.Body>
              </Popover>
            } >
            <div className='info-btn'>
              <div className='icon-green' title={'Certificates: ' + certificates.length}><i className='fas fa-medal'></i></div>
            </div>
          </OverlayTrigger> : null}
    </div>
  )
}

export default TooltipComponent;
