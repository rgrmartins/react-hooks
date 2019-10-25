import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');
  
  const handleAdd = useCallback(() => {
    setTech([ ...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  /**
   * pode se passar funcões dentro dos effects que serão executadas após o componente deixar de existir
   * cada effects pode ter sua funcão
  */

  // Passando um array vazio só sera executado uma vez
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // as variaveis no array do segundo parametro fica monitorando as alterações
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        { tech.map(t => <li key={t}>{t}</li> ) }
      </ul>
      <strong>Você tem {techSize} tecnologias.</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)}/>
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
