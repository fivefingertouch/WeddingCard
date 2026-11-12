import React, { useState } from 'react';
import { Camera, X, ZoomIn } from 'lucide-react';
import { GalleryPhoto } from '../types/wedding';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>آلبوم تصاویر و خاطرات</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-calligraphy text-[#2C241E]">
          گوشه‌هایی از روزهای عاشقی
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7D6B5E]">
          ثبت یادمان‌های شیرین پیش از آغاز این پیوند آسمانی
        </p>
      </div>

      {/* Dynamic Bento Box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id || index}
            onClick={() => setActivePhoto(photo)}
            className={`group cursor-pointer relative rounded-2xl overflow-hidden border border-[#E8DEC8] bg-white shadow-sm hover:shadow-md transition-all duration-300 ${
              index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
          >
            <div className={`relative w-full ${index === 0 ? 'h-72 sm:h-full min-h-[340px]' : 'h-64'}`}>
              <img
                src={photo.url}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Zoom hint icon */}
              <div className="absolute top-3 left-3 p-2 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-3 inset-x-3 text-white">
                <p className="text-xs sm:text-sm font-medium drop-shadow-md">
                  {photo.caption}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 left-0 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="بستن تصویر"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activePhoto.url}
              alt={activePhoto.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-center text-sm sm:text-base font-calligraphy text-white/90">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
