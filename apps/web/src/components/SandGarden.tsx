import { useEffect, useRef, useCallback } from 'react';

export function SandGarden() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Match display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Sand base - Natural Zen sand tone
    ctx.fillStyle = '#E6E0D5';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Subtle natural sand texture
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 8;
      imgData.data[i] = Math.min(255, Math.max(0, imgData.data[i] + noise));
      imgData.data[i + 1] = Math.min(255, Math.max(0, imgData.data[i + 1] + noise));
      imgData.data[i + 2] = Math.min(255, Math.max(0, imgData.data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  }, []);

  useEffect(() => {
    initCanvas();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ('touches' in e) {
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      }
      return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
    };

    const onStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      lastPos.current = getPos(e);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current || !lastPos.current) return;
      e.preventDefault();
      const pos = getPos(e);

      // Shadow stroke (zen rake groove)
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x + 1, lastPos.current.y + 1);
      ctx.lineTo(pos.x + 1, pos.y + 1);
      ctx.strokeStyle = 'rgba(28, 34, 27, 0.09)';
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Highlight stroke (sand crest)
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x - 1, lastPos.current.y - 1);
      ctx.lineTo(pos.x - 1, pos.y - 1);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.stroke();

      lastPos.current = pos;
    };

    const onEnd = () => {
      isDrawing.current = false;
      lastPos.current = null;
    };

    canvas.addEventListener('mousedown', onStart);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseup', onEnd);
    canvas.addEventListener('mouseleave', onEnd);
    canvas.addEventListener('touchstart', onStart, { passive: false });
    canvas.addEventListener('touchmove', onMove, { passive: false });
    canvas.addEventListener('touchend', onEnd);

    return () => {
      canvas.removeEventListener('mousedown', onStart);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseup', onEnd);
      canvas.removeEventListener('mouseleave', onEnd);
      canvas.removeEventListener('touchstart', onStart);
      canvas.removeEventListener('touchmove', onMove);
      canvas.removeEventListener('touchend', onEnd);
    };
  }, [initCanvas]);

  return (
    <section className="py-24 md:py-36 bg-white border-t border-[#E0ECE1]">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#2E7D32] font-semibold">Interactive Experience</p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#132A17] font-normal">Zen Sand Garden</h2>
          <p className="text-sm text-[#506954] font-light mt-3">Drag gently to rake patterns in the sand</p>
        </div>

        {/* Organic rounded canvas container with clean light green border */}
        <div className="relative aspect-[2/1] w-full rounded-[28px] overflow-hidden border border-[#E0ECE1] shadow-sm cursor-crosshair bg-[#EFECE6]">
          <canvas
            ref={canvasRef}
            className="w-full h-full touch-none block"
          />
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={initCanvas}
            className="px-6 py-2.5 rounded-full border border-[#2E7D32] text-[11px] tracking-[0.2em] uppercase text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white transition-all duration-300 bg-white shadow-sm font-medium"
          >
            Reset garden
          </button>
        </div>
      </div>
    </section>
  );
}