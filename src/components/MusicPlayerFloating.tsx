import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerFloatingProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayerFloating: React.FC<MusicPlayerFloatingProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-2">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'قطع موسیقی' : 'پخش موسیقی رمانتیک'}
        className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#2C241E] shadow-lg border border-[#E8DEC8] backdrop-blur-md transition-all hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-4 w-4 justify-center">
            <span className="w-1 bg-[#9A7432] rounded-full animate-bounce h-3" />
            <span className="w-1 bg-[#9A7432] rounded-full animate-bounce [animation-delay:0.2s] h-4" />
            <span className="w-1 bg-[#9A7432] rounded-full animate-bounce [animation-delay:0.4s] h-2" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#7D6B5E]" />
        )}

        <span className="text-xs font-semibold text-[#5A4A3E]">
          {isPlaying ? 'نوا در حال پخش' : 'پخش آهنگ'}
        </span>
      </button>
    </div>
  );
};
