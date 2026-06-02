import { StatusReserva } from "../../domain/Status Reserva/type/status-reserva-interface";


export class StatusReservaPresenter {
  static resposePresenter = (arquivo: StatusReserva) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (cidades: StatusReserva[]) => {
    return cidades.map(cidade => StatusReservaPresenter.resposePresenter(cidade));
  };
}
