import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Share2,
  Sparkles,
  ArrowDown,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react';
import { WeddingConfig } from '../types/wedding';
import { romanticPlayer } from '../utils/audioPlayer';
import { fireEnvelopeRevealConfetti } from '../utils/confetti';
import { toPersianDigits } from '../utils/persianNumbers';
import cinematicBg from '../assets/images/melika_milad_cinematic_bg_1794475569505.jpg';

interface CinematicVideoCardProps {
  config: WeddingConfig;
  guestName: string;
  onOpenDetails: () => void;
  onOpenShareModal: () => void;
}

export const CinematicVideoCard: React.FC<CinematicVideoCardProps> = ({
  config,
  guestName,
  onOpenDetails,
  onOpenShareModal,
}) => {
  // Video playback timeline (0 to 9.5 seconds)
  const DURATION = 9.5;
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Parallax mouse coordinates
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation timeline loop
  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const delta = (now - lastTimestamp) / 1000;
      lastTimestamp = now;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= DURATION) {
            return 0; // Seamless loop!
          }
          return next;
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Audio sync
  useEffect(() => {
    if (isPlaying && !isMuted) {
      romanticPlayer.play();
    } else {
      romanticPlayer.pause();
    }
  }, [isPlaying, isMuted]);

  // Canvas Golden Dust & Soft Bokeh Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 360;
    let height = 640;

    const updateDims = () => {
      if (!canvas || !canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth || 360;
      const h = canvas.parentElement.clientHeight || Math.round(w * (16 / 9));
      width = canvas.width = w;
      height = canvas.height = h;
    };
    updateDims();

    const handleResize = () => {
      updateDims();
    };
    window.addEventListener('resize', handleResize);

    // Particles array (small gold dust + large soft bokeh orbs)
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      pulseSpeed: number;
      isBokeh: boolean;
    }

    const particles: Particle[] = [];
    const count = 38;

    for (let i = 0; i < count; i++) {
      const isBokeh = i < 7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isBokeh ? Math.random() * 26 + 14 : Math.random() * 2.2 + 0.8,
        speedY: isBokeh ? Math.random() * 0.25 + 0.1 : Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: isBokeh ? Math.random() * 0.18 + 0.08 : Math.random() * 0.6 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        isBokeh,
      });
    }

    let pFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(t + p.radius) * 0.3 + p.speedX;

        // Loop from bottom
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        const currentOpacity = p.opacity * (0.8 + 0.2 * Math.sin(t * p.pulseSpeed * 100));

        if (p.isBokeh) {
          // Soft golden-champagne bokeh glow
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `rgba(226, 199, 153, ${currentOpacity * 1.5})`);
          grad.addColorStop(0.6, `rgba(216, 178, 110, ${currentOpacity * 0.6})`);
          grad.addColorStop(1, 'rgba(216, 178, 110, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sharp gold glitter mote
          ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      pFrameId = requestAnimationFrame(render);
    };

    pFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(pFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      try {
        if (containerRef.current && containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {});
        }
      } catch {
        // Fallback to CSS theater mode
      }
    } else {
      setIsFullscreen(false);
      try {
        if (document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      } catch {
        //
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Timeline triggers (Cinematic reveal moments)
  const isTitleVisible = currentTime >= 0.6;
  const isGuestVisible = currentTime >= 1.4;
  const isNamesVisible = currentTime >= 2.2;
  const isDateVisible = currentTime >= 3.6;
  const isVenueVisible = currentTime >= 4.6;
  const isClosingVisible = currentTime >= 5.8;

  // Camera Dolly-in progress (scale: 1.0 -> 1.05)
  const cameraScale = 1.0 + (currentTime / DURATION) * 0.05;

  return (
    <div className="relative w-full py-6 sm:py-10 flex flex-col items-center justify-center">
      {/* Top Section Header */}
      <div className="text-center mb-6 max-w-xl px-4">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#9A7432] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          ویدیو کارت دعوت سینمایی عمودی (۹:۱۶)
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </span>
        <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#2C241E] font-sans">
          پیوند عاشقانه {config.brideName} و {config.groomName}
        </h2>
        <p className="mt-1 text-xs text-[#7D6B5E] font-sans">
          طراحی شده بر مبنای استاندارد استوری و ریلز برای اشتراک‌گذاری در اینستاگرام، واتساپ و تلگرام
        </p>
      </div>

      {/* 9:16 Video Frame Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`select-none transition-all duration-300 ${
          isFullscreen
            ? 'fixed inset-0 z-50 w-screen h-screen bg-black/95 flex items-center justify-center p-2 sm:p-6'
            : 'relative w-full max-w-[375px] sm:max-w-[390px] aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(44,36,30,0.22)] border-[3px] border-[#E8DEC8] bg-[#FAF7F2]'
        }`}
      >
        {/* Inner 9:16 content box for fullscreen centering */}
        <div className={`relative w-full h-full overflow-hidden ${isFullscreen ? 'max-w-[420px] max-h-[92vh] aspect-[9/16] rounded-2xl shadow-2xl border border-[#E8DEC8]/40' : ''}`}>
        {/* Layer 1: Background Image with Slow Dolly-in Zoom & Parallax */}
        <div
          style={{
            transform: `scale(${cameraScale}) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={cinematicBg}
            alt="Cinematic background for Melika and Milad"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Layer 2: Subtle Ambient Vignette & Scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2C241E]/15 via-transparent to-[#2C241E]/30 pointer-events-none" />

        {/* Layer 3: Floating Golden Particles & Soft Bokeh Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Layer 4: Diagonal Soft Light Sheen Sweep (عبور نور ملایم) */}
        <div
          key={Math.floor(currentTime / 4.5)}
          className="absolute inset-0 pointer-events-none z-15 opacity-30 mix-blend-overlay overflow-hidden"
        >
          <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-25 -translate-x-full animate-[shimmerGold_4s_infinite]" />
        </div>

        {/* Layer 5: Typography Content Overlay (Clean Modern Sans-Serif, NO Nastaliq!) */}
        <div
          style={{
            transform: `translate(${mousePos.x * 6}px, ${mousePos.y * 6}px)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-8 text-center text-[#2C241E] font-sans"
        >
          {/* Top Zone: Title & Ceremony Type */}
          <div className="pt-4">
            <AnimatePresence>
              {isTitleVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-1.5"
                >
                  <p className="text-[11px] font-medium tracking-[0.25em] text-[#8C6D46] uppercase">
                    IN THE NAME OF LOVE
                  </p>
                  <p className="text-xs font-semibold text-[#5A4A3E] tracking-wider">
                    به نام پیوند‌دهنده دل‌ها
                  </p>
                  <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-[#C5A265] to-transparent mx-auto mt-2" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Personalized Guest Badge */}
            <AnimatePresence>
              {isGuestVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0, delay: 0.2 }}
                  className="mt-6 py-2 px-4 rounded-full bg-white/80 backdrop-blur-xs border border-[#E8DEC8] inline-block shadow-xs"
                >
                  <p className="text-[11px] font-medium text-[#7D6B5E]">
                    با نهایت احترام و شادمانی تقدیم به:
                  </p>
                  <p className="text-sm font-bold text-[#2C241E] font-sans mt-0.5">
                    {guestName || 'میهمان گرانقدر و ارجمند'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Center Zone: Couple Names in Modern Pure Sans-Serif with Golden Aura */}
          <div className="my-auto py-2">
            <AnimatePresence>
              {isNamesVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Subtle pulsing golden halo / aura behind the names */}
                  <div className="absolute inset-0 -m-4 bg-gradient-to-tr from-[#D4AF37]/15 via-[#F3E5AB]/25 to-transparent rounded-full blur-xl animate-pulse pointer-events-none" />

                  <p className="text-[11px] font-semibold tracking-widest text-[#9A7432] uppercase mb-2">
                    جشن فرخنده عقد و آغاز زندگی مشترک
                  </p>

                  {/* Clean Modern Sans-Serif Names */}
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1E1813] font-sans">
                    {config.brideName}
                  </h1>

                  <div className="flex items-center justify-center gap-3 my-2 text-[#C5A265]">
                    <span className="w-8 h-[1px] bg-[#DFCFAF]" />
                    <span className="font-sans font-light text-base tracking-widest uppercase">
                      AND
                    </span>
                    <span className="w-8 h-[1px] bg-[#DFCFAF]" />
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#1E1813] font-sans">
                    {config.groomName}
                  </h1>

                  <p className="text-[11px] font-medium text-[#7D6B5E] tracking-widest uppercase mt-3">
                    MELIKA & MILAD
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Zone: Date, Time & Venue */}
          <div className="pb-4 space-y-3">
            <AnimatePresence>
              {isDateVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }}
                  className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2C241E]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#9A7432]" />
                  <span>{config.dateSolar}</span>
                  <span className="text-[#C5A265]">·</span>
                  <Clock className="w-3.5 h-3.5 text-[#9A7432]" />
                  <span>{toPersianDigits('18:30')} الی {toPersianDigits('23:00')}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVenueVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.2 }}
                  className="text-xs text-[#5A4A3E] font-medium flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#9A7432] shrink-0" />
                  <span>{config.venueName} · {config.city}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isClosingVisible && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.0 }}
                  className="text-[11px] text-[#7D6B5E] font-medium pt-1"
                >
                  مشتاقانه چشم‌انتظار قدوم پرمهرتان هستیم
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-3 pt-6 flex flex-col gap-2 opacity-90 hover:opacity-100 transition-opacity">
          {/* Progress Timeline bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.max(0, Math.min(DURATION, pos * DURATION)));
            }}
            className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer relative overflow-hidden group"
          >
            <div
              style={{ width: `${(currentTime / DURATION) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#DFB876] to-[#F2D79E] transition-all duration-75"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1 hover:text-[#E2C799] transition-colors"
                title={isPlaying ? 'توقف' : 'پخش'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>

              <button
                onClick={() => setCurrentTime(0)}
                className="p-1 hover:text-[#E2C799] transition-colors"
                title="شروع مجدد"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 hover:text-[#E2C799] transition-colors"
                title={isMuted ? 'پخش صدا' : 'قطع صدا'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-white/70" /> : <Volume2 className="w-4 h-4 text-[#E2C799]" />}
              </button>

              <span className="text-[10px] font-mono opacity-80 tabular-nums" dir="ltr">
                0:0{Math.floor(currentTime)} / 0:09
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  fireEnvelopeRevealConfetti();
                }}
                className="p-1 text-[#E2C799] hover:text-white transition-colors"
                title="بارش شادباش 🎊"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="p-1 hover:text-[#E2C799] transition-colors"
                title={isFullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Quick Action Navigation Strip below video */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-md w-full px-4">
        <button
          onClick={onOpenShareModal}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8DEC8] hover:bg-[#FAF7F2] text-xs font-semibold text-[#2C241E] shadow-xs transition-all active:scale-95"
        >
          <Share2 className="w-3.5 h-3.5 text-[#9A7432]" />
          <span>ارسال ویدیو به مهمانان</span>
        </button>

        <button
          onClick={onOpenDetails}
          className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#9A7432] hover:bg-[#856327] text-xs font-semibold text-white shadow-sm transition-all active:scale-95"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>مشاهده آدرس، مسیریابی و RSVP</span>
        </button>
      </div>
    </div>
  );
};
