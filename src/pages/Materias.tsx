import { IonContent, IonPage } from '@ionic/react'; 
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Materias: React.FC = () => {

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

        <h1 className="page-title">Materias</h1>

        <div className="cards-container">
          <ContentCard 
            title="Cálculo" 
            description="Profundiza en los conceptos avanzados de cálculo diferencial e integral."
            imageUrl="/src/assets/images/materias/materia_1.png" 
          />
          <ContentCard 
            title="Habilidad Verbal" 
            description="Mejora tus habilidades lingüísticas y de comprensión verbal."
            imageUrl="/src/assets/images/materias/materia_2.png" 
          />
          <ContentCard 
            title="Redes" 
            description="Aprende los fundamentos de las redes de computadoras y su configuración."
            imageUrl="/src/assets/images/materias/materia_3.png" 
          />
          <ContentCard 
            title="Programación" 
            description="Domina los principios de la programación en diversos lenguajes."
            imageUrl="/src/assets/images/materias/materia_4.png" 
          />
          <ContentCard 
            title="Química" 
            description="Explora las propiedades y transformaciones de la materia."
            imageUrl="/src/assets/images/materias/materia_5.png" 
          />
          <ContentCard 
            title="Diseño Arquitectónico" 
            description="Descubre los fundamentos del diseño y la planificación arquitectónica."
            imageUrl="/src/assets/images/materias/materia_6.png" 
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

export default Materias;

