import { useState } from "react";
import styles from './NoteList.module.css'
import ListItem from "./ListItem";

function NoteList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTask, setNewTask] = useState("");

  const addTodo = () => {
    if (newTask.trim() === "") return;
    setTodos([...todos, newTask]);
    setNewTask("");
  };

 return (
    <div className={styles.todoList}>
      <h2>Lista de tareas</h2>
      <ul className={styles.tasks}>
        {todos.map((t, i) => (
          <ListItem key={i} text={t} />
        ))}
      </ul>
      {todos.length === 0 ? 
      <p className={styles.noTasks}>No hay tareas</p> : 
      <p className={styles.counter}>Tienes {todos.length} tareas</p>}
      <div className={styles.container}>
        <input className={styles.input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Escribe una nueva tarea"
        />
        <button className={styles.simpleButton} onClick={addTodo}>
          Agregar tarea
        </button>
      </div>
    </div>
  );
}
export default NoteList;