import React from 'react';
import { IonCard, IonText, IonIcon } from '@ionic/react';
import { documentTextOutline, bookOutline, musicalNotesOutline, linkOutline, videocamOutline, documentOutline } from 'ionicons/icons';
import './ArchivoCard.css';

interface ArchivoCardProps {
  title: string;
  description: string;
  type: 'archivo' | 'libro' | 'pdf' | 'video' | 'link' | 'audio';
}

const ArchivoCard: React.FC<ArchivoCardProps> = ({ title, description, type }) => {
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
      </div>
    </IonCard>
  );
};

export default ArchivoCard;


