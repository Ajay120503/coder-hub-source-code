import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SocketProvider } from './SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <ChakraProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </ChakraProvider>
  </Router>

)

