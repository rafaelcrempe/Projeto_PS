// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom'

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


function ProfileEdit() {

    const { id } = useParams()
    const nav = useNavigate();

    const [user, setUser] = useState({
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

    useEffect(() => {
        showUser(id)
    }, [])


    async function showUser(id) {

        let { data: dataUser, error } = await supabase
            .from('users')
            .select('*')
            .eq('auth_id', id)
            .single();

        console.log(dataUser)
        setUser(dataUser);

    }
async function updateProfile(){

    const {data: dataUser, error: errorUser} = await supabase.auth.getUser();
    const uid = dataUser?.user?.id;
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
      .update(senduser)
      .eq('auth_id', uid);

      nav(`/profile/${id}`)

}

    return (
        <div className='card'>
            <label>
                Nome <br />
                <input type="text" placeholder="Nome" onChange={(e) => setUser({ ...user, name: e.target.value })} /><br />
            </label>
            <label>
                Sobrenome <br />
                <input type="text" placeholder="Sobrenome" onChange={(e) => setUser({ ...user, last_name: e.target.value })} /><br />
            </label>
            <label>
                Telefone <br />
                <input type="tel" placeholder="Telefone" onChange={(e) => setUser({ ...user, phone: e.target.value })} /><br />
            </label>

            <label>
                Senha <br />
                <input type="password" placeholder="Senha" minLength={6} onChange={(e) => setUser({ ...user, password: e.target.value })} /><br />
            </label>
            <label>
                Confirmar Senha <br />
                <input type="password" placeholder="Confirmar Senha" minLength={6} /><br />
            </label>
            <button className="buttonSuccess" onClick={() => {updateProfile();}}>SALVAR</button>




        </div>
    );


}


export default ProfileEdit;
