import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const NoticiaSoz = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                const response = await fetch(`https://localhost:7027/api/Noticias1/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch noticia');
                }
                const data = await response.json();
                setNoticia(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNoticia();
        const interval = setInterval(() => {
            fetchNoticia();
        }, 60000); // 60 segundos
    
        return () => clearInterval(interval);
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!noticia) {
        return <div>Notícia não encontrada</div>;
    }

    return (
        <div className='home'>
            <section className="grid-GS">
                <div className='card-GS'>
                    <div className="card-GS-containerNoti"> {/* Corrigi o nome da classe */}
                        <div className="card-GS-container-text">
                            <h1>{noticia.titulo}</h1>
                            <p>{noticia.texto}</p>
                            <p>Data de criação: {new Date(noticia.dataEscrita).toLocaleString()}</p>
                            <p>{`https://localhost:7027/Imagens/${noticia.listaFotos[1]}`} Data de edição: {new Date(noticia.dataEdicao).toLocaleString()}</p>
                            {/* Apresenta todas as imagens presentes na listaFotos */}
                            {noticia.listaFotos.map(index => (
                                <img
                                    key={index}
                                    src={`https://localhost:7027/Imagens/${noticia.listaFotos[1]}`}
                                    alt={noticia.titulo}
                                    className="card-GS-imagem"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NoticiaSoz;
