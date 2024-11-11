import React from 'react';
import { IonCard, IonText, IonImg } from '@ionic/react';
import './ContentCard.scss';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string; // Hacemos que imageUrl sea requerido
}

const ContentCard: React.FC<ContentCardProps> = ({ title, description, imageUrl }) => {
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
      </div>
    </IonCard>
  );
};

export default ContentCard;
