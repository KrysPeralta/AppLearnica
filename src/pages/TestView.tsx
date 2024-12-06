import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonToast,
} from '@ionic/react';
import { apiService } from '../services/apiService';
import { useParams, useHistory } from 'react-router-dom';
import './TestView.css';

const TestView: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const history = useHistory();
  const [testInfo, setTestInfo] = useState<{ nombre: string; descripcion: string } | null>(null);
  const [preguntas, setPreguntas] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const testResponse = await apiService.getData(`tests/${testId}/`);
        setTestInfo(testResponse.data);

        const preguntasResponse = await apiService.getData('preguntas/');
        const preguntasData = preguntasResponse.data.filter(
          (pregunta: any) => pregunta.fk_test === parseInt(testId, 10)
        );

        for (const pregunta of preguntasData) {
          const respuestasResponse = await apiService.getData('respuestas/');
          pregunta.opciones = respuestasResponse.data.filter(
            (respuesta: any) => respuesta.fk_pregunta === pregunta.pk_pregunta_id
          );
        }

        setPreguntas(preguntasData);
      } catch (error) {
        console.error('Error al cargar el test:', error);
      }
    };

    fetchTestInfo();
  }, [testId]);

  const handleSubmitTest = () => {
    setShowToast(true);
    setTimeout(() => {
      history.push('/test');
    }, 2000);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {testInfo && (
          <div className="test-info">
            <h1>{testInfo.nombre}</h1>
            <p>{testInfo.descripcion}</p>
          </div>
        )}

        <IonList className="test-list">
          {preguntas.map((pregunta) => (
            <div className="test-question" key={pregunta.pk_pregunta_id}>
              <p className="question-text">{pregunta.texto}</p>
              <IonRadioGroup className="question-options">
                {pregunta.opciones.map((opcion: any) => (
                  <IonItem key={opcion.pk_respuesta_id}>
                    <IonLabel>{opcion.texto}</IonLabel>
                    <IonRadio value={opcion.pk_respuesta_id} />
                  </IonItem>
                ))}
              </IonRadioGroup>
            </div>
          ))}
        </IonList>

        <IonButton expand="block" onClick={handleSubmitTest}>
          Enviar Test
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Respuestas enviadas exitosamente"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default TestView;
