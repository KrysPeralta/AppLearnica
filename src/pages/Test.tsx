import { IonContent, IonPage } from '@ionic/react';
import './Test.css';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar'; // Barra de navegación
import LoginModal from './LoginModal'; // Modal de inicio de sesión
import RegisterModal from './RegisterModal'; // Modal de registro
import ContentCard from '../components/ContentCard/ContentCard'; // Componente de tarjeta

const Test: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const history = useHistory(); // Hook para navegación

  // Manejo de eventos globales para abrir modales
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
        {/* Barra de navegación */}
        <Navbar />

        {/* Header con título y botón */}
        <div className="header-container">
          <h1 className="page-title">Test de Estilos de Aprendizaje</h1>
          <button className="create-button" onClick={handleCreateTest}>
            Crear Test
          </button>
        </div>

        {/* Tarjetas de contenido */}
        <div className="content-card-wrapper">
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

        {/* Modales */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={() => setIsRegisterModalOpen(true)} 
        />

        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSwitchToLogin={() => setIsLoginModalOpen(true)} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Test;
