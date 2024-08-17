import Companies from "@/components/companies/Companies";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <div className="max-w-7xl w-full ">
        <Hero />
        <Companies />
      </div>
    </main>
  );
}
