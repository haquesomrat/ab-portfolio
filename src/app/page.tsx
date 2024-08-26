import Companies from "@/components/companies/Companies";
import Services from "@/components/services/Services";
import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import Feedbacks from "@/components/feedbacks/Feedbacks";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <div className="max-w-[1240px] w-full">
        <Hero />
      </div>
      <Companies />
      <Services />
      <div className="max-w-[1240px] w-full">
        <Projects />
      </div>
      <Feedbacks />
      <Footer />
    </main>
  );
}
