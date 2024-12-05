import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonButton, IonList, IonItem, IonLabel, IonRadioGroup, IonRadio, IonToast } from '@ionic/react';
import { apiService } from '../services/apiService'; // Usa tu servicio de API para obtener datos
import { useParams } from 'react-router-dom';

interface TestViewProps {}

interface Pregunta {
  pk_pregunta_id: number;
  texto: string;
  opciones: { pk_respuesta_id: number; texto: string; es_correcta?: boolean }[];
}

const TestView: React.FC<TestViewProps> = () => {
  const { testId } = useParams<{ testId: string }>(); // Obtener el testId desde los parámetros de la ruta
  const [testInfo, setTestInfo] = useState<{ nombre: string; descripcion: string } | null>(null);
  const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
  const [respuestas, setRespuestas] = useState<{ [key: number]: number }>({}); // ID de respuesta seleccionada por pregunta
  const [showToast, setShowToast] = useState(false);

  // Obtener información del test y preguntas
  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        // Obtener información del test
        const testResponse = await apiService.getData(`tests/${testId}/`);
        setTestInfo(testResponse.data);

        // Obtener preguntas del test
        const preguntasResponse = await apiService.getData('preguntas/');
        const preguntasData = preguntasResponse.data.filter(
          (pregunta: any) => pregunta.fk_test === parseInt(testId, 10)
        );

        // Obtener respuestas de cada pregunta
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

  // Guardar la respuesta seleccionada por el usuario
  const handleAnswerChange = (preguntaId: number, respuestaId: number) => {
    setRespuestas({ ...respuestas, [preguntaId]: respuestaId });
  };

  // Manejar el envío del test
  const handleSubmitTest = async () => {
    try {
      // Crear un arreglo con las respuestas seleccionadas
      const respuestasSeleccionadas = Object.keys(respuestas).map((preguntaId) => ({
        fk_pregunta: parseInt(preguntaId),
        fk_respuesta: respuestas[parseInt(preguntaId)],
      }));

      console.log('Respuestas seleccionadas:', respuestasSeleccionadas);

      // Enviar las respuestas a la API
      await apiService.createData('resultados-tests/', {
        fk_test: parseInt(testId, 10),
        respuestas: respuestasSeleccionadas,
      });

      setShowToast(true); // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al enviar el test:', error);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Mostrar la información del test */}
        {testInfo && (
          <div className="test-info">
            <h1>{testInfo.nombre}</h1>
            <p>{testInfo.descripcion}</p>
          </div>
        )}

        {/* Mostrar las preguntas */}
        <IonList>
          {preguntas.map((pregunta) => (
            <div key={pregunta.pk_pregunta_id}>
              <IonItem>
                <IonLabel>{pregunta.texto}</IonLabel>
              </IonItem>
              <IonRadioGroup
                onIonChange={(e) => handleAnswerChange(pregunta.pk_pregunta_id, parseInt(e.detail.value))}
              >
                {pregunta.opciones.map((opcion) => (
                  <IonItem key={opcion.pk_respuesta_id}>
                    <IonLabel>{opcion.texto}</IonLabel>
                    <IonRadio value={opcion.pk_respuesta_id} />
                  </IonItem>
                ))}
              </IonRadioGroup>
            </div>
          ))}
        </IonList>

        {/* Botón para enviar el test */}
        <IonButton expand="block" onClick={handleSubmitTest}>
          Enviar Test
        </IonButton>

        {/* Mostrar un mensaje de éxito al enviar */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Test enviado exitosamente"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default TestView;
