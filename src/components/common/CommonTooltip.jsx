/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import {OverlayTrigger, Tooltip, Popover} from 'react-bootstrap';

import '../../assets/css/leadStyles.css';

const CommonTooltip = (props) => {
  switch(props.type) {
    case 'Icon':
      return <IconTooltip data={props} />;
    case 'Info':
      return <InfoTooltip data={props} />
    default:
      return <></>;
  }
}

export default CommonTooltip;

/** Start Icon Tooltip */
const IconTooltip = (props) => {
  const {name, className, title, boldTitle, display} = props.data;
  return (
    <>
      <OverlayTrigger placement={display || 'bottom'}
        overlay={
          // <Tooltip id={`tooltip-${display || 'bottom'}`}>
          //   <span>{title} {boldTitle && <strong>{boldTitle}</strong>}</span>
          // </Tooltip>
          <Popover body style={{ backgroundColor: "black" }}>
            <span style={{ color: '#fff' }}>{title} {boldTitle && <strong>{boldTitle}</strong>}</span>
          </Popover>
        }
      >
        <i className={className}> {name}</i>
      </OverlayTrigger>
    </>
  );
}
/** End Icon Tooltip */

/** Start Information Tooltip */
const InfoTooltip = (props) => {
  const {data, className, title, name, display} = props.data;
  return <OverlayTrigger
    trigger={'hover'}
    key={display}
    placement={display}
    overlay={
      <Popover id={`popover-positioned-${display}`}>
        <Popover.Header as='h3'>{title}</Popover.Header>
        <Popover.Body>
          <div className='password-rules'>
            <ul>
              {data.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
          </div>
        </Popover.Body>
      </Popover>
    }>
    <div className='info-btn'>
      <div className='icon-orange'><i className={className}></i> {name}</div>
    </div>
  </OverlayTrigger>
}
/** End Information Tooltip */