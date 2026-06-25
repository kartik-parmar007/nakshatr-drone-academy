import { useEffect, useRef, useState } from "react";

// Custom hook to detect responsive breakpoints cleanly in JS
function useScreenSize() {
  const [screenSize, setScreenSize] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setScreenSize("desktop");
      } else if (w >= 768) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
}

export function PhilosophyHero() {
  const screenSize = useScreenSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Scroll scrubbing targets and state
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  
  // Seek-lock flag to prevent overloading browser decoder
  const isSeeking = useRef(false);

  // Mouse inertia coordinates
  const targetMousePos = useRef({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const mouseFrameRef = useRef<number | null>(null);

  // Determine correct video source based on screen size
  const videoSrc = screenSize === "desktop" 
    ? "/video/laptop video.mp4" 
    : "/video/mobile video.mp4"; // Mobile and tablet use mobile video.mp4

  // 1. Calculate Scroll Progress relative to the sticky track
  useEffect(() => {
    const calculateProgress = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;

      if (scrollableHeight <= 0) return;

      // rect.top is negative when the track starts moving past the top of the viewport
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      targetProgress.current = progress;
    };

    // Run once initially to capture static scroll state
    calculateProgress();

    window.addEventListener("scroll", calculateProgress, { passive: true });
    window.addEventListener("resize", calculateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", calculateProgress);
      window.removeEventListener("resize", calculateProgress);
    };
  }, []);

  // 2. Hardware-Synchronized requestAnimationFrame Loop to smooth video scrub
  // Source videos are encoded with every frame as a keyframe (see public/video),
  // so currentTime seeks resolve in a single frame decode instead of walking a GOP.
  // That makes per-frame seeking cheap enough to drop the old 25fps seek throttle
  // and the wait for the previous "seeked" event, which is what produced the
  // step-and-pause "video scrubbing" feel instead of a continuously-tracking render.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastSeekStart = 0;

    const handleSeeked = () => {
      isSeeking.current = false;
    };

    video.addEventListener("seeked", handleSeeked);

    let lastFrameTime = performance.now();

    const updateScrub = () => {
      const vid = videoRef.current;

      if (!vid || !vid.duration || isNaN(vid.duration)) {
        scrollFrameRef.current = requestAnimationFrame(updateScrub);
        return;
      }

      const now = performance.now();
      const deltaTime = Math.min(50, now - lastFrameTime);
      lastFrameTime = now;

      // Time-based exponential smoothing (independent of refresh rate). Tuned tighter
      // than a typical scroll-fade ease so the drone tracks the scrollbar closely,
      // like a live render, while still absorbing discrete wheel/trackpad ticks.
      const rate = 0.02;
      const diff = targetProgress.current - currentProgress.current;

      if (Math.abs(diff) > 0.00005) {
        currentProgress.current += diff * (1 - Math.exp(-rate * deltaTime));
      } else {
        currentProgress.current = targetProgress.current;
      }

      // Self-heals if a "seeked" event is ever dropped by the browser, so the lock
      // can't get stuck and silently freeze the scrub.
      if (isSeeking.current && now - lastSeekStart > 150) {
        isSeeking.current = false;
      }

      if (!isSeeking.current) {
        const nextTime = currentProgress.current * vid.duration;

        // Half a source frame (~24fps) — finer than the old 0.03s gate, since seeks
        // are now near-instant and we want every visible frame to register.
        if (Math.abs(vid.currentTime - nextTime) > 1 / 48) {
          isSeeking.current = true;
          lastSeekStart = now;
          vid.currentTime = nextTime;
        }
      }

      scrollFrameRef.current = requestAnimationFrame(updateScrub);
    };

    scrollFrameRef.current = requestAnimationFrame(updateScrub);

    return () => {
      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
      video.removeEventListener("seeked", handleSeeked);
    };
  }, [videoSrc]);

  // 3. Reset/Initialize video playback states when src changes
  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    const video = videoRef.current;
    if (video) {
      video.pause(); // Ensure standard autoplay is disabled
      isSeeking.current = false; // Reset lock
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = targetProgress.current * video.duration;
      }
    }
  };

  // 4. Desktop Mouse Parallax with smooth lerp inertia
  useEffect(() => {
    const isDesktop = screenSize === "desktop";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (!isDesktop || prefersReducedMotion) {
      if (videoWrapperRef.current) {
        videoWrapperRef.current.style.transform = "translate3d(0px, 0px, 0px) scale(1.05)";
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Target range bounded to X ±12px, Y ±8px
      targetMousePos.current = { x: nx * 12, y: ny * 8 };
    };

    const updateParallax = () => {
      const ease = 0.04; // Smooth lag inertia
      currentMousePos.current.x += (targetMousePos.current.x - currentMousePos.current.x) * ease;
      currentMousePos.current.y += (targetMousePos.current.y - currentMousePos.current.y) * ease;

      if (videoWrapperRef.current) {
        // Shift using translate3d (GPU accelerated) + scale(1.05) to mask edge translation
        videoWrapperRef.current.style.transform = `translate3d(${-currentMousePos.current.x}px, ${-currentMousePos.current.y}px, 0) scale(1.05)`;
      }

      mouseFrameRef.current = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    mouseFrameRef.current = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (mouseFrameRef.current) {
        cancelAnimationFrame(mouseFrameRef.current);
      }
    };
  }, [screenSize]);

  return (
    /* Sticky Container: Height controls the total scrollable track length */
    <div
      ref={containerRef}
      className="relative h-[500vh] w-full bg-[#080809]"
    >
      {/* Sticky Viewport Area */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080809] border-b border-[#1c1d24]">
        
        {/* ── Cinematic Video Wrapper ── */}
        <div 
          ref={videoWrapperRef}
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          style={{ transform: "scale(1.05)" }}
        >
          <video
            ref={videoRef}
            src={videoSrc}
            preload="auto"
            muted
            playsInline
            onLoadedMetadata={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            className={`w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* ── Visual atmospheric overlays only (No text) ── */}
        {/* Top soft blend to dark navbar */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#080809] via-[#080809]/60 to-transparent pointer-events-none z-10" />
        
        {/* Bottom soft blend to subsequent sections */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080809] via-[#080809]/60 to-transparent pointer-events-none z-10" />

        {/* Subtle center radial blue glow */}
        <div className="absolute inset-0 radial-glow-center pointer-events-none z-10" />
      </div>
    </div>
  );
}
