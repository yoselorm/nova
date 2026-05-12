import React from 'react'
import Hero from '../components/home/Hero'
import ListAccess from '../components/home/ListAccess'
import IntroSection from '../components/home/IntroSection'
import CentresOfExcellence from '../components/home/CentresOfExcellence'
import InfiniteTestimonials from '../components/home/Testimonials'
import ClinicalExcellence from '../components/home/Whychooseus'
import CTABanner from '../components/CtaBanner'
import PureImageBanner from '../components/home/ImageBanner'
import AppointmentSection from '../components/AppointmentSection'

const Home = () => {
  return (
    <div className='bg-white'>
        <Hero />
        <ListAccess />
        <PureImageBanner />
        <IntroSection/>
        <CentresOfExcellence />
        <ClinicalExcellence />
        <CTABanner />
        <InfiniteTestimonials />
        <AppointmentSection />

        
    </div>
  )
}

export default Home