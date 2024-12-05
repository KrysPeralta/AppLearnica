import { IonContent, IonPage } from '@ionic/react';
import './Test.css';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar'; // Barra de navegación
import LoginModal from './LoginModal'; // Modal de inicio de sesión
import RegisterModal from './RegisterModal'; // Modal de registro
import TestCard from '../components/TestCard/TestCard'; // Componente TestCard
import { apiService } from '../services/apiService'; // Servicio API
import CreateTest from './CreateTest'; // Componente CreateTest

interface Evaluacion {
  pk_evaluacion_id: number;
  nombre: string;
  descripcion: string;
}

const Test: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showCreateTest, setShowCreateTest] = useState(false); // Estado para mostrar/ocultar CreateTest
  const [evaluaciones, setEvaluaciones] = useState<Evaluacion[]>([]); // Estado inicial como arreglo vacío
  const history = useHistory(); // Hook para navegación

  // Lista de imágenes disponibles en la carpeta "test"
  const images = [
    '/src/assets/images/test/test_1.png',
    '/src/assets/images/test/test_2.png',
    '/src/assets/images/test/test_3.png',
    '/src/assets/images/test/test_4.png',
    '/src/assets/images/test/test_5.png',
    '/src/assets/images/test/test_6.png',
  ];

  // Función para obtener una imagen aleatoria
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // Obtener las evaluaciones desde la API
  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const response = await apiService.getData('evaluaciones/'); // Usa el servicio para obtener datos
        if (Array.isArray(response.data)) {
          setEvaluaciones(response.data); // Solo establece el estado si es un arreglo
        } else {
          console.error('La respuesta no es un arreglo:', response.data);
        }
      } catch (error) {
        console.error('Error al cargar las evaluaciones:', error);
      }
    };

    fetchEvaluaciones();
  }, []);

  // Manejo de eventos globales para abrir los modales
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

  const handleCardClick = (testId: number) => {
    history.push(`/TestView/${testId}`); // Navega a la página TestView con el ID del test
  };

  const handleEdit = (event: React.MouseEvent, testName: string) => {
    event.stopPropagation(); // Evita que el clic propague al contenedor padre
    console.log(`Editar ${testName}`);
  };

  const handleDelete = (event: React.MouseEvent, testName: string) => {
    event.stopPropagation(); // Evita que el clic propague al contenedor padre
    console.log(`Eliminar ${testName}`);
  };

  if (showCreateTest) {
    // Si el estado `showCreateTest` es true, muestra el componente CreateTest
    return <CreateTest />;
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <Navbar />

        {/* Header con título y botón */}
        <div className="header-container">
          <h1 className="page-title">Evaluaciones Disponibles</h1>
          <button className="create-button" onClick={() => setShowCreateTest(true)}>
            Agregar Test
          </button>
        </div>

        {/* Tarjetas de evaluaciones */}
        <div className="test-card-wrapper">
          {Array.isArray(evaluaciones) && evaluaciones.length > 0 ? (
            evaluaciones.map((evaluacion) => (
              <TestCard
                key={evaluacion.pk_evaluacion_id}
                title={evaluacion.nombre}
                description={evaluacion.descripcion}
                imageUrl={getRandomImage()}
                onEdit={(event) => handleEdit(event, evaluacion.nombre)}
                onDelete={(event) => handleDelete(event, evaluacion.nombre)}
                onClick={() => handleCardClick(evaluacion.pk_evaluacion_id)}
              />
            ))
          ) : (
            <p>No hay evaluaciones disponibles</p>
          )}
        </div>

        {/* Modales */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToRegister={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }} 
        />

        <RegisterModal 
          isOpen={isRegisterModalOpen} 
          onClose={() => setIsRegisterModalOpen(false)} 
          onSwitchToLogin={() => {
            setIsRegisterModalOpen(false);
            setIsLoginModalOpen(true);
          }} 
        />
      </IonContent>
    </IonPage>
  );
};

export default Test;
