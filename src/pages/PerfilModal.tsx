import React from 'react';
import { IonModal, IonInput, IonButton } from '@ionic/react';
import './PerfilModal.css'; // Estilos exclusivos del modal

interface PerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PerfilModal: React.FC<PerfilModalProps> = ({ isOpen, onClose }) => {
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose} // Se cierra el modal al tocar fuera de él
      backdropDismiss={true} // Permite cerrar al tocar fuera
      className="perfil-modal"
    >
      <div className="perfil-modal-content">
        <h2 className="perfil-modal-title">Editar Perfil</h2>
        
        {/* Campo: Nombre */}
        <div className="perfil-modal-inputs">
          <label>Nombre</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa el nombre"
          />
        </div>

        {/* Campo: Apellido Paterno */}
        <div className="perfil-modal-inputs">
          <label>Apellido Paterno</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa el apellido paterno"
          />
        </div>

        {/* Campo: Apellido Materno */}
        <div className="perfil-modal-inputs">
          <label>Apellido Materno</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa el apellido materno"
          />
        </div>

        {/* Campo: Teléfono */}
        <div className="perfil-modal-inputs">
          <label>Teléfono</label>
          <IonInput
            type="tel"
            className="perfil-input"
            placeholder="Ingresa el número de teléfono"
          />
        </div>

        {/* Campo: Correo */}
        <div className="perfil-modal-inputs">
          <label>Correo</label>
          <IonInput
            type="email"
            className="perfil-input"
            placeholder="Ingresa el correo electrónico"
          />
        </div>

        {/* Campo: Rol */}
        <div className="perfil-modal-inputs">
          <label>Rol</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa el rol"
          />
        </div>

        {/* Campo: Institución */}
        <div className="perfil-modal-inputs">
          <label>Institución</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa la institución"
          />
        </div>

        {/* Campo: Grado de Estudio */}
        <div className="perfil-modal-inputs">
          <label>Grado de Estudio</label>
          <IonInput
            type="text"
            className="perfil-input"
            placeholder="Ingresa el grado de estudio"
          />
        </div>

        {/* Botón para guardar */}
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


