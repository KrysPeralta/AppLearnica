// LoginModal.tsx
import React from 'react';
import { IonModal, IonInput, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom'; // Importa useHistory para redirigir
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const history = useHistory(); // Hook para navegar entre páginas

  // Función para redirigir a la página de Recuperación de Contraseña
  const handlePasswordRecovery = () => {
    onClose(); // Cierra el modal
    history.push('/password-recovery'); // Redirige a la página de recuperación
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {/* Contenedor principal del modal */}
      <div className="login-modal-content">
        
        {/* Ícono del usuario */}
        <div className="login-modal-icon">👤</div>

        {/* Campos de entrada de usuario y contraseña */}
        <div className="login-modal-inputs">
          <label>Usuario</label>
          <IonInput type="text" className="login-input" placeholder="Ingresa tu usuario" />
          <label>Contraseña</label>
          <IonInput type="password" className="login-input" placeholder="Ingresa tu contraseña" />
          <a onClick={handlePasswordRecovery} className="login-modal-recover">
            Recuperar Contraseña
          </a>
        </div>

        {/* Botones de iniciar sesión y registrarse */}
        <div className="login-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="login-button-primary">
            INICIAR SESIÓN
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={onSwitchToRegister} className="login-button-secondary">
            REGÍSTRATE
          </IonButton>
        </div>
        
      </div>
    </IonModal>
  );
};

export default LoginModal;
