import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import Navbar from '../components/navbar/Navbar';
import InstitucionesCard from '../components/InstitucionesCard/InstitucionesCard';
import InstitucionesModal from './InstitucionesModal';
import { apiService } from '../services/apiService';
import './Test.css';

interface Institucion {
  pk_institucion_id: number;
  nombre: string;
  direccion: string;
}

const Instituciones: React.FC = () => {
  const [instituciones, setInstituciones] = useState<Institucion[]>([]);
  const [isInstitucionesModalOpen, setIsInstitucionesModalOpen] = useState(false);
  const [editingInstitucion, setEditingInstitucion] = useState<Institucion | null>(null);

  // Lista de imágenes disponibles en la carpeta "instituciones"
  const images = [
    '/assets/images/instituciones/institucion_1.png',
    '/assets/images/instituciones/institucion_2.png',
    '/assets/images/instituciones/institucion_3.png',
    '/assets/images/instituciones/institucion_4.png',
    '/assets/images/instituciones/institucion_5.png',
    '/assets/images/instituciones/institucion_6.png',
  ];

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const fetchInstituciones = async () => {
    try {
      const response = await apiService.getData('instituciones/');
      setInstituciones(response.data);
    } catch (error) {
      console.error('Error al obtener las instituciones:', error);
    }
  };

  const handleSaveInstitucion = async (institucion: { nombre: string; direccion: string }) => {
    try {
      if (editingInstitucion) {
        await apiService.updateData('instituciones/', editingInstitucion.pk_institucion_id, institucion);
      } else {
        await apiService.createData('instituciones/', institucion);
      }
      fetchInstituciones();
      closeInstitucionesModal();
    } catch (error) {
      console.error('Error al guardar la institución:', error);
    }
  };

  const handleDeleteInstitucion = async (id: number) => {
    try {
      await apiService.deleteData('instituciones/', id);
      fetchInstituciones();
    } catch (error) {
      console.error('Error al eliminar la institución:', error);
    }
  };

  const openInstitucionesModal = (institucion: Institucion | null = null) => {
    setEditingInstitucion(institucion);
    setIsInstitucionesModalOpen(true);
  };

  const closeInstitucionesModal = () => {
    setEditingInstitucion(null);
    setIsInstitucionesModalOpen(false);
  };

  useEffect(() => {
    fetchInstituciones();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Navbar />
        <div className="header-container">
          <h1 className="page-title">Instituciones</h1>
          <button className="create-button"onClick={() => openInstitucionesModal(null)}>Crear Institución</button>
        </div>
        <div className="instituciones-card-wrapper">
          {instituciones.map((institucion) => (
            <InstitucionesCard
              key={institucion.pk_institucion_id}
              title={institucion.nombre}
              description={institucion.direccion}
              imageUrl={getRandomImage()} // Asignamos una imagen aleatoria
              onEdit={() => openInstitucionesModal(institucion)}
              onDelete={() => handleDeleteInstitucion(institucion.pk_institucion_id)}
            />
          ))}
        </div>
        <InstitucionesModal
          isOpen={isInstitucionesModalOpen}
          onClose={closeInstitucionesModal}
          onSave={handleSaveInstitucion}
          editingInstitucion={editingInstitucion}
        />
      </IonContent>
    </IonPage>
  );
};

export default Instituciones;
