import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
import { sendTextEmail } from '../../formSubmit/textEmailSevice';

export const TextForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    searchVehicle: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; msg: string }>({
    type: null,
    msg: '',
  });

  // Auto-hide Notification Banner after 5 Seconds
  useEffect(() => {
    if (status.type) {
      const timer = setTimeout(() => {
        setStatus({ type: null, msg: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Input Change Handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: '' });

    try {
      const result = await sendTextEmail(formData);
      setLoading(false);

      if (result.success) {
        setStatus({
          type: 'success',
          msg: 'Thank you! Your message has been sent successfully.',
        });
        // Form Clear
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          searchVehicle: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          msg: result.message || 'Failed to send message. Please try again.',
        });
      }
    } catch (error) {
      setLoading(false);
      setStatus({
        type: 'error',
        msg: 'Failed to send message. Please try again.',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="px-0 sm:px-5 py-3 m-0 w-full flex justify-center items-start bg-black text-white"
    >
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
        
        {/* Form Container */}
        <div className="bg-[#222222] p-4 sm:p-6 w-full lg:w-2/3 rounded-md">
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            
            <h2 className="text-2xl font-bold text-[#e6e6e6] mb-2 font-sans">
              Text Us Now
            </h2>

            {/* Notification Banner */}
            {status.type && (
              <div
                className={`p-3 rounded text-sm text-center font-medium ${
                  status.type === 'success'
                    ? 'bg-green-600/20 text-green-400 border border-green-500'
                    : 'bg-red-600/20 text-red-400 border border-red-500'
                }`}
              >
                {status.msg}
              </div>
            )}

            {/* Input Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300 font-semibold">
                  First Name (required)
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300 font-semibold">
                  Last Name (required)
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300 font-semibold">
                  Email (required)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-300 font-semibold">
                  Phone (required)
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] transition-colors"
                />
              </div>
            </div>

            {/* Vehicle Search Input */}
            <div className="flex flex-col gap-1 mt-2">
              <input
                type="text"
                name="searchVehicle"
                placeholder="Search (Year Make Model)"
                value={formData.searchVehicle}
                onChange={handleChange}
                className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#e3ba73] transition-colors"
              />
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-300 font-semibold">
                Message
              </label>
              <textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-[#111111] border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#e3ba73] transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold px-6 py-2 rounded text-sm transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Text'}
              </button>
            </div>

          </form>
        </div>

        {/* Sidebar Information */}
        <div className="w-full lg:w-1/3">
          <div className="p-4 bg-[#212121] text-white rounded-md flex flex-col gap-4">
            
            <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-2">
              Contact Information
            </h3>

            {/* Phone */}
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4 text-[#e3ba73] shrink-0" />
              <a href="tel:9055802102" className="hover:underline">
                <span className="font-semibold">Phone: </span>
                <span>905-580-2102</span>
              </a>
            </div>

            {/* Address */}
            <div className="text-sm flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#e3ba73] shrink-0" />
                <span className="font-semibold">Address:</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm pl-6">
                1575 Main St E, Hamilton, Ontario, L8H 1C4
              </p>
            </div>

            {/* Business Hours */}
            <div className="text-sm flex flex-col gap-2 pt-2 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e3ba73] shrink-0" />
                <span className="font-semibold">Business Hours</span>
              </div>

              <div className="flex flex-col space-y-1 text-xs text-gray-300 pl-1">
                <div className="flex justify-between py-0.5">
                  <span>MONDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>TUESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>WEDNESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>THURSDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>FRIDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span>SATURDAY</span>
                  <span>9:30 AM - 03:30 PM</span>
                </div>
                <div className="flex justify-between py-0.5 font-semibold text-red-400">
                  <span>SUNDAY</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            {/* Get Direction Button Link */}
            <div className="pt-2 border-t border-gray-800">
              <a
                href="/directions"
                className="inline-block bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold px-4 py-2 rounded text-xs transition-colors"
              >
                Get Direction
              </a>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default TextForm;