// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'; //useState permite criar variável, em parceria com função, que faz alterações na tela quando essa variável é alterada
//useEffect muda a tela quando entra ou atualiza a tela
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useParams } from 'react-router-dom'

const supabaseUrl = "https://wvljndxyaidxngxzfmyc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2bGpuZHh5YWlkeG5neHpmbXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNTA4NDUsImV4cCI6MjA2OTkyNjg0NX0.KYntjFPUrdxUWrSVdiE4XGmpSn_mRDrsZhEt3JukZB8"
const supabase = createClient(supabaseUrl, supabaseKey);


function Profile(){

    const {id} = useParams()

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

    useEffect(()=> {
        showUser(id)
    }, [])
    

    async function showUser(id){
        
        let { data: dataUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_id', id);

        setUser(dataUser);
        
    }

    const [services, setServices]= useState([]) // essa função useEfFect, serve, para quando entrar na tela, ja acontece!
    useEffect(()=> {
        readServices()
    }, [])
    async function readServices(){
        
        let { data: dataServices, error } = await supabase
        .from('services')
        .select('*')
        .eq('professional_id', id);

        setServices(dataServices);
        
    }

    const [images, setImages] = useState([])
    useEffect( () => {
        readImage()
    }, [] )
    async function readImage(){
        let { data: dataImages, error } = await supabase
        .from('images')
        .select('*')
        .eq('professional_id', id);

        setImages(dataImages);        
    }
    




    return(
    <div className='card'>
        <div> {/* User */}
            <img src={user.url}/>
            <h1>{user.name}</h1>
            <div className='row'>
                <p>{user.funcao}</p>
                <p><a url={"http://api.whatsapp/?phone="+user.phone}>{user.phone}</a></p>
            </div>
        </div>
        <div> {/* Services */}
        {services.map(
          s => (

            <div key={s.id}>

              
              
            {s.star}
            </div>

          )
      )}

        </div>
        <div> {/* Images */}
        {images.map(
          i => (
            <div key={i.id}>
            <img src={i.url}/>
            </div>
            
          )
        )}
        </div>
    </div>    
    );


}


export default Profile;
