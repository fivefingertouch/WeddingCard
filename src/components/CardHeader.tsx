import React from 'react';
import { Share2, Settings, Github, Music, VolumeX, Volume2 } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface CardHeaderProps {
  config: WeddingConfig;
  onOpenGuestModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenGithubGuide: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  config,
  onOpenGuestModal,
  onOpenSettingsModal,
  onOpenGithubGuide,
  isPlayingMusic,
  onToggleMusic,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] px-4 sm:px-8 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="text-base sm:text-lg font-bold tracking-tight text-[#2C241E] whitespace-nowrap shrink-0 font-calligraphy hover:text-[#9A7432] transition-colors"
        >
          پیوند {config.brideName} و {config.groomName}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#6B5A4E]">
          <a
            href="#details"
            className="hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0"
          >
            مشخصات مراسم
          </a>
          <a
            href="#schedule"
            className="hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0"
          >
            برنامه زمان‌بندی
          </a>
          <a
            href="#venue"
            className="hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0"
          >
            آدرس و مسیریابی
          </a>
          <a
            href="#gallery"
            className="hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0"
          >
            آلبوم خاطرات
          </a>
          <a
            href="#rsvp"
            className="hover:text-[#9A7432] transition-colors whitespace-nowrap shrink-0"
          >
            اعلام حضور (RSVP)
          </a>
        </nav>

        {/* Zone 3: 1 primary action button + utility controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'توقف موسیقی' : 'پخش موسیقی'}
            className="p-2 rounded-full text-[#6B5A4E] hover:text-[#9A7432] hover:bg-[#F2ECE1] transition-colors"
            aria-label="پخش یا توقف موسیقی"
          >
            {isPlayingMusic ? (
              <Volume2 className="w-4 h-4 text-[#9A7432] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* GitHub Pages deployment guide button */}
          <button
            onClick={onOpenGithubGuide}
            title="راهنمای قرار دادن روی گیت‌هاب"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#6B5A4E] hover:text-[#2C241E] bg-[#F2ECE1] hover:bg-[#EAE2D4] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Github className="w-3.5 h-3.5" />
            <span>نصب در گیت‌هاب</span>
          </button>

          {/* Settings modal trigger */}
          <button
            onClick={onOpenSettingsModal}
            title="ویرایش اطلاعات کارت دعوت"
            className="p-2 rounded-full text-[#6B5A4E] hover:text-[#9A7432] hover:bg-[#F2ECE1] transition-colors"
            aria-label="تنظیمات کارت"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary Action Button: Link Generator */}
          <button
            onClick={onOpenGuestModal}
            className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-[#9A7432] hover:bg-[#856327] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>ساخت لینک مهمانان</span>
          </button>
        </div>
      </div>
    </header>
  );
};
