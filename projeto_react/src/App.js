import logo from './logo.svg';
import './App.css';

function App() {

  let lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  let lista_impar = []

  for (let i = 0; i < lista.length; i++) {
    if (lista[i] % 2 != 0) {
      lista_impar.push(lista[i])
    }

  }

  return (
    <main className="App">
      {lista_impar.join(', ')}
    </main>
  );
}

export default App;
