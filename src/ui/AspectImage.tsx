import { useState } from 'react';

import { PLACEHOLDER_GRADIENT, RATIO, type Ratio } from '@/config/images';
import { cn } from '@/lib/cn';

type AspectImageProps = {
  src: string;
  /** Responsive candidates. Build with imageSet() / photo(), never by hand. */
  srcSet?: string;
  /**
   * How wide the image will actually be rendered at each breakpoint. Pass a
   * preset from SIZES. Getting this wrong is the main cause of a phone
   * downloading a desktop-sized image, so it is required rather than optional.
   */
  sizes: string;
  /** Empty string marks the image as decorative. Never omit it. */
  alt: string;
  ratio?: Ratio;
  /**
   * Above-the-fold images only — loads eagerly at high priority. Everything
   * else should stay lazy, including every slide of a carousel.
   */
  priority?: boolean;
  /** Scale up slightly on hover. For cards and tiles inside a group. */
  zoomOnHover?: boolean;
  className?: string;
  imgClassName?: string;
};

/**
 * The project's only `<img>`.
 *
 * It reserves the layout box with `aspect-ratio` before the file arrives,
 * which is what holds cumulative layout shift at zero; the warm gradient fills
 * that box until the photo decodes, so a slow connection shows a placeholder
 * in the palette rather than a white hole.
 */
export function AspectImage({
  src,
  srcSet,
  sizes,
  alt,
  ratio = 'landscape',
  priority = false,
  zoomOnHover = false,
  className,
  imgClassName,
}: AspectImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio: RATIO[ratio],
        background: loaded ? undefined : PLACEHOLDER_GRADIENT,
      }}
    >
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        // A cached image can finish before React attaches onLoad, so the
        // completed flag is read back from the element on mount too.
        ref={(node) => {
          if (node?.complete) setLoaded(true);
        }}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          zoomOnHover &&
            'ease-soft group-hover:scale-106 transition-[opacity,transform] duration-600 motion-reduce:group-hover:scale-100',
          imgClassName,
        )}
      />
    </div>
  );
}
