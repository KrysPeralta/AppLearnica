//EL NOMBRE DEL ARCHIVO ES: RegisterModal.tsx
import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import { apiService } from '../services/apiService';
import './RegisterModal.css';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  // Estados para los datos del formulario
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [gradoEstudio, setGradoEstudio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [institucion, setInstitucion] = useState<number | null>(null);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('alumno'); // Valor por defecto
  const [instituciones, setInstituciones] = useState([]); // Para almacenar las instituciones
  const [loadingInstituciones, setLoadingInstituciones] = useState(true);
  const [showToast, setShowToast] = useState(false); // Para mostrar notificaciones

  const [errorMessage, setErrorMessage] = useState(''); // Para errores de validación

  // **Cargar instituciones al abrir el modal**
  useEffect(() => {
    if (isOpen) {
      const fetchInstituciones = async () => {
        try {
          const response = await apiService.getData('instituciones/');
          setInstituciones(response.data); // Guardar las instituciones obtenidas
          setLoadingInstituciones(false);
        } catch (error) {
          console.error('Error al cargar instituciones:', error);
          setInstituciones([]);
          setLoadingInstituciones(false);
        }
      };
      fetchInstituciones();
    }
  }, [isOpen]);

  const validateInputs = (): boolean => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(nombre)) {
      setErrorMessage('El nombre solo debe contener letras y espacios.');
      return false;
    }

    if (!nameRegex.test(apellidoPaterno)) {
      setErrorMessage('El apellido paterno solo debe contener letras y espacios.');
      return false;
    }

    if (!nameRegex.test(apellidoMaterno)) {
      setErrorMessage('El apellido materno solo debe contener letras y espacios.');
      return false;
    }

    if (!phoneRegex.test(telefono)) {
      setErrorMessage('El teléfono debe tener exactamente 10 dígitos.');
      return false;
    }

    if (!emailRegex.test(correo)) {
      setErrorMessage('El correo no tiene un formato válido.');
      return false;
    }

    if (contraseña.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    if (!institucion) {
      setErrorMessage('Debes seleccionar una institución.');
      return false;
    }

    setErrorMessage(''); // No hay errores
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) return;

    try {
      // 1. Registrar credenciales de usuario
      const credenciales = await apiService.createData('credenciales_usuario/', {
        email: correo,
        contrasena: contraseña,
        rol: rol,
      });

      // 2. Registrar datos personales
      await apiService.createData('datos_usuario/', {
        fk_credencial: credenciales.data.pk_credencial_id,
        nombre: nombre,
        apellido_paterno: apellidoPaterno,
        apellido_materno: apellidoMaterno,
        grado_estudio: gradoEstudio,
        telefono: telefono,
        fk_institucion: institucion,
      });

      // Mostrar mensaje de éxito
      setShowToast(true);
      onClose(); // Cerrar modal
    } catch (error: any) {
      console.error('Error durante el registro:', error.response?.data || error.message);
      alert('Hubo un error al registrarte. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} className="register-modal">
      <div className="register-modal-content">
        <div className="register-modal-icon">📝</div>
        <h2 className="register-modal-title">Registro</h2>

        <div className="register-modal-inputs">
          <label>Nombre</label>
          <IonInput
            type="text"
            className="register-input"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onIonChange={(e) => setNombre(e.detail.value!)}
          />

          <label>Apellido Paterno</label>
          <IonInput
            type="text"
            className="register-input"
            placeholder="Ingresa tu apellido paterno"
            value={apellidoPaterno}
            onIonChange={(e) => setApellidoPaterno(e.detail.value!)}
          />

          <label>Apellido Materno</label>
          <IonInput
            type="text"
            className="register-input"
            placeholder="Ingresa tu apellido materno"
            value={apellidoMaterno}
            onIonChange={(e) => setApellidoMaterno(e.detail.value!)}
          />

          <label>Grado de Estudio</label>
          <IonSelect
            placeholder="Selecciona tu grado"
            value={gradoEstudio}
            onIonChange={(e) => setGradoEstudio(e.detail.value!)}
            className="select-carrera"
          >
            <IonSelectOption value="Licenciatura">Licenciatura</IonSelectOption>
            <IonSelectOption value="Maestría">Maestría</IonSelectOption>
            <IonSelectOption value="Doctorado">Doctorado</IonSelectOption>
            <IonSelectOption value="Especialidad">Especialidad</IonSelectOption>
          </IonSelect>

          <label>Teléfono</label>
          <IonInput
            type="text"
            className="register-input"
            placeholder="Ingresa tu número de teléfono"
            value={telefono}
            onIonChange={(e) => setTelefono(e.detail.value!)}
          />

          <label>Institución</label>
          {loadingInstituciones ? (
            <IonSpinner name="dots" />
          ) : (
            <IonSelect
              placeholder="Selecciona tu institución"
              value={institucion}
              onIonChange={(e) => setInstitucion(Number(e.detail.value))}
              className="select-carrera"
            >
              {instituciones.map((inst: any) => (
                <IonSelectOption key={inst.pk_institucion_id} value={inst.pk_institucion_id}>
                  {inst.nombre}
                </IonSelectOption>
              ))}
            </IonSelect>
          )}

          <label>Correo</label>
          <IonInput
            type="email"
            className="register-input"
            placeholder="Ingresa tu correo electrónico"
            value={correo}
            onIonChange={(e) => setCorreo(e.detail.value!)}
          />

          <label>Contraseña</label>
          <IonInput
            type="password"
            className="register-input"
            placeholder="Crea una contraseña"
            value={contraseña}
            onIonChange={(e) => setContraseña(e.detail.value!)}
          />

          <label>Rol</label>
          <IonSelect
            placeholder="Selecciona tu rol"
            value={rol}
            onIonChange={(e) => setRol(e.detail.value!)}
            className="select-carrera"
          >
            <IonSelectOption value="alumno">Alumno</IonSelectOption>
            <IonSelectOption value="maestro">Maestro</IonSelectOption>
          </IonSelect>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="register-modal-buttons">
          <IonButton expand="block" onClick={handleRegister} className="register-button-primary">
            Registrarme
          </IonButton>
        </div>

      </div>

      <IonToast
        isOpen={showToast}
        message="Registro exitoso"
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonModal>
  );
};

export default RegisterModal;
