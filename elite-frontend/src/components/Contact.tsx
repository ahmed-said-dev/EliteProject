import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className="w-full bg-[#9b87f5] relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-yellow-400 text-3xl font-bold mb-3">CONTACT US!</h2>
          
          {/* Paw prints */}
          <div className="flex items-center gap-4 mb-6">
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white transform -rotate-45 opacity-80" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white opacity-90" />
            <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white transform rotate-45 opacity-80" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-white">
              <div className="mb-8 relative">
                <p className="text-lg font-bold mb-2">Have a question or concern?</p>
                <p className="text-sm">Contact us today! Our dedicated team is ready to assist you.</p>
                <div className="absolute -top-4 -right-4">
                  <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-white opacity-20" />
                </div>
              </div>
              
              <div className="flex items-start mb-4 relative">
                <MapPin className="h-5 w-5 mr-2 mt-1 text-white" />
                <div>
                  <p className="text-sm">Qurtubah gate, Al Thumamah Rd,</p>
                  <p className="text-sm">Qurtubah, Riyadh 13248</p>
                </div>
                <div className="absolute -top-2 -right-2">
                  <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-white opacity-20 transform rotate-45" />
                </div>
              </div>
              
              <div className="flex items-center mb-8 relative">
                <Mail className="h-5 w-5 mr-2 text-white" />
                <p className="text-sm">info@elitevetsa.com</p>
                <div className="absolute -top-2 -right-2">
                  <FontAwesomeIcon icon={faPaw} style={{ height: '1.5em', width: '1.5em' }} className="text-white opacity-20 transform -rotate-45" />
                </div>
              </div>
              
              <div className="h-48 bg-gray-200 rounded-md overflow-hidden mb-8 relative">
                {/* Map placeholder */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  Map Location
                </div>
                <div className="absolute bottom-2 right-2">
                  <FontAwesomeIcon icon={faPaw} style={{ height: '2em', width: '2em' }} className="text-gray-300 transform rotate-12" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 relative">
              <div className="absolute -top-4 -right-4">
                <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-white opacity-20 transform -rotate-12" />
              </div>
              
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" className="bg-white/20 border-none text-white placeholder:text-white/60" />
                <Input type="email" placeholder="Your Email" className="bg-white/20 border-none text-white placeholder:text-white/60" />
                <Input type="tel" placeholder="Phone Number" className="bg-white/20 border-none text-white placeholder:text-white/60" />
                <Textarea placeholder="Your Message" className="bg-white/20 border-none text-white placeholder:text-white/60 min-h-[120px]" />
                <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-800">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Background paw prints */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10">
            <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-white transform rotate-45" />
          </div>
          <div className="absolute top-40 right-20">
            <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-white opacity-80" />
          </div>
          <div className="absolute bottom-20 left-40">
            <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-white transform -rotate-45" />
          </div>
          <div className="absolute bottom-40 right-60">
            <FontAwesomeIcon icon={faPaw} style={{ height: '3em', width: '3em' }} className="text-white transform rotate-12 opacity-90" />
          </div>
          <div className="absolute top-60 left-60">
            <FontAwesomeIcon icon={faPaw} style={{ height: '4em', width: '4em' }} className="text-white transform -rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
