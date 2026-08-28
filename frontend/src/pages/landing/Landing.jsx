import React from 'react'
import { Navbar } from '../../localcomponents/Navbar'
import Categories from '../../localcomponents/Categories'
import WhyMotions from '../../localcomponents/whyMotion'
import Footer from '../../localcomponents/Footer'
import HorizontalScroll from '../../localcomponents/HorizontalScroll'
import Hero from '../../localcomponents/Hero'

const Landing = () => {
  return (
    <div className="relative bg-[#F9F6F0]">
      <Navbar />
      <Hero />
      
      {/* Container for the Stacked Overlay Sequence */}
      <div className="relative">
        {/* Pinned Section */}
        <div className="relative z-10">
          <HorizontalScroll />
        </div>

        {/* Overlapping Section */}
        <div className="relative z-20 -mt-[100vh]">
          <Categories />
        </div>
      </div>

      <WhyMotions />
      <Footer />
          

    </div>
  )
}

export default Landing