import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc3, ExternalLink } from 'lucide-react';

interface MusicPlayerProps {
  isDark: boolean;
  shouldAutoPlay: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isDark, shouldAutoPlay }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.65;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldAutoPlay) return;

    if (!isPlaying && !showSpotifyEmbed) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    }
  }, [shouldAutoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleToggleSpotify = () => {
    const nextState = !showSpotifyEmbed;
    setShowSpotifyEmbed(nextState);
    if (nextState && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative flex items-center shrink-0">
      <audio
        ref={audioRef}
        src="/audio/truoc_khi_em_ton_tai.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Compact Music Bar */}
      <div
        className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 ${
          isDark
            ? 'bg-[#1f070e]/90 border-rose-800/60 text-rose-100 shadow-sm shadow-rose-950/50'
            : 'bg-white/90 border-pink-200 text-[#6e2b42] shadow-sm shadow-pink-100'
        }`}
      >
        <button
          type="button"
          onClick={togglePlay}
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
            isDark
              ? 'bg-rose-700 hover:bg-rose-600 text-white'
              : 'bg-pink-400 hover:bg-pink-500 text-white'
          }`}
          title={isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền'}
        >
          {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 ml-0.5" />}
        </button>

        <div className="hidden lg:flex items-center gap-1.5 text-xs font-ui pr-1">
          <Disc3
            className={`w-3.5 h-3.5 shrink-0 ${
              isPlaying ? 'animate-spin' : ''
            } ${isDark ? 'text-rose-400' : 'text-pink-500'}`}
          />
          <span className="font-medium whitespace-nowrap">Trước Khi Em Tồn Tại</span>
        </div>

        <button
          type="button"
          onClick={toggleMute}
          className={`p-1 rounded-full transition-colors cursor-pointer shrink-0 ${
            isDark ? 'hover:bg-rose-900/50 text-rose-300' : 'hover:bg-pink-100 text-pink-600'
          }`}
          title={isMuted ? 'Bật tiếng nhạc' : 'Tắt tiếng nhạc'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={handleToggleSpotify}
          className={`px-2 py-0.5 text-[11px] font-ui font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 shrink-0 ${
            showSpotifyEmbed
              ? isDark
                ? 'bg-rose-700 border-rose-500 text-white'
                : 'bg-pink-500 border-pink-500 text-white'
              : isDark
              ? 'border-rose-800/80 hover:bg-rose-900/40 text-rose-200'
              : 'border-pink-200 hover:bg-pink-50 text-[#7d324c]'
          }`}
          title="Mở trình phát Spotify"
        >
          <Music className="w-3 h-3" />
          <span>Spotify</span>
        </button>
      </div>

      {/* Collapsible Official Spotify Track Embed Drawer */}
      {showSpotifyEmbed && (
        <div
          className={`fixed sm:absolute right-3 sm:right-0 top-16 sm:top-full sm:mt-2 w-[calc(100vw-24px)] max-w-sm p-3 rounded-2xl border shadow-2xl z-50 backdrop-blur-md ${
            isDark
              ? 'bg-[#1c060c]/95 border-rose-800/70 text-rose-100'
              : 'bg-white/95 border-pink-200 text-[#6e2b42]'
          }`}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-ui font-medium"> Spotify Player</span>
            <a
              href="https://open.spotify.com/track/1yo967mk7CpjvruNxBecOY?si=RXTjm0kwSXOE82lNl7NjrA&utm_source=copy-link"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[11px] font-ui flex items-center gap-1 underline ${
                isDark ? 'text-rose-300 hover:text-rose-200' : 'text-pink-600 hover:text-pink-700'
              }`}
            >
              <span>Mở ứng dụng</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/track/1yo967mk7CpjvruNxBecOY?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify - Trước Khi Em Tồn Tại - Thắng"
          />
        </div>
      )}
    </div>
  );
};
