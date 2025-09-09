// import logo from './logo.svg';
// import './App.css';
import { useState } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from 'react-router-dom';
import { Input } from '../../Components/Input'
import { Select } from '../../Components/Select';
import { Form } from '../../Components/Form';
import Footer from '../../Components/Footer';


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
    funcao: "cliente",
    last_name: "",
    birth: "",
    cpf: "",
    url: ""
  });


  // const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [isProfessional, setIsProfessional] = useState(false);
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
        5000
      )

      window.location.reload();

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
        auth_id: uid,
        funcao: user.funcao
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

  function verifyPass(pass) {
    return user.password.includes(pass)
  }

  return ( // Aqui é html
    <>
    <div className="screen">
      <div className="fundoCadastro">
        <div className="backgroundScreen">

          {!isLogin &&
            (<div className='tipoCadastro'>
              <h2>QUERO ME CADASTRAR COMO:  </h2>
              <div className='formDisplay'>
                <button className={isProfessional ? 'inactive' : 'buttonBase'} onClick={() => {
                  setIsProfessional(false);
                  setUser({ ...user, funcao: "cliente" })
                }}><i class="fa-solid fa-user" /> CLIENTE</button>
                <button className={isProfessional ? 'buttonBase' : 'inactive'} onClick={() => setIsProfessional(true)}> <i class="fa-solid fa-screwdriver-wrench" /> PROFISSIONAL</button>
              </div>
            </div>
            )
          }

          {!isLogin && isProfessional && (
            <Form func={register}>

              <div style={{display: 'flex', justifyContent:'center', width: '100%'}}>
                <Select
                  label="Escolha sua especialidade"
                  name="funcao"
                  placeholder="Função"
                  onChange={setUser}
                  objeto={user}
                  campo="funcao"
                  options={[
                    { value: 'pedreiro', label: 'Pedreiro' },
                    { value: 'encanador', label: 'Encanador' },
                    { value: 'pintor', label: 'Pintor' },
                    { value: 'eletricista', label: 'Eletricista' },
                    { value: 'marceneiro', label: 'Marceneiro' },
                  ]}
                />
              </div>
              <div className='formDisplay'>
                <Input
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  onChange={setUser}
                  objeto={user}
                  campo="name"
                />

                <Input
                  label="Sobrenome"
                  type="text"
                  placeholder="Sobrenome"
                  onChange={setUser}
                  objeto={user}
                  campo='last_name' />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Data de Nascimento"
                  type="date"
                  placeholder="Data de Nascimento"
                  onChange={setUser}
                  objeto={user}
                  campo='birth' />

                <Input
                  label="CPF"
                  type="text"
                  placeholder="CPF"
                  onChange={setUser}
                  objeto={user}
                  campo='cpf' />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Telefone"
                  type="tel"
                  placeholder="Telefone"
                  onChange={setUser}
                  objeto={user}
                  campo='phone' />

                <Input
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  onChange={setUser}
                  objeto={user}
                  campo='email'
                />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="Senha"
                  onChange={setUser}
                  objeto={user}
                  campo='password'
                />

                <label>
                  Confirmar Senha: <br />
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    onChange={(e) => verifyPass(e.target.value)}
                  />
                </label>
              </div>
              <br />

            </Form>
          )}

          {!isLogin && !isProfessional && (
            <Form func={register}>

              <div className='formDisplay'>
                <Input
                  label="Nome"
                  type="text"
                  placeholder="Nome"
                  onChange={setUser}
                  objeto={user}
                  campo="name"
                />

                <Input
                  label="Sobrenome"
                  type="text"
                  placeholder="Sobrenome"
                  onChange={setUser}
                  objeto={user}
                  campo='last_name' />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Data de Nascimento"
                  type="date"
                  placeholder="Data de Nascimento"
                  onChange={setUser}
                  objeto={user}
                  campo='birth' />

                <Input
                  label="CPF"
                  type="text"
                  placeholder="CPF"
                  onChange={setUser}
                  objeto={user}
                  campo='cpf' />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Telefone"
                  type="tel"
                  placeholder="Telefone"
                  onChange={setUser}
                  objeto={user}
                  campo='phone' />

                <Input
                  label="E-mail"
                  type="email"
                  placeholder="E-mail"
                  onChange={setUser}
                  objeto={user}
                  campo='email'
                />
              </div>

              <div className='formDisplay'>
                <Input
                  label="Senha"
                  type="password"
                  placeholder="Senha"
                  onChange={setUser}
                  objeto={user}
                  campo='password'
                />

                <label>
                  Confirmar Senha: <br />
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    onChange={(e) => verifyPass(e.target.value)}
                  />
                </label>
              </div>
              <br />

            </Form>
          )}

          {isLogin && (
            <Form func={logar} buttonText='LOGIN'>


              <Input
                label="Email"
                className="inputEmailLogin"
                name="Email" type="email"
                placeholder="Digite o seu email"
                onChange={setUser}
                objeto={user}
                campo='email' />


              <Input
                label="Senha"
                className="inputSenhaLogin"
                name="Senha" type="password"
                placeholder="Digite a sua senha"
                onChange={setUser}
                objeto={user}
                campo='password' />
            </Form>
          )}


          <a className="alterarLoginCadastro" onClick={() => setIsLogin(!isLogin)}>
            {isLogin && ("Cadastre-se")}
            {!isLogin && ("Voltar para o login")}
          </a>

        </div>
      </div>

      {msg && (<div className='toast'> {msg} </div>)}     {/* exibe a mensagem de erro na tela */}

    </div>
      <span>
      <Footer />
      </span>
 </>
  );
}

export default Auth;
