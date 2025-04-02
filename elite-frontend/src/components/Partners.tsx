import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

interface PartnerCardProps {
  logo: React.ReactNode;
  name: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ logo, name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-[#E5E7F4] rounded-full flex items-center justify-center mb-4 relative">
        {logo}
        <div className="absolute -bottom-2 -right-2">
          <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-purple-600 opacity-20" />
        </div>
      </div>
      <h3 className="text-[#44396F] font-bold text-lg">{name}</h3>
    </div>
  );
};

const Partners = () => {
  return (
    <div className="w-full py-16 bg-white relative">
      {/* Background paw prints */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 right-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45" />
        </div>
        <div className="absolute top-40 left-20">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 opacity-80" />
        </div>
        <div className="absolute bottom-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-45" />
        </div>
        <div className="absolute bottom-40 right-20">
          <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-12 opacity-90" />
        </div>
        <div className="absolute top-20 right-40">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-12 opacity-70" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#44396F] mb-2">Our Partners</h2>
        
        {/* Paw prints instead of wavy line */}
        <div className="flex justify-center items-center gap-4 my-4">
          <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-45 opacity-80" />
          <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-90" />
          <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-45 opacity-80" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <PartnerCard
            logo={<FontAwesomeIcon icon={faPaw} style={{ height: '2.5em', width: '2.5em' }} className="text-purple-600" />}
            name="Partner 1"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faPaw} style={{ height: '2.5em', width: '2.5em' }} className="text-purple-600 transform rotate-45 opacity-90" />}
            name="Partner 2"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faPaw} style={{ height: '2.5em', width: '2.5em' }} className="text-purple-600 transform -rotate-45 opacity-80" />}
            name="Partner 3"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faPaw} style={{ height: '2.5em', width: '2.5em' }} className="text-purple-600 transform rotate-12 opacity-70" />}
            name="Partner 4"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
