
import React from "react";

interface DoctorCardProps {
  image: string;
  name: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ image, name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-[#44396F] font-medium text-base">{name}</h3>
    </div>
  );
};

const Doctors = () => {
  return (
    <div className="w-full py-16 bg-gray-100 relative">
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
        <div className="absolute bottom-10 right-10">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="#8B5CF6">
            <circle cx="20" cy="10" r="8" />
            <circle cx="40" cy="10" r="8" />
            <circle cx="10" cy="30" r="8" />
            <circle cx="30" cy="30" r="8" />
            <circle cx="50" cy="30" r="8" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold text-[#44396F] mb-2">Meet our Doctors</h2>
        
        {/* Wavy line */}
        <div className="w-40 h-6 mx-auto relative my-4">
          <svg viewBox="0 0 200 30" className="w-full">
            <path d="M0,15 Q40,0 80,15 Q120,30 160,15 Q200,0 240,15" stroke="#9b87f5" fill="none" strokeWidth="4"/>
          </svg>
        </div>
        
        <p className="text-gray-700 mb-12 max-w-3xl mx-auto">
          Our team of highly skilled veterinarians is committed to providing top-notch care for your furry companions. 
          They're passionate about animal health & dedicated to providing the best possible medical services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <DoctorCard 
            image="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
            name="Dr. Mohamed Farouk"
          />
          <DoctorCard 
            image="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
            name="Dr. Rico J Pangan"
          />
          <DoctorCard 
            image="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
            name="Dr. Anas Saada"
          />
        </div>
        
        {/* Pet images at bottom corners */}
        <div className="relative h-40">
          <div className="absolute bottom-0 left-0 w-40 h-40">
            <img 
              src="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
              alt="Gray cat" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40">
            <img 
              src="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
              alt="Dog" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
