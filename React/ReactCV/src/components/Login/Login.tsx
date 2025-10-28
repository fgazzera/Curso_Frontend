import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthHook";
import styles from "./Login.module.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(3, "test", "test@test.com");
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <div className={styles.note}>Click the button to login and get access to all the examples!</div>
      <button className={styles.simpleButton} onClick={onSubmit}>Login</button>
    </div>
      
  );
}