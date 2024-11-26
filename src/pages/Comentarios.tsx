import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import ComentarioCard from '../components/ComentarioCard/ComentarioCard';
import ComentarioModal from './ComentarioModal'; // Ruta del modal
import './Test.css';

const ComentariosPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [currentComment, setCurrentComment] = useState<{
    username: string;
    comment: string;
  } | null>(null); // Estado para el comentario que se edita

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

  const openModalForCreate = () => {
    setCurrentComment(null); // Limpiamos el estado para creación
    setIsModalOpen(true);
  };

  const openModalForEdit = (username: string, comment: string) => {
    setCurrentComment({ username, comment }); // Establecemos el comentario a editar
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentComment(null); // Limpiamos el estado después de cerrar
  };

  const handleSaveComment = (username: string, comment: string) => {
    if (currentComment) {
      console.log(`Guardando cambios para ${username}: ${comment}`);
      // Aquí puedes manejar la lógica de edición en tu backend o estado
    } else {
      console.log(`Creando un nuevo comentario: ${username}, ${comment}`);
      // Aquí puedes manejar la lógica de creación en tu backend o estado
    }
    closeModal();
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

        {/* Título y botón Agregar Comentario */}
        <div className="header-container">
          <h1 className="page-title">Preguntas y Respuestas</h1>
          <button className="create-button" onClick={openModalForCreate}>
            Agregar Comentario
          </button>
        </div>

        {/* Contenedor de comentarios */}
        <div className="comentarios-container">
          {comentarios.map((comentario, index) => (
            <ComentarioCard
              key={index}
              avatarUrl={comentario.avatarUrl}
              usuario={comentario.username}
              comentario={comentario.comment}
              onEdit={() => openModalForEdit(comentario.username, comentario.comment)}
              onDelete={() => console.log(`Eliminar comentario de ${comentario.username}`)}
            />
          ))}
        </div>

        {/* Modal de Comentarios */}
        <ComentarioModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </IonContent>
    </IonPage>
  );
};

export default ComentariosPage;
