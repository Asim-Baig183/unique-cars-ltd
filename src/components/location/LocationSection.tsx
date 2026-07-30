import React from 'react';

export const LocationSection: React.FC = () => {
  return (
    <section className="w-full p-0 m-0">
      {/* Location Banner */}
      <div className="w-full py-3 bg-[#e3ba73] text-white flex flex-row justify-center items-center">
        <a className="font-bold px-2 sm:px-0">
          <span className="p-0 m-0 px-2 text-sm md:text-base">
            We are located at 1575 Main St E, Hamilton, Ontario, L8H 1C4
          </span>
        </a>
      </div>

      {/* Map Embed */}
      <div className="w-full p-0 m-0">
        <iframe
          id="iframe"
          title="Unique Cars Ltd Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2901.995845475954!2d-79.81938199999999!3d43.33527599999999!2m3!1f0!2f0!3f0!
          3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9e02c428bf6f%3A0x57e252e72b3fda79!2sUnique%20Cars%20ltd!5e0!3m2!1sen!2sca!4v1782437371496!5m2!1sen!2sca"
          className="border-0 w-full h-100"
          allow="geolocation"
          aria-hidden="false"
          tabIndex={0}
        />
      </div>
    </section>
  );
};

export default LocationSection;