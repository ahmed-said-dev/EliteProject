
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
          <circle cx="20" cy="10" r="8" />
          <circle cx="40" cy="10" r="8" />
          <circle cx="10" cy="30" r="8" />
          <circle cx="30" cy="30" r="8" />
          <circle cx="50" cy="30" r="8" />
        </svg>
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
          <svg width="80" height="80" viewBox="0 0 80 80" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-10 right-10">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="50" cy="10" r="8" />
            <circle cx="80" cy="10" r="8" />
            <circle cx="10" cy="40" r="8" />
            <circle cx="40" cy="40" r="8" />
            <circle cx="70" cy="40" r="8" />
            <circle cx="20" cy="70" r="8" />
            <circle cx="50" cy="70" r="8" />
            <circle cx="80" cy="70" r="8" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-purple-800 mb-4">What we offer?</h2>
        
        <div className="w-32 h-6 mx-auto relative my-6">
          <svg viewBox="0 0 200 30" className="w-full">
            <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
          </svg>
        </div>
        
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          As a leading Riyadh veterinary clinic, we offer a comprehensive range of veterinary
          services to keep your furry companions happy and healthy.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ServiceCard 
            title="General Wellness & Preventative Care Exams"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <circle cx="24" cy="24" r="10" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M15 15L10 10M33 15L38 10M15 33L10 38M33 33L38 38" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="42" cy="42" r="8" fill="#8B5CF6" opacity="0.3"/>
                  <circle cx="10" cy="42" r="3" fill="#8B5CF6"/>
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Vaccinations, Antibody Tests, Microchipping"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path d="M20 20L40 40M40 20L20 40" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M30 10L35 15M30 50L35 45M10 30L15 35M50 30L45 35" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="30" cy="30" r="3" fill="#8B5CF6"/>
                  <circle cx="45" cy="15" r="5" fill="#8B5CF6" opacity="0.3"/>
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Routine Dental Procedures"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path d="M20 20C20 10 30 10 30 20S40 30 30 30S20 30 20 20Z" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M20 40C20 50 30 50 30 40S40 30 30 30S20 30 20 40Z" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="45" cy="45" r="8" fill="#8B5CF6" opacity="0.3"/>
                  <circle cx="15" cy="15" r="3" fill="#8B5CF6"/>
                </svg>
              </div>
            }
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ServiceCard 
            title="Ophthalmology Exam"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="15" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="30" cy="30" r="5" fill="#8B5CF6"/>
                  <path d="M10 30H20M40 30H50" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M15 15L25 25M35 35L45 45" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="15" cy="45" r="8" fill="#8B5CF6" opacity="0.3"/>
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Internal Medicine"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path d="M20 20L40 40M40 20L20 40" stroke="#8B5CF6" strokeWidth="2"/>
                  <rect x="20" y="20" width="20" height="20" rx="2" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="10" cy="40" r="8" fill="#8B5CF6" opacity="0.3"/>
                  <circle cx="50" cy="20" r="3" fill="#8B5CF6"/>
                </svg>
              </div>
            }
          />
          
          <ServiceCard 
            title="Routine Surgeries"
            icon={
              <div className="flex justify-center items-center">
                <svg width="48" height="48" viewBox="0 0 60 60" fill="none">
                  <path d="M20 25C20 15 30 15 30 25" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M30 25C30 15 40 15 40 25" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M20 25H40" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M30 25V45" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="30" cy="45" r="5" fill="#8B5CF6"/>
                  <path d="M15 35L25 35" stroke="#8B5CF6" strokeWidth="2"/>
                  <path d="M35 35L45 35" stroke="#8B5CF6" strokeWidth="2"/>
                  <circle cx="45" cy="10" r="8" fill="#8B5CF6" opacity="0.3"/>
                </svg>
              </div>
            }
          />
        </div>
        
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full flex items-center gap-2 mx-auto">
          VIEW ALL
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Services;
