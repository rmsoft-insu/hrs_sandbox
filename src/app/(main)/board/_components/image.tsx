"use client";

import * as React from "react";
import { Suspense, useRef } from "react";

import NextImage from "next/image";

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  altText,
  className,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}: {
  altText: string;
  className?: string | null;
  height: "inherit" | number;
  imageRef: { current: null | HTMLImageElement };
  maxWidth: number;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  useSuspenseImage(src);
  return (
    <NextImage
      width={width === "inherit" ? 50 : width}
      height={height === "inherit" ? 50 : height}
      className={className || undefined}
      ref={imageRef}
      src={src}
      alt={altText}
      style={{
        height,
        maxWidth,
        width,
      }}
      draggable="false"
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
}: {
  altText: string;
  height: "inherit" | number;
  maxWidth: number;
  src: string;
  width: "inherit" | number;
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);

  return (
    <Suspense fallback={null}>
      <>
        <LazyImage
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
      </>
    </Suspense>
  );
}