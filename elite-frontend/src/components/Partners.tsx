import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider } from "@fortawesome/free-solid-svg-icons";

interface PartnerCardProps {
  logo: React.ReactNode;
  name: string;
}

const PartnerCard: React.FC<PartnerCardProps> = ({ logo, name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 bg-[#E5E7F4] rounded-full flex items-center justify-center mb-4 relative">
        {logo}
        <div className="absolute -top-2 -right-2">
          <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-purple-600 opacity-20" />
        </div>
      </div>
      <h3 className="text-[#44396F] font-bold text-lg">{name}</h3>
    </div>
  );
};

const Partners = () => {
  return (
    <div className="w-full py-16 bg-white relative overflow-hidden">
      {/* Background animal icons */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-45 opacity-90" />
        </div>
        <div className="absolute top-40 right-20">
          <FontAwesomeIcon icon={faCat} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-30 opacity-80" />
        </div>
        <div className="absolute bottom-20 left-40">
          <FontAwesomeIcon icon={faDog} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute top-60 right-40">
          <FontAwesomeIcon icon={faFish} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-90 opacity-70" />
        </div>
        <div className="absolute bottom-40 left-20">
          <FontAwesomeIcon icon={faOtter} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-180 opacity-75" />
        </div>
        <div className="absolute top-20 right-60">
          <FontAwesomeIcon icon={faDove} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-45 opacity-85" />
        </div>
        <div className="absolute bottom-60 right-20">
          <FontAwesomeIcon icon={faHorse} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-12 opacity-90" />
        </div>
        <div className="absolute top-80 left-60">
          <FontAwesomeIcon icon={faSpider} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-12 opacity-70" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#44396F] mb-4">Our Partners</h2>
          <div className="flex justify-center items-center gap-4 mb-6">
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-45 opacity-90" />
            <FontAwesomeIcon icon={faCat} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-80" />
            <FontAwesomeIcon icon={faDog} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-45 opacity-85" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading brands and organizations to provide the best care for your pets.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Partner Cards */}
          <PartnerCard
            logo={<FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-45" />}
            name="Partner 1"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faDog} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-45" />}
            name="Partner 2"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faOtter} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-90" />}
            name="Partner 3"
          />
          <PartnerCard
            logo={<FontAwesomeIcon icon={faHorse} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-12" />}
            name="Partner 4"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
