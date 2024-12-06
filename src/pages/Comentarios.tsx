import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import Navbar from '../components/navbar/Navbar'; // Barra de navegación
import ComentarioCard from '../components/ComentarioCard/ComentarioCard';
import ComentarioModal from './ComentarioModal'; // Modal de comentarios
import { apiService } from '../services/apiService'; // API Service
import './Test.css';

const ComentariosPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [currentComment, setCurrentComment] = useState<any | null>(null); // Estado para el comentario que se edita
  const [comentarios, setComentarios] = useState<any[]>([]); // Estado para los comentarios

  // Lista de imágenes disponibles en la carpeta "users"
  const images = [
    '/src/assets/images/users/users1.png',
    '/src/assets/images/users/users2.png',
    '/src/assets/images/users/users3.png',
    '/src/assets/images/users/users4.png',
    '/src/assets/images/users/users5.png',
    '/src/assets/images/users/users6.png',
    '/src/assets/images/users/users7.png',
    '/src/assets/images/users/users8.png',
    '/src/assets/images/users/users9.png',
    '/src/assets/images/users/users10.png',
    '/src/assets/images/users/users11.png',
    '/src/assets/images/users/users12.png',
    '/src/assets/images/users/users13.png',
    '/src/assets/images/users/users14.png',
    '/src/assets/images/users/users15.png',
    '/src/assets/images/users/users16.png',
    '/src/assets/images/users/users17.png',
    '/src/assets/images/users/users18.png',
    '/src/assets/images/users/users19.png',
    '/src/assets/images/users/users20.png',
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Función para obtener los comentarios desde la API
  const fetchComentarios = async () => {
    try {
      const response = await apiService.getData('pozo-preguntas/'); // Asegúrate de que la ruta sea '/pozo-preguntas/'
      setComentarios(response.data);
    } catch (error) {
      console.error('Error al obtener los comentarios:', error);
    }
  };

  useEffect(() => {
    fetchComentarios(); // Llamamos la función al cargar la página
  }, []);

  // Función para abrir el modal para crear un nuevo comentario
  const openModalForCreate = () => {
    setCurrentComment(null); // Limpiamos el estado para creación
    setIsModalOpen(true);
  };

  // Función para abrir el modal para editar un comentario
  const openModalForEdit = (comentario: any) => {
    setCurrentComment(comentario); // Establecemos el comentario a editar
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentComment(null); // Limpiar después de cerrar
  };

  const handleSaveComentario = async (comentario: { pregunta: string; respuesta: string; fk_tema: number; creado_por: number }) => {
    try {
      if (currentComment) {
        await apiService.updateData('pozo-preguntas/', currentComment.pk_pozo_pregunta_id, comentario); // Actualiza
      } else {
        await apiService.createData('pozo-preguntas/', comentario); // Crea un nuevo comentario
      }
      fetchComentarios(); // Refrescar los comentarios
      closeModal(); // Cerrar el modal
    } catch (error) {
      console.error('Error al guardar el comentario:', error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <Navbar />

        {/* Título y botón Agregar Comentario */}
        <div className="header-container">
          <h1 className="page-title">Preguntas y Respuestas</h1>
          <IonButton onClick={openModalForCreate}>Agregar Comentario</IonButton>
        </div>

        {/* Contenedor de comentarios */}
        <div className="comentarios-container">
          {comentarios.map((comentario) => (
            <ComentarioCard
              key={comentario.pk_pozo_pregunta_id}
              pregunta={comentario.pregunta}
              respuesta={comentario.respuesta}
              imageUrl={getRandomImage()} // Asignamos una imagen aleatoria
              onEdit={() => openModalForEdit(comentario)} // Editar el comentario
              onDelete={() => console.log(`Eliminar comentario con ID ${comentario.pk_pozo_pregunta_id}`)} // Lógica de eliminación
            />
          ))}
        </div>

        {/* Modal de Comentarios */}
        <ComentarioModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSaveComentario} // Función para guardar
          editingComentario={currentComment} // El comentario que se está editando
        />
      </IonContent>
    </IonPage>
  );
};

export default ComentariosPage;

