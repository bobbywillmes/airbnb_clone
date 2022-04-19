import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GalleryList(props) {
  return (
    <div id="galleryList">
      <button className="btn closeBtn" onClick={props.closeGalleryList}><FontAwesomeIcon icon={['fas', 'xmark']} /></button>
      <div className="container">
        {props.images.map((image, index) => {
          return (
            <div key={index} className="listImgWrap">
              <img src={image.src} alt="" key={index} data-slideid={index} onClick={props.setCurrentSlide} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GalleryList