// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


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

  return ( // Aqui é html
    <div className="screen">

      <h1 className="page-title">Avaliações de Serviço</h1>
      <form onSubmit={(e)=> e.preventDefault()}>
  
        <input type ="text" placeholder= 'status' onChange={(e) => setService({ ...service, status: e.target.value })}/>
        <input type ="text" placeholder= 'review' onChange={(e) => setService({ ...service, review: e.target.value })}/>
        <input type ="text" placeholder= 'star' onChange={(e) => setService({ ...service, star: e.target.value })}/>
        <input type ="number" placeholder= '1' onChange={(e) => setService({ ...service, professional_id: e.target.value })}/>

        <button onClick ={createServices}> Salvar</button>
      </form>


      <button onClick ={readServices}> Salvar</button><br></br>

      {services.map(
          s => (

            <div key={s.id}>
            
      
              <h1>{s. professional_id}</h1> <button>{s.status}</button>
              <div style={{ margin: '10px 0' }}>
                <StarRating rating={s.star} readonly={true} />
              </div>
 
              <p>{s.review}</p>

            </div>
            

          )
      )}

      
      

    </div>

    
  
  );
}

export default Services;
