import './Style.css';
import { useState, useEffect } from 'react';
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '../../Components/Input';
import { Upload } from '../../Components/Upload';

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8";
const supabase = createClient(supabaseUrl, supabaseKey);

function Images() {
  const nav = useNavigate();
  const { id } = useParams();

  const [image, setImage] = useState({
    url: "",
    professional_id: ""
  });

  useEffect(() => {
    readImage();
  }, []);

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
      .update({
        url: newUrl,
        professional_id: uid
      })
      .eq('auth_id', uid);

    if (error) {
      console.error('Erro ao atualizar imagem:', error);
      alert('Erro ao atualizar imagem: ' + error.message);
      return;
    }

    console.log('Imagem atualizada com sucesso:', data);
    setImage(prev => ({ ...prev, url: newUrl }));
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
      .eq('auth_id', uid)  // Usar uid para buscar imagem do usuário logado
      .single();

    if (error) {
      console.error('Erro ao ler imagem:', error);
      return;
    }

    setImage(dataImages);
  }

  return (
    <div className="screen">
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Passa a callback onUploadSuccess para o Upload */}
        <Upload onUploadSuccess={updateImage} /><br />
        <button onClick={() => nav(`/images`, { replace: true })}>Voltar</button>
      </form>
    </div>
  );
}

export default Images;
