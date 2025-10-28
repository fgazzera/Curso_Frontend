import type { Project } from "../../Types/Resume";
import styles from "./ProjectsShowcase.module.css";
import common from "./cvCommon.module.css";

type Props = {
  projects: Project[];
};

export function ProjectsShowcase({ projects }: Props) {
  return (
    <section className={styles.projectsCard}>
      <div className={common.sectionHeader}>
        <h2>Proyectos destacados</h2>
        <p>Trabajos recientes donde lideramos diseno y desarrollo end-to-end.</p>
      </div>
      <div className={styles.projectsGrid}>
        {projects.map((project) => {
          const link = project.liveDemo ?? project.repository;
          const Wrapper = link ? "a" : "div";
          return (
            <Wrapper
              key={project.id}
              className={styles.project}
              {...(link
                ? {
                    href: link,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
            >
              <img className={styles.cover} src={project.coverImage} alt={project.title} />
              <div className={styles.body}>
                <div className={styles.heading}>
                  <h3>{project.title}</h3>
                  <p>{project.client}</p>
                </div>
                <div className={styles.summary}>
                  {project.summary.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <ul className={styles.contributions}>
                  {project.contributions.map((contribution) => (
                    <li key={contribution}>{contribution}</li>
                  ))}
                </ul>
                {project.repository ? <small>Codigo en GitHub</small> : null}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </section>
  );
}
