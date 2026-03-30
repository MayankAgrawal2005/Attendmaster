// import React, { useEffect, useRef } from 'react';

// export const ParticleCanvas = () => {
//   const ref = useRef(null);

//   useEffect(() => {
//     const canvas = ref.current;
//     const ctx = canvas.getContext('2d');

//     let w = (canvas.width = window.innerWidth);
//     let h = (canvas.height = window.innerHeight);

//     const particles = Array.from({ length: 80 }, () => ({
//       x: Math.random() * w,
//       y: Math.random() * h,
//       r: Math.random() * 1.5 + 0.5,
//       dx: (Math.random() - 0.5) * 0.3,
//       dy: (Math.random() - 0.5) * 0.3,
//       opacity: Math.random() * 0.5 + 0.2,
//     }));

//     let animationFrame;

//     const draw = () => {
//       ctx.clearRect(0, 0, w, h);

//       particles.forEach((p) => {
//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(139,92,246,${p.opacity})`;
//         ctx.fill();

//         p.x += p.dx;
//         p.y += p.dy;

//         if (p.x < 0 || p.x > w) p.dx *= -1;
//         if (p.y < 0 || p.y > h) p.dy *= -1;
//       });

//       animationFrame = requestAnimationFrame(draw);
//     };

//     draw();

//     const handleResize = () => {
//       w = canvas.width = window.innerWidth;
//       h = canvas.height = window.innerHeight;
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       cancelAnimationFrame(animationFrame);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={ref}
//       className="fixed inset-0 z-0 pointer-events-none"
//     />
//   );
// };


import React, { useEffect, useRef } from 'react';

export const ParticleCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const blobs = Array.from({ length: 6 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 120 + Math.random() * 100,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5,
      color: `hsla(${Math.random() * 360}, 80%, 60%, 0.15)`
    }));

    let animationFrame;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      blobs.forEach((b) => {
        const gradient = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.r
        );

        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        // movement
        b.x += b.dx;
        b.y += b.dy;

        // bounce
        if (b.x < 0 || b.x > w) b.dx *= -1;
        if (b.y < 0 || b.y > h) b.dy *= -1;
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};