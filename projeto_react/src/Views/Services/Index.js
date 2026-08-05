// import logo from './logo.svg';
import './Style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import {Input} from '../../Components/Input';
import { supabase } from '../../supabaseClient';


const StarRating = ({ rating, onRatingChange, readonly = false }) => {
  const fullStar = '★';
  const emptyStar = '☆';
  
  return (
    <div style={{ fontSize: '24px', color: '#FF0000', cursor: readonly ? 'default' : 'pointer' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !readonly && onRatingChange && onRatingChange(star)}
          style={{ cursor: readonly ? 'default' : 'pointer' }}
        >
          {star <= rating ? fullStar : emptyStar}
        </span>
      ))}
    </div>
  );
};

function Services() { // aqui é JavaScript
  const nav = useNavigate();

  const [service,  setService] =useState({
    status: "",
    review: "",
    star: "",
    professional_id: "",
    client_id: "",
  })
  const [services, setServices]= useState([]) // essa função useEfFect, serve, para quando entrar na tela, ja acontece!
  useEffect(()=> {
    readServices()
  }, [])

  async function createServices(){
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    const uid =dataUser?.user?.id;
    if(!uid) nav("/login", {replace: true});
        
    const { data, error } = await supabase

      .from('services')
      .insert({...service, client_id: uid});
      //.select();
                

       // service
      //.select()
    
              

    
  } 

    async function readServices(){
      
      let { data: dataServices, error } = await supabase
      .from('services')
      .select('*');

      setServices(dataServices);
        
    }

    async function delServices(s) {
      const {error} = await supabase
      .from('services')
      .delete()
      .eq('id', s)
      
    }

  return ( // Aqui é html
    <div className="screen"><br></br>

      <h2 className="page-title">Avaliações de Serviços</h2>
      <form onSubmit={(e)=> e.preventDefault()}>
  
        <Input type ="text" placeholder= 'status' onChange={setService} objeto={service} campo='status'/>
        <Input type ="text" placeholder= 'review' onChange={setService} objeto={service} campo='review'/>
        <Input type ="text" placeholder= 'star' onChange={setService} objeto={service} campo='star'/>
        <Input type ="number" placeholder= '1' onchange={setService} objeto={service} campo='professional_id'/>
        

        <button onClick ={createServices}> Salvar</button>
      </form>


      <button onClick ={readServices}> Salvar</button><br></br>

      


        <buton onClick={() => readServices("services")}>Busca Todos</buton>
        <listSevices
          services={services}
  
  


      />
      

    </div>

    
  
  );
}

export default Services;
