import styles from './InputExample.module.css'
import UserCardItem from './UserCardItem/UserCardItem';

function InputExample() {
  return (
    <div className={styles.Container}>
      <h2>Input example</h2>
      <UserCardItem name="Nicolas Rodriguez" email="nicolasrodriguez@test.com" />
      <UserCardItem name="Jose Perez" email="joseperez@test.com" />
      <div className={styles.note}>
        Information displayed here comes from parent compontend passed as props into the child component
      </div>
    </div>
  );
}
export default InputExample;