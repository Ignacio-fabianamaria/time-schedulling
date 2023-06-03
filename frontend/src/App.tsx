import { BrowserRouter } from 'react-router-dom';
import './global.css';
import { RouteApp } from './routes';
import { AuthProvider } from './contexts/Authcontext';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteApp />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
