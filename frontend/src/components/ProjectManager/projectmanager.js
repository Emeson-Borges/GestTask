import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectManager.css';
import { BsEyeFill, BsXSquare, BsCheckSquare } from "react-icons/bs";

const ProjectManager = () => {
    const [projetos, setProjetos] = useState([]);
    const [novoProjeto, setNovoProjeto] = useState({
        nome: '',
        descricao: '',
        data: '',
        imagem: null,
        status: 'aberto',
        progresso: 0.0,
        usuario: 1, // Certifique-se de que o usuário está sendo gerenciado corretamente
    });

    const fetchProjetos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/projetos/');
            setProjetos(response.data);
        } catch (error) {
            console.error('Erro ao buscar projetos: ', error);
        }
    };

    useEffect(() => {
        fetchProjetos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoProjeto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(novoProjeto).forEach(key => {
                formData.append(key, novoProjeto[key]);
            });

            await axios.post('http://localhost:8000/api/projetos/', formData);
            fetchProjetos(); // Atualiza a lista de projetos
            setNovoProjeto({ nome: '', descricao: '', data: '', imagem: null, status: 'aberto', progresso: 0.0, usuario: 1 });
        } catch (error) {
            console.error('Erro ao criar projeto: ', error);
        }
    };

    return (
        <div>
            <h1 className='title'>GERENCIADOR DE PROJETOS</h1>
            <h1>Criar novo Projeto</h1>
            {/* Formulário de criação de projeto */}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="nome" 
                    placeholder="Nome do projeto" 
                    value={novoProjeto.nome} 
                    onChange={handleChange} 
                    required 
                />
                <textarea 
                    name="descricao" 
                    placeholder="Descrição do projeto" 
                    value={novoProjeto.descricao} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="date" 
                    name="data" 
                    value={novoProjeto.data} 
                    onChange={handleChange} 
                    required 
                />
                <input 
                    type="file" 
                    name="imagem" 
                    onChange={(e) => setNovoProjeto({ ...novoProjeto, imagem: e.target.files[0] })} 
                />
                <button type="submit">Criar Projeto</button>
            </form>
            <h2 className='subtitulo'>PROJETOS CADASTRADOS</h2>
            <ul>
                {projetos.map(projeto => (
                    <li key={projeto.id}>
                        <div>
                            <strong>Título:</strong> {projeto.nome}
                        </div>
                        <div>
                            <strong>Descrição:</strong> {projeto.descricao}
                        </div>
                        <div>
                            <strong>Usuário:</strong> {projeto.username}
                        </div>
                        <div>
                            <strong>Data:</strong> {projeto.data}
                        </div>
                        <div>
                            <strong>Progresso:</strong> {projeto.progresso}%
                        </div>
                        {projeto.imagem && (
                            <div>
                                <strong>Imagem:</strong><br />
                                <img src={`http://localhost:8000/${projeto.imagem}`} alt={projeto.nome} />
                            </div>
                        )}
                        <div className="button-container">
                            <button className="edit"><BsCheckSquare /> Editar</button>
                            <button className="delete"><BsXSquare /> Excluir</button>
                            <button className="visualizar"><BsEyeFill /> Visualizar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectManager;
