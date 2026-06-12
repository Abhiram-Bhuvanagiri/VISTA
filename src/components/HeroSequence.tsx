"use client";

import { useEffect, useRef, useState } from "react";

// ─── Config ────────────────────────────────────────────────────────
const FRAME_COUNT = 252;
// Total scroll height of the video section.
// Higher = slower video playback per px of scroll = smoother experience.
// 1000vh means the user scrolls 10x the viewport height to complete the video.
const SCROLL_VH = 1000;

function getFrameSrc(i: number) {
  return `/frames/frame${String(i).padStart(5, "0")}.png`;
}

// ─── Component ─────────────────────────────────────────────────────
export default function HeroSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );

  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady]     = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── Size canvas to physical pixels (sharp on hi-DPI screens) ──
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    function resizeCanvas() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;
      // CSS size stays at 100% / 100vh — the canvas coord space scales
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();

    // ── Cover-fit draw ─────────────────────────────────────────────
    function drawFrame(idx: number) {
      const img = imagesRef.current[idx];
      if (!img?.complete || !img.naturalWidth) return;

      const ir = img.naturalWidth / img.naturalHeight;
      const cr = W / H;

      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (ir > cr) {               // image wider → crop left/right
        sw = img.naturalHeight * cr;
        sx = (img.naturalWidth - sw) / 2;
      } else {                     // image taller → crop top/bottom
        sh = img.naturalWidth / cr;
        sy = (img.naturalHeight - sh) / 2;
      }

      ctx!.clearRect(0, 0, W, H);
      ctx!.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
    }

    // ── Preload all frames ─────────────────────────────────────────
    let loaded = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img       = new Image();
      img.decoding    = "async";
      img.src         = getFrameSrc(i + 1);
      const onDone    = () => {
        loaded++;
        setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          setReady(true);
          drawFrame(0);
        }
      };
      img.onload  = onDone;
      img.onerror = onDone;
      imagesRef.current[i] = img;
    }

    // ── RAF loop — smooth lerped frame index ───────────────────────
    // We keep a floating-point "displayProgress" and lerp it toward
    // the real scroll progress. This gives buttery frame transitions
    // independent of Lenis lerp.
    let rafId: number;
    let lastDrawnIdx = -1;
    let displayProgress = 0;   // what we actually draw (lerped)

    function loop() {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        const rect           = wrapper.getBoundingClientRect();
        // How far we've scrolled into the wrapper (negative top means scrolled)
        const scrolledPx     = -rect.top;
        const totalScrollPx  = wrapper.offsetHeight - H;
        // Raw target progress 0→1
        const targetProgress = Math.max(0, Math.min(1, scrolledPx / totalScrollPx));

        // Lenis already provides buttery smooth scroll values.
        // Doing a second internal lerp causes slow-scroll unresponsiveness.
        // We track the target perfectly now.
        displayProgress = targetProgress;

        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.floor(displayProgress * FRAME_COUNT)
        );

        if (idx !== lastDrawnIdx) {
          lastDrawnIdx = idx;
          drawFrame(idx);
        }
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    // ── Resize handler ─────────────────────────────────────────────
    const onResize = () => {
      resizeCanvas();
      if (lastDrawnIdx >= 0) drawFrame(lastDrawnIdx);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    /**
     * Outer wrapper: tall scroll container.
     * Its height determines how long (in scroll distance) the video plays.
     * The inner sticky div stays fixed at the top while the page scrolls past.
     */
    <div
      ref={wrapperRef}
      style={{ height: `${SCROLL_VH}vh` }}
      className="relative"
    >
      {/* ── Sticky frame — contains everything visible ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-10" />

        {/* Loading overlay */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30">
            <p className="text-white/40 tracking-[0.4em] uppercase text-[11px] mb-8 font-light">
              Loading Vista
            </p>
            <div className="w-52 h-px bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white/80 transition-[width] duration-150 ease-out"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <p className="text-white/20 text-xs mt-5 font-light tabular-nums">
              {loadPct}%
            </p>
          </div>
        )}

        {/* Hero text — bottom-left, only when loaded */}
        {ready && (
          <div className="absolute inset-x-0 bottom-0 pb-20 px-10 md:px-20 z-20 pointer-events-none">
            <p className="text-white/40 uppercase tracking-[0.35em] text-[10px] mb-5 font-medium">
              ✦&ensp;Scroll to explore
            </p>
            <h1 className="text-white font-light leading-[1.05] tracking-tight drop-shadow-2xl"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
            >
              The World<br />
              <em className="not-italic font-semibold">Awaits You</em>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
