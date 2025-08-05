// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/free-mode';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
// import { FreeMode, Pagination, Autoplay, Navigation } from 'swiper/modules';

// import CourseCard from './Course_Card';

// const CourseSlider = ({ Courses = [] }) => {
//   return (
//     <>
//       {Courses.length > 0 ? (
//         <Swiper
//           slidesPerView={1}
//           spaceBetween={25}
//           loop={true}
//           modules={[FreeMode, Pagination, Autoplay, Navigation]}
//           autoplay={{ delay: 2500, disableOnInteraction: false }}
//           navigation
//           pagination={{ clickable: true }}
//           freeMode={true}
//           breakpoints={{
//             1024: {
//               slidesPerView: 3,
//             },
//           }}
//           className="max-h-[30rem]"
//         >
//           {Courses.map((course, i) => (
//             <SwiperSlide key={i}>
//               <CourseCard course={course} Height="h-[250px]" />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       ) : (
//         <p className="text-xl text-black">No Course Found</p>
//       )}
//     </>
//   );
// };

// export default CourseSlider;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper/modules";

import CourseCard from "./Course_Card";

const CourseSlider = ({ Courses = [] }) => {
  return (
    <>
      {Courses.length > 0 ? (
        <Swiper
          slidesPerView={1} // Start with one slide per view
          spaceBetween={25} // Space between slides
          loop={true} // Enable looping of slides
          modules={[FreeMode, Pagination, Navigation]} // Modules needed
          navigation
          pagination={{ clickable: true }}
          freeMode={true}
          breakpoints={{
            640: {
              slidesPerView: 1, // Single card per row on small screens
            },
            768: {
              slidesPerView: 2, // Two cards per row on medium screens
            },
            1024: {
              slidesPerView: 3, // Three cards per row on large screens
            },
          }}
          className="max-h-[30rem] w-full" // Ensuring full width container and no overflow
        >
          {Courses.map((course, i) => (
            <SwiperSlide key={i} className="w-full rounded-2xl bg-[#F9FAFB]">
              {" "}
              {/* Ensure full width for each slide */}
              <CourseCard course={course} Height="h-[250px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-black">No Course Found</p>
      )}
    </>
  );
};

export default CourseSlider;
