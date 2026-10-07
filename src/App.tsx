import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Moon,
  Sun,
  Flower2,
  MailOpen,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ScrollText,
} from 'lucide-react';
import { FallingPetals } from './components/FallingPetals';
import { ChiikawaBouquetPopup } from './components/ChiikawaBouquetPopup';
import {
  SatinBowSVG,
  ChiikawaWaxSeal,
  PearlRibbonDivider,
} from './components/CoquetteOrnaments';
import { MusicPlayer } from './components/MusicPlayer';
import { SendLoveButton } from './components/SendLoveButton';
import {
  playCardOpeningSound,
  playPaperRustleShort,
} from './utils/soundEffects';

const LETTER_PARAGRAPHS = [
  'Tháng Mười lại về, mang theo những ngày trời dịu dàng hơn và cũng mang đến một dịp thật đặc biệt để chúng ta dành những lời yêu thương cho những người phụ nữ xung quanh mình. Nhân ngày Phụ nữ Việt Nam 20/10, em muốn viết lá thư này như một lời cảm ơn nhỏ bé gửi đến những người phụ nữ đã và đang làm cho cuộc sống của em trở nên ấm áp hơn.',
  'Người đầu tiên em muốn nhắc đến là mẹ. Từ khi còn nhỏ, em đã quen với hình ảnh mẹ luôn bận rộn với công việc, gia đình và những điều tưởng chừng rất nhỏ nhặt trong cuộc sống. Mẹ luôn nhớ em thích ăn gì, cần gì, hôm nay có chuyện gì ở trường, có mệt hay không. Những điều ấy đôi khi quen thuộc đến mức em vô tình xem chúng như một phần hiển nhiên của cuộc sống. Chỉ đến khi lớn hơn một chút, em mới nhận ra đằng sau những bữa cơm nóng, những lời nhắc nhở và những lần mẹ chờ cửa là biết bao sự yêu thương và hy sinh.',
  'Có lẽ em không phải lúc nào cũng là một đứa con ngoan. Em từng cáu gắt, từng khiến mẹ buồn, từng vì những chuyện nhỏ mà quên mất rằng người trước mặt mình luôn yêu thương mình nhất. Có những lời “cảm ơn” hay “con yêu mẹ” em đã nghĩ rất nhiều nhưng lại chẳng biết nói ra thế nào. Vì vậy, nhân ngày hôm nay, em muốn nói rằng: cảm ơn mẹ vì đã luôn ở bên con. Cảm ơn mẹ vì đã kiên nhẫn với những lúc con bướng bỉnh, yếu đuối và chưa đủ trưởng thành. Con mong mẹ sẽ luôn khỏe mạnh, vui vẻ và có thật nhiều ngày tháng bình yên.',
  'Bên cạnh mẹ, em cũng muốn gửi lời cảm ơn đến những cô giáo của mình. Cô không chỉ dạy chúng em những bài học trong sách vở mà còn dạy chúng em cách cư xử, cách cố gắng và cách trở thành một người tốt hơn. Có thể sau này chúng em sẽ quên đi một vài bài học, một vài con điểm hay những bài kiểm tra, nhưng em tin rằng sự tận tâm và những lời động viên của cô sẽ luôn là một phần ký ức đẹp trong những năm tháng học trò.',
  'Không chỉ có mẹ và cô giáo, em muốn gửi lời chúc này đến tất cả những người phụ nữ trên cuộc đời. Đó có thể là một người bà luôn dịu dàng, một người chị luôn âm thầm quan tâm, một người bạn luôn lắng nghe, hay bất kỳ người phụ nữ nào đang cố gắng từng ngày để sống một cuộc đời mà mình mong muốn.',
  'Là một học sinh, em chưa thể làm được những điều lớn lao. Em cũng chưa đủ trưởng thành để hiểu hết những khó khăn mà mỗi người phụ nữ phải trải qua. Nhưng em hiểu rằng ai cũng xứng đáng được yêu thương, tôn trọng và trân trọng. Em hy vọng những người phụ nữ quanh em sẽ luôn có đủ mạnh mẽ để bước tiếp, đủ dũng khí để theo đuổi điều mình yêu thích và đủ bình yên để mỉm cười với cuộc sống.',
  'Nếu yêu thương là một món quà, có lẽ điều đẹp nhất không phải là món quà đắt tiền, mà là khi chúng ta biết nói lời cảm ơn trước khi quá muộn. Vì vậy, nhân ngày 20/10, em muốn gửi đến những người phụ nữ thân yêu nhất của mình một lời chúc thật giản dị: chúc mọi người luôn khỏe mạnh, hạnh phúc và được yêu thương theo cách mà mọi người xứng đáng nhận được.',
  'Mong rằng không chỉ riêng ngày 20/10, mà trong tất cả những ngày bình thường của năm, chúng ta đều biết trân trọng những người phụ nữ bên cạnh mình. Bởi đôi khi, những người luôn âm thầm yêu thương ta nhất lại chính là những người chúng ta dễ quên nói lời cảm ơn nhất.',
];

const LETTER_PAGES = [
  {
    pageNumber: 1,
    subtitle: 'Lời Mở Đầu & Gửi Mẹ Thân Yêu',
    paragraphs: [LETTER_PARAGRAPHS[0], LETTER_PARAGRAPHS[1]],
    hasDropCap: true,
    stickers: [
      { src: '/chiikawa/chiikawa_happy_tears.png', alt: 'Chiikawa cảm động' },
    ],
  },
  {
    pageNumber: 2,
    subtitle: 'Lòng Biết Ơn Mẹ & Cô Giáo',
    paragraphs: [LETTER_PARAGRAPHS[2], LETTER_PARAGRAPHS[3]],
    hasDropCap: false,
    stickers: [
      { src: '/chiikawa/chiikawa_choco_heart.png', alt: 'Chiikawa ôm trái tim' },
      { src: '/chiikawa/chiikawa_tilt.png', alt: 'Chiikawa nghiêng đầu' },
    ],
  },
  {
    pageNumber: 3,
    subtitle: 'Gửi Những Người Phụ Nữ Quanh Em',
    paragraphs: [LETTER_PARAGRAPHS[4], LETTER_PARAGRAPHS[5]],
    hasDropCap: false,
    stickers: [
      { src: '/chiikawa/chiikawa_Sparkle.png', alt: 'Chiikawa mắt lấp lánh' },
    ],
  },
  {
    pageNumber: 4,
    subtitle: 'Món Quà Yêu Thương Ngày 20/10',
    paragraphs: [LETTER_PARAGRAPHS[6], LETTER_PARAGRAPHS[7]],
    hasDropCap: false,
    isLastPage: true,
    stickers: [
      { src: '/chiikawa/chiikawa_pochette.png', alt: 'Chiikawa đeo túi gấu hồng' },
      { src: '/chiikawa/chiikawa_peace.png', alt: 'Chiikawa dễ thương' },
    ],
  },
];

interface InteractiveStickerProps {
  src: string;
  alt: string;
  className?: string;
  sfxMuted: boolean;
  onClick?: () => void;
  title?: string;
}

/**
 * Official Chiikawa Sticker with interactive wobble (rung nhẹ) + zoom on hover/tap
 * and natural kraft paper touch sound.
 */
const InteractiveChiikawaSticker: React.FC<InteractiveStickerProps> = ({
  src,
  alt,
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  sfxMuted,
  onClick,
  title = 'Chạm hoặc rê chuột vào Chiikawa',
}) => {
  const [wobbleTick, setWobbleTick] = useState(0);

  return (
    <motion.img
      key={wobbleTick}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      title={title}
      onMouseEnter={() => playPaperRustleShort(sfxMuted)}
      onClick={() => {
        playPaperRustleShort(sfxMuted);
        setWobbleTick((t) => t + 1);
        if (onClick) onClick();
      }}
      animate={
        wobbleTick > 0
          ? {
              scale: [1, 1.2, 1.12, 1.16, 1],
              rotate: [0, -11, 11, -8, 8, -4, 0],
            }
          : undefined
      }
      whileHover={{
        scale: 1.18,
        rotate: [0, -9, 9, -6, 6, -3, 0],
        transition: {
          rotate: { duration: 0.55, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 340, damping: 15 },
        },
      }}
      whileTap={{
        scale: 1.22,
        rotate: [-10, 10, -6, 0],
      }}
      className={`${className} object-contain cursor-pointer select-none drop-shadow-sm`}
    />
  );
};

// 3D Page Flip Animation Variants
const pageFlipVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 75 : -75,
    x: direction > 0 ? 50 : -50,
    scale: 0.96,
    opacity: 0,
    transformOrigin: direction > 0 ? 'left center' : 'right center',
  }),
  center: {
    rotateY: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    transformOrigin: 'center center',
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -75 : 75,
    x: direction > 0 ? -50 : 50,
    scale: 0.96,
    opacity: 0,
    transformOrigin: direction > 0 ? 'left center' : 'right center',
  }),
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);
  const [sfxMuted, setSfxMuted] = useState(false);
  const [musicAutoPlay, setMusicAutoPlay] = useState(false);
  const [bouquetTriggerKey, setBouquetTriggerKey] = useState(0);

  // Page-flip vs continuous scroll mode & reading progress state
  const [isPageFlipMode, setIsPageFlipMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const letterCardRef = useRef<HTMLDivElement | null>(null);

  // Calculate scroll reading progress for the letter
  useEffect(() => {
    if (!isOpen) {
      setScrollProgress(0);
      return;
    }

    const updateProgress = () => {
      const cardEl = letterCardRef.current;
      if (!cardEl) return;

      const rect = cardEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight * 0.55;

      if (totalScrollable <= 40) {
        setScrollProgress(100);
        return;
      }

      const scrolled = Math.max(0, windowHeight * 0.35 - rect.top);
      const pct = Math.min(100, Math.max(8, (scrolled / totalScrollable) * 100));
      setScrollProgress(pct);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [isOpen, isPageFlipMode, currentPage]);

  // Combined progress percentage shown on the top edge of the letter
  const activeProgressPercent = isPageFlipMode
    ? ((currentPage + 1) / LETTER_PAGES.length) * 100
    : scrollProgress;

  const handleOpenCard = () => {
    if (isOpen || isUnfolding) return;
    setIsUnfolding(true);
    setMusicAutoPlay(true);
    playCardOpeningSound(sfxMuted);

    // Trigger Chiikawa holding the blooming bouquet for 5 seconds
    setTimeout(() => {
      setIsOpen(true);
      setIsUnfolding(false);
      setCurrentPage(0);
      setBouquetTriggerKey((prev) => prev + 1);
    }, 520);
  };

  const handleCloseCard = () => {
    playPaperRustleShort(sfxMuted);
    setIsOpen(false);
  };

  const handleReplayBouquet = () => {
    playCardOpeningSound(sfxMuted);
    setBouquetTriggerKey((prev) => prev + 1);
  };

  const handleNextPage = () => {
    if (currentPage < LETTER_PAGES.length - 1) {
      playPaperRustleShort(sfxMuted);
      setFlipDirection(1);
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      playPaperRustleShort(sfxMuted);
      setFlipDirection(-1);
      setCurrentPage((p) => p - 1);
    }
  };

  const handleJumpToPage = (targetIndex: number) => {
    if (targetIndex === currentPage) return;
    playPaperRustleShort(sfxMuted);
    setFlipDirection(targetIndex > currentPage ? 1 : -1);
    setCurrentPage(targetIndex);
  };

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 relative selection:bg-pink-200 selection:text-pink-900 ${
        isDark
          ? 'gingham-dark text-rose-50 selection:bg-rose-800 selection:text-rose-100'
          : 'gingham-light text-[#4a2030]'
      }`}
    >
      {/* Falling Flower Petals Layer */}
      <FallingPetals isDark={isDark} enabled={petalsEnabled} />

      {/* 5s Chiikawa Blooming Flower Bouquet Pop-up on Card Open */}
      <ChiikawaBouquetPopup triggerKey={bouquetTriggerKey} isDark={isDark} />

      {/* Floating "Gửi yêu thương" Heart Shower Button */}
      <SendLoveButton isDark={isDark} sfxMuted={sfxMuted} />

      {/* Top Navigation & Control Bar (3-Zone Contract, fully visible on mobile) */}
      <header
        className={`sticky top-0 z-40 w-full backdrop-blur-md border-b transition-colors duration-300 ${
          isDark
            ? 'bg-[#120408]/90 border-rose-900/50'
            : 'bg-[#fff8fa]/90 border-pink-200/80'
        }`}
      >
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Zone 1: Single Text Brand Wordmark */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`font-display text-base sm:text-2xl font-semibold tracking-tight truncate min-w-0 ${
              isDark ? 'text-rose-100' : 'text-[#6e243b]'
            }`}
          >
            Tháng Mười Dịu Dàng
          </a>

          {/* Zone 2: Clean Interactive Controls / Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-ui font-medium shrink-0">
            <button
              type="button"
              onClick={() => setPetalsEnabled((p) => !p)}
              className={`hover:underline transition-colors cursor-pointer whitespace-nowrap ${
                isDark ? 'text-rose-200/85 hover:text-rose-100' : 'text-[#7d324c] hover:text-[#4a1829]'
              }`}
            >
              {petalsEnabled ? 'Cánh hoa rơi: Bật' : 'Cánh hoa rơi: Tắt'}
            </button>
            <button
              type="button"
              onClick={() => setSfxMuted((m) => !m)}
              className={`hover:underline transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                isDark ? 'text-rose-200/85 hover:text-rose-100' : 'text-[#7d324c] hover:text-[#4a1829]'
              }`}
            >
              {sfxMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{sfxMuted ? 'Tiếng giấy: Tắt' : 'Tiếng giấy: Bật'}</span>
            </button>
            {isOpen && (
              <button
                type="button"
                onClick={handleReplayBouquet}
                className={`hover:underline transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                  isDark ? 'text-rose-300 hover:text-rose-100' : 'text-pink-600 hover:text-pink-700'
                }`}
              >
                <Flower2 className="w-3.5 h-3.5" />
                <span>Chiikawa tặng hoa</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Music Player & Dark Mode (Cherry Red-Black) Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <MusicPlayer isDark={isDark} shouldAutoPlay={musicAutoPlay} />

            <button
              type="button"
              onClick={() => {
                playPaperRustleShort(sfxMuted);
                setIsDark((d) => !d);
              }}
              aria-label={isDark ? 'Chuyển sang tông Hồng Phấn' : 'Chuyển sang chế độ Đỏ Đen Cherry'}
              className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-ui font-medium border flex items-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                isDark
                  ? 'bg-rose-950/90 border-rose-700/70 text-rose-100 hover:bg-rose-900/80 shadow-sm shadow-rose-950'
                  : 'bg-white/95 border-pink-300 text-[#6e2b42] hover:bg-pink-50 shadow-sm shadow-pink-100'
              }`}
              title={isDark ? 'Chuyển sang tông Hồng Phấn' : 'Chuyển sang chế độ Đỏ Đen Cherry'}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                  <span className="text-[11px] sm:text-xs">Sáng</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                  <span className="text-[11px] sm:text-xs">Tối</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main id="top" className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* =========================================================
               CLOSED ENVELOPE VIEW (Interactive Tactile Envelope)
               ========================================================= */
            <motion.section
              key="closed-envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center min-h-[72vh] py-6"
            >
              {/* Subtle Date & Occasion Kicker */}
              <div
                className={`flex items-center gap-2 text-xs font-ui tracking-widest uppercase mb-5 ${
                  isDark ? 'text-rose-300/80' : 'text-[#9e4766]'
                }`}
              >
                <span>Ngày Phụ Nữ Việt Nam</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">20 / 10 / 2026</span>
              </div>

              {/* Envelope Outer Wrapper with Peeking Official Chiikawa Characters */}
              <div className="relative w-full max-w-xl mx-auto mt-6 mb-8">
                {/* Official Chiikawa Peeking Above the Envelope */}
                <motion.div
                  animate={{ y: isUnfolding ? -24 : [0, -6, 0] }}
                  transition={{
                    duration: isUnfolding ? 0.4 : 3.6,
                    repeat: isUnfolding ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  className="-top-16 left-8 sm:left-12 w-24 h-24 sm:w-28 sm:h-28 z-10 pointer-events-none select-none absolute"
                >
                  <img
                    src="/chiikawa/chiikawa_pink_ribbon.png"
                    alt="Chiikawa đeo nơ hồng"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </motion.div>

                <motion.div
                  animate={{ y: isUnfolding ? -20 : [0, -5, 0] }}
                  transition={{
                    duration: isUnfolding ? 0.4 : 4.2,
                    repeat: isUnfolding ? 0 : Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="-top-14 right-8 sm:right-12 w-22 h-22 sm:w-26 sm:h-26 z-10 pointer-events-none select-none absolute"
                >
                  <img
                    src="/chiikawa/chiikawa_pochette.png"
                    alt="Chiikawa đeo túi gấu hồng"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </motion.div>

                {/* Clickable Envelope Card */}
                <motion.div
                  onClick={handleOpenCard}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  animate={
                    isUnfolding
                      ? { scale: [1, 1.04, 0.96], rotateX: 12, opacity: [1, 1, 0.2] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenCard();
                    }
                  }}
                  aria-label="Mở bức thư ngày 20 tháng 10"
                  className={`relative z-20 w-full rounded-3xl p-6 sm:p-10 cursor-pointer overflow-hidden transition-all duration-300 ${
                    isDark
                      ? 'bg-gradient-to-b from-[#260812] via-[#1c060d] to-[#16040a] lace-border-dark paper-texture-dark'
                      : 'bg-gradient-to-b from-[#fff5f8] via-[#ffeef4] to-[#ffe5ee] lace-border-light paper-texture-light'
                  }`}
                >
                  {/* Decorative Inner Dashed Stitch Border */}
                  <div
                    className={`rounded-2xl border-2 border-dashed p-6 sm:p-8 flex flex-col items-center text-center relative ${
                      isDark ? 'border-rose-700/45 bg-[#1a050b]/60' : 'border-pink-300/80 bg-white/65'
                    }`}
                  >
                    {/* Top Corner Satin Bows */}
                    <div className="w-full flex items-start justify-between mb-2">
                      <SatinBowSVG isDark={isDark} size={50} className="-rotate-12" />

                      {/* Postage Stamp with Official Chiikawa */}
                      <div
                        className={`p-1.5 rounded-lg border-2 border-dotted rotate-3 shadow-sm ${
                          isDark
                            ? 'bg-[#2b0a14] border-rose-500/60'
                            : 'bg-[#fff9fb] border-pink-300'
                        }`}
                      >
                        <div
                          className={`w-14 h-16 rounded flex flex-col items-center justify-between p-1 ${
                            isDark ? 'bg-[#19040a]' : 'bg-pink-50/80'
                          }`}
                        >
                          <span
                            className={`text-[9px] font-ui font-semibold tracking-wider uppercase ${
                              isDark ? 'text-rose-300' : 'text-pink-500'
                            }`}
                          >
                            20 • 10
                          </span>
                          <img
                            src="/chiikawa/chiikawa_heart.png"
                            alt="Tem thư Chiikawa"
                            referrerPolicy="no-referrer"
                            className="w-9 h-9 object-contain"
                          />
                          <span
                            className={`text-[8px] font-ui ${
                              isDark ? 'text-rose-400/80' : 'text-pink-400'
                            }`}
                          >
                            VIETNAM
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Envelope Flap Visual Line */}
                    <div className="my-2 flex flex-col items-center">
                      <SatinBowSVG isDark={isDark} size={68} />
                      <h1
                        className={`mt-3 font-display text-2xl sm:text-4xl font-semibold tracking-tight leading-snug max-w-md ${
                          isDark ? 'text-rose-50' : 'text-[#5c1d33]'
                        }`}
                        style={{ textWrap: 'balance' }}
                      >
                        Bức Thư Gửi Những Người Phụ Nữ Nhân Ngày 20/10
                      </h1>
                      <p
                        className={`mt-2 font-script text-xl sm:text-2xl ${
                          isDark ? 'text-rose-300' : 'text-[#b5446e]'
                        }`}
                      >
                        Kính gửi những người phụ nữ mà em yêu thương!
                      </p>
                    </div>

                    {/* Interactive Wax Seal Button */}
                    <div className="my-4 flex flex-col items-center">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ChiikawaWaxSeal isDark={isDark} />
                      </motion.div>

                      <span
                        className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-ui font-medium transition-all duration-200 shadow-sm ${
                          isDark
                            ? 'bg-rose-700 text-white hover:bg-rose-600 shadow-rose-950'
                            : 'bg-[#e35d88] text-white hover:bg-[#d14b76] shadow-pink-200'
                        }`}
                      >
                        <MailOpen className="w-4 h-4" />
                        <span>Chạm để mở phong thư</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          ) : (
            /* =========================================================
               OPENED LETTER STATIONERY VIEW (With Top Progress Bar & Page Flip)
               ========================================================= */
            <motion.article
              key="opened-letter"
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-2 sm:my-6"
            >
              {/* Top Action Bar Above the Card */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 px-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCloseCard}
                    className={`inline-flex items-center gap-1.5 text-xs font-ui font-medium px-3.5 py-2 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                      isDark
                        ? 'bg-[#1f070e]/90 border-rose-800/60 text-rose-200 hover:bg-rose-950'
                        : 'bg-white/90 border-pink-200 text-[#6e2b42] hover:bg-pink-50'
                    }`}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Gấp lại phong thư</span>
                  </button>

                  {/* Toggle between Page Flip Mode and Continuous Scroll Mode */}
                  <button
                    type="button"
                    onClick={() => {
                      playPaperRustleShort(sfxMuted);
                      setIsPageFlipMode((m) => !m);
                    }}
                    className={`inline-flex items-center gap-1.5 text-xs font-ui font-medium px-3.5 py-2 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                      isDark
                        ? 'bg-[#2a0813]/90 border-rose-700/60 text-rose-100 hover:bg-rose-900/70'
                        : 'bg-white/90 border-pink-200 text-[#6e2b42] hover:bg-pink-50'
                    }`}
                  >
                    {isPageFlipMode ? (
                      <>
                        <ScrollText className="w-3.5 h-3.5" />
                        <span>Đọc liền mạch</span>
                      </>
                    ) : (
                      <>
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Chế độ lật trang</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReplayBouquet}
                  className={`inline-flex items-center gap-1.5 text-xs font-ui font-medium px-4 py-2 rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                    isDark
                      ? 'bg-rose-800/90 border-rose-600 text-rose-50 hover:bg-rose-700'
                      : 'bg-pink-100/90 border-pink-300 text-[#6e243b] hover:bg-pink-200/80'
                  }`}
                >
                  <Flower2 className="w-3.5 h-3.5" />
                  <span>Xem lại Chiikawa tặng hoa (5s)</span>
                </button>
              </div>

              {/* Main Scalloped Lace & Ribbon Stationery Sheet */}
              <div
                ref={letterCardRef}
                style={{ perspective: '1600px' }}
                className={`relative rounded-[28px] p-4 sm:p-10 md:p-14 transition-colors duration-500 ${
                  isDark
                    ? 'bg-[#1a050b]/95 lace-border-dark paper-texture-dark'
                    : 'bg-[#fffcfd]/95 lace-border-light paper-texture-light'
                }`}
              >
                {/* =========================================================
                    SUBTLE TOP-EDGE READING PROGRESS BAR ON THE LETTER
                    ========================================================= */}
                <div
                  className="sticky top-14 sm:top-16 z-30 -mx-4 sm:-mx-10 md:-mx-14 -mt-4 sm:-mt-10 md:-mt-14 mb-6 sm:mb-8 pt-0.5 px-3 sm:px-6 pointer-events-none"
                  aria-label="Tiến độ đọc bức thư"
                >
                  <div
                    className={`w-full h-1.5 sm:h-2 rounded-full overflow-hidden backdrop-blur-sm border ${
                      isDark
                        ? 'bg-rose-950/80 border-rose-800/50'
                        : 'bg-pink-100/90 border-pink-200/80'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeProgressPercent}%` }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className={`h-full rounded-full relative ${
                        isDark
                          ? 'bg-gradient-to-r from-rose-900 via-[#e11d48] to-[#fda4af] shadow-[0_0_10px_rgba(225,29,72,0.75)]'
                          : 'bg-gradient-to-r from-pink-300 via-[#f46a97] to-[#e11d48] shadow-[0_0_8px_rgba(244,106,151,0.55)]'
                      }`}
                    />
                  </div>
                </div>

                {/* Inner Delicate Frame with Ribbon Corners */}
                <div
                  className={`relative rounded-2xl border p-5 sm:p-10 md:p-12 overflow-hidden ${
                    isDark
                      ? 'border-rose-800/50 bg-gradient-to-b from-[#21070f]/90 via-[#19050b]/90 to-[#21070f]/90'
                      : 'border-pink-200/90 bg-gradient-to-b from-white/95 via-[#fff9fb]/95 to-white/95'
                  }`}
                >
                  {/* Top Center Cute Puffy Bow */}
                  <div className="flex flex-col items-center justify-center -mt-3 sm:-mt-6 mb-4">
                    <SatinBowSVG isDark={isDark} size={80} className="drop-shadow-sm" />
                  </div>

                  {/* Cohesive Official Magical Chiikawa Stickers in Card Header */}
                  <div className="flex items-center justify-between gap-3 sm:gap-4 mb-2">
                    <InteractiveChiikawaSticker
                      src="/chiikawa/chiikawa_magical_bows.png"
                      alt="Chiikawa đầm nơ hồng"
                      sfxMuted={sfxMuted}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />

                    <div className="text-center flex-1">
                      <p
                        className={`text-xs sm:text-sm font-ui tracking-widest uppercase ${
                          isDark ? 'text-rose-300/85' : 'text-[#a64b6b]'
                        }`}
                      >
                        Ngày 20 tháng 10 năm 2026
                      </p>
                      {isPageFlipMode && (
                        <p
                          className={`text-[11px] font-ui mt-1 tabular-nums ${
                            isDark ? 'text-rose-400/75' : 'text-[#b85d7c]'
                          }`}
                        >
                          Trang {currentPage + 1} / {LETTER_PAGES.length} ·{' '}
                          {LETTER_PAGES[currentPage].subtitle}
                        </p>
                      )}
                    </div>

                    <InteractiveChiikawaSticker
                      src="/chiikawa/chiikawa_pink_ribbon.png"
                      alt="Chiikawa nơ hồng ngôi sao"
                      sfxMuted={sfxMuted}
                      className="w-20 h-20 sm:w-24 sm:h-24"
                    />
                  </div>

                  {/* Main Letter Headline */}
                  <header className="text-center max-w-2xl mx-auto my-4">
                    <h1
                      className={`font-display text-2xl sm:text-4xl md:text-[40px] font-bold tracking-tight leading-tight ${
                        isDark ? 'text-rose-100' : 'text-[#591c31]'
                      }`}
                      style={{ textWrap: 'balance' }}
                    >
                      BỨC THƯ GỬI NHỮNG NGƯỜI PHỤ NỮ NHÂN NGÀY 20/10
                    </h1>

                    <PearlRibbonDivider isDark={isDark} />

                    <p
                      className={`font-script text-2xl sm:text-3xl mt-4 ${
                        isDark ? 'text-rose-300' : 'text-[#c2416d]'
                      }`}
                    >
                      Kính gửi những người phụ nữ mà em yêu thương!
                    </p>
                  </header>

                  {/* =========================================================
                      MODE A: 3D PAGE-FLIP READING EXPERIENCE
                      ========================================================= */}
                  {isPageFlipMode ? (
                    <div className="mt-6" style={{ perspective: '1400px' }}>
                      <AnimatePresence mode="wait" custom={flipDirection}>
                        <motion.div
                          key={`letter-page-${currentPage}`}
                          custom={flipDirection}
                          variants={pageFlipVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{
                            duration: 0.52,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{ transformStyle: 'preserve-3d' }}
                          className={`relative rounded-xl p-4 sm:p-7 border transition-colors ${
                            isDark
                              ? 'bg-[#1e060e]/85 border-rose-900/50 shadow-inner shadow-rose-950/60'
                              : 'bg-[#fffdfd]/90 border-pink-100 shadow-inner shadow-pink-50'
                          }`}
                        >
                          {/* Subtle Book Spine Crease Shadow on Left Edge */}
                          <div
                            className={`absolute inset-y-0 left-0 w-5 pointer-events-none rounded-l-xl ${
                              isDark
                                ? 'bg-gradient-to-r from-black/45 to-transparent'
                                : 'bg-gradient-to-r from-pink-200/35 to-transparent'
                            }`}
                          />

                          {/* Page Body Paragraphs */}
                          <div
                            className={`max-w-[64ch] mx-auto space-y-6 font-serif-body text-[16px] sm:text-[17.5px] leading-[1.85] ${
                              isDark ? 'text-rose-50/95 tracking-[0.01em]' : 'text-[#421928]'
                            }`}
                          >
                            {LETTER_PAGES[currentPage].paragraphs.map((paragraph, pIdx) => (
                              <p
                                key={pIdx}
                                className={
                                  currentPage === 0 && pIdx === 0
                                    ? `first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none ${
                                        isDark
                                          ? 'first-letter:text-rose-300'
                                          : 'first-letter:text-[#c94672]'
                                      }`
                                    : ''
                                }
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>

                          {/* Page Official Chiikawa Sticker Ornament & Closing (if Page 4) */}
                          {LETTER_PAGES[currentPage].isLastPage ? (
                            <div className="max-w-[64ch] mx-auto mt-8 pt-4">
                              <PearlRibbonDivider isDark={isDark} />
                              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                  <InteractiveChiikawaSticker
                                    src="/chiikawa/chiikawa_pochette.png"
                                    alt="Chiikawa đeo túi gấu hồng"
                                    sfxMuted={sfxMuted}
                                    onClick={handleReplayBouquet}
                                    title="Nhấn để Chiikawa tặng hoa lần nữa"
                                    className="w-22 h-22 sm:w-26 sm:h-26"
                                  />
                                  <InteractiveChiikawaSticker
                                    src="/chiikawa/chiikawa_peace.png"
                                    alt="Chiikawa dễ thương"
                                    sfxMuted={sfxMuted}
                                    className="w-20 h-20 sm:w-24 sm:h-24"
                                  />
                                </div>
                                <div className="text-center sm:text-right space-y-2">
                                  <p
                                    className={`font-display text-xl sm:text-2xl font-semibold ${
                                      isDark ? 'text-rose-200' : 'text-[#6e243b]'
                                    }`}
                                  >
                                    Chúc mừng ngày Phụ nữ Việt Nam 20/10!
                                  </p>
                                  <p
                                    className={`font-script text-3xl sm:text-4xl pt-1 ${
                                      isDark ? 'text-rose-300' : 'text-[#c2416d]'
                                    }`}
                                  >
                                    Thân thương.
                                  </p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-6 pt-2 flex items-center justify-center gap-4 select-none">
                              <div
                                className={`h-px flex-1 max-w-[80px] ${
                                  isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                }`}
                              />
                              {LETTER_PAGES[currentPage].stickers.map((st, sIdx) => (
                                <InteractiveChiikawaSticker
                                  key={sIdx}
                                  src={st.src}
                                  alt={st.alt}
                                  sfxMuted={sfxMuted}
                                  className="w-16 h-16 sm:w-20 sm:h-20"
                                />
                              ))}
                              <div
                                className={`h-px flex-1 max-w-[80px] ${
                                  isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                }`}
                              />
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Interactive Page Flip Controls Bar */}
                      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 max-w-[64ch] mx-auto">
                        <button
                          type="button"
                          onClick={handlePrevPage}
                          disabled={currentPage === 0}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-ui font-medium border transition-all duration-200 ${
                            currentPage === 0
                              ? 'opacity-40 cursor-not-allowed border-transparent'
                              : isDark
                              ? 'bg-[#2a0813] border-rose-700/70 text-rose-100 hover:bg-rose-900 cursor-pointer shadow-sm'
                              : 'bg-pink-50/90 border-pink-300 text-[#6e243b] hover:bg-pink-100 cursor-pointer shadow-sm'
                          }`}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span>Trang trước</span>
                        </button>

                        {/* Page Indicator Dots */}
                        <div className="flex items-center gap-2">
                          {LETTER_PAGES.map((page, idx) => {
                            const isCurrent = idx === currentPage;
                            return (
                              <button
                                key={page.pageNumber}
                                type="button"
                                onClick={() => handleJumpToPage(idx)}
                                aria-label={`Chuyển đến trang ${page.pageNumber}`}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                                  isCurrent
                                    ? isDark
                                      ? 'w-7 bg-rose-500'
                                      : 'w-7 bg-[#e35d88]'
                                    : isDark
                                    ? 'w-2.5 bg-rose-900 hover:bg-rose-700'
                                    : 'w-2.5 bg-pink-200 hover:bg-pink-300'
                                }`}
                              />
                            );
                          })}
                        </div>

                        <button
                          type="button"
                          onClick={handleNextPage}
                          disabled={currentPage === LETTER_PAGES.length - 1}
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-ui font-medium border transition-all duration-200 ${
                            currentPage === LETTER_PAGES.length - 1
                              ? 'opacity-40 cursor-not-allowed border-transparent'
                              : isDark
                              ? 'bg-rose-700 border-rose-500 text-white hover:bg-rose-600 cursor-pointer shadow-sm'
                              : 'bg-[#e35d88] border-[#d14b76] text-white hover:bg-[#d14b76] cursor-pointer shadow-sm'
                          }`}
                        >
                          <span>Lật trang tiếp</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* =========================================================
                       MODE B: CONTINUOUS FULL LETTER SCROLL EXPERIENCE
                       ========================================================= */
                    <>
                      <div
                        className={`max-w-[66ch] mx-auto mt-8 space-y-6 font-serif-body text-[16px] sm:text-[17.5px] leading-[1.85] ${
                          isDark ? 'text-rose-50/95 tracking-[0.01em]' : 'text-[#421928]'
                        }`}
                      >
                        {LETTER_PARAGRAPHS.map((paragraph, index) => (
                          <React.Fragment key={index}>
                            <motion.p
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.45,
                                delay: 0.08 + index * 0.05,
                                ease: 'easeOut',
                              }}
                              className={
                                index === 0
                                  ? `first-letter:font-display first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none ${
                                      isDark
                                        ? 'first-letter:text-rose-300'
                                        : 'first-letter:text-[#c94672]'
                                    }`
                                  : ''
                              }
                            >
                              {paragraph}
                            </motion.p>

                            {index === 2 && (
                              <div className="py-2 flex items-center justify-center gap-4 select-none">
                                <div
                                  className={`h-px flex-1 max-w-[80px] ${
                                    isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                  }`}
                                />
                                <InteractiveChiikawaSticker
                                  src="/chiikawa/chiikawa_happy_tears.png"
                                  alt="Chiikawa cảm động"
                                  sfxMuted={sfxMuted}
                                  className="w-16 h-16 sm:w-20 sm:h-20"
                                />
                                <InteractiveChiikawaSticker
                                  src="/chiikawa/chiikawa_choco_heart.png"
                                  alt="Chiikawa ôm trái tim"
                                  sfxMuted={sfxMuted}
                                  className="w-16 h-16 sm:w-20 sm:h-20"
                                />
                                <div
                                  className={`h-px flex-1 max-w-[80px] ${
                                    isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                  }`}
                                />
                              </div>
                            )}

                            {index === 4 && (
                              <div className="py-2 flex items-center justify-center gap-3 select-none">
                                <div
                                  className={`h-px flex-1 max-w-[90px] ${
                                    isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                  }`}
                                />
                                <InteractiveChiikawaSticker
                                  src="/chiikawa/chiikawa_Sparkle.png"
                                  alt="Chiikawa mắt lấp lánh"
                                  sfxMuted={sfxMuted}
                                  className="w-18 h-18 sm:w-20 sm:h-20"
                                />
                                <div
                                  className={`h-px flex-1 max-w-[90px] ${
                                    isDark ? 'bg-rose-800/50' : 'bg-pink-200'
                                  }`}
                                />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      <footer className="max-w-[66ch] mx-auto mt-10 pt-6">
                        <PearlRibbonDivider isDark={isDark} />

                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                          <div className="flex items-center gap-4">
                            <InteractiveChiikawaSticker
                              src="/chiikawa/chiikawa_pochette.png"
                              alt="Chiikawa đeo túi gấu hồng"
                              sfxMuted={sfxMuted}
                              onClick={handleReplayBouquet}
                              title="Nhấn để Chiikawa tặng hoa lần nữa"
                              className="w-22 h-22 sm:w-26 sm:h-26"
                            />
                            <InteractiveChiikawaSticker
                              src="/chiikawa/chiikawa_peace.png"
                              alt="Chiikawa dễ thương"
                              sfxMuted={sfxMuted}
                              className="w-20 h-20 sm:w-24 sm:h-24"
                            />
                          </div>

                          <div className="text-center sm:text-right space-y-2">
                            <p
                              className={`font-display text-xl sm:text-2xl font-semibold ${
                                isDark ? 'text-rose-200' : 'text-[#6e243b]'
                              }`}
                            >
                              Chúc mừng ngày Phụ nữ Việt Nam 20/10!
                            </p>
                            <p
                              className={`font-script text-3xl sm:text-4xl pt-1 ${
                                isDark ? 'text-rose-300' : 'text-[#c2416d]'
                              }`}
                            >
                              Thân thương.
                            </p>
                          </div>
                        </div>
                      </footer>
                    </>
                  )}
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Editorial Footer */}
      <footer
        className={`relative z-20 py-6 text-center text-xs font-ui border-t transition-colors duration-300 ${
          isDark
            ? 'border-rose-950/60 text-rose-300/60 bg-[#0d0306]/80'
            : 'border-pink-200/60 text-[#8c435d]/80 bg-[#fff6f9]/80'
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center">
          <span>Thiệp chúc mừng ngày Phụ nữ Việt Nam 20/10</span>
        </div>
      </footer>
    </div>
  );
}
