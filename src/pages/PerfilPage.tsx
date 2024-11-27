import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import './Test.css';

const PerfilPage: React.FC = () => {
  const perfil = {
    nombre: 'Juan Pérez',
    matricula: 'A12345678',
    carrera: 'Ingeniería en Sistemas',
    correo: 'juan.perez@ejemplo.com',
    telefono: '555-123-4567',
    direccion: 'Calle Falsa 123, Ciudad, País',
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
          <div className="perfil-details">
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Matrícula:</strong> {perfil.matricula}</p>
            <p><strong>Carrera:</strong> {perfil.carrera}</p>
            <p><strong>Correo:</strong> {perfil.correo}</p>
            <p><strong>Teléfono:</strong> {perfil.telefono}</p>
            <p><strong>Dirección:</strong> {perfil.direccion}</p>
          </div>
          <IonButton expand="block" onClick={handleEdit} className="perfil-edit-button">
            Editar Información
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PerfilPage;
