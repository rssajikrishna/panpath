import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import WhatWeDo from '../components/Home/WhatWeDo';
import HowItWorks from '../components/Home/HowItWorks';
import WhyWeDo from '../components/Home/WhyWeDo';
import LiveFeed from '../components/Home/LiveFeed';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhatWeDo />
      <HowItWorks />
      <WhyWeDo />
      <LiveFeed />
    </div>
  );
};

export default Home;