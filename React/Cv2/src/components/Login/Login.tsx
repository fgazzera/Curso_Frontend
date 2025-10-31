import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthHook";
import styles from "./Login.module.css";

type FormState = {
  email: string;
  password: string;
};

type FormErrors = {
  email: string;
  password: string;
};

const initialForm: FormState = { email: "", password: "" };
const initialErrors: FormErrors = { email: "", password: "" };

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const submitTimeout = useRef<number | null>(null);

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath =
    (location.state as { from?: { pathname: string } } | undefined)?.from?.pathname ?? "/";

  useEffect(() => {
    emailRef.current?.focus();

    return () => {
      if (submitTimeout.current) {
        window.clearTimeout(submitTimeout.current);
      }
    };
  }, []);

  const validate = (state: FormState): FormErrors => {
    const nextErrors: FormErrors = { ...initialErrors };

    if (!state.email.trim()) {
      nextErrors.email = "Ingresa tu email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
      nextErrors.email = "El email no tiene un formato valido";
    }

    if (!state.password.trim()) {
      nextErrors.password = "Ingresa tu contrasena";
    } else if (state.password.trim().length < 6) {
      nextErrors.password = "La contrasena debe tener al menos 6 caracteres";
    }

    return nextErrors;
  };

  const hasErrors = useMemo(
    () => Boolean(errors.email) || Boolean(errors.password),
    [errors]
  );
  const isFormIncomplete = useMemo(
    () => !form.email.trim() || !form.password.trim(),
    [form.email, form.password]
  );

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setForm((prev) => {
        const next = { ...prev, [field]: value };
        if (touched[field]) {
          setErrors(validate(next));
        }
        return next;
      });
    };

  const handleBlur = (field: keyof FormState) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(form));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validate(form);
    setErrors(validation);
    setTouched({ email: true, password: true });

    if (validation.email || validation.password) {
      return;
    }

    setIsSubmitting(true);
    submitTimeout.current = window.setTimeout(() => {
      const [rawName] = form.email.split("@");
      const displayName =
        rawName?.charAt(0)?.toUpperCase() + rawName?.slice(1)?.toLowerCase() || "Invitado";

      login(Date.now(), displayName, form.email.trim());
      setIsSubmitting(false);
      navigate(redirectPath, { replace: true });
      submitTimeout.current = null;
    }, 450);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>Inicia sesion</h1>
          <p className={styles.subtitle}>
            Accede al panel ingresando tus credenciales. Usa cualquier email valido y una contrasena
            de al menos 6 caracteres para continuar.
          </p>
        </header>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              ref={emailRef}
              id="email"
              type="email"
              className={`${styles.input} ${
                touched.email && errors.email ? styles.inputError : ""
              }`}
              placeholder="tu@correo.com"
              value={form.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              autoComplete="email"
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby="email-error"
            />
            {touched.email && errors.email ? (
              <span id="email-error" className={styles.error}>
                {errors.email}
              </span>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Contrasena
            </label>
            <div
              className={`${styles.passwordWrapper} ${
                touched.password && errors.password ? styles.inputError : ""
              }`}
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                placeholder="******"
                value={form.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
                autoComplete="current-password"
                aria-invalid={Boolean(touched.password && errors.password)}
                aria-describedby="password-error"
              />
              <button
                type="button"
                className={styles.toggle}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            {touched.password && errors.password ? (
              <span id="password-error" className={styles.error}>
                {errors.password}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className={styles.submit}
            disabled={isSubmitting || hasErrors || isFormIncomplete}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <footer className={styles.footer}>
          <p>
            Facundo Gazzera, Tomas Garbellotto
          </p>
        </footer>
      </section>
    </div>
  );
}
