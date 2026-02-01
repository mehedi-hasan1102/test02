'use client';

import SmoothScroll from './components/SmoothScroll';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <About />
        <Skills />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
