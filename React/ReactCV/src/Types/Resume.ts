export type ContactLink = {
  label: string;
  url: string;
};

export type ProfileSummary = {
  name: string;
  role: string;
  location: string;
  headline: string;
  about: string;
  avatar: string;
  availability: string;
  lookingFor?: string;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  timeframe: string;
  location: string;
  achievements: string[];
  techStack: string[];
};

export type Project = {
  id: string;
  title: string;
  client: string;
  summary: string[];
  contributions: string[];
  coverImage: string;
  repository?: string;
  liveDemo?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  highlight?: string;
  items: string[];
};

export type LanguageSkill = {
  id: string;
  language: string;
  level: string;
};
