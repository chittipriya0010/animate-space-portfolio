import Hero from "@/components/main/Hero";
import Skills from "@/components/main/Skills";
import Encryption from "@/components/main/Encryption";
import Projects from "@/components/main/Projects";
import Footer from "@/components/main/Footer";

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="flex flex-col h-[850px] gap-20">
        <Hero />
        <Skills />
        <Encryption />
        <Projects />
        <Footer />
      </main>
    </div>
  );
}
