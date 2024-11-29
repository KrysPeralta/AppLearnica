//EL NOMBRE DEL ARCHIVO ES: Home.tsx

import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Home: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <Navbar />

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

export default Home;
