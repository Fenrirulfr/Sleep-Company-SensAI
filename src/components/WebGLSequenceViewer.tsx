import React, { useEffect, useRef, useState } from 'react';

interface WebGLSequenceViewerProps {
  urls: string[];
  progress: number;
  className?: string;
}

export function WebGLSequenceViewer({ urls, progress, className }: WebGLSequenceViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set());
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Preload images safely without crossOrigin restriction
  useEffect(() => {
    imagesRef.current = new Array(urls.length).fill(null);
    let isMounted = true;

    urls.forEach((url, index) => {
      const img = new Image();
      img.onload = () => {
        if (!isMounted) return;
        imagesRef.current[index] = img;
        setLoadedIndices((prev) => {
          const next = new Set(prev);
          next.add(index);
          return next;
        });
      };
      img.src = url;
      if (img.complete && img.naturalWidth > 0) {
        imagesRef.current[index] = img;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [urls]);

  // Render frame
  const renderFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, w, h);

    const numFrames = urls.length;
    if (numFrames === 0) {
      ctx.restore();
      return;
    }

    const currentProg = Math.max(0, Math.min(1, progressRef.current));
    const targetIndex = Math.min(numFrames - 1, Math.round(currentProg * (numFrames - 1)));

    // Find closest loaded image
    let bestImg: HTMLImageElement | null = imagesRef.current[targetIndex];
    if (!bestImg) {
      // Search outwards for nearest available frame
      for (let offset = 1; offset < numFrames; offset++) {
        if (targetIndex - offset >= 0 && imagesRef.current[targetIndex - offset]) {
          bestImg = imagesRef.current[targetIndex - offset];
          break;
        }
        if (targetIndex + offset < numFrames && imagesRef.current[targetIndex + offset]) {
          bestImg = imagesRef.current[targetIndex + offset];
          break;
        }
      }
    }

    if (bestImg && bestImg.width > 0 && bestImg.height > 0) {
      const scale = Math.max(w / bestImg.width, h / bestImg.height);
      const nw = bestImg.width * scale;
      const nh = bestImg.height * scale;
      const dx = (w - nw) / 2;
      const dy = (h - nh) / 2;

      ctx.drawImage(bestImg, dx, dy, nw, nh);
    }

    ctx.restore();
  };

  // Render on progress change or loaded image updates or resize
  useEffect(() => {
    renderFrame();
  }, [progress, loadedIndices]);

  useEffect(() => {
    const handleResize = () => {
      renderFrame();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className={className || "w-full h-full block"} />;
}
