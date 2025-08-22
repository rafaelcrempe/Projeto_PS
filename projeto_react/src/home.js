import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Home() { // aqui é JavaScript
  const nav = useNavigate();

  
  const [home, setHome]= useState([])

  async function createHome(){
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    const uid =dataUser?.user?.id;
    if(!uid) nav("/login", {replace: true});
        
    const { data, error } = await supabase

      .from('home')
      .insert({...home, client_id: uid});
      //.select();
                

       // service
      //.select()
    
              

    
  } 

    async function readHome(filtro){
      
      if(filtro){

        let { data: dataHome, error } = await supabase
        .from('home')
        .select('*');
        eq('funcao', filtro)
        
        setHome(dataHome);

      }else{

        let { data: dataHome, error } = await supabase
        .from('home')
        .select('*');
        
        
        setHome(dataHome);

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

      {services.map(
          s => (

            <div key={s.id}>

              
              
            {s.star}
            </div>

          )
      )}

      

    </div>
  );
}

export default Home;
