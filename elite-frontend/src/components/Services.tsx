import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ title, icon }: { 
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col items-center justify-center h-48">
      <div className="text-purple-600 mb-4">
        {icon}
      </div>
      <h3 className="text-purple-800 font-bold mb-2 text-center">{title}</h3>
      
      <div className="absolute -bottom-2 -right-2 opacity-20">
        <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600" />
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="w-full py-16 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute top-10 left-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '5em', width: '5em' }} className="text-purple-600 transform rotate-45" />
        </div>
        <div className="absolute top-40 left-40">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 opacity-80" />
        </div>
        <div className="absolute bottom-10 right-10">
          <FontAwesomeIcon icon={faPaw} style={{ height: '6em', width: '6em' }} className="text-purple-600 transform -rotate-45" />
        </div>
        <div className="absolute bottom-40 right-40">
          <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-purple-600 transform rotate-12 opacity-90" />
        </div>
        <div className="absolute top-20 right-20">
          <FontAwesomeIcon icon={faPaw} style={{ height: '5em', width: '5em' }} className="text-purple-600 transform -rotate-12" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#44396F] mb-4">Our Services</h2>
          <div className="flex justify-center items-center gap-4">
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform -rotate-45 opacity-80" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 opacity-90" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-purple-600 transform rotate-45 opacity-80" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            title="General Wellness & Preventative Care Exams"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600" />
              </div>
            }
          />
          <ServiceCard
            title="Vaccinations, Antibody Tests, Microchipping"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 opacity-90" />
              </div>
            }
          />
          <ServiceCard
            title="Routine Dental Procedures"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-45" />
              </div>
            }
          />
          
          <ServiceCard
            title="Ophthalmology Exam"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-45 opacity-80" />
              </div>
            }
          />
          <ServiceCard
            title="Internal Medicine"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform rotate-12 opacity-90" />
              </div>
            }
          />
          <ServiceCard
            title="Routine Surgeries"
            icon={
              <div className="flex justify-center items-center">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-purple-600 transform -rotate-12" />
              </div>
            }
          />
        </div>
        
        <div className="w-32 h-6 mx-auto relative my-6">
          <svg viewBox="0 0 200 30" className="w-full">
            <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
          </svg>
        </div>
        
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          As a leading Riyadh veterinary clinic, we offer a comprehensive range of veterinary
          services to keep your furry companions happy and healthy.
        </p>
        
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full flex items-center gap-2 mx-auto">
          VIEW ALL
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Services;
