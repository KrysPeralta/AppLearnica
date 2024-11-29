import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { SessionProvider } from './context/SessionContext'; // Importa el proveedor de sesión
import Home from './pages/Home';
import Test from './pages/Test';
import Materias from './pages/Materias';
import Grupos from './pages/Grupos';
import CreateTest from './pages/CreateTest';
import Comentarios from './pages/Comentarios';
import Biblioteca from './pages/Biblioteca';
import PerfilPage from './pages/PerfilPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './pages/Home.css';

setupIonicReact();

const App: React.FC = () => (
  <SessionProvider> {/* Envolver la aplicación con el proveedor de sesión */}
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>

          <Route exact path="/test">
            <Test />
          </Route>

          <Route exact path="/create-test">
            <CreateTest />
          </Route>

          <Route exact path="/materias">
            <Materias />
          </Route>

          <Route exact path="/grupos">
            <Grupos />
          </Route>

          <Route exact path="/biblioteca">
            <Biblioteca />
          </Route>

          <Route exact path="/Comentarios">
            <Comentarios />
          </Route>

          <Route exact path="/PerfilPage">
            <PerfilPage />
          </Route>

          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </SessionProvider>
);

export default App;
