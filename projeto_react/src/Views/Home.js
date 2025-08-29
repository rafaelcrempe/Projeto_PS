// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import Professionals from './Views/Users/Professionals.js';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


function Home() { // aqui é JavaScript

  const [isFiltered, setIsFiltered] = useState(false);
  const nav = useNavigate();
  const [professionals, setProfessionals] = useState([])
  const [logado, setLogado] = useState(-1) 

    useEffect(()=>{
      readUsers()
    }, [])

  useEffect( () => {
    isLogado()
  })

  async function isLogado() {
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();
     
    const uid = dataUser?.user?.id;

    setLogado(uid);
  }

  async function readProfessionals(filtro) {
    
    if (filtro) {

      let { data: dataProfessionals, error } = await supabase
        .from('users')
        .select('*')
        .eq('funcao', filtro);

      setProfessionals(dataProfessionals);

    } else {

      let { data: dataProfessionals, error } = await supabase
        .from('users')
        .select('*');


      setProfessionals(dataProfessionals);
      
    }
    setIsFiltered(true);


  }

  return ( // Aqui é html

    <div className='card'>
      {!isFiltered && (
        <>
          <div className='cardProfissional'>
            <img width='50px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/pedreiro.webp' />
            <button onClick={() => readProfessionals('pedreiro')}>Pedreiro</button>
          </div>
          <div className='cardProfissional'>
            <img src='https://placehold.co/50x50' />
            <button onClick={() => readProfessionals('encanador')}>Encanador</button>
          </div>
          <div className='cardProfissional'>
            <img src='https://placehold.co/50x50' />
            <button onClick={() => readProfessionals('pintor')}>Pintor</button>
          </div>
          <div className='cardProfissional'>
            <img src='https://placehold.co/50x50' />
            <button onClick={() => readProfessionals('eletricista')}>Eletricista</button>
          </div>
          <div className='cardProfissional'>
            <img src='https://placehold.co/50x50' />
            <button onClick={() => readProfessionals('marceneiro')}>Marceneiro</button>
          </div>
        </>
      )}

      

      {isFiltered && (
        <div className='column'>

        <button onClick={() => setIsFiltered(false)}>Voltar</button>

          {professionals.map(
            u => (
              <div className='cardLista' key={u.auth_id}>
                Nome: {u.name}<br />
                <Button variant="danger">Excluir</Button>
                { logado == u.auth_id &&
                  (<Button variant="warning" onClick={() => nav(`/profile/edit/${u.auth_id}`, { replace: true })}>Editar</Button>
                )}
              </div>
            )
          )}
        </div>
      )}




    </div>
  );
}

export default Home;
