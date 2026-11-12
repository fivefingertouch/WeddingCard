import React from 'react';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface CoupleSectionProps {
  config: WeddingConfig;
  guestName: string;
  onCelebrate?: () => void;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config, guestName, onCelebrate }) => {
  return (
    <section id="top" className="relative pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Personalized Guest Welcome Ribbon */}
      <div className="mb-10 p-4 sm:p-6 bg-gradient-to-r from-[#F6EFE3] via-[#FAF4EA] to-[#F6EFE3] border border-[#E8DEC8] rounded-2xl text-center shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#9A7432] mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>دعوت‌نامه اختصاصی</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-calligraphy font-bold text-[#2C241E]">
          {guestName ? `${guestName} ارجمند` : 'میهمانان گرانقدر و ارجمند'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#6B5A4E] max-w-xl mx-auto leading-relaxed">
          حضور پرمهر و صمیمانه شما در این بزم فرخنده، رونق‌بخش محفل ما و یادگاری ماندگار در دفتر
          عشق و خاطراتمان خواهد بود.
        </p>

        {onCelebrate && (
          <div className="mt-4">
            <button
              onClick={onCelebrate}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-[#8C6D46] border border-[#E8DEC8] shadow-xs hover:shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-spin" style={{ animationDuration: '4s' }} />
              <span>بارش شادباش و پولک‌های طلایی 🎊</span>
            </button>
          </div>
        )}
      </div>

      {/* Hero Editorial Split: Left (typography & poetry) + Right (couple portrait) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & Romantic Poetry */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
          <div className="inline-flex items-center gap-2 text-xs text-[#9A7432] font-semibold tracking-wider uppercase">
            <Flower2 className="w-4 h-4 text-[#C5A265]" />
            <span>{config.ceremonyType}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-calligraphy text-[#2C241E] leading-tight">
            {config.brideName}{' '}
            <span className="text-[#C5A265] font-serif-luxury font-light mx-2">&</span>{' '}
            {config.groomName}
          </h1>

          {/* Families acknowledgment */}
          <div className="text-xs sm:text-sm text-[#7D6B5E] space-y-0.5">
            <p>به میزبانی:</p>
            <p className="font-semibold text-[#42352B]">
              {config.brideFamily} و {config.groomFamily}
            </p>
          </div>

          {/* Persian Poem Box with Hairline Border */}
          <div className="p-6 bg-[#FFFFFF] rounded-2xl border border-[#E8DEC8] shadow-sm relative">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] flex items-center justify-center absolute -top-4 right-6 text-[#9A7432]">
              <Heart className="w-4 h-4 fill-[#9A7432]/30" />
            </div>
            <p className="font-calligraphy text-base sm:text-lg lg:text-xl text-[#3A2C22] leading-loose whitespace-pre-line pt-2">
              « {config.poem} »
            </p>
            {config.poemPoet && (
              <p className="mt-3 text-xs text-[#9A7432] font-medium text-left">
                — {config.poemPoet}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-[#5A4A3E] leading-relaxed max-w-xl">
            {config.invitationMessage}
          </p>

          {/* Clean metadata strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-[#6B5A4E]">
            <span className="font-medium text-[#2C241E]">{config.dateSolar}</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>{config.timeRange}</span>
            <span aria-hidden="true" className="text-[#D4AF37]">·</span>
            <span>{config.venueName}</span>
          </div>
        </div>

        {/* Right Column: Luxury Couple Portrait */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            {/* Ambient luxury glow */}
            <div className="absolute -inset-3 bg-gradient-to-tr from-[#D4AF37]/20 to-[#E2C799]/10 rounded-3xl blur-xl pointer-events-none" />

            {/* Frame border */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#E8DEC8] shadow-xl bg-white p-2">
              <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                <img
                  src={config.photos[0]?.url}
                  alt={config.photos[0]?.alt || 'پرتره عروس و داماد'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 inset-x-4 text-center text-white">
                  <p className="font-calligraphy text-lg sm:text-xl drop-shadow-md">
                    {config.photos[0]?.caption || 'آغاز همسفری تا بی‌نهایت'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
