import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() { // aqui é JavaScript

  const [user, setUser] = useState({
    email: "",
    password: "",
    phone: "",
    name: "",
    last_name: "",
    birth: "",
    cpf: ""


  });

 
  const [isLogin, setIsLogin] = useState(true)


  function enviar() {
    alert(`Email: ${user.email}\nSenha: ${user.password}`)
  }


  // let isLogin = true;

  return ( // Aqui é html
    <main className="App">

    <button onClick={() => setIsLogin(!isLogin)}>
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
            Email: <input name="Email" type="email" placeholder="Digite o seu email" onChange={(e) => setUser({...user, email: e.target.value})} /><br />
          </label>
          <label>
            Senha: <input name="Senha" type="password" placeholder="Digite a sua senha" onChange={(e) => setUser({...user, password: e.target.value})} /><br />
          </label>

          <button className="buttonSuccess" onClick={() => enviar()}>Entrar!</button>
        </form>
      )}


    </main>
  );
}

export default App;
