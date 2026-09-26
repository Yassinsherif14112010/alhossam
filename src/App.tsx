import { LanguageProvider } from './lib/i18n';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Approach, Intro, Marquee, Practice, Principles } from './components/Sections';
import Insights from './components/Insights';
import Contact, { Location } from './components/Contact';
import Footer, { FloatingActions } from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-ink antialiased">
        <Navbar />
        <main>
          <Hero />
          <Marquee />
          <Intro />
          <About />
          <Practice />
          <Approach />
          <Principles />
          <Insights />
          <Contact />
          <Location />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}

export default App;
