import { IonContent, IonPage, IonHeader } from '@ionic/react';
import './Test.css';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import ArchivoModal from './ArchivoModal';
import ArchivoCard from '../components/ArchivoCard/ArchivoCard';
import LoginModal from './LoginModal'; // Importar el modal de login
import RegisterModal from './RegisterModal'; // Importar el modal de registro
import { useSession } from '../context/SessionContext'; // Hook para manejar la sesión
import { apiService } from '../services/apiService';

const Biblioteca: React.FC = () => {
  const { userId } = useSession(); // Obtener el ID del usuario
  const [archivos, setArchivos] = useState<any[]>([]); // Archivos
  const [isArchivoModalOpen, setIsArchivoModalOpen] = useState(false); // Modal de archivos
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Modal de login
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false); // Modal de registro
  const [editingArchivo, setEditingArchivo] = useState<{
    id?: number;
    type: string;
    url: string;
    fk_tema?: number;
  } | null>(null);

  // Cargar archivos desde la API
  const fetchArchivos = async () => {
    try {
      const response = await apiService.getData('archivos/');
      const archivosData = response.data.map((archivo: any) => ({
        id: archivo.pk_archivo_id,
        type: archivo.tipo_archivo,
        url: archivo.url_archivo,
        fk_tema: archivo.fk_tema,
      }));
      setArchivos(archivosData);
    } catch (error) {
      console.error('Error al cargar archivos:', error);
    }
  };

  // Manejar eventos globales para abrir los modales
  useEffect(() => {
    const openLoginHandler = () => setIsLoginModalOpen(true);
    const openRegisterHandler = () => setIsRegisterModalOpen(true);

    window.addEventListener('open-login-modal', openLoginHandler);
    window.addEventListener('open-register-modal', openRegisterHandler);

    return () => {
      window.removeEventListener('open-login-modal', openLoginHandler);
      window.removeEventListener('open-register-modal', openRegisterHandler);
    };
  }, []);

  useEffect(() => {
    fetchArchivos();
  }, []);

  const openArchivoModal = (archivo: any = null) => {
    setEditingArchivo(archivo);
    setIsArchivoModalOpen(true);
  };

  const closeArchivoModal = () => {
    setEditingArchivo(null);
    setIsArchivoModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.deleteData('archivos/', id);
      fetchArchivos();
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  };

  return (
    <IonPage>
      {/* Header con Navbar */}
      <IonHeader>
        <Navbar />
      </IonHeader>

      <IonContent fullscreen>
        {/* Título y botón para crear un archivo */}
        <div className="header-container">
          <h1 className="page-title">Biblioteca de Archivos</h1>
          {userId && (
            <button className="create-button" onClick={() => openArchivoModal()}>
              Crear Archivo
            </button>
          )}
        </div>

        {/* Lista de archivos */}
        <div className="archivos-container">
          {archivos.map((archivo) => (
            <ArchivoCard
              key={archivo.id}
              type={archivo.type}
              fileUrl={archivo.url}
              onEdit={() => openArchivoModal(archivo)}
              onDelete={() => handleDelete(archivo.id)}
            />
          ))}
        </div>

        {/* Modal para crear o editar archivos */}
        <ArchivoModal
          isOpen={isArchivoModalOpen}
          onClose={closeArchivoModal}
          archivo={editingArchivo}
          onArchivoSaved={fetchArchivos}
          userId={userId} // Pasar el ID del usuario al modal
        />

        {/* Modal de inicio de sesión */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        />

        {/* Modal de registro */}
        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Biblioteca;
