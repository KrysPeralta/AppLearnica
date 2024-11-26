import { IonContent, IonPage } from '@ionic/react';
import './Test.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import ArchivoModal from './ArchivoModal'; // Asegúrate de que la ruta sea correcta
import ArchivoCard from '../components/ArchivoCard/ArchivoCard'; // Asegúrate de que la ruta sea correcta

const Biblioteca: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isArchivoModalOpen, setIsArchivoModalOpen] = useState(false);
  const [editingArchivo, setEditingArchivo] = useState<string | null>(null); // Para editar archivo

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openArchivoModal = (archivoTitle: string | null = null) => {
    setEditingArchivo(archivoTitle); // Si es null, significa que se creará un archivo nuevo
    setIsArchivoModalOpen(true);
  };

  const closeArchivoModal = () => {
    setEditingArchivo(null); // Reiniciar estado
    setIsArchivoModalOpen(false);
  };

  const handleDelete = (title: string) => {
    console.log(`Eliminar: ${title}`);
    // Aquí puedes agregar lógica para eliminar el archivo
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Biblioteca">Biblioteca</a>
          </nav>
          <button className="login-button" onClick={openLoginModal}>Iniciar sesión</button>
        </header>

        {/* Título y botón Crear Archivo */}
        <div className="header-container">
          <h1 className="page-title">Biblioteca de Archivos</h1>
          <button className="create-button" onClick={() => openArchivoModal(null)}>
            Crear Archivo
          </button>
        </div>

        {/* Lista de archivos */}
        <div className="archivos-container">
          <ArchivoCard 
            title="Libro de Matemáticas" 
            description="Este libro contiene ejercicios y teoría avanzada de matemáticas."
            type="libro" 
            onEdit={() => openArchivoModal("Libro de Matemáticas")}
            onDelete={() => handleDelete("Libro de Matemáticas")}
          />
          <ArchivoCard 
            title="Video de Ciencia" 
            description="Una breve introducción a los conceptos básicos de la física cuántica."
            type="video" 
            onEdit={() => openArchivoModal("Video de Ciencia")}
            onDelete={() => handleDelete("Video de Ciencia")}
          />
          <ArchivoCard 
            title="PDF de Referencia" 
            description="Documento PDF con los detalles del proyecto."
            type="pdf" 
            onEdit={() => openArchivoModal("PDF de Referencia")}
            onDelete={() => handleDelete("PDF de Referencia")}
          />
          <ArchivoCard 
            title="Enlace Externo" 
            description="Visita nuestro blog para más información."
            type="link" 
            onEdit={() => openArchivoModal("Enlace Externo")}
            onDelete={() => handleDelete("Enlace Externo")}
          />
          <ArchivoCard 
            title="Audio de Historia" 
            description="Grabación de una clase de historia moderna."
            type="audio" 
            onEdit={() => openArchivoModal("Audio de Historia")}
            onDelete={() => handleDelete("Audio de Historia")}
          />
        </div>

        {/* Modales */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={closeLoginModal} 
          onSwitchToRegister={() => console.log("Switch to Register")} 
        />
        <ArchivoModal 
          isOpen={isArchivoModalOpen} 
          onClose={closeArchivoModal} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Biblioteca;
