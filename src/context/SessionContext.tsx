import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Importar el hook de navegación

// Definir la estructura de los datos que manejará el contexto
interface SessionContextProps {
  isLoggedIn: boolean; // Estado de inicio de sesión
  userId: number | null; // ID del usuario
  userRole: 'alumno' | 'maestro' | null; // Rol del usuario
  login: (id: number, role: 'alumno' | 'maestro') => void; // Función para iniciar sesión
  logout: () => void; // Función para cerrar sesión
}

// Crear el contexto
const SessionContext = createContext<SessionContextProps | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error('useSession debe ser usado dentro de un SessionProvider');
  return context;
};

// Proveedor del contexto
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<'alumno' | 'maestro' | null>(null);
  const history = useHistory(); // Hook de navegación para redirigir

  // Función para iniciar sesión
  const login = (id: number, role: 'alumno' | 'maestro') => {
    setIsLoggedIn(true);
    setUserId(id);
    setUserRole(role);
    localStorage.setItem('isLoggedIn', 'true'); // Persistencia opcional
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('userRole', role);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    history.push('/home'); // Redirigir al home después de cerrar sesión
  };

  // Recuperar sesión desde localStorage al cargar la aplicación
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedUserRole = localStorage.getItem('userRole') as 'alumno' | 'maestro' | null;

    if (storedIsLoggedIn === 'true' && storedUserId && storedUserRole) {
      setIsLoggedIn(true);
      setUserId(Number(storedUserId));
      setUserRole(storedUserRole);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ isLoggedIn, userId, userRole, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
