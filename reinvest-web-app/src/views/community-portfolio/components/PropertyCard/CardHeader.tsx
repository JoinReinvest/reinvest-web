import Image from 'next/image';

interface Props {
  image: string;
  alt?: string;
  prioritize?: boolean;
}

const FALLBACK_ALT = 'Property image';

export const CardHeader = ({ image, alt = FALLBACK_ALT, prioritize = false }: Props) => (
  <header className="relative min-h-160 overflow-hidden md:min-h-200">
    <Image
      src={image}
      alt={alt}
      className="object-cover object-center transition-transform ease-in group-hover:scale-105"
      fill
      priority={prioritize}
      loading={prioritize ? 'eager' : 'lazy'}
    />
  </header>
);
