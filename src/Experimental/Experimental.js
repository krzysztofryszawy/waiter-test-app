import React, { useState, useEffect } from 'react';

function Experimental() {
  const [count, setCount] = useState({ licznik: 0 });
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  useEffect(() => {
    // Zaktualizuj tytuł dokumentu, korzystając z interfejsu API przeglądarki
    //warunek - tylko jeśli jest parzysta
    if (count.licznik % 2 == 0)
      document.title = `Naciśnięto ${count.licznik} razy`;
  });

  return (
    <h1>
      <p>Naciśnięto {count.licznik} razy</p>
      <button onClick={() => setCount({ licznik: count.licznik + 1 })}>
        Naciśnij mnie
      </button>
      <p>Age {age} </p>
      <button onClick={() => setAge(age + 1)}>Naciśnij mnie 2</button>
    </h1>
  );
}

export default Experimental;
