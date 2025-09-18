// import logo from './logo.svg';
import './Style.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import { Upload } from '../../Components/Upload';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Images() { // aqui é JavaScript

  const nav = useNavigate();


  const [images, setImages] = useState([])

  useEffect( () => {
    readImage()
  }, [] )

  
      async function delImage(id){
        const { error } = await supabase
          .from('images')
          .delete()
          .eq('id', id);

          readImage()

      }
    
      async function updateImage(newUrl) {
        const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
        const uid = dataUser?.user?.id;
        console.log('UID:', uid);
    
        if (!uid) {
          nav('/login', { replace: true });
          return;
        }
    
        console.log('Usuário logado:', uid);
    
        // Usar uid do usuário logado para atualizar
        const { data, error } = await supabase
          .from('images')
          .insert({
            url: newUrl,
            professional_id: uid
          })
    
        if (error) {
          console.error('Erro ao atualizar imagem:', error);
          alert('Erro ao atualizar imagem: ' + error.message);
          return;
        }
    
        console.log('Imagem atualizada com sucesso:', data);
        readImage()
      }
    
      async function readImage() {
        const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
        const uid = dataUser?.user?.id;
    
        if (!uid) {
          nav('/login', { replace: true });
          return;
        }
    
        let { data: dataImages, error } = await supabase
          .from('images')
          .select('*')
          .eq('professional_id', uid);  // Usar uid para buscar imagem do usuário logado
  
    
        if (error) {
          console.error('Erro ao ler imagem:', error);
          return;
        }
    
        setImages(dataImages);
      }
    
    return ( // Aqui é html
      <div className='teladeImagen'>

      {/* Dados do perfil do usuário */}
      <form onSubmit={(e) => e.preventDefault()} >
        <Upload onUploadSuccess={updateImage} />
      </form>
      

        <div className='lista'>
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
