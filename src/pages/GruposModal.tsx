import React, { useState, useEffect } from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import './GruposModal.css';

interface GruposModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (grupo: {
    pk_clase_id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    semestre: number;
    fk_profesor: number;
    fk_carrera: number;
  }) => void;
  editingGrupo: {
    pk_clase_id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    semestre: number;
    fk_profesor: number;
    fk_carrera: number;
  } | null;
}

const GruposModal: React.FC<GruposModalProps> = ({ isOpen, onClose, onSave, editingGrupo }) => {
  const [nombre, setNombre] = useState('');
  const [codigo, setCodigo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [semestre, setSemestre] = useState(1); // Valor inicial
  const [fkProfesor, setFkProfesor] = useState(1); // Valor inicial
  const [fkCarrera, setFkCarrera] = useState(1); // Valor inicial

  useEffect(() => {
    if (editingGrupo) {
      setNombre(editingGrupo.nombre);
      setCodigo(editingGrupo.codigo);
      setDescripcion(editingGrupo.descripcion);
      setSemestre(editingGrupo.semestre);
      setFkProfesor(editingGrupo.fk_profesor);
      setFkCarrera(editingGrupo.fk_carrera);
    }
  }, [editingGrupo]);

  const handleSave = () => {
    const grupo = {
      pk_clase_id: editingGrupo ? editingGrupo.pk_clase_id : 0, // Si es un nuevo grupo, pasa 0
      nombre,
      codigo,
      descripcion,
      semestre,
      fk_profesor: fkProfesor,
      fk_carrera: fkCarrera,
    };

    onSave(grupo);
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={true}>
      <div className="grupos-modal-content">
        <h2>{editingGrupo ? 'Editar Grupo' : 'Crear Grupo'}</h2>
        
        {/* Nombre del Grupo */}
        <IonInput
          type="text"
          value={nombre}
          placeholder="Nombre del grupo"
          onIonChange={(e) => setNombre(e.detail.value!)}
        />

        {/* Código del Grupo */}
        <IonInput
          type="text"
          value={codigo}
          placeholder="Código del grupo"
          onIonChange={(e) => setCodigo(e.detail.value!)}
        />

        {/* Descripción */}
        <IonInput
          type="text"
          value={descripcion}
          placeholder="Descripción"
          onIonChange={(e) => setDescripcion(e.detail.value!)}
        />

        {/* Semestre (con opciones legibles) */}
        <IonSelect value={semestre} placeholder="Selecciona el semestre" onIonChange={(e) => setSemestre(Number(e.detail.value!))}>
          <IonSelectOption value={1}>Semestre 1</IonSelectOption>
          <IonSelectOption value={2}>Semestre 2</IonSelectOption>
          <IonSelectOption value={3}>Semestre 3</IonSelectOption>
          <IonSelectOption value={4}>Semestre 4</IonSelectOption>
          <IonSelectOption value={5}>Semestre 5</IonSelectOption>
          <IonSelectOption value={6}>Semestre 6</IonSelectOption>
        </IonSelect>

        {/* Profesor (con opciones legibles) */}
        <IonSelect value={fkProfesor} placeholder="Selecciona el profesor" onIonChange={(e) => setFkProfesor(Number(e.detail.value!))}>
          <IonSelectOption value={1}>Profesor 1</IonSelectOption>
          <IonSelectOption value={2}>Profesor 2</IonSelectOption>
          <IonSelectOption value={3}>Profesor 3</IonSelectOption>
          <IonSelectOption value={4}>Profesor 4</IonSelectOption>
          <IonSelectOption value={5}>Profesor 5</IonSelectOption>
        </IonSelect>

        {/* Carrera (con opciones legibles) */}
        <IonSelect value={fkCarrera} placeholder="Selecciona la carrera" onIonChange={(e) => setFkCarrera(Number(e.detail.value!))}>
          <IonSelectOption value={1}>Carrera 1</IonSelectOption>
          <IonSelectOption value={2}>Carrera 2</IonSelectOption>
          <IonSelectOption value={3}>Carrera 3</IonSelectOption>
          <IonSelectOption value={4}>Carrera 4</IonSelectOption>
          <IonSelectOption value={5}>Carrera 5</IonSelectOption>
        </IonSelect>

        {/* Botones de Guardar y Cancelar */}
        <IonButton expand="block" onClick={handleSave}>
          Guardar
        </IonButton>
        <IonButton expand="block" color="medium" onClick={onClose}>
          Cancelar
        </IonButton>
      </div>
    </IonModal>
  );
};

export default GruposModal;
