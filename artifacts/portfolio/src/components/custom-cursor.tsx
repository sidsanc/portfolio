import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const glowX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.6 });
  const glowY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) {
      setIsTouch(true);
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        !!el.closest('a, button, [role="button"], input, textarea, select, label, [tabindex="0"]')
      );
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Glow blob — springs behind the pointer */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9998,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.4) 0%, rgba(129,140,248,0.25) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
        animate={{
          scale: hovering ? 2.4 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", damping: 18, stiffness: 260 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Sharp dot — sits exactly on the pointer */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "rgba(129, 140, 248, 0.95)",
          boxShadow: "0 0 10px rgba(129, 140, 248, 0.7), 0 0 20px rgba(96, 165, 250, 0.3)",
        }}
        animate={{
          scale: hovering ? 0 : 1,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          scale: { type: "spring", damping: 20, stiffness: 400 },
          opacity: { duration: 0.15 },
        }}
      />

      {/* Ring expands on hover */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9997,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(129, 140, 248, 0.35)",
        }}
        animate={{
          scale: hovering ? 1.8 : 0.6,
          opacity: hovering ? 0.7 : 0,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 280,
        }}
      />
    </>
  );
}
