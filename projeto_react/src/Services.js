import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Services() { // aqui é JavaScript
  const nav = useNavigate();

  const [service,  setService] =useState({
    status: "",
    review: "",
    star: "",
    service_id: "",

  })

  async function createServices(){
    console.log("passou!")
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    if(errorUser) nav('/login', {replace: true})
    if(!dataUser) nav('/login', {replace: true})
    if(dataUser && !dataUser.id) nav('/login', {replace: true})
        
    const { data, error } = await supabase

      .from('service')
      .insert([
        service
      ])
      .select()
              

  }


  return ( // Aqui é html
    <div className="screen">
      <form>
        <input type ="text" placeholder= 'status' onChange={(e) => setService({ ...service, status: e.target.value })}/>
        <input type ="text" placeholder= 'review' onChange={(e) => setService({ ...service, review: e.target.value })}/>
        <input type ="text" placeholder= 'star' onChange={(e) => setService({ ...service, star: e.target.value })}/>

        <button onClick ={createServices}> Salvar</button>
      </form>




    </div>
  );
}

export default Services;
