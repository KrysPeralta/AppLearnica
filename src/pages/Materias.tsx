import { IonContent, IonPage } from '@ionic/react'; 
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import MateriaModal from './MateriaModal'; // Asegúrate de que la ruta sea correcta
import ContentCard from '../components/ContentCard/ContentCard'; // Importa el componente ContentCard

const Materias: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMateriaModalOpen, setIsMateriaModalOpen] = useState(false);
  const [editingMateria, setEditingMateria] = useState<string | null>(null); // Para editar materia

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openMateriaModal = (materiaTitle: string | null = null) => {
    setEditingMateria(materiaTitle); // Si es null, significa que se creará una materia nueva
    setIsMateriaModalOpen(true);
  };

  const closeMateriaModal = () => {
    setEditingMateria(null); // Reiniciar estado
    setIsMateriaModalOpen(false);
  };

  const handleDelete = (title: string) => {
    console.log(`Eliminar: ${title}`);
    // Aquí puedes agregar lógica para eliminar la materia
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
          <button className="login-button" onClick={openLoginModal}>Iniciar sesión</button>
        </header>

        <div className="header-container">
          <h1 className="page-title">Materias</h1>
          <button className="create-button" onClick={() => openMateriaModal(null)}>
            Crear Materia
          </button>
        </div>

        <div className="content-card-wrapper">
          <ContentCard 
            title="Cálculo" 
            description="Profundiza en los conceptos avanzados de cálculo diferencial e integral."
            imageUrl="/src/assets/images/materias/materia_1.png"
            onEdit={() => openMateriaModal("Cálculo")}
            onDelete={() => handleDelete("Cálculo")}
          />
          <ContentCard 
            title="Habilidad Verbal" 
            description="Mejora tus habilidades lingüísticas y de comprensión verbal."
            imageUrl="/src/assets/images/materias/materia_2.png"
            onEdit={() => openMateriaModal("Habilidad Verbal")}
            onDelete={() => handleDelete("Habilidad Verbal")}
          />
          <ContentCard 
            title="Redes" 
            description="Aprende los fundamentos de las redes de computadoras y su configuración."
            imageUrl="/src/assets/images/materias/materia_3.png"
            onEdit={() => openMateriaModal("Redes")}
            onDelete={() => handleDelete("Redes")}
          />
          <ContentCard 
            title="Programación" 
            description="Domina los principios de la programación en diversos lenguajes."
            imageUrl="/src/assets/images/materias/materia_4.png"
            onEdit={() => openMateriaModal("Programación")}
            onDelete={() => handleDelete("Programación")}
          />
          <ContentCard 
            title="Química" 
            description="Explora las propiedades y transformaciones de la materia."
            imageUrl="/src/assets/images/materias/materia_5.png"
            onEdit={() => openMateriaModal("Química")}
            onDelete={() => handleDelete("Química")}
          />
          <ContentCard 
            title="Diseño Arquitectónico" 
            description="Descubre los fundamentos del diseño y la planificación arquitectónica."
            imageUrl="/src/assets/images/materias/materia_6.png"
            onEdit={() => openMateriaModal("Diseño Arquitectónico")}
            onDelete={() => handleDelete("Diseño Arquitectónico")}
          />
        </div>

        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal} 
          onSwitchToRegister={() => console.log("Switch to Register")} 
        />
        <MateriaModal 
          isOpen={isMateriaModalOpen} 
          onClose={closeMateriaModal} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Materias;
