import Hero from "@/components/hero/Hero";
import { RedSpotlight, Spotlight } from "@/components/hero/Spotlight";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
      <div className="max-w-7xl w-full ">
        <Hero />
      </div>
    </main>
  );
}
