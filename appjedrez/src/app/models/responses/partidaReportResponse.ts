export interface PartidaReportResponse {
  jugadas: number;
  perdidas: number;
  ganadas: number;
  empatadas: number;
  porcentajePerdidas: number;
  porcentajeGanadas: number;
  porcentajeEmpatadas: number;
  promedioEvalTotal: number;
  jugadasPorMes: number[];
  ganadasPorMes: number[];
  perdidasPorMes: number[];
  empatadasPorMes: number[];
}
