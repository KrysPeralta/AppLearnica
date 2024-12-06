import React, { useState, useEffect } from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './ComentarioModal.css';

interface ComentarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comentario: { pregunta: string; respuesta: string; fk_tema: number; creado_por: number }) => void;
  editingComentario: { pregunta: string; respuesta: string; fk_tema: number; creado_por: number } | null;
}

const ComentarioModal: React.FC<ComentarioModalProps> = ({ isOpen, onClose, onSave, editingComentario }) => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [fkTema, setFkTema] = useState(1); // Valor predeterminado de tema
  const [creadoPor, setCreadoPor] = useState(1); // Valor predeterminado para "creado por"

  useEffect(() => {
    if (editingComentario) {
      setPregunta(editingComentario.pregunta);
      setRespuesta(editingComentario.respuesta);
      setFkTema(editingComentario.fk_tema);
      setCreadoPor(editingComentario.creado_por);
    }
  }, [editingComentario]);

  const handleSave = () => {
    const comentario = { pregunta, respuesta, fk_tema: fkTema, creado_por: creadoPor };
    onSave(comentario); // Pasa los datos para ser guardados
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      backdropDismiss={true}
      className="comentario-modal"
    >
      <div className="comentario-modal-content">
        <div className="comentario-modal-icon">💬</div>
        <h2 className="comentario-modal-title">
          {editingComentario ? 'Editar Comentario' : 'Nuevo Comentario'}
        </h2>
        <div className="comentario-modal-inputs">
          <label>Pregunta</label>
          <IonInput
            type="text"
            className="comentario-input"
            value={pregunta}
            placeholder="Ingresa la pregunta"
            onIonChange={(e) => setPregunta(e.detail.value!)}
          />

          <label>Respuesta</label>
          <IonInput
            type="text"
            className="comentario-input"
            value={respuesta}
            placeholder="Ingresa la respuesta"
            onIonChange={(e) => setRespuesta(e.detail.value!)}
          />

          <label>Tema</label>
          <IonSelect
            value={fkTema}
            onIonChange={(e) => setFkTema(e.detail.value)}
            className="select-categoria"
          >
            <IonSelectOption value={1}>Tema 1</IonSelectOption>
            <IonSelectOption value={2}>Tema 2</IonSelectOption>
            <IonSelectOption value={3}>Tema 3</IonSelectOption>
            <IonSelectOption value={4}>Tema 4</IonSelectOption>
          </IonSelect>

          <label>Creado por</label>
          <IonInput
            type="number"
            className="comentario-input"
            value={creadoPor}
            placeholder="ID del creador"
            onIonChange={(e) => setCreadoPor(Number(e.detail.value!))}
          />
        </div>

        <div className="comentario-modal-buttons">
          <IonButton expand="block" onClick={handleSave} className="comentario-button-primary">
            Guardar
          </IonButton>
          <IonButton expand="block" color="medium" onClick={onClose}>
            Cancelar
          </IonButton>
        </div>
      </div>
    </IonModal>
  );
};

export default ComentarioModal;


