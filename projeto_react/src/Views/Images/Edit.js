import './Style.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload } from '../../Components/Upload';
import { supabase } from '../../supabaseClient';

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
      .eq('id', id);

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
      .eq('id', id)  // Usar uid para buscar imagem do usuário logado
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
