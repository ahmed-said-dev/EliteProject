
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full bg-[#9b87f5] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-yellow-400 text-3xl font-bold mb-3">CONTACT US!</h2>
          
          {/* Wavy line */}
          <div className="mb-4">
            <svg width="120" height="20" viewBox="0 0 120 20" className="fill-none">
              <path d="M0,10 Q20,0 40,10 Q60,20 80,10 Q100,0 120,10" stroke="white" strokeWidth="4" fill="none"/>
            </svg>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-white">
              <div className="mb-8">
                <p className="text-lg font-bold mb-2">Have a question or concern?</p>
                <p className="text-sm">Contact us today! Our dedicated team is ready to assist you.</p>
              </div>
              
              <div className="flex items-start mb-4">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-white" />
                <div>
                  <p className="text-sm">Qurtubah gate, Al Thumamah Rd,</p>
                  <p className="text-sm">Qurtubah, Riyadh 13248</p>
                </div>
              </div>
              
              <div className="flex items-center mb-8">
                <Mail className="h-5 w-5 mr-2 text-white" />
                <p className="text-sm">info@elitevetsa.com</p>
              </div>
              
              <div className="h-48 bg-gray-200 rounded-md overflow-hidden mb-8">
                {/* Map placeholder */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Map Location
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <form className="space-y-4">
                <Input 
                  placeholder="NAME" 
                  className="bg-white/80 border-none placeholder:text-gray-500"
                />
                <Input 
                  placeholder="EMAIL" 
                  className="bg-white/80 border-none placeholder:text-gray-500"
                />
                <Textarea 
                  placeholder="MESSAGE" 
                  className="bg-white/80 border-none h-32 placeholder:text-gray-500"
                />
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-800 font-semibold">
                  Send
                </Button>
              </form>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 right-0 z-0">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="#fff" opacity="0.2">
              <circle cx="20" cy="10" r="8" />
              <circle cx="40" cy="10" r="8" />
              <circle cx="10" cy="30" r="8" />
              <circle cx="30" cy="30" r="8" />
              <circle cx="50" cy="30" r="8" />
            </svg>
          </div>
          
          {/* Cat images */}
          <div className="absolute bottom-0 right-0 w-64 h-64 z-10">
            <img 
              src="/lovable-uploads/97eb65d8-dcec-46e0-b0f5-7121bb0d32f4.png" 
              alt="Cat" 
              className="w-full h-full object-contain"
            />
          </div>
          
          {/* Yarn ball logo */}
          <div className="absolute bottom-20 right-40 z-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="25" fill="#9b87f5" stroke="white" strokeWidth="2"/>
              <path d="M15,30 C15,20 30,15 30,30 C30,45 45,40 45,30" stroke="white" strokeWidth="2"/>
              <path d="M20,20 Q30,25 40,20" stroke="white" strokeWidth="2"/>
              <path d="M20,40 Q30,35 40,40" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
