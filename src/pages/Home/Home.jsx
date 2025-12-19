// src/pages/Home/Home.jsx

import About from "./About";
import CTA from "./CTA";
import FAQ from "./FAQ";
import Features from "./Features";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Packages from "./Packages";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div className="bg-base-200">
      <Hero />
      <About />
      <Packages></Packages>
      <Features />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
};

export default Home;
