import { Reserva } from "../../domain/reserva/type/reserva-interface";


export class ReservaPresenter {
  static resposePresenter = (arquivo: Reserva) => {
    const { ...baseProps } = arquivo.data;
    return {
      ...baseProps
    };
  };

  static listaResposePresenter = (reservas: Reserva[]) => {
    return reservas.map(reserva => ReservaPresenter.resposePresenter(reserva));
  };
}
