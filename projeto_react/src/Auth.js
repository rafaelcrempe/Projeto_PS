import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function Auth() { // aqui é JavaScript


  // a função useState retorna um vetor, e esse vetor é constante
  // sempre em par, uma variável e uma função
  // por boa prática, o nome da função sempre é "set+Nome_Variável"
  const nav = useNavigate(); // cria uma variável para chamar a função construtora e diminuir o código posteriormente
  const [user, setUser] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    last_name: "",
    birth: "",
    cpf: "",
    url: ""
  });


  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isProfessional, setIsProfessional] = useState(true);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function logar() {
    setLoading(true)

    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
      })

      if (error) throw error

      setMsg("Logou");
      localStorage.setItem('supaSession', data.session) //guardar um item no armazenamento local


      setTimeout(
        nav('/home', { replace: true }),
        5002
      )

    } catch (err) {
      setMsg('Error: ' + err);
    }

    setLoading(false)

  }

  async function register() {

    setLoading(true);

    try { // uma especie de if/else, ele tenta executar o que esta no try e, caso não consiga, segue para o catch
      let { data, error } = await supabase.auth.signUp({ //quando utilizar AWAIT, a função precisa ser declarada como assíncrona (async)
        email: user.email,
        password: user.password
      })

      if (error) throw error //throw força um erro, então se o supabase der erro, ele força o código a parar e entrar no catch
      if (data.status == 400) throw data.message //podemos colocar outros erros aqui, mas inicialmente usaremos apenas o 400 por ser o mais comum

      const uid = data?.user?.id;
      if (!uid) throw 'deu ruim';

      const senduser = {
        phone: user.phone,
        name: user.name,
        last_name: user.last_name,
        birth: user.birth,
        cpf: user.cpf,
        auth_id: uid
      }

      const { data: dU, error: eU } = await supabase
        .from('users')
        .insert(senduser)
      // .select()


      setMsg("Cadastro realizado com sucesso!")
    } catch (e) {
      setMsg(`Erro: ${e.message}`)
    }

    setLoading(false);

    setTimeout(() => setMsg(""), 5000); // depois de exibir o erro por 5s (mesmo tempo da mensagem de erro), volta a mensagem para vazio. 
    // Permite que a mensagem seja exibida de novo
  }


  return ( // Aqui é html
    <div className="screen">
      <div className="fundoCadastro">
        <div className="card">

          {!isLogin &&
            (<div>
              <p>Você deseja se cadastrar como: </p>
              <button className={isProfessional ? 'buttonSuccess' : 'ative'} onClick={() => setIsProfessional(false)}>CLIENTE</button>
              <button className={isProfessional ? 'ative' : 'buttonSuccess'} onClick={() => setIsProfessional(true)}>PROFISSIONAL</button>
            </div>
            )
          }


          {!isLogin && isProfessional && (
            <form className="register">
              <label for="funcao">Escolha sua especialidade: </label>
                <select name="funcao" placeholder="Função" onChange={(e) => setUser({ ...user, funcao: e.target.value })}><br />
                  <option value="pedreiro">Pedreiro</option>
                  <option value="encanador">Encanador</option>
                  <option value="pintor">Pintor</option>
                  <option value="eletricista">Eletricista</option>
                  <option value="marceneiro">Marceneiro</option>
                </select>


              <label>
                Nome <br />
                <input type="text" placeholder="Nome" onChange={(e) => setUser({ ...user, name: e.target.value })} /><br />
              </label>
              <label>
                Sobrenome <br />
                <input type="text" placeholder="Sobrenome" onChange={(e) => setUser({ ...user, last_name: e.target.value })} /><br />
              </label>
              <label>
                Data de Nascimento <br />
                <input type="date" placeholder="Data Nascimento" onChange={(e) => setUser({ ...user, birth: e.target.value })} /><br />
              </label>
              <label>
                CPF <br />
                <input type="text" placeholder="CPF" onChange={(e) => setUser({ ...user, cpf: e.target.value })} /><br />
              </label>
              <label>
                Telefone <br />
                <input type="tel" placeholder="Telefone" onChange={(e) => setUser({ ...user, phone: e.target.value })} /><br />
              </label>
              <label>
                Email <br />
                <input type="email" placeholder="E-mail" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
              </label>
              <label>
                Senha <br />
                <input type="password" placeholder="Senha" onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
              </label>
              <label>
                Confirmar Senha <br />
                <input type="password" placeholder="Confirmar Senha" /><br />
              </label>
              <button className="buttonSuccess" onClick={register} disabled={loading}>
                {loading ? "CADASTRANDO..." : "CADASTRAR"}
              </button>

            </form>
          )}
          {!isLogin && !isProfessional && (
            <form className="register">

              <label>
                Nome <br />
                <input type="text" placeholder="Nome" onChange={(e) => setUser({ ...user, name: e.target.value })} /><br />
              </label>
              <label>
                Sobrenome <br />
                <input type="text" placeholder="Sobrenome" onChange={(e) => setUser({ ...user, last_name: e.target.value })} /><br />
              </label>
              <label>
                Data de Nascimento <br />
                <input type="date" placeholder="Data Nascimento" onChange={(e) => setUser({ ...user, birth: e.target.value })} /><br />
              </label>
              <label>
                CPF <br />
                <input type="text" placeholder="CPF" onChange={(e) => setUser({ ...user, cpf: e.target.value })} /><br />
              </label>
              <label>
                Telefone <br />
                <input type="tel" placeholder="Telefone" onChange={(e) => setUser({ ...user, phone: e.target.value })} /><br />
              </label>
              <label>
                Email <br />
                <input type="email" placeholder="E-mail" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
              </label>
              <label>
                Senha <br />
                <input type="password" placeholder="Senha" onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
              </label>
              <label>
                Confirmar Senha <br />
                <input type="password" placeholder="Confirmar Senha" /><br />
              </label>
              <button className="buttonSuccess" onClick={register} disabled={loading}>
                {loading ? "CADASTRANDO..." : "CADASTRAR"}
              </button>

            </form>
          )}

          {isLogin && (
            <form className="login">
              <label>
                Email<br />
                <input className="inputEmailLogin" name="Email" type="email" placeholder="Digite o seu email" onChange={(e) => setUser({ ...user, email: e.target.value })} /><br />
              </label>
              <label>
                Senha<br />
                <input className="inputSenhaLogin" name="Senha" type="password" placeholder="Digite a sua senha" onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
              </label>

              <button className="buttonSuccess" onClick={logar} disabled={loading} >
                {loading ? "ENTRANDO..." : "LOGIN"}
              </button>
            </form>
          )}


          <a className="alterarLoginCadastro" onClick={() => setIsLogin(!isLogin)}>
            {isLogin && ("Cadastre-se")}
            {!isLogin && ("Voltar para o login")}
          </a>

        </div>
      </div>

      {msg && (<div className='toast'> {msg} </div>)}     {/* exibe a mensagem de erro na tela */}


    </div>

  );
}

export default Auth;
