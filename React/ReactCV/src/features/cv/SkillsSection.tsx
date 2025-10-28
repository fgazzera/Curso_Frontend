import type { LanguageSkill, SkillGroup } from "../../Types/Resume";
import styles from "./SkillsSection.module.css";
import common from "./cvCommon.module.css";

type Props = {
  skillGroups: SkillGroup[];
  languages: LanguageSkill[];
};

export function SkillsSection({ skillGroups, languages }: Props) {
  return (
    <section className={styles.skillsCard}>
      <div className={common.sectionHeader}>
        <h2>Habilidades y herramientas</h2>
        <p>Stack tecnico y enfoque centrado en las personas.</p>
      </div>
      <div className={styles.skillGrid}>
        {skillGroups.map((group) => (
          <article className={styles.skillGroup} key={group.id}>
            <header className={styles.skillHeader}>
              <h3>{group.title}</h3>
              {group.highlight ? <span className={styles.highlight}>{group.highlight}</span> : null}
            </header>
            <ul className={styles.skillList}>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      {languages.length ? (
        <div className={styles.languages}>
          <h3>Idiomas</h3>
          <ul className={styles.languageList}>
            {languages.map((language) => (
              <li className={styles.languageItem} key={language.id}>
                <span>{language.language}</span>
                <small>{language.level}</small>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
