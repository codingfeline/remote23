'use client'

import LightGallery from 'lightgallery/react'

// import styles
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

export default function Gallery() {
  const images = [
    { url: '/gallery/pic1.jpg', thumb: '/gallery/pic1_sm.jpg', alt: 'photo 1' },
    { url: '/gallery/pic2.jpg', thumb: '/gallery/pic2_sm.jpg', alt: 'photo 2' },
    { url: '/gallery/pic3.jpg', thumb: '/gallery/pic3_sm.jpg', alt: 'photo 3' },
    { url: '/gallery/pic4.jpg', thumb: '/gallery/pic4_sm.jpg', alt: 'photo 4' },
    { url: '/gallery/pic5.jpg', thumb: '/gallery/pic5_sm.jpg', alt: 'photo 5' },
    { url: '/gallery/pic6.jpg', thumb: '/gallery/pic6_sm.jpg', alt: 'photo 6' },
    { url: '/gallery/pic7.jpg', thumb: '/gallery/pic7_sm.jpg', alt: 'photo 7' },
    { url: '/gallery/pic8.jpg', thumb: '/gallery/pic8_sm.jpg', alt: 'photo 8' },
  ]

  const onInit = () => {
    console.log('lightGallery has been initialized')
  }
  return (
    <div className="">
      <LightGallery onInit={onInit} speed={500} plugins={[lgThumbnail, lgZoom]}>
        {images.map(i => (
          <a href={i.url}>
            <img src={i.thumb} alt={i.alt && i.alt} />
          </a>
        ))}
      </LightGallery>
    </div>
  )
}
