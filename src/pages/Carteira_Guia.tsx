import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Calendar,
  DollarSign,
  Percent,
  CheckCircle2,
  ArrowUpRight,
  Wallet
} from 'lucide-react';

// 1. IMPORTAÇÃO DA SUA LOGO (Ajuste o caminho './Logo' se o arquivo estiver em outra pasta)
import Logo from '../components/Logo';

interface Withdrawal {
  id: string;
  date: string;
  amount: number;
  method: 'PIX' | 'Conta Bancária';
  status: 'Pendente' | 'Processando' | 'Concluído';
}

export const TourGuideWallet: React.FC = () => {
  const [withdrawalMethod, setWithdrawalMethod] = useState<'pix' | 'bank_account'>('pix');
  const [withdrawalValue, setWithdrawalValue] = useState('');

  const financialData = {
    availableBalance: 1250.00,
    pendingBalance: 450.00,
    monthlyEarnings: 3200.00,
    totalEarnings: 15400.00,
    platformFees: 320.00,
    netEarnings: 2880.00,
    nextPaymentDate: '18/06/2026'
  };

  const withdrawalHistory: Withdrawal[] = [
    { id: '1', date: '10/06/2026', amount: 850.00, method: 'PIX', status: 'Concluído' },
    { id: '2', date: '01/06/2026', amount: 1200.00, method: 'Conta Bancária', status: 'Concluído' },
    { id: '3', date: '12/06/2026', amount: 500.00, method: 'PIX', status: 'Processando' },
  ];

  const handleWithdrawRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitação de saque enviada!`);
    setWithdrawalValue('');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">

      {/* HEADER DA PLATAFORMA ATUALIZADO */}
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          {/* 2. SUA LOGO AQUI */}
          <Logo />
        </div>
        <div className="text-sm font-medium text-gray-600">Painel do Prestador</div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">

        {/* TÍTULO DA PÁGINA */}
        <div className="flex items-center gap-3">
          <Wallet className="w-8 h-8 text-[#f37021]" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Minha Carteira</h1>
        </div>

        {/* 1. VISÃO GERAL DE SALDOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#f37021] text-white p-6 rounded-2xl shadow-sm space-y-2 relative overflow-hidden">
            <p className="text-sm font-medium opacity-90">Saldo disponível para saque</p>
            <p className="text-3xl font-bold">R$ {financialData.availableBalance.toFixed(2)}</p>
            <div className="absolute right-4 bottom-4 opacity-10">
              <DollarSign className="w-24 h-24" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Saldo pendente</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {financialData.pendingBalance.toFixed(2)}</p>
            <p className="text-xs text-gray-400">Passeios realizados (aguardando liberação)</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Ganhos totais do mês</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {financialData.monthlyEarnings.toFixed(2)}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-gray-500">
              <span className="text-sm font-medium">Acumulado total</span>
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">R$ {financialData.totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* DETALHAMENTO DE TAXAS E PRÓXIMO PAGAMENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-50 rounded-lg text-red-500"><Percent className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Taxas da plataforma</p>
                <p className="text-lg font-semibold text-gray-800">R$ {financialData.platformFees.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-50 rounded-lg text-green-600"><CheckCircle2 className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Valor líquido recebido</p>
                <p className="text-lg font-semibold text-green-600">R$ {financialData.netEarnings.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-50 rounded-lg text-[#f37021]"><Calendar className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase">Próximo pagamento previsto</p>
                <p className="text-lg font-semibold text-gray-800">{financialData.nextPaymentDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ÁREA DE SAQUE E HISTÓRICO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-1 space-y-6">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🏦 Área de Saque
              </h2>
              <p className="text-xs text-gray-400">Transfira seus valores disponíveis</p>
            </div>

            <form onSubmit={handleWithdrawRequest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Saque</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-gray-400 font-medium">R$</span>
                  <input
                    type="number"
                    max={financialData.availableBalance}
                    placeholder="0,00"
                    value={withdrawalValue}
                    onChange={(e) => setWithdrawalValue(e.target.value)}
                    required
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37021] focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Forma de Recebimento</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWithdrawalMethod('pix')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      withdrawalMethod === 'pix'
                        ? 'border-[#f37021] bg-orange-50 text-[#f37021]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Chave PIX
                  </button>
                  <button
                    type="button"
                    onClick={() => setWithdrawalMethod('bank_account')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                      withdrawalMethod === 'bank_account'
                        ? 'border-[#f37021] bg-orange-50 text-[#f37021]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    Conta Bancária
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-[#f37021] text-white py-2.5 px-4 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-sm text-sm flex items-center justify-center gap-2"
              >
                Solicitar Saque <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-span-2 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-lg font-bold text-gray-900">Histórico de Saques</h2>
              <p className="text-xs text-gray-400">Acompanhe o andamento das suas solicitações</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs text-gray-400 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Método</th>
                    <th className="py-3 px-4">Valor</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {withdrawalHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-gray-800">{item.date}</td>
                      <td className="py-3.5 px-4 text-gray-500">{item.method}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-900">R$ {item.amount.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.status === 'Concluído' ? 'bg-green-100 text-green-700' :
                          item.status === 'Processando' ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};