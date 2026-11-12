import React, { useState, useEffect } from 'react';
import { WeddingConfig, RSVPResponse } from './types/wedding';
import { INITIAL_WEDDING_CONFIG, INITIAL_RSVPS, WEDDING_THEMES } from './data/defaultConfig';
import { CinematicVideoCard } from './components/CinematicVideoCard';
import { EnvelopeHero } from './components/EnvelopeHero';
import { CardHeader } from './components/CardHeader';
import { CoupleSection } from './components/CoupleSection';
import { CountdownTimer } from './components/CountdownTimer';
import { TimelineSchedule } from './components/TimelineSchedule';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { DressCodeAndTips } from './components/DressCodeAndTips';
import { RSVPSection } from './components/RSVPSection';
import { CardFooter } from './components/CardFooter';
import { GuestLinkGeneratorModal } from './components/GuestLinkGeneratorModal';
import { GitHubDeployGuideModal } from './components/GitHubDeployGuideModal';
import { SettingsModal } from './components/SettingsModal';
import { MusicPlayerFloating } from './components/MusicPlayerFloating';
import { romanticPlayer } from './utils/audioPlayer';
import { fireEnvelopeRevealConfetti } from './utils/confetti';

export default function App() {
  // Extract personalized guest name from URL (?to=نام_مهمان or ?guest=...)
  const [guestName, setGuestName] = useState<string>('');
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);

  // App configuration state with localStorage persistence
  const [config, setConfig] = useState<WeddingConfig>(() => {
    try {
      const saved = localStorage.getItem('wedding_card_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_WEDDING_CONFIG;
  });

  // RSVPs state with localStorage persistence
  const [rsvps, setRsvps] = useState<RSVPResponse[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_card_rsvps');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_RSVPS;
  });

  // Modals state
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isGithubGuideOpen, setIsGithubGuideOpen] = useState(false);

  // Music state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    // Read query parameter for guest name
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const to = params.get('to') || params.get('guest') || params.get('name') || '';
      if (to) {
        setGuestName(decodeURIComponent(to).trim());
      }
    }

    // Subscribe to music player state
    const unsubscribe = romanticPlayer.subscribe((playing) => {
      setIsPlayingMusic(playing);
    });

    return () => {
      unsubscribe();
      romanticPlayer.pause();
    };
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    fireEnvelopeRevealConfetti();
    romanticPlayer.play();
    // Smooth scroll down to card content
    setTimeout(() => {
      const mainEl = document.getElementById('invitation-card-content');
      if (mainEl) {
        mainEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddRsvp = (newRsvp: RSVPResponse) => {
    const updated = [newRsvp, ...rsvps];
    setRsvps(updated);
    try {
      localStorage.setItem('wedding_card_rsvps', JSON.stringify(updated));
    } catch {
      //
    }
  };

  const handleSaveConfig = (newConfig: WeddingConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('wedding_card_config', JSON.stringify(newConfig));
    } catch {
      //
    }
  };

  // Active view mode: 'video' (Cinematic 9:16 Video Card) | 'envelope' (Traditional Wax Seal)
  const [activeTabMode, setActiveTabMode] = useState<'video' | 'envelope'>('video');

  const scrollToDetails = () => {
    setIsEnvelopeOpen(true);
    setTimeout(() => {
      const detailsEl = document.getElementById('details-section');
      if (detailsEl) {
        detailsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const theme = WEDDING_THEMES[config.themeId] || WEDDING_THEMES['royal-gold'];

  return (
    <div
      style={{ backgroundColor: theme.bgLight }}
      className="min-h-screen text-[#2C241E] selection:bg-[#E2C799] selection:text-[#1F1710]"
    >
      {/* Top Bar Header (Always accessible) */}
      <CardHeader
        config={config}
        onOpenGuestModal={() => setIsGuestModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenGithubGuide={() => setIsGithubGuideOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={() => romanticPlayer.toggle()}
      />

      {/* Mode Switcher Segmented Control */}
      <div className="pt-4 pb-2 flex items-center justify-center">
        <div className="inline-flex items-center p-1 rounded-2xl bg-white/80 backdrop-blur-xs border border-[#E8DEC8] shadow-xs">
          <button
            onClick={() => setActiveTabMode('video')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTabMode === 'video'
                ? 'bg-[#9A7432] text-white shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#2C241E]'
            }`}
          >
            <span>ویدیو کارت سینمایی (۹:۱۶)</span>
          </button>

          <button
            onClick={() => {
              setActiveTabMode('envelope');
              setIsEnvelopeOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTabMode === 'envelope'
                ? 'bg-[#9A7432] text-white shadow-xs'
                : 'text-[#6B5A4E] hover:text-[#2C241E]'
            }`}
          >
            <span>پاکت نامه و مهر و موم</span>
          </button>
        </div>
      </div>

      {/* 1. Cinematic 9:16 Video Invitation Mode */}
      {activeTabMode === 'video' ? (
        <div className="px-4 pb-4">
          <CinematicVideoCard
            config={config}
            guestName={guestName}
            onOpenDetails={scrollToDetails}
            onOpenShareModal={() => setIsGuestModalOpen(true)}
          />
        </div>
      ) : (
        /* 2. Traditional Envelope Hero Screen */
        !isEnvelopeOpen && (
          <EnvelopeHero
            config={config}
            guestName={guestName}
            isOpen={isEnvelopeOpen}
            onOpen={handleOpenEnvelope}
          />
        )
      )}

      {/* Full Ceremony Details & RSVP Section (Visible in video mode or when envelope is opened) */}
      {(activeTabMode === 'video' || isEnvelopeOpen) && (
        <div id="details-section" className="relative animate-fadeIn border-t border-[#E8DEC8]/60 mt-4">
          <main className="space-y-4">
            {/* Couple Welcome & Editorial Split */}
            <CoupleSection
              config={config}
              guestName={guestName}
              onCelebrate={fireEnvelopeRevealConfetti}
            />

            {/* Countdown Timer */}
            <div id="details">
              <CountdownTimer
                targetISODate={config.targetISODate}
                dateSolar={config.dateSolar}
                dateGregorian={config.dateGregorian}
              />
            </div>

            {/* Timeline Schedule */}
            <TimelineSchedule schedule={config.schedule} />

            {/* Venue & Navigation Apps */}
            <VenueSection config={config} />

            {/* Photo Gallery & Lightbox */}
            <GallerySection photos={config.photos} />

            {/* Dress code & Guest Tips */}
            <DressCodeAndTips config={config} />

            {/* RSVP Section & Well-Wishes Board */}
            <RSVPSection
              initialGuestName={guestName}
              rsvps={rsvps}
              onAddRsvp={handleAddRsvp}
            />
          </main>

          {/* Footer */}
          <CardFooter
            config={config}
            onReopenEnvelope={handleReopenEnvelope}
            onOpenGuestModal={() => setIsGuestModalOpen(true)}
          />

          {/* Floating Music Equalizer Button */}
          <MusicPlayerFloating
            isPlaying={isPlayingMusic}
            onToggle={() => romanticPlayer.toggle()}
          />
        </div>
      )}

      {/* Modals */}
      <GuestLinkGeneratorModal
        isOpen={isGuestModalOpen}
        onClose={() => setIsGuestModalOpen(false)}
        config={config}
      />

      <GitHubDeployGuideModal
        isOpen={isGithubGuideOpen}
        onClose={() => setIsGithubGuideOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
