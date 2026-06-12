import React from 'react';
import { User, MapPin, Home as HomeIcon, Bookmark, List, MessageSquare, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import imgVinicola from '../assets/Vinicola.jpg';
import imgCatedral from '../assets/Catedral_da_fe.webp';
import imgPanteao from '../assets/Excursao_Guiada.jpg';

export default function Home() {
  const navigate = useNavigate();

  const passeios = [
    { id: 1, titulo: 'Passeio Vinícola Brasília', autor: 'Marcelo Oliveira', nota: 4.9, img: imgVinicola },
    { id: 2, titulo: 'Catedral da fé', autor: 'Samuel Dantas', nota: 5.0, img: imgCatedral },
    { id: 3, titulo: 'Panteão Pátria Liberdade', autor: 'Laura Dias', nota: 4.9, img: imgPanteao },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="w-full p-4 border-b flex flex-wrap items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 text-orange-500">
          <div className="relative">
            <MapPin size={36} className="fill-current" />
            <User size={18} className="absolute top-1.5 left-2 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GoGuia</h1>
        </div>

        {/* Ícones de Navegação Central */}
        <nav className="flex items-center gap-6 text-indigo-900">
          <button onClick={() => navigate('/home')} className="hover:text-orange-500 transition-colors">
            <HomeIcon size={28} />
          </button>
          <button onClick={() => navigate('/favoritos')} className="hover:text-orange-500 transition-colors">
            <Bookmark size={28} />
          </button>
          <button onClick={() => navigate('/meus-roteiros')} className="hover:text-orange-500 transition-colors">
            <List size={28} />
          </button>
        </nav>

        {/* Ações da Direita */}
        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-orange-500 transition-colors">
            <MessageSquare size={28} />
          </button>
          <button
            onClick={() => navigate('/configuracoes')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-colors"
          >
            <User size={20} />
            Minha Conta
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto p-8 mt-4">
        <h2 className="text-4xl font-extrabold text-black mb-8">Aonde voce quer ir ?</h2>

        <div className="mb-12">
          <h3 className="text-2xl font-extrabold text-black leading-snug">
            Bem vindos ao GoGuia !<br />
            Aqui você encontra os melhores guias da Região para passeios<br />
            turísticos e afins etc e tals
          </h3>
        </div>

        <div>
          <h4 className="text-xl font-bold text-black">Você pode gostar</h4>
          <p className="text-sm text-gray-600 mb-6">Bem avaliados</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {passeios.map((passeio) => (
              <div key={passeio.id} className="flex flex-col group cursor-pointer">
                <div className="w-full h-48 bg-gray-300 rounded-2xl relative mb-3 overflow-hidden">
                  <img src={passeio.img} alt={passeio.titulo} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform">
                    <Heart size={20} className="text-gray-500" />
                  </button>
                </div>
                <h5 className="font-bold text-sm text-center mb-1">{passeio.titulo}</h5>
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] text-gray-600 font-medium">{passeio.autor}</span>
                  <div className="flex items-center gap-1 text-[10px] font-bold">
                    {passeio.nota}
                    <Star size={10} className="text-orange-400 fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}