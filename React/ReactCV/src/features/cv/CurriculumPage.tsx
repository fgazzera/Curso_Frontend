import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { profileSummary, contactLinks, experiences, projects, skillGroups, languageSkills } from "../../data/resumeData";
import type { User } from "../../Types/User";
import { getUsers } from "../../services/user.service";
import { useStatus } from "../../utils/useStatus";
import { ProfileCard } from "./ProfileCard";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { ProjectsShowcase } from "./ProjectsShowcase";
import { SkillsSection } from "./SkillsSection";
import { UserSpotlight } from "./UserSpotlight";
import { ContactForm } from "./ContactForm";
import styles from "./CurriculumPage.module.css";

export default function CurriculumPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { status, setLoading, setSuccess, setError } = useStatus();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading();
      try {
        const data = await getUsers();
        setUsers(data.slice(0, 5));
        setErrorMessage(null);
        setSuccess();
      } catch (error) {
        console.error("Error fetching users", error);
        setError();
        setErrorMessage("No pudimos traer los usuarios. Intenta nuevamente mas tarde.");
      }
    };

    fetchUsers();
  }, [setError, setLoading, setSuccess]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ProfileCard profile={profileSummary} contactLinks={contactLinks} />
        <div className={styles.sections}>
          <ExperienceTimeline experiences={experiences} />
          <ProjectsShowcase projects={projects} />
          <SkillsSection skillGroups={skillGroups} languages={languageSkills} />
          <UserSpotlight users={users} loading={status === "loading"} error={errorMessage} />
          <ContactForm />
        </div>
        <Typography variant="caption" className={styles.footer}>
          Aplicacion React - Curriculum Vitae, version inspirada en la implementacion Angular existente.
        </Typography>
      </div>
    </div>
  );
}
