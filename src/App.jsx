import { BrowserRouter as Router } from 'react-router';
import { UserContext } from './context/UserContext';
import { useState, useEffect } from 'react';
import { authAPI } from './services/api';
import { Toaster } from "sonner";

import AppRoutes from './routes/index';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(()=>{
  console.log("Fetching user...");
  console.log("User=", user);
  const fetchUser = async () =>{
    try {
      const res = await authAPI.me();
      setUser(res.data);
      console.log(res.data)
    } catch (error) {
      setUser(null);
    }
    finally{
      setLoading(false);
    }
  } ;
  fetchUser();

},[])


  return (
    <UserContext value={{user, setUser, loading}}>
      <Router>
        <Toaster position="bottom-right" richColors />        
        <AppRoutes />
      </Router>
    </UserContext>
  )
}

export default App
