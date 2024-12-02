//EL NOMBRE DEL ARCHIVO ES: LoginModal.tsx
import React, { useState } from 'react';
import { IonModal, IonInput, IonButton, IonToast } from '@ionic/react';
import { useSession } from '../context/SessionContext'; // Importar el contexto
import { apiService } from '../services/apiService'; // Servicio de API
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  // Estados para los campos del formulario
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { login } = useSession(); // Hook del contexto para manejar la sesión

  const handleLogin = async () => {
    try {
      if (!correo || !contrasena) {
        setErrorMessage('Correo y contraseña son obligatorios.');
        return;
      }

      // Obtener credenciales desde el endpoint
      const response = await apiService.getData('credenciales_usuario/');
      const usuarios = response.data;

      // Buscar al usuario con las credenciales proporcionadas
      const user = usuarios.find(
        (u: any) => u.email === correo && u.contrasena === contrasena
      );

      if (!user) {
        setErrorMessage('Correo o contraseña incorrectos.');
        return;
      }

      // Si el login es exitoso, guardar los datos del usuario en el contexto
      login(user.pk_credencial_id, user.rol); // Guardar el ID y rol en el contexto
      setShowToast(true); // Mostrar éxito
      onClose(); // Cerrar modal
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrorMessage('Hubo un problema al iniciar sesión.');
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      {/* Contenedor principal del modal */}
      <div className="login-modal-content">
        {/* Ícono del usuario */}
        <div className="login-modal-icon">👤</div>

        {/* Campos de entrada de correo y contraseña */}
        <div className="login-modal-inputs">
          <label>Correo</label>
          <IonInput
            type="email"
            className="login-input"
            placeholder="Ingresa tu correo"
            value={correo}
            onIonChange={(e) => setCorreo(e.detail.value!)}
          />
          <label>Contraseña</label>
          <IonInput
            type="password"
            className="login-input"
            placeholder="Ingresa tu contraseña"
            value={contrasena}
            onIonChange={(e) => setContrasena(e.detail.value!)}
          />
          <a href="#" className="login-modal-recover">Recuperar Contraseña</a>
        </div>

        {/* Mensaje de error */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Botones de iniciar sesión y registrarse */}
        <div className="login-modal-buttons">
          <IonButton expand="block" onClick={handleLogin} className="login-button-primary">
            INICIAR SESIÓN
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={onSwitchToRegister} className="login-button-secondary">
            REGÍSTRATE
          </IonButton>
        </div>
      </div>

      {/* Toast para mensajes */}
      <IonToast
        isOpen={showToast}
        message="Inicio de sesión exitoso"
        duration={2000}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonModal>
  );
};

export default LoginModal;

