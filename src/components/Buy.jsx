import React from 'react';
import { Search, PhoneCall, Truck } from 'lucide-react';

const Buy = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          How to Buy a Car With Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <Search className="h-10 w-10 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">1. Browse Your Dream Car</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Explore hundreds of cars filter by brand, model, year, or price. Find the perfect match for your needs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <PhoneCall className="h-10 w-10 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">2. Contact Our Experts</h3>
            <p className="text-gray-600 mt-2 text-sm">
              We guide you through the entire process  from inspection to payment. We speak your language and handle every step.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow hover:shadow-md transition">
            <Truck className="h-10 w-10 text-red-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">3. Receive It in Your Country</h3>
            <p className="text-gray-600 mt-2 text-sm">
              We ship the car safely and track it until it reaches your port or city. Sit back and relax  we’ll handle the hustle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Buy;
