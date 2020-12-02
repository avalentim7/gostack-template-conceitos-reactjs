import React, { useEffect } from "react";
import { useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(err => console.warning(err));

  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Front-end com ReactJS ${Date.now()}`,
      url: 'https://github.com/avalentim7',
      techs: ['NodeJS', 'ReactJS']
    });

    const repository = response.data;
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const repositoriesRemaining = repositories.filter(repository => repository.id !== id);
    
    setRepositories(repositoriesRemaining);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}> Remover </button>
            </li>
          )
        })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
