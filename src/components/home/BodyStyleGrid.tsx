import React from 'react';

export interface BodyStyleItem {
  id: string;
  label: string;
  href: string;
  image: string;
}

const BODY_STYLES: BodyStyleItem[] = [
  {
    id: 'sedan',
    label: 'SEDANS',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/sedan.jpg',
  },
  {
    id: 'coupe',
    label: 'COUPES',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/coupe.jpg',
  },
  {
    id: 'convertible',
    label: 'CONVERTIBLES',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/convertible.jpg',
  },
  {
    id: 'suv',
    label: 'SUVS',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/suv.jpg',
  },
  {
    id: 'van',
    label: 'MINIVANS/VANS',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/van.jpg',
  },
  {
    id: 'truck',
    label: 'TRUCKS/COMMERCIAL',
    href: '/inventory',
    image: 'https://uniquecars.ca/images/bodystyle/truck.jpg',
  },
];

export const BodyStyleGrid: React.FC = () => {
  return (
    <section className="w-full bg-[#111111] ">
      <div className="max-w-350 mx-auto">
        {/* Gap set to 0% across all screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
          {BODY_STYLES.map((style) => (
            <a
              key={style.id}
              href={style.href}
              className="group relative block overflow-hidden bg-[#1f1f23]"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 sm:aspect-square overflow-hidden bg-black/50">
                <img
                  src={style.image}
                  alt={style.label}
                  /* Bounce Effect: scale-110 with custom transition timing */
                  className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-500 ease-out"
                />

                {/* Top Label with Semi-Transparent Dark Gradient Overlay */}
                <div className="absolute top-0 inset-x-0 z-10 w-full bg-black/60 text-white pt-3 pb-4 px-2 text-center text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center">
                  {style.label}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BodyStyleGrid;