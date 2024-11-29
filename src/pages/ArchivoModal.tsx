import React, { useState, useEffect } from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import './ArchivoModal.css';
import { apiService } from '../services/apiService';

interface ArchivoModalProps {
  isOpen: boolean;
  onClose: () => void;
  archivo: {
    id?: number;
    type: string;
    url: string;
    fk_tema?: number;
  } | null;
  onArchivoSaved: () => void;
  userId: number | null;
}

const ArchivoModal: React.FC<ArchivoModalProps> = ({ isOpen, onClose, archivo, onArchivoSaved, userId }) => {
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [selectedTema, setSelectedTema] = useState<number | null>(null);
  const [temas, setTemas] = useState<any[]>([]);
  const [showToast, setShowToast] = useState(false);

  // Rellenar campos si se está editando un archivo
  useEffect(() => {
    if (archivo) {
      setType(archivo.type || '');
      setUrl(archivo.url || '');
      setSelectedTema(archivo.fk_tema || null);
    } else {
      setType('');
      setUrl('');
      setSelectedTema(null);
    }
  }, [archivo]);

  // Cargar temas al montar el componente
  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const response = await apiService.getData('temas/');
        setTemas(response.data);
      } catch (error) {
        console.error('Error al cargar temas:', error);
      }
    };

    fetchTemas();
  }, []);

  // Guardar o actualizar el archivo
  const handleSave = async () => {
    if (!type || !url || !selectedTema) {
      setShowToast(true);
      return;
    }

    try {
      const archivoData = {
        tipo_archivo: type,
        url_archivo: url,
        fk_tema: selectedTema,
        fk_subido_por: userId, // Usar el ID del usuario autenticado
      };

      if (archivo?.id) {
        await apiService.updateData('archivos/', archivo.id, archivoData);
      } else {
        await apiService.createData('archivos/', archivoData);
      }

      onArchivoSaved(); // Actualizar lista de archivos
      onClose(); // Cerrar modal
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      backdropDismiss={true}
      className="archivo-modal"
    >
      <div className="archivo-modal-content">
        <div className="archivo-modal-icon">📂</div>
        <h2 className="archivo-modal-title">
          {archivo ? 'Editar Archivo' : 'Crear Nuevo Archivo'}
        </h2>
        <div className="archivo-modal-inputs">
          <label>Tipo de Archivo</label>
          <IonSelect
            placeholder="Selecciona el tipo de archivo"
            cancelText="Cancelar"
            okText="Aceptar"
            value={type}
            onIonChange={(e) => setType(e.detail.value!)}
            className="select-tipoA"
          >
            <IonSelectOption value="pdf">PDF</IonSelectOption>
            <IonSelectOption value="video">Video</IonSelectOption>
            <IonSelectOption value="link">Enlace</IonSelectOption>
            <IonSelectOption value="audio">Audio</IonSelectOption>
          </IonSelect>

          <label>URL del Archivo</label>
          <IonInput
            type="url"
            className="archivo-input"
            placeholder="Ingresa el enlace"
            value={url}
            onIonChange={(e) => setUrl(e.detail.value!)}
          />

          <label>Tema</label>
          <IonSelect
            placeholder="Selecciona un tema"
            cancelText="Cancelar"
            okText="Aceptar"
            value={selectedTema}
            onIonChange={(e) => setSelectedTema(e.detail.value!)}
            className="select-tipoA"
          >
            {temas.map((tema) => (
              <IonSelectOption key={tema.pk_tema_id} value={tema.pk_tema_id}>
                {tema.nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <div className="archivo-modal-buttons">
          <IonButton expand="block" onClick={handleSave} className="archivo-button-primary">
            Guardar
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={onClose} className="archivo-button-secondary">
            Cancelar
          </IonButton>
        </div>
      </div>

      {/* Toast para mostrar errores */}
      <IonToast
        isOpen={showToast}
        message="Por favor completa todos los campos"
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonModal>
  );
};

export default ArchivoModal;
