import Image from 'next/image';

interface FigureProps {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function Figure({
  src,
  alt = '',
  caption,
  width = 800,
  height = 450,
}: FigureProps) {
  if (!src) return null;

  return (
    <figure className="my-6 space-y-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-lg"
      />
      {caption && (
        <figcaption className="text-muted-foreground text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
