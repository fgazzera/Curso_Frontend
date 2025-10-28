import type { Experience } from "../../Types/Resume";
import styles from "./ExperienceTimeline.module.css";
import common from "./cvCommon.module.css";

type Props = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: Props) {
  return (
    <section className={styles.timelineCard}>
      <div className={common.sectionHeader}>
        <h2>Experiencia profesional</h2>
        <p>Colaboraciones clave y aprendizajes de los ultimos anos.</p>
      </div>
      <ol className={styles.timelineList}>
        {experiences.map((experience) => (
          <li className={styles.timelineItem} key={experience.id}>
            <div className={styles.timelineHead}>
              <div>
                <h3 className={styles.role}>{experience.role}</h3>
                <p className={styles.company}>{experience.company}</p>
              </div>
              <div className={styles.meta}>
                <span>{experience.timeframe}</span>
                <span>{experience.location}</span>
              </div>
            </div>
            <ul className={styles.achievements}>
              {experience.achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
            <div className={styles.tags}>
              {experience.techStack.map((tech) => (
                <span className={styles.pill} key={tech}>
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
