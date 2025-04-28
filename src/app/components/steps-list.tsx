import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface StepProps {
    classForItem: string;
    items: Step[]
}

interface Step {
    title: string;
    description: string;
}

export default function StepsList({ classForItem, items }: StepProps) {
    return (
        <Swiper
            className='list'
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation, Pagination, Autoplay]}
            breakpoints={{
                320: {
                    navigation: false,
                    
                },
                768: {
                    navigation: false
                }
            }}
            navigation={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }} 
    
            pagination={{ clickable: true }}
        >
            {items.map((step, index) => (
                <SwiperSlide key={index} className={classForItem}>
                    <div className="step">
                        <div className="step__number"><span>{index + 1}</span></div>
                        <h3 className="step__title">{step.title}</h3>
                        <p className="step__description">{step.description}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
} 