import React from 'react';

const storeHours = [
  { day: 'Monday', hours: '9:30 AM - 07:00 PM' },
  { day: 'Tuesday', hours: '9:30 AM - 07:00 PM' },
  { day: 'Wednesday', hours: '9:30 AM - 07:00 PM' },
  { day: 'Thursday', hours: '9:30 AM - 07:00 PM' },
  { day: 'Friday', hours: '9:30 AM - 07:00 PM' },
  { day: 'Saturday', hours: '9:30 AM - 03:30 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#111111] text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Column 1: Dealership About */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#e3ba73] pb-1 inline-block w-max">
            Dealership
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-6">
            Welcome to UNIQUE CARS LTD, your trusted source for high-quality utilized cars. We have set up ourselves as a reputable and dependable dealership within the region. At UNIQUE CARS LTD, we get it that buying a utilized car can be overpowering, which is why we endeavor to supply a stress-free and straightforward car-buying involvement. Our learned group is devoted to making a difference you discover the idealize vehicle that meets your needs and budget.
          </p>
          <a
            href="/about-us"
            className="text-[#e3ba73] hover:underline text-sm font-semibold mt-3 inline-block"
          >
            Read More...
          </a>
        </div>

        {/* Column 2: Our Hours */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#e3ba73] pb-1 inline-block w-max">
            Our Hours
          </h3>
          <div className="space-y-2 text-sm">
            {storeHours.map((item) => (
              <div
                key={item.day}
                className="flex justify-between items-center text-gray-300 border-b border-gray-800 pb-1"
              >
                <span>{item.day}</span>
                <span>{item.hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Our Contacts */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#e3ba73] pb-1 inline-block w-max">
            Our Contacts
          </h3>
          <div className="space-y-3 text-sm text-gray-300">
            <a
              href="/directions"
              className="flex items-start gap-2 hover:text-[#e3ba73] transition-colors"
            >
              <svg
                className="w-5 h-5 fill-current text-[#e3ba73] shrink-0 mt-0.5"
                viewBox="0 0 384 512"
              >
                <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
              </svg>
              <span>1575 Main St E, Hamilton, Ontario, L8H 1C4</span>
            </a>

            <a
              href="tel:9055802102"
              className="flex items-center gap-2 hover:text-[#e3ba73] transition-colors"
            >
              <svg
                className="w-4 h-4 fill-current text-[#e3ba73] shrink-0"
                viewBox="0 0 512 512"
              >
                <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" />
              </svg>
              <span>905-580-2102</span>
            </a>
          </div>
        </div>

        {/* Column 4: Connect & Logo */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold mb-4 border-b-2 border-[#e3ba73] pb-1 inline-block w-max">
            Connect with us
          </h3>
          <div className="mb-4">
            <img
              src="https://image123.azureedge.net/uniquecarsltd/42866094474054073-cropped-colourLogo-1-1.png"
              alt="Unique Cars Ltd Logo"
              className="max-w-55 w-full object-contain"
            />
          </div>
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.facebook.com/uniquecars.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#222222] p-2.5 rounded hover:bg-[#333] transition-colors text-white hover:text-[#e3ba73]"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 320 512">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/uniquecarsltd/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#222222] p-2.5 rounded hover:bg-[#333] transition-colors text-white hover:text-[#e3ba73]"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@uniquecarsltd?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#222222] p-2.5 rounded hover:bg-[#333] transition-colors text-white hover:text-[#e3ba73]"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512">
                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V258.2a90.13 90.13 0 1 0 67.75 87.37V0h70.52a138.83 138.83 0 0 0 71.37 114.73A138.2 138.2 0 0 0 448 135.15z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;