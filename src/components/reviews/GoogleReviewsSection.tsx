import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { reviewsData } from '../../data/reviewsData';
import { StarRating } from './StarRating';

import 'swiper/css';
import 'swiper/css/pagination';

export const GoogleReviewsSection: React.FC = () => {
  return (
    <section className="relative w-full py-12 px-4 md:px-8 bg-[#222222] text-white">
      <div className="w-full text-center py-4 mb-6">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wider text-[#e3ba73] mb-2 uppercase">
          GOOGLE REVIEWS
        </h2>
        <p className="text-sm md:text-base text-gray-300 font-sans">
          We are committed to making you a long-lasting customer and friend
        </p>
      </div>

      <div className="max-w-6xl mx-auto pb-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {reviewsData.map((review) => (
            <SwiperSlide key={review.id} className="">
              <div className="bg-black border border-white  p-6  flex flex-col justify-between text-center shadow-lg transition-transform hover:-translate-y-1">
                <div>
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src="/images/google-logo.png"
                      alt="Google logo"
                      className="w-12 h-12 object-contain mb-2"
                    />
                    <h3 className="text-lg font-semibold text-[#e3ba73] capitalize">
                      {review.author}
                    </h3>
                    <StarRating count={review.rating} />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed text-center px-2">
                    {review.text}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-800">
                  <a
                    href={review.googleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e3ba73] hover:underline text-xs font-medium inline-block"
                  >
                    Read more at Google
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;