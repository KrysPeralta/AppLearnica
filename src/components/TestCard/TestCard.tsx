import React, { useState } from 'react';
import { IonCard, IonText, IonImg, IonButton, IonIcon, IonPopover, IonItem } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import './TestCard.scss';

interface TestCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const TestCard: React.FC<TestCardProps> = ({ title, description, imageUrl, onEdit, onDelete }) => {
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
    <IonCard className="test-card">
      <div className="test-card-content">
        <div className="test-card-image-section">
          <IonImg src={imageUrl} alt="Imagen del contenido" />
        </div>
        <div className="test-card-text-section">
          <IonText color="primary">
            <h2>{title}</h2>
          </IonText>
          <IonText color="medium">
            <p>{description}</p>
          </IonText>
        </div>
        <IonButton fill="clear" onClick={(e) => openPopover(e)} className="test-card-options-button">
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

export default TestCard;

