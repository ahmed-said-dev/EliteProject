import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow, faKiwiBird, faFrog, faDragon } from "@fortawesome/free-solid-svg-icons";

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
          <div className="flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-45 opacity-90" />
            <FontAwesomeIcon icon={faCat} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-80" />
            <FontAwesomeIcon icon={faDog} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-45 opacity-85" />
            <FontAwesomeIcon icon={faFish} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-90 opacity-75" />
            <FontAwesomeIcon icon={faOtter} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-90 opacity-70" />
          </div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Your trusted partner in pet healthcare. We provide comprehensive veterinary services with a focus on compassionate care and medical excellence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md relative">
            <div className="absolute -top-2 -right-2">
              <FontAwesomeIcon icon={faCat} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />
            </div>
            <h3 className="text-[#44396F] font-bold mb-2">Expert Care</h3>
            <p className="text-gray-600">Our team of experienced veterinarians provides the highest standard of care for your beloved pets.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md relative">
            <div className="absolute -top-2 -right-2">
              <FontAwesomeIcon icon={faDog} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform -rotate-45" />
            </div>
            <h3 className="text-[#44396F] font-bold mb-2">Modern Facilities</h3>
            <p className="text-gray-600">State-of-the-art equipment and facilities to ensure the best possible care for your pets.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md relative">
            <div className="absolute -top-2 -right-2">
              <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-90" />
            </div>
            <h3 className="text-[#44396F] font-bold mb-2">Compassionate Service</h3>
            <p className="text-gray-600">We treat your pets like family, providing gentle and caring treatment at all times.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
