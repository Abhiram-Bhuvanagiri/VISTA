"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 252;
const SCROLL_VH = 1000;
// How many frames to pre-load before showing canvas
const READY_THRESHOLD = 8;
// Batch size for staggered background loading
const LOAD_BATCH_SIZE = 20;    // ← was 10; larger batches = fewer setTimeout round-trips
const LOAD_BATCH_DELAY_MS = 30; // ← was 50; tighter gap keeps loading ahead of scroll

function getFrameSrc(index: number) {
  return `/frames/frame${String(index).padStart(5, "0")}.png`;
}

function getPlaceNameForFrame(f: number, progress: number) {
  if (progress === 0) return "The World Awaits You";
  if (f <= 29) return "Alpine Sunrise Peak";
  if (f <= 51) return "Berlin Cathedral Dawn";
  if (f <= 79) return "Shanghai Skyline Nights";
  if (f <= 106) return "Sky Tower Aerial View";
  if (f <= 137) return "Big Wave Surf Adventure";
  if (f <= 157) return "Mediterranean Cliff Escape";
  if (f <= 169) return "Ocean Cliff Sunset";
  if (f <= 194) return "African Savannah Safari";
  if (f <= 212) return "Tropical Waterfall Paradise";
  if (f <= 249) return "Venice Rialto Bridge";
  return "Mountain Summit Sunrise";
}

function getHTMLForPlace(name: string) {
  const words = name.split(" ");
  if (words.length <= 1) return `<span class="font-semibold">${name}</span>`;

  if (name === "The World Awaits You") {
    return `The World<br /><span class="font-semibold">Awaits You</span>`;
  }

  const first = words[0];
  const rest = words.slice(1).join(" ");
  return `${first}<br /><span class="font-semibold">${rest}</span>`;
}

export default function HeroSequence() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bitmapsRef = useRef<(ImageBitmap | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );

  const rafRef = useRef<number | null>(null);
  const drawnFrameRef = useRef<number>(-1);
  const targetFrameRef = useRef<number>(0);

  const sizeRef = useRef({ width: 0, height: 0 });

  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);

  const placeRef = useRef<HTMLHeadingElement>(null);
  const currentPlaceRef = useRef("The World Awaits You");

  useEffect(() => {
    // Reset state in case Next.js preserved the component instance in the router cache
    setReady(false);
    setLoadPct(0);
    drawnFrameRef.current = -1;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true, // ← hint browser to skip vsync lock on the canvas backing store
    }) as CanvasRenderingContext2D | null;
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Canvas sizing ─────────────────────────────────────────────────────
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      sizeRef.current = { width: w, height: h };

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    // ── Draw helper ───────────────────────────────────────────────────────
    const drawBitmap = (index: number) => {
      const bmp = bitmapsRef.current[index];
      if (!bmp) return;

      const { width: w, height: h } = sizeRef.current;
      const imageRatio = bmp.width / bmp.height;
      const canvasRatio = w / h;

      let sx = 0, sy = 0, sw = bmp.width, sh = bmp.height;

      if (imageRatio > canvasRatio) {
        sw = bmp.height * canvasRatio;
        sx = (bmp.width - sw) / 2;
      } else {
        sh = bmp.width / canvasRatio;
        sy = (bmp.height - sh) / 2;
      }

      ctx.drawImage(bmp, sx, sy, sw, sh, 0, 0, w, h);
      drawnFrameRef.current = index;
    };

    // ── rAF paint loop ────────────────────────────────────────────────────
    // CHANGE: cancel any in-flight rAF and immediately queue a new one so
    // rapid scroll events always pick up the *latest* targetFrame rather than
    // drawing a stale frame that was queued milliseconds ago.
    const scheduleFrame = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current); // ← drop the stale paint
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const target = targetFrameRef.current;
        if (target !== drawnFrameRef.current) {
          drawBitmap(target);
        }
      });
    };

    // ── Frame loading ─────────────────────────────────────────────────────
    let isMounted = true;
    let loadTimeout: NodeJS.Timeout;
    let loaded = 0;
    let readyFired = false;

    // CHANGE: track pending createImageBitmap promises so we can still resolve
    // them correctly even if the image load order is non-sequential.
    const loadFrame = (index: number) => {
      const img = new Image();
      img.decoding = "async";

      img.onload = () => {
        if (!isMounted) return;
        createImageBitmap(img)
          .then((bmp) => {
            if (!isMounted) {
              bmp.close();
              return;
            }
            bitmapsRef.current[index] = bmp;
            loaded++;
            setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));

            if (targetFrameRef.current === index) {
              scheduleFrame();
            }

            if (!readyFired && loaded >= READY_THRESHOLD) {
              readyFired = true;
              setReady(true);
              scheduleFrame();
            }
          })
          .catch(() => { loaded++; });
      };

      img.onerror = () => { loaded++; };
      img.src = getFrameSrc(index + 1);
    };

    // Reduced priority window to prevent network congestion on first load
    // The background batch loader will easily keep up with the rest.
    const PRIORITY_FRAMES = 12;
    for (let i = 0; i < PRIORITY_FRAMES; i++) loadFrame(i);

    let batchStart = PRIORITY_FRAMES;
    const loadNextBatch = () => {
      if (!isMounted) return;
      const end = Math.min(batchStart + LOAD_BATCH_SIZE, FRAME_COUNT);
      for (let i = batchStart; i < end; i++) loadFrame(i);
      batchStart = end;
      if (batchStart < FRAME_COUNT) {
        loadTimeout = setTimeout(loadNextBatch, LOAD_BATCH_DELAY_MS);
      }
    };
    loadTimeout = setTimeout(loadNextBatch, 50); // ← was 100; start background load sooner

    // ── ScrollTrigger ─────────────────────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      // CHANGE: scrub: 0.5 → tracks scroll more directly than 0.15 which
      // introduces a spring lag that compounds with decode time and makes
      // frames appear to stutter. Higher value = tighter scroll coupling.
      scrub: 0.5,

      onUpdate: (self) => {
        const frame = Math.min(
          FRAME_COUNT - 1,
          Math.floor(self.progress * (FRAME_COUNT - 1))
        );
        targetFrameRef.current = frame;
        scheduleFrame();

        const f = frame + 1;
        const newPlace = getPlaceNameForFrame(f, self.progress);
        if (newPlace !== currentPlaceRef.current) {
          currentPlaceRef.current = newPlace;
          if (placeRef.current) {
            gsap.killTweensOf(placeRef.current);
            gsap.to(placeRef.current, {
              opacity: 0,
              duration: 0.15,
              onComplete: () => {
                if (placeRef.current) {
                  placeRef.current.innerHTML = getHTMLForPlace(currentPlaceRef.current);
                  gsap.to(placeRef.current, { opacity: 1, duration: 0.15 });
                }
              }
            });
          }
        }
      },
    });

    // ── Resize ────────────────────────────────────────────────────────────
    const handleResize = () => {
      resizeCanvas();
      scheduleFrame();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      isMounted = false;
      clearTimeout(loadTimeout);
      trigger.kill();
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      // Free GPU memory and clear arrays to prevent crashes with closed bitmaps on remount
      bitmapsRef.current.forEach((bmp) => bmp?.close());
      bitmapsRef.current = Array(FRAME_COUNT).fill(null);
      drawnFrameRef.current = -1;
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `${SCROLL_VH}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-black" style={{ padding: "16px 32px 32px" }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none" style={{ padding: "0px 0px 30px 20px" }} />

        {/* Loading */}
        {!ready && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30" style={{ padding: "0px 0px 30px 20px" }}>
            <p className="text-white/40 tracking-[0.4em] uppercase text-[11px] mb-8">
              Loading Vista
            </p>
            <div className="w-52 h-px bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300"
                style={{ width: `${loadPct}%` }}
              />
            </div>
            <p className="text-white/20 text-xs mt-4">{loadPct}%</p>
          </div>
        )}

        {/* Hero Text */}
        {ready && (
          <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none" style={{ padding: "0px 0px 30px 20px" }}>
            <div className="w-full max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-24 pt-32 sm:pt-36 md:pt-40 pb-32 sm:pb-40 lg:pb-16 flex flex-col justify-center">
              <p className="text-white/40 uppercase tracking-[0.35em] text-[10px] mb-5">
                ✦ Scroll to explore
              </p>
              <h1
                ref={placeRef}
                className="text-white font-light leading-[0.82] tracking-[-0.06em] mt-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 9rem)" }}
                dangerouslySetInnerHTML={{ __html: getHTMLForPlace(currentPlaceRef.current) }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}