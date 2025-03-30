import React from "react";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";
import { UilStethoscope, UilSyringe, UilHospital, UilHeartMedical, UilPrescriptionBottle } from "@iconscout/react-unicons";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[600px] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Right side - Content section */}
        <div className="h-[600px] bg-[#6B4E98] relative overflow-hidden order-2 md:order-1">
          <div className="absolute inset-0">
            {/* Curved background shape */}
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-purple-500 rounded-tl-[80%] z-0"></div>

            {/* Content wrapper with higher z-index */}
            <div className="relative h-full flex flex-col justify-center px-12 z-10">
              <h1 className="text-4xl font-bold text-yellow-300 mb-4 leading-tight max-w-xl">
                EXPERT VETERINARY CARE,<br/>
                TAILORED TO YOUR PET'S NEEDS
              </h1>
              
              <p className="text-white text-lg mb-8 max-w-xl">
                A Pioneering Veterinary Clinic, Providing Exceptional Care<br/>
                Every Step of the Way.
              </p>
              
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-[#6B4E98] font-bold text-lg rounded-full w-fit px-8 py-2 flex items-center gap-2">
                BOOK AN APPOINTMENT NOW
                <Plus className="h-5 w-5" />
              </Button>

              {/* Medical Icons */}
              <div className="absolute top-8 right-8">
                <UilStethoscope className="w-10 h-10 text-yellow-300" />
              </div>
              
              <div className="absolute top-24 right-16">
                <UilSyringe className="w-8 h-8 text-white" />
              </div>

              <div className="absolute left-16 top-16">
                <UilHospital className="w-12 h-12 text-yellow-300" />
              </div>

              <div className="absolute left-24 bottom-32">
                <UilHeartMedical className="w-8 h-8 text-white" />
              </div>

              <div className="absolute right-32 bottom-48">
                <UilPrescriptionBottle className="w-10 h-10 text-yellow-300" />
              </div>

              {/* Dog image */}
              <div className="absolute bottom-0 right-0">
                <img 
                  src="/images/hero-dog.webp" 
                  alt="Dog" 
                  className="w-[400px] h-[400px] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Left side - Logo section */}
        <div className="h-[600px] bg-white relative order-1 md:order-2">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[300px] h-[300px] relative">
              <img 
                src="/images/logo.png" 
                alt="Elite Vet Logo" 
                className="w-full h-full object-contain"
              />
              <div className="text-center mt-4">
                <div className="text-2xl text-purple-600 font-arabic">
                  النخبة البيطرية
                </div>
                <div className="text-sm tracking-wider text-gray-500">
                  ELITE VET
                </div>
              </div>
            </div>
          </div>
          {/* Interior image */}
          <img 
            src="/images/clinic-interior.webp"
            alt="Clinic Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
            <div className="w-2 h-2 rounded-full bg-purple-400/50"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
