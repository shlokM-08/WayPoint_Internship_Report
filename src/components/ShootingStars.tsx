import { useEffect, useRef } from 'react';
import './ShootingStars.css';

const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      trailLength: number;

      constructor() {
        if (!canvas) {
          this.x = 0;
          this.y = 0;
          this.size = 0;
          this.speed = 0;
          this.opacity = 0;
          this.trailLength = 0;
          return;
        }
        
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 3 + 2;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.trailLength = Math.random() * 50 + 20;
      }

      update() {
        if (!canvas) return;
        
        this.x += this.speed;
        this.y += this.speed * 0.5;

        if (this.x > canvas.width || this.y > canvas.height) {
          this.x = Math.random() * canvas.width * 0.5;
          this.y = Math.random() * canvas.height * 0.5;
        }
      }

      draw() {
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(
          this.x - this.trailLength,
          this.y - this.trailLength,
          this.x,
          this.y
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x - this.trailLength, this.y - this.trailLength);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars: Star[] = [];
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="shooting-stars-container">
      <canvas ref={canvasRef} className="shooting-stars-canvas" />
    </div>
  );
};

export default ShootingStars;

