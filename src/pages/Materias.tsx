import { IonContent, IonPage } from '@ionic/react';

import { useState } from 'react';
import Navbar from '../components/navbar/Navbar'; // Navbar reutilizable
import LoginModal from './LoginModal'; // Modal de inicio de sesión
import RegisterModal from './RegisterModal'; // Modal de registro
import MateriaModal from './MateriaModal'; // Modal de creación/edición de materias
import MateriasCard from '../components/MateriasCard/MateriasCard'; // Componente exclusivo para Materias

const Materias: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMateriaModalOpen, setIsMateriaModalOpen] = useState(false);
  const [editingMateria, setEditingMateria] = useState<string | null>(null); // Estado para editar materia

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false); // Cierra el modal de login si está abierto
  };

  const closeRegisterModal = () => setIsRegisterModalOpen(false);

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
        {/* Barra de navegación */}
        <Navbar />

        {/* Header con título y botón */}
        <div className="header-container">
          <h1 className="page-title">Materias</h1>
          <button className="create-button" onClick={() => openMateriaModal(null)}>
            Crear Materia
          </button>
        </div>

        {/* Tarjetas de materias */}
        <div className="materias-card-wrapper">
          <MateriasCard 
            title="Cálculo" 
            description="Profundiza en los conceptos avanzados de cálculo diferencial e integral."
            imageUrl="/src/assets/images/materias/materia_1.png"
            onEdit={() => openMateriaModal("Cálculo")}
            onDelete={() => handleDelete("Cálculo")}
          />
          <MateriasCard 
            title="Habilidad Verbal" 
            description="Mejora tus habilidades lingüísticas y de comprensión verbal."
            imageUrl="/src/assets/images/materias/materia_2.png"
            onEdit={() => openMateriaModal("Habilidad Verbal")}
            onDelete={() => handleDelete("Habilidad Verbal")}
          />
          <MateriasCard 
            title="Redes" 
            description="Aprende los fundamentos de las redes de computadoras y su configuración."
            imageUrl="/src/assets/images/materias/materia_3.png"
            onEdit={() => openMateriaModal("Redes")}
            onDelete={() => handleDelete("Redes")}
          />
          <MateriasCard 
            title="Programación" 
            description="Domina los principios de la programación en diversos lenguajes."
            imageUrl="/src/assets/images/materias/materia_4.png"
            onEdit={() => openMateriaModal("Programación")}
            onDelete={() => handleDelete("Programación")}
          />
          <MateriasCard 
            title="Química" 
            description="Explora las propiedades y transformaciones de la materia."
            imageUrl="/src/assets/images/materias/materia_5.png"
            onEdit={() => openMateriaModal("Química")}
            onDelete={() => handleDelete("Química")}
          />
          <MateriasCard 
            title="Diseño Arquitectónico" 
            description="Descubre los fundamentos del diseño y la planificación arquitectónica."
            imageUrl="/src/assets/images/materias/materia_6.png"
            onEdit={() => openMateriaModal("Diseño Arquitectónico")}
            onDelete={() => handleDelete("Diseño Arquitectónico")}
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
        <MateriaModal 
          isOpen={isMateriaModalOpen} 
          onClose={closeMateriaModal} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Materias;


