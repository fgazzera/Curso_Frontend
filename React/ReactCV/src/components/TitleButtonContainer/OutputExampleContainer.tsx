import TitleButton from "./TitleButton/TitleButton";
import styles from "./OutputExampleContainer.module.css";

function OutputExample() {


  const handleClick = () => {
    alert("Botón clickeado");
  };

  return (
    <div className={styles.container}>
      <h2>Output Example Button</h2>
        <TitleButton onClick={handleClick}/>
      <div className={styles.note}>Click the button to execute action from the parent component</div>
    </div>
  );
}
export default OutputExample;
