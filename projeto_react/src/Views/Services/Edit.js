// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


function Services() { // aqui é JavaScript
  const{id} = useParams
  const nav = useNavigate();

  const [service,  setService] =useState({
    status: "",
    review: "",
    star: "",
    professional_id: "",
    client_id: "",
  })

  useEffect(()=> {
    readServices()
  }, [])

  async function updateServices(){
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    const uid =dataUser?.user?.id;
    if(!uid) nav("/login", {replace: true});
        
    const { data, error } = await supabase

      .from('services')
      .update({...service, client_id: uid})
      .eq('auth_id', id);
      //.select();
                

       // service
      //.select()
    
              

    
  } 

    async function readServices(){
      
      let { data: dataServices, error } = await supabase
      .from('services')
      .select('*')
      .eq('id',id)
      .single();

      setService(dataServices);
        
    }

  return ( // Aqui é html
    <div className="screen">

      <h1 className="page-title">Avaliações de Serviço</h1>
      <form onSubmit={(e)=> e.preventDefault()}>
  
        <input type ="text" placeholder= 'status' onChange={(e) => setService({ ...service, status: e.target.value })}/>
        <input type ="text" placeholder= 'review' onChange={(e) => setService({ ...service, review: e.target.value })}/>
        <input type ="text" placeholder= 'star' onChange={(e) => setService({ ...service, star: e.target.value })}/>
        <input type ="number" placeholder= '1' onChange={(e) => setService({ ...service, professional_id: e.target.value })}/>

        <button onClick ={updateServices}> Salvar</button>
      </form>


      
      

    </div>

    
  
  );
}

export default Services;
