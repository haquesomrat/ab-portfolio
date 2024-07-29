import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5 lg:p-24">
      <div className="max-w-7xl w-full">
        <Hero />
      </div>
    </main>
  );
}
