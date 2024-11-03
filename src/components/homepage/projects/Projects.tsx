import { projects } from "@/lib/data";
import ProjectCard from "./components/ProjectCard";
import { Cover } from "@/components/ui/cover";
export const fakeProjects = [
  {
    id: 1,
    title: "Matthias Leidinger",
    description:
      "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
    src: "/images/projects/project-one.png",
    link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
    color: "#8da4de",
  },
  {
    id: 2,
    title: "Clément Chapillon",
    description:
      "This is a story on the border between reality and imaginary, about the contradictory feelings that the insularity of a rocky, arid, and wild territory provokes”—so French photographer Clément Chapillon describes his latest highly captivating project Les rochers fauves (French for 'The tawny rocks').",
    src: "/images/projects/project-two.png",
    link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
    color: "#424245",
  },
  {
    id: 3,
    title: "Zissou",
    description:
      "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal, they're encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
    src: "/images/projects/project-one.png",
    link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
    color: "#8da4de",
  },
];

const Projects = () => {
  return (
    <section id="work" className="p-6 lg:mb-24 xl:p-0 text-white">
      <h2 className="text-2xl lg:text-4xl font-light text-center uppercase mb-6">
        Work i&apos;m{" "}
        <span className="font-semibold">
          <Cover>proud</Cover> of
        </span>
      </h2>
      <p className="text-sm max-w-[515px] mx-auto text-center text-[#8F9AB2] mb-16">
        Proin blandit molestie neque orci pellentesque curabitur. Consectetur
        malesuada massa in vel tincidunt nec egestas.
      </p>

      <div className="flex flex-col gap-10">
        {fakeProjects.map(({ title, description, src, color }, id) => (
          <ProjectCard
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
