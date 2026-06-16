
import { Favorito, FavoritoProps } from "../../domain/favorito/type/favorito-interface";
import { favorito, pessoa, roteiro } from "../../drizzle/db/schema";
import { db } from "../../core/config/server";
import { eq } from "drizzle-orm";
import { FavoritoMapper } from "../mappers/favorito-mapper";

export class FavoritoRepository {

    async create(favoritoData: Favorito): Promise<Favorito | null> {
        const { id, ...props } = favoritoData.data

        const result = await db.insert(favorito).values(props);

        const createdFavorito = await db.query.favorito.findFirst({
            where: eq(favorito.id, Number(result.lastInsertRowid))
        });

        if (!result || !createdFavorito) return null;
        return FavoritoMapper.toDomain(createdFavorito)
    }

    async findAll(): Promise<Favorito[]> {
        const result = await db.select({
            id: favorito.id,
            codPessoa: favorito.codPessoa,
            codRoteiro: favorito.codRoteiro,
            roteiro,
        })
            .from(favorito)
            .leftJoin(pessoa, eq(favorito.codPessoa, pessoa.id))
            .leftJoin(roteiro, eq(favorito.codRoteiro, roteiro.id));

        return result.map((item) => FavoritoMapper.toDomain(item));
    }

    async findById(id: number): Promise<Favorito | null> {
        const result = await db.query.favorito.findFirst({
            where: eq(favorito.id, id),
        })

        if (!result) return null;
        return FavoritoMapper.toDomain(result);
    }

    async update(id: number, data: Partial<FavoritoProps>): Promise<Favorito | null> {

        const result = await db.update(favorito).set(data).where(eq(favorito.id, id));

        const updateFavorito = await db.query.favorito.findFirst({
            where: eq(favorito.id, id)
        });

        if (!result || !updateFavorito) return null;

        return FavoritoMapper.toDomain(updateFavorito);
    }

    async delete(id: number): Promise<number | null> {
        const result = await db.delete(favorito).where(eq(favorito.id, id));

        if (!(result.changes > 0)) return null;

        return id
    }
}