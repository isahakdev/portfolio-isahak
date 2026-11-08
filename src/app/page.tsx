
import Hero from "@/components/sections/Hero";

import {
  ArrowUpRight,
  Code2,
  Mail,
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Bazar Dor",
    category: "Web Application",
    description:
      "A project showcase for a modern digital shopping experience.",
    technologies: ["React", "TypeScript", "Node.js"],
  },
  {
    number: "02",
    name: "LexiLearn",
    category: "Learning Platform",
    description:
      "An educational project focused on an engaging learning experience.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "03",
    name: "Personal Portfolio",
    category: "Portfolio Website",
    description:
      "A personal space to present development work and creative ideas.",
    technologies: ["Next.js", "React", "Motion"],
  },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend & Database",
    skills: ["Node.js", "MongoDB", "Python"],
  },
  {
    title: "Tools",
    skills: ["Git", "GitHub", "VS Code", "AI Tools"],
  },
  {
    title: "Other Skills",
    skills: [
      "Problem Solving",
      "Responsive Design",
      "API Integration",
    ],
  },
];

export default function Home() {
  return (
    <div className="page-background overflow-hidden">

      {/* HERO SECTION */}
      <Hero />

      {/* ABOUT SECTION */}
      <section id="about" className="section-padding">
        <div className="container-custom">

          <div className="section-heading">
            <span className="section-label">
              About Me
            </span>

            <h2 className="section-title">
              Turning ideas into
              <span className="gradient-text">
                {" "}digital reality.
              </span>
            </h2>

            <p className="section-description">
              I enjoy building useful digital products with
              modern web technologies, thoughtful design and
              maintainable code.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <div className="premium-card p-7">
              <p className="text-4xl font-bold">2+</p>
              <p className="mt-2 text-sm text-muted">
                Years of experience
              </p>
            </div>

            <div className="premium-card p-7">
              <p className="text-4xl font-bold">Full Stack</p>
              <p className="mt-2 text-sm text-muted">
                Development focus
              </p>
            </div>

            <div className="premium-card p-7">
              <p className="text-4xl font-bold">Modern</p>
              <p className="mt-2 text-sm text-muted">
                Web technologies
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="section-padding bg-(--surface)"
      >
        <div className="container-custom">

          <div className="section-heading">
            <span className="section-label">
              Selected Work
            </span>

            <h2 className="section-title">
              Projects I&apos;ve
              <span className="gradient-text">
                {" "}worked on.
              </span>
            </h2>

            <p className="section-description">
              A selection of projects that represent my
              interests in web development and digital products.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {projects.map((project) => (
              <article
                key={project.number}
                className="premium-card group overflow-hidden"
              >

                <div className="relative flex aspect-16/10 items-center justify-center overflow-hidden bg-gradient-to-br from-[#d9fbf2] via-[#e8e5ff] to-[#ffe2ef]">

                  <span className="text-4xl font-bold tracking-tighter text-slate-800/70 transition duration-500 group-hover:scale-110 sm:text-5xl">
                    {project.name}
                  </span>

                  <span className="absolute left-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur">
                    {project.number}
                  </span>

                </div>

                <div className="p-6">

                  <p className="text-xs font-semibold uppercase tracking-widest text-(--primary-strong)">
                    {project.category}
                  </p>

                  <h3 className="mt-3 text-xl font-bold">
                    {project.name}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="tech-tag"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-muted">
                    Project showcase
                    <ArrowUpRight size={16} />
                  </div>

                </div>
              </article>
            ))}

          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section-padding">
        <div className="container-custom">

          <div className="section-heading">
            <span className="section-label">
              My Skills
            </span>

            <h2 className="section-title">
              Technologies I
              <span className="gradient-text">
                {" "}work with.
              </span>
            </h2>

            <p className="section-description">
              Tools and technologies I use to build and improve
              modern web applications.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="premium-card p-7"
              >

                <h3 className="text-lg font-bold">
                  {group.title}
                </h3>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="tech-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        className="section-padding bg-(--surface)"
      >
        <div className="container-custom">

          <div className="section-heading">
            <span className="section-label">
              Experience
            </span>

            <h2 className="section-title">
              Growing through
              <span className="gradient-text">
                {" "}experience.
              </span>
            </h2>

            <p className="section-description">
              My professional journey in web development.
              Detailed roles and dates can be added when ready.
            </p>
          </div>

          <div className="premium-card p-7 sm:p-10">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-semibold text-(--primary-strong)">
                  Professional Journey
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Full Stack Web Development
                </h3>

                <p className="mt-2 text-sm text-muted">
                  Freelance · 2+ Years Experience
                </p>
              </div>

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-(--surface-secondary)">
                <Code2 size={28} />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding">
        <div className="container-custom">

          <div className="relative overflow-hidden rounded-[32px] border border-(--card-border) bg-(--surface) p-8 sm:p-14 lg:p-20">

            <div className="soft-glow soft-glow-cyan -right-20 -top-40" />
            <div className="soft-glow soft-glow-purple -bottom-40 -left-20" />

            <div className="relative max-w-3xl">

              <span className="section-label">
                Get In Touch
              </span>

              <h2 className="mt-6 text-4xl font-bold leading-tight tracking-[-0.055em] sm:text-6xl">
                Have a project in mind?
                <span className="gradient-text">
                  {" "}Let&apos;s talk.
                </span>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-muted">
                I&apos;m open to discussing freelance opportunities,
                collaborations and interesting ideas.
              </p>

              <a
                href="mailto:isahak.seo@gmail.com"
                className="btn-primary mt-9"
              >
                Send Me an Email
                <Mail size={18} />
              </a>

              <div className="mt-10 flex flex-wrap gap-5 text-sm text-muted">

                <a
                  href="https://github.com/isahakdev"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-(--primary-strong)"
                >
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/md-isahak-ali/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-(--primary-strong)"
                >
                  LinkedIn
                </a>

                <a
                  href="https://wa.me/8801328613789"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-(--primary-strong)"
                >
                  WhatsApp
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-(--border) py-8">
        <div className="container-custom flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">

          <p>© Isahak Ali. All rights reserved.</p>

          <p>Designed &amp; built with care.</p>

          <a
            href="#home"
            className="flex items-center gap-2 transition hover:text-(--primary-strong)"
          >
            Back to top
            <ArrowUpRight size={15} />
          </a>

        </div>
      </footer>

    </div>
  );
}
