import { useRef, useEffect } from "react";

const StarCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2,
      opacity: Math.random(),
      dx: (Math.random() - 0.5) * 0.75,
      dy: (Math.random() - 0.5) * 0.75,
    }));

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stars.forEach((star) => {
        star.opacity += (Math.random() - 0.5) * 0.15;
        star.opacity = Math.max(0.1, Math.min(star.opacity, 1));

        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0) star.x = window.innerWidth;
        if (star.y < 0) star.y = window.innerHeight;
        if (star.x > window.innerWidth) star.x = 0;
        if (star.y > window.innerHeight) star.y = 0;

        ctx.beginPath();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = "#fff";
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
    />
  );
};

export default StarCanvas;
