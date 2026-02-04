import React, { memo } from "react";
import signature from "../../assets/images/signature_white.svg";
import { useHeaderScroll } from "./hooks/useHeaderScroll";
import "./index.css";
import ThemeToggle from "../ThemeToggle";
import { Button } from "../ui/button";

const Header: React.FC = memo(() => {
  const { isScrolled } = useHeaderScroll();

  const navbarClass = isScrolled ? "navbar scrolled" : "navbar";

  return (
    <nav className={navbarClass}>
      <a className="navbar-brand" href="#start">
        <img src={signature} alt="Theo Psallidas" className="signature" />
      </a>
      <div className="navbar-links">
        <Button variant="ghost" className="nav-link" asChild>
          <a href="#AboutMe">About Me</a>
        </Button>
        <Button variant="ghost" className="nav-link" asChild>
          <a href="#Projects">Projects</a>
        </Button>
        <Button variant="ghost" className="nav-link" asChild>
          <a href="#Contact">Contact</a>
        </Button>
        <div className="theme-toggle">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
});

Header.displayName = 'Header';

export default Header;
