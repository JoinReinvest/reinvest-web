import Image from 'next/image';

interface Props {
  image: string;
  alt?: string;
}

const FALLBACK_ALT = 'Property image';

export const CardHeader = ({ image, alt = FALLBACK_ALT }: Props) => (
  <header className="relative min-h-160 overflow-hidden md:min-h-200">
    <Image
      src={image}
      alt={alt}
      className="object-cover object-center"
      fill
    />
  </header>
);
