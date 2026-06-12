import { useState } from "react";

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

function GestaoAgendamentos() {
  const [busca, setBusca] = useState("");
  const [aba, setAba] = useState<"roteiros" | "agendamentos" | "historico">("agendamentos");
  const [detalhe, setDetalhe] = useState<Reserva | null>(null);

  const filtrados = items.filter(
    (i) =>
      i.nome.toLowerCase().includes(busca.toLowerCase()) ||
      i.roteiro.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-gray-100">
      <header className="flex items-center justify-between px-7 py-3.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div
            className="w-[38px] h-[38px] bg-orange-500 text-white rounded-full rounded-bl-none rotate-[-45deg] grid place-items-center"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-45">
              <path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </div>
          <span className="text-[26px] font-extrabold text-orange-500 tracking-tight">GoGuia</span>
        </div>
        <button className="inline-flex items-center gap-2 bg-orange-500 text-white border-0 rounded-full px-[22px] py-2.5 font-semibold text-[15px] cursor-pointer hover:bg-orange-600">
          <span className="w-[26px] h-[26px] rounded-full bg-white/25 grid place-items-center" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
            </svg>
          </span>
          Minha Conta
        </button>
      </header>

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
          {aba !== "agendamentos" && (
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
          )}

          {aba === "agendamentos" ? (
            detalhe ? (
              <Detalhes reserva={detalhe} onVoltar={() => setDetalhe(null)} />
            ) : (
              <Agendamentos onVerDetalhes={(r) => setDetalhe(r)} />
            )
          ) : (
          <ul className="list-none m-0 p-0 flex flex-col gap-4">
            {filtrados.map((item) => (
              <li key={item.id} className="grid grid-cols-[140px_1fr_auto] items-center gap-5 bg-white border border-gray-200 rounded-xl p-2.5 shadow-sm max-md:grid-cols-1">
                <img src={"https://praiasdobrasil.com.br/wp-content/uploads/2019/04/pontal-do-ipiranga-espirito-santo-por-FolhaVit%C3%B3ria-1024x555.jpg"} alt={item.roteiro} className="w-[140px] h-[100px] object-cover rounded-lg block max-md:w-full max-md:h-40" loading="lazy" width={1024} height={1024} />
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
          )}
        </main>
      </div>
    </div>
  );
}

type ReservaStatus = "Pendente" | "Negado" | "Marcado";
interface Reserva {
  id: number;
  quando: string;
  roteiro: string;
  cliente: string;
  extras: string;
  total: string;
  status: ReservaStatus;
}

const reservas: Reserva[] = [
  { id: 1, quando: "Hoje - 16:30", roteiro: "Catedral da Fé", cliente: "João Silva", extras: "+ 2 pessoas", total: "R$ 300,00", status: "Pendente" },
  { id: 2, quando: "Amanhã - 07:30", roteiro: "Catedral da Fé", cliente: "Wexley Silva", extras: "+ 1 pessoas", total: "R$ 220,00", status: "Negado" },
  { id: 3, quando: "Hoje - 19:00", roteiro: "Catedral da Fé", cliente: "Carlos Alberto", extras: "", total: "R$ 110,00", status: "Marcado" },
];

function Agendamentos({ onVerDetalhes }: { onVerDetalhes: (r: Reserva) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-5 inline-block border-b-2 border-gray-300 pb-1">
        Proximas Reservas
      </h2>
      <div className="grid grid-cols-[1fr_1fr_260px] gap-5 items-start max-lg:grid-cols-1">
        <div className="grid grid-cols-2 gap-5 col-span-2 max-md:grid-cols-1">
          {reservas.map((r) => (
            <ReservaCard key={r.id} reserva={r} onVerDetalhes={() => onVerDetalhes(r)} />
          ))}
        </div>
        <aside className="bg-[#14264a] text-white rounded-xl p-5 border border-[#0e1c3a]">
          <h3 className="text-base font-bold mb-4">Resumo da Semana</h3>
          <p className="text-sm mb-3">Total Reservas:<br /><span className="text-base font-semibold">3</span></p>
          <p className="text-sm">Faturamento Previsto:<br /><span className="text-base font-semibold">R$ 630,00</span></p>
        </aside>
      </div>
    </div>
  );
}

function ReservaCard({ reserva, onVerDetalhes }: { reserva: Reserva; onVerDetalhes: () => void }) {
  const badge =
    reserva.status === "Pendente"
      ? "bg-amber-400 text-gray-900"
      : reserva.status === "Negado"
      ? "bg-red-500/20 text-red-300 border border-red-500"
      : "bg-green-500 text-white";
  return (
    <div className="bg-[#14264a] text-white rounded-xl p-4 border border-[#0e1c3a] relative">
      <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${badge}`}>
        {reserva.status}
      </span>
      <p className="font-bold text-[15px]">{reserva.quando}</p>
      <p className="font-bold text-[15px] mb-2">{reserva.roteiro}</p>
      <div className="flex items-center gap-2 mb-3">
        <img src={"https://praiasdobrasil.com.br/wp-content/uploads/2019/04/pontal-do-ipiranga-espirito-santo-por-FolhaVit%C3%B3ria-1024x555.jpg"} alt="" className="w-8 h-8 rounded-full object-cover" />
        <div className="text-sm">
          <span className="text-amber-400">★★★★★</span>
          <div>{reserva.cliente}{reserva.extras && <span className="text-white/80"> {reserva.extras}</span>}</div>
        </div>
      </div>
      <p className="text-sm font-semibold mb-3">Total: {reserva.total}</p>
      <div className="flex gap-2">
        <button onClick={onVerDetalhes} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded px-3 py-2">Ver Detalhes</button>
        <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded px-3 py-2">Mensagem</button>
      </div>
    </div>
  );
}

function Detalhes({ reserva, onVoltar }: { reserva: Reserva; onVoltar: () => void }) {
  return (
    <div>
      <button onClick={onVoltar} className="text-[#14264a] font-semibold mb-4 inline-flex items-center gap-1 hover:underline">
        ← Voltar
      </button>
      <div className="grid grid-cols-[1fr_320px] gap-5 items-start max-lg:grid-cols-1">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-[#14264a] text-white p-5">
            <h2 className="text-2xl font-bold mb-3">Detalhes da reserva</h2>
            <div className="flex items-center gap-3 mb-3">
              <img src={"https://praiasdobrasil.com.br/wp-content/uploads/2019/04/pontal-do-ipiranga-espirito-santo-por-FolhaVit%C3%B3ria-1024x555.jpg"} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="text-amber-400 text-sm">★★★★★</div>
                <div className="text-sm">{reserva.cliente} {reserva.extras}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-9 h-9 rounded-full bg-white/15 grid place-items-center">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
              </span>
              <div>
                <div className="font-semibold">{reserva.quando}</div>
                <div className="text-white/80">Praia Ipiranga</div>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4 text-sm">
            <Linha icone={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>} label="Data" valor="Hoje, 27 de Maio de 2026" />
            <Linha icone={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>} label="Horario" valor="16 : 00" />
            <Linha icone={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>} label="Local" valor={<><div className="font-semibold text-gray-900">Praia Ipiranga</div><div className="text-gray-500">Rua das Flores, Avenida Paulista</div></>} />
            <Linha icone={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/></svg>} label="Participantes" valor={<><div className="font-semibold text-gray-900">3 Pessoas</div><div className="text-gray-500">{reserva.cliente} {reserva.extras}</div></>} />
            <Linha icone={<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>} label="Cliente" valor={<div className="flex items-center gap-2"><img src={"https://praiasdobrasil.com.br/wp-content/uploads/2019/04/pontal-do-ipiranga-espirito-santo-por-FolhaVit%C3%B3ria-1024x555.jpg"} alt="" className="w-7 h-7 rounded-full object-cover"/><span className="font-semibold text-gray-900">Carlos Eduardo</span></div>} />
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-700">Total da reserva</span>
              <span className="font-bold text-gray-900">{reserva.total}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button className="border-2 border-orange-500 text-orange-500 font-semibold rounded-md py-2 hover:bg-orange-50">Negar</button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-2">Aceitar</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Painel titulo="Sobre a Experiência" icone="i">
            <p className="text-sm text-gray-600 mb-3">Um momento de fé, história e arquitetura. Conheça os detalhes da Catedral da Fé, um dos marcos mais impressionantes da cidade, em uma visita guiada cheia de significado.</p>
            <div className="flex gap-4 text-xs text-gray-700">
              <Mini label="Duração" valor="1h 30" />
              <Mini label="Tamanho grupo" valor="Até 10 pessoas" />
              <Mini label="Idioma" valor="português" />
            </div>
          </Painel>
          <Painel titulo="O que está incluso" icone="✓">
            <ul className="text-sm text-gray-700 space-y-1.5">
              <li>✓ Guia Credenciado</li>
              <li>✓ Material informativo digital</li>
              <li>✓ Material de excursão</li>
            </ul>
          </Painel>
          <Painel titulo="Política de Cancelamento" icone="✓">
            <ul className="text-sm text-gray-700 space-y-1.5 list-disc pl-5">
              <li>Cancelamentos com até 24h de antecedência: reembolso total</li>
              <li>Cancelamentos com menos de 24h: não há reembolso</li>
              <li>Em caso de chuva forte, pode ser remarcada</li>
            </ul>
          </Painel>
        </div>
      </div>

      <div className="mt-5 bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[#14264a] text-white grid place-items-center">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 12v5a2 2 0 0 0 2 2h2v-6H4"/></svg>
          </span>
          <div>
            <div className="font-bold text-gray-900">Comunicação com cliente</div>
            <div className="text-xs text-gray-600">Fale com o cliente para dúvidas ou alterações na sua reserva.</div>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 font-semibold rounded-md px-5 py-2 hover:bg-orange-100">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Chat
        </button>
      </div>
    </div>
  );
}

function Linha({ icone, label, valor }: { icone: React.ReactNode; label: string; valor: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 items-start">
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-gray-500">{icone}</span>
        <span className="font-semibold">{label}</span>
      </div>
      <div className="text-gray-800">{valor}</div>
    </div>
  );
}

function Painel({ titulo, icone, children }: { titulo: string; icone: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 grid place-items-center text-sm font-bold">{icone}</span>
        <h3 className="font-bold text-gray-900">{titulo}</h3>
      </div>
      {children}
    </div>
  );
}

function Mini({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-800">{valor}</div>
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


export default GestaoAgendamentos;