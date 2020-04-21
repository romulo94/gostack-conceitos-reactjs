import React, {useState, useEffect} from "react";

import api from 'services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories',{
      title: `Mikonos API  ${Date.now()}`, 
	    url:"https://github.com",
	    techs:["NodeJs", "git"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)

    const findIndex = repositories.findIndex(repo => repo.id === id)
    const newList = [...repositories]
    newList.splice(findIndex,1)

    setRepositories(newList)
  }

  useEffect(()=>{
    (async function loadRepositories() {
      const { data } = await api.get('/repositories');

      setRepositories(data)
    })()
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
              <li key={repo.id}>
                {repo.title}

                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
