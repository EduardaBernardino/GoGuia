import { Favorito } from "../../domain/favorito/type/favorito-interface";

export class  FavoritoMapper {
  static toDomain(
    raw: any
  ): Favorito {
    const { ...baseProps } = raw;

    return Favorito.create({
      ...baseProps
    });
  }

}