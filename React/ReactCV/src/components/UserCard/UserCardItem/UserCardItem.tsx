import styles from './UserCardItem.module.css'

function UserCardItem(props: {name: string; email: string}) {
  return (
    <div className={styles.card}>
      <h2>{props.name}</h2>
      <p>{props.email}</p>
    </div>
  );
}
export default UserCardItem;