import React, { useState } from 'react';
import { FaPhoneAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FormDataState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  year: string;
  trim: string;
  temp_odometer: string;
  bodyStyle: string;
  transmission: string;
  driveLine: string;
  fuel_type: string;
  condition: string;
  vin_number: string;
  exterior_color: string;
  additional_info: string;
}

const CarFinder: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    make: '',
    model: '',
    year: '',
    trim: '',
    temp_odometer: '',
    bodyStyle: '',
    transmission: '',
    driveLine: '',
    fuel_type: '',
    condition: '',
    vin_number: '',
    exterior_color: '',
    additional_info: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted Data:', formData);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Main Form (Animation Added) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:col-span-7 xl:col-span-8 bg-[#222222] p-6 sm:p-8 rounded-lg shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Header Title */}
            <div>
              <h2 className="text-3xl font-extrabold text-[#e3ba73] tracking-wide mb-6">
                Car Finder
              </h2>

              {/* Personal Information */}
              <div className="border-b border-gray-700 pb-2 mb-6">
                <h3 className="text-lg font-bold text-[#e3ba73] uppercase tracking-wider">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    First Name (required)
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name (required)
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email (required)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Phone (required)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Vehicle Information */}
            <div>
              <div className="border-b border-gray-700 pb-2 mb-6">
                <h3 className="text-lg font-bold text-[#e3ba73] uppercase tracking-wider">
                  Vehicle Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Make</label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Model (required)
                  </label>
                  <input
                    type="text"
                    name="model"
                    required
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 30 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Trim</label>
                  <input
                    type="text"
                    name="trim"
                    value={formData.trim}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Kilometers</label>
                  <input
                    type="text"
                    name="temp_odometer"
                    value={formData.temp_odometer}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Body Style</label>
                  <select
                    name="bodyStyle"
                    value={formData.bodyStyle}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  >
                    <option value="">Select Body Style</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Truck">Truck</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Hatchback">Hatchback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Transmission</label>
                  <select
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  >
                    <option value="">Select Transmission</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Driveline</label>
                  <select
                    name="driveLine"
                    value={formData.driveLine}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  >
                    <option value="">Select Drivetrain</option>
                    <option value="AWD">AWD</option>
                    <option value="4WD">4WD</option>
                    <option value="FWD">FWD</option>
                    <option value="RWD">RWD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Fuel Type</label>
                  <input
                    type="text"
                    name="fuel_type"
                    value={formData.fuel_type}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  >
                    <option value="">Select Condition</option>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Certified Pre-Owned">Certified Pre-Owned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">VIN</label>
                  <input
                    type="text"
                    name="vin_number"
                    value={formData.vin_number}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white uppercase border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Exterior Color</label>
                  <input
                    type="text"
                    name="exterior_color"
                    value={formData.exterior_color}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Additional Info</label>
                  <textarea
                    rows={5}
                    name="additional_info"
                    value={formData.additional_info}
                    onChange={handleChange}
                    className="w-full bg-[#181818] text-white border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#e3ba73] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-[#e3ba73] hover:bg-[#d2a861] text-black font-bold px-8 py-2.5 rounded transition-all duration-200 shadow-md"
              >
                Submit
              </button>
            </div>

          </form>
        </motion.div>

        {/* Right Section: Sidebar / Contact Info (Animation Added) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="lg:col-span-5 xl:col-span-4 bg-[#212121] p-6 sm:p-8 rounded-lg shadow-xl space-y-6"
        >
          <h3 className="text-xl font-bold text-[#e3ba73] border-b border-gray-700 pb-2">
            Contact Information
          </h3>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-[#e3ba73]" />
            <a href="tel:9055802102" className="text-white hover:underline text-sm sm:text-base">
              <span className="font-semibold">Phone: </span>905-580-2102
            </a>
          </div>

          {/* Address */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              <FaMapMarkerAlt className="text-[#e3ba73]" />
              <span className="font-semibold text-white text-sm sm:text-base">Address:</span>
            </div>
            <p className="text-gray-400 text-sm pl-7">
              1575 Main St E, Hamilton, Ontario, L8H 1C4
            </p>
          </div>

          {/* Business Hours */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaClock className="text-[#e3ba73]" />
              <span className="font-semibold text-white text-sm sm:text-base">Business Hours</span>
            </div>
            <div className="space-y-2 pl-7 text-xs sm:text-sm text-gray-300">
              <div className="flex justify-between"><span>MONDAY</span><span>9:30 AM - 07:00 PM</span></div>
              <div className="flex justify-between"><span>TUESDAY</span><span>9:30 AM - 07:00 PM</span></div>
              <div className="flex justify-between"><span>WEDNESDAY</span><span>9:30 AM - 07:00 PM</span></div>
              <div className="flex justify-between"><span>THURSDAY</span><span>9:30 AM - 07:00 PM</span></div>
              <div className="flex justify-between"><span>FRIDAY</span><span>9:30 AM - 07:00 PM</span></div>
              <div className="flex justify-between"><span>SATURDAY</span><span>9:30 AM - 03:30 PM</span></div>
              <div className="flex justify-between text-red-400"><span>SUNDAY</span><span>Closed</span></div>
            </div>
          </div>

          {/* Directions Button */}
          <div className="pt-2">
            <a
              href="/directions"
              className="inline-block bg-[#e3ba73] hover:bg-[#d2a861] text-black font-bold px-6 py-2 rounded text-center text-sm transition-all duration-200"
            >
              Get Direction
            </a>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export default CarFinder;