import logo from './logo.svg';
import './App.css';

function App() { // aqui é JavaScript

  let cesta = ['esfirra', 'pavê', 'pão de queijo', 'coca-cola'];
  
  let desenha = [];

    for(let i= 0; i < 3; i++  ){
      desenha.push(<p> {cesta[i]} </p>)
}

  return ( // Aqui é html
    <main className="App">
      {/* {cesta.join(', ')} */}
     {desenha}
    </main>
  );
}

export default App;
