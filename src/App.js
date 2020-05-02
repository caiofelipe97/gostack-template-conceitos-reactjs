import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, serRepositories] = useState([]);

  useEffect(()=>{
    api.get("/repositories").then((response)=>{
      const repositories = response.data;
      serRepositories(repositories);
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post("/repositories",{
      "title": `WheresTheParty_Frontend ${Date.now()}`,
      "url": "https://github.com/caiofelipe97/WheresTheParty_Frontend.git",
      "techs": [
      "javascript",
      "ReactJS",
      "NodeJS"
      ],
    });

    serRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if(response.status ===  204){
      const repositoryIndex = repositories.findIndex((repository)=> repository.id === id);
      let updatedRepositories = [...repositories];
      updatedRepositories.splice(repositoryIndex, 1);

      serRepositories(updatedRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && repositories.map((repository)=>{
          return(
            <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
