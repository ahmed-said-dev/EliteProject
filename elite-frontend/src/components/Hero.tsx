
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[500px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="h-[500px] bg-gray-200 relative">
          <img 
            src="/lovable-uploads/9a78d3a8-b053-460d-aae5-92478e4b15b3.png" 
            alt="Veterinary clinic interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-8 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-32 w-32 rounded-full bg-purple-600 flex items-center justify-center">
              <svg width="80" height="60" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5C20 5 12 8 12 20C12 32 20 35 25 35C30 35 38 32 38 20C38 8 30 5 25 5Z" fill="white"/>
                <path d="M17 16C16 16 13 18 13 20C13 22 15 24 17 24M33 16C34 16 37 18 37 20C37 22 35 24 33 24" stroke="#8B5CF6" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="text-center text-purple-600 mt-2 font-arabic">
              النخبة البيطرية
              <div className="text-xs text-gray-500">ELITE VET</div>
            </div>
          </div>
        </div>
        <div className="h-[500px] bg-purple-600 relative overflow-hidden flex flex-col justify-center px-12">          
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2 z-10">
            EXPERT VETERINARY CARE,<br/>
            TAILORED TO YOUR PET'S NEEDS
          </h1>
          
          <div className="w-32 h-6 relative my-4 z-10">
            <svg viewBox="0 0 200 30" className="w-full">
              <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="white" fill="none" strokeWidth="4"/>
            </svg>
          </div>
          
          <p className="text-white mb-8 z-10">
            A Pioneering Veterinary Clinic, Providing Exceptional Care<br/>
            Every Step of the Way.
          </p>
          
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-bold rounded-full w-64 flex items-center gap-2 z-10">
            BOOK AN APPOINTMENT NOW
            <Plus className="h-5 w-5" />
          </Button>
          
          <div className="absolute bottom-10 right-10 z-10">
            <img 
              src="/lovable-uploads/9a78d3a8-b053-460d-aae5-92478e4b15b3.png" 
              alt="Dog" 
              className="w-36 h-36 object-cover rounded-br-[80px]"
            />
          </div>
          
          <div className="absolute bottom-20 left-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M30 10L35 20H25L30 10Z" fill="#FBBF24"/>
              <circle cx="30" cy="30" r="8" stroke="#FBBF24" strokeWidth="2" fill="none"/>
              <path d="M15 35C20 40 25 40 30 35" stroke="#FBBF24" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          
          <div className="absolute right-20 top-40">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M10 15C15 10 20 10 25 15" stroke="white" strokeWidth="2"/>
              <path d="M30 25C25 30 20 30 15 25" stroke="white" strokeWidth="2"/>
              <circle cx="35" cy="20" r="5" fill="#FBBF24"/>
            </svg>
          </div>
          
          <div className="absolute right-60 bottom-40">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path d="M20 20C25 15 30 15 35 20" stroke="white" strokeWidth="2"/>
              <path d="M35 30C30 35 25 35 20 30" stroke="white" strokeWidth="2"/>
              <circle cx="10" cy="25" r="8" fill="#FBBF24"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
