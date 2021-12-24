import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';
import './App.css'

import background from './assets/background.jpeg'

function App() {
    // useState retorna um array com duas posições
    // 1. variavel com valor inicial
    // 2. função para atualizar o valor inicial
    const [projects, setProjects] = useState([]);
    // useEffect dispara funções sempre que tem alguma informação alterada, ou quando o componente é exibido em tela
    // 1º parametro é qual função disparar, 2º parametro é quando disparar
    // deixando o array vazio ela executa apenas quando o componente é renderizado na tela, se passar o "projects", executa sempre que ele mudar
    useEffect(() => {
        api.get('projects').then((response) => {
            setProjects(response.data)
        })
    }, [])

    async function handleAddProject() {
       // setProjects([...projects, `new Project ${Date.now()}`])
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Daniel Fernandes'
        });

        const project = response.data;
        setProjects([...projects, project])
    }

    return ( // fragment <></>
        <>
            <Header title="Projects" />
            <ul>
                { projects.map(project => <li key={project.id}>{ project.title }</li>) }
            </ul>
            <button onClick={handleAddProject}>New Project</button>
            <img src={background}/> 
        </>
    )
}

export default App;