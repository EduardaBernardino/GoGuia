import { closeServer, db } from '../core/config/server';
import { perfil, rota, statusPagamento, statusReserva, statusRoteiro, tipoPagamento } from './db/schema';

async function seed() {
    //====================
    // Prefis
    //====================
    const perfisData = [
        { nome: 'Administrador' },
        { nome: 'Usuário Comum' },
        { nome: 'Usuário Guia' },
    ];

    console.log('🌱 Seeding perfil...');
    await db.insert(perfil).values(perfisData);

    console.log('✅ Seed perfil completed!\n');


    //====================
    // Status Pagamento
    //====================
    const statusPagamentoData = [
        { nome: 'pendente' },
        { nome: 'concluido' },
        { nome: 'cancelado' },
    ];

    console.log('🌱 Seeding status pagamento...');
    await db.insert(statusPagamento).values(statusPagamentoData);

    console.log('✅ Seed status pagamento completed!\n');

    //====================
    // Status Reserva
    //====================
    const statusReservaData = [
        { nome: 'pendente' },
        { nome: 'marcada' },
        { nome: 'finalizada' },
        { nome: 'cancelada' },
    ];

    console.log('🌱 Seeding status reserva...');
    await db.insert(statusReserva).values(statusReservaData);

    console.log('✅ Seed status reserva completed!\n');

    //====================
    // Status Roteiro
    //====================
    const statusRoteiroData = [
        { nome: 'ativo' },
        { nome: 'inativo' },
    ];

    console.log('🌱 Seeding status roteiro...');
    await db.insert(statusRoteiro).values(statusRoteiroData);

    console.log('✅ Seed status roteiro completed!\n');

    //====================
    // Tipo Pagamento
    //====================
    const tipoPagamentoData = [
        { nome: 'cartao' },
        { nome: 'pix' },
    ];

    console.log('🌱 Seeding tipo pagamento...');
    await db.insert(tipoPagamento).values(tipoPagamentoData);

    console.log('✅ Seed tipo pagamento completed!\n');

    //====================
    // Rota
    //====================
    const rotaData = [
        { tempo: "12", distancia: 14 },
        { tempo: "13", distancia: 15 },
    ];

    console.log('🌱 Seeding Rota...');
    await db.insert(rota).values(rotaData);

    console.log('✅ Seed Rota completed!\n');

    closeServer()
}

seed();