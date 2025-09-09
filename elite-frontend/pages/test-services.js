import React from 'react';
import TestServices from '@/components/TestServices';

const TestServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Services API Integration Test</h1>
        <TestServices />
      </div>
    </div>
  );
};

export default TestServicesPage;
