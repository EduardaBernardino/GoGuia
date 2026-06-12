import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';

import EsqueciSenha from './pages/EsqueciSenha';

import ConfirmacaoEmail from './pages/Confirmacaoemail';

import Home from './pages/home';

import TelaAvaliacao from './pages/TelaAvaliacao';

import Agendamentos from './pages/Agendamentos';

import Pagamento from './pages/Pagamento';

import MeusRoteiros from './pages/MeusRoteiros';

import Favoritos from './pages/Favoritos';

import Configuracoes from './pages/Configuracoes';





function App() {

  return (

     <BrowserRouter>

      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        <Route path="/confirmacao-email" element={<ConfirmacaoEmail />} />



        <Route path="/home" element={<Home />} />

 {/* <Route path="/home/tela-avaliacao" element={<TelaAvaliacao />} />

        <Route path="/home/tela-avaliacao/detalhes" element={<Agendamentos />} />

        <Route path="/home/pagamento" element={<Pagamento />} /> */}



       <Route path="/home/pagamento" element={<Pagamento />} />



        <Route path="/meus-roteiros" element={<MeusRoteiros />} />

        <Route path="/favoritos" element={<Favoritos />} />

        <Route path="/configuracoes" element={<Configuracoes />} />

     </Routes>

 </BrowserRouter>

 );

}



export default App;