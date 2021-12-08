import React, { useState } from 'react';
import Header from './components/Header';
import './App.css'

function App() {
    // useState retorna um array com duas posições
    // 1. variavel com valor inicial
    // 2. função para atualizar o valor inicial
    const [projects, setProjects] = useState([
        "Desenvolvimento de App",
        "Front-end Web",
        "Angular avançado",
    ]);

    function handleAddProject() {
        setProjects([...projects, `new Project ${Date.now()}`])
        //projects.push(`new Project ${Date.now()}`);
        //console.log(projects);
    }

    return ( // fragment <></>
        <>
            <Header title="Projects" />
            <ul>
                { projects.map(project => <li key={project}>{ project }</li>) }
            </ul>
            <button onClick={handleAddProject}>New Project</button>
        </>
    )
}

export default App;