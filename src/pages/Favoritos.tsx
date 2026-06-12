import React, { useState } from 'react';
import { User, Home as HomeIcon, Bookmark, List, MessageSquare, Star, X, Search, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

// Usando imagem local dos assets
import imgPanteao from '../assets/Excursao_Guiada.jpg';

interface Passeio {
  id: string;
  titulo: string;
  descricao: string;
  imageUrl: string;
}

const TITULO_PADRAO = 'Panteão Pátria Liberdade';
const DESCRICAO_PADRAO =
  'Um espaço moderno e imponente, marcado por uma arquitetura única com formas angulares e contemporâneas. Ideal para quem aprecia design inovador e busca um ponto turístico diferenciado, o local oferece uma experiência visual marcante e perfeita para fotos e momentos especiais.';

const FAVORITOS_INICIAIS: Passeio[] = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 1),
  titulo: TITULO_PADRAO,
  descricao: DESCRICAO_PADRAO,
  imageUrl: imgPanteao,
}));

function ModalBusca({ onClose, onAdicionar }: { onClose: () => void; onAdicionar: (p: Passeio) => void }) {
  const [busca, setBusca] = useState('');

  // TODO: substituir por api.get('/passeios?q=' + busca)
  const resultados: Passeio[] = Array.from({ length: 3 }, (_, i) => ({
    id: String(10 + i),
    titulo: TITULO_PADRAO,
    descricao: DESCRICAO_PADRAO,
    imageUrl: imgPanteao,
  })).filter(p => busca === '' || p.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[600px] shadow-2xl overflow-hidden">

        {/* BUSCA */}
        <div className="p-5 border-b border-gray-100 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center bg-[#1F3A66] rounded-lg overflow-hidden">
            <input
              type="text"
              value={busca}
              onChange={e => setBusca(e.target.value)}
              placeholder="Buscar pelo nome ou local . . ."
              className="flex-1 bg-transparent text-white placeholder-white/60 text-sm px-4 py-2.5 outline-none"
            />
            <button className="px-4 py-2.5 text-white/80 hover:text-white">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RESULTADOS — com descrição completa visível */}
        <div className="flex flex-col gap-3 p-5 max-h-[400px] overflow-y-auto">
          {resultados.map(passeio => (
            <div key={passeio.id} className="flex items-start gap-4 border-2 border-[#F27420] rounded-xl p-3">
              <img src={passeio.imageUrl} alt={passeio.titulo} className="w-16 h-16 rounded-full object-cover flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-900 mb-1">{passeio.titulo}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{passeio.descricao}</p>
              </div>
              <button
                onClick={() => { onAdicionar(passeio); onClose(); }}
                className="w-12 h-12 bg-[#F27420] rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-[#d65f15] transition-colors mt-1"
              >
                <Star className="w-5 h-5 text-white fill-white" />
              </button>
            </div>
          ))}
        </div>

        <div className="p-5 pt-0">
          <button onClick={onClose} className="w-full bg-[#F27420] hover:bg-[#d65f15] text-white font-bold py-3 rounded-xl text-sm transition-colors">
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Favoritos() {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [busca, setBusca] = useState('');
  const [favoritos, setFavoritos] = useState<Passeio[]>(FAVORITOS_INICIAIS);

  const handleDesfavoritar = (id: string) => {
    // TODO: api.delete(`/turista/favoritos/${id}`)
    setFavoritos(prev => prev.filter(f => f.id !== id));
  };

  const handleAdicionar = (passeio: Passeio) => {
    // TODO: api.post('/turista/favoritos', { passeioId: passeio.id })
    setFavoritos(prev => [...prev, { ...passeio, id: String(Date.now()) }]);
  };

  const favoritosFiltrados = favoritos.filter(f =>
    f.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f4f6] font-sans text-gray-700">

      {/* HEADER */}
      <header className="flex items-center justify-between px-8 py-3 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <Logo />
        <nav className="flex items-center gap-6 text-[#1F3A66]">
          {/* CASINHA — navega para /home */}
          <button onClick={() => navigate('/home')} className="hover:text-[#F27420] transition-colors">
            <HomeIcon className="w-6 h-6" />
          </button>
          {/* BOOKMARK — página atual, destaque laranja */}
          <button className="text-[#F27420]">
            <Bookmark className="w-6 h-6 fill-current" />
          </button>
          {/* LISTA — navega para /meus-roteiros */}
          <button onClick={() => navigate('/meus-roteiros')} className="hover:text-[#F27420] transition-colors">
            <List className="w-6 h-6" />
          </button>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-[#F27420] transition-colors">
            <MessageSquare className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate('/configuracoes')}
            className="bg-[#F27420] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#d65f15] transition-colors flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Minha Conta
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] w-full mx-auto p-6 flex flex-col gap-5">

        {/* BUSCA */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <input
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
            placeholder="Buscar favoritos..."
            className="flex-1 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
          <button className="bg-[#1F3A66] text-white font-bold text-xs px-6 py-2.5 hover:bg-[#152847] transition-colors">
            Buscar
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoritosFiltrados.map(favorito => (
            <div key={favorito.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex gap-3 items-start">
              <img src={favorito.imageUrl} alt={favorito.titulo} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {/* TÍTULO acima do texto */}
                <h3 className="text-sm font-bold text-gray-900 mb-1">{favorito.titulo}</h3>
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {favorito.descricao}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleDesfavoritar(favorito.id)}
                    className="text-xs font-semibold border border-gray-300 text-gray-600 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Desfavorita
                  </button>
                  <button
                    onClick={() => navigate('/roteiros')}
                    className="text-xs font-bold bg-[#F27420] text-white px-4 py-1.5 rounded-md hover:bg-[#d65f15] transition-colors flex-1"
                  >
                    Abrir
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* CARD ADICIONAR */}
          <button
            onClick={() => setModalAberto(true)}
            className="border-2 border-dashed border-[#F27420] rounded-xl p-6 flex flex-col items-center justify-center gap-2 text-[#F27420] hover:bg-orange-50 transition-colors min-h-[140px]"
          >
            <div className="w-10 h-10 rounded-full border-2 border-[#F27420] flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <span className="font-bold text-sm">Adicionar Favorito</span>
          </button>
        </div>
      </main>

      {modalAberto && <ModalBusca onClose={() => setModalAberto(false)} onAdicionar={handleAdicionar} />}
    </div>
  );
}