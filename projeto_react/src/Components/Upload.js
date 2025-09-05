import React, { useState } from 'react';
import { supabase } from './supabaseClient'; // seu cliente Supabase configurado

function Upload({
    onChange,
    objeto,
    campo


}) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImageUrl(''); // limpar url anterior
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Selecione uma imagem!');
      return;
    }

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (error) {
      alert('Erro no upload: ' + error.message);
      setUploading(false);
      return;
    }

    const { publicURL, error: urlError } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    if (urlError) {
      alert('Erro ao pegar URL: ' + urlError.message);
      setUploading(false);
      return;
    }

    setImageUrl(publicURL);
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Enviando...' : 'Enviar'}
      </button>

      {imageUrl && (
        <div>
          <p>Imagem enviada:</p>
          <img src={imageUrl} alt="upload" style={{ maxWidth: '300px' }} />
          <p>
            Link: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a>
          </p>
        </div>
      )}
    </div>
  );
}

export default Upload;