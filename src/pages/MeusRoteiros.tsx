import React, { useState } from 'react';
import { User, MapPin, Clock, Users, DollarSign, Edit, Ban, Plus, Search, Home as HomeIcon, Bookmark, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

import imgCatedral from '../assets/Catedral_da_fe.webp';

interface Roteiro {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  capacidade: number;
  preco: number;
  imageUrl: string;
  ativo: boolean;
}

export default function MeusRoteiros() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState('');

  const [roteiros, setRoteiros] = useState<Roteiro[]>([
    { id: '1', titulo: 'Catedral da fé', descricao: 'Mergulho na fé, história e arquitetura da Catedral da Fé, um dos marcos mais impressionantes da cidade.', duracao: '1h', capacidade: 5, preco: 300, imageUrl: imgCatedral, ativo: true },
    { id: '2', titulo: 'Catedral da fé', descricao: 'Mergulho na fé, história e arquitetura da Catedral da Fé, um dos marcos mais impressionantes da cidade.', duracao: '1h', capacidade: 5, preco: 300, imageUrl: imgCatedral, ativo: true },
    { id: '3', titulo: 'Catedral da fé', descricao: 'Mergulho na fé, história e arquitetura da Catedral da Fé, um dos marcos mais impressionantes da cidade.', duracao: '1h', capacidade: 5, preco: 300, imageUrl: imgCatedral, ativo: true },
    { id: '4', titulo: 'Catedral da fé', descricao: 'Mergulho na fé, história e arquitetura da Catedral da Fé, um dos marcos mais impressionantes da cidade.', duracao: '1h', capacidade: 5, preco: 300, imageUrl: imgCatedral, ativo: false },
  ]);

  const handleDesabilitar = (id: string) => {
    setRoteiros(prev => prev.map(r => r.id === id ? { ...r, ativo: !r.ativo } : r));
  };

  const roteirosFiltrados = roteiros.filter(r =>
    r.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f6] font-sans text-gray-700">

      <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <Logo />

        <nav className="flex items-center gap-6 text-[#1F3A66]">
          <button onClick={() => navigate('/home')} className="hover:text-[#F27420] transition-colors">
            <HomeIcon className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('/favoritos')} className="hover:text-[#F27420] transition-colors">
            <Bookmark className="w-6 h-6" />
          </button>
          <button className="text-[#F27420]">
            <List className="w-6 h-6" />
          </button>
        </nav>

        <button
          onClick={() => navigate('/configuracoes')}
          className="bg-[#F27420] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#d65f15] transition-colors flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Minha Conta
        </button>
      </header>

      <div className="flex flex-1 max-w-[1300px] w-full mx-auto p-6 gap-8">

        <aside className="w-[220px] flex-shrink-0 bg-[#1F3A66] rounded-xl p-4 flex flex-col gap-1 h-fit">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3 px-2">Painel Guia</p>
          {[
            { label: 'Meus Roteiros', icon: MapPin, rota: '/meus-roteiros', ativo: true },
            { label: 'Agendamentos', icon: Clock, rota: '/agendamentos', ativo: false },
            { label: 'Histórico', icon: Users, rota: '/historico', ativo: false },
          ].map(({ label, icon: Icon, rota, ativo }) => (
            <button
              key={label}
              onClick={() => navigate(rota)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${ativo ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </aside>

        <main className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <input
                type="text"
                value={busca}
                onChange={e => setBusca(e.target.value)}
                placeholder="Buscar ..."
                className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />
              <button className="px-4 py-2.5 text-gray-400 hover:text-[#1F3A66] transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
            <button className="bg-[#F27420] hover:bg-[#d65f15] text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" />
              Criar Roteiro
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {roteirosFiltrados.map(roteiro => (
              <div
                key={roteiro.id}
                className={`bg-white border rounded-xl overflow-hidden shadow-sm flex gap-4 p-4 transition-opacity ${roteiro.ativo ? 'border-gray-200 opacity-100' : 'border-gray-200 opacity-60'}`}
              >
                <div className="w-[160px] h-[110px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={roteiro.imageUrl} alt={roteiro.titulo} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 truncate">{roteiro.titulo}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{roteiro.descricao}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium"><Clock className="w-3.5 h-3.5" /> {roteiro.duracao}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-500 font-medium"><Users className="w-3.5 h-3.5" /> {roteiro.capacidade} pessoas</span>
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600"><DollarSign className="w-3.5 h-3.5" /> R$ {roteiro.preco}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 justify-center flex-shrink-0 w-[130px]">
                  <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 text-xs font-semibold px-3 py-2 rounded-md hover:bg-gray-50 transition-colors">
                    <Edit className="w-3.5 h-3.5" /> Editar
                  </button>
                  <button
                    onClick={() => handleDesabilitar(roteiro.id)}
                    className="flex items-center justify-center gap-2 border border-red-200 text-red-500 text-xs font-semibold px-3 py-2 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    {roteiro.ativo ? 'Desabilitar' : 'Habilitar'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}