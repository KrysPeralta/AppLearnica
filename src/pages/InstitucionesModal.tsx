import React, { useState, useEffect } from 'react';
import { IonModal, IonInput, IonButton } from '@ionic/react';
import './InstitucionesModal.css';

interface InstitucionesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (institucion: { nombre: string; direccion: string }) => void;
  editingInstitucion: { nombre: string; direccion: string } | null;
}

const InstitucionesModal: React.FC<InstitucionesModalProps> = ({ isOpen, onClose, onSave, editingInstitucion }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');

  useEffect(() => {
    if (editingInstitucion) {
      setNombre(editingInstitucion.nombre);
      setDireccion(editingInstitucion.direccion);
    } else {
      setNombre('');
      setDireccion('');
    }
  }, [editingInstitucion]);

  const handleSave = () => {
    onSave({ nombre, direccion });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={true}>
      <div className="instituciones-modal-content">
        <h2>{editingInstitucion ? 'Editar Institución' : 'Crear Institución'}</h2>
        <IonInput
          type="text"
          value={nombre}
          placeholder="Nombre de la institución"
          onIonChange={(e) => setNombre(e.detail.value!)}
        />
        <IonInput
          type="text"
          value={direccion}
          placeholder="Dirección de la institución"
          onIonChange={(e) => setDireccion(e.detail.value!)}
        />
        <IonButton expand="block" onClick={handleSave}>
          Guardar
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancelar
        </IonButton>
      </div>
    </IonModal>
  );
};

export default InstitucionesModal;

