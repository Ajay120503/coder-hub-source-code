import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Editor from './Components/Editor/Editor';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor/:roomId" element={<Editor />} />
    </Routes>
  );
}

export default App;
