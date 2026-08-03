import React, { useState } from 'react';

export interface SellCarFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  make: string;
  model: string;
  year: string;
  vinNumber: string;
  mileage: string;
}

const INITIAL_FORM_DATA: SellCarFormData = {
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
  make: '',
  model: '',
  year: '',
  vinNumber: '',
  mileage: '',
};

export const SellCarSection: React.FC = () => {
  const [formData, setFormData] = useState<SellCarFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Form submitted:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData(INITIAL_FORM_DATA);
      alert('Thank you! Your submission has been received.');
    }, 1000);
  };

  return (
    <section 
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-125 flex justify-between items-center py-12 px-4 sm:px-8 lg:px-20"
      style={{ backgroundImage: "url('https://uniquecars.ca/images/contactus.jpg')" }}
    >
      {/* Black Overlay (30% Opacity) */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 xl:gap-x-20 items-start">
        
        {/* Left Headline Section */}
        <div className="lg:col-span-5 space-y-3 text-center lg:text-left mt-20">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] tracking-wide text-white uppercase drop-shadow-md pt-4 lg:pt-0 font-light">
            SELL US YOUR CAR
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed max-w-md mx-auto lg:mx-0 drop-shadow-md">
            We will buy your cars even if you don't buy from us!
          </p>
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 w-full">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Responsive Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-4">
              
              {/* First Name */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="firstName" className="text-sm text-gray-200 font-normal">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="lastName" className="text-sm text-gray-200 font-normal">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="email" className="text-sm text-gray-200 font-normal">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="mobile" className="text-sm text-gray-200 font-normal">
                  Mobile
                </label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Make */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="make" className="text-sm text-gray-200 font-normal">
                  Make
                </label>
                <input
                  id="make"
                  type="text"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Model */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="model" className="text-sm text-gray-200 font-normal">
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Year */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="year" className="text-sm text-gray-200 font-normal">
                  Year
                </label>
                <input
                  id="year"
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Vin Number */}
              <div className="flex flex-col space-y-1.5 w-full">
                <label htmlFor="vinNumber" className="text-sm text-gray-200 font-normal">
                  Vin Number
                </label>
                <input
                  id="vinNumber"
                  type="text"
                  name="vinNumber"
                  value={formData.vinNumber}
                  onChange={handleChange}
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Mileage */}
              <div className="flex flex-col space-y-1.5 w-full sm:col-span-2 lg:col-span-1">
                <label htmlFor="mileage" className="text-sm text-gray-200 font-normal">
                  Mileage
                </label>
                <input
                  id="mileage"
                  type="text"
                  inputMode="numeric"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#222226] text-white px-3.5 py-2.5 rounded-none border-none focus:outline-none focus:ring-1 focus:ring-[#e3ba73] shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            {/* Outlined Submit Button */}
            <div className="pt-6 text-center lg:text-left">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-3 bg-black border border-[#e3ba73] text-[#e3ba73] hover:text-black hover:bg-[#e3ba73] font-medium tracking-wider uppercase text-sm rounded-none transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
};

export default SellCarSection;