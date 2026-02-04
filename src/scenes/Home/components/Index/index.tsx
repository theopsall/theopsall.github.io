import { Button } from "../../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import landingPage from "../../../../assets/images/landing-page.jpg";
import "./index.css";

// Hoist static JSX to prevent recreation on every render
const avatarSection = (
  <div className="border-avatar">
    <Avatar className="avatar">
      <AvatarImage
        src="https://avatars.githubusercontent.com/theopsall"
        alt="Theo Psallidas avatar"
      />
      <AvatarFallback>TP</AvatarFallback>
    </Avatar>
  </div>
);

const bioText = (
  <p>
    Currently immersed in my Ph.D. journey at the University of Thessaly,
    I boast a rich academic background with a BSc in Computer Science and
    an MSc in Data Science, earned through a collaboration between the
    University of Peloponnese and the National Centre for Scientific
    Research "Demokritos". My passion for technology also finds an outlet
    in my roles as a Software Developer and Research Associate.
  </p>
);

const socialLinks = (
  <div className="social-media">
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
  </div>
);

const projectsButton = (
  <Button className="projects-btn rounded-full" size="lg" asChild>
    <a href="#Projects">Projects</a>
  </Button>
);

const App = () => {
  return (
    <div
      className="main-card"
      style={{
        backgroundImage: `url(${landingPage})`,
      }}
      id="start"
    >
      <div className="portfolio">
        {avatarSection}
        {bioText}
        {socialLinks}
        {projectsButton}
      </div>
    </div>
  );
};

export default App;
