import { IonContent, IonPage } from '@ionic/react';
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ArchivoCard from '../components/ArchivoCard/ArchivoCard'; // Importa el componente ArchivoCard

const Biblioteca: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Biblioteca">Biblioteca</a>
          </nav>
          <button className="login-button" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</button>
        </header>

        <h1 className="page-title">Biblioteca de Archivos</h1>

        <div className="cards-container">
          <ArchivoCard 
            title="Libro de Matemáticas" 
            description="Este libro contiene ejercicios y teoría avanzada de matemáticas."
            type="libro" 
          />
          <ArchivoCard 
            title="Video de Ciencia" 
            description="Una breve introducción a los conceptos básicos de la física cuántica."
            type="video" 
          />
          <ArchivoCard 
            title="PDF de Referencia" 
            description="Documento PDF con los detalles del proyecto."
            type="pdf" 
          />
          <ArchivoCard 
            title="Enlace Externo" 
            description="Visita nuestro blog para más información."
            type="link" 
          />
          <ArchivoCard 
            title="Audio de Historia" 
            description="Grabación de una clase de historia moderna."
            type="audio" 
          />
        </div> {/* Cierre del contenedor de tarjetas */}

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={openRegisterModal} 
        />
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSwitchToLogin={openLoginModal} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Biblioteca;



