import { Alert, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ContactForm.module.css";

type ContactFormValues = {
  fullName: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState } = useForm<ContactFormValues>({
    defaultValues: { fullName: "", email: "", message: "" },
  });

  const { errors } = formState;

  const onSubmit = handleSubmit((values) => {
    setSubmittedMessage(`Gracias ${values.fullName}, te contactaremos a ${values.email}.`);
    reset();
  });

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={onSubmit} noValidate>
        <div className={styles.header}>
          <Typography variant="h5" component="h2">
            Co-creemos el siguiente paso
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contanos sobre tu desafio y te respondemos en menos de 24 horas.
          </Typography>
        </div>
        <TextField
          label="Nombre completo"
          error={Boolean(errors.fullName)}
          helperText={errors.fullName?.message}
          {...register("fullName", {
            required: "Campo obligatorio",
            minLength: { value: 3, message: "Incluir al menos 3 caracteres" },
          })}
        />
        <TextField
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Campo obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Correo invalido",
            },
          })}
        />
        <TextField
          label="Mensaje"
          multiline
          minRows={4}
          error={Boolean(errors.message)}
          helperText={errors.message?.message}
          {...register("message", {
            required: "Campo obligatorio",
            minLength: { value: 10, message: "Contanos un poco mas" },
          })}
        />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
        {submittedMessage ? <Alert severity="success">{submittedMessage}</Alert> : null}
      </form>
    </div>
  );
}
