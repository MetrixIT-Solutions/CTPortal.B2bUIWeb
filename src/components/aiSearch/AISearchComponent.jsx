/**
 * Copyright (C) SkillworksIT Solutions Pvt Ltd - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by SkillworksIT <contact@skillworksit.com>, Aug 2024
 */

import React from 'react';
import {useSelector} from 'react-redux';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import Spinner from 'react-bootstrap/Spinner';

const AISearchComponent = (props) => {
  const AISearchReducer = useSelector((state) => state.AISearchReducer);
  const { aiSearchShow, aiSearch, isLoading } = props.state;
  const aiSearchArr = AISearchReducer.aiSearchArr; //.filter(item => item.query !== query);
  const { setStateData, handleKeySearch, handleKeyDown, handleClose } = props;
  return (
    <Offcanvas show={aiSearchShow} onHide={handleClose} placement='end' className='ai-offcanvas'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>AI Search</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className='offcanvas-search'>
          <div className='card1'>
            <div className='card-body'>
              {aiSearchArr.length > 0 && aiSearchArr.map((item, i) => {
                const cleanHtml = DOMPurify.sanitize(marked.parse(item.content))
                return (
                  <div key={i}>
                    <div className='div-right'>
                      <p>{item.query}</p>
                    </div>
                    <div className='clearfix'></div>
                    <div className={`chat-message bot `}>
                      <div
                        className='message-content'
                        dangerouslySetInnerHTML={{ __html: cleanHtml }}
                      />
                    </div>
                  </div>
                )
              })}

              {isLoading ? <div className='text-center'>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> : ''}
            </div>
            <div className='card-footer'>
              <h5 className='text-center'>What can I help with? </h5>
              <div>
                <div className='form-group search-input mb-0'>
                  <input type='search' className='form-control' placeholder='Search...' value={aiSearch} onChange={(e) => setStateData({ aiSearch: e.target.value })} onKeyDown={handleKeyDown} />
                  {aiSearch && <a className='search-icon' onClick={handleKeySearch}><i className='fa-solid fa-arrow-up'></i></a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default AISearchComponent