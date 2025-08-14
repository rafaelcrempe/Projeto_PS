import logo from './logo.svg';
import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada

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


  const [nome, setNome] = useState("")
  const [sobrenome, setSobrenome] = useState("")
  const [isLogin, setIsLogin] = useState(true);


  function enviar() {
    alert(`Email: ${user.email}\nSenha: ${user.password}`)
    alert(`Email: ${user.email}\nSenha: ${user.password}`)
  }

  return ( // Aqui é html
    <main className="App">

      <div className="fundoCadastro">
        <div className="card">
          {!isLogin && (
            <form className="register">

              <label>
                Nome <br />
                <input type="text" placeholder="Nome" /><br />
              </label>
              <label>
                Sobrenome <br />
                <input type="text" placeholder="Sobrenome" /><br />
              </label>
              <label>
                Data de Nascimento <br />
                <input type="date" placeholder="Data Nascimento" /><br />
              </label>
              <label>
                CPF <br />
                <input type="text" placeholder="CPF" /><br />
              </label>
              <label>
                Telefone <br />
                <input type="tel" placeholder="Telefone" /><br />
              </label>
              <label>
                Email <br />
                <input type="email" placeholder="E-mail" /><br />
              </label>
              <label>
                Senha <br />
                <input type="password" placeholder="Senha" /><br />
              </label>
              <label>
                Confirmar Senha <br />
                <input type="password" placeholder="Confirmar Senha" /><br />
              </label>
              <button className="buttonSuccess" onClick={() => enviar()}>CADASTRAR</button>
            
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

              <button className="buttonSuccess" onClick={() => enviar()}>ENTRAR</button>
            </form>
          )}

          <a className="alterarLoginCadastro" onClick={() => setIsLogin(!isLogin)}>
            {isLogin && ("Cadastre-se")}
            {!isLogin && ("Voltar para o login")}
          </a>

        </div>
      </div>
    </main>
  );
}

export default App;
