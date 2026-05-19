import { Perfil } from "../../domain/perfil/type/perfil-interface";

export class  PerfilMapper {
  static toDomain(
    raw: any
  ): Perfil {
    const { ...baseProps } = raw;

    return Perfil.create({
      ...baseProps
    });
  }

}