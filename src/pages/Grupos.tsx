import { IonContent, IonPage } from '@ionic/react';  
import './Test.css';

import { useState } from 'react';
import Navbar from '../components/navbar/Navbar'; // Navbar reutilizable
import LoginModal from './LoginModal'; // Modal de inicio de sesión
import RegisterModal from './RegisterModal'; // Modal de registro
import GruposModal from './GruposModal'; // Modal de creación/edición de grupos
import GruposCard from '../components/GruposCard/GruposCard'; // Componente GruposCard

const Grupos: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isGruposModalOpen, setIsGruposModalOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<string | null>(null); // Estado para editar grupo

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false); // Cierra el modal de login si está abierto
  };

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const openGruposModal = (grupoTitle: string | null = null) => {
    setEditingGrupo(grupoTitle); // Si es null, significa que se creará un grupo nuevo
    setIsGruposModalOpen(true);
  };

  const closeGruposModal = () => {
    setEditingGrupo(null); // Reiniciar estado
    setIsGruposModalOpen(false);
  };

  // Función para eliminar un grupo
  const handleDelete = (title: string) => {
    console.log(`Eliminar ${title}`);
    // Aquí puedes agregar la lógica para confirmar y eliminar el grupo
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <Navbar />

        {/* Título y botón Crear Grupo */}
        <div className="header-container">
          <h1 className="page-title">Grupos</h1>
          <button className="create-button" onClick={() => openGruposModal(null)}>
            Crear Grupo
          </button>
        </div>

        {/* Tarjetas de grupos */}
        <div className="grupos-card-wrapper">
          <GruposCard 
            title="Grupo A" 
            description="Grupo enfocado en el estudio avanzado de matemáticas."
            imageUrl="/src/assets/images/grupos/grupos_1.png"
            onEdit={() => openGruposModal("Grupo A")}
            onDelete={() => handleDelete("Grupo A")}
          />
          <GruposCard 
            title="Grupo B" 
            description="Estudio de habilidades verbales."
            imageUrl="/src/assets/images/grupos/grupos_2.png"
            onEdit={() => openGruposModal("Grupo B")}
            onDelete={() => handleDelete("Grupo B")}
          />
          <GruposCard 
            title="Grupo C" 
            description="Fundamentos y configuración de redes de computadoras."
            imageUrl="/src/assets/images/grupos/grupos_3.png"
            onEdit={() => openGruposModal("Grupo C")}
            onDelete={() => handleDelete("Grupo C")}
          />
          <GruposCard 
            title="Grupo D" 
            description="Introducción y prácticas en programación básica y avanzada."
            imageUrl="/src/assets/images/grupos/grupos_4.png"
            onEdit={() => openGruposModal("Grupo D")}
            onDelete={() => handleDelete("Grupo D")}
          />
          <GruposCard 
            title="Grupo E" 
            description="Grupo dedicado a la exploración de conceptos en química."
            imageUrl="/src/assets/images/grupos/grupos_5.png"
            onEdit={() => openGruposModal("Grupo E")}
            onDelete={() => handleDelete("Grupo E")}
          />
          <GruposCard 
            title="Grupo F" 
            description="Estudio del diseño arquitectónico y su aplicación práctica."
            imageUrl="/src/assets/images/grupos/grupos_6.png"
            onEdit={() => openGruposModal("Grupo F")}
            onDelete={() => handleDelete("Grupo F")}
          />
        </div>

        {/* Modales */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal}
          onSwitchToRegister={openRegisterModal} 
        />
        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={closeRegisterModal} 
          onSwitchToLogin={openLoginModal} 
        />
        <GruposModal 
          isOpen={isGruposModalOpen} 
          onClose={closeGruposModal} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Grupos;


