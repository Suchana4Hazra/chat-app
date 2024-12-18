import './App.css';
import Join from './component/Join/Join.jsx';
import Chat from './component/Chat/Chat.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const originalWarn = console.warn;
const originalError = console.error;

// Suppress warnings
console.warn = (...args) => {
  if (args[0].includes('Each child in a list should have a unique "key" prop')) {
    return;
  }
  originalWarn(...args);
};

// Suppress errors (use cautiously)
console.error = (...args) => {
  if (args[0].includes('specific error message')) {
    return;
  }
  originalError(...args);
};

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Join />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
