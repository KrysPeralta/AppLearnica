import { IonContent, IonPage } from '@ionic/react';  
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Grupos: React.FC = () => {
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

  // Función para editar un grupo
  const handleEdit = (title: string) => {
    console.log(`Editar ${title}`);
    // Aquí puedes agregar la lógica para abrir un modal de edición
  };

  // Función para eliminar un grupo
  const handleDelete = (title: string) => {
    console.log(`Eliminar ${title}`);
    // Aquí puedes agregar la lógica para confirmar y eliminar el grupo
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Grupos">Grupos</a>
            <a href="/Biblioteca">Biblioteca</a>
          </nav>
          <button className="login-button" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</button>
        </header>

        <h1 className="page-title">Grupos</h1>

        <div className="cards-container">
          <ContentCard 
            title="Grupo A" 
            description="Grupo enfocado en el estudio avanzado de matemáticas aplicadas."
            imageUrl="/src/assets/images/grupos/grupos_1.png"
            onEdit={() => handleEdit("Grupo A")}
            onDelete={() => handleDelete("Grupo A")}
          />
          <ContentCard 
            title="Grupo B" 
            description="Estudio de habilidades verbales y comunicación efectiva."
            imageUrl="/src/assets/images/grupos/grupos_2.png"
            onEdit={() => handleEdit("Grupo B")}
            onDelete={() => handleDelete("Grupo B")}
          />
          <ContentCard 
            title="Grupo C" 
            description="Fundamentos y configuración de redes de computadoras."
            imageUrl="/src/assets/images/grupos/grupos_3.png"
            onEdit={() => handleEdit("Grupo C")}
            onDelete={() => handleDelete("Grupo C")}
          />
          <ContentCard 
            title="Grupo D" 
            description="Introducción y prácticas en programación básica y avanzada."
            imageUrl="/src/assets/images/grupos/grupos_4.png"
            onEdit={() => handleEdit("Grupo D")}
            onDelete={() => handleDelete("Grupo D")}
          />
          <ContentCard 
            title="Grupo E" 
            description="Grupo dedicado a la exploración de conceptos en química."
            imageUrl="/src/assets/images/grupos/grupos_5.png"
            onEdit={() => handleEdit("Grupo E")}
            onDelete={() => handleDelete("Grupo E")}
          />
          <ContentCard 
            title="Grupo F" 
            description="Estudio del diseño arquitectónico y su aplicación práctica."
            imageUrl="/src/assets/images/grupos/grupos_6.png"
            onEdit={() => handleEdit("Grupo F")}
            onDelete={() => handleDelete("Grupo F")}
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

export default Grupos;


