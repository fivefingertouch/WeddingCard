import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart } from 'lucide-react';
import { calculateTimeRemaining, toPersianDigits } from '../utils/persianNumbers';

interface CountdownTimerProps {
  targetISODate: string;
  dateSolar: string;
  dateGregorian: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetISODate,
  dateSolar,
  dateGregorian,
}) => {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeRemaining(targetISODate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(targetISODate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetISODate]);

  const units = [
    { label: 'روز', value: timeLeft.days },
    { label: 'ساعت', value: timeLeft.hours },
    { label: 'دقیقه', value: timeLeft.minutes },
    { label: 'ثانیه', value: timeLeft.seconds },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-transparent via-[#F4ECE0]/50 to-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
          <Clock className="w-3.5 h-3.5" />
          <span>شمارش معکوس تا آغاز جشن وصال</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-calligraphy text-[#2C241E] mb-8">
          لحظه‌شماری برای به یادماندنی‌ترین شب زندگی‌مان
        </h3>

        {timeLeft.isPast ? (
          <div className="p-6 bg-white rounded-2xl border border-[#E8DEC8] shadow-sm max-w-md mx-auto">
            <Heart className="w-8 h-8 text-[#9A7432] fill-[#9A7432]/30 mx-auto mb-2" />
            <p className="font-calligraphy text-lg text-[#2C241E]">
              این پیوند آسمانی جاری گشت و آغازگر روزهایی سرشار از شادمانی شد!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E8DEC8] shadow-sm text-center transform transition-transform hover:-translate-y-0.5"
              >
                <div className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2C241E] tabular-nums leading-none mb-1">
                  {toPersianDigits(unit.value.toString().padStart(2, '0'))}
                </div>
                <span className="text-[11px] sm:text-xs text-[#7D6B5E] font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm text-[#7D6B5E]">
          <Calendar className="w-4 h-4 text-[#9A7432]" />
          <span>{dateSolar}</span>
          <span aria-hidden="true" className="text-[#D4AF37]">·</span>
          <span className="font-serif-luxury">{dateGregorian}</span>
        </div>
      </div>
    </section>
  );
};
