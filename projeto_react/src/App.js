import logo from './logo.svg';
import './App.css';
import Clients from './Views/Users/Clients'
import Images from './Views/Images/Index';
import ImagesShow from './Views/Images/Show';
import ImagesEdit from './Views/Images/Edit';
import Auth from './Views/Users/Auth';
import Professionals from './Views/Users/Professionals';
import Services from './Views/Services/Index';
import ServicesShow from './Views/Services/Show';
import ServicesEdit from './Views/Services/Edit';
import QuemSomos from './Views/QuemSomos';

import Users from './Views/Users/Index';
import Home from './Views/Home';
import Profile from './Views/Users/Profile';
import ProfileEdit from './Views/Users/Edit';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


async function PrivateSession() {
  const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

  const uid = dataUser?.user?.id;

  return uid ? <Outlet /> : <Navigate to="/login" replace />
}



function App() { // aqui é JavaScript


  // a função useState retorna um vetor, e esse vetor é constante
  // sempre em par, uma variável e uma função
  // por boa prática, o nome da função sempre é "set+Nome_Variável"


  return ( // Aqui é html
    <Router>
      <main className="App">
        <NavBar />

        <Routes>
          {/* Rotas Públicas */}
          <Route path='/home' element={< Home />} />
          <Route path='/login' element={< Auth />} />
          <Route path='/profile/:id' element={< Profile />} />
          <Route path='/images' element={< Images />} />
          <Route path='/professionals' element={< Professionals />} />
          <Route path='/quemsomos' element={< QuemSomos />} />



          <Route element={<PrivateSession />}>
            {/* Rotas Logado */}

            <Route path='/clients' element={< Clients />} />
            <Route path='/services/edit/:id' element={< ServicesEdit />} />
            <Route path='/services/:id' element={< ServicesShow />} />
            <Route path='/services' element={< Services />} />
            <Route path='/users' element={< Users />} />
            <Route path='/images/edit/:id' element={< ImagesEdit />} />
            <Route path='/images/:id' element={< ImagesShow />} />
            <Route path='/images' element={< Images />} />
            <Route path='/images:id' element={< ImagesShow />} />
            <Route path='/profile/edit/:id' element={< ProfileEdit />} />




          </Route>
          <Route path='/' element={< Navigate to='/home' />} />
        </Routes>

      </main>
      <Footer />
    </Router>
  );
}

export default App;
