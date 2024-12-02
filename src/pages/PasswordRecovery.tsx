// PasswordRecoveryPage.tsx
import React from 'react';
import { IonContent, IonPage, IonInput, IonButton } from '@ionic/react';
import './PasswordRecoveryPage.css';

interface PasswordRecoveryPageProps {
  onClose: () => void;
}

const PasswordRecoveryPage: React.FC<PasswordRecoveryPageProps> = ({ onClose }) => {
  return (
    <IonPage>
      <IonContent className="password-recovery-content">
        <div className="password-recovery-inner">
          <h2 className="password-recovery-title">Recuperar Contraseña</h2>
          
          <p className="password-recovery-text">
            Ingresa tu correo electrónico para recibir un enlace de recuperación de contraseña.
          </p>

          <label>Correo Electrónico</label>
          <IonInput type="email" className="password-recovery-input" placeholder="Ingresa tu correo" />

          <IonButton expand="block" onClick={onClose} className="password-recovery-button">
            Enviar Enlace de Recuperación
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PasswordRecoveryPage;
