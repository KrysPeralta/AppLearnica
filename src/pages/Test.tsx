import { IonContent, IonPage } from '@ionic/react'; 
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Test: React.FC = () => {

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

        <h1 className="page-title">Test de Estilos de Aprendizaje</h1>

        <div className="cards-container">
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_1.png" 
          />
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_2.png" 
          />
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_3.png" 
          />
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_4.png" 
          />
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_5.png" 
          />
          <ContentCard 
            title="Test de Estilos ##" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_6.png" 
          />
        </div>

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

export default Test;
