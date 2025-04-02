import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 bg-[#E5E7F4] rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-[#44396F] font-bold text-base mb-1">{title}</h3>
      <p className="text-[#44396F] text-sm text-center max-w-xs">{description}</p>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <div className="w-full bg-[#9b87f5] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Wave-shaped white overlay */}
        <div className="absolute left-0 right-0 -bottom-1 h-32">
          <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="white"
              d="M0,100 C150,200 350,0 500,100 C650,200 800,50 1000,100 C1200,150 1350,50 1440,100 V200 H0 V100 Z"
            ></path>
          </svg>
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-yellow-400 text-3xl font-bold mb-3">WHY CHOOSE US?</h2>
          
          {/* Paw print icon instead of wavy line */}
          <div className="mb-4">
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white transform -rotate-12" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white mx-4" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white transform rotate-12" />
          </div>
          
          <div className="text-white max-w-xl mb-12">
            <p className="mb-2">
              As a trusted name in the Riyadh veterinary community since 2013, we've helped more than 200,000,000 pets through:
            </p>
          </div>
          
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
            <FeatureCard
              icon={
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M30,20 C30,17 25,15 20,15 C15,15 10,17 10,20 C10,23 15,25 20,25 C25,25 30,23 30,20Z" fill="#9b87f5"/>
                  <path d="M15,15 C15,10 20,10 25,15" stroke="#9b87f5" strokeWidth="2"/>
                </svg>
              }
              title="Latest Technology"
              description="Cutting-edge equipment for accurate diagnosis."
            />
            
            <FeatureCard
              icon={
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M15,12 L25,22 M15,22 L25,12" stroke="#9b87f5" strokeWidth="2"/>
                  <path d="M28,12 C28,12 32,15 32,20 C32,25 28,28 28,28" stroke="#9b87f5" strokeWidth="2"/>
                  <path d="M12,12 C12,12 8,15 8,20 C8,25 12,28 12,28" stroke="#9b87f5" strokeWidth="2"/>
                </svg>
              }
              title="Personalized Care"
              description="Tailored treatment plans for each pet."
            />
            
            <FeatureCard
              icon={
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path d="M15,15 L15,30 L30,30 L30,15 Z" stroke="#9b87f5" strokeWidth="2"/>
                  <path d="M15,15 L20,10 L30,10 L30,15 Z" stroke="#9b87f5" strokeWidth="2"/>
                  <circle cx="22" cy="20" r="2" fill="#9b87f5"/>
                </svg>
              }
              title="Compassionate Staff"
              description="A dedicated team that loves animals."
            />
          </div>
          
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full flex items-center gap-2 mx-auto">
            READ MORE
            <Plus className="h-4 w-4" />
          </Button>
          
          {/* Decorative elements */}
          <div className="absolute bottom-20 right-10 z-0">
            <svg width="120" height="80" viewBox="0 0 120 80" className="opacity-20">
              <path d="M20,20 Q40,0 60,20 Q80,40 100,20" stroke="white" strokeWidth="3" fill="none"/>
            </svg>
          </div>
          
          <div className="absolute top-20 left-10 z-0">
            <svg width="80" height="80" viewBox="0 0 80 80" className="opacity-20">
              <circle cx="40" cy="40" r="30" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="40" cy="40" r="20" stroke="white" strokeWidth="2" fill="none"/>
              <circle cx="40" cy="40" r="10" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
