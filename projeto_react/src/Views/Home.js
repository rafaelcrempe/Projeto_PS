// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
// import Professionals from './Views/Users/Professionals.js';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


function Home() { // aqui é JavaScript

  const [isFiltered, setIsFiltered] = useState(false);
  const nav = useNavigate();
  const [professionals, setProfessionals] = useState([])
  const [logado, setLogado] = useState(-1)



  useEffect(() => {
    isLogado()
  })

  async function isLogado() {
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

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
    <>
      <div className='backgroundScreen'>
        {!isFiltered && (
          <>
            <div>
              <img src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/texto_1.png' />
            </div>

            <div className='homeProfessional'>
              <div onClick={() => readProfessionals('pedreiro')} className='cardProfissao'>
                <img width='100px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/pedreiro.png' />
                <label>PEDREIRO</label>
              </div>
              <div onClick={() => readProfessionals('encanador')} className='cardProfissao'>
                <img width='100px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/encanador.png' />
                <label>ENCANADOR</label>
              </div>
              <div onClick={() => readProfessionals('pintor')} className='cardProfissao'>
                <img width='100px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/pintor.png' />
                <label>PINTOR</label>
              </div>
              <div onClick={() => readProfessionals('eletricista')} className='cardProfissao'>
                <img width='100px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/eletricista.png' />
                <label>ELETRICISTA</label>
              </div>
              <div onClick={() => readProfessionals('marceneiro')} className='cardProfissao'>
                <img width='100px' src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/profissoes/marceneiro.png' />
                <label>MARCENEIRO</label>
              </div>
            </div>
          </>
        )}



        {isFiltered && (
          <div className='column'>

            <button className='buttonVoltar' onClick={() => setIsFiltered(false)} ><i class="fa-solid fa-circle-left"></i></button>

            <h2>PROFISSIONAIS</h2>

            {professionals.map(
              u => (

                <div onClick={() => nav(`/profile/${u.auth_id}`, { replace: true })} className='cardLista' key={u.auth_id}>
                  <img src={u.url} width="50px" height="50px" /> {u.name} {u.last_name}<br />
                  {logado == u.auth_id &&
                    (<button variant="warning" onClick={() => nav(`/profile/edit/${u.auth_id}`, { replace: true })}>Editar</button>
                    )}
                </div>
              )
            )}
          </div>
        )}
      </div>
      <span>
      <Footer />
      </span>
    </>
  );
}

export default Home;
