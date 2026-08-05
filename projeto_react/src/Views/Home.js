// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Home() { // aqui é JavaScript

  const [isFiltered, setIsFiltered] = useState(false);
  const nav = useNavigate();
  const [professionals, setProfessionals] = useState([])
  const [logado, setLogado] = useState(-1)
  const [funcao, setFuncao] = useState('');

  useEffect(() => {
    isLogado()
  }, [])

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

      if (dataProfessionals && dataProfessionals.length > 0) {
        setProfessionals(dataProfessionals);
        setFuncao(dataProfessionals[0].funcao || filtro);
      } else {
        setProfessionals([]);
        setFuncao(filtro);
      }
    } else {
      let { data: dataProfessionals, error } = await supabase
        .from('users')
        .select('*');

      if (dataProfessionals && dataProfessionals.length > 0) {
        setProfessionals(dataProfessionals);
        setFuncao(dataProfessionals[0].funcao || '');
      } else {
        setProfessionals([]);
        setFuncao('');
      }
    }
    setIsFiltered(true);
  }

  return ( // Aqui é html
      <div className='backgroundScreen'>
        {!isFiltered && (
          <>
            <div>
              <img style={{ maxWidth: '100%', height: 'auto' }} src='https://wvljndxyaidxngxzfmyc.supabase.co/storage/v1/object/public/logos/texto_1.png' alt="Ajuda Aqui" />
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
          <div>

            <button className='buttonVoltar' onClick={() => setIsFiltered(false)} ><i className="fa-solid fa-circle-left"></i></button>

            <h2>{funcao.toUpperCase()}</h2>

            <div className='exibicaoFiltrada'>
              {professionals.map(
                u => (
                  <div onClick={() => nav(`/profile/${u.auth_id}`, { replace: true })} className='cardLista' key={u.auth_id}>
                    <img src={u.url} width="60px" height="60px" /> <br/>{u.name} {u.last_name}<br />
                    {/* {logado == u.auth_id &&
                      (<button variant="warning" onClick={() => nav(`/profile/edit/${u.auth_id}`, { replace: true })}>Editar</button>
                      )} */}
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
  );
}

export default Home;
