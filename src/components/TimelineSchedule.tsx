import React from 'react';
import {
  Clock,
  LogIn,
  HeartHandshake,
  Camera,
  UtensilsCrossed,
  Sparkles,
} from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { toPersianDigits } from '../utils/persianNumbers';

interface TimelineScheduleProps {
  schedule: WeddingConfig['schedule'];
}

export const TimelineSchedule: React.FC<TimelineScheduleProps> = ({ schedule }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'door-open':
        return <LogIn className="w-5 h-5" />;
      case 'ring':
        return <HeartHandshake className="w-5 h-5" />;
      case 'camera':
        return <Camera className="w-5 h-5" />;
      case 'utensils':
        return <UtensilsCrossed className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="schedule" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>برنامه زمان‌بندی جشن</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-calligraphy text-[#2C241E]">
          لحظات خاطره‌انگیز این شب رویایی
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7D6B5E]">
          جدول زمانی و رویدادهای اصلی مراسم جهت برنامه‌ریزی هرچه بهتر شما عزیزان
        </p>
      </div>

      <div className="relative border-r-2 border-[#E8DEC8] mr-4 sm:mr-8 space-y-8 pr-6 sm:pr-10">
        {schedule.map((item, index) => (
          <div key={item.title + index} className="relative group">
            {/* Timeline node icon */}
            <div className="absolute -right-[35px] sm:-right-[51px] top-1.5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FAF7F2] border-2 border-[#9A7432] text-[#9A7432] flex items-center justify-center shadow-sm group-hover:bg-[#9A7432] group-hover:text-white transition-colors duration-300">
              {getIcon(item.iconName)}
            </div>

            {/* Timeline content card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DEC8] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-base sm:text-lg font-bold text-[#2C241E]">
                  {item.title}
                </h3>
                <span className="text-xs font-semibold text-[#9A7432] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E8DEC8]">
                  {toPersianDigits(item.time)}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#6B5A4E] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
