import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPaw,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/components/BenefitsCard.module.css';

export default function BenefitsCard() {
  return (
    <div className="w-full md:w-1/2 hidden md:block">
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg h-full">
        <div className="relative h-72 mb-8 overflow-hidden rounded-xl">
          <Image 
            src="https://images.pexels.com/photos/7516509/pexels-photo-7516509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Pet Care" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out"
            width={600}
            height={400}
          />
          <div className="absolute top-4 right-4 bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Elite Vet
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-purple-900 mb-5">Your Account Benefits</h3>
        
        <div className="space-y-5">
          <BenefitItem 
            title="Complete Health Records" 
            description="Track vaccination schedules, medications, and medical history for your pets" 
          />
          
          <BenefitItem 
            title="Online Appointments" 
            description="Book appointments with our veterinarians at your convenience" 
          />
          
          <BenefitItem 
            title="Exclusive Discounts" 
            description="Access special offers and discounts on products and services" 
          />
        </div>
        
        <div className="mt-8 bg-purple-800 text-white p-4 rounded-lg">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCheckCircle} className="text-2xl mr-3" />
            <p className="font-medium">Join over 10,000 pet owners who trust us with their furry friends</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface BenefitItemProps {
  title: string;
  description: string;
}

function BenefitItem({ title, description }: BenefitItemProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1">
      <div className="flex items-start">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center">
          <FontAwesomeIcon icon={faPaw} className="text-purple-800 text-lg" />
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
