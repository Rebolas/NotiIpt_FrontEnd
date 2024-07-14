import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const NoticiasMain = () => {
    const [noticias, setNoticias] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

useEffect(() => {
    const fetchNoticias = async () => {
        try {
            const response = await fetch('https://localhost:7027/api/Noticias1');
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setNoticias(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };



    const fetchCategorias = async () => {
        try {
            const response = await fetch('https://localhost:7027/api/Categorias1');
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setCategorias(data);
        } catch (err) {
            setError(err.message);
        }
    };
    fetchNoticias();
    fetchCategorias();
    const interval = setInterval(() => {
        fetchNoticias();
    }, 60000); // 60 segundos

    return () => clearInterval(interval);
}, []);
    
if (isLoading) {
    return <div>Loading...</div>;
}
if (error) {
    return <div>Error: {error}</div>;
}

    {/*const interval = setInterval(fetchNoticias, 60000); // Chamar a cada 60 segundos*/ }
    const getCategoriaNome = (categoriaFK) => {
        const categoria = categorias.find(cat => cat.id === categoriaFK);
        return categoria ? categoria.categoria : 'Desconhecida';
    };
    return (
        <div className='home'>
            <section className="titulo">
                <div className="text">Noticias</div>
            </section>

            <section className="grid-GS">
                {noticias.map(noticia => (
                    <Link to={`/noticia/${noticia.id}`} key={noticia.id} className='card-GS'>
                        <div className="card-GS-container">
                            <div className="card-GS-container-text">
                                <h3 className="card-GS-dados">{noticia.titulo}</h3>
                                <span className="card-GS-titulo">{getCategoriaNome(noticia.categoriaFK)}</span> {/* Mostra a categoria */}
                            </div>
                            <img src={`https://localhost:7027/Imagens/${noticia.listaFotos[0]}`} alt={noticia.titulo} className="card-GS-imagem" /> {/* Exibe a imagem */}
                        </div>
                        <div className="card-GS-container-evolucao"></div> {/* Mostra a evolução da temperatura da sala */}
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default NoticiasMain;