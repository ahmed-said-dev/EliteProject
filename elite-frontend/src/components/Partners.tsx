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
      <div className="w-24 h-24 bg-[#E5E7F4] rounded-full flex items-center justify-center mb-4">
        {logo}
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
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600" />
        </div>
        <div className="absolute bottom-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#44396F] mb-2">Our Partners</h2>
        
        {/* Paw prints instead of wavy line */}
        <div className="flex justify-center items-center gap-4 my-4">
          <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-[#9b87f5] transform -rotate-12" />
          <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-[#9b87f5]" />
          <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-[#9b87f5] transform rotate-12" />
        </div>
        
        {/* Falcon icon with line */}
        <div className="relative flex justify-center items-center mb-12">
          <div className="absolute left-1/4 transform -translate-x-1/2">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
              <circle cx="35" cy="35" r="30" fill="#FEDF4F" opacity="0.2"/>
              <circle cx="35" cy="35" r="20" fill="#9b87f5" opacity="0.2"/>
              <path d="M35,15 Q45,25 35,45 Q25,25 35,15" fill="#9b87f5"/>
            </svg>
          </div>
          <div className="border-b border-dashed border-purple-300 w-1/2 mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-xl mx-auto">
          <PartnerCard 
            logo={
              <div className="text-purple-400 text-sm font-bold">
                YOUR<br/>LOGO
              </div>
            }
            name="Elite Falcons"
          />
          <PartnerCard 
            logo={
              <div className="text-purple-400 text-sm font-bold">
                YOUR<br/>LOGO
              </div>
            }
            name="Vest Van"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
