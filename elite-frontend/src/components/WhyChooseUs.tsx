import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const WhyChooseUs = () => {
  return (
    <>
      <div className="w-full bg-[#9b87f5] relative overflow-hidden py-12 md:py-16" dir="ltr">
        {/* White wavy line at the top */}
        <div className="absolute left-0 top-0 w-full" style={{ zIndex: 1 }}>
          <Image
            src="/WhyChooseUS/Asset 21-.png"
            alt="Wavy line decoration"
            width={1440}
            height={10}
            className="w-full object-contain"
            priority
          />
        </div>
        
        {/* Wave-shaped white overlay */}
        <div className="absolute left-0 right-0 -bottom-1 h-32">
          <svg viewBox="0 0 1440 200" className="w-full h-full" preserveAspectRatio="none">
            <path
              fill="white"
              d="M0,100 C150,200 350,0 500,100 C650,200 800,50 1000,100 C1200,150 1350,50 1440,100 V200 H0 V100 Z"
            ></path>
          </svg>
        </div>

        {/* Decorative stars */}
        <div className="absolute top-1/4 right-1/3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-300 opacity-60">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 right-1/4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-purple-300 opacity-60">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          {/* White curved line decoration */}
          <div className="absolute left-16 top-4">
            <svg width="120" height="40" viewBox="0 0 120 40" className="opacity-30">
              <path d="M10,20 C30,5 60,35 80,20 C100,5 110,20 120,15" stroke="white" strokeWidth="3" fill="none" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-yellow-400 text-4xl font-bold mb-3 text-left">WHY CHOOSE US?</h2>
            
            {/* Cloud shape background - covering full width of section */}
            <div className="absolute top-[80px] md:top-[75px] left-0 right-0 w-full h-[85%] z-0 overflow-visible">
              <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="none">
                <path 
                  d="M0,50 C150,10 300,80 450,20 C600,-40 750,40 900,0 C950,-10 975,10 1000,0 L1000,500 L0,500 L0,50 Z" 
                  fill="white" 
                />
              </svg>
              
              {/* Purple stars matching reference image positioning */}
              <div className="absolute top-10 md:right-1/3 right-1/4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" opacity="0.8" />
                </svg>
              </div>
              <div className="absolute top-20 right-20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="#C8B6FA" opacity="0.6" />
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:space-x-8 pt-10 relative z-10">
              
              {/* Features section - left side */}
              <div className="md:w-3/5 mb-10 md:mb-0 relative">
                <div className="text-white text-xl mb-10 text-left">
                  <p>As a trusted name in the Riyadh veterinary community since 2013, we've helped more than 200,000,000 pets through:</p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between mb-8 space-y-8 md:space-y-0 md:space-x-4">
                  {/* Feature 1 */}
                  <div className="flex flex-col items-start text-start md:w-1/3">
                    <div className="bg-[#E5E7F4] w-24 h-24 rounded-3xl flex items-center justify-center mb-4">
                      <svg width="45" height="45" viewBox="0 0 50 50" fill="none">
                        <path d="M25 12C28 12 30 14 30 17C30 20 28 22 25 22C22 22 20 20 20 17C20 14 22 12 25 12Z" fill="#9678D3"/>
                        <path d="M16 32C16 29 20 26 25 26C30 26 34 29 34 32C34 35 30 38 25 38C20 38 16 35 16 32Z" fill="#9678D3"/>
                        <path d="M40 19C40 16 38 14 35 14C32 14 30 16 30 19C30 22 32 24 35 24C38 24 40 22 40 19Z" fill="#9678D3"/>
                        <path d="M15 14C12 14 10 16 10 19C10 22 12 24 15 24C18 24 20 22 20 19C20 16 18 14 15 14Z" fill="#9678D3"/>
                      </svg>
                    </div>
                    <h3 className="text-[#44396F] font-bold text-xl mb-2">Latest Technology</h3>
                    <p className="text-[#44396F] text-sm px-1">Cutting-edge equipment for accurate diagnosis.</p>
                  </div>
                  
                  {/* Feature 2 */}
                  <div className="flex flex-col items-start text-start md:w-1/3">
                    <div className="bg-[#E5E7F4] w-24 h-24 rounded-3xl flex items-center justify-center mb-4">
                      <svg width="45" height="45" viewBox="0 0 50 50" fill="none">
                        <path d="M35 15L15 35M15 15L35 35" stroke="#9678D3" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M12 18C12 18 8 22 8 25C8 28 12 32 12 32" stroke="#9678D3" strokeWidth="4" strokeLinecap="round"/>
                        <path d="M38 18C38 18 42 22 42 25C42 28 38 32 38 32" stroke="#9678D3" strokeWidth="4" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h3 className="text-[#44396F] font-bold text-xl mb-2">Personalized Care</h3>
                    <p className="text-[#44396F] text-sm px-1">Tailored treatment plans for each pet.</p>
                  </div>
                  
                  {/* Feature 3 */}
                  <div className="flex flex-col items-start text-start md:w-1/3">
                    <div className="bg-[#E5E7F4] w-24 h-24 rounded-3xl flex items-center justify-center mb-4">
                      <Image 
                        src="/SVGs/why1.svg" 
                        alt="Compassionate Staff Icon" 
                        width={65} 
                        height={65}
                      />
                    </div>
                    <h3 className="text-[#44396F] font-bold text-xl mb-2">Compassionate Staff</h3>
                    <p className="text-[#44396F] text-sm px-1">A dedicated team that loves animals.</p>
                  </div>
                </div>
                
                <div className="flex justify-start mt-8">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-[#44396F] font-medium py-2.5 px-6 rounded-full flex items-center gap-2 transition-colors">
                    READ MORE
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Dog images section - right side */}
              <div className="md:w-2/5 relative">
                {/* Main dog image */}
                <div className="relative">
                  <div className="bg-white rounded-full overflow-hidden w-full aspect-square relative">
                    <Image 
                      src="/images/dogs/corgi.jpg" 
                      alt="Corgi dog" 
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Secondary dog image */}
                <div className="absolute -bottom-4 -right-4 w-1/3 aspect-square">
                  <div className="bg-white rounded-full overflow-hidden w-full h-full relative border-4 border-white shadow-lg">
                    <Image 
                      src="/images/dogs/frenchie.jpg" 
                      alt="French bulldog" 
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                
                {/* Paw print decoration */}
                <div className="absolute -bottom-8 -right-10 transform rotate-45">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                    <path d="M50,18 C50,18 57,25 52,28 C47,31 43,25 43,25" stroke="#FFDA55" strokeWidth="2" fill="none"/>
                    <path d="M38,20 C36,12 42,12 48,16" stroke="#FFDA55" strokeWidth="2" fill="none"/>
                    <circle cx="53" cy="18" r="4" fill="#FFDA55" opacity="0.8"/>
                    <circle cx="45" cy="15" r="3" fill="#FFDA55" opacity="0.6"/>
                    <circle cx="38" cy="20" r="3" fill="#FFDA55" opacity="0.4"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
