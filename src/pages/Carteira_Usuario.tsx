import React from 'react';
import {
  CreditCard,
  Gift,
  Coins,
  Ticket,
  Calendar,
  MapPin,
  CheckCircle2,
  Wallet
} from 'lucide-react';

// IMPORTAÇÃO DA SUA LOGO (Ajuste o caminho se necessário)
import Logo from '../components/Logo';

// Tipagem para as próximas reservas do usuário
interface Reservation {
  id: string;
  tourName: string;
  date: string;
  status: 'Confirmado' | 'Pago';
}

export const CarteiraUsuario: React.FC = () => {

  // Dados fictícios do Usuário (Turista)
  const userFinancialData = {
    totalPayments: 1540.00,
    promoCredits: 50.00,
    cashbackAccumulated: 32.40,
    availableVouchers: 2
  };

  // Histórico de próximas reservas fornecido
  const nextReservations: Reservation[] = [
    { id: '1', tourName: 'City Tour Brasília', date: '20/06/2026', status: 'Confirmado' },
    { id: '2', tourName: 'Chapada dos Veadeiros', date: '05/07/2026', status: 'Pago' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* HEADER DA PLATAFORMA (Igual ao do Guia) */}
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="text-sm font-medium text-gray-600">Painel do Turista</div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* TÍTULO DA PÁGINA */}
        <div className="flex items-center gap-3">
          <Wallet className="w-8 h-8 text-[#f37021]" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Minha Carteira</h1>
        </div>

        {/* 1. CARDS DE SALDO E BENEFÍCIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Pagamentos Realizados (Destaque em Laranja igual ao layout) */}
          <div className="bg-[#f37021] text-white p-6 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
            <p className="text-sm font-medium opacity-90">Pagamentos Realizados</p>
            <p className="text-3xl font-bold">R$ {userFinancialData.totalPayments.toFixed(2)}</p>
            <div className="absolute right-4 bottom-4 opacity-10">
              <CreditCard className="w-24 h-24" />
            </div>
          </div>

          {/* Créditos Promocionais */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Créditos Promocionais</span>
              <Gift className="w-5 h-5 text-[#f37021]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {userFinancialData.promoCredits.toFixed(2)}</p>
            <p className="text-xs text-green-600 font-medium">Expira em breve</p>
          </div>

          {/* Cashback Acumulado */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Cashback Acumulado</span>
              <Coins className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {userFinancialData.cashbackAccumulated.toFixed(2)}</p>
            <p className="text-xs text-gray-400">Saldo para usar no próximo passeio</p>
          </div>

          {/* Vouchers Disponíveis */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Vouchers Disponíveis</span>
              <Ticket className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{userFinancialData.availableVouchers}</p>
            <p className="text-xs text-gray-400">Cupons ativos na conta</p>
          </div>
        </div>

        {/* 2. ÁREA DE PRÓXIMAS RESERVAS DESTAQUE */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#f37021]" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">📅 Próximas Reservas</h2>
              <p className="text-xs text-gray-400">Passeios já adquiridos e confirmados para a sua viagem</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-6">Passeio</th>
                  <th className="py-3 px-6">Data</th>
                  <th className="py-3 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {nextReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#f37021] shrink-0" />
                      {reservation.tourName}
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{reservation.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                        reservation.status === 'Confirmado'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {reservation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};