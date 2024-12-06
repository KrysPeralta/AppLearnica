import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonButton, IonIcon } from '@ionic/react';
import { pencilOutline } from 'ionicons/icons';
import { useSession } from '../context/SessionContext';
import { apiService } from '../services/apiService';
import Navbar from '../components/navbar/Navbar';
import PerfilModal from './PerfilModal'; // Modal para editar el perfil
import './PerfilPage.css'; // Archivo CSS

const PerfilPage: React.FC = () => {
  const { userId } = useSession();
  const [perfil, setPerfil] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchPerfil(userId);
    }
  }, [userId]);

  const fetchPerfil = async (id: number) => {
    try {
      const perfilResponse = await apiService.getData(`datos_usuario/`, id);
      const perfilData = perfilResponse.data;

      const credencialResponse = await apiService.getData(
        `credenciales_usuario/`,
        perfilData.fk_credencial
      );
      const credencialData = credencialResponse.data;

      const institucionResponse = await apiService.getData(
        `instituciones/`,
        perfilData.fk_institucion
      );

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
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = (updatedData: any) => {
    setPerfil({ ...perfil, ...updatedData });
  };

  return (
    <IonPage>
      <IonHeader>
        <Navbar />
      </IonHeader>
      <IonContent fullscreen>
        <div className="perfil-container">
          <div className="perfil-header">
            <div className="perfil-avatar">
              <img src="/assets/images/users/users17.png" alt="Avatar del usuario" />
            </div>
            <h1 className="perfil-title">Mi Perfil</h1>
          </div>

          {error && <p className="error-message">{error}</p>}

          {perfil ? (
            <div className="perfil-details">
              <div className="perfil-section">
                <h2 className="perfil-section-title">Información Personal</h2>
                <div className="perfil-item">
                  <span className="perfil-label">Nombre:</span> {perfil.nombre}
                </div>
                <div className="perfil-item">
                  <span className="perfil-label">Apellido Paterno:</span> {perfil.apellido_paterno}
                </div>
                <div className="perfil-item">
                  <span className="perfil-label">Apellido Materno:</span> {perfil.apellido_materno}
                </div>
                <div className="perfil-item">
                  <span className="perfil-label">Teléfono:</span> {perfil.telefono}
                </div>
              </div>
              <hr className="perfil-divider" />
              <div className="perfil-section">
                <h2 className="perfil-section-title">Cuenta</h2>
                <div className="perfil-item">
                  <span className="perfil-label">Correo:</span> {perfil.correo}
                </div>
                <div className="perfil-item">
                  <span className="perfil-label">Rol:</span> {perfil.rol}
                </div>
              </div>
              <hr className="perfil-divider" />
              <div className="perfil-section">
                <h2 className="perfil-section-title">Institución</h2>
                <div className="perfil-item">
                  <span className="perfil-label">Institución:</span> {perfil.institucion}
                </div>
                <div className="perfil-item">
                  <span className="perfil-label">Grado de Estudio:</span> {perfil.grado_estudio}
                </div>
              </div>
            </div>
          ) : (
            <p className="perfil-loading">Cargando información del perfil...</p>
          )}

          <IonButton expand="block" onClick={handleEdit} className="perfil-edit-button">
            <IonIcon icon={pencilOutline} slot="start" />
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
