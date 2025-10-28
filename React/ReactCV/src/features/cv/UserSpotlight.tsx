import { CircularProgress, Typography } from "@mui/material";
import type { User } from "../../Types/User";
import styles from "./UserSpotlight.module.css";
import common from "./cvCommon.module.css";

type Props = {
  users: User[];
  loading: boolean;
  error: string | null;
};

export function UserSpotlight({ users, loading, error }: Props) {
  return (
    <section className={styles.spotlightCard}>
      <div className={common.sectionHeader}>
        <h2>Usuarios que confian en nosotros</h2>
        <p>Datos obtenidos via JSONPlaceholder para demostrar integraciones HTTP.</p>
      </div>
      {loading ? (
        <div className={styles.emptyState}>
          <CircularProgress size={32} />
        </div>
      ) : null}
      {error ? (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      ) : null}
      {!loading && !error ? (
        <ul className={styles.list}>
          {users.map((user) => (
            <li className={styles.entry} key={user.id}>
              <span className={styles.initial}>{user.name.slice(0, 1)}</span>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      {!loading && !error && users.length === 0 ? (
        <div className={styles.emptyState}>No hay usuarios para mostrar.</div>
      ) : null}
    </section>
  );
}
