import React, { useState } from 'react';
import { IonCard, IonText, IonImg, IonButton, IonIcon, IonPopover, IonItem } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import './GruposCard.scss';

interface GruposCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const GruposCard: React.FC<GruposCardProps> = ({ title, description, imageUrl, onEdit, onDelete }) => {
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
    closePopover(); // Cierra el popover al seleccionar esta opción
  };

  const handleDelete = () => {
    onDelete();
    closePopover(); // Cierra el popover al seleccionar esta opción
  };

  return (
    <IonCard className="grupos-card">
      <div className="grupos-card-content">
        <div className="grupos-card-image-section">
          <IonImg src={imageUrl} alt="Imagen del contenido" />
        </div>
        <div className="grupos-card-text-section">
          <IonText color="primary">
            <h2>{title}</h2>
          </IonText>
          <IonText color="medium">
            <p>{description}</p>
          </IonText>
        </div>
        <IonButton fill="clear" onClick={(e) => openPopover(e)} className="grupos-card-options-button">
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

export default GruposCard;
