import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Home: React.FC = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false); // Cerrar el Modal de Login si está abierto
    setIsRegisterModalOpen(true);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false); // Cerrar el Modal de Registro si está abierto
    setIsLoginModalOpen(true);
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
          <button className="login-button" onClick={() => setIsLoginModalOpen(true)}>Iniciar sesión</button>
        </header>

        {/* Carrusel de imágenes con Swiper */}
        <div className="carousel">
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            className="carousel-swiper"
          >
            <SwiperSlide>
              <img src="src/assets/images/img1.jpg" alt="Slide 1" className="carousel-image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="src/assets/images/img2.jpg" alt="Slide 2" className="carousel-image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="src/assets/images/img3.jpg" alt="Slide 3" className="carousel-image" />
            </SwiperSlide>
          </Swiper>
        </div>

        
        {/* Modales */}
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

export default Home;
