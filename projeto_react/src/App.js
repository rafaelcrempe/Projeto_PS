import logo from './logo.svg';
import './App.css';
import Clients from './Clients'
import Images from './Images';
import Auth from './Auth';
import Professionals from './Professionals';
import Services from './Services';
import Users from './Users';
import Home from './Home';
import Profile from './Profile';
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';

function PrivateSession(){
  const hasSession = !!localStorage.getItem('supaSession'); //pega a chave de sessão do supabase e guarda dentro do armazenamento local
  return hasSession ? <Outlet/> : <Navigate to="/login" replace/>
}

function App() { // aqui é JavaScript
  const hasSession = !! localStorage.getItem('supaSession');

  // a função useState retorna um vetor, e esse vetor é constante
  // sempre em par, uma variável e uma função
  // por boa prática, o nome da função sempre é "set+Nome_Variável"

  
  return ( // Aqui é html
    <Router>
      <main className="App">
        <nav> {/* navegação */}
          {hasSession? (
            <>  {/* tags vazia, equivale a uma DIV */}

              
              <Link to="/clients">Clientes</Link>
              <Link to="/images">Imagens</Link>
              <Link to="/profissionals">Profissionais</Link>
              <Link to="/services">Serviços</Link>
              <Link to="/users">Usuários</Link>
              <Link to="/home">Inicio</Link>
              <Link to="/login">Entrar</Link>
              <Link to="/profile">Perfil</Link>
            </>
          ):(
            <>  {/* tags vazia, equivale a uma DIV */}

              <Link to="/home">Inicio</Link>
              <Link to="/login">Entrar</Link>
              
            </>
          )

          }
        </nav>

        <Routes>
          {/* Rotas Públicas */}
          <Route path='/profile' element={< Profile/>} />
          <Route path='/home' element={< Home/>} />
          <Route path='/images' element={< Images/>} />
          <Route path='/professionals' element={< Professionals/>} />
          <Route path='/login' element={< Auth/>} />



          <Route element={ <PrivateSession/> }>
          {/* Rotas Logado */}

          <Route path='/clients' element={< Clients/>} />
          <Route path='/services' element={< Services/>} />
          <Route path='/users' element={< Users/>} />




          </Route>
          <Route path='/'element={< Navigate to='/login'/>} />
        </Routes>

      </main>
    </Router>
  );
}

export default App;
