
import { Perfil, PerfilProps } from "../../domain/perfil/type/perfil-interface";
import { perfil } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { PerfilMapper } from "../mappers/perfil-mapper";

export class PerfilRepository {

    async create(perfilData: Perfil): Promise<Perfil | null> {
        const { id, ...props } = perfilData.data

        const result = await db.insert(perfil).values(props);

        const createdPerfil = await db.query.perfil.findFirst({
            where: eq(perfil.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdPerfil) return null;
        return PerfilMapper.toDomain(createdPerfil)
    }

    async findAll(): Promise<Perfil[]> {
        const result = await db.query.perfil.findMany()

        return result.map((item) => PerfilMapper.toDomain(item));
    }

    async findById(id: number): Promise<Perfil | null> {
        const result = await db.query.perfil.findFirst({
            where: eq(perfil.id, id),
        })

        if (!result) return null;
        return PerfilMapper.toDomain(result);
    }

    async update(id: number, data: Partial<PerfilProps>): Promise<Perfil | null> {

        const result =await db.update(perfil).set(data).where(eq(perfil.id, id));

        const updatePerfil = await db.query.perfil.findFirst({
            where: eq(perfil.id, id)
        });

        if (!result ||!updatePerfil) return null;

        return PerfilMapper.toDomain(updatePerfil);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(perfil).where(eq(perfil.id, id));
        
        if (!(result.changes > 0)) return null;

        return id
    }
}