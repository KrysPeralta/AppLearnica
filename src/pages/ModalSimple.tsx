import React from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './PerfilModal.css'; // Cambiar el archivo CSS al nuevo nombre

interface PerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerfilModal: React.FC<PerfilModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Se cierra el modal al tocar fuera de él
      backdropDismiss={true} // Habilitar cierre al tocar fuera
      className="perfil-modal" // Actualizar el nombre de la clase principal
    >
      <div className="perfil-modal-content">
        <div className="perfil-modal-icon">📘</div>
        <h2 className="perfil-modal-title">Crear o Editar Perfil</h2>
        <div className="perfil-modal-inputs">
          <label>Nombre del Perfil</label>
          <IonInput type="text" className="perfil-input" placeholder="Ingresa el nombre del perfil" />

          <label>Descripción</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa una descripción del perfil"
          />

          <label>Categoría</label>
          <IonSelect
            placeholder="Selecciona una categoría"
            cancelText="Cancelar"
            okText="Aceptar"
            className="select-categoria-perfil" // Clase actualizada
          >
            <IonSelectOption value="matematicas">Matemáticas</IonSelectOption>
            <IonSelectOption value="ciencias">Ciencias</IonSelectOption>
            <IonSelectOption value="humanidades">Humanidades</IonSelectOption>
            <IonSelectOption value="arte">Arte</IonSelectOption>
            <IonSelectOption value="tecnologia">Tecnología</IonSelectOption>
          </IonSelect>
        </div>

        <div className="perfil-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="perfil-button-primary">
            Guardar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default PerfilModal;

