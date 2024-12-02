import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonButton } from '@ionic/react';
import { useSession } from '../context/SessionContext'; // Importar el contexto
import { apiService } from '../services/apiService'; // Servicio configurado
import Navbar from '../components/navbar/Navbar'; // Importar correctamente el Navbar
import PerfilModal from './PerfilModal'; // Importar el modal
import './Test.css'; // Estilos específicos para PerfilPage

const PerfilPage: React.FC = () => {
  const { userId } = useSession(); // Obtener el ID del usuario desde el contexto
  const [perfil, setPerfil] = useState<any>(null); // Estado para los datos del perfil
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  useEffect(() => {
    if (userId) {
      fetchPerfil(userId); // Llama a la API con el ID del usuario desde el contexto
    }
  }, [userId]);

  // Función para obtener los datos del perfil desde la API
  const fetchPerfil = async (id: number) => {
    try {
      // Obtener datos del usuario
      const perfilResponse = await apiService.getData('datos_usuario/', id);
      const perfilData = perfilResponse.data;

      // Obtener credenciales asociadas al usuario
      const credencialResponse = await apiService.getData(
        'credenciales_usuario/',
        perfilData.fk_credencial
      );
      const credencialData = credencialResponse.data;

      // Obtener datos de la institución
      const institucionResponse = await apiService.getData(
        'instituciones/',
        perfilData.fk_institucion
      );

      // Combinar los datos en el estado del perfil
      setPerfil({
        ...perfilData,
        correo: credencialData.email,
        rol: credencialData.rol,
        institucion: institucionResponse.data.nombre,
      });
    } catch (err) {
      setError('No se pudo cargar la información del perfil');
      console.error(err);
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <IonPage>
      {/* Header con el Navbar */}
      <IonHeader>
        <Navbar /> {/* Navbar como parte del header */}
      </IonHeader>
      <IonContent fullscreen>
        {/* Contenedor de información del perfil */}
        <div className="perfil-container">
          <h1 className="perfil-title">Mi Perfil</h1>

          {/* Muestra un mensaje de error si falla la carga */}
          {error && <p className="error-message">{error}</p>}

          {/* Muestra los datos del perfil si están disponibles */}
          {perfil ? (
            <div className="perfil-details">
              <p><strong>Nombre:</strong> {perfil.nombre}</p>
              <p><strong>Apellido Paterno:</strong> {perfil.apellido_paterno}</p>
              <p><strong>Apellido Materno:</strong> {perfil.apellido_materno}</p>
              <p><strong>Teléfono:</strong> {perfil.telefono}</p>
              <p><strong>Correo:</strong> {perfil.correo}</p>
              <p><strong>Rol:</strong> {perfil.rol}</p>
              <p><strong>Institución:</strong> {perfil.institucion}</p>
              <p><strong>Grado de Estudio:</strong> {perfil.grado_estudio}</p>
            </div>
          ) : (
            <p>Cargando información del perfil...</p>
          )}

          <IonButton expand="block" onClick={handleEdit} className="perfil-edit-button">
            Editar Información
          </IonButton>
        </div>

        {/* PerfilModal */}
        <PerfilModal isOpen={isModalOpen} onClose={closeModal} />
      </IonContent>
    </IonPage>
  );
};

export default PerfilPage;
