// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
// import Professionals from './Views/Users/Professionals.js';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() { // aqui é JavaScript
  const nav = useNavigate();

  
  const [users, setUsers]= useState([])

    useEffect(()=>{
      readUsers()
    }, [])

    async function readUsers(filtro){
      
      if(filtro){

        let { data: dataProfessionals, error } = await supabase
        .from('professionals')
        .select('*');
        // .eq('funcao', filtro);
        
        setUsers(dataUsers);

      }else{

        let { data: dataUsers, error } = await supabase
        .from('users')
        .select('*');
        
        
        setUsers(dataUsers);

      }




        
    }

  return ( // Aqui é html
    <div className='card'>
        <div className='cardProfissional'>
          <img src='https://placehold.com/50x50'/>
          <p>Pedreiro</p>
        </div>
        <div className='cardProfissional'>
          <img src='https://placehold.com/50x50'/>
          <p>Encanador</p>
        </div>
        <div className='cardProfissional'>
          <img src='https://placehold.com/50x50'/>
          <p>Pintor</p>
        </div>
        <div className='cardProfissional'>
          <img src='https://placehold.com/50x50'/>
          <p>Eletrecista</p>
        </div>
        <div className='cardProfissional'>
          <img src='https://placehold.com/50x50'/>
          <p>Marceneiro</p>
        </div>
    <div/>

      {users.map(
          u => (

            <div key={u.id}>
              <img src={u.url}/>
              <p>(u.funcao)</p>

              
              
            {u.Users}
            </div>

          )
      )}

      

    </div>
  );
}

export default Home;
