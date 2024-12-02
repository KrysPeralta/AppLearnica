import { IonPage, IonContent, IonInput, IonButton, IonTextarea, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle } from '@ionic/react';
import { useState } from 'react';
import './CreateTest.css';

const CreateTest: React.FC = () => {
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);

  const addQuestion = () => {
    setQuestions([...questions, { 
      text: '', 
      type: 'multiple-choice', 
      options: [], 
      correctAnswer: '', 
      points: 0,
      multipleAnswers: false,
      mandatory: false 
    }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push({ text: '', isCorrect: false });
    setQuestions(updatedQuestions);
  };

  const updateOption = (qIndex: number, oIndex: number, field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex][field] = value;
    setQuestions(updatedQuestions);
  };

  const removeOption = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSaveTest = () => {
    const testData = {
      name: testName,
      description: testDescription,
      questions,
    };
    console.log('Test Data:', testData);
    // Aquí podrías enviar la información al backend
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* Barra de navegación */}
        <header className="navbar">
          <a href="/" className="navbar-logo">🏠</a>
          <nav className="navbar-links">
            <a href="/Test">Test de Estilos</a>
            <a href="/Materias">Materias</a>
            <a href="/Biblioteca">Biblioteca</a>
          </nav>
          <button className="login-button">Iniciar sesión</button>
        </header>

        <h1 className="page-title">Crear Test</h1>

        <div className="form-container">
          <IonInput 
            placeholder="Nombre del Test" 
            value={testName} 
            onIonChange={(e) => setTestName(e.detail.value!)} 
            className="form-input"
          />
          <IonTextarea 
            placeholder="Descripción del Test" 
            value={testDescription} 
            onIonChange={(e) => setTestDescription(e.detail.value!)} 
            className="form-textarea"
          />
        </div>

        <h2 className="section-title">Preguntas</h2>

        <IonList>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="question-item">
              <IonTextarea
                placeholder={`Pregunta ${qIndex + 1}`}
                value={question.text}
                onIonChange={(e) => updateQuestion(qIndex, 'text', e.detail.value!)}
                className="question-title"
              />
              <IonSelect
                placeholder="Tipo de Pregunta"
                value={question.type}
                onIonChange={(e) => updateQuestion(qIndex, 'type', e.detail.value!)}
              >
                <IonSelectOption value="multiple-choice">Opción Múltiple</IonSelectOption>
                <IonSelectOption value="true-false">Verdadero/Falso</IonSelectOption>
                <IonSelectOption value="scale">Escala 1-5</IonSelectOption>
              </IonSelect>

              <div className="options-container">
                {question.options.map((option: any, oIndex: number) => (
                  <div key={oIndex} className="option-item">
                    <IonInput
                      placeholder={`Opción ${oIndex + 1}`}
                      value={option.text}
                      onIonChange={(e) => updateOption(qIndex, oIndex, 'text', e.detail.value!)}
                      className="option-input"
                    />
                    <IonToggle
                      checked={option.isCorrect}
                      onIonChange={(e) => updateOption(qIndex, oIndex, 'isCorrect', e.detail.checked)}
                    />
                    <IonButton 
                      color="danger" 
                      onClick={() => removeOption(qIndex, oIndex)}
                    >
                      Eliminar
                    </IonButton>
                  </div>
                ))}
                <IonButton 
                  color="primary" 
                  onClick={() => addOption(qIndex)} 
                  className="add-option-button"
                >
                  Agregar Opción
                </IonButton>
              </div>

              <div className="question-actions">
                <IonInput
                  type="number"
                  placeholder="Puntos"
                  value={question.points}
                  onIonChange={(e) => updateQuestion(qIndex, 'points', parseInt(e.detail.value!))}
                  className="points-input"
                />
                <IonToggle
                  checked={question.multipleAnswers}
                  onIonChange={(e) => updateQuestion(qIndex, 'multipleAnswers', e.detail.checked)}
                />
                Varias respuestas
                <IonToggle
                  checked={question.mandatory}
                  onIonChange={(e) => updateQuestion(qIndex, 'mandatory', e.detail.checked)}
                />
                Obligatoria
              </div>

              <IonButton 
                color="danger" 
                onClick={() => removeQuestion(qIndex)} 
                className="remove-question-button"
              >
                Eliminar Pregunta
              </IonButton>
            </div>
          ))}
        </IonList>

        <IonButton 
          expand="block" 
          onClick={addQuestion} 
          className="add-question-button"
        >
          Agregar Pregunta
        </IonButton>

        <div className="action-buttons">
          <IonButton 
            expand="block" 
            onClick={handleSaveTest} 
            color="primary"
          >
            Guardar Test
          </IonButton>
          <IonButton 
            expand="block" 
            color="light"
          >
            Cancelar
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreateTest;

