import React from 'react';
import { motion } from 'framer-motion';

export const DealershipSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="p-0 m-0 w-full bg-black"
    >
      {/* Top Banner Image */}
      <div className="  p-0 m-0 w-full">
        <div className=" p-0 m-0 flex w-full h-75">
          <img
            src="https://image123.azureedge.net/uniquecarsltd/6890882046776601-0005156963278540871-browse.about_us.webp"
            alt="Dealership Banner"
            className="w-full h-full p-0 m-0 object-cover"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className=" sm:px-12 m-0 flex w-full justify-center items-start">
        <div className="bg-[#222222] w-full h-full max-w-7xl py-8 px-4 sm:px-8 text-white rounded-md">
          {/* Title */}
          <h4 className="py-2 px-4 lg:px-1 p-0 m-0 w-full text-left font-bold text-[26px] font-sans text-white">
            Dealership
          </h4>

          <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-8 mt-4">
            {/* Left Welcome Image */}
            <div className="p-0 px-4 lg:px-0 m-0 w-full lg:w-5/12 flex justify-center items-center">
              <div className="w-full">
                <img
                  className="w-full h-auto rounded"
                  src="https://image123.azureedge.net/uniquecarsltd/6607906803345702-uniq-wellcome-home.webp"
                  alt="Welcome to Unique Cars Ltd"
                />
              </div>
            </div>

            {/* Right Text Content */}
            <div className="p-0 px-4 lg:px-0 m-0 w-full lg:w-7/12 flex justify-start items-start">
              <div className="about__us__backgroundteam_bg1 p-0 m-0 w-full">
                <div className="p-0 pt-3 sm:p-1 sm:pt-3 lg:px-8 xl:px-8 m-0 w-full about__us__backgroundteam">
                  <div className="p-0 m-0 w-full">
                    <div className="p-0 pb-0 md:pb-5 m-0 w-full flex flex-col justify-start items-start">
                      
                      <h5 className="text-white text-lg font-bold mb-2">
                        Welcome to Unique Cars Ltd!
                      </h5>

                      <div className="p-0 py-2 w-full m-0 aboutus_div__description text-gray-200 text-sm leading-relaxed">
                        <p>
                          Welcome to UNIQUE CARS LTD, your trusted source for high-quality utilized cars.
                          We have set up ourselves as a reputable and dependable dealership within the region.
                          At UNIQUE CARS LTD, we get it that buying a utilized car can be overpowering,
                          which is why we endeavor to supply a stress-free and straightforward car-buying involvement.
                          Our learned group is devoted to making a difference you discover the idealize vehicle
                          that meets your needs and budget. We carefully assess and hand-select each car in
                          our stock to guarantee its quality and unwavering quality. Furthermore, we offer competitive
                          financing options and expanded guarantee programs to allow you peace of intellect together
                          with your buy. Client fulfillment is our best need, and we go over and past to surpass
                          your desires. Visit UNIQUE CARS LTD today and let us help you in finding your another dream car!
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DealershipSection;