
import React from "react";

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
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#44396F] mb-2">Our Partners</h2>
        
        {/* Wavy line */}
        <div className="w-40 h-6 mx-auto relative my-4">
          <svg viewBox="0 0 200 30" className="w-full">
            <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#9b87f5" fill="none" strokeWidth="4"/>
          </svg>
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
