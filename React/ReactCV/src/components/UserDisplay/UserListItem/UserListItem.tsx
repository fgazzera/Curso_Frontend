import type { User } from "../../../Types/User";
import styles from "./UserListItem.module.css";

export default function UserListItem({ user }: { user: User }) {
  return (
    <div className={styles.userItem}>
        <div className={styles.userName}>
            {user.name}
        </div>
        <div className={styles.userEmail}>
            {user.email}
        </div>
    </div>
  );
}