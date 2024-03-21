import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListingPage from './pages/ListingPage/ListingPage';
import CreatePage from './pages/CreatePage/CreatePage';
import Login from './pages/Login/Login';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './component/Navbar/Navbar';
import { SnackbarProvider } from 'notistack';

function App() {
  const { setLogin } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('coderToken')
    if (!token) setLogin(false)
  }, [])

  return (
    <SnackbarProvider
      autoHideDuration={2000}
      maxSnack={3}
    >
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<ListingPage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SnackbarProvider>
  );
}

export default App;
