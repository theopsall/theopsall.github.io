import { useEffect, useState, useRef } from "react";

export const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const frameId = useRef<number | null>(null);
  const threshold = 16;

  const handleScroll = (): void => {
    // Cancel previous frame if still pending
    if (frameId.current !== null) {
      cancelAnimationFrame(frameId.current);
    }

    // Use requestAnimationFrame for smooth 60fps
    frameId.current = requestAnimationFrame(() => {
      const currentScrollPosition = window.scrollY;
      setIsScrolled(currentScrollPosition > threshold);
    });
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return { isScrolled };
};
