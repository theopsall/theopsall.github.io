import React from 'react';
import { CVPrompt } from '../helpers';

const _now = new Date();
const _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const SESSION_LOGIN = `${_days[_now.getDay()]} ${_months[_now.getMonth()]} ${String(_now.getDate()).padStart(2, ' ')} ${String(_now.getHours()).padStart(2, '0')}:${String(_now.getMinutes()).padStart(2, '0')}:${String(_now.getSeconds()).padStart(2, '0')}`;

const Intro: React.FC = () => (
  <>
    <p className="cv-intro">
      Last login: {SESSION_LOGIN} on ttys002 · Welcome to tpsallidas.dev //&nbsp; cv-runtime v2.7.1
    </p>
    <CVPrompt cmd="whoami --bio" />
    <p className="cv-output-bright">
      ▸ Theodoros Psallidas — AI &amp; Software Engineer · Athens, Greece · building reliable LLM-powered systems
    </p>
    <CVPrompt cmd="cat about.md" hint="# ~80 words" />
    <p className="cv-output-normal">
      I'm an AI / software engineer based in Athens, Greece 🇬🇷 with a decade of shipping production systems — from
      real-time backends to LLM pipelines. These days I spend most of my time designing retrieval-augmented agents,
      evaluating them like a scientist, and wiring them into products people actually use. I care about legible
      systems, tight feedback loops, and code that still makes sense at 3am.
    </p>
  </>
);

export default Intro;
