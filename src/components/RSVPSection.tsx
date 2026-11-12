import React, { useState } from 'react';
import {
  Heart,
  Send,
  UserCheck,
  UserX,
  Users,
  MessageSquareHeart,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { RSVPResponse } from '../types/wedding';
import { fireCenterSparkles } from '../utils/confetti';
import { toPersianDigits } from '../utils/persianNumbers';

interface RSVPSectionProps {
  initialGuestName: string;
  rsvps: RSVPResponse[];
  onAddRsvp: (newRsvp: RSVPResponse) => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  initialGuestName,
  rsvps,
  onAddRsvp,
}) => {
  const [name, setName] = useState(initialGuestName || '');
  const [status, setStatus] = useState<'attending' | 'declined'>('attending');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newResponse: RSVPResponse = {
      id: `rsvp-${Date.now()}`,
      guestName: name.trim(),
      status,
      adultsCount: status === 'attending' ? adults : 0,
      childrenCount: status === 'attending' ? children : 0,
      message: message.trim(),
      submittedAt: 'همین الان',
    };

    onAddRsvp(newResponse);
    fireCenterSparkles();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9A7432] uppercase tracking-wider mb-2">
          <MessageSquareHeart className="w-3.5 h-3.5" />
          <span>اعلام حضور و پیام شادباش</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-calligraphy text-[#2C241E]">
          با حضورتان محفل ما را روشن کنید
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#7D6B5E]">
          لطفاً جهت هماهنگی و برنامه‌ریزی هرچه شایسته‌تر، پاسخ خود را تا پیش از مراسم ثبت بفرمایید
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: RSVP Form */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DEC8] shadow-sm">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] text-[#9A7432] border border-[#E8DEC8] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-calligraphy text-[#2C241E]">
                پاسخ شما با موفقیت ثبت شد
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5A4E] max-w-md mx-auto leading-relaxed">
                از اعلام حضور و پیام پرمهرتان بسیار سپاسگزاریم. با افتخار چشم‌انتظار دیدار شما در این
                شب باشکوه هستیم.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs text-[#9A7432] border border-[#E8DEC8] rounded-lg hover:bg-[#FAF7F2] transition-colors"
              >
                ثبت پیام یا ویرایش مجدد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Guest Name */}
              <div>
                <label className="block text-xs font-semibold text-[#2C241E] mb-1.5">
                  نام و نام خانوادگی میهمان:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: خانواده محترم رضایی یا علیرضا حسینی"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#9A7432]/40"
                />
              </div>

              {/* Status selection */}
              <div>
                <label className="block text-xs font-semibold text-[#2C241E] mb-2">
                  وضعیت حضور شما:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('attending')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      status === 'attending'
                        ? 'border-[#9A7432] bg-[#FAF7F2] text-[#9A7432] shadow-xs'
                        : 'border-[#E8DEC8] bg-white text-[#7D6B5E] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>با کمال میل حضور می‌یابم 🌸</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('declined')}
                    className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      status === 'declined'
                        ? 'border-[#9A7432] bg-[#FAF7F2] text-[#9A7432] shadow-xs'
                        : 'border-[#E8DEC8] bg-white text-[#7D6B5E] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <UserX className="w-4 h-4" />
                    <span>متاسفانه امکان حضور ندارم 🕊️</span>
                  </button>
                </div>
              </div>

              {/* Companions Count (Only if attending) */}
              {status === 'attending' && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
                  <div>
                    <label className="block text-[11px] font-medium text-[#7D6B5E] mb-1">
                      تعداد بزرگسالان:
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8DEC8] bg-white text-xs font-medium text-[#2C241E]"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>
                          {toPersianDigits(n)} نفر
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#7D6B5E] mb-1">
                      تعداد کودکان:
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-[#E8DEC8] bg-white text-xs font-medium text-[#2C241E]"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n === 0 ? 'بدون کودک' : `${toPersianDigits(n)} کودک`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Heartfelt message */}
              <div>
                <label className="block text-xs font-semibold text-[#2C241E] mb-1.5">
                  پیام تبریک و آرزو برای عروس و داماد:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="آرزوی قشنگ یا پیام پرمهرتان را اینجا بنویسید..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-sm text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#9A7432]/40"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#9A7432] hover:bg-[#856327] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>ثبت نهایی و ارسال پیام</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Guest Well-Wishes Wall */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-bold text-[#2C241E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#9A7432]" />
              دیوار تبریک و آرزوهای میهمانان
            </h3>
            <span className="text-xs text-[#7D6B5E] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E8DEC8]">
              {toPersianDigits(rsvps.length)} پیام ثبت شده
            </span>
          </div>

          <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
            {rsvps.map((rsvp) => (
              <div
                key={rsvp.id}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-[#E8DEC8] shadow-xs hover:border-[#D4AF37] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E8DEC8] text-[#9A7432] flex items-center justify-center text-xs font-bold">
                      <Heart className="w-3.5 h-3.5 fill-[#9A7432]/20" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-[#2C241E]">
                      {rsvp.guestName}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#A69485]">
                    {rsvp.submittedAt}
                  </span>
                </div>

                {rsvp.message && (
                  <p className="text-xs sm:text-sm text-[#5A4A3E] leading-relaxed font-calligraphy pt-1">
                    « {rsvp.message} »
                  </p>
                )}

                <div className="mt-3 pt-2 border-t border-[#F2ECE1] flex items-center justify-between text-[11px] text-[#8C7B6E]">
                  <span>
                    {rsvp.status === 'attending' ? (
                      <span className="text-[#3A754E] font-medium">
                        ✓ حضور با {toPersianDigits(rsvp.adultsCount)} بزرگسال
                        {rsvp.childrenCount > 0 && ` و ${toPersianDigits(rsvp.childrenCount)} کودک`}
                      </span>
                    ) : (
                      <span className="text-[#8C6D46]">پیام شادباش و عذرخواهی</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
