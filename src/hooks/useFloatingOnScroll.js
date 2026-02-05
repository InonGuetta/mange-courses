import { useRef, useEffect, useState } from "react";

const NAVBAR_HEIGHT = 64;

export const useFloatingOnScroll = () => {
  const [isFixed, setIsFixed] = useState(false);
  const floatingRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!floatingRef.current || !titleRef.current) return;
      const titleBottom = titleRef.current.getBoundingClientRect().bottom + window.scrollY;
      setIsFixed(window.scrollY > titleBottom - NAVBAR_HEIGHT - 16);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const floatingContainerSx = {
    display: "flex",
    justifyContent: "center",
    position: isFixed ? "fixed" : "static",
    top: isFixed ? `${NAVBAR_HEIGHT + 16}px` : undefined,
    left: isFixed ? 0 : undefined,
    width: isFixed ? "100vw" : undefined,
    zIndex: isFixed ? 1202 : undefined,
    pointerEvents: "none",
  };

  return { isFixed, floatingRef, titleRef, floatingContainerSx };
};
