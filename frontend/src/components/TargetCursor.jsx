import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  cursorColor = '#111827',
  cursorColorOnTarget = '#6366f1',
}) => {
  const cursorEl = useRef(null);
  const dotEl = useRef(null);
  const corners = useRef([]);
  const spinTl = useRef(null);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  }, []);

  useEffect(() => {
    if (isMobile || !cursorEl.current) return;

    // ---- hide the native cursor ----
    if (hideDefaultCursor) document.body.style.cursor = 'none';

    const el = cursorEl.current;
    const dot = dotEl.current;
    const c = corners.current;           // [TL, TR, BR, BL]
    const S = 12;                        // cornerSize px
    const B = 3;                         // borderWidth px

    // Starting resting offsets for each corner
    const rest = [
      { x: -S * 1.5, y: -S * 1.5 },     // TL
      { x:  S * 0.5, y: -S * 1.5 },     // TR
      { x:  S * 0.5, y:  S * 0.5 },     // BR
      { x: -S * 1.5, y:  S * 0.5 },     // BL
    ];

    // Place everything off-screen initially; snap on first move
    gsap.set(el,  { xPercent: -50, yPercent: -50, x: -200, y: -200 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    c.forEach((corner, i) => gsap.set(corner, rest[i]));

    // Spin
    spinTl.current = gsap.timeline({ repeat: -1 })
      .to(el, { rotation: '+=360', duration: spinDuration, ease: 'none' });

    // ---- Mouse move ----
    let firstMove = false;
    const onMove = (e) => {
      if (!firstMove) {
        firstMove = true;
        gsap.set(el, { x: e.clientX, y: e.clientY });
      }
      gsap.to(el, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'power3.out', overwrite: 'auto' });
    };

    // ---- Click press / release ----
    const onDown = () => {
      gsap.to(el, { scale: 0.85, duration: 0.15, ease: 'power2.out' });
    };
    const onUp = () => {
      gsap.to(el, { scale: 1, duration: 0.25, ease: 'back.out(1.4)' });
    };

    // ---- Hover: snap corners to target bounding box ----
    let activeTarget = null;
    let leaveCleanup = null;

    const snapToTarget = (target) => {
      if (activeTarget === target) return;
      activeTarget = target;

      const rect = target.getBoundingClientRect();
      const targets = [
        { x: rect.left  - B,        y: rect.top    - B },           // TL
        { x: rect.right + B - S,    y: rect.top    - B },           // TR
        { x: rect.right + B - S,    y: rect.bottom + B - S },       // BR
        { x: rect.left  - B,        y: rect.bottom + B - S },       // BL
      ];

      // Stop spin, set rotation to 0
      spinTl.current?.pause();
      gsap.to(el, { rotation: 0, duration: 0.2, ease: 'power2.out' });

      // Change colors
      gsap.to(c, { borderColor: cursorColorOnTarget, duration: 0.15 });
      gsap.to(dot, { backgroundColor: cursorColorOnTarget, duration: 0.15 });

      // Animate corners to target positions in SCREEN space.
      // Since el uses xPercent:-50/yPercent:-50 centred on mouse, we
      // compute relative offsets each ticker tick for parallax.
      const tickerFn = () => {
        const mx = gsap.getProperty(el, 'x');
        const my = gsap.getProperty(el, 'y');
        targets.forEach((t, i) => {
          gsap.set(c[i], { x: t.x - mx, y: t.y - my });
        });
      };
      gsap.ticker.add(tickerFn);

      const handleLeave = () => {
        gsap.ticker.remove(tickerFn);
        activeTarget = null;
        leaveCleanup = null;

        // Restore colors
        gsap.to(c, { borderColor: cursorColor, duration: 0.15 });
        gsap.to(dot, { backgroundColor: cursorColor, duration: 0.15 });

        // Return corners to resting positions
        c.forEach((corner, i) =>
          gsap.to(corner, { ...rest[i], duration: 0.35, ease: 'power3.out' })
        );

        // Resume spin
        gsap.to(el, { rotation: 0, duration: 0 });
        spinTl.current?.play();

        target.removeEventListener('mouseleave', handleLeave);
      };

      leaveCleanup = handleLeave;
      target.addEventListener('mouseleave', handleLeave);
    };

    const onOver = (e) => {
      const target = e.target?.closest(targetSelector);
      if (target) snapToTarget(target);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver, { passive: true });

    // Handle cursor leaving the viewport
    const onLeaveDoc = () => {
      gsap.to(el, { opacity: 0, duration: 0.2 });
    };
    const onEnterDoc = () => {
      gsap.to(el, { opacity: 1, duration: 0.2 });
    };
    document.addEventListener('mouseleave', onLeaveDoc);
    document.addEventListener('mouseenter', onEnterDoc);

    return () => {
      document.body.style.cursor = '';
      spinTl.current?.kill();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('mouseenter', onEnterDoc);
      if (leaveCleanup) leaveCleanup();
    };
  }, [isMobile, hideDefaultCursor, spinDuration, targetSelector, cursorColor, cursorColorOnTarget]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorEl}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      {/* Centre dot */}
      <div
        ref={dotEl}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: cursorColor,
          willChange: 'transform',
        }}
      />

      {/* 4 corners: TL, TR, BR, BL */}
      {[
        { borderRight: 'none', borderBottom: 'none' },
        { borderLeft:  'none', borderBottom: 'none' },
        { borderLeft:  'none', borderTop:    'none'  },
        { borderRight: 'none', borderTop:    'none'  },
      ].map((borderStyle, i) => (
        <div
          key={i}
          ref={el => { corners.current[i] = el; }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 12,
            height: 12,
            border: `3px solid ${cursorColor}`,
            willChange: 'transform',
            ...borderStyle,
          }}
        />
      ))}
    </div>
  );
};

export default TargetCursor;
