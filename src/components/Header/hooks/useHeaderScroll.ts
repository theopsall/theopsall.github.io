import { useEffect, useState } from "react";

export const useHeaderScroll = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const threshold = 16;

  const handleScroll = (): void => {
    const currentScrollPosition = window.scrollY;
    setIsScrolled(currentScrollPosition > threshold);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { isScrolled };
};
