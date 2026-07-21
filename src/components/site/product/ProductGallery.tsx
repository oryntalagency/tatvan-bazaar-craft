import { useState, useCallback, useRef, useEffect } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  alt: string;
};

export function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const mainRef = useRef<HTMLDivElement>(null);

  const current = images[active] ?? images[0];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return;
    const rect = mainRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }, []);

  const handlePrev = useCallback(() => {
    setActive((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActive((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, handlePrev, handleNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="relative">
        {/* Desktop: main image + vertical thumbnails */}
        <div className="hidden md:flex gap-4">
          {images.length > 1 && (
            <div className="flex w-20 flex-col gap-2">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200",
                    active === i
                      ? "border-primary"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <img
                    src={src}
                    alt={`${alt} thumbnail ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div
            ref={mainRef}
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setLightbox(true)}
            className={cn(
              "relative flex-1 overflow-hidden rounded-2xl border border-border bg-secondary cursor-zoom-in",
              zoom && "cursor-zoom-out",
            )}
          >
            <img
              src={current}
              alt={alt}
              className="h-full w-full object-cover transition-opacity duration-300"
              style={
                zoom
                  ? {
                      transform: `scale(2)`,
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transition: "transform 0.1s ease-out",
                    }
                  : { transition: "transform 0.3s ease-out" }
              }
            />
            {!zoom && (
              <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground/60 backdrop-blur-sm">
                <ZoomIn className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: full-width swipeable carousel + dot indicators */}
        <div className="md:hidden">
          <div
            className="relative overflow-hidden rounded-xl"
            onTouchStart={(e) => {
              const el = e.currentTarget;
              el.dataset.startX = String(e.touches[0].clientX);
            }}
            onTouchEnd={(e) => {
              const startX = Number(e.currentTarget.dataset.startX ?? 0);
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) handleNext();
                else handlePrev();
              }
            }}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${active * 100}%)` }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="w-full shrink-0 aspect-square bg-secondary"
                  onClick={() => setLightbox(true)}
                >
                  <img
                    src={src}
                    alt={`${alt} ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex justify-center gap-2 pt-3">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-200",
                    active === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30",
                  )}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 sm:left-4"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-foreground/10 text-foreground hover:bg-foreground/20 sm:right-4"
                  aria-label="Next"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={current}
              alt={alt}
              className="max-h-[85vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
