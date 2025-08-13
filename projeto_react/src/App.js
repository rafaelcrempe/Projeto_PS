import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

  let email = ""
  let senha = ""

  function mudarEmail(valor) {
    email = valor
  }

  function mudarSenha(valor) {
    senha = valor
  }

  function enviar() {
    alert(`Email: ${email}\nSenha: ${senha}`)
  }


  let isLogin = true;

  return ( // Aqui é html
    <main className="App">

    <button onClick={() => {isLogin = !isLogin}}>
      {isLogin && ("Cadastre-se")}
      {!isLogin && ("Voltar para o login")}
    </button>

      {!isLogin &&(
        <form className="register">
           <input type="text" placeholder="Nome"/><br/>
            <input type="text" placeholder="Sobrenome"/><br/>
            <input type="date" placeholder="Data Nascimento"/><br/>
            <input type="text" placeholder="CPF"/><br/>
            <input type="tel" placeholder="Telefone"/><br/>
            <input type="email" placeholder="E-mail"/><br/>
            <input type="password" placeholder="Senha"/><br/>
            <input type="password" placeholder="Confirmar Senha"/><br/>
        </form>
      )}

      {isLogin && (
        <form className="login">
          <label>
            Email: <input name="Email" type="email" placeholder="Digite o seu email" onChange={(e) => mudarEmail(e.target.value)} /><br />
          </label>
          <label>
            Senha: <input name="Senha" type="password" placeholder="Digite a sua senha" onChange={(e) => mudarSenha(e.target.value)} /><br />
          </label>

          <button className="buttonSuccess" onClick={() => enviar()}>Entrar!</button>
        </form>
      )}


    </main>
  );
}

export default App;
