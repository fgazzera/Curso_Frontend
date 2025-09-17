import { Component } from '@angular/core';
import { ProfileCardComponent } from './profile-card/profile-card';
import { ExperienceSectionComponent } from './experience-section/experience-section';
import { ProjectsShowcaseComponent } from './projects-showcase/projects-showcase';
import { SkillsSectionComponent } from './skills-section/skills-section';
import {
  ContactLink,
  Experience,
  LanguageSkill,
  ProfileSummary,
  Project,
  SkillGroup
} from './resume.models';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [
    ProfileCardComponent,
    ExperienceSectionComponent,
    ProjectsShowcaseComponent,
    SkillsSectionComponent
  ],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss'
})
export class Curriculum {
  protected readonly profile: ProfileSummary = {
    name: 'Facundo Gazzera & Tomás Garbellotto',
    role: 'Desarrolladores Full-Stack orientados a producto',
    location: 'Córdoba, Argentina',
    headline: 'Transformamos procesos complejos en experiencias digitales claras y humanas.',
    about:
      'Somos un equipo que combina investigación con usuarios, diseño de servicios y desarrollo web moderno para construir soluciones escalables.',
    avatar:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    availability: 'Disponibilidad inmediata · Trabajo híbrido',
    lookingFor: 'Equipos que busquen transformar operaciones con tecnología basada en datos'
  };

  protected readonly contactLinks: ContactLink[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com' },
    { label: 'GitHub', url: 'https://github.com' }
  ];

  protected readonly experiences: Experience[] = [
    {
      id: 'exp-inversur',
      role: 'Product Owner & Líder Técnico',
      company: 'Inversur · Proyecto final de grado',
      timeframe: '2024 — Actualidad',
      location: 'Bahía Blanca',
      achievements: [
        'Diseñamos junto al área operativa el flujo completo de gestión de cuadrillas, logística y materiales.',
        'Implementamos paneles de control que redujeron un 28% los tiempos de asignación y seguimiento de tareas.',
        'Definimos estándares de accesibilidad y handoff para asegurar que el sistema pueda evolucionar post implementación.'
      ],
      techStack: ['Angular 17', 'NestJS', 'PostgreSQL', 'Nx', 'Azure DevOps']
    },
    {
      id: 'exp-community',
      role: 'Facilitadores UX · Proyecto Solidario',
      company: 'Córdoba Smart Cities',
      timeframe: '2023 — 2024',
      location: 'Córdoba',
      achievements: [
        'Co-creamos con vecinos un dashboard de participación ciudadana con métricas en tiempo real.',
        'Automatizamos la carga de datos abiertos y establecimos un modelo de gobernanza para mantener la calidad.',
        'Documentamos procesos y guías de estilo para que la municipalidad continúe iterando el producto.'
      ],
      techStack: ['Angular', 'Python', 'Power BI', 'Figma', 'Storybook']
    },
    {
      id: 'exp-lab',
      role: 'Mentores de innovación',
      company: 'Laboratorio de Transformación Digital - FRC',
      timeframe: '2022 — 2023',
      location: 'Córdoba',
      achievements: [
        'Acompañamos a equipos interdisciplinarios para prototipar servicios digitales en 6 semanas.',
        'Diseñamos workshops de descubrimiento con métodos de investigación cualitativa y cuantitativa.',
        'Implementamos pipelines de integración continua para proyectos académicos reutilizables.'
      ],
      techStack: ['Angular', 'Node.js', 'Kubernetes', 'Jest', 'DesignOps']
    }
  ];

  protected readonly projects: Project[] = [
    {
      id: 'proj-inversur-suite',
      title: 'Suite de Gestión de Obras',
      client: 'Inversur',
      summary: [
        'Plataforma integral para coordinar cuadrillas de campo, controlar inventario y monitorear avances en tiempo real.',
        'Incluye tableros dinámicos con métricas clave y notificaciones proactivas para anticipar desvíos.'
      ],
      contributions: [
        'Arquitectura basada en dominios y diseño de contratos API.',
        'Investigación contextual en obra para mapear puntos de dolor y validar flujos.',
        'Estrategia de datos que integra históricos con mapas de calor para priorizar mantenimiento.'
      ],
      coverImage:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
      repository: 'https://github.com',
      liveDemo: 'https://inversur-demo.equipo.dev'
    },
    {
      id: 'proj-community',
      title: 'Mapa Colaborativo de Incidentes Urbanos',
      client: 'Municipalidad de Córdoba',
      summary: [
        'Aplicación mobile y web para reportar incidentes en vía pública con análisis geoespacial.',
        'Incluye panel para áreas municipales y analítica de tiempos de resolución.'
      ],
      contributions: [
        'Diseño del flujo offline-first para cuadrillas en campo.',
        'Integración con servicios GIS y clasificación automática mediante visión por computadora.',
        'Sesiones de formación con agentes municipales para asegurar adopción.'
      ],
      coverImage:
        'https://images.unsplash.com/photo-1529429617124-aee711a0cc14?auto=format&fit=crop&w=800&q=80',
      repository: 'https://github.com',
      liveDemo: 'https://smartcity-demo.equipo.dev'
    },
    {
      id: 'proj-lab',
      title: 'Portal de Mentoreo y Experimentos',
      client: 'Laboratorio FRC',
      summary: [
        'Portal que centraliza experimentos, bitácoras y aprendizajes del laboratorio para reutilización entre cohortes.',
        'Incluye tablero de métricas y automatizaciones para seguimiento de experimentos.'
      ],
      contributions: [
        'Definición de taxonomía y sistema de etiquetado para facilitar la búsqueda.',
        'Implementación de roles y permisos con autenticación única institucional.',
        'Automatización de reportes semanales y visualizaciones interactivas.'
      ],
      coverImage:
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80',
      repository: 'https://github.com'
    }
  ];

  protected readonly skillGroups: SkillGroup[] = [
    {
      id: 'skills-frontend',
      title: 'Frontend & UX',
      highlight: 'Accessibility first',
      items: ['Angular 17', 'Design Systems', 'Web Components', 'Storybook', 'UX Research']
    },
    {
      id: 'skills-backend',
      title: 'Backend & Datos',
      items: ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'GraphQL', 'REST APIs']
    },
    {
      id: 'skills-ops',
      title: 'DevOps & Calidad',
      items: ['Nx Monorepos', 'CI/CD en Azure DevOps', 'Testing automatizado', 'Observabilidad']
    }
  ];

  protected readonly languages: LanguageSkill[] = [
    { id: 'lang-es', language: 'Español', level: 'Nativo' },
    { id: 'lang-en', language: 'Inglés', level: 'C1 · Cambridge' }
  ];
}
