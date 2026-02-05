'use client';

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
// import About from './components/About';
import WhatIDo from './components/WhatIDo';
import Skills from './components/Skills';
// import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DiagonalMarquee from './components/DiagonalMarquee';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        {/* <About /> */}
        <DiagonalMarquee />
        <WhatIDo />
        <Projects />

        <Skills />
        {/* <Experience /> */}


        <Contact />
      </main>






    </SmoothScroll>
  );
}
