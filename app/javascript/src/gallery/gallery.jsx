import React, { useState, useEffect } from 'react';
import GalleryBase from './galleryBase';
import GalleryList from './galleryList';
import GallerySlides from './gallerySlides';
import './gallery.scss';

function Gallery(props) {
  const slides = props.images;
  const length = slides.length;

  useEffect(() => {
    disableBodyScroll();
  });

  const [galleryListDisplay, setGalleryListDisplay] = useState(false);
  const [gallerySlidesDisplay, setGallerySlidesDisplay] = useState(false);
  const [current, setCurrent] = useState(0);

  const setCurrentSlide = (event) => {
    let slideId = event.target.getAttribute('data-slideid');
    slideId = Number(slideId);

    setCurrent(slideId);

    const gallerySlidesWrap = document.getElementById('gallerySlides');
    gallerySlidesWrap.classList.add('show');
    setGallerySlidesDisplay(true);
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

  const openGalleryList = () => {
    const galleryList = document.getElementById('galleryList');
    galleryList.classList.add('show');
    setGalleryListDisplay(true);
  }

  const closeGalleryList = () => {
    const galleryList = document.getElementById('galleryList');
    galleryList.classList.remove('show');
    setGalleryListDisplay(false);
  }

  const closeGallerySlides = () => {
    const gallerySlides = document.getElementById('gallerySlides');
    gallerySlides.classList.remove('show');
    setGallerySlidesDisplay(false);
  }

  const disableBodyScroll = () => {
    // if either the galleryListDisplay or gallerySlidesDisplay elements are open, then remove the scrollbar for html body
    const body = document.querySelector('body');
    if (galleryListDisplay || gallerySlidesDisplay) {
      body.style.setProperty('overflow', 'hidden');
    } else {
      body.style.setProperty('overflow', 'auto');
    }
  }

  if (props.images.length === 0) { return null }

  return (
    <div id="gallery">
      <GalleryBase images={props.images} setCurrentSlide={setCurrentSlide} openGalleryList={openGalleryList} />
      <GalleryList images={props.images} setCurrentSlide={setCurrentSlide} closeGalleryList={closeGalleryList} />
      <GallerySlides images={props.images} current={current} nextSlide={nextSlide} prevSlide={prevSlide} closeGallerySlides={closeGallerySlides} />
    </div>
  )
}

export default Gallery