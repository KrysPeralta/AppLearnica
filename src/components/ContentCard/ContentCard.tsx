import React, { useState } from 'react';
import { IonCard, IonText, IonImg, IonButton, IonIcon, IonPopover, IonItem } from '@ionic/react';
import { ellipsisVertical } from 'ionicons/icons';
import './ContentCard.scss';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl, onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<React.MouseEvent | undefined>(undefined);

  const openPopover = (event: React.MouseEvent) => {
    setPopoverEvent(event); // Guardar la posición del evento
    setShowPopover(true);   // Mostrar el popover
  };

  return (
    <IonCard className="content-card">
      <div className="card-content">
        <div className="image-section">
          <IonImg src={imageUrl} alt="Imagen del contenido" />
        </div>
        <div className="text-section">
          <IonText color="primary">
            <h2>{title}</h2>
          </IonText>
          <IonText color="medium">
            <p>{description}</p>
          </IonText>
        </div>
        <IonButton fill="clear" onClick={(e) => openPopover(e)} className="options-button">
          <IonIcon icon={ellipsisVertical} />
        </IonButton>
        <IonPopover
          isOpen={showPopover}
          event={popoverEvent ? popoverEvent.nativeEvent : undefined} // Verificar si popoverEvent está definido
          onDidDismiss={() => setShowPopover(false)}
          alignment="center" // Centrar el popover debajo del botón
        >
          <IonItem button onClick={onEdit}>Editar</IonItem>
          <IonItem button onClick={onDelete}>Eliminar</IonItem>
        </IonPopover>
      </div>
    </IonCard>
  );
};

export default ContentCard;
