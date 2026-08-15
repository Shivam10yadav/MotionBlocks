import React from 'react'
import { Navbar } from '../../localcomponents/Navbar'
import { Hero } from '../../localcomponents/Hero'
import Categories from '../../localcomponents/Categories'
import WhyMotions from '../../localcomponents/whyMotion'
import Footer from '../../localcomponents/Footer'
import HorizontalScroll from '../../localcomponents/HorizontalScroll'

const Landing = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <HorizontalScroll/>
    <Categories/>
    <WhyMotions/>
    <Footer/>
    </>
  )
}

export default Landing