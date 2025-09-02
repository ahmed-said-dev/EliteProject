import React from 'react';
import useHomeServices from '@/hooks/useHomeServices';

const TestServices = () => {
  const { formattedServices, isLoading, error, services } = useHomeServices();

  console.log('🧪 Test Services Data:', {
    formattedServices,
    isLoading,
    error,
    services
  });

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-100 border border-blue-300 rounded">
        <h3 className="font-bold text-blue-800">Testing Services API...</h3>
        <p>Loading services data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <h3 className="font-bold text-red-800">API Error:</h3>
        <p className="text-red-600">{error.message}</p>
        <p className="text-sm text-gray-600 mt-2">
          Make sure the backend is running on http://localhost:1337
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-100 border border-green-300 rounded">
      <h3 className="font-bold text-green-800">✅ Services API Test Results:</h3>
      <p className="text-green-700">Successfully fetched {formattedServices.length} services</p>
      
      <div className="mt-4">
        <h4 className="font-semibold">Services Data:</h4>
        <ul className="list-disc list-inside mt-2">
          {formattedServices.map((service) => (
            <li key={service.id} className="text-sm">
              <strong>{service.title}</strong> (Icon: {service.iconName})
            </li>
          ))}
        </ul>
      </div>
      
      {formattedServices.length === 0 && (
        <p className="text-yellow-600 mt-2">
          ⚠️ No services found in the home array. Check the API response structure.
        </p>
      )}
    </div>
  );
};

export default TestServices;
