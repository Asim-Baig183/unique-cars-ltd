import React from 'react';
import { motion } from 'framer-motion';

export const GetDirectionsSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-0 m-0 w-full bg-black flex justify-center"
    >
      <div className="max-w-7xl w-full px-0 md:px-3 xl:px-4 py-4 mb-3 flex flex-col lg:flex-row gap-4">
        
        {/* Left Section: Map Container */}
        <div className="w-full lg:w-2/3 flex flex-col">
          <div className="bg-[#222222] p-4 sm:p-6 w-full flex flex-col items-center justify-center rounded">
            <div className="w-full">
              
              <h3 className="p-0 m-0 mb-3 font-bold text-[#e6e6e6] font-sans text-[28px]">
                Get Directions
              </h3>

              <div className="w-full p-0 m-0">
                <iframe
                  allow="geolocation"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.995845475954!2d-79.81938199999999!3d43.33527599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9e02c428bf6f%3A0x57e252e72b3fda79!2sUnique%20Cars%20ltd!5e0!3m2!1sen!2sca!4v1782437371496!5m2!1sen!2sca"
                  height="500"
                  className="border-0 w-full rounded"
                  aria-hidden="false"
                  tabIndex={0}
                  id="iframe"
                  title="Google Maps"
                />
              </div>

              {/* Scroll To Top Button */}
              <a
                href="#headerUp"
                className="fixed bottom-4.25 left-2.75 z-60 w-10 h-10 bg-[#333333] rounded-[3px] shadow flex items-center justify-center text-white hover:bg-[#444444] transition-colors"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
                </svg>
              </a>

            </div>
          </div>
        </div>

        {/* Right Section: Contact Information */}
        <div className="w-full lg:w-1/3">
          <div className="p-4 pt-4 m-0 mb-4 w-full bg-[#212121] text-white rounded">
            
            <h3 className="text-lg font-bold my-3 text-white">
              Contact Information
            </h3>

            {/* Phone */}
            <p className="p-0 m-0 my-3 flex items-center gap-2 text-sm">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="w-4 h-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
              </svg>
              <a href="tel:9055802102" className="p-0 m-0 no-underline text-white hover:underline">
                <span className="font-semibold">Phone:</span>
                <span className="ml-1">905-580-2102</span>
              </a>
            </p>

            {/* Address */}
            <div className="p-0 m-0 my-3 text-sm">
              <div className="flex items-center gap-2 mb-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 384 512"
                  className="w-4 h-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                </svg>
                <span className="font-semibold">Address:</span>
              </div>
              <p className="m-0 text-gray-300 pl-6 text-xs sm:text-sm">
                1575 Main St E, Hamilton, Ontario, L8H 1C4
              </p>
            </div>

            {/* Business Hours */}
            <div className="my-3 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z" />
                </svg>
                <span className="font-semibold text-sm">Business Hours</span>
              </div>

              <div className="flex flex-col space-y-1 pt-1 text-[13px] text-gray-200">
                <div className="flex items-center justify-between py-0.5">
                  <span>MONDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>TUESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>WEDNESDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>THURSDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>FRIDAY</span>
                  <span>9:30 AM - 07:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>SATURDAY</span>
                  <span>9:30 AM - 03:30 PM</span>
                </div>
                <div className="flex items-center justify-between py-0.5">
                  <span>SUNDAY</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default GetDirectionsSection;