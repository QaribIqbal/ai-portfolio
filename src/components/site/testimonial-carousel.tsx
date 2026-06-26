"use client";

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { ProofTestimonial } from '@/lib/site-content';

export function TestimonialCarousel({ testimonials }: { testimonials: ProofTestimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [Autoplay({ delay: 6000, stopOnInteraction: true })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative mx-auto max-w-5xl rounded-3xl bg-gradient-to-b from-[color:color-mix(in_oklch,var(--accent)_15%,transparent)] to-[color:color-mix(in_oklch,var(--accent)_5%,transparent)] p-8 sm:p-16 shadow-[0_0_50px_-12px_color-mix(in_oklch,var(--accent)_40%,transparent)] ring-1 ring-[color:color-mix(in_oklch,var(--accent)_30%,transparent)] mt-12">
      <Quote className="mx-auto h-12 w-12 text-[color:var(--accent)] opacity-60 mb-8" />
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y flex-row">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%] px-4 sm:px-12 flex flex-col items-center text-center">
              <p className="text-xl sm:text-3xl leading-[1.6] text-[color:var(--text-main)] italic font-medium tracking-tight">
                "{testimonial.quote}"
              </p>
              <div className="mt-10 flex flex-col items-center">
                <p className="font-bold text-[color:var(--text-main)] text-lg">
                  {testimonial.name}
                </p>
                <p className="text-sm font-medium uppercase tracking-[0.15em] text-[color:var(--accent)] mt-2">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <>
          <button
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full bg-[color:var(--bg)] p-3.5 shadow-xl ring-1 ring-[color:color-mix(in_oklch,var(--accent)_20%,transparent)] transition-all hover:scale-110 hover:bg-[color:var(--accent)] text-[color:var(--text-main)] hover:text-[color:var(--bg)]"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full bg-[color:var(--bg)] p-3.5 shadow-xl ring-1 ring-[color:color-mix(in_oklch,var(--accent)_20%,transparent)] transition-all hover:scale-110 hover:bg-[color:var(--accent)] text-[color:var(--text-main)] hover:text-[color:var(--bg)]"
            onClick={scrollNext}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}
