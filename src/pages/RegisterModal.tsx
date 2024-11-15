import React from 'react';
import { IonModal, IonInput, IonButton, IonContent } from '@ionic/react';
import './RegisterModal.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonContent className="register-modal-content">
        <div className="register-modal-inner">
          <h2 className="register-modal-title">Registro</h2>
          
          <div className="register-modal-scrollable">
            <label>Nombre Completo</label>
            <IonInput type="text" className="register-input" placeholder="Ingresa tu nombre completo" />

            <label>Apellidos</label>
            <IonInput type="text" className="register-input" placeholder="Ingresa tus apellidos" />

            <label>Carrera</label>
            <IonInput type="text" className="register-input" placeholder="Ingresa tu carrera" />

            <label>Matrícula</label>
            <IonInput type="text" className="register-input" placeholder="Ingresa tu matrícula" />

            <label>Correo</label>
            <IonInput type="email" className="register-input" placeholder="Ingresa tu correo electrónico" />

            <label>Contraseña</label>
            <IonInput type="password" className="register-input" placeholder="Crea una contraseña" />
          </div>

          <div className="register-modal-buttons">
            <IonButton expand="block" onClick={onClose} className="register-button-primary">Registrarme</IonButton>
          </div>

          <p className="switch-to-login" onClick={onSwitchToLogin}>¿Ya tienes una cuenta? Inicia sesión</p>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default RegisterModal;
