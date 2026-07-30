import React from 'react';
import { Phone, MapPin, Clock } from 'lucide-react';

export const ContactUsSection: React.FC = () => {
  return (
    <div className="p-0 m-0 w-full bg-black">
      <div className="p-0 m-0 w-full flex justify-center">
        <div className="w-full lg:w-[83.333%] p-0 m-0 px-3 flex flex-wrap">
          
          {/* Left Column: Form Section */}
          <div className="p-1 md:p-3 m-0 w-full lg:w-[58.333%] xl:w-[66.666%]">
            <div className="bg-[#222222] p-2 lg:p-3 m-0 w-full">
              <div className="p-0 m-0 py-0 w-full h-full flex flex-col justify-center items-center">
                <div className="p-0 m-0 w-full relative flex justify-start items-start">
                  <div className="p-0 m-0 px-5 w-full"></div>
                </div>
                <div className="p-0 m-0 flex w-full flex-col items-start justify-start">
                  <div className="p-0 m-0">
                    <h2 className="my-2 m-0 p-0 mb-2 flex items-start justify-start text-white text-2xl font-bold">
                      Contact Us
                    </h2>
                  </div>
                </div>
              </div>

              <p className="text-[23px] text-white font-sans">
                Get In Touch With Us
              </p>
              <p className="w-full p-0 m-0 text-[13px] text-gray-300 font-sans uppercase">
                PHONE, EMAIL OR IN PERSON- HERE'S HOW TO REACH US
              </p>

              <form className="p-0 m-0 flex flex-wrap" onSubmit={(e) => e.preventDefault()}>
                <div className="p-0 m-0 w-full">
                  <div className="p-0 m-0 flex flex-wrap">
                    
                    {/* First Name */}
                    <div className="p-1 m-0 w-full md:w-[75%] flex flex-col">
                      <label className="text-white text-sm mb-1">First Name (required)</label>
                      <input
                        type="text"
                        id="f_name"
                        name="f_name"
                        className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="p-1 m-0 w-full md:w-[75%] flex flex-col">
                      <label className="text-white text-sm mb-1">Last Name (required)</label>
                      <input
                        type="text"
                        id="l_name"
                        name="l_name"
                        className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>

                    {/* Email */}
                    <div className="p-1 m-0 w-full md:w-[75%] flex flex-col">
                      <label className="text-white text-sm mb-1">Email (required)</label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>

                    {/* Phone */}
                    <div className="p-1 m-0 w-full md:w-[75%] flex flex-col">
                      <label className="text-white text-sm mb-1">Phone (required)</label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73]"
                      />
                    </div>

                    {/* Vehicle Search & Message */}
                    <div className="p-1 m-0 w-full md:w-[75%] flex flex-col">
                      <div className="p-0 m-0 w-full">
                        <div className="p-0 m-0 mt-2 mb-2 relative">
                          <input
                            name="frk_midv_id"
                            className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73]"
                            placeholder="Search (Year Make Model)"
                          />
                        </div>
                      </div>
                      <label className="text-white text-sm mb-1">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full bg-[#121212] text-white border border-gray-700 rounded px-3 py-2 focus:outline-none focus:border-[#e3ba73] resize-none"
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="p-1 m-0 w-full sm:w-[66.666%] flex my-2 justify-start items-end">
                      <div className="p-0 m-0 w-1/2">
                        <button
                          type="submit"
                          className="w-[75%] bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-semibold py-2 px-4 rounded transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Contact Info Section */}
          <div className="p-1 md:p-3 m-0 w-full lg:w-[41.666%] xl:w-[33.333%]">
            <div className="pt-5 lg:pt-0 m-0 px-3 lg:px-2">
              <div className="p-4 pt-0 m-0 mb-4 w-full bg-[#212121] text-white">
                <h3 className="text-xl font-bold my-3 text-[#e3ba73]">Contact Information</h3>

                {/* Phone */}
                <p className="p-0 m-0 my-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#e3ba73]" />
                  <a href="tel:9055802102" className="p-0 m-0 no-underline text-inherit flex items-center">
                    <span className="font-semibold">Phone:</span>
                    <span className="mx-1">905-580-2102</span>
                  </a>
                </p>

                {/* Address */}
                <div className="p-0 m-0 my-3">
                  <div className="flex flex-row items-center gap-1 mb-1">
                    <MapPin className="w-4 h-4 text-[#e3ba73]" />
                    <span className="font-semibold">Address:</span>
                  </div>
                  <p className="m-0 p-0 text-sm text-gray-300">
                    1575 Main St E, Hamilton, Ontario, L8H 1C4
                  </p>
                </div>

                {/* Hours Block */}
                <div className="flex flex-row items-center">
                  <div className="p-0 m-0 my-3 w-full sm:w-[50%] lg:w-full">
                    <div className="flex flex-row items-center gap-1 mb-2">
                      <Clock className="w-4 h-4 text-[#e3ba73] mr-1" />
                      <span className="font-semibold my-3">Business Hours</span>
                    </div>

                    <div className="p-0 m-0">
                      <div className="flex flex-col justify-center gap-1">
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">MONDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 07:00 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">TUESDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 07:00 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">WEDNESDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 07:00 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">THURSDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 07:00 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">FRIDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 07:00 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">SATURDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">9:30 AM - 03:30 PM</p>
                        </div>
                        <div className="p-0 m-0 flex items-center justify-between">
                          <p className="p-0 m-0 my-1 text-white text-[13px]">SUNDAY</p>
                          <p className="p-0 m-0 text-white text-right text-[13px]">Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <div className="w-full p-0 m-0 mt-4">
                  <a
                    className="p-1 w-full sm:w-[41.666%] lg:w-full flex items-center justify-start no-underline"
                    href="/directions"
                  >
                    <span className="bg-[#e3ba73] hover:bg-[#cdaf63] text-black font-medium px-4 py-1.5 rounded transition-colors text-sm">
                      Get Direction
                    </span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;