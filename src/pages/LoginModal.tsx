// LoginModal.tsx
import React from 'react';
import { IonModal, IonInput, IonButton } from '@ionic/react';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister}) => {
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
          <a href="#" className="login-modal-recover">Recuperar Contraseña</a>
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
