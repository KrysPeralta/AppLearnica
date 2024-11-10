import { IonContent, IonPage } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/test">Test de Estilos</a>
            <a href="/materias">Materias</a>
            <a href="/biblioteca">Biblioteca</a>
          </nav>
          <button className="login-button">Iniciar sesión</button>
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
