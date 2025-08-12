import logo from './logo.svg';
import './App.css';

function App() {  // aqui é java script
  
  let cesta = ['pao', 'suco', 'chocolate', 'torrada']
  let desenha = [];

  // declara o indice; compara se é para continuar; incrementa o indice 
  for( let i=0;  i<3; i++ ){
      desenha.push(<p>{ cesta[i]} </p>)
  }
  

  return ( /* aqui é  html */
    <main className="App">
      
     {/* {cesta.join( ', ')} */}
     
      {/* {cesta} */}

      {cesta[2]}

      
     
      
    </main>
  );
}

export default App;
