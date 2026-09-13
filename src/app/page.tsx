import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-full bg-black min-h-screen text-white overflow-hidden">
      <div id="scroll-container" className="relative z-10 w-full flex flex-col">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
