import React from 'react'
import { Navbar } from '../../localcomponents/Navbar'
import { Hero } from '../../localcomponents/Hero'
import Categories from '../../localcomponents/Categories'
import WhyMotions from '../../localcomponents/whyMotion'
import Footer from '../../localcomponents/Footer'

const Landing = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Categories/>
    <WhyMotions/>
    <Footer/>
    </>
  )
}

export default Landing