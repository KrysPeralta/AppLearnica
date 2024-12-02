import React from 'react';
import { IonModal, IonInput, IonButton } from '@ionic/react';
import './ComentarioModal.css';

interface ComentarioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ComentarioModal: React.FC<ComentarioModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Se cierra el modal al tocar fuera de él
      backdropDismiss={true} // Habilitar cierre al tocar fuera
      className="comentario-modal"
    >
      <div className="comentario-modal-content">
        <div className="comentario-modal-icon">💬</div>
        <h2 className="comentario-modal-title">Nuevo Comentario</h2>
        <div className="comentario-modal-inputs">
          <label>Nombre de Usuario</label>
          <IonInput
            type="text"
            className="comentario-input"
            placeholder="Ingresa el nombre del usuario"
          />

          <label>Comentario</label>
          <IonInput
            type="text"
            className="comentario-input"
            placeholder="Ingresa el comentario"
          />
        </div>

        <div className="comentario-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="comentario-button-primary">
            Guardar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ComentarioModal;
