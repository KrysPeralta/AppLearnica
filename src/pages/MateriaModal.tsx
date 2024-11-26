import React from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './MateriaModal.css';

interface MateriaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MateriaModal: React.FC<MateriaModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Se cierra el modal al tocar fuera de él
      backdropDismiss={true} // Habilitar cierre al tocar fuera
      className="materia-modal"
    >
      <div className="materia-modal-content">
        <div className="materia-modal-icon">📘</div>
        <h2 className="materia-modal-title">Crear o Editar Materia</h2>
        <div className="materia-modal-inputs">
          <label>Nombre de la Materia</label>
          <IonInput type="text" className="materia-input" placeholder="Ingresa el nombre de la materia" />

          <label>Descripción</label>
          <IonInput
            type="text"
            className="materia-input"
            placeholder="Ingresa una descripción de la materia"
          />

          <label>Categoría</label>
          <IonSelect
            placeholder="Selecciona una categoría"
            cancelText="Cancelar"
            okText="Aceptar"
            className="select-categoria"
          >
            <IonSelectOption value="matematicas">Matemáticas</IonSelectOption>
            <IonSelectOption value="ciencias">Ciencias</IonSelectOption>
            <IonSelectOption value="humanidades">Humanidades</IonSelectOption>
            <IonSelectOption value="arte">Arte</IonSelectOption>
            <IonSelectOption value="tecnologia">Tecnología</IonSelectOption>
          </IonSelect>
        </div>

        <div className="materia-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="materia-button-primary">
            Guardar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default MateriaModal;
