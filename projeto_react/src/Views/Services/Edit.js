// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input'
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { supabase } from '../../supabaseClient';


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
  
        <Input type ="text" placeholder= 'status' onChange={setService} objeto={service} campo='status'/>
        <Input type ="text" placeholder= 'review' onChange={setService} objeto={service} campo='review'/>
        <Input type ="text" placeholder= 'star' onChange={setService} objeto={service} campo='star'/>
        <Input type ="number" placeholder= '1' onchange={setService} objeto={service} campo='professional_id'/>
        

        <button onClick ={updateServices}> Salvar</button>
      </form>


      
      

    </div>

    
  
  );
}

export default Services;
