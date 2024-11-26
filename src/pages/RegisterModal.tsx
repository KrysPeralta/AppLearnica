import React from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './RegisterModal.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="register-modal">
      {/* Contenedor principal del modal */}
      <div className="register-modal-content">
        {/* Ícono de registro */}
        <div className="register-modal-icon">📝</div>

        {/* Título del modal */}
        <h2 className="register-modal-title">Registro</h2>

        {/* Campos de entrada */}
        <div className="register-modal-inputs">
          <label>Nombre Completo</label>
          <IonInput type="text" className="register-input" placeholder="Ingresa tu nombre completo" />

          <label>Apellidos</label>
          <IonInput type="text" className="register-input" placeholder="Ingresa tus apellidos" />

          <label>Carrera</label>
          <IonSelect 
              placeholder="Selecciona tu carrera"
              cancelText="Cancelar"
              okText="Aceptar" 
            className="select-carrera">
              <IonSelectOption value="ingenieria">Ingeniería</IonSelectOption>
              <IonSelectOption value="medicina">Medicina</IonSelectOption>
              <IonSelectOption value="arquitectura">Arquitectura</IonSelectOption>
              <IonSelectOption value="derecho">Derecho</IonSelectOption>
              <IonSelectOption value="economia">Economía</IonSelectOption>
 
          </IonSelect>

          <label>Matrícula</label>
          <IonInput type="text" className="register-input" placeholder="Ingresa tu matrícula" />

          <label>Correo</label>
          <IonInput type="email" className="register-input" placeholder="Ingresa tu correo electrónico" />

          <label>Contraseña</label>
          <IonInput type="password" className="register-input" placeholder="Crea una contraseña" />
        </div>

        {/* Botones de acción */}
        <div className="register-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="register-button-primary">Registrarme</IonButton>
        </div>
            
        <p>¿Ya tienes una cuenta?</p>
        <a href="#" className="register-modal-recover">Iniciar sesión</a>
      </div>
    </IonModal>
  );
};

export default RegisterModal;
