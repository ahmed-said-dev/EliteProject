import React from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCat, faDog, faFish, faOtter, faDove, faHorse, faSpider, faCrow, faKiwiBird } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ title, icon }: { 
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md relative">
      <div className="absolute -top-2 -right-2">
        {icon}
      </div>
      <h3 className="text-[#44396F] font-bold mb-2">{title}</h3>
      <p className="text-gray-600">Comprehensive health check-ups and preventive care for your pets.</p>
    </div>
  );
};

const Services = () => {
  return (
    <div className="w-full py-16 bg-[#F5F5F7] relative overflow-hidden">
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
        <div className="absolute bottom-80 right-80">
          <FontAwesomeIcon icon={faCrow} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform -rotate-90 opacity-85" />
        </div>
        <div className="absolute top-40 left-80">
          <FontAwesomeIcon icon={faKiwiBird} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-180 opacity-80" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#44396F] mb-4">Our Services</h2>
          {/* Wavy divider */}
          <div className="w-32 h-6 mx-auto relative mb-6">
            <svg viewBox="0 0 200 30" className="w-full">
              <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of veterinary services to keep your pets healthy and happy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Cards */}
          <ServiceCard
            title="Wellness Exams"
            icon={
              <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-45" />
            }
          />
          <ServiceCard
            title="Vaccinations"
            icon={
              <FontAwesomeIcon icon={faCat} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform -rotate-45" />
            }
          />
          <ServiceCard
            title="Surgery"
            icon={
              <FontAwesomeIcon icon={faDog} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-90" />
            }
          />
          <ServiceCard
            title="Dental Care"
            icon={
              <FontAwesomeIcon icon={faFish} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform -rotate-12" />
            }
          />
          <ServiceCard
            title="Emergency Care"
            icon={
              <FontAwesomeIcon icon={faOtter} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform rotate-30" />
            }
          />
          <ServiceCard
            title="Laboratory"
            icon={
              <FontAwesomeIcon icon={faDove} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-20 transform -rotate-30" />
            }
          />
        </div>

        <div className="text-center mt-12">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            View All Services
            <FontAwesomeIcon icon={faPaw} className="ml-2 h-4 w-4 transform -rotate-45" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Services;
