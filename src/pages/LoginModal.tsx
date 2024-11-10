import React from 'react';
import { IonModal, IonButton, IonInput, IonLabel, IonItem } from '@ionic/react';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
<IonModal isOpen={isOpen} onDidDismiss={onClose} className="custom-modal">
  <div className="login-modal-content">
    {/* Logo del modal */}
    <div className="modal-logo">
      <span role="img" aria-label="user-icon">👤</span>
    </div>

        {/* Campos de usuario y contraseña */}
        <IonItem className="modal-input">
          <IonLabel position="floating">Usuario</IonLabel>
          <IonInput type="text" />
        </IonItem>
        <IonItem className="modal-input">
          <IonLabel position="floating">Contraseña</IonLabel>
          <IonInput type="password" />
        </IonItem>

        {/* Opciones adicionales */}
        <p className="recover-password">Recuperar Contraseña</p>

        {/* Botones de iniciar sesión y registrarse */}
        <IonButton expand="block" className="modal-button">INICIAR SESIÓN</IonButton>
        <IonButton expand="block" fill="outline" className="modal-button">REGÍSTRATE</IonButton>
      </div>
    </IonModal>
  );
};

export default LoginModal;
