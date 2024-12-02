import React from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './GruposModal.css';

interface GruposModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GruposModal: React.FC<GruposModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Cerrar modal al tocar fuera
      backdropDismiss={true} // Habilitar cierre al tocar fuera
      className="grupos-modal"
    >
      <div className="grupos-modal-content">
        <div className="grupos-modal-icon">👥</div>
        <h2 className="grupos-modal-title">Crear o Editar Grupo</h2>
        <div className="grupos-modal-inputs">
          <label>Nombre del Grupo</label>
          <IonInput
            type="text"
            className="grupos-input"
            placeholder="Ingresa el nombre del grupo"
          />

          <label>Descripción</label>
          <IonInput
            type="text"
            className="grupos-input"
            placeholder="Ingresa una breve descripción del grupo"
          />

          <label>Categoría</label>
          <IonSelect
            placeholder="Selecciona una categoría"
            cancelText="Cancelar"
            okText="Aceptar"
            className="select-categoria"
          >
            <IonSelectOption value="academico">Académico</IonSelectOption>
            <IonSelectOption value="deportivo">Deportivo</IonSelectOption>
            <IonSelectOption value="cultural">Cultural</IonSelectOption>
            <IonSelectOption value="otro">Otro</IonSelectOption>
          </IonSelect>
        </div>

        <div className="grupos-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="grupos-button-primary">
            Guardar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default GruposModal;
