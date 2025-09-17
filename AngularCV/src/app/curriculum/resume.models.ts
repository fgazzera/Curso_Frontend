export interface ContactLink {
  label: string;
  url: string;
  icon?: string;
}

export interface ProfileSummary {
  name: string;
  role: string;
  location: string;
  headline: string;
  about: string;
  avatar: string;
  availability: string;
  lookingFor?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  timeframe: string;
  location: string;
  isRemote?: boolean;
  achievements: string[];
  techStack: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  summary: string[];
  contributions: string[];
  coverImage: string;
  liveDemo?: string;
  repository?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  items: string[];
  highlight?: string;
}

export interface LanguageSkill {
  id: string;
  language: string;
  level: string;
}
