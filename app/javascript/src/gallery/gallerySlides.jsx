import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GallerySlides(props) {
  const slides = props.images;

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div id="gallerySlides">
      <section className="slider">
        <div className="currentSlide">{props.current + 1} / {slides.length}</div>
        <button className="btn closeBtn" onClick={props.closeGallerySlides}><FontAwesomeIcon icon={['fas', 'xmark']} /></button>
        <FontAwesomeIcon className="left-arrow" icon={['fas', 'circle-arrow-left']} onClick={props.prevSlide} />
        <FontAwesomeIcon className="right-arrow" icon={['fas', 'circle-arrow-right']} onClick={props.nextSlide} />
        {slides.map((slide, index) => {
          return (
            <div className={index === props.current ? 'slide_active' : 'slide'} key={index}>
              {index === props.current && (
                <>
                  <img src={slide.src} alt="animals" />
                </>
              )}
            </div>
          )
        })}
      </section>
    </div>
  )
}

export default GallerySlides