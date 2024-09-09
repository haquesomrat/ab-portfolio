import { projects } from "@/lib/data";
import WorkCard from "./components/ProjectCard";

const Projects = () => {
  return (
    <section id="work" className="p-6 lg:mb-24 xl:p-0 text-white">
      <h2 className="text-2xl lg:text-4xl font-light text-center uppercase mb-6">
        Work i&apos;m <span className="font-semibold">proud</span> of
      </h2>
      <p className="text-sm max-w-[515px] mx-auto text-center text-[#8F9AB2] mb-16">
        Proin blandit molestie neque orci pellentesque curabitur. Consectetur
        malesuada massa in vel tincidunt nec egestas.
      </p>

      <div className="space-y-10">
        {projects.map(({ title, description, src, color }, id) => (
          <WorkCard
            key={id}
            title={title}
            description={description}
            src={src}
            color={color}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
