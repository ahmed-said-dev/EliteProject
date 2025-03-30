
import React from "react";
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Services from "@/components/Services";
import Navigation from "@/components/Navigation";
import WhyChooseUs from "@/components/WhyChooseUs";
import Doctors from "@/components/Doctors";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Introduction />
      <Services />
      <WhyChooseUs />
      <Doctors />
      <Partners />
      <Contact />
    </div>
  );
};

export default Index;
