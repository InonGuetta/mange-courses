import { useRef, useEffect, useState, useCallback } from "react";

const NAVBAR_HEIGHT = 64;

export const useFloatingOnScroll = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [floatingHeight, setFloatingHeight] = useState(0);
  const floatingRef = useRef(null);
  const titleRef = useRef(null);
  const triggerPointRef = useRef(0);

  useEffect(() => {
    const calculateTriggerPoint = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        triggerPointRef.current = rect.bottom + window.scrollY - NAVBAR_HEIGHT - 16;
      }
      if (floatingRef.current) {
        setFloatingHeight(floatingRef.current.offsetHeight);
      }
    };

    calculateTriggerPoint();
    
    const handleScroll = () => {
      setIsFixed(window.scrollY > triggerPointRef.current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", calculateTriggerPoint);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateTriggerPoint);
    };
  }, []);

  const floatingContainerSx = {
    display: "flex",
    justifyContent: "center",
    position: isFixed ? "fixed" : "static",
    top: isFixed ? `${NAVBAR_HEIGHT + 16}px` : undefined,
    left: isFixed ? "50%" : undefined,
    transform: isFixed ? "translateX(-50%)" : undefined,
    zIndex: isFixed ? 1202 : undefined,
    pointerEvents: "none",
  };

  const placeholderSx = {
    height: isFixed ? floatingHeight : 0,
    transition: "height 0.1s ease",
  };

  return { isFixed, floatingRef, titleRef, floatingContainerSx, placeholderSx };
};
