import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import Navbar from '../components/navbar/Navbar';
import GruposCard from '../components/GruposCard/GruposCard';
import GruposModal from './GruposModal';
import { apiService } from '../services/apiService';

const Grupos: React.FC = () => {
  const [grupos, setGrupos] = useState<any[]>([]);
  const [isGruposModalOpen, setIsGruposModalOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<any | null>(null);

  // Lista de imágenes disponibles en la carpeta "grupos"
  const images = [
    '/assets/images/grupos/grupos_1.png',
    '/assets/images/grupos/grupos_2.png',
    '/assets/images/grupos/grupos_3.png',
    '/assets/images/grupos/grupos_4.png',
    '/assets/images/grupos/grupos_5.png',
    '/assets/images/grupos/grupos_6.png',
  ];

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const fetchGrupos = async () => {
    try {
      const response = await apiService.getData('clases/'); // Asegúrate de que la ruta sea '/clases/'
      setGrupos(response.data);
    } catch (error) {
      console.error('Error al obtener los grupos:', error);
    }
  };

  const handleSaveGrupo = async (grupo: any) => {
    try {
      if (editingGrupo) {
        await apiService.updateData('clases/', editingGrupo.pk_clase_id, grupo); // Asegúrate de usar la ruta correcta
      } else {
        await apiService.createData('clases/', grupo); // Asegúrate de usar la ruta correcta
      }
      fetchGrupos();
      closeGruposModal();
    } catch (error) {
      console.error('Error al guardar el grupo:', error);
    }
  };

  const handleDeleteGrupo = async (id: number) => {
    try {
      await apiService.deleteData('clases/', id); // Asegúrate de usar la ruta correcta
      fetchGrupos();
    } catch (error) {
      console.error('Error al eliminar el grupo:', error);
    }
  };

  const openGruposModal = (grupo: any | null = null) => {
    setEditingGrupo(grupo);
    setIsGruposModalOpen(true);
  };

  const closeGruposModal = () => {
    setEditingGrupo(null);
    setIsGruposModalOpen(false);
  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="header-container">
          <h1 className="page-title">Grupos</h1>
          <button className="create-button" onClick={() => openGruposModal(null)}>Crear Grupo</button>
        </div>
        <div className="grupos-card-wrapper">
          {grupos.map((grupo) => (
            <GruposCard
              key={grupo.pk_clase_id}
              title={grupo.nombre}
              description={grupo.descripcion}
              imageUrl={getRandomImage()} // Asignamos una imagen aleatoria
              onEdit={() => openGruposModal(grupo)}
              onDelete={() => handleDeleteGrupo(grupo.pk_clase_id)}
            />
          ))}
        </div>
        <GruposModal
          isOpen={isGruposModalOpen}
          onClose={closeGruposModal}
          onSave={handleSaveGrupo}
          editingGrupo={editingGrupo}
        />
      </IonContent>
    </IonPage>
  );
};

export default Grupos;
