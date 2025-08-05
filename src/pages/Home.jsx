import React from 'react';
import Hero from '../components/Hero';
import WhoIsItFor from '../components/WhoIsItFor';
import HowItWorks from '../components/HowItWorks';
import FeaturedCourses from '../components/FeaturedCourses';

const Home = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhoIsItFor />
      <HowItWorks />
      <FeaturedCourses />
    </div>
  );
};

export default Home;
