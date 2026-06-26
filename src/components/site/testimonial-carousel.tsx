"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { ProofTestimonial } from '@/lib/site-content';

export function TestimonialCarousel({ testimonials }: { testimonials: ProofTestimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-5xl mt-16 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Blob */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--accent)_12%,transparent),transparent_70%)] blur-3xl" />

      <div className="relative rounded-[2.5rem] border border-[color:color-mix(in_oklch,var(--accent)_15%,transparent)] bg-[color:color-mix(in_oklch,var(--bg)_70%,transparent)] backdrop-blur-xl shadow-2xl p-8 sm:p-16 sm:py-20 overflow-hidden">
        
        {/* Carousel Container */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y flex-row">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-0 flex-[0_0_100%] px-4 sm:px-12 flex flex-col items-center text-center"
              >
                <Quote className="h-12 w-12 sm:h-16 sm:w-16 text-[color:var(--accent)] opacity-20 mb-8 transform -scale-x-100" />
                
                <p className="text-xl sm:text-3xl lg:text-4xl leading-[1.5] text-[color:var(--text-main)] font-light tracking-tight text-balance">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="mt-12 flex flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:color-mix(in_oklch,var(--accent)_10%,transparent)] border border-[color:color-mix(in_oklch,var(--accent)_20%,transparent)] mb-5 shadow-inner">
                    <span className="text-xl font-semibold text-[color:var(--accent)]">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-[color:var(--text-main)] text-xl mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm font-medium tracking-wide text-[color:var(--text-main)] opacity-70">
                    <span className="text-[color:var(--accent)] font-semibold opacity-100">{testimonial.role}</span> at {testimonial.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Controls */}
        {testimonials.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[color:color-mix(in_oklch,var(--bg)_80%,transparent)] backdrop-blur-md p-3 sm:p-4 shadow-xl border border-[color:color-mix(in_oklch,var(--text-main)_10%,transparent)] transition-all hover:scale-110 hover:bg-[color:var(--accent)] text-[color:var(--text-main)] hover:text-[color:var(--bg)] hover:border-transparent group hidden sm:block"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[color:color-mix(in_oklch,var(--bg)_80%,transparent)] backdrop-blur-md p-3 sm:p-4 shadow-xl border border-[color:color-mix(in_oklch,var(--text-main)_10%,transparent)] transition-all hover:scale-110 hover:bg-[color:var(--accent)] text-[color:var(--text-main)] hover:text-[color:var(--bg)] hover:border-transparent group hidden sm:block"
              onClick={scrollNext}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:translate-x-0.5" />
            </button>
            
            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-8 bg-[color:var(--accent)]'
                      : 'w-2 bg-[color:color-mix(in_oklch,var(--text-main)_20%,transparent)] hover:bg-[color:color-mix(in_oklch,var(--text-main)_40%,transparent)]'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
