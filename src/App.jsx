import { About } from './components/About.jsx';
import { Approach } from './components/Approach.jsx';
import { ContactFooter } from './components/ContactFooter.jsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { Services } from './components/Services.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
  useScrollReveal();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <ContactFooter />
      </main>
      <FloatingWhatsApp />
    </>
  );
}
