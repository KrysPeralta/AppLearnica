import React, { useState } from 'react';
import { IonCard, IonText, IonIcon, IonButton, IonPopover, IonItem } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import './ComentarioCard.css';

interface ComentarioCardProps {
  pregunta: string;
  respuesta: string;
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const ComentarioCard: React.FC<ComentarioCardProps> = ({ pregunta, respuesta, onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<React.MouseEvent | undefined>(undefined);

  const openPopover = (event: React.MouseEvent) => {
    setPopoverEvent(event);
    setShowPopover(true);
  };

  const closePopover = () => {
    setShowPopover(false);
  };

  const handleEdit = () => {
    onEdit();
    closePopover();
  };

  const handleDelete = () => {
    onDelete();
    closePopover();
  };

  return (
    <IonCard className="comentario-card">
      <div className="card-content">
        <div className="avatar-section">
          {/* Imagen de avatar, puedes cambiar esta línea según tu diseño */}
          <img src="/assets/images/user-avatar.png" alt="Avatar" className="avatar-image" />
        </div>
        <div className="text-section">
          <IonText color="primary">
            <h2 className="pregunta">{pregunta}</h2>
          </IonText>
          <IonText color="medium">
            <p className="respuesta">{respuesta}</p>
          </IonText>
        </div>
        <IonButton fill="clear" onClick={openPopover} className="options-button">
          <IonIcon icon={ellipsisVertical} />
        </IonButton>
        <IonPopover
          isOpen={showPopover}
          event={popoverEvent ? popoverEvent.nativeEvent : undefined}
          onDidDismiss={closePopover}
          alignment="center"
        >
          <IonItem button onClick={handleEdit}>Editar</IonItem>
          <IonItem button onClick={handleDelete}>Eliminar</IonItem>
        </IonPopover>
      </div>
    </IonCard>
  );
};

export default ComentarioCard;
