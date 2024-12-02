import React, { useEffect, useState } from 'react';
import { IonModal, IonInput, IonButton, IonSelect, IonSelectOption } from '@ionic/react';
import { apiService } from '../services/apiService'; // Servicio API
import './PerfilModal.css'; // Estilos del modal

interface PerfilModalProps {
  isOpen: boolean;
  onClose: () => void;
  perfilData: any; // Datos actuales del perfil
  onSave: (updatedData: any) => void; // Función para actualizar el perfil en el componente principal
}

const PerfilModal: React.FC<PerfilModalProps> = ({ isOpen, onClose, perfilData, onSave }) => {
  const [nombre, setNombre] = useState(perfilData?.nombre || '');
  const [apellidoPaterno, setApellidoPaterno] = useState(perfilData?.apellido_paterno || '');
  const [apellidoMaterno, setApellidoMaterno] = useState(perfilData?.apellido_materno || '');
  const [telefono, setTelefono] = useState(perfilData?.telefono || '');
  const [institucion, setInstitucion] = useState<number | null>(perfilData?.fk_institucion || null);
  const [grado, setGrado] = useState<string | null>(perfilData?.grado_estudio || null);
  const [instituciones, setInstituciones] = useState<any[]>([]);

  // Cargar instituciones desde la API
  useEffect(() => {
    const fetchInstituciones = async () => {
      try {
        const response = await apiService.getData('instituciones/');
        setInstituciones(response.data);
      } catch (err) {
        console.error('Error al cargar instituciones:', err);
      }
    };

    fetchInstituciones();
  }, []);

  // Función para guardar los cambios
  const handleSave = async () => {
    const updatedDataUsuario = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
      telefono,
      fk_institucion: institucion,
      grado_estudio: grado,
    };

    try {
      console.log('Datos para datos_usuario:', updatedDataUsuario);

      // Actualizar datos en datos_usuario/
      await apiService.updateData('datos_usuario/', perfilData.pk_datos_usuario_id, updatedDataUsuario);

      // Combinar los datos actualizados
      onSave({
        ...updatedDataUsuario,
      });

      // Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={true} className="perfil-modal">
      <div className="perfil-modal-content">
        <h2 className="perfil-modal-title">Editar Perfil</h2>

        <div className="perfil-modal-inputs">
          <label>Nombre</label>
          <IonInput value={nombre} onIonChange={(e) => setNombre(e.detail.value!)} />
        </div>

        <div className="perfil-modal-inputs">
          <label>Apellido Paterno</label>
          <IonInput value={apellidoPaterno} onIonChange={(e) => setApellidoPaterno(e.detail.value!)} />
        </div>

        <div className="perfil-modal-inputs">
          <label>Apellido Materno</label>
          <IonInput value={apellidoMaterno} onIonChange={(e) => setApellidoMaterno(e.detail.value!)} />
        </div>

        <div className="perfil-modal-inputs">
          <label>Teléfono</label>
          <IonInput value={telefono} onIonChange={(e) => setTelefono(e.detail.value!)} />
        </div>

        <div className="perfil-modal-inputs">
          <label>Institución</label>
          <IonSelect value={institucion} onIonChange={(e) => setInstitucion(e.detail.value)}>
            {instituciones.map((inst) => (
              <IonSelectOption key={inst.pk_institucion_id} value={inst.pk_institucion_id}>
                {inst.nombre}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>

        <div className="perfil-modal-inputs">
          <label>Grado de Estudio</label>
          <IonSelect value={grado} onIonChange={(e) => setGrado(e.detail.value)}>
            <IonSelectOption value="Licenciatura">Licenciatura</IonSelectOption>
            <IonSelectOption value="Especialidad">Especialidad</IonSelectOption>
            <IonSelectOption value="Maestría">Maestría</IonSelectOption>
            <IonSelectOption value="Doctorado">Doctorado</IonSelectOption>
          </IonSelect>
        </div>

        <IonButton expand="block" onClick={handleSave}>
          Guardar
        </IonButton>
      </div>
    </IonModal>
  );
};

export default PerfilModal;
