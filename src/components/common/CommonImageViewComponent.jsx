/**
 * CopyrightCount (C) SkillworksIT Solutions Pvt Ltd - All rightCounts Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import Modal from 'react-bootstrap/Modal';

const CommonImageViewComponent = (props) => {
	const { title, show, onHide, imgPath } = props;
	return (
		<Modal show={show} onHide={onHide} size='lg'>
			<Modal.Header closeButton>
				<h5><strong>{title}</strong></h5>
			</Modal.Header>
			<Modal.Body>
				<div>
					<div className='popup_img'>
						<img src={imgPath}></img>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className='text-end'>
					<button type='button' className='btn btn-danger' onClick={onHide}>Close</button>
				</div>
			</Modal.Footer>
		</Modal>
	)
}

export default CommonImageViewComponent;