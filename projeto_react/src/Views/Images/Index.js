// import logo from './logo.svg';
import './Style.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import {Input} from '../../Components/Input';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Images() { // aqui é JavaScript

  const nav = useNavigate();

  const [image, setImage] = useState({
    url:"",
    professional_id: ""
  })

  const [images, setImages] = useState([])

  useEffect( () => {
    readImage()
  }, [] )

   async function createImage(){
     
     
     const {data: dataUser, error: errorUser} = await supabase.auth.getUser();
     
     const uid = dataUser?.user?.id;
     
     if(!uid) nav('/login', {replace: true})
      
      console.log(uid)
      
      const { data, error } = await supabase
      .from('images')
      .insert({...image, professional_id: uid })
      // .select();

    }

      async function readImage(){
       
        let { data: dataImages, error } = await supabase
          .from('images')
          .select('*')

          setImages(dataImages);        
      }
      
      async function delImage(id){
        const { error } = await supabase
          .from('images')
          .delete()
          .eq('id', id);

          readImage()

      }
    

    
    return ( // Aqui é html
      <div className="screen">
      <form onSubmit={(e) => e.preventDefault()} >
        <Input type="text" placeholder='url imagem ' onChange={setImage} obejto={image} campo='url' /><> </>

        <button onClick={createImage} >SALVAR</button><>               </>
        <button onClick={readImage} >BUSCAR</button>

      </form>
      


        <div className='row'>
        {images.map(
          i => (
            <div key={i.id}>
              <img src={i.url}/>
              <br/>
              <Button variant="danger"  onClick={ ()=> delImage(i.id) } >Excluir</Button>
              <Button variant="primary" onClick={ () => nav(`/images/${i.id}`, {replace: true}) } >Ver</Button>
              <Button variant="warning" onClick={ () => nav(`/images/edit/${i.id}`, {replace: true}) } >Editar</Button>
            </div>   
          )
        )}
        </div>    

      

    </div>
  );
}

export default Images;
