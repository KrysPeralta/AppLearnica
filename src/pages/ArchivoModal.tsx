import React from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './ArchivoModal.css';

interface ArchivoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchivoModal: React.FC<ArchivoModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Se cierra el modal al tocar fuera de él
      backdropDismiss={true} // Habilitar cierre al tocar fuera
      className="archivo-modal"
    >
      <div className="archivo-modal-content">
        <div className="archivo-modal-icon">📂</div>
        <h2 className="archivo-modal-title">Archivo ###</h2>
        <div className="archivo-modal-inputs">
          <label>Nombre del Archivo</label>
          <IonInput type="text" className="archivo-input" placeholder="Ingresa el nombre del archivo" />

          <label>Descripción</label>
          <IonInput
            type="text"
            className="archivo-input"
            placeholder="Ingresa una descripción del archivo"
          />

          <label>Enlace</label>
          <IonInput
            type="url"
            className="archivo-input"
            placeholder="Ingresa el enlace (opcional)"
          />
          
          <label>Tipo de Archivo</label>
          <IonSelect
            placeholder="Selecciona el tipo de archivo"
            cancelText="Cancelar"
            okText="Aceptar"
            className="select-tipoA"
          >
            <IonSelectOption value="libro">Libro</IonSelectOption>
            <IonSelectOption value="video">Video</IonSelectOption>
            <IonSelectOption value="pdf">PDF</IonSelectOption>
            <IonSelectOption value="link">Enlace</IonSelectOption>
            <IonSelectOption value="audio">Audio</IonSelectOption>
          </IonSelect>

        </div>

        <div className="archivo-modal-buttons">
          <IonButton expand="block" onClick={onClose} className="archivo-button-primary">
            Guardar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ArchivoModal;


