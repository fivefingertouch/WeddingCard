import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Volume2, ArrowDown } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { WEDDING_THEMES } from '../data/defaultConfig';
import { fireEnvelopeRevealConfetti } from '../utils/confetti';
import { romanticPlayer } from '../utils/audioPlayer';

interface EnvelopeHeroProps {
  config: WeddingConfig;
  guestName: string;
  onOpen: () => void;
  isOpen: boolean;
}

export const EnvelopeHero: React.FC<EnvelopeHeroProps> = ({
  config,
  guestName,
  onOpen,
  isOpen,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = WEDDING_THEMES[config.themeId] || WEDDING_THEMES['royal-gold'];

  const handleOpenClick = () => {
    fireEnvelopeRevealConfetti();
    romanticPlayer.play();
    onOpen();
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-[#1F1916]">
      {/* Luxury atmospheric background with warm ambient light pools */}
      <div className="absolute inset-0 bg-radial from-[#3A2D23]/60 via-[#1F1916] to-[#120E0C] pointer-events-none" />

      {/* Floating starry dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#E2C799]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      </div>

      <AnimatePresence>
        {!isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -40, filter: 'blur(8px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg"
          >
            {/* Top decorative badge */}
            <div className="text-center mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-[#E2C799] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                کارت دعوت اختصاصی مراسم عقد
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-calligraphy text-[#FAF7F2] font-normal">
                {config.brideName} & {config.groomName}
              </h1>
            </div>

            {/* The Luxury Envelope Card Container */}
            <div
              onClick={handleOpenClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group cursor-pointer relative bg-gradient-to-b from-[#FBF8F3] to-[#F3EDE2] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E5DAC6] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)] hover:-translate-y-1"
            >
              {/* Inner golden hairline ornamental border */}
              <div className="absolute inset-2 sm:inset-3 border border-[#E0D3BC] rounded-xl pointer-events-none" />
              <div className="absolute inset-3 sm:inset-4 border border-[#EFE5D4] rounded-lg pointer-events-none" />

              {/* Envelope flap visual geometry (isometric folds) */}
              <div className="relative pt-4 pb-2 text-center">
                {/* Traditional Bismillah / Invocation */}
                <p className="font-calligraphy text-base sm:text-lg text-[#8C6D46] mb-3">
                  به نام پیوند‌دهنده دل‌ها
                </p>

                {/* Personalized Guest Badge */}
                <div className="my-6 py-4 px-5 bg-gradient-to-r from-transparent via-[#EFE7D8]/80 to-transparent border-y border-[#DFCFAF]">
                  <p className="text-xs text-[#7B6E65] font-light mb-1">
                    با نهایت احترام و افتخار تقدیم به:
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold text-[#2D2118] font-calligraphy">
                    {guestName || 'میهمان گرانقدر و ارجمند'}
                  </p>
                </div>

                {/* Couple monogram seal */}
                <div className="relative my-7 flex flex-col items-center justify-center">
                  <div className="relative group-hover:scale-105 transition-transform duration-300">
                    {/* Wax seal ring */}
                    <div
                      style={{ backgroundColor: theme.waxColor }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex items-center justify-center border-4 border-[#FDFBF7]/40 ring-2 ring-black/10 relative overflow-hidden"
                    >
                      {/* Wax organic texture gloss */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />
                      <div className="text-center text-[#F5E6CC] z-10">
                        <Heart className="w-5 h-5 mx-auto mb-1 fill-[#F5E6CC] opacity-90" />
                        <span className="font-serif-luxury text-sm font-bold tracking-wider">
                          N & A
                        </span>
                      </div>
                    </div>

                    {/* Seal golden shimmer highlight */}
                    <div className="absolute -inset-1 rounded-full border border-[#D4AF37]/50 animate-ping opacity-25 pointer-events-none" />
                  </div>

                  <p className="mt-4 text-xs font-medium text-[#8F7968]">
                    مهر و موم وصال
                  </p>
                </div>

                {/* Date & Location kicker preview */}
                <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-[#6E5D52] mt-4 font-light">
                  <span>{config.dateSolar}</span>
                  <span aria-hidden="true" className="text-[#C5A265]">·</span>
                  <span>{config.venueName}</span>
                </div>

                {/* Interactive Action Prompt */}
                <div className="mt-7 pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-[#1C1613] bg-gradient-to-r from-[#DFB876] via-[#F2D79E] to-[#DFB876] shadow-md hover:shadow-lg transition-all transform active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-[#8C6D46]" />
                    <span>برای گشودن دعوت‌نامه لمس کنید</span>
                  </button>
                  <p className="text-[11px] text-[#A69485] mt-2 flex items-center justify-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    همراه با نوای دلنشین موسیقی
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Skip Button */}
            <div className="text-center mt-4">
              <button
                onClick={handleOpenClick}
                className="text-xs text-[#C5B5A5] hover:text-white transition-colors underline underline-offset-4"
              >
                مشاهده مستقیم مشخصات جشن
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
