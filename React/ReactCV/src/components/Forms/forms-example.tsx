// ContactReactiveForm.tsx
import { useForm } from "react-hook-form";
import type { FormValues } from "../../Types/formatValues";
import styles from "./forms-example.module.css";

function parseDateOnly(value: string | undefined) {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d); // sin hora
}

function isNotInFuture(dateStr: string) {
  const v = parseDateOnly(dateStr);
  if (!v) return true; // si está vacío, que decidan otras reglas (required maneja vacío)
  const today = new Date();
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return v.getTime() <= t.getTime();
}

function hasStrongPassword(v: string) {
  return /[a-z]/.test(v) && /[A-Z]/.test(v) && /\d/.test(v);
}

export default function FormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      age: undefined,
      birthDate: "",
      country: "",
      password: "",
      agree: false,
      startDate: "",
      endDate: "",
    },
    mode: "onTouched",
  });

  // Cross-field validator: startDate <= endDate (cuando enviamos o cuando cambie alguno podrías trigger manualmente)
  const validateDateRange = () => {
    const { startDate, endDate } = getValues();
    if (!startDate || !endDate) {
      clearErrors(["startDate", "endDate"]);
      return true;
    }
    const s = parseDateOnly(startDate);
    const e = parseDateOnly(endDate);
    if (s && e && s.getTime() <= e.getTime()) {
      clearErrors(["startDate", "endDate"]);
      return true;
    }
    // setear error a nivel de ambos campos para feedback
    setError("startDate", { type: "validate", message: "El inicio debe ser <= al fin" });
    setError("endDate", { type: "validate", message: "El fin debe ser >= al inicio" });
    return false;
  };

  const onSubmit = async (data: FormValues) => {
    // Validación cross-field antes de continuar
    if (!validateDateRange()) return;

    // Simula envío
    await new Promise((r) => setTimeout(r, 600));
    // Convertir tipos si querés trabajar como en Angular:
    const ageNum = typeof data.age === "string" ? Number(data.age) : data.age;
    const birth = parseDateOnly(data.birthDate);
    const start = parseDateOnly(data.startDate);
    const end = parseDateOnly(data.endDate);

    console.log("Form value:", {
      ...data,
      age: ageNum,
      birthDate: birth ?? data.birthDate,
      startDate: start ?? data.startDate,
      endDate: end ?? data.endDate,
    });
    alert("Submitted! ✅");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
    >
      <h2>Formulario (React Hook Form)</h2>
      <div className={styles.formItemContainer}>
        <label>Nombre completo</label>
        <input
          {...register("fullName", {
            required: "El nombre es obligatorio",
            minLength: { value: 3, message: "Mínimo 3 caracteres" },
          })}
          placeholder="Nombre completo"
        />
        {errors.fullName && <small style={{ color: "crimson" }}>{errors.fullName.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>Email</label>
        <input
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Formato de email inválido",
            },
          })}
          placeholder="tuemail@mail.com"
        />
        {errors.email && <small style={{ color: "crimson" }}>{errors.email.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>Edad</label>
        <input
          type="number"
          {...register("age", {
            required: "La edad es obligatoria",
            valueAsNumber: true,
            min: { value: 18, message: "Debe ser ≥ 18" },
            max: { value: 120, message: "Debe ser ≤ 120" },
          })}
          placeholder="Ej: 25"
        />
        {errors.age && <small style={{ color: "crimson" }}>{errors.age.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>Fecha de nacimiento</label>
        <input
          type="date"
          {...register("birthDate", {
            required: "La fecha de nacimiento es obligatoria",
            validate: (v) => isNotInFuture(v) || "No puede ser una fecha futura",
          })}
        />
        {errors.birthDate && <small style={{ color: "crimson" }}>{errors.birthDate.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>País</label>
        <select
          {...register("country", { required: "El país es obligatorio" })}
          defaultValue=""
        >
          <option value="" disabled>Seleccioná un país…</option>
          <option value="AR">Argentina</option>
          <option value="CL">Chile</option>
          <option value="UY">Uruguay</option>
          <option value="BR">Brasil</option>
        </select>
        {errors.country && <small style={{ color: "crimson" }}>{errors.country.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>Contraseña</label>
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
            validate: (v) => hasStrongPassword(v) || "Debe tener minúscula, mayúscula y dígito",
          })}
          placeholder="••••••••"
        />
        {errors.password && <small style={{ color: "crimson" }}>{errors.password.message}</small>}
      </div>
      <div className={styles.formItemContainer}>
        <label>Rango de fechas</label>
        <div className={styles.dateRangeContainer}>
          <div className={styles.formItemContainer}>
            <input
              type="date"
              {...register("startDate", {
                required: "La fecha inicial es obligatoria",
              })}
              onBlur={validateDateRange}
            />
            {errors.startDate && (
              <small style={{ color: "crimson" }}>{errors.startDate.message}</small>
            )}
          </div>
          <div className={styles.formItemContainer}>
            <input
              type="date"
              {...register("endDate", {
                required: "La fecha inicial es obligatoria",
                validate: () => validateDateRange() || "Rango inválido",
              })}
            />
            {errors.endDate && (
              <small style={{ color: "crimson" }}>{errors.endDate.message}</small>
            )}
          </div>
        </div>
      </div>
            <div className={styles.formItemContainer}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            {...register("agree", {
              validate: (v) => v || "Debés aceptar los términos",
            })}
          />
          Acepto los términos
        </label>
        {errors.agree && <small style={{ color: "crimson" }}>{errors.agree.message}</small>}
      </div>
      <button type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}
