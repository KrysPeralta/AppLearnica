import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonButton } from '@ionic/react';
import { useSession } from '../context/SessionContext'; // Contexto para sesión
import { apiService } from '../services/apiService'; // Servicio API
import Navbar from '../components/navbar/Navbar'; // Navbar
import PerfilModal from './PerfilModal'; // Modal del perfil
import './Test.css'; // Estilos específicos

const PerfilPage: React.FC = () => {
  const { userId } = useSession(); // ID del usuario desde el contexto
  const [perfil, setPerfil] = useState<any>(null); // Datos del perfil
  const [error, setError] = useState<string | null>(null); // Errores
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/cerrar el modal

  useEffect(() => {
    if (userId) {
      fetchPerfil(userId); // Cargar los datos del perfil al iniciar
    }
  }, [userId]);

  // Función para obtener los datos del perfil desde la API
  const fetchPerfil = async (id: number) => {
    try {
      const perfilResponse = await apiService.getData(`datos_usuario/`, id);
      const perfilData = perfilResponse.data;

      // Obtener credenciales asociadas al usuario
      const credencialResponse = await apiService.getData(
        `credenciales_usuario/`,
        perfilData.fk_credencial
      );
      const credencialData = credencialResponse.data;

      // Obtener datos de la institución
      const institucionResponse = await apiService.getData(
        `instituciones/`,
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

  const handleSave = (updatedData: any) => {
    setPerfil({ ...perfil, ...updatedData }); // Actualizar el estado local con los nuevos datos
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <div className="perfil-container">
          <h1 className="perfil-title">Mi Perfil</h1>

          {error && <p className="error-message">{error}</p>}

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

        {perfil && (
          <PerfilModal
            isOpen={isModalOpen}
            onClose={closeModal}
            perfilData={perfil}
            onSave={handleSave}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default PerfilPage;
