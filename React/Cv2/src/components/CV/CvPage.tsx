import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import GitHubIcon from '@mui/icons-material/GitHub'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HubIcon from '@mui/icons-material/Hub'
import { useEffect, useMemo, useState } from 'react'
import type { User } from '../../Types/User'
import { getUsers } from '../../services/user.service'

type Experience = {
  id: string
  role: string
  company: string
  timeframe: string
  location: string
  achievements: string[]
  techStack: string[]
}

type Project = {
  id: string
  title: string
  client: string
  summary: string[]
  contributions: string[]
  coverImage: string
  repository?: string
  liveDemo?: string
}

type SkillGroup = {
  id: string
  title: string
  items: string[]
  highlight?: string
}

type LanguageSkill = {
  id: string
  language: string
  level: string
}

const profile = {
  name: 'Facundo Gazzera & Tomás Garbellotto',
  role: 'Desarrolladores Full-Stack orientados a producto',
  location: 'Córdoba, Argentina',
  headline: 'Transformamos procesos complejos en experiencias digitales claras y humanas.',
  about:
    'Somos un equipo que combina investigación con usuarios, diseño de servicios y desarrollo web moderno para construir soluciones escalables.',
  avatar:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  availability: 'Disponibilidad inmediata · Trabajo híbrido',
  lookingFor: 'Equipos que busquen transformar operaciones con tecnología basada en datos',
}

const contactLinks = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com', icon: <LinkedInIcon fontSize="small" /> },
  { label: 'GitHub', url: 'https://github.com', icon: <GitHubIcon fontSize="small" /> },
]

const experiences: Experience[] = [
  {
    id: 'exp-inversur',
    role: 'Product Owner & Líder Técnico',
    company: 'Inversur · Proyecto final de grado',
    timeframe: '2024 – Actualidad',
    location: 'Bahía Blanca',
    achievements: [
      'Diseñamos junto al área operativa el flujo completo de gestión de cuadrillas, logística y materiales.',
      'Implementamos paneles de control que redujeron un 28% los tiempos de asignación y seguimiento de tareas.',
      'Definimos estándares de accesibilidad y handoff para asegurar que el sistema pueda evolucionar post implementación.',
    ],
    techStack: ['Angular 17', 'NestJS', 'PostgreSQL', 'Nx', 'Azure DevOps'],
  },
  {
    id: 'exp-community',
    role: 'Facilitadores UX · Proyecto Solidario',
    company: 'Córdoba Smart Cities',
    timeframe: '2023 – 2024',
    location: 'Córdoba',
    achievements: [
      'Co-creamos con vecinos un dashboard de participación ciudadana con métricas en tiempo real.',
      'Automatizamos la carga de datos abiertos y establecimos un modelo de gobernanza para mantener la calidad.',
      'Documentamos procesos y guías de estilo para que la municipalidad continúe iterando el producto.',
    ],
    techStack: ['Angular', 'Python', 'Power BI', 'Figma', 'Storybook'],
  },
  {
    id: 'exp-lab',
    role: 'Mentores de innovación',
    company: 'Laboratorio de Transformación Digital - FRC',
    timeframe: '2022 – 2023',
    location: 'Córdoba',
    achievements: [
      'Acompañamos a equipos interdisciplinarios para prototipar servicios digitales en 6 semanas.',
      'Diseñamos workshops de descubrimiento con métodos de investigación cualitativa y cuantitativa.',
      'Implementamos pipelines de integración continua para proyectos académicos reutilizables.',
    ],
    techStack: ['Angular', 'Node.js', 'Kubernetes', 'Jest', 'DesignOps'],
  },
]

const projects: Project[] = [
  {
    id: 'proj-inversur-suite',
    title: 'Suite de Gestión de Obras',
    client: 'Inversur',
    summary: [
      'Plataforma integral para coordinar cuadrillas de campo, controlar inventario y monitorear avances en tiempo real.',
      'Incluye tableros dinámicos con métricas clave y notificaciones proactivas para anticipar desvíos.',
    ],
    contributions: [
      'Arquitectura basada en dominios y diseño de contratos API.',
      'Investigación contextual en obra para mapear puntos de dolor y validar flujos.',
      'Estrategia de datos que integra históricos con mapas de calor para priorizar mantenimiento.',
    ],
    coverImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8S0CwY41eKZ86uBJDu5oXQtBsSj1JSBXNJw&s',
    repository: 'https://github.com',
    liveDemo: 'https://delightful-beach-07a53140f.6.azurestaticapps.net/',
  },
  {
    id: 'proj-community',
    title: 'Mapa Colaborativo de Incidentes Urbanos',
    client: 'Municipalidad de Córdoba',
    summary: [
      'Aplicación mobile y web para reportar incidentes en vía pública con análisis geoespacial.',
      'Incluye panel para áreas municipales y analítica de tiempos de resolución.',
    ],
    contributions: [
      'Diseño del flujo offline-first para cuadrillas en campo.',
      'Integración con servicios GIS y clasificación automática mediante visión por computadora.',
      'Sesiones de formación con agentes municipales para asegurar adopción.',
    ],
    coverImage:
      'https://yt3.googleusercontent.com/d3zWOdr_ZFVYHkNSVCVMqbvlR3P6_pz0YoIiNvczN3meujAtpBsySnw9K3n0imPU1CzP42J9ZA=s900-c-k-c0x00ffffff-no-rj',
    repository: 'https://github.com',
    liveDemo: 'https://github.com',
  }
]

const skillGroups: SkillGroup[] = [
  {
    id: 'skills-frontend',
    title: 'Frontend & UX',
    highlight: 'Accessibility first',
    items: ['Angular 17', 'Design Systems', 'Web Components', 'Storybook', 'UX Research'],
  },
  {
    id: 'skills-backend',
    title: 'Backend & Datos',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma ORM', 'GraphQL', 'REST APIs'],
  },
  {
    id: 'skills-ops',
    title: 'DevOps & Calidad',
    items: ['Nx Monorepos', 'CI/CD en Azure DevOps', 'Testing automatizado', 'Observabilidad'],
  },
]

const languages: LanguageSkill[] = [
  { id: 'lang-es', language: 'Español', level: 'Nativo' },
  { id: 'lang-en', language: 'Inglés', level: 'C1 · Cambridge' },
]

function CvPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [usersError, setUsersError] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true
    setLoadingUsers(true)
    getUsers()
      .then((data) => {
        if (!isMounted) return
        const nextUsers = data.slice(0, 5)
        setUsers(nextUsers)
        setSelectedUserId(nextUsers[0]?.id ?? null)
        setUsersError(null)
      })
      .catch(() => {
        if (!isMounted) return
        setUsersError('No se pudieron cargar las referencias. Intenta de nuevo más tarde.')
      })
      .finally(() => {
        if (!isMounted) return
        setLoadingUsers(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  const selectedUser = useMemo(
    () => users.find((user) => user.id === selectedUserId) ?? null,
    [selectedUserId, users],
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        alignItems: 'start',
        gridTemplateColumns: { xs: '1fr', md: '360px 1fr' },
      }}
    >
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Avatar
            src={profile.avatar}
            alt={profile.name}
            sx={{
              width: 128,
              height: 128,
              mx: 'auto',
              mb: 2,
              bgcolor: 'primary.main',
              fontSize: 48,
              fontWeight: 700,
            }}
          >
            {profile.name
              .split(' ')
              .filter((word) => word.length > 0)
              .map((word) => word[0])
              .slice(0, 2)
              .join('')}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>
            {profile.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {profile.role}
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" mt={2}>
            <LocationOnIcon fontSize="small" color="primary" />
            <Typography variant="body2" color="text.secondary">
              {profile.location}
            </Typography>
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={2}>
            {profile.headline}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2">{profile.about}</Typography>
          <Box
            mt={3}
            sx={{
              display: 'grid',
              gap: 1,
              textAlign: 'left',
            }}
          >
            <Typography fontWeight={600}>Disponibilidad</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.availability}
            </Typography>
            {profile.lookingFor ? (
              <>
                <Typography fontWeight={600}>Buscamos</Typography>
                <Typography variant="body2" color="text.secondary">
                  {profile.lookingFor}
                </Typography>
              </>
            ) : null}
          </Box>
        </Paper>

        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Conectemos
          </Typography>
          <List dense disablePadding>
            {contactLinks.map((link) => (
              <ListItem
                key={link.label}
                disableGutters
                secondaryAction={
                  <Button
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    size="small"
                  >
                    Abrir
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{link.icon}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={link.label} secondary={link.url} />
              </ListItem>
            ))}
          </List>
        </Paper>

        <Paper elevation={1} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <LanguageIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Idiomas
            </Typography>
          </Stack>
          <Stack spacing={1.5}>
            {languages.map((language) => (
              <Stack
                key={language.id}
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <Chip label={language.language} color="primary" size="small" />
                <Typography variant="body2" color="text.secondary">
                  {language.level}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>

        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Referencias
          </Typography>
          {loadingUsers ? (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 2 }}>
              <CircularProgress size={20} />
              <Typography variant="body2" color="text.secondary">
                Cargando contactos...
              </Typography>
            </Stack>
          ) : usersError ? (
            <Alert severity="error">{usersError}</Alert>
          ) : (
            <List dense sx={{ maxHeight: 240, overflowY: 'auto' }}>
              {users.map((user) => (
                <ListItem disableGutters key={user.id}>
                  <ListItemButton
                    selected={user.id === selectedUserId}
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {user.name.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
          {selectedUser ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              {selectedUser.name} recomienda nuestro trabajo para iniciativas de transformación digital.
            </Alert>
          ) : null}
        </Paper>
      </Stack>

      <Stack spacing={3}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Resumen profesional
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Especialistas en Angular y React enfocados en diseñar servicios digitales que aportan
            valor continuo. Lideramos iniciativas end-to-end: desde investigación y estrategia
            hasta entrega y operación, asegurando métricas claras y experiencias consistentes.
          </Typography>
        </Paper>

        <Paper elevation={1} sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <WorkHistoryIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Experiencia
            </Typography>
          </Stack>
          <Stack spacing={3}>
            {experiences.map((experience) => (
              <Box key={experience.id}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {experience.role}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience.company} · {experience.timeframe} · {experience.location}
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 3, mt: 1 }} dense>
                  {experience.achievements.map((achievement) => (
                    <ListItem key={achievement} sx={{ display: 'list-item', py: 0.5 }}>
                      <ListItemText
                        primaryTypographyProps={{ variant: 'body2' }}
                        primary={achievement}
                      />
                    </ListItem>
                  ))}
                </List>
                <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                  {experience.techStack.map((tech) => (
                    <Chip key={tech} label={tech} size="small" color="secondary" />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper elevation={1} sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <EmojiEventsIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Proyectos destacados
            </Typography>
          </Stack>
          <Stack spacing={3}>
            {projects.map((project) => (
              <Box key={project.id}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Box
                    component="img"
                    src={project.coverImage}
                    alt={`Imagen de proyecto ${project.title}`}
                    sx={{
                      width: { xs: '100%', sm: 200 },
                      height: { xs: 160, sm: 140 },
                      borderRadius: 2,
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <Box flex={1}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {project.title} · {project.client}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.summary.join(' ')}
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pl: 3, mt: 1 }} dense>
                      {project.contributions.map((item) => (
                        <ListItem key={item} sx={{ display: 'list-item', py: 0.5 }}>
                          <ListItemText
                            primaryTypographyProps={{ variant: 'body2' }}
                            primary={item}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Stack direction="row" spacing={1.5} mt={1.5}>
                      {project.repository ? (
                        <Button
                          href={project.repository}
                          target="_blank"
                          rel="noreferrer"
                          size="small"
                        >
                          Repositorio
                        </Button>
                      ) : null}
                      {project.liveDemo ? (
                        <Button
                          href={project.liveDemo}
                          target="_blank"
                          rel="noreferrer"
                          size="small"
                          variant="outlined"
                        >
                          Demo
                        </Button>
                      ) : null}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper elevation={1} sx={{ p: 4 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <HubIcon color="primary" />
            <Typography variant="h6" fontWeight={700}>
              Habilidades clave
            </Typography>
          </Stack>
          <Stack spacing={2.5}>
            {skillGroups.map((group) => (
              <Box key={group.id}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {group.title}
                </Typography>
                {group.highlight ? (
                  <Typography variant="caption" color="secondary" display="block" mb={1}>
                    {group.highlight}
                  </Typography>
                ) : null}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {group.items.map((item) => (
                    <Chip key={item} label={item} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Stack>
    </Box>
  )
}

export default CvPage
