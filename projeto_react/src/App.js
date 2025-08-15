import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);

function App() { // aqui é JavaScript


  // a função useState retorna um vetor, e esse vetor é constante
  // sempre em par, uma variável e uma função
  // por boa prática, o nome da função sempre é "set+Nome_Variável"

  const [user, setUser] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    last_name: "",
    birth: "",
    cpf: ""
  });


  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLogin, setIsLogin] = useState(true);
  const [isSendRegister, setIsSendRegister] = useState(false)

  const [msg, setMsg] = useState("")


  async function register() {

    setIsSendRegister(true);

    try{

      let  {data, error } = await supabase.auth.signUp({ //quando utilizar AWAIT, a função precisa ser declarada como assíncrona (async)
        email: user.email,
      password: user.password

      })

      if(error) throw error

      if(data.status == 400) throw data.message
      
      setMsg("Cadastro realizado!");
   }catch(e){
      setMsg(`Error: ${e.message}`)
  }
    
    setIsSendRegister(false);
    setTimeout(() => setMsg(""), 5000);

  }

  return ( // Aqui é html
    <main className="App">

      <div className="fundoCadastro">
        <div className="card">
          {!isLogin && (
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
              <button className="buttonSuccess" onClick={register} disabled={isSendRegister}>
                {isSendRegister ? "CADASTRANDO..." : "CADASTRAR"}
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

              <button className="buttonSuccess">ENTRAR</button>
            </form>
          )}

          <a className="alterarLoginCadastro" onClick={() => setIsLogin(!isLogin)}>
            {isLogin && ("Cadastre-se")}
            {!isLogin && ("Voltar para o login")}
          </a>

        </div>
      </div>

      {msg && (<div className='toast'>{msg}</div>)}
    </main>
  );
}

export default App;
