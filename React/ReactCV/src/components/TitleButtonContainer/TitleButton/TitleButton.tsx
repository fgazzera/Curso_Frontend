import styles from './TitleButton.module.css'

type TitleButtonProps = {
  onClick: () => void;
};

function TitleButton({ onClick }: TitleButtonProps) {
  return (
      <button className={styles.simpleButton} onClick={onClick}>Haz clic</button>
  );
}
export default TitleButton;