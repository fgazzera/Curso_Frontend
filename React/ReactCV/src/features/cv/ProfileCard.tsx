import type { ContactLink, ProfileSummary } from "../../Types/Resume";
import styles from "./ProfileCard.module.css";

type Props = {
  profile: ProfileSummary;
  contactLinks: ContactLink[];
};

export function ProfileCard({ profile, contactLinks }: Props) {
  return (
    <section className={styles.profileCard}>
      <div className={styles.avatarFrame}>
        <img src={profile.avatar} alt={`Foto de ${profile.name}`} />
      </div>
      <div>
        <p className={styles.role}>{profile.role}</p>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.meta}>
          {profile.location} - {profile.availability}
        </p>
        <p className={styles.headline}>{profile.headline}</p>
        <p className={styles.about}>{profile.about}</p>
        {profile.lookingFor ? (
          <p className={styles.lookingFor}>
            Disponible para: <strong>{profile.lookingFor}</strong>
          </p>
        ) : null}
        <ul className={styles.links}>
          {contactLinks.map((link) => (
            <li key={link.url}>
              <a className={styles.link} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
