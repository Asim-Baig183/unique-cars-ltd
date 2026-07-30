import React from 'react';

export const ImgBanner: React.FC = () => {
  return (
    <div className="p-0 m-0 mb-6">
      <div className="p-0 m-0 py-0 w-full h-full flex flex-col justify-center items-center">
        {/* Banner Image Container */}
        <div className="p-0 m-0 w-full relative">
          <div className="p-0 m-0 px-4 md:px-8 w-full">
            <div className="p-0 m-0 relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://uniquecars.ca/images/finance%20calculator.webp"
                alt="Finance Calculator Banner"
                className="w-full h-auto object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImgBanner;