import logo from './logo.svg';
import './App.css';

function App() {  // aqui é java script
  
  // faça uma lista com todos os numeros  até 10
  // mas exiba apenas os números impares

  let lista = [0,1,2,3,4,5,6,7,8,9,10] 
  let impares = []

  for(let i = 0; i < lista.length; i++){
    if(lista[i] % 2 != 0) {
      impares.push(lista[i])
    }
    

  }
  return ( /* aqui é  html */
    <main className="App">
      
    {impares}

      
    </main>
  );
}

export default App;
