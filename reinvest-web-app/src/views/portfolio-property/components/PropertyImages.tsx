import { Typography } from 'components/Typography';
import Image from 'next/image';
import { Maybe } from 'reinvest-app-common/src/types/graphql';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
  images: Maybe<string>[];
  title: string;
}

export const PropertyImages = ({ title, images }: Props) => (
  <div className="property-images order-2 md:order-3 md:row-span-2">
    <Swiper
      modules={[Pagination]}
      className="relative h-240 w-full select-none md:h-296"
      pagination
      observer
    >
      <Typography
        variant="h3"
        className="pointer-events-none absolute bottom-47 left-24 z-20 text-white md:bottom-55 md:left-32"
      >
        {title}
      </Typography>

      <div className="pointer-events-none absolute bottom-0 z-10 h-1/2 w-full bg-gradient-to-b from-transparent to-black-01" />

      {images.map((image, index) => (
        <SwiperSlide
          key={index}
          className="relative h-full overflow-hidden"
        >
          <Image
            src={image ?? ''}
            className="object-cover object-center"
            alt={`Property image #${index + 1}`}
            priority={index === 0}
            fill
          />
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);
