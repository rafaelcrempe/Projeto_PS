import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Upload({
  fixedFileName,
  onUploadSuccess,
  onError,
}) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadImage() {
      if (!fixedFileName) return;

      const { data, error } = supabase.storage
        .from('images')
        .getPublicUrl(fixedFileName);

      if (error) {
        console.error('Erro ao pegar URL da imagem existente:', error);
        if (onError) onError(error);
        return;
      }
      setImageUrl(data.publicUrl);
    }
    loadImage();
  }, [fixedFileName, onError]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setImageUrl(''); // limpar url anterior para atualizar
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Selecione uma imagem!');
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = fixedFileName ? fixedFileName : `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        alert('Erro no upload: ' + uploadError.message);
        setUploading(false);
        if (onError) onError(uploadError);
        return;
      }

      const { data: publicData, error: urlError } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (urlError) {
        alert('Erro ao pegar URL: ' + urlError.message);
        setUploading(false);
        if (onError) onError(urlError);
        return;
      }

      setImageUrl(publicData.publicUrl);
      setUploading(false);

      if (onUploadSuccess) {
        onUploadSuccess(publicData.publicUrl);
      }

    } catch (err) {
      alert('Erro inesperado: ' + err.message);
      setUploading(false);
      if (onError) onError(err);
    }
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

export { Upload };
