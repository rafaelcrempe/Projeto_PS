// import logo from './logo.svg';
import './Style.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import {Input} from '../../Components/Input';



const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Images() { // aqui é JavaScript

  const nav = useNavigate();
  const {id} = useParams();

  const [image, setImage] = useState({
    url:"",
    professional_id: ""
  })

  useEffect( () => {
    readImage()
  }, [] )

   async function updateImage(){
     
     
     const {data: dataUser, error: errorUser} = await supabase.auth.getUser();
     
     const uid = dataUser?.user?.id;
     
     if(!uid) nav('/login', {replace: true})
      
      console.log(uid)
      
      const { data, error } = await supabase
      .from('images')
      .update({...image, professional_id: uid })
      .eq('auth_id', id);

    }

      async function readImage(){
       
        let { data: dataImages, error } = await supabase
          .from('images')
          .select('*')
          .eq('auth_id', id)
          .single();

          setImage(dataImages);        
      }
      
    

    
    return ( // Aqui é html
      <div className="screen">
        <form onSubmit={(e) => e.preventDefault()} >
        <Input type="text" placeholder='url imagem ' onChange={setImage} obejto={image} campo='url' /><> </>

          <button onClick={updateImage} >SALVAR</button><br/>
          <button onClick={ () => nav(`/images`, {replace: true}) } >Voltar</button>
        </form>
      </div>
  );
}

export default Images;
