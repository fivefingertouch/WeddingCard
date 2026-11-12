import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Smartphone,
  Users,
  FileSpreadsheet,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { toPersianDigits } from '../utils/persianNumbers';

interface GuestLinkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
}

export const GuestLinkGeneratorModal: React.FC<GuestLinkGeneratorModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  const [prefix, setPrefix] = useState('جناب آقای');
  const [guestName, setGuestName] = useState('علیرضا محمدی');
  const [copied, setCopied] = useState(false);
  const [copiedBatchIndex, setCopiedBatchIndex] = useState<number | null>(null);

  // Allow couple to customize the base domain (e.g. their GitHub Pages URL)
  const currentBaseUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}`
    : 'https://username.github.io/wedding-card/';
  const [customBaseUrl, setCustomBaseUrl] = useState(currentBaseUrl);

  // Batch generator input
  const [batchNamesText, setBatchNamesText] = useState(
    'خانواده محترم حسینی\nسرکار خانم دکتر کریمی\nجناب آقای مهندس احمدی\nسارا و آرش عزیز'
  );

  if (!isOpen) return null;

  const fullName = prefix === 'بدون پیشوند' ? guestName.trim() : `${prefix} ${guestName}`.trim();
  const encodedTo = encodeURIComponent(fullName);
  const singleGeneratedUrl = `${customBaseUrl.replace(/\/$/, '')}/?to=${encodedTo}`;

  const invitationShareText = `سلام و احترام خدمت ${fullName} گرامی 🌸\nبا کمال افتخار و شادمانی، شما را به جشن فرخنده عقد و آغاز زندگی مشترکمان دعوت می‌نماییم.\n\nکارت دعوت اختصاصی و اطلاعات مراسم:\n${singleGeneratedUrl}\n\nمشتاق دیدار و میزبانی از شما هستیم 🕊️\nبا مهر: ${config.brideName} و ${config.groomName}`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(invitationShareText)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(singleGeneratedUrl)}&text=${encodeURIComponent(`دعوت‌نامه اختصاصی مراسم عقد ${config.brideName} و ${config.groomName} برای ${fullName} گرامی 🌸`)}`;
  const smsUrl = `sms:?body=${encodeURIComponent(invitationShareText)}`;

  const handleCopySingle = async () => {
    try {
      await navigator.clipboard.writeText(singleGeneratedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Parse batch items
  const batchList = batchNamesText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((name) => {
      const url = `${customBaseUrl.replace(/\/$/, '')}/?to=${encodeURIComponent(name)}`;
      const text = `سلام و احترام خدمت ${name} گرامی 🌸\nبا کمال افتخار شما را به جشن عقد و پیوندمان دعوت می‌کنیم:\n${url}\n\nمنتظر حضور پرمهرتان هستیم 🕊️\n${config.brideName} و ${config.groomName}`;
      return {
        name,
        url,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
      };
    });

  const handleCopyBatchItem = async (url: string, index: number) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedBatchIndex(index);
      setTimeout(() => setCopiedBatchIndex(null), 2000);
    } catch {
      //
    }
  };

  const handleDownloadCsv = () => {
    const csvContent =
      'نام مهمان,لینک کارت دعوت اختصاصی\n' +
      batchList.map((item) => `"${item.name}","${item.url}"`).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Wedding-Guests-Links-${config.brideName}-${config.groomName}.csv`;
    link.click();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl border border-[#E8DEC8] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#2C241E]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-[#E8DEC8] text-[#9A7432]">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-calligraphy">
                ابزار هوشمند ساخت لینک اختصاصی مهمانان
              </h3>
              <p className="text-xs text-[#7D6B5E]">
                ایجاد لینک کارت دعوت با نام هر مهمان و اشتراک‌گذاری در واتساپ، تلگرام و پیامک
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7D6B5E] hover:text-[#2C241E] hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-[#E8DEC8] bg-[#F7F2EA] px-6 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('single')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'single'
                ? 'border-[#9A7432] text-[#9A7432]'
                : 'border-transparent text-[#7D6B5E] hover:text-[#2C241E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ساخت لینک تکی برای یک مهمان</span>
          </button>

          <button
            onClick={() => setActiveTab('batch')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'batch'
                ? 'border-[#9A7432] text-[#9A7432]'
                : 'border-transparent text-[#7D6B5E] hover:text-[#2C241E]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>ساخت گروهی برای تمام مهمانان</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Base URL (e.g. for GitHub Pages) */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-[#2C241E]">
                آدرس دامنه وب‌سایت کارت دعوت (GitHub Pages یا دامنه اختصاصی):
              </label>
              <span className="text-[11px] text-[#9A7432]">آدرس پایه لینک‌ها</span>
            </div>
            <input
              type="text"
              value={customBaseUrl}
              onChange={(e) => setCustomBaseUrl(e.target.value)}
              placeholder="https://yourname.github.io/wedding-card/"
              className="w-full px-3 py-2 rounded-lg border border-[#E8DEC8] bg-white text-xs font-mono text-[#2C241E] focus:outline-none focus:ring-1 focus:ring-[#9A7432]"
              dir="ltr"
            />
          </div>

          {activeTab === 'single' ? (
            <div className="space-y-5">
              {/* Name and Prefix Form */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-medium text-[#7D6B5E] mb-1">
                    پیشوند احترام:
                  </label>
                  <select
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium text-[#2C241E]"
                  >
                    <option value="جناب آقای">جناب آقای</option>
                    <option value="سرکار خانم">سرکار خانم</option>
                    <option value="خانواده محترم">خانواده محترم</option>
                    <option value="دوست عزیزم">دوست عزیزم</option>
                    <option value="همکار گرامی">همکار گرامی</option>
                    <option value="عزیز دلم">عزیز دلم</option>
                    <option value="بدون پیشوند">بدون پیشوند (فقط نام)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-[#7D6B5E] mb-1">
                    نام میهمان مدنظر:
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="مثال: دکتر علیرضا کاظمی یا سارا و نوید"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-semibold text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#9A7432]/40"
                  />
                </div>
              </div>

              {/* Generated Link Display */}
              <div className="p-4 rounded-xl bg-white border-2 border-dashed border-[#DFCFAF] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#9A7432]">
                    لینک تولید شده برای «{fullName}»:
                  </span>
                  <a
                    href={singleGeneratedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#7D6B5E] hover:text-[#9A7432]"
                  >
                    <span>پیش‌نمایش کارت</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={singleGeneratedUrl}
                    className="flex-1 px-3 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DEC8] text-xs font-mono text-[#5A4A3E] select-all"
                    dir="ltr"
                  />
                  <button
                    onClick={handleCopySingle}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                      copied
                        ? 'bg-[#3A754E] text-white'
                        : 'bg-[#9A7432] hover:bg-[#856327] text-white'
                    }`}
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'کپی شد!' : 'کپی لینک'}</span>
                  </button>
                </div>
              </div>

              {/* Direct Instant Share Buttons */}
              <div>
                <p className="text-xs font-semibold text-[#2C241E] mb-2.5">
                  ارسال سریع دعوت‌نامه همراه با متن آماده تبریک:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-xs font-semibold text-[#128C7E] transition-all hover:scale-[1.01]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>ارسال در واتساپ</span>
                  </a>

                  <a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#229ED9]/10 hover:bg-[#229ED9]/20 border border-[#229ED9]/30 text-xs font-semibold text-[#0088cc] transition-all hover:scale-[1.01]"
                  >
                    <Send className="w-4 h-4 text-[#229ED9]" />
                    <span>ارسال در تلگرام</span>
                  </a>

                  <a
                    href={smsUrl}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#E8DEC8] text-xs font-semibold text-[#2C241E] transition-all hover:scale-[1.01]"
                  >
                    <Smartphone className="w-4 h-4 text-[#9A7432]" />
                    <span>ارسال پیامک (SMS)</span>
                  </a>
                </div>
              </div>

              {/* Message preview previewer */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E8DEC8] text-[11px] text-[#6B5A4E] leading-relaxed">
                <span className="font-semibold block text-[#2C241E] mb-1">
                  پیش‌نمایش متن ارسالی در پیام‌رسان‌ها:
                </span>
                <p className="whitespace-pre-line">{invitationShareText}</p>
              </div>
            </div>
          ) : (
            /* Batch Mode */
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#2C241E]">
                    فهرست نام میهمانان (هر نام در یک سطر):
                  </label>
                  <span className="text-xs text-[#9A7432]">
                    {toPersianDigits(batchList.length)} مهمان آماده
                  </span>
                </div>
                <textarea
                  rows={4}
                  value={batchNamesText}
                  onChange={(e) => setBatchNamesText(e.target.value)}
                  placeholder="خانواده محترم کاظمی&#10;سرکار خانم سمیعی&#10;جناب آقای دکتر راد"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium text-[#2C241E] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#9A7432]"
                />
              </div>

              {/* Batch Action Bar */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#7D6B5E]">
                  لینک‌های اختصاصی تولید شده برای هر نفر:
                </span>
                <button
                  onClick={handleDownloadCsv}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E8DEC8] bg-white hover:bg-[#FAF7F2] text-xs font-medium text-[#2C241E] transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#3A754E]" />
                  <span>دانلود فایل اکسل / CSV</span>
                </button>
              </div>

              {/* Batch items table */}
              <div className="border border-[#E8DEC8] rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-xs text-right">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DEC8] text-[#7D6B5E]">
                    <tr>
                      <th className="py-2.5 px-3">نام مهمان</th>
                      <th className="py-2.5 px-3">عملیات ارسال و کپی</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE1]">
                    {batchList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#FAF7F2]/60">
                        <td className="py-2.5 px-3 font-semibold text-[#2C241E]">
                          {item.name}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyBatchItem(item.url, idx)}
                              className={`p-1.5 rounded-md text-[11px] font-medium border flex items-center gap-1 transition-all ${
                                copiedBatchIndex === idx
                                  ? 'bg-[#3A754E] text-white border-[#3A754E]'
                                  : 'bg-white hover:bg-[#FAF7F2] border-[#E8DEC8] text-[#2C241E]'
                              }`}
                            >
                              {copiedBatchIndex === idx ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                              <span>{copiedBatchIndex === idx ? 'کپی شد' : 'کپی لینک'}</span>
                            </button>

                            <a
                              href={item.whatsapp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md text-[11px] font-medium bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] flex items-center gap-1 border border-[#25D366]/30"
                            >
                              <MessageCircle className="w-3 h-3 text-[#25D366]" />
                              <span>واتساپ</span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
