import React, { useState } from 'react';
import { User, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';

interface DadosUsuario {
  primeiroNome: string;
  ultimoNome: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  senha: string;
}

export default function Configuracoes() {
  // TODO: substituir pelos dados reais do usuário logado (api.get('/usuario/perfil'))
  const [dados, setDados] = useState<DadosUsuario>({
    primeiroNome: '',
    ultimoNome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    senha: '',
  });

  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: 'sucesso' | 'erro'; texto: string } | null>(null);

  const handleChange = (campo: keyof DadosUsuario) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDados(prev => ({ ...prev, [campo]: e.target.value }));
    setMensagem(null);
  };

  const handleSalvar = async () => {
    setSalvando(true);
    try {
      // TODO: chamar api.put('/usuario/perfil', dados)
      await new Promise(resolve => setTimeout(resolve, 800)); // simulação
      setMensagem({ tipo: 'sucesso', texto: 'Dados salvos com sucesso!' });
    } catch {
      setMensagem({ tipo: 'erro', texto: 'Erro ao salvar. Tente novamente.' });
    } finally {
      setSalvando(false);
    }
  };

  const handleCancelar = () => {
    // TODO: navegar para a tela anterior ou resetar campos
    window.history.back();
  };

  const campo = (
    label: string,
    campo: keyof DadosUsuario,
    tipo: string = 'text',
    className: string = ''
  ) => (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={tipo}
        value={dados[campo]}
        onChange={handleChange(campo)}
        className="border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1F3A66]/30 focus:border-[#1F3A66] transition-all"
      />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-gray-700">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <Logo />
        <button className="bg-[#F27420] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#d65f15] transition-colors flex items-center gap-2">
          <User className="w-4 h-4" />
          Minha Conta
        </button>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-[900px] w-full mx-auto p-8">

        {/* BOTÃO VOLTAR */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleCancelar}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1F3A66] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Configurações</h1>

        {/* FORMULÁRIO */}
        <div className="flex flex-col gap-5">

          {/* Linha 1: Nome */}
          <div className="grid grid-cols-2 gap-5">
            {campo('Primeiro nome', 'primeiroNome')}
            {campo('Último nome', 'ultimoNome')}
          </div>

          {/* Linha 2: Email / Telefone */}
          <div className="grid grid-cols-2 gap-5">
            {campo('Email', 'email', 'email')}
            {campo('Número de Telefone', 'telefone', 'tel')}
          </div>

          {/* Linha 3: Endereço / Cidade / Estado */}
          <div className="grid grid-cols-3 gap-5">
            {campo('Endereço', 'endereco')}
            {campo('Cidade', 'cidade')}
            {campo('Estado/Distrito/Região', 'estado')}
          </div>

          {/* Linha 4: CEP */}
          <div className="grid grid-cols-3 gap-5">
            {campo('CEP/Código Postal', 'cep', 'text', 'col-span-1')}
          </div>

          {/* Linha 5: Senha */}
          <div className="grid grid-cols-3 gap-5">
            {campo('Senha', 'senha', 'password', 'col-span-1')}
          </div>

          {/* Links de ação */}
          <div className="flex gap-6">
            <button className="text-sm text-[#1F3A66] font-semibold hover:underline transition-colors">
              Redefina sua senha
            </button>
            <button className="text-sm text-red-500 font-semibold hover:underline transition-colors">
              Encerre sua conta
            </button>
          </div>

          <hr className="border-gray-200" />

          {/* BARRA DE CONFIRMAÇÃO */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-600">
              Clique em <strong>"Salvar"</strong> para confirmar as alterações:
            </p>
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold text-sm px-6 py-2 rounded-md transition-colors"
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={handleCancelar}
              className="text-sm text-[#1F3A66] font-semibold hover:underline transition-colors"
            >
              Cancelar
            </button>
          </div>

          {/* FEEDBACK */}
          {mensagem && (
            <p
              className={`text-sm font-medium ${
                mensagem.tipo === 'sucesso' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {mensagem.texto}
            </p>
          )}

        </div>
      </main>
    </div>
  );
}