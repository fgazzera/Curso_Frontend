import { useEffect, useState } from "react";
import { getUsers, createUser } from "../../services/user.service";
import type { User } from "../../Types/User";
import styles from "./HttpExample.module.css";
import UserListItem from "./UserListItem/UserListItem";

export default function HttpExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await getUsers();
        if (!ignore) setUsers(data);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => {
      ignore = true; // avoid setting state after unmount
    };
  }, []);

  const onAdd = async () => {
    if (!name.trim()) return;
    const newUser = await createUser({ name: name.trim(), email: "fake@mail.com" });
    // Fake API returns an object; locally add it to the list
    setUsers((prev) => [...prev, newUser]);
    setName("");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h3>Http Example with Axios</h3>
      <div className={styles.inputContainer}>
        <input
          placeholder="New user name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className={styles.simpleButton} onClick={onAdd}>Add</button>
      </div>
      <ul className={styles.userList}>
        {users.map((u) => (
          <UserListItem key={u.id} user={u} />
        ))}
      </ul>
    </div>
  );
}