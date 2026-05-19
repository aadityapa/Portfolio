"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

/** Tiny slate placeholder — avoids layout shift while image loads */
export const IMAGE_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCfAA//2Q==";

const PROJECT_CARD_SIZES = "(max-width: 768px) 85vw, 420px";
const ABOUT_PHOTO_SIZES = "(max-width: 768px) 100vw, 400px";
const HERO_PHOTO_SIZES = "(max-width: 1024px) 0px, 520px";

type LazyImageProps = Omit<ImageProps, "fill" | "sizes"> & {
  fill?: boolean;
  priority?: boolean;
  rootMargin?: string;
  wrapperClassName?: string;
  sizes?: string;
};

export function LazyImage({
  priority = false,
  rootMargin = "280px",
  wrapperClassName,
  className,
  alt,
  fill = true,
  sizes = PROJECT_CARD_SIZES,
  ...props
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(priority);

  useEffect(() => {
    if (priority || shouldLoad) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, shouldLoad, rootMargin]);

  return (
    <div ref={ref} className={cn(fill && "absolute inset-0", wrapperClassName)}>
      {shouldLoad ? (
        <Image
          alt={alt}
          fill={fill}
          sizes={sizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className={className}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 animate-pulse bg-slate-800/50" aria-hidden />
      )}
    </div>
  );
}

export { PROJECT_CARD_SIZES, ABOUT_PHOTO_SIZES, HERO_PHOTO_SIZES };
