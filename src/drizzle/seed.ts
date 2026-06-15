import { closeServer, db } from '../core/config/server';
import { perfil } from './db/schema';

async function seed() {
    const perfisData = [
        { nome: 'Administrador' },
        { nome: 'Usuário Comum' },
        { nome: 'Usuário Guia' },
    ];

    console.log('🌱 Seeding perfil...');
    await db.insert(perfil).values(perfisData);

    console.log('✅ Seed completed!');


    closeServer()
}

seed();