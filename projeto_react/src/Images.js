import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom'


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Images() { // aqui é JavaScript

  const nav = useNavigate();

  const [image, setImage] = useState({
    url:"",
    professional_id: ""
  })

   async function createImage(e){
    e.preventDefault();
    console.log('passou')
    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();

    if(errorUser) nav('/login', {replace: true})

    if(!dataUser) nav('/login', {replace: true})
    
    if(!dataUser && !dataUser.id) nav('/login', {replace:true})

console.log(dataUser)

  
    
    const { data, error } = await supabase
      .from('images')
      .insert([
        {...image, professional_id: dataUser.id }     
      ])
      // .select()
       console.log(error)

  }



  return ( // Aqui é html
    <div className="screen">
      <form>
        <input type="text" placeholder='url imagem ' onChange={(e) => setImage({...image, url: e.target.value})}/>

        <button className="buttonSuccess" onClick={(e) =>createImage(e)} >
                CADASTRAR
              </button>

      </form>

      

    </div>
  );
}

export default Images;
