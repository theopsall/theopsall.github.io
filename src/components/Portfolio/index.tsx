import React from 'react';
import './index.css';
import Masthead from './components/Masthead';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Education from './components/Education';
import Projects from './components/Projects';
import Footer from './components/Footer';

const Portfolio: React.FC = () => (
  <main id="top" className="pf">
    <Masthead />
    <Experience />
    <Publications />
    <Education />
    <Projects />
    <Footer />
  </main>
);

export default Portfolio;
