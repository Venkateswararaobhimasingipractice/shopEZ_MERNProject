import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AllRoutes from './routes/AllRoutes';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [])
  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
