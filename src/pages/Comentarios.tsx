import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import ComentarioCard from '../components/ComentarioCard/ComentarioCard';
import './Test.css';

const ComentariosPage: React.FC = () => {
  const comentarios = [
    {
      avatarUrl: '/assets/images/user1.png',
      username: 'Usuario 1',
      comment: 'Este es un comentario de prueba para el usuario 1.',
    },
    {
      avatarUrl: '/assets/images/user2.png',
      username: 'Usuario 2',
      comment: 'Otro comentario de prueba para el usuario 2.',
    },
    {
      avatarUrl: '/assets/images/user3.png',
      username: 'Usuario 3',
      comment: 'Un tercer comentario con más texto para el usuario 3.',
    },
    {
      avatarUrl: '/assets/images/user3.png',
      username: 'Usuario 4',
      comment: 'Un tercer comentario con más texto para el usuario 3.',
    },
    {
      avatarUrl: '/assets/images/user3.png',
      username: 'Usuario 5',
      comment: 'Un tercer comentario con más texto para el usuario 3.',
    },
    {
      avatarUrl: '/assets/images/user3.png',
      username: 'Usuario 6',
      comment: 'Un tercer comentario con más texto para el usuario 3.',
    },
  ];

  const handleEdit = (username: string) => {
    console.log(`Editar comentario de ${username}`);
  };

  const handleDelete = (username: string) => {
    console.log(`Eliminar comentario de ${username}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Grupos">Grupos</a>
            <a href="/Biblioteca">Biblioteca</a>
            <a href="/Comentarios">Comentarios</a>
          </nav>
          <button className="login-button">Iniciar sesión</button>
        </header>

        {/* Título de la página */}
        <div className="header-container">
          <h1 className="page-title">Preguntas y Respuestas</h1>
        </div>

        {/* Contenedor de comentarios */}
        <div className="comentarios-container">
          {comentarios.map((comentario, index) => (
            <ComentarioCard
              key={index}
              avatarUrl={comentario.avatarUrl}
              usuario={comentario.username}
              comentario={comentario.comment}
              onEdit={() => handleEdit(comentario.username)}
              onDelete={() => handleDelete(comentario.username)}
            />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ComentariosPage;
