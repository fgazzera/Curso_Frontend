export type FormValues = {
  fullName: string;
  email: string;
  age: number | undefined;       // HTML inputs devuelven string → lo convertimos
  birthDate: string;             // type="date" → string "YYYY-MM-DD"
  country: string;
  password: string;
  agree: boolean;
  startDate: string;             // "YYYY-MM-DD"
  endDate: string;               // "YYYY-MM-DD"
};