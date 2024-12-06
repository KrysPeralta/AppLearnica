import React from 'react';
import { IonToolbar, IonButtons, IonButton, IonTitle, IonIcon } from '@ionic/react';
import { useSession } from '../../context/SessionContext';
import './Navbar.css';
import { homeOutline } from 'ionicons/icons';

const Navbar: React.FC = () => {
  const { isLoggedIn, userRole, logout } = useSession();

  return (
    <div className="navbar"> {/* Contenedor principal con clase personalizada */}
        <a href="/" className="navbar-logo">
         <IonIcon icon={homeOutline} size="large" />
        </a>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <a href="/Test">Test</a>
            <a href="/Comentarios">Comentarios</a>
            <a href="/Biblioteca">Biblioteca</a>
          </>
        ) : (
          <>
            <a href="/Test">Test de Estilos</a>
            <a href="/Instituciones">Instituciones</a>
            <a href="/Grupos">Grupos</a>
            <a href="/Biblioteca">Biblioteca</a>
            <a href="/Comentarios">Comentarios</a>
            <a href="/PerfilPage">Perfil</a>
          </>
        )}
      </div>
      {!isLoggedIn ? (
        <button className="login-button" onClick={() => window.dispatchEvent(new Event('open-login-modal'))}>
          Iniciar sesión
        </button>
      ) : (
        <button className="login-button" onClick={logout}>
          Cerrar sesión
        </button>
      )}
    </div>
  );
};

export default Navbar;
