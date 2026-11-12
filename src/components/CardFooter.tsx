import React from 'react';
import { Heart, Sparkles, MailOpen } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface CardFooterProps {
  config: WeddingConfig;
  onReopenEnvelope: () => void;
  onOpenGuestModal: () => void;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  config,
  onReopenEnvelope,
  onOpenGuestModal,
}) => {
  return (
    <footer className="mt-20 border-t border-[#E8DEC8] bg-[#F7F2EA] py-14 px-4 sm:px-6 text-center text-[#7D6B5E]">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-center gap-2 text-[#9A7432]">
          <Sparkles className="w-4 h-4" />
          <Heart className="w-5 h-5 fill-[#9A7432]/30" />
          <Sparkles className="w-4 h-4" />
        </div>

        <p className="font-calligraphy text-2xl sm:text-3xl text-[#2C241E]">
          مشتاقانه چشم‌انتظار قدوم پرمهرتان هستیم
        </p>

        <p className="text-xs sm:text-sm text-[#6B5A4E] max-w-lg mx-auto leading-relaxed">
          حضور پر از صفا و مهر شما، زیباترین هدیه‌ای است که در آغاز این سفر مشترک می‌توانیم دریافت کنیم.
        </p>

        <div className="pt-2 font-serif-luxury text-lg text-[#9A7432] font-semibold">
          {config.brideName} & {config.groomName}
        </div>

        {/* Action buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
          <button
            onClick={onReopenEnvelope}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E8DEC8] text-[#2C241E] hover:bg-[#FAF7F2] transition-colors"
          >
            <MailOpen className="w-3.5 h-3.5 text-[#9A7432]" />
            <span>مشاهده مجدد پاکت دعوت‌نامه</span>
          </button>

          <button
            onClick={onOpenGuestModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#9A7432] text-white hover:bg-[#856327] transition-colors font-semibold"
          >
            <span>ساخت لینک اختصاصی برای مهمانان</span>
          </button>
        </div>

        <div className="pt-8 border-t border-[#E8DEC8]/60 text-[11px] text-[#A69485] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>کارت دعوت دیجیتال هوشمند و اختصاصی مراسم عقد</span>
          <span>طراحی شده برای میزبانی آسان و رایگان روی GitHub Pages</span>
        </div>
      </div>
    </footer>
  );
};
