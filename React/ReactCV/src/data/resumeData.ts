import type {
  ContactLink,
  Experience,
  LanguageSkill,
  ProfileSummary,
  Project,
  SkillGroup,
} from "../Types/Resume";

export const profileSummary: ProfileSummary = {
  name: "Facundo Gazzera & Tomas Garbellotto",
  role: "Desarrolladores Full-Stack orientados a producto",
  location: "Cordoba, Argentina",
  headline: "Transformamos procesos complejos en experiencias digitales claras y humanas.",
  about:
    "Somos un equipo que combina investigacion con usuarios, diseno de servicios y desarrollo web moderno para construir soluciones escalables.",
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  availability: "Disponibilidad inmediata - Trabajo hibrido",
  lookingFor: "Equipos que busquen transformar operaciones con tecnologia basada en datos",
};

export const contactLinks: ContactLink[] = [
  { label: "LinkedIn", url: "https://www.linkedin.com" },
  { label: "GitHub", url: "https://github.com" },
];

export const experiences: Experience[] = [
  {
    id: "exp-inversur",
    role: "Product Owner & Lider Tecnico",
    company: "Inversur - Proyecto final de grado",
    timeframe: "2024 - Actualidad",
    location: "Bahia Blanca",
    achievements: [
      "Disenamos junto al area operativa el flujo completo de gestion de cuadrillas, logistica y materiales.",
      "Implementamos paneles de control que redujeron un 28% los tiempos de asignacion y seguimiento de tareas.",
      "Definimos estandares de accesibilidad y handoff para asegurar que el sistema pueda evolucionar post implementacion.",
    ],
    techStack: ["Angular 17", "NestJS", "PostgreSQL", "Nx", "Azure DevOps"],
  },
  {
    id: "exp-community",
    role: "Facilitadores UX - Proyecto Solidario",
    company: "Cordoba Smart Cities",
    timeframe: "2023 - 2024",
    location: "Cordoba",
    achievements: [
      "Co-creamos con vecinos un dashboard de participacion ciudadana con metricas en tiempo real.",
      "Automatizamos la carga de datos abiertos y establecimos un modelo de gobernanza para mantener la calidad.",
      "Documentamos procesos y guias de estilo para que la municipalidad continue iterando el producto.",
    ],
    techStack: ["Angular", "Python", "Power BI", "Figma", "Storybook"],
  },
  {
    id: "exp-lab",
    role: "Mentores de innovacion",
    company: "Laboratorio de Transformacion Digital - FRC",
    timeframe: "2022 - 2023",
    location: "Cordoba",
    achievements: [
      "Acompanamos a equipos interdisciplinarios para prototipar servicios digitales en 6 semanas.",
      "Disenamos workshops de descubrimiento con metodos de investigacion cualitativa y cuantitativa.",
      "Implementamos pipelines de integracion continua para proyectos academicos reutilizables.",
    ],
    techStack: ["Angular", "Node.js", "Kubernetes", "Jest", "DesignOps"],
  },
];

export const projects: Project[] = [
  {
    id: "proj-inversur-suite",
    title: "Suite de Gestion de Obras",
    client: "Inversur",
    summary: [
      "Plataforma integral para coordinar cuadrillas de campo, controlar inventario y monitorear avances en tiempo real.",
      "Incluye tableros dinamicos con metricas clave y notificaciones proactivas para anticipar desvios.",
    ],
    contributions: [
      "Arquitectura basada en dominios y diseno de contratos API.",
      "Investigacion contextual en obra para mapear puntos de dolor y validar flujos.",
      "Estrategia de datos que integra historicos con mapas de calor para priorizar mantenimiento.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    repository: "https://github.com",
    liveDemo: "https://inversur-demo.equipo.dev",
  },
  {
    id: "proj-community",
    title: "Mapa Colaborativo de Incidentes Urbanos",
    client: "Municipalidad de Cordoba",
    summary: [
      "Aplicacion mobile y web para reportar incidentes en via publica con analisis geoespacial.",
      "Incluye panel para areas municipales y analitica de tiempos de resolucion.",
    ],
    contributions: [
      "Diseno del flujo offline-first para cuadrillas en campo.",
      "Integracion con servicios GIS y clasificacion automatica mediante vision por computadora.",
      "Sesiones de formacion con agentes municipales para asegurar adopcion.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1529429617124-aee711a0cc14?auto=format&fit=crop&w=800&q=80",
    repository: "https://github.com",
    liveDemo: "https://smartcity-demo.equipo.dev",
  },
  {
    id: "proj-lab",
    title: "Portal de Mentoreo y Experimentos",
    client: "Laboratorio FRC",
    summary: [
      "Portal que centraliza experimentos, bitacoras y aprendizajes del laboratorio para reutilizacion entre cohortes.",
      "Incluye tablero de metricas y automatizaciones para seguimiento de experimentos.",
    ],
    contributions: [
      "Definicion de taxonomia y sistema de etiquetado para facilitar la busqueda.",
      "Implementacion de roles y permisos con autenticacion unica institucional.",
      "Automatizacion de reportes semanales y visualizaciones interactivas.",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
    repository: "https://github.com",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    id: "skills-frontend",
    title: "Frontend & UX",
    highlight: "Accessibility first",
    items: ["Angular 17", "Design Systems", "Web Components", "Storybook", "UX Research"],
  },
  {
    id: "skills-backend",
    title: "Backend & Datos",
    items: ["NestJS", "Node.js", "PostgreSQL", "Prisma ORM", "GraphQL", "REST APIs"],
  },
  {
    id: "skills-ops",
    title: "DevOps & Calidad",
    items: ["Nx Monorepos", "CI/CD en Azure DevOps", "Testing automatizado", "Observabilidad"],
  },
];

export const languageSkills: LanguageSkill[] = [
  { id: "lang-es", language: "Espanol", level: "Nativo" },
  { id: "lang-en", language: "Ingles", level: "C1 - Cambridge" },
];
