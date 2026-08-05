// import logo from './logo.svg';
import './Style.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Input} from '../../Components/Input';
import { supabase } from '../../supabaseClient';

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
          .eq('auth_id', id)
          .single();

          setImage(dataImages);        
      }
      
    

    
    return ( // Aqui é html
      <div className="screen">
        <form onSubmit={(e) => e.preventDefault()} >
        <Input type="text" placeholder='url imagem ' onChange={setImage} obejto={image} campo='url' /><> </>

          <button onClick={createImage} >Ver</button><br/>
          <button onClick={ () => nav(`/images`, {replace: true}) } >Voltar</button>
        </form>
      </div>
  );
}

export default Images;
