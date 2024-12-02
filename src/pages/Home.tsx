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

        {/* Carrusel Mejorado */}
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
              <div className="carousel-slide">
                <img
                  src="/assets/images/img1.jpg"
                  alt="Bienestar diario"
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h2>Descubre tu Estilo de Aprendizaje</h2>
                  <p>Realiza tests interactivos para conocer cómo aprendes mejor.</p>
                  <button
                    className="carousel-button"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Empieza ahora
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-slide">
                <img
                  src="/assets/images/img2.jpg"
                  alt="Recomendaciones personalizadas"
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h2>Recomendaciones Personalizadas</h2>
                  <p>Obtén estrategias y actividades diseñadas para tu estilo.</p>
                  <button
                    className="carousel-button"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Descubre Más
                  </button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="carousel-slide">
                <img
                  src="/assets/images/img3.jpg"
                  alt="Visualiza tu progreso"
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <h2>Exámenes Rápidos</h2>
                  <p>Evalúa tus conocimientos y ayuda a tus profesores a entenderte mejor.</p>
                  <button
                    className="carousel-button"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    Ver Más
                  </button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Sección de servicios */}
        <div className="services">
          <h2 className="services-title">¿Qué Ofrecemos?</h2>
          <div className="services-grid">
            <div className="service-card">
              <img src="/assets/images/education.svg" alt="Servicio 1" className="service-icon" />
              <h3>Test de Aprendizaje</h3>
              <p>Descubre cuál es tu tipo de aprendizaje: visual, auditivo o kinestésico.</p>
            </div>
            <div className="service-card">
              <img src="/assets/images/strategy.svg" alt="Servicio 2" className="service-icon" />
              <h3>Estrategias Personalizadas</h3>
              <p>Implementa estrategias efectivas adaptadas a tus necesidades.</p>
            </div>
            <div className="service-card">
              <img src="/assets/images/tests.svg" alt="Servicio 3" className="service-icon" />
              <h3>Exámenes Rápidos</h3>
              <p>Evalúa tu nivel en distintas materias de forma interactiva.</p>
            </div>
            <div className="service-card">
              <img src="/assets/images/resource.svg" alt="Servicio 3" className="service-icon" />
              <h3>Recursos Educativos</h3>
              <p>Accede a materiales proporcionados por tu institución.</p>
            </div>
          </div>
        </div>

        {/* Sección de llamada a la acción */}
        <div className="cta">
          <h2>Únete a Learnica</h2>
          <p>Transforma tu aprendizaje con herramientas diseñadas para ti.</p>
          <button
            className="cta-button"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            Regístrate Ahora
          </button>
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
