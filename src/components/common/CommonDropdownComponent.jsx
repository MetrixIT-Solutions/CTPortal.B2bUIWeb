/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CommonDropdownComponent = (props) => {
	const { show, onHide, title, name, onChange, onClick, errMsg } = props;
	const erMsg = errMsg && errMsg.includes('Successfully') ? true : false;
	return (
		<Modal show={show} onHide={onHide} className='modal-s mt-3'>
			<Modal.Header closeButton>
				<h5>{`Add ${title}`}</h5>
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className='form-group'>
						<input value={name} type='text' className='form-control' placeholder={`Add ${title}`} onChange={onChange}/>
					</div>
					<div className={`${erMsg ? 'text-center text-success' :'text-center text-danger'}`}>{errMsg}</div>
					<div className='text-right'>
						<Button variant='success' size='md' onClick={onClick}>Save </Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	)
}

export default CommonDropdownComponent;