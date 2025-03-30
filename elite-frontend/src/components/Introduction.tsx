
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Introduction = () => {
  return (
    <div className="w-full py-16 bg-white relative overflow-hidden">
      {/* Background paw prints */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
        <div className="absolute top-60 right-20">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-40">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
        <div className="absolute bottom-40 right-60">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto text-center max-w-4xl px-4">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
            Welcome to Elite Vet<br />
            <span className="text-3xl md:text-4xl">Your trusted pet veterinary clinic</span>
          </h2>
          
          <div className="w-32 h-6 relative my-6">
            <svg viewBox="0 0 200 30" className="w-full">
              <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#8B5CF6" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
            We are committed to providing top-quality care for your pets. Our veterinary clinic offers a wide range of services,
            including routine check-ups, vaccinations, surgeries, & dental care,<br />
            using the latest technology & under the care & expertise of the best veterinarians in KSA.
          </p>
          
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 rounded-full flex items-center gap-2 mx-auto">
            READ MORE
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/9a78d3a8-b053-460d-aae5-92478e4b15b3.png" 
              alt="Veterinary clinic pharmacy" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-64 bg-gray-100 rounded-md overflow-hidden">
            <img 
              src="/lovable-uploads/9a78d3a8-b053-460d-aae5-92478e4b15b3.png" 
              alt="Veterinary clinic reception" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
