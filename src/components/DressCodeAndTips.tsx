import React from 'react';
import { Palette, Info, CheckCircle2, PhoneCall } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';

interface DressCodeAndTipsProps {
  config: WeddingConfig;
}

export const DressCodeAndTips: React.FC<DressCodeAndTipsProps> = ({ config }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Dress Code Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
            <Palette className="w-4 h-4" />
            <span>{config.dressCodeTitle}</span>
          </div>
          <h3 className="text-xl font-bold font-calligraphy text-[#2C241E] mb-3">
            پالت رنگ و استایل پیشنهادی
          </h3>
          <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed mb-6">
            {config.dressCodeDescription}
          </p>

          {/* Color Palette Swatches */}
          <div>
            <p className="text-xs text-[#7D6B5E] mb-2.5 font-medium">
              طیف رنگ‌های متناسب برای عکاسی خاطره‌انگیز:
            </p>
            <div className="flex items-center gap-3">
              {config.dressCodeColors.map((color, index) => (
                <div key={color + index} className="text-center group">
                  <div
                    style={{ backgroundColor: color }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm ring-1 ring-[#E8DEC8] transform group-hover:scale-110 transition-transform"
                  />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-[#A69485] mt-3">
              * خواهشمند است حتی‌الامکان از پوشیدن لباس کاملاً سفید یا نباتی پررنگ به احترام عروس خانم پرهیز گردد.
            </p>
          </div>
        </div>

        {/* Guest Tips & Host Info Box */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
              <Info className="w-4 h-4" />
              <span>نکات و راهنمای میهمانان گرامی</span>
            </div>
            <h3 className="text-xl font-bold font-calligraphy text-[#2C241E] mb-4">
              اطلاعات تکمیلی جهت رفاه شما
            </h3>

            <div className="space-y-3 mb-6">
              {config.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5A4A3E]">
                  <CheckCircle2 className="w-4 h-4 text-[#9A7432] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          {config.contactPhone && (
            <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between text-xs text-[#7D6B5E]">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#9A7432]" />
                <span>شماره تماس هماهنگی و تشریفات:</span>
              </div>
              <a
                href={`tel:${config.contactPhone}`}
                className="font-mono font-semibold text-[#2C241E] hover:text-[#9A7432] transition-colors"
                dir="ltr"
              >
                {config.contactPhone}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
