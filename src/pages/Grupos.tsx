import { IonContent, IonPage } from '@ionic/react';  
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import GruposModal from './GruposModal'; // Importa el modal de Grupos
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Grupos: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isGruposModalOpen, setIsGruposModalOpen] = useState(false);
  const [editingGrupo, setEditingGrupo] = useState<string | null>(null); // Para editar grupo

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsGruposModalOpen(true);
  };

  const openLoginModal = () => {
    setIsGruposModalOpen(false);
    setIsLoginModalOpen(true);
  };

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
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Grupos">Grupos</a>
            <a href="/Biblioteca">Biblioteca</a>
            <a href="/Comentarios">Comentarios</a>  
          </nav>
          <button className="login-button" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</button>
        </header>

        {/* Título y botón Crear Grupo */}
        <div className="header-container">
          <h1 className="page-title">Grupos</h1>
          <button className="create-button" onClick={() => openGruposModal(null)}>
            Crear Grupo
          </button>
        </div>

        <div className="content-card-wrapper">
          <ContentCard 
            title="Grupo A" 
            description="Grupo enfocado en el estudio avanzado de matemáticas."
            imageUrl="/assets/images/grupos/grupos_1.png"
            onEdit={() => openGruposModal("Grupo A")}
            onDelete={() => handleDelete("Grupo A")}
          />
          <ContentCard 
            title="Grupo B" 
            description="Estudio de habilidades verbales."
            imageUrl="/assets/images/grupos/grupos_2.png"
            onEdit={() => openGruposModal("Grupo B")}
            onDelete={() => handleDelete("Grupo B")}
          />
          <ContentCard 
            title="Grupo C" 
            description="Fundamentos y configuración de redes de computadoras."
            imageUrl="/assets/images/grupos/grupos_3.png"
            onEdit={() => openGruposModal("Grupo C")}
            onDelete={() => handleDelete("Grupo C")}
          />
          <ContentCard 
            title="Grupo D" 
            description="Introducción y prácticas en programación básica y avanzada."
            imageUrl="/assets/images/grupos/grupos_4.png"
            onEdit={() => openGruposModal("Grupo D")}
            onDelete={() => handleDelete("Grupo D")}
          />
          <ContentCard 
            title="Grupo E" 
            description="Grupo dedicado a la exploración de conceptos en química."
            imageUrl="/assets/images/grupos/grupos_5.png"
            onEdit={() => openGruposModal("Grupo E")}
            onDelete={() => handleDelete("Grupo E")}
          />
          <ContentCard 
            title="Grupo F" 
            description="Estudio del diseño arquitectónico y su aplicación práctica."
            imageUrl="/assets/images/grupos/grupos_6.png"
            onEdit={() => openGruposModal("Grupo F")}
            onDelete={() => handleDelete("Grupo F")}
          />
        </div>

        {/* Modales */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={openRegisterModal} 
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
