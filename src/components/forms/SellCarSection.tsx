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
      className="relative w-full bg-cover bg-center bg-no-repeat min-h-162.5 flex justify-between items-center py-16 px- lg:px-20"
      style={{ backgroundImage: "url('https://uniquecars.ca/images/contactus.jpg')" }}
    >
      {/* Halka sa Black Overlay (30% Opacity) */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl  w-full grid grid-cols-1  lg:grid-cols-12 gap-x-28 ">
        
        {/* Left Headline Section */}
        <div className="lg:col-span-5 space-y-4">
          <h1 className="text-2xl lg:text-[40px] tracking-wide  text-white uppercase drop-shadow-md pt-12">
            SELL US YOUR CAR
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 font-normal leading-relaxed max-w-md drop-shadow-md">
            We will buy your cars even if you don't buy from us!
          </p>
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 ">
          <form onSubmit={handleSubmit}>
            {/* 2-Column Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[0.5px] gap-y-2">
              
              {/* First Name */}
              <div className="flex flex-col space-y-1.5">
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
                 className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)] "
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Mobile */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Make */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Model */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Year */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Vin Number */}
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="vinNumber" className="text-sm text-gray-200 font-normal">
                  Vin Number
                </label>
                <input
                  id="vinNumber"
                  type="text"
                  name="vinNumber"
                  value={formData.vinNumber}
                  onChange={handleChange}
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Mileage */}
              <div className="flex flex-col space-y-1.5">
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
                  className="w-52.5 bg-[#222226] text-white px-3 py-2 rounded-none border-none focus:outline-none shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            {/* Outlined Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:w-[30%] py-3 bg-black border border-[#e3ba73]  text-[#e3ba73] hover:text-black hover:bg-[#e3ba73]  font-medium tracking-wide rounded-none transition-colors duration-200 cursor-pointer disabled:opacity-50"
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