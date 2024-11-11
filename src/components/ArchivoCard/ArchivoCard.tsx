import React, { useState } from 'react';
import { IonCard, IonText, IonIcon, IonButton, IonPopover, IonItem } from '@ionic/react';
import { documentTextOutline, bookOutline, musicalNotesOutline, linkOutline, videocamOutline, documentOutline, ellipsisVertical } from 'ionicons/icons';
import './ArchivoCard.css';

interface ArchivoCardProps {
  title: string;
  description: string;
  type: 'archivo' | 'libro' | 'pdf' | 'video' | 'link' | 'audio';
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const ArchivoCard: React.FC<ArchivoCardProps> = ({ title, description, type, onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<React.MouseEvent | undefined>(undefined);

  const getIcon = () => {
    switch (type) {
      case 'libro':
        return bookOutline;
      case 'pdf':
        return documentTextOutline;
      case 'video':
        return videocamOutline;
      case 'link':
        return linkOutline;
      case 'audio':
        return musicalNotesOutline;
      default:
        return documentOutline;
    }
  };

  const openPopover = (event: React.MouseEvent) => {
    setPopoverEvent(event);
    setShowPopover(true);
  };

  return (
    <IonCard className="archivo-card">
      <div className="card-content">
        <div className="icon-section">
          <IonIcon icon={getIcon()} />
        </div>
        <div className="text-section">
          <IonText color="primary">
            <h2>{title}</h2>
          </IonText>
          <IonText color="medium">
            <p>{description}</p>
          </IonText>
        </div>
        <IonButton fill="clear" onClick={openPopover} className="options-button">
          <IonIcon icon={ellipsisVertical} />
        </IonButton>
        <IonPopover
          isOpen={showPopover}
          event={popoverEvent ? popoverEvent.nativeEvent : undefined}
          onDidDismiss={() => setShowPopover(false)}
          alignment="center"
        >
          <IonItem button onClick={onEdit}>Editar</IonItem>
          <IonItem button onClick={onDelete}>Eliminar</IonItem>
        </IonPopover>
      </div>
    </IonCard>
  );
};

export default ArchivoCard;



