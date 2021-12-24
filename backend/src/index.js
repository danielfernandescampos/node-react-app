const express = require('express');
const cors = require('cors');
const app = express();
const { uuid } = require('uuidv4');

app.use(cors());
app.use(express.json());

const projects = [];
const port = 3333;

function logRequests(req, res, next) {
    const { method, url } = req;
    const logLable = `[${method.toUpperCase()}] ${url}`;
    console.log(logLable);
    return next();
}

app.use(logRequests)

app.get('/projects', (req, res) => {
    const {title} = req.query;
    const results = title 
        ? projects.filter(project => project.title.includes(title))
        : projects

    return res.json(results)
});

app.post('/projects', (req, res) => {
    const {title, owner} = req.body;
    const project = { title, owner, id: uuid() }
    projects.push(project);

    return res.json(project);
});

app.put('/projects/:id', (req, res) => {
    const { id } = req.params;
    const {title, owner} = req.body;
    const project = { title, owner, id: uuid() }
    //const projectIndex = projects.findIndex(project => project.id === id);

    projects[id - 1] = project;

    if (id < 0 || id > projects.length) {
        return res.status(400).json({error: 'não encontrei o projeto'})
    }

    return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params
    if (id < 0 || id > projects.length) {
        return res.status(400).json({error: 'Projeto não encontrado'})
    }
    projects.splice(id - 1, 1);
    return res.status(204).json({message: `Projeto ${id} deletado com sucesso`})
});

app.listen(port, () => {
    console.log(`🚀 backend running at port ${port}...`
)});