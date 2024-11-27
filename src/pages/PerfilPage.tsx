import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { apiService } from '../services/apiService'; // Servicio configurado
import './Test.css';

const PerfilPage: React.FC = () => {
  const [perfil, setPerfil] = useState<any>(null); // Estado para los datos del perfil
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    fetchPerfil(3); // Llama a la API con el ID del usuario que quieras
  }, []);

  // Función para obtener los datos del perfil desde la API
  const fetchPerfil = async (id: number) => {
    try {
      const response = await apiService.getData('datos_usuario/', id); // Llama al servicio con el ID del usuario
      setPerfil(response.data); // Guarda los datos en el estado
    } catch (err) {
      setError('No se pudo cargar la información del perfil');
      console.error(err);
    }
  };

  const handleEdit = () => {
    console.log('Editar información del perfil');
    // Aquí puedes redirigir a una página de edición o abrir un modal
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
              <p><strong>Grado de Estudio:</strong> {perfil.grado_estudio}</p>
            </div>
          ) : (
            <p>Cargando información del perfil...</p>
          )}

          <IonButton expand="block" onClick={handleEdit} className="perfil-edit-button">
            Editar Información
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PerfilPage;
