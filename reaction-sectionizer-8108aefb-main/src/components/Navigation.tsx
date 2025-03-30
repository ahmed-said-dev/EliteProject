
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Phone, User } from "lucide-react";

const Navigation = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center">
              <svg width="50" height="40" viewBox="0 0 50 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5C20 5 12 8 12 20C12 32 20 35 25 35C30 35 38 32 38 20C38 8 30 5 25 5Z" fill="white"/>
                <path d="M17 16C16 16 13 18 13 20C13 22 15 24 17 24M33 16C34 16 37 18 37 20C37 22 35 24 33 24" stroke="#8B5CF6" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="ml-2 text-purple-600 font-bold text-lg">Elite Vet</div>
          </div>
        </div>
        
        <nav className="hidden md:flex bg-purple-600 rounded-sm px-4 py-2">
          <ul className="flex gap-6">
            <li className="text-white font-medium">Home</li>
            <li className="text-white hover:text-yellow-300">About</li>
            <li className="text-white hover:text-yellow-300">Services</li>
            <li className="text-yellow-300 font-medium">Products</li>
            <li className="text-white hover:text-yellow-300">Media</li>
            <li className="text-white hover:text-yellow-300">Memberships</li>
            <li className="text-white hover:text-yellow-300">Contact Us</li>
            <li className="text-white hover:text-yellow-300 border-l border-white pl-4">Book an Appointment</li>
          </ul>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-3">
            <Facebook className="h-5 w-5 text-purple-600" />
            <Twitter className="h-5 w-5 text-purple-600" />
            <Instagram className="h-5 w-5 text-purple-600" />
            <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/>
              </svg>
            </div>
            <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
        
        <button className="md:hidden text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navigation;
