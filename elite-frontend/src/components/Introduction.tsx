import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow, faKiwiBird, faFrog, faDragon } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const Introduction = () => {
  return (
    <div className="w-full py-16 bg-white relative overflow-hidden">
      {/* Background animal icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45 opacity-90" />
        </div>
        <div className="absolute top-40 left-40">
          <FontAwesomeIcon icon={faCat} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-30 opacity-80" />
        </div>
        <div className="absolute top-60 right-20">
          <FontAwesomeIcon icon={faDog} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute top-20 right-40">
          <FontAwesomeIcon icon={faFish} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-90 opacity-70" />
        </div>
        <div className="absolute bottom-10 left-40">
          <FontAwesomeIcon icon={faOtter} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45 opacity-75" />
        </div>
        <div className="absolute bottom-40 left-20">
          <FontAwesomeIcon icon={faDove} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute bottom-40 right-60">
          <FontAwesomeIcon icon={faHorse} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-12 opacity-90" />
        </div>
        <div className="absolute bottom-20 right-20">
          <FontAwesomeIcon icon={faSpider} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-12 opacity-70" />
        </div>
        <div className="absolute top-80 left-80">
          <FontAwesomeIcon icon={faCrow} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-90 opacity-85" />
        </div>
        <div className="absolute bottom-80 right-80">
          <FontAwesomeIcon icon={faKiwiBird} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-180 opacity-80" />
        </div>
        {/* Additional icons for more variety */}
        <div className="absolute top-40 right-80">
          <FontAwesomeIcon icon={faFrog} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-15 opacity-75" />
        </div>
        <div className="absolute bottom-60 left-60">
          <FontAwesomeIcon icon={faDragon} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-30 opacity-85" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#44396F] mb-4">Welcome to Elite Veterinary Clinic</h2>
          {/* Wavy divider */}
          <div className="w-32 h-6 mx-auto relative mb-6">
            <svg viewBox="0 0 200 30" className="w-full">
              <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto mb-12">
            Your trusted partner in pet healthcare. We provide comprehensive veterinary services with a focus on compassionate care and medical excellence.
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
            Learn More About Us
            <FontAwesomeIcon icon={faPaw} className="ml-6 h-4 w-4 transform -rotate-45" />
          </Button>
        </div>
        
        {/* Split Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* First Split Section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[400px]">
              <Image
                src="/images/img1.webp"
                alt="Elite Veterinary Products"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-[#44396F] font-bold text-xl mb-3">Premium Pet Products</h3>
              <p className="text-gray-600">
                We offer a carefully curated selection of high-quality pet food, supplements, and care products to ensure your pets receive the best nutrition and care they deserve.
              </p>
            </div>
          </div>

          {/* Second Split Section */}
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-[400px]">
              <Image
                src="/images/clinic-interior.webp"
                alt="Elite Veterinary Clinic Interior"
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-[#44396F] font-bold text-xl mb-3">Modern Facilities</h3>
              <p className="text-gray-600">
                Experience veterinary care in our state-of-the-art facility, designed to provide comfort and the highest standard of medical care for your beloved pets.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
        </div>
      </div>
    </div>
  );
};

export default Introduction;
