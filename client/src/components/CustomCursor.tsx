/*
 * REDLINE TERMINAL — CustomCursor
 * Red crosshair ring with possum-themed inner dot
 * Expands on hover over clickable elements
 */
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current && dotRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`;
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onEnterClickable = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.skill-tag') ||
        target.closest('.project-card')
      ) {
        setIsHovering(true);
      }
    };

    const onLeaveClickable = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', onEnterClickable);
    document.addEventListener('mouseleave', onLeaveClickable);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', onEnterClickable);
      document.removeEventListener('mouseleave', onLeaveClickable);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Outer ring — crosshair */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition: 'width 0.15s ease, height 0.15s ease, opacity 0.15s ease',
          ...(isHovering ? { width: 56, height: 56, marginLeft: -8, marginTop: -8 } : {}),
        }}
      >
        {/* Crosshair ring */}
        <svg
          width={isHovering ? 56 : 40}
          height={isHovering ? 56 : 40}
          viewBox="0 0 40 40"
          fill="none"
          style={{ transition: 'all 0.15s ease' }}
        >
          {/* Outer circle */}
          <circle
            cx="20" cy="20" r="18"
            stroke="#DC143C"
            strokeWidth={isClicking ? 2.5 : 1.5}
            strokeDasharray="4 4"
            opacity={isHovering ? 1 : 0.8}
            style={{ transition: 'all 0.15s ease' }}
          />
          {/* Crosshair lines */}
          <line x1="20" y1="2" x2="20" y2="10" stroke="#DC143C" strokeWidth="1.5" />
          <line x1="20" y1="30" x2="20" y2="38" stroke="#DC143C" strokeWidth="1.5" />
          <line x1="2" y1="20" x2="10" y2="20" stroke="#DC143C" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="38" y2="20" stroke="#DC143C" strokeWidth="1.5" />
          {/* Corner brackets */}
          {isHovering && (
            <>
              <path d="M8 4 L4 4 L4 8" stroke="#DC143C" strokeWidth="1.5" fill="none" />
              <path d="M32 4 L36 4 L36 8" stroke="#DC143C" strokeWidth="1.5" fill="none" />
              <path d="M8 36 L4 36 L4 32" stroke="#DC143C" strokeWidth="1.5" fill="none" />
              <path d="M32 36 L36 36 L36 32" stroke="#DC143C" strokeWidth="1.5" fill="none" />
            </>
          )}
        </svg>
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          backgroundColor: isClicking ? '#ff4444' : '#DC143C',
          borderRadius: '50%',
          boxShadow: `0 0 ${isHovering ? 12 : 6}px rgba(220,20,60,0.8)`,
          transition: 'box-shadow 0.15s ease, background-color 0.1s ease',
        }}
      />
    </>
  );
}
