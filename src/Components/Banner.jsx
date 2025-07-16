import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRef } from 'react';

const successStories = [
  {
    image: 'https://i.postimg.cc/bwLSxgvX/children.jpg',
    title: 'Over 500+ Children Vaccinated',
    description: 'A successful child immunization camp conducted with high community engagement.'
  },
  {
    image: 'https://i.postimg.cc/WtL1VFbw/free-eye.jpg',
    title: 'Free Eye Checkup Camp',
    description: 'More than 300 patients received free consultation and eyeglasses support.'
  },
  {
    image: 'https://i.postimg.cc/qvZyfQHs/Health-Awareness-in-rural-areas-of-India.webp',
    title: 'Rural Health Awareness Program',
    description: 'Educating rural communities on hygiene and preventive care.'
  },
  {
    image: 'https://i.postimg.cc/HLJRwStj/blood-donation.jpg',
    title: 'Blood Donation Drive',
    description: 'Collected over 100 blood units to support emergency care services.'
  },
  {
    image: 'https://i.postimg.cc/yNSpgDVZ/women-s.jpg',
    title: 'Women’s Wellness Camp',
    description: 'Focused on maternal health and breast cancer awareness for 200+ women.'
  },
  {
    image: 'https://i.postimg.cc/Hkmb4j4M/senior.jpg',
    title: 'Senior Citizen Health Check',
    description: 'Provided free checkups and medicines to 150+ senior citizens.'
  },
  {
    image: 'https://i.postimg.cc/tTpdqJ7y/Mobile-Unit.jpg',
    title: 'Mobile Health Van Outreach',
    description: 'Delivered basic healthcare services to remote villages using mobile vans.'
  },
  {
    image: 'https://i.postimg.cc/nr7QqtXT/dental.jpg',
    title: 'Dental Care Awareness',
    description: 'Promoted oral hygiene and free dental checkups for school students.'
  },
  {
    image: 'https://i.postimg.cc/XY2XGv24/diabetes.jpg',
    title: 'Diabetes Screening Camp',
    description: 'Over 200 people screened, raising awareness about lifestyle diseases.'
  },
  {
    image: 'https://i.postimg.cc/XN2KWVWS/multy.jpg',
    title: 'Multi-Specialty Health Fair',
    description: 'Hosted 10+ medical specialists and served over 800 patients in one day.'
  }
]


const Banner = () => {
 
  return (
    <div className="w-full max-h-[500px] overflow-hidden mt-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        pagination={{ clickable: true }}
        loop={true}
        className="h-full"
      >
        {successStories.map((story, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-[230px] lg:h-[500px] bg-cover bg-center"
              style={{ backgroundImage: `url(${story.image})` }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{story.title}</h2>
                <p className="text-lg md:text-xl max-w-2xl">{story.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
