import React from "react";
import "./index.css";
import { SiGooglescholar } from "react-icons/si";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="page-footer">
      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://scholar.google.com/citations?user=478yYkIAAAAJ&hl=el"
          target="_blank"
          rel="noreferrer"
          aria-label="Google Scholar"
        >
          <SiGooglescholar />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://github.com/theopsall"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://www.linkedin.com/in/tpsallidas/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </Button>
      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://twitter.com/TheoPsallidas"
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
        >
          <FaTwitter />
        </a>
      </Button>
    </footer>
  );
};

export default React.memo(Footer);
