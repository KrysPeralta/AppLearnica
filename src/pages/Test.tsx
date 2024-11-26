import { IonContent, IonPage } from '@ionic/react';
import './Test.css';

import { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Para navegación
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Test: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const history = useHistory(); // Hook para navegación

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  // Función para redirigir a la página de creación de tests
  const handleCreateTest = () => {
    history.push('/create-test'); // Redirige a la página de creación del test
  };

  const handleEdit = (title: string) => {
    console.log(`Editar ${title}`);
  };

  const handleDelete = (title: string) => {
    console.log(`Eliminar ${title}`);
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

        <div className="header-container">
          <h1 className="page-title">Test de Estilos de Aprendizaje</h1>
          <button className="create-button" onClick={handleCreateTest}>
            Crear Test
          </button>
        </div>

        <div className="content-card-wrapper">
          {/* Tus 6 tarjetas originales */}
          <ContentCard 
            title="Test de Estilos 1" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_1.png" 
            onEdit={() => handleEdit("Test de Estilos 1")}
            onDelete={() => handleDelete("Test de Estilos 1")}
          />
          <ContentCard 
            title="Test de Estilos 2" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_2.png" 
            onEdit={() => handleEdit("Test de Estilos 2")}
            onDelete={() => handleDelete("Test de Estilos 2")}
          />
          <ContentCard 
            title="Test de Estilos 3" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_3.png" 
            onEdit={() => handleEdit("Test de Estilos 3")}
            onDelete={() => handleDelete("Test de Estilos 3")}
          />
          <ContentCard 
            title="Test de Estilos 4" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_4.png" 
            onEdit={() => handleEdit("Test de Estilos 4")}
            onDelete={() => handleDelete("Test de Estilos 4")}
          />
          <ContentCard 
            title="Test de Estilos 5" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_5.png" 
            onEdit={() => handleEdit("Test de Estilos 5")}
            onDelete={() => handleDelete("Test de Estilos 5")}
          />
          <ContentCard 
            title="Test de Estilos 6" 
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor ..."
            imageUrl="/src/assets/images/test/test_6.png" 
            onEdit={() => handleEdit("Test de Estilos 6")}
            onDelete={() => handleDelete("Test de Estilos 6")}
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

