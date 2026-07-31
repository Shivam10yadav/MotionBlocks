import React from 'react'
import { Hero } from '../../localcomponents/Hero'
import { Navbar } from '../../localcomponents/Navbar'
import Categories from '../../localcomponents/Categories'
import WhyMotion from '../../localcomponents/whyMotion'
import Footer from '../../localcomponents/Footer'

const Landing = () => {
  return (
      <>
      <Navbar/>
      <Hero/>
      <Categories/>
      <WhyMotion/>
      <Footer/>
      </>
)
}

export default Landing