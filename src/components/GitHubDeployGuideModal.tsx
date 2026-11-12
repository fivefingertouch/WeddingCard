import React, { useState } from 'react';
import {
  X,
  Github,
  Globe,
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface GitHubDeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubDeployGuideModal: React.FC<GitHubDeployGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const githubWorkflowYaml = `name: Deploy Wedding Card to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build static site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;

  const gitCommands = `git init
git add .
git commit -m "کارت دعوت اختصاصی مراسم عقد"
git branch -M main
git remote add origin https://github.com/USERNAME/wedding-card.git
git push -u origin main`;

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch {
      //
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl border border-[#E8DEC8] shadow-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden text-[#2C241E]"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DEC8] flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white border border-[#E8DEC8] text-[#2C241E]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-calligraphy">
                راهنمای بارگذاری کارت دعوت روی GitHub Pages
              </h3>
              <p className="text-xs text-[#7D6B5E]">
                میزبانی کاملاً رایگان، پرسرعت، همیشگی و بدون قطعی با آدرس اختصاصی
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

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs leading-relaxed">
          {/* Why GitHub Pages box */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] flex items-start gap-3">
            <Globe className="w-5 h-5 text-[#9A7432] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#2C241E] text-sm mb-1">
                این کارت ۱۰۰٪ با GitHub Pages سازگار است!
              </h4>
              <p className="text-[#6B5A4E]">
                تمام فایل‌های برنامه به صورت استاتیک (HTML/JS/CSS) کامپایل می‌شوند و خواندن نام مهمان
                از طریق پارامترهای آدرس (مانند <code className="bg-white px-1.5 py-0.5 rounded border border-[#E8DEC8] font-mono" dir="ltr">?to=نام_مهمان</code>)
                بدون نیاز به هیچ دیتابیس یا سرور خاصی مستقیماً در مرورگر میهمان انجام می‌گیرد.
              </p>
            </div>
          </div>

          {/* Step 1: GitHub Repo */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
              <span className="w-5 h-5 rounded-full bg-[#9A7432] text-white flex items-center justify-center text-xs">
                ۱
              </span>
              <span>ایجاد مخزن (Repository) در گیت‌هاب</span>
            </div>
            <p className="text-[#6B5A4E] pr-7">
              وارد حساب کاربری خود در <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#9A7432] font-semibold underline">GitHub.com</a> شوید
              و یک مخزن جدید با نام دلخواه (مثلاً <code className="font-mono bg-[#FAF7F2] px-1 rounded">wedding-card</code>) به صورت Public ایجاد نمایید.
            </p>
          </div>

          {/* Step 2: Push code */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
              <span className="w-5 h-5 rounded-full bg-[#9A7432] text-white flex items-center justify-center text-xs">
                ۲
              </span>
              <span>دستورات ارسال کد به گیت‌هاب (Git Push)</span>
            </div>
            <div className="relative pr-7">
              <pre className="p-3.5 rounded-xl bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[11px] overflow-x-auto text-left" dir="ltr">
                {gitCommands}
              </pre>
              <button
                onClick={() => copyToClipboard(gitCommands, 1)}
                className="absolute top-2.5 right-9 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] transition-colors"
              >
                {copiedIndex === 1 ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 1 ? 'کپی شد' : 'کپی دستورات'}</span>
              </button>
            </div>
          </div>

          {/* Step 3: Enable Pages */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#2C241E]">
              <span className="w-5 h-5 rounded-full bg-[#9A7432] text-white flex items-center justify-center text-xs">
                ۳
              </span>
              <span>فعال‌سازی سرویس GitHub Pages</span>
            </div>
            <div className="pr-7 space-y-1.5 text-[#6B5A4E]">
              <p>در صفحه مخزن خود در گیت‌هاب:</p>
              <ol className="list-decimal list-inside space-y-1 mr-2">
                <li>وارد تب <strong>Settings</strong> شوید.</li>
                <li>از منوی کناری، گزینه <strong>Pages</strong> را انتخاب کنید.</li>
                <li>در بخش <strong>Build and deployment</strong>، گزینه <strong>Source</strong> را روی <strong>GitHub Actions</strong> قرار دهید.</li>
              </ol>
            </div>
          </div>

          {/* GitHub Actions workflow file */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#2C241E] pr-7">
              <span className="flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-[#9A7432]" />
                فایل ورک‌فلو خودکار (<code className="font-mono" dir="ltr">.github/workflows/deploy.yml</code>):
              </span>
              <button
                onClick={() => copyToClipboard(githubWorkflowYaml, 2)}
                className="inline-flex items-center gap-1 text-[11px] text-[#9A7432] hover:text-[#856327] font-semibold"
              >
                {copiedIndex === 2 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 2 ? 'کپی شد!' : 'کپی محتوای YAML'}</span>
              </button>
            </div>
            <div className="pr-7">
              <pre className="p-3.5 rounded-xl bg-[#1E1E1E] text-[#D4D4D4] font-mono text-[10px] max-h-48 overflow-y-auto text-left" dir="ltr">
                {githubWorkflowYaml}
              </pre>
            </div>
          </div>

          {/* Step 4: Final Link */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8]">
            <h4 className="font-bold text-[#2C241E] mb-1">
              🎉 آدرس نهایی کارت دعوت شما در اینترنت:
            </h4>
            <p className="text-[#6B5A4E] font-mono text-[11px]" dir="ltr">
              https://&lt;your-username&gt;.github.io/&lt;repository-name&gt;/?to=نام+مهمان
            </p>
            <p className="mt-2 text-[#7D6B5E] text-[11px]">
              می‌توانید با ابزار «ساخت لینک مهمانان» در بالای همین صفحه، این آدرس را وارد کنید و به راحتی برای تک‌تک فامیل و دوستان لینک‌های اختصاصی بفرستید!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
