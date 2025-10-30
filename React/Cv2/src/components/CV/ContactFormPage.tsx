import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useMemo, useState } from 'react'

type ContactFormData = {
  fullName: string
  email: string
  reason: string
  message: string
  privacy: boolean
  subscribe: boolean
}

const reasons = [
  { value: 'consulta', label: 'Consulta' },
  { value: 'propuesta', label: 'Propuesta laboral' },
  { value: 'mentoria', label: 'Mentoría' },
  { value: 'otro', label: 'Otro' },
]

const defaultValues: ContactFormData = {
  fullName: '',
  email: '',
  reason: '',
  message: '',
  privacy: false,
  subscribe: true,
}

function ContactFormPage() {
  const [submitted, setSubmitted] = useState(false)
  const [lastSubmission, setLastSubmission] = useState<ContactFormData | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues,
    mode: 'onTouched',
  })

  const reasonLabelMap = useMemo(
    () => new Map(reasons.map((reason) => [reason.value, reason.label])),
    [],
  )

  const onSubmit = (values: ContactFormData) => {
    setLastSubmission(values)
    setSubmitted(true)
    reset(defaultValues)
  }

  const onReset = () => {
    reset(defaultValues)
    setSubmitted(false)
    setLastSubmission(null)
  }

  return (
    <Stack spacing={3}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Completá el formulario y nos pondremos en contacto a la brevedad. Este flujo replica el
          formulario del proyecto Angular, pero con React Hook Form y componentes de Material UI.
        </Typography>
      </Paper>

      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Datos de contacto
        </Typography>
        {submitted ? (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSubmitted(false)}
          >
            ¡Gracias por escribirnos! Guardamos tus datos y pronto vamos a responder tu mensaje.
          </Alert>
        ) : null}

        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: 'El nombre es obligatorio.', minLength: { value: 3, message: 'Ingresá al menos 3 caracteres.' } }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre completo *"
                  autoComplete="name"
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo es obligatorio.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Ingresá un correo válido.' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo electrónico *"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="reason"
              control={control}
              rules={{ required: 'Seleccioná un motivo.' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Motivo *"
                  error={!!errors.reason}
                  helperText={errors.reason?.message ?? 'Elegí una opción que describa tu consulta.'}
                >
                  {reasons.map((reason) => (
                    <MenuItem key={reason.value} value={reason.value}>
                      {reason.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="message"
              control={control}
              rules={{
                required: 'El mensaje es obligatorio.',
                minLength: { value: 10, message: 'El mensaje debe tener al menos 10 caracteres.' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Mensaje *"
                  multiline
                  minRows={4}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              )}
            />

            <FormGroup>
              <Controller
                name="privacy"
                control={control}
                rules={{ required: 'Necesitamos tu consentimiento.' }}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                      />
                    }
                    label="Acepto la política de privacidad *"
                  />
                )}
              />
              {errors.privacy ? (
                <FormHelperText error>{errors.privacy.message}</FormHelperText>
              ) : null}

              <Controller
                name="subscribe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                      />
                    }
                    label="Quiero recibir novedades y aprendizajes del proyecto"
                  />
                )}
              />
            </FormGroup>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
              <Button variant="outlined" type="button" onClick={onReset}>
                Limpiar
              </Button>
              <Button variant="contained" type="submit">
                Enviar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {lastSubmission ? (
        <Paper elevation={0} sx={{ p: 4, bgcolor: 'grey.100' }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Resumen del envío
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            <Typography variant="body2">
              <strong>Nombre:</strong> {lastSubmission.fullName}
            </Typography>
            <Typography variant="body2">
              <strong>Correo:</strong> {lastSubmission.email}
            </Typography>
            <Typography variant="body2">
              <strong>Motivo:</strong> {reasonLabelMap.get(lastSubmission.reason) ?? lastSubmission.reason}
            </Typography>
            <Typography variant="body2">
              <strong>Mensaje:</strong> {lastSubmission.message}
            </Typography>
            <Typography variant="body2">
              <strong>Recibe novedades:</strong> {lastSubmission.subscribe ? 'Sí' : 'No'}
            </Typography>
          </Stack>
        </Paper>
      ) : null}
    </Stack>
  )
}

export default ContactFormPage

