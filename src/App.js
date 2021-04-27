import Input from './components/Input/Input'
import Layout from "./components/Layout/Layout";

import './App.scss';

function App() {
  return (
    <div className="App">
      <Input
      sizeFile = '10'
      textInput = 'Перетащите сюда файл или нажмите чтобы выбрать'/>
      <Layout/>
    </div>
  );
}

export default App;
