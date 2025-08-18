import logo from './logo.svg';
import './App.css';
import User from './User'
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from 'react-router-dom';

function PrivateSession(){
  const hasSession = !! localStorage.getItem('supaSession');
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

              <Link to="/home">Inicio</Link>
              <Link to="/users">Usuários</Link>
              <Link to="/services">Serviços</Link>
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
          <Route path='/home' element={< Home />} />
          <Route path='/login' element={< User/>} />


          <Route element={ <PrivateSession/> }>
          {/* Rotas Logado */}

          <Route path='/services' element={< Serviços/>} />


          </Route>
        </Routes>

      </main>
    </Router>
  );
}

export default App;
