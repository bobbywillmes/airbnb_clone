import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GalleryBase(props) {
  const subImages = props.images.slice(1, 5);
  if (props.images.length === 1) {
    return (
      <div id="galleryBase" className="col-12">
        <div>
          <img data-slideid={0} src={props.images[0].src} className="img-responsive" alt="" key={0} onClick={props.setCurrentSlide} />
        </div>
        <button className="btn btn-light btn-sm" onClick={props.openGalleryList}><FontAwesomeIcon icon={['fas', 'grip']} /> Show all photos</button>
      </div>
    )
  }
  return (
    <div id="galleryBase" className="row">
      <div className="left col-12 col-md-7">
        <div>
          <img data-slideid={0} src={props.images[0].src} className="img-responsive" alt="" key={0} onClick={props.setCurrentSlide} />
        </div>
      </div>
      <div className="right d-none col-md-5 d-md-flex">
        {subImages.map((image, index) => {
          return (
            <div key={index + 1}>
              <img data-slideid={index + 1} src={image.src} className="img-responsive" onClick={props.setCurrentSlide} />
            </div>
          )
        })}
      </div>
      <button className="btn btn-light btn-sm" onClick={props.openGalleryList}><FontAwesomeIcon icon={['fas', 'grip']} /> Show all photos</button>
    </div>
  )
}

export default GalleryBase