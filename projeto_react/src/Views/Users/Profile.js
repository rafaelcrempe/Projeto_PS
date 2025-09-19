// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { data, Link, useNavigate, useParams } from 'react-router-dom';
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
    <div style={{ fontSize: '24px', color: '#DBE2EF', cursor: readonly ? 'default' : 'pointer' }}>
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
  const [showServicesStatus, setShowServicesStatus] = useState("Pendente"); // Altera a visualização entre serviços novos ou em andamento
  const [isServiceRequested, setIsServiceRequested] = useState(false) // Informa se o cliente já tem um pedido em andamento com o profissional
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
  }, [id])

  useEffect(() => {
    if (!user.auth_id || !loggedUser.id) {
      console.log("Não puxou")
      return;
    } else if (user.auth_id == loggedUser.id) {
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
      localStorage.setItem("paginaSalva", "/profile/" + id)
    }
  }

  // Busca o serviço pelo ID do usuário do params
  async function readServices() {

    const { data: dataServices, error } = await supabase
      .from('view_clients_by_professional')
      .select('*')
      .eq('professional_id', id);


    // let { data: dataServices, error } = await supabase
    //   .from('services')
    //   .select('*, users(name) ') // Está buscando errado, pois busca apenas o proprio profissional
    //   .eq('professional_id', id);

    setServices(dataServices);

    const { data: dataUser, error: errorUser } = await supabase.auth.getUser();
    if (!dataUser.user)
      return;

    dataServices.forEach(s => {
      if (s.client_id == dataUser.user.id && s.status != "Concluído")
        setIsServiceRequested(true)
    })

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

    readServices();

  }

  async function updateServices(currentService, newStatus) {

    delete currentService.last_name;
    delete currentService.name;
    currentService.status = newStatus;

    const { data, error } = await supabase
      .from('services')
      .update(currentService)
      .eq('id', currentService.id)

    readServices();

  }

  // Busca as imagens do serviço
  async function readImage() {
    let { data: dataImages, error } = await supabase
      .from('images')
      .select('*')
      .eq('professional_id', id);

    setImages(dataImages);

  }

const formatPhoneNumber = (phone) => {
  // Remove tudo que não é dígito
  const cleaned = phone.replace(/\D/g, '');
  
  // Verifica se tem código do Brasil (55) e remove
  const hasCountryCode = cleaned.length === 13 && cleaned.startsWith('55');
  const numbers = hasCountryCode ? cleaned.slice(2) : cleaned;
  
  // Aplica a formatação para números com DDD + 9 dígitos
  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  
  // Caso não corresponda ao padrão esperado, retorna o original
  return phone;
};



  //#endregion

  //#region HTML

  return (
    <div className='tatu'>
      <div className='backgroundScreenProfile' style={{ flexDirection: "row", gap: 100 }} >

        {/* Dados do perfil do usuário */}
        <div>

          <div> {/* User: área do Rafael mexer */}

            <img className='profilePicture' src={user.url} />
            <h1 style={{ width: 500 }}>{user.name.toUpperCase()} {user.last_name.toUpperCase()}</h1>
            <div >
              <span className='exibFuncao'>{user.funcao.toUpperCase()}</span>


              {
                isSelfUser && (
                  <div>
                    {/* Coloque nesta DIV todos os dados que só o próprio usuário logado pode ver */}
                    <Link to={`/profile/edit/${id}`} className='exibFuncao' ><i class="fa-solid fa-pen-to-square"></i> Editar</Link>
                  </div>
                )
              }{
                isSelfUser && (
                  <div>
                    {/* Coloque nesta DIV todos os dados que só o próprio usuário logado pode ver */}
                    <Link to={`/images`} className='exibFuncao' ><i class="fa-solid fa-pen-to-square"></i> Editar imagens</Link>
                  </div>
                )
              }

              {
                isLogged == true ?
                  !isSelfUser && (
                    // Aqui é o que aparece se o usuário estiver logado e puder contratar o serviço
                    <p>
                      {



                        isServiceRequested == false ?
                          <button className='buttonBase' onClick={() => createServices(user)}>CONTATO</button>
                          :
                          <span style={{ color: "#DBE2EF" }}> <span style={{ fontWeight: "bold" }}>SERVIÇO SOLICITADO!</span> <br /> Entre em contato com {user.name} pelo telefone {formatPhoneNumber(user.phone)} para definir os detalhes!</span>
                      }
                    </p>
                  ) : (
                    // Mensagem se o usuário não estiver logado
                    <p><a href="/login">Clique aqui</a> para entrar com sua conta e visualizar</p>
                  )
              }

            </div>
          </div>

          <div> {/* Services: Marcos */}
            {services ?
              services.map(
                s => (
                  (s.status == "Concluído" && s.star != 0) &&
                  <Services key={s.id} servico={s} starRating={<StarRating rating={s.star} readonly={true} />} />
                )
              ) : (
                <span>Nenhum serviço ainda</span>
              )
            }
          </div>

          <div className="cardImagem"> {/* Images área do Renan mexer */}
            {images ?
              images.map(
                i => (
                  <div key={i.id}>
                    <img src={i.url} />
                  </div>
                )
              ) : (
                <span>Nenhuma imagem ainda</span>
              )

            }
          </div>

        </div>

        {/* Serviços pendentes para ser aceitos */}
        {
          isSelfUser && user.funcao != 'cliente' && (
            <div style={{ alignSelf: "start" }}>
              <h2>Solicitações</h2>
              <p>Acompanhe suas solicitações de serviços por aqui:</p>

              <button className='buttonBase' style={{ backgroundColor: showServicesStatus == "Pendente" ? "white" : "gray", color: "#112D4E", borderRadius: "10px", borderBlockColor: "ActiveBorder", padding: "5px 25px", marginBottom: "20px", marginRight: 30 }} onClick={() => setShowServicesStatus("Pendente")}>Pendentes</button>
              <button className='buttonBase' style={{ backgroundColor: showServicesStatus == "Em andamento" ? "white" : "gray", color: "#112D4E", borderRadius: "10px", borderBlockColor: "ActiveBorder", padding: "5px 25px", marginBottom: "20px", marginRight: 30, marginBottom: 20 }} onClick={() => setShowServicesStatus("Em andamento")}>Em andamento</button>

              {
                services.length > 0
                  ?
                  services.map(s =>
                    s.status == showServicesStatus &&
                    <div style={{ boxShadow: "1px 2px 3px black", padding: 20, marginBottom: 15 }} >
                      <p style={{ margin: 0 }}> <span style={{ fontSize: 25 }}>{s.name} {s.last_name}</span> &nbsp;&nbsp; <a href={"/profile/" + s.client_id} >Ver o perfil</a> </p>
                      <p>Solicitado em: {s.created_at}</p>


                      {
                        s.status == "Pendente" ?
                          <div>
                            <button className='buttonBase' onClick={() => updateServices(s, "Em andamento")} style={{ backgroundColor: "green", color: "white", border: "2px solid #112D4E", padding: "5px 25px", marginRight: 30 }} >Aceitar</button>
                            <button className='buttonBase' onClick={() => updateServices(s, "Cancelado")} style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 25px" }} >Recusar</button>
                          </div>
                          :
                          <button className='buttonBase' onClick={() => updateServices(s, "Concluído")} style={{ backgroundColor: "yellow", color: "black", border: "none", padding: "5px 25px", marginRight: 30 }} >Encerrar serviço</button>
                      }
                    </div>
                  )
                  :
                  <p style={{ boxShadow: "1px 2px 3px black", padding: 20 }}>Nenhum serviço solicitado ainda...</p>

              }

            </div>
          )
        }

      </div>
    </div>
  );

  //#endregion

}


export default Profile;
