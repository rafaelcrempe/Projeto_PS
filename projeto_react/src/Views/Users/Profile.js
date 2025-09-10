// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Services from './Services';

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

// Componente das estrelinhas. Ele é separado do perfil.
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


// Esse é o componente do perfil, tudo fica aqui
function Profile() {

  //#region Variáveis, useStates e useEffects

  // ---- Variáveis comuns
  const nav = useNavigate(); // Navegação entre as páginas
  const { id } = useParams() // Variável que pega o ID do perfil que está sendo visualizado

  // ---- Variáveis de useState
  const [user, setUser] = useState({ // Dados do usuário que está sendo exibido o perfil
    email: "",
    password: "",
    phone: "",
    name: "",
    funcao: "",
    last_name: "",
    birth: "",
    cpf: "",
    url: ""
  });

  const [services, setServices] = useState([]) // Busca os dados do serviço deste usuário que está sendo exibido
  const [images, setImages] = useState([]) // Imagens do usuário do serviço que está sendo mostrado

  const [loggedUser, setLoggedUser] = useState({}); // Dados do usuário que está logado
  const [isLogged, setIsLogged] = useState(false); // Retorna true/false se o usuário está logado
  const [isSelfUser, setIsSelfUser] = useState(false); // Retorna true/false se o usuário logado está no próprio perfil

  // ---- Funções de UseEffects

  useEffect(() => { // Roda assim que o usuário chega na página
    showUser(id) // Busca o perfil que está sendo exibido
    getLoggedUser(); // Busca o usuário que está logado
    readServices() // Busca o serviço do usuário
    readImage() // Busca as imagens do serviço do usuário
  }, [])

  useEffect(() => {
    if (!user.auth_id || !loggedUser.id)
      return;
    if (user.auth_id == loggedUser.id) {
      console.log("O usuário logado está vendo o seu próprio perfil")
      setIsSelfUser(true);
    } else {
      setIsSelfUser(false);
    }
  }, [user, loggedUser])

  //#endregion

  //#region Funções
  
  // Busca os dados do perfil do usuário que está sendo visitado/visualizado
  async function showUser(id) {

    let { data: dataUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('auth_id', id)
      .single();

    setUser(dataUser);

  }

  // Busca os dados do usuário que está logado agora
  async function getLoggedUser() {

    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

    if (dataUser.user) {
      setLoggedUser(dataUser.user);
      setIsLogged(true)
      localStorage.removeItem("paginaSalva")
    }
    else {
      setLoggedUser({});
      setIsLogged(false)
      localStorage.setItem("paginaSalva", "/profile/"+id)
    }
  }

  // Busca o serviço pelo ID do usuário do params
  async function readServices() {

    let { data: dataServices, error } = await supabase
      .from('services')
      .select('*')
      .eq('professional_id', id);

    setServices(dataServices);

  }

  // Cadastra o serviço no banco ao clicar no botão de contratar serviço
  async function createServices(u) {
    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();

    const uid = dataUser?.user?.id;
    if (!uid) nav("/login", { replace: true });

    const novoServico = {
      status: "Pendente",
      review: null,
      star: 0,
      professional_id: u.auth_id
    }

    const { data, error } = await supabase
      .from('services')
      .insert({ ...novoServico, client_id: uid });

  }

  // Busca as imagens do serviço
  async function readImage() {
    let { data: dataImages, error } = await supabase
      .from('images')
      .select('*')
      .eq('auth_id', id);

    setImages(dataImages);

  }

  //#endregion

  //#region HTML

  return (
    <div className='backgroundScreen'>


      <div> {/* User: área do Rafael mexer */}

        <img src={user.url} />
        <h1>{user.name} {user.last_name}</h1>
        <div >
          <p>{user.funcao}</p>


          {
            isSelfUser == true &&
              <div>
                {/* Coloque nesta DIV todos os dados que só o próprio usuário logado pode ver */}
                <p> Meus dados</p>
              </div>
          }

          {
            isLogged == true ?
              isSelfUser == false &&
                // Aqui é o que aparece se o usuário estiver logado e puder contratar o serviço
                <p><button onClick={() => createServices(user)}>{user.phone}</button></p>
                :
                // Mensagem se o usuário não estiver logado
                <p><a href="/login">Clique aqui</a> para entrar com sua conta e visualizar</p>
          }

        </div>
      </div>

      <div> {/* Services: Marcos */}
        {
          services.map(
            s => (
              <>
                <Services key={s.id} servico={s} starRating={<StarRating rating={s.star} readonly={true} />} />
              </>
            )
          )
        }
      </div>

      <div> {/* Images área do Renan mexer */}
        {images.map(
          i => (
            <div key={i.id}>
              <img src={i.url} />
            </div>
          )
        )}
      </div>
    </div>
  );

  //#endregion

}


export default Profile;
