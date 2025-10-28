import { useState } from "react";

function useStateExample() {
  const [count, setCount] = useState(0);

  const addCount = () => {
    setCount((previousCount) => previousCount + 1);
  };

  // Ejemplo de por que el use state y el set count son necesarios si se quiere probar descomentar esta función y utilizarla en el onClick del botón
  /*let cuenta = 0
  const addCuenta = () => {
    cuenta = cuenta + 1;
    console.log(cuenta);
  }*/
 return (
    <div className="card">
      <h2>Use state example</h2>
      <button onClick={addCount}>count is {count}</button>
      <div> Here we can also see that if we import css directly its applied in any component that uses that class (here styles come from app.css). 
        If we want more control over where the styles are applied we use files with .module.css and import styles into a variable</div>
    </div>
  );
}

export default useStateExample;