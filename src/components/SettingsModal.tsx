import React, { useState } from 'react';
import { X, Settings, Save, RotateCcw, Download, Check } from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { WEDDING_THEMES, INITIAL_WEDDING_CONFIG } from '../data/defaultConfig';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: WeddingConfig;
  onSave: (newConfig: WeddingConfig) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (field: keyof WeddingConfig, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm('آیا مایلید تمام تنظیمات به حالت اولیه بازگردد؟')) {
      setFormData({ ...INITIAL_WEDDING_CONFIG });
      onSave(INITIAL_WEDDING_CONFIG);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'wedding-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-calligraphy">
                شخصی‌سازی مشخصات کارت دعوت
              </h3>
              <p className="text-xs text-[#7D6B5E]">
                ویرایش نام عروس و داماد، تاریخ، نشانی تالار، تم رنگی و شعر
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

        {/* Form Body */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">نام عروس:</label>
              <input
                type="text"
                value={formData.brideName}
                onChange={(e) => handleChange('brideName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">نام داماد:</label>
              <input
                type="text"
                value={formData.groomName}
                onChange={(e) => handleChange('groomName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
                required
              />
            </div>
          </div>

          {/* Families */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">خانواده عروس:</label>
              <input
                type="text"
                value={formData.brideFamily}
                onChange={(e) => handleChange('brideFamily', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">خانواده داماد:</label>
              <input
                type="text"
                value={formData.groomFamily}
                onChange={(e) => handleChange('groomFamily', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">تاریخ شمسی:</label>
              <input
                type="text"
                value={formData.dateSolar}
                onChange={(e) => handleChange('dateSolar', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">تاریخ میلادی:</label>
              <input
                type="text"
                value={formData.dateGregorian}
                onChange={(e) => handleChange('dateGregorian', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">ساعت مراسم:</label>
              <input
                type="text"
                value={formData.timeRange}
                onChange={(e) => handleChange('timeRange', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
          </div>

          {/* Venue */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">نام تالار یا عمارت:</label>
              <input
                type="text"
                value={formData.venueName}
                onChange={(e) => handleChange('venueName', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">آدرس کامل:</label>
              <textarea
                rows={2}
                value={formData.venueAddress}
                onChange={(e) => handleChange('venueAddress', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
          </div>

          {/* Navigation URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">لینک نشان (Neshan):</label>
              <input
                type="text"
                value={formData.neshanUrl}
                onChange={(e) => handleChange('neshanUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-mono"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">لینک بلد (Balad):</label>
              <input
                type="text"
                value={formData.baladUrl}
                onChange={(e) => handleChange('baladUrl', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-mono"
                dir="ltr"
              />
            </div>
          </div>

          {/* Poem & Message */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">شعر کارت دعوت:</label>
              <textarea
                rows={2}
                value={formData.poem}
                onChange={(e) => handleChange('poem', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-calligraphy text-base"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2C241E] mb-1">شاعر یا منبع:</label>
              <input
                type="text"
                value={formData.poemPoet}
                onChange={(e) => handleChange('poemPoet', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E8DEC8] bg-[#FAF7F2] text-xs font-medium"
              />
            </div>
          </div>

          {/* Theme selection */}
          <div>
            <label className="block text-xs font-semibold text-[#2C241E] mb-2">تم رنگی کارت:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(WEDDING_THEMES).map((theme) => (
                <button
                  type="button"
                  key={theme.id}
                  onClick={() => handleChange('themeId', theme.id)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    formData.themeId === theme.id
                      ? 'border-[#9A7432] bg-[#FAF7F2] shadow-xs ring-1 ring-[#9A7432]'
                      : 'border-[#E8DEC8] bg-white hover:bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-1.5">
                    <span
                      style={{ backgroundColor: theme.primary }}
                      className="w-4 h-4 rounded-full border border-black/10"
                    />
                    <span
                      style={{ backgroundColor: theme.accent }}
                      className="w-4 h-4 rounded-full border border-black/10"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#2C241E] block">
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#E8DEC8] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[#7D6B5E] hover:text-[#2C241E] hover:bg-[#FAF7F2] rounded-lg transition-colors border border-transparent hover:border-[#E8DEC8]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>بازنشانی پیش‌فرض</span>
              </button>

              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs text-[#7D6B5E] hover:text-[#2C241E] hover:bg-[#FAF7F2] rounded-lg transition-colors border border-transparent hover:border-[#E8DEC8]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>دانلود JSON</span>
              </button>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#9A7432] hover:bg-[#856327] transition-all shadow-sm"
            >
              {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedSuccess ? 'ذخیره گردید!' : 'ذخیره تغییرات'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
