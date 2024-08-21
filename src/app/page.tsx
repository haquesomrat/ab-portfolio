import Companies from "@/components/companies/Companies";
import Services from "@/components/services/Services";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <div className="max-w-[1240px] w-full">
        <Hero />
        <Companies />
      </div>
      <Services />
    </main>
  );
}
