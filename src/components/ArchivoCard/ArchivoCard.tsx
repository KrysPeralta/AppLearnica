import React, { useState } from 'react';
import { IonCard, IonIcon, IonPopover, IonItem, IonButton } from '@ionic/react';
import {
  documentTextOutline,
  videocamOutline,
  linkOutline,
  musicalNotesOutline,
  ellipsisVertical,
} from 'ionicons/icons';
import './ArchivoCard.css';

interface ArchivoCardProps {
  type: 'pdf' | 'video' | 'link' | 'audio'; // Opciones disponibles
  fileUrl: string; // URL del archivo
  onEdit: () => void; // Función para editar
  onDelete: () => void; // Función para eliminar
}

const ArchivoCard: React.FC<ArchivoCardProps> = ({ type, fileUrl, onEdit, onDelete }) => {
  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<React.MouseEvent | undefined>(undefined);

  // Obtener el ícono basado en el tipo de archivo
  const getIcon = () => {
    switch (type) {
      case 'pdf':
        return documentTextOutline;
      case 'video':
        return videocamOutline;
      case 'link':
        return linkOutline;
      case 'audio':
        return musicalNotesOutline;
      default:
        return documentTextOutline; // Ícono por defecto (para evitar errores)
    }
  };

  // Funciones para manejar el popover (menú de opciones)
  const openPopover = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPopoverEvent(event);
    setShowPopover(true);
  };

  const closePopover = () => setShowPopover(false);

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation();
    onEdit();
    closePopover();
  };

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete();
    closePopover();
  };

  return (
    <IonCard
      className="archivo-card"
      button
      onClick={() => window.open(fileUrl, '_blank')} // Abre el enlace al hacer clic en la tarjeta
    >
      <div className="card-content">
        <div className="icon-section">
          <IonIcon icon={getIcon()} className="icon-link-color" />
        </div>
        <div className="text-section">
          <h2>{fileUrl}</h2> {/* Muestra el link como título */}
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

export default ArchivoCard;
