import React from 'react';
import {
  MapPin,
  Navigation,
  CalendarPlus,
  Car,
  Compass,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/calendar';

interface VenueSectionProps {
  config: WeddingConfig;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ config }) => {
  return (
    <section id="venue" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>محل برگزاری و مسیریابی</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-calligraphy text-[#2C241E]">
          میعادگاه مهر در {config.venueName}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7D6B5E]">
          جهت سهولت در دسترسی و تردد، مسیرهای دسترسی با اپلیکیشن‌های نقشه فراهم شده است
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Venue Visual & Image */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-md flex-1 min-h-[280px]">
            <img
              src={config.photos[3]?.url || config.photos[0]?.url}
              alt={config.venueName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-5 inset-x-5 text-white">
              <span className="text-xs uppercase tracking-wider text-[#E2C799] font-medium">
                {config.city}
              </span>
              <h3 className="text-xl font-bold font-calligraphy mt-0.5">
                {config.venueName}
              </h3>
              <p className="text-xs text-white/80 mt-1 line-clamp-2">
                {config.venueAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Address, Navigation Apps & Calendar */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start gap-3.5 mb-6">
              <div className="p-3 rounded-xl bg-[#FAF7F2] text-[#9A7432] border border-[#E8DEC8] shrink-0 mt-1">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#2C241E]">
                  نشانی کامل تالار و عمارت:
                </h4>
                <p className="text-sm text-[#5A4A3E] mt-1 leading-relaxed">
                  {config.venueAddress}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#7D6B5E]">
                  <Car className="w-4 h-4 text-[#9A7432]" />
                  <span>دارای پارکینگ اختصاصی و رایگان برای تمامی میهمانان</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons Grid */}
            <div className="my-6">
              <p className="text-xs font-semibold text-[#2C241E] mb-3">
                مسیریابی با برنامه‌های نقشه همراه:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Neshan */}
                <a
                  href={config.neshanUrl || 'https://nshn.ir'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#2C241E] transition-all hover:scale-[1.02] shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#00A859]" />
                  <span>مسیریابی با نشان</span>
                </a>

                {/* Balad */}
                <a
                  href={config.baladUrl || 'https://balad.ir'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#2C241E] transition-all hover:scale-[1.02] shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0066FF]" />
                  <span>مسیریابی با بلد</span>
                </a>

                {/* Google Maps */}
                <a
                  href={config.googleMapsUrl || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#2C241E] transition-all hover:scale-[1.02] shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#EA4335]" />
                  <span>گوگل مپ</span>
                </a>

                {/* Waze */}
                <a
                  href={config.wazeUrl || 'https://waze.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] hover:bg-[#F2ECE1] text-xs font-semibold text-[#2C241E] transition-all hover:scale-[1.02] shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#33CCFF]" />
                  <span>مسیریابی با ویز</span>
                </a>
              </div>
            </div>
          </div>

          {/* Add to Calendar Section */}
          <div className="pt-6 border-t border-[#E8DEC8]">
            <p className="text-xs font-semibold text-[#2C241E] mb-2.5">
              یادآوری تاریخ جشن در تقویم تلفن همراه شما:
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => downloadIcsFile(config)}
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E8DEC8] text-xs font-medium text-[#2C241E] transition-colors"
              >
                <CalendarPlus className="w-4 h-4 text-[#9A7432]" />
                <span>دانلود فایل تقویم (Apple / Outlook)</span>
              </button>

              <a
                href={getGoogleCalendarUrl(config)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E8DEC8] text-xs font-medium text-[#2C241E] transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-[#9A7432]" />
                <span>افزودن مستقیم به تقویم گوگل</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
