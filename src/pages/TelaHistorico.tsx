import { Bookmark, HomeIcon, List, MapPin, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


type Status = "Concluido" | "Pendente" | "Cancelado";

interface Item {
  id: number;
  nome: string;
  roteiro: string;
  data: string;
  duracao: string;
  pessoas: number;
  status: Status;
  preco: number;
}

const items: Item[] = [
  { id: 1, nome: "João Pedro", roteiro: "Catedral da fé", data: "10/04/2026", duracao: "1h", pessoas: 5, status: "Concluido", preco: 300 },
  { id: 2, nome: "Amanda",     roteiro: "Catedral da fé", data: "18/04/2026", duracao: "1h", pessoas: 3, status: "Pendente",  preco: 180 },
  { id: 3, nome: "Caio",       roteiro: "Catedral da fé", data: "12/04/2026", duracao: "1h", pessoas: 5, status: "Cancelado", preco: 300 },
  { id: 4, nome: "Jordana",    roteiro: "Catedral da fé", data: "09/04/2026", duracao: "1h", pessoas: 2, status: "Concluido", preco: 120 },
];

function Header() {
  const navigate = useNavigate()
  return (
    <>
      <header className="w-full p-4 border-b flex flex-wrap items-center justify-between gap-4">
       
        <div className="flex items-center gap-2 text-orange-500">
          <div className="relative">
            <MapPin size={36} className="fill-current" />
            <User size={18} className="absolute top-1.5 left-2 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">GoGuia</h1>
        </div>

        <nav className="flex items-center gap-6 text-indigo-900">
          <button className="hover:text-orange-500 transition-colors" onClick={() => navigate("/home")}><HomeIcon size={28} /></button>
          <button className="hover:text-orange-500 transition-colors"><Bookmark size={28} /></button>
          <button className="hover:text-orange-500 transition-colors"><List size={28} /></button>
        </nav>

        <div className="flex items-center gap-6">
          <button className="text-gray-600 hover:text-orange-500 transition-colors">
            <MessageSquare size={28} />
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full flex items-center gap-2 transition-colors">
            <User size={20} />
            Minha Conta
          </button>
        </div>
      </header>
    </>
  );
}


function TelaHistorico() {
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<"roteiros" | "agendamentos" | "historico">("historico");

  const filtrados = items.filter(
    (i) =>
      i.nome.toLowerCase().includes(busca.toLowerCase()) ||
      i.roteiro.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-100">
      <Header />

      <div className="grid grid-cols-[240px_1fr] min-h-[calc(100vh-67px)] max-md:grid-cols-1">
        <aside className="bg-[#14264a] text-white pt-7">
          <h1 className="text-[22px] font-bold mb-6 px-6">Painel Guia</h1>
          <nav className="flex flex-col">
            <SidebarItem
              active={aba === "roteiros"}
              onClick={() => setAba("roteiros")}
              label="Meus Roteiros"
              icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" />
                  <path d="M9 4v14M15 6v14" />
                </svg>
              }
            />
            <SidebarItem
              active={aba === "agendamentos"}
              onClick={() => setAba("agendamentos")}
              label="Agendamentos"
              icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4M8 3v4M3 10h18" />
                </svg>
              }
            />
            <SidebarItem
              active={aba === "historico"}
              onClick={() => setAba("historico")}
              label="Histórico"
              icon={
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            />
          </nav>
        </aside>

        <main className="p-6 px-7">
          <div className="relative bg-white rounded-full border border-gray-200 px-[22px] py-3 flex items-center mb-5">
            <input
              type="text"
              placeholder="Buscar ..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="flex-1 border-0 outline-none text-[15px] bg-transparent text-gray-700 placeholder-gray-400"
            />
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </div>

          <ul className="list-none m-0 p-0 flex flex-col gap-4">
            {filtrados.map((item) => (
              <li key={item.id} className="grid grid-cols-[140px_1fr_auto] items-center gap-5 bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm max-md:grid-cols-1">
                <img src={"https://portalwp.s3.amazonaws.com/wp-content/uploads/2024/08/13115011/1688-04-01.jpg"} alt={item.roteiro} className="w-[140px] h-[100px] object-cover rounded-lg block max-md:w-full max-md:h-40" loading="lazy" width={1024} height={1024} />
                <div className="flex flex-col gap-2.5">
                  <div>
                    <strong className="text-lg font-semibold text-gray-900 block">{item.nome}</strong>
                    <span className="text-base text-gray-800">{item.roteiro}</span>
                  </div>
                  <div className="flex gap-[18px] text-[13px] text-gray-500 flex-wrap">
                    <span className="inline-flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M16 3v4M8 3v4M3 10h18" />
                      </svg>
                      {item.data}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                      {item.duracao}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="8" r="3" />
                        <circle cx="17" cy="10" r="2.5" />
                        <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3.5 4-3.5s3 1 3 3.5" />
                      </svg>
                      {item.pessoas} pessoas
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2.5 pl-5 border-l border-gray-200 min-w-[170px] max-md:border-l-0 max-md:border-t max-md:pt-3 max-md:min-w-0 max-md:flex-row max-md:justify-between max-md:w-full max-md:pl-0">
                  <StatusBadge status={item.status} />
                  <span className="text-green-600 font-bold text-lg">R$ {item.preco}</span>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  active,
  onClick,
  label,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 bg-transparent border-0 text-left text-[15px] cursor-pointer relative px-6 py-3.5 transition-colors ${
        active
          ? "bg-white/[0.06] text-white before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-orange-500 before:rounded-r"
          : "text-white/85 hover:text-white"
      }`}
    >
      <span className={active ? "text-orange-500" : ""}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "Concluido")
    return (
      <span className="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-full text-white font-semibold text-sm min-w-[140px] justify-center bg-green-500">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="m5 12 5 5 9-11" />
        </svg>
        Concluido
      </span>
    );
  if (status === "Pendente")
    return (
      <span className="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-full font-semibold text-sm min-w-[140px] justify-center bg-amber-400 text-gray-900">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
        Pendente
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 px-[18px] py-2 rounded-full text-white font-semibold text-sm min-w-[140px] justify-center bg-red-500">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
      Cancelado
    </span>
  );
}

export default TelaHistorico;