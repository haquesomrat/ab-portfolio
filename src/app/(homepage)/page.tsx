import Companies from "@/components/homepage/companies/Companies";
import Expertise from "@/components/homepage/expertise/Expertise";
import Feedbacks from "@/components/homepage/feedbacks/Feedbacks";
import Container from "@/components/global/Container";
import Hero from "@/components/homepage/hero/Hero";
import Projects from "@/components/homepage/projects/Projects";
import Services from "@/components/homepage/services/Services";
import React from "react";

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden -top-6">
      <Container className="w-full">
        <Hero />
      </Container>
      <Companies />
      <Services />
      <Container className="w-full">
        <Projects />
        <Expertise />
      </Container>
      <Feedbacks />
    </main>
  );
};

export default HomePage;
